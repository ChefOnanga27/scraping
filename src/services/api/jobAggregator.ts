import { Job } from '../../types';
import { ApiResponse, ApiError, FetchOptions, JobSourceConfig } from './types';
import { linkedInConfig } from './sources/linkedin';
import { indeedConfig } from './sources/indeed';
import { API_CONFIG } from './config';
import { RateLimiter } from '../utils/RateLimiter';

class JobAggregator {
  private sources = [linkedInConfig, indeedConfig];
  private cache = new Map<string, { data: Job[]; timestamp: number }>();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private rateLimiter = new RateLimiter(API_CONFIG.MAX_REQUESTS_PER_MINUTE);

  private async fetchFromSource(
    source: JobSourceConfig,
    options: FetchOptions
  ): Promise<Job[]> {
    await this.rateLimiter.waitForToken();

    const queryParams = new URLSearchParams({
      q: options.query || '',
      location: options.location || 'Gabon',
      limit: String(options.limit || 10),
      offset: String(((options.page || 1) - 1) * (options.limit || 10)),
    });

    if (options.jobType) {
      queryParams.append('job_type', options.jobType);
    }

    const url = `${source.baseUrl}?${queryParams.toString()}`;
    
    try {
      const response = await fetch(url, {
        headers: source.headers,
        signal: AbortSignal.timeout(API_CONFIG.REQUEST_TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`${source.name} API error: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) 
        ? data.map(source.transformResponse)
        : [source.transformResponse(data)];
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error);
      return [];
    }
  }

  private async fetchFromAllSources(options: FetchOptions): Promise<Job[]> {
    const promises = this.sources.map(source => this.fetchFromSource(source, options));
    const results = await Promise.allSettled(promises);
    
    const jobs: Job[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        jobs.push(...result.value);
      }
    });

    return this.deduplicateJobs(jobs);
  }

  private deduplicateJobs(jobs: Job[]): Job[] {
    const seen = new Set<string>();
    return jobs.filter(job => {
      const key = `${job.title}-${job.company}-${job.location}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private getCacheKey(options: FetchOptions): string {
    return JSON.stringify(options);
  }

  private isCacheValid(cacheKey: string): boolean {
    const cached = this.cache.get(cacheKey);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  async fetchJobs(options: FetchOptions): Promise<ApiResponse<Job[]>> {
    try {
      const cacheKey = this.getCacheKey(options);

      if (this.isCacheValid(cacheKey)) {
        const cached = this.cache.get(cacheKey)!;
        return {
          status: 200,
          data: cached.data,
          message: 'Data retrieved from cache',
        };
      }

      const jobs = await this.fetchFromAllSources(options);

      this.cache.set(cacheKey, {
        data: jobs,
        timestamp: Date.now(),
      });

      return {
        status: 200,
        data: jobs,
        message: 'Jobs fetched successfully',
      };
    } catch (error) {
      const apiError: ApiError = {
        code: 'FETCH_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 500,
      };
      throw apiError;
    }
  }
}