
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SearchFormProps {
  className?: string;
  defaultValues?: {
    query?: string;
    location?: string;
  };
  onSearch?: (query: string, location: string) => void;
}

export const SearchForm = ({ className, defaultValues, onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState(defaultValues?.query || '');
  const [location, setLocation] = useState(defaultValues?.location || '');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(query, location);
    } else {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (location) params.append('location', location);
      
      navigate({
        pathname: '/search',
        search: params.toString()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="w-full flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Должность, навыки или компания"
            className="block w-full pl-10 pr-4 py-3 bg-transparent border-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none dark:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div className="relative flex-1 w-full border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Местоположение"
            className="block w-full pl-10 pr-4 py-3 bg-transparent border-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none dark:text-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <Button type="submit" className="w-full px-8 py-3 h-auto bg-primary hover:bg-primary/90">
            Поиск
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
