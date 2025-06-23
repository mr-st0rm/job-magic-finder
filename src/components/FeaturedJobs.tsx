
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import JobCard from './JobCard';
import { useVacancies } from '@/hooks/useVacancies';
import { mapVacancyToJobListing } from '@/utils/vacancyMapper';
import { cn } from '@/lib/utils';

export const FeaturedJobs = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Load featured jobs from API
  const { data: featuredPage, isLoading } = useVacancies({ is_featured: true }, 1, 10);
  const featuredJobs = featuredPage?.items || [];
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      const scrollTo = direction === 'left' 
        ? current.scrollLeft - scrollAmount 
        : current.scrollLeft + scrollAmount;
      
      current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 relative">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredJobs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 relative">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Рекомендуемые вакансии
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Выбор лучших вакансий от ведущих компаний
            </p>
          </div>
          
          <div className="hidden sm:flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredJobs.map((vacancy) => {
            const jobListing = mapVacancyToJobListing(vacancy);
            return (
              <div key={vacancy.id} className="flex-shrink-0 w-full sm:w-[350px]">
                <JobCard job={jobListing} featured={true} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
