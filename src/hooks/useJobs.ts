import { useState, useEffect } from 'react';
import { Job } from '../types';
import { JobService } from '../services/api/JobService';
import { FetchOptions } from '../services/api/types';

export function useJobs(options: FetchOptions) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const jobService = JobService.getInstance();
    let mounted = true;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await jobService.fetchJobs(options);
        if (mounted) {
          setJobs(response.data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
          setJobs([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      mounted = false;
    };
  }, [options]);

  return { jobs, loading, error };
}