import { JobSourceConfig } from '../types';
import { Job } from '../../../types';
import { mockJobs } from '../mockData';

export const localConfig: JobSourceConfig = {
  name: 'Local',
  baseUrl: '',
  transformResponse: (data: any): Job => data,
  fetchJobs: async (options: any): Promise<Job[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredJobs = [...mockJobs];

    if (options.query) {
      const query = options.query.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    if (options.jobType) {
      filteredJobs = filteredJobs.filter(job => 
        job.type.toLowerCase() === options.jobType.toLowerCase()
      );
    }

    if (options.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(options.location.toLowerCase())
      );
    }

    // Handle pagination
    const start = ((options.page || 1) - 1) * (options.limit || 10);
    const end = start + (options.limit || 10);
    return filteredJobs.slice(start, end);
  },
};