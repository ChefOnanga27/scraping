export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  salary?: string;
  postedDate: string;
  source: string;
  logoUrl?: string;
}