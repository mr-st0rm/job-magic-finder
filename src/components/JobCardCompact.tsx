
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Sparkles } from 'lucide-react';
import { JobListing } from '@/data/jobs';
import { cn } from '@/lib/utils';

interface JobCardCompactProps {
  job: JobListing;
  compact?: boolean;
}

export const JobCardCompact = ({ job, compact = false }: JobCardCompactProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  if (compact) {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 rounded overflow-hidden flex-shrink-0">
            <img 
              src={job.logo || '/placeholder.svg'} 
              alt={job.company} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback если изображение не загрузилось
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">{job.title}</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="truncate">{job.company}</span>
              <span className="mx-1">•</span>
              <span>{job.salary}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFeatured = job.featured;

  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow relative",
        isFeatured && "ring-2 ring-primary/20",
        isFeatured && "bg-primary/5 dark:bg-primary/10"
      )}
      onClick={handleClick}
    >
      {job.recommended && (
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            Рекомендуемая
          </span>
        </div>
      )}
      
      <div className="flex items-start mt-2">
        <div className="w-12 h-12 mr-4 rounded overflow-hidden flex-shrink-0">
          <img 
            src={job.logo || '/placeholder.svg'} 
            alt={job.company} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback если изображение не загрузилось
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="flex-1">
          {/* Add margin top when job is recommended to avoid overlap */}
          <h3 className={cn(
            "font-medium text-gray-900 dark:text-white",
            job.recommended ? "mt-6 xs:mt-4 sm:mt-0 md:mt-0" : "mt-0" // Add margin top on mobile when recommended
          )}>
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{job.company}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Briefcase className="h-3 w-3 mr-1" />
              <span>{job.type}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {job.salary}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {job.postedAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardCompact;
