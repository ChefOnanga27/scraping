import { Job } from '../types';

export const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Développeur Full Stack',
    company: 'Tech Solutions Gabon',
    location: 'Libreville, Gabon',
    type: 'Full-time',
    description: 'Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe en pleine croissance...',
    salary: '1500000 - 2000000 FCFA',
    postedDate: 'Il y a 2 jours',
    source: 'LinkedIn',
    logoUrl: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: '2',
    title: 'Chargé de Marketing Digital',
    company: 'Gabon Digital Agency',
    location: 'Port-Gentil, Gabon',
    type: 'Full-time',
    description: 'Rejoignez notre agence de marketing digital en pleine expansion...',
    postedDate: 'Il y a 1 jour',
    source: 'Indeed',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=100&h=100&q=80'
  },
  // Add more sample jobs here...
];