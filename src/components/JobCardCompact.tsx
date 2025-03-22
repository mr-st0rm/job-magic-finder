
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';
import { JobListing } from '@/data/jobs';

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

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className="flex items-start">
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
          <h3 className="font-medium text-gray-900 dark:text-white">{job.title}</h3>
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
