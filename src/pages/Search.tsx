
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SearchForm } from '@/components/SearchForm';
import { JobFilter } from '@/components/JobFilter';
import { JobCard } from '@/components/JobCard';
import { searchJobs, JobListing } from '@/data/jobs';
import { BriefcaseSearch, Loader2 } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  const initialQuery = searchParams.get('q') || '';
  const initialLocation = searchParams.get('location') || '';

  const initialFilters = {
    category: searchParams.get('category') || undefined,
    type: searchParams.get('type') || undefined,
    location: searchParams.get('location') || undefined,
    salary: searchParams.get('salary') || undefined,
  };

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      const filteredJobs = searchJobs(initialQuery, initialFilters);
      setJobs(filteredJobs);
      setLoading(false);
    }, 500);
  }, [initialQuery, initialFilters]);

  const handleSearch = (query: string, location: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set('q', query);
    else params.delete('q');
    
    if (location) params.set('location', location);
    else params.delete('location');
    
    setSearchParams(params);
  };

  const handleFilterChange = (filters: any) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && !value.toString().includes('All')) {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });
    
    setSearchParams(params);
    setIsFiltered(Object.values(filters).some(val => val && !val.toString().includes('All')));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Search Header */}
      <section className="pt-24 pb-10 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Поиск вакансий
          </h1>
          
          <SearchForm 
            defaultValues={{ 
              query: initialQuery, 
              location: initialLocation 
            }}
            onSearch={handleSearch}
          />
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters */}
            <div className="w-full md:w-64 flex-shrink-0">
              <JobFilter 
                onFilterChange={handleFilterChange}
                initialFilters={initialFilters}
              />
            </div>
            
            {/* Results */}
            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Загрузка вакансий...</p>
                </div>
              ) : jobs.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Найдено <span className="font-medium text-gray-900 dark:text-white">{jobs.length}</span> вакансий
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BriefcaseSearch className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Вакансии не найдены
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                    Попробуйте изменить параметры поиска или фильтры, чтобы найти подходящие вакансии.
                  </p>
                  <button
                    onClick={() => {
                      setSearchParams({});
                    }}
                    className="text-primary hover:text-primary/90"
                  >
                    Сбросить все фильтры
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - simplified for this page */}
      <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} JobFinder. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Search;
