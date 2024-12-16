import React, { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { JobList } from './components/JobList';
import { Pagination } from './components/pagination/Pagination';
import { useJobs } from './hooks/useJobs';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { jobs, loading, error } = useJobs({
    query: searchQuery,
    jobType: filters.jobType,
    location: filters.location,
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalPages = useMemo(() => 
    Math.ceil((jobs?.length || 0) / itemsPerPage), 
    [jobs?.length]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Section */}
          <div className="flex justify-center mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Filtres</h2>
                <Filters onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              <JobList jobs={jobs} loading={loading} error={error} />
              
              {!loading && !error && jobs.length > 0 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;