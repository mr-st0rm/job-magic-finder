
import { Link } from 'react-router-dom';
import { Clock, MapPin, Briefcase } from 'lucide-react';
import { JobListing } from '@/data/jobs';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: JobListing;
  featured?: boolean;
  className?: string;
}

export const JobCard = ({ job, featured = false, className }: JobCardProps) => {
  const getTagClass = (index: number) => {
    const classes = [
      'job-tag-blue',
      'job-tag-green',
      'job-tag-orange',
      'job-tag-purple',
      'job-tag-teal'
    ];
    return classes[index % classes.length];
  };

  return (
    <Link 
      to={`/job/${job.id}`} 
      className={cn(
        'block group',
        className
      )}
    >
      <div className={cn(
        'relative overflow-hidden rounded-xl p-5 transition-all duration-300',
        'bg-white border border-gray-100 hover:shadow-md',
        'dark:bg-gray-800 dark:border-gray-700',
        featured && 'ring-2 ring-primary/10',
      )}>
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Featured
            </span>
          </div>
        )}
        
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {job.logo ? (
                <img 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-lg font-bold text-gray-500">
                  {job.company.charAt(0)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors duration-200">
              {job.title}
            </h3>
            
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {job.company}
            </p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {job.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={tag} 
                  className={cn('job-tag', getTagClass(index))}
                >
                  {tag}
                </span>
              ))}
              {job.tags.length > 3 && (
                <span className="job-tag bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  +{job.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="mr-1.5 h-4 w-4" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center">
              <Briefcase className="mr-1.5 h-4 w-4" />
              <span>{job.type}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4" />
              <span>{job.postedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
