import React from 'react';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

export function Filters({ onFilterChange }: FiltersProps) {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Type de contrat</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => onFilterChange({ type: e.target.checked ? type : null })}
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Date de publication</h3>
        <select 
          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => onFilterChange({ date: e.target.value })}
        >
          <option value="any">Toutes les dates</option>
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </select>
      </div>
    </div>
  );
}