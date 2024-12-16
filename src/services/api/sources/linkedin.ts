import { JobSourceConfig } from '../types';
import { Job } from '../../../types';
import { API_CONFIG } from '../config';

export const linkedInConfig: JobSourceConfig = {
  name: 'LinkedIn',
  baseUrl: API_CONFIG.LINKEDIN_API_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_LINKEDIN_API_KEY || ''}`,
    'Content-Type': 'application/json',
    'X-Restli-Protocol-Version': '2.0.0',
  },
  transformResponse: (data: any): Job => ({
    id: data.id,
    title: data.title.text,
    company: data.companyDetails.company.name,
    location: data.formattedLocation,
    type: data.employmentStatus,
    description: data.description.text,
    salary: data.salaryRange?.text,
    postedDate: new Date(data.listedAt).toLocaleDateString(),
    source: 'LinkedIn',
    logoUrl: data.companyDetails.company.logoUrl,
  }),
};