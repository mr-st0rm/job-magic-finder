
import { useState } from 'react';
import { jobCategories, jobTypes, locations, salaryRanges } from '@/data/jobs';
import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterOption {
  category?: string;
  type?: string;
  location?: string;
  salary?: string;
}

interface JobFilterProps {
  onFilterChange: (filters: FilterOption) => void;
  className?: string;
  initialFilters?: FilterOption;
}

export const JobFilter = ({ onFilterChange, className, initialFilters = {} }: JobFilterProps) => {
  const [filters, setFilters] = useState<FilterOption>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterOption, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const FilterSection = ({ 
    title, 
    options, 
    filterKey, 
    currentValue 
  }: { 
    title: string; 
    options: string[]; 
    filterKey: keyof FilterOption; 
    currentValue?: string; 
  }) => (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{title}</h3>
      <RadioGroup value={currentValue} onValueChange={(value) => handleFilterChange(filterKey, value)}>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option} className="flex items-center">
              <RadioGroupItem id={`${filterKey}-${option}`} value={option} />
              <Label
                htmlFor={`${filterKey}-${option}`}
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );

  const hasActiveFilters = Object.values(filters).some(value => value && !value.includes('Все'));

  return (
    <div className={className}>
      {/* Диалог мобильного фильтра */}
      <div className="relative md:hidden">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <Filter className="h-5 w-5 mr-1.5" />
          Фильтры
          {hasActiveFilters && (
            <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
              {Object.values(filters).filter(value => value && !value.includes('Все')).length}
            </span>
          )}
        </button>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-25">
            <div className="fixed inset-0 flex z-50">
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-900 py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Фильтры</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-4">
                  {hasActiveFilters && (
                    <Button
                      variant="link"
                      className="text-sm text-primary hover:text-primary/90 mb-4 p-0"
                      onClick={clearFilters}
                    >
                      Сбросить все фильтры
                    </Button>
                  )}

                  <FilterSection 
                    title="Категория" 
                    options={jobCategories} 
                    filterKey="category" 
                    currentValue={filters.category} 
                  />
                  <FilterSection 
                    title="Тип" 
                    options={jobTypes} 
                    filterKey="type" 
                    currentValue={filters.type} 
                  />
                  <FilterSection 
                    title="Местоположение" 
                    options={locations} 
                    filterKey="location" 
                    currentValue={filters.location} 
                  />
                  <FilterSection 
                    title="Зарплата" 
                    options={salaryRanges} 
                    filterKey="salary" 
                    currentValue={filters.salary} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Десктопные фильтры */}
      <div className="hidden md:block">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Фильтры</h2>
            {hasActiveFilters && (
              <Button
                variant="link"
                className="text-sm text-primary hover:text-primary/90 p-0"
                onClick={clearFilters}
              >
                Сбросить
              </Button>
            )}
          </div>

          <FilterSection 
            title="Категория" 
            options={jobCategories} 
            filterKey="category" 
            currentValue={filters.category} 
          />
          <FilterSection 
            title="Тип" 
            options={jobTypes} 
            filterKey="type" 
            currentValue={filters.type} 
          />
          <FilterSection 
            title="Местоположение" 
            options={locations} 
            filterKey="location" 
            currentValue={filters.location} 
          />
          <FilterSection 
            title="Зарплата" 
            options={salaryRanges} 
            filterKey="salary" 
            currentValue={filters.salary} 
          />
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
