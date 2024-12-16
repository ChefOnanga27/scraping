import { JobSourceConfig } from '../types';
import { Job } from '../../../types';
import { API_CONFIG } from '../config';
import { formatDate } from '../utils/dateFormatter';
import { sanitizeHtml } from '../utils/sanitizer';
import { formatLocation } from '../utils/locationFormatter';
import { mapContractType } from '../utils/contractTypeMapper';
import { formatSalary } from '../utils/salaryFormatter';

export const altemploiConfig: JobSourceConfig = {
  name: 'Altemploi Gabon',
  baseUrl: API_CONFIG.ALTEMPLOI_API_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_ALTEMPLOI_API_KEY || ''}`,
    'Content-Type': 'application/json',
  },
  transformResponse: (data: any): Job => ({
    id: data.jobId,
    title: sanitizeHtml(data.poste),
    company: sanitizeHtml(data.entreprise),
    location: formatLocation(data.lieu),
    type: mapContractType(data.typeContrat),
    description: sanitizeHtml(data.description),
    salary: formatSalary(data.salaire),
    postedDate: formatDate(data.datePublication),
    source: 'Altemploi Gabon',
    logoUrl: data.logoEntreprise,
  }),
};