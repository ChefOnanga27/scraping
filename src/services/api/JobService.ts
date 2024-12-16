import { Job } from '../../types';
import { ApiResponse, ApiError, FetchOptions } from './types';
import { localConfig, linkedInConfig, indeedConfig, altemploiConfig } from './sources';
import { API_CONFIG } from './config';
import { RateLimiter } from '../utils/RateLimiter';

export class JobService {
  private static instance: JobService;
  private rateLimiter: RateLimiter;

  private constructor() {
    this.rateLimiter = new RateLimiter(API_CONFIG.MAX_REQUESTS_PER_MINUTE);
  }

  static getInstance(): JobService {
    if (!JobService.instance) {
      JobService.instance = new JobService();
    }
    return JobService.instance;
  }

  async fetchJobs(options: FetchOptions): Promise<ApiResponse<Job[]>> {
    try {
      // For development, use local mock data
      if (process.env.NODE_ENV === 'development') {
        const jobs = await localConfig.fetchJobs(options);
        return {
          status: 200,
          data: jobs,
          message: 'Jobs fetched successfully from local source',
        };
      }

      // For production, fetch from real APIs
      const jobs = await this.fetchFromAllSources(options);
      
      return {
        status: 200,
        data: jobs,
        message: 'Jobs fetched successfully',
      };
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  private async fetchFromAllSources(options: FetchOptions): Promise<Job[]> {
    const sources = [linkedInConfig, indeedConfig, altemploiConfig];
    const promises = sources.map(source => this.fetchFromSource(source, options));
    const results = await Promise.allSettled(promises);
    
    const jobs: Job[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        jobs.push(...result.value);
      }
    });

    return this.deduplicateJobs(jobs);
  }

  private createApiError(error: unknown): ApiError {
    return {
      code: 'FETCH_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500,
    };
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
}