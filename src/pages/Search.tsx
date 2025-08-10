
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Loader2, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { JobCard } from '@/components/JobCard';
import { CircleEllipsis } from 'lucide-react';
import SearchForm from '@/components/SearchForm';
import { useVacancies } from '@/hooks/useVacancies';
import { mapVacancyToJobListing } from '@/utils/vacancyMapper';
import { VacancyFilterSchema, JobType } from '@/types/vacancy';
import { useCategories } from '@/hooks/useCategories';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: categories } = useCategories();

  // Build filters from URL params
  const buildFilters = (): VacancyFilterSchema => {
    const filters: VacancyFilterSchema = {};
    
    const title = searchParams.get('q');
    if (title) filters.title = title;
    
    const workType = searchParams.get('type');
    if (workType) {
      // Map from display text to JobType enum
      const typeMap: Record<string, JobType> = {
        'Full-time': 'FULL_TIME',
        'Part-time': 'PART_TIME',
        'Contract': 'CONTRACT',
        'Remote': 'REMOTE',
        'Freelance': 'FREELANCE'
      };
      const mappedType = typeMap[workType];
      if (mappedType) filters.work_type = [mappedType];
    }
    
    const categoryName = searchParams.get('category');
    if (categoryName && categories) {
      const category = categories.find(cat => cat.name === categoryName);
      if (category) filters.category_ids = [category.id];
    }
    
    return filters;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const filters = buildFilters();
  
  const { data: vacanciesPage, isLoading, refetch } = useVacancies(filters, currentPage, 20);
  const vacancies = vacanciesPage?.items || [];

  const initialFilters = {
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    salary: searchParams.get('salary') || '',
  };

  const [uiFilters, setUiFilters] = useState(initialFilters);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const handleSearch = (query: string, location: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    
    Object.entries(uiFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    
    setSearchParams(params);
    // Force refetch even if params are unchanged
    refetch();
  };

  const handleFilterChange = (key: string, value: string) => {
    setUiFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(uiFilters).forEach(([key, value]) => {
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
    setUiFilters({
      category: '',
      type: '',
      location: '',
      salary: '',
    });
  };

  const hasActiveFilters = Object.values(uiFilters).some(value => value !== '');

  // Available filter options
  const jobTypes = ['Все типы', 'Full-time', 'Part-time', 'Contract', 'Remote', 'Freelance'];
  const categoryNames = categories ? ['Все категории', ...categories.map(cat => cat.name)] : ['Все категории'];
  const locations = ['Все локации', 'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Удаленно'];
  const salaryRanges = ['Любая зарплата', 'До $1000', '$1000-$3000', '$3000-$5000', 'Свыше $5000'];

  return (
    <div className="container-custom px-4">
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
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Категория</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-transparent dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    value={uiFilters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    {categoryNames.map(category => (
                      <option key={category} value={category === 'Все категории' ? '' : category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Тип занятости</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-transparent dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    value={uiFilters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type === 'Все типы' ? '' : type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Местоположение</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-transparent dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    value={uiFilters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc === 'Все локации' ? '' : loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Зарплата</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-transparent dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    value={uiFilters.salary}
                    onChange={(e) => handleFilterChange('salary', e.target.value)}
                  >
                    {salaryRanges.map(range => (
                      <option key={range} value={range === 'Любая зарплата' ? '' : range}>
                        {range}
                      </option>
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

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(uiFilters).map(([key, value]) => {
            if (!value) return null;
            
            let label = value;
            
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

      <section className="py-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CircleEllipsis className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Загрузка вакансий...</p>
          </div>
        ) : vacancies.length > 0 ? (
          <div>
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Найдено <span className="font-medium text-gray-900 dark:text-white">{vacanciesPage?.total || vacancies.length}</span> вакансий
              </p>
            </div>
            
            <div className="space-y-3">
              {vacancies.map((vacancy) => {
                const jobListing = mapVacancyToJobListing(vacancy);
                return <JobCard key={vacancy.id} job={jobListing} />;
              })}
            </div>
            
            {/* Pagination could be added here if needed */}
            {vacanciesPage?.pages && vacanciesPage.pages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Предыдущая
                </Button>
                <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                  {currentPage} из {vacanciesPage.pages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage >= vacanciesPage.pages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Следующая
                </Button>
              </div>
            )}
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
