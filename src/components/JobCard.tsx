
import { Building2, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <div className="flex items-center mt-2 text-gray-600">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{job.postedDate}</span>
          </div>
        </div>
        {job.logoUrl && (
          <img 
            src={job.logoUrl} 
            alt={`${job.company} logo`} 
            className="w-16 h-16 object-contain rounded"
          />
        )}
      </div>
      <p className="mt-4 text-gray-600 line-clamp-3">{job.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {job.type}
        </span>
        {job.salary && (
          <span className="text-green-600 font-medium">{job.salary}</span>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">Source: {job.source}</span>
        <button className="flex items-center text-blue-600 hover:text-blue-800">
          Voir l'offre <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}