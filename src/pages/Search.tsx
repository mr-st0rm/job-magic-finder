
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Loader2, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { JobCardCompact } from '@/components/JobCardCompact';
import { searchJobs, JobListing, jobCategories, jobTypes, locations, salaryRanges } from '@/data/jobs';
import SearchForm from '@/components/SearchForm';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const initialFilters = {
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    salary: searchParams.get('salary') || '',
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    // TODO: Заменить на получение данных из API
    setLoading(true);
    setTimeout(() => {
      const query = searchParams.get('q') || '';
      const currentFilters = {
        category: searchParams.get('category') || undefined,
        type: searchParams.get('type') || undefined,
        location: searchParams.get('location') || undefined,
        salary: searchParams.get('salary') || undefined,
      };
      
      const filteredJobs = searchJobs(query, currentFilters);
      setJobs(filteredJobs);
      setLoading(false);
    }, 500);
  }, [searchParams]);

  const handleSearch = (query: string, location: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    
    // Добавляем фильтры к параметрам
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    
    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    setSearchParams(params);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      type: '',
      location: '',
      salary: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="container-custom px-4">
      {/* Поисковая форма */}
      <section className="pt-6 pb-4">
        <SearchForm 
          className="w-full" 
          defaultValues={{
            query: searchParams.get('q') || '',
            location: searchParams.get('location') || ''
          }}
          onSearch={handleSearch}
        />
        
        <div className="mt-3 flex items-center">
          <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="relative flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Фильтры</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Категория</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-transparent"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option value="">Все категории</option>
                    {jobCategories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Тип занятости</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-transparent"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="">Все типы</option>
                    {jobTypes.slice(1).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Местоположение</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-transparent"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    <option value="">Все локации</option>
                    {locations.slice(1).map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Зарплата</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-transparent"
                    value={filters.salary}
                    onChange={(e) => handleFilterChange('salary', e.target.value)}
                  >
                    <option value="">Любая зарплата</option>
                    {salaryRanges.slice(1).map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
              <DrawerFooter>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetFilters} className="flex-1">
                    Сбросить
                  </Button>
                  <Button onClick={applyFilters} className="flex-1">
                    Применить
                  </Button>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* Активные фильтры */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            
            let label = '';
            if (key === 'category') label = value;
            if (key === 'type') label = value;
            if (key === 'location') label = value;
            if (key === 'salary') label = value;
            
            return (
              <div 
                key={key} 
                className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs"
              >
                <span>{label}</span>
                <button 
                  onClick={() => {
                    handleFilterChange(key, '');
                    applyFilters();
                  }}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Результаты поиска */}
      <section className="py-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Загрузка вакансий...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div>
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Найдено <span className="font-medium text-gray-900 dark:text-white">{jobs.length}</span> вакансий
              </p>
            </div>
            
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobCardCompact key={job.id} job={job} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <SearchIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Вакансии не найдены
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
              Попробуйте изменить параметры поиска или фильтры
            </p>
            <Button
              onClick={() => {
                setSearchParams({});
                resetFilters();
              }}
              variant="outline"
            >
              Сбросить все фильтры
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Search;
