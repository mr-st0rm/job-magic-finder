
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import JobCard from './JobCard';
import { getFeaturedJobs } from '@/data/jobs';

export const FeaturedJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState(getFeaturedJobs());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
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
          {featuredJobs.map((job) => (
            <div key={job.id} className="flex-shrink-0 w-full sm:w-[350px]">
              <JobCard job={job} featured={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
