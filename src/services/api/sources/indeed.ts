import { JobSourceConfig } from '../types';
import { Job } from '../../../types';
import { API_CONFIG } from '../config';

export const indeedConfig: JobSourceConfig = {
  name: 'Indeed',
  baseUrl: API_CONFIG.INDEED_API_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_INDEED_API_KEY || ''}`,
    'Content-Type': 'application/json',
  },
  transformResponse: (data: any): Job => ({
    id: data.id,
    title: data.title,
    company: data.company.name,
    location: data.location.display_name,
    type: data.type,
    description: data.description,
    salary: data.salary_range 
      ? `${data.salary_range.min} - ${data.salary_range.max} ${data.salary_range.currency}`
      : undefined,
    postedDate: new Date(data.created).toLocaleDateString(),
    source: 'Indeed',
    logoUrl: data.company.logo_url,
  }),
};