import React from 'react';
import { BriefcaseIcon, User, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseIcon className="w-8 h-8 text-blue-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Emplois Gabon</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">Offres d'emploi</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Entreprises</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Blog</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}