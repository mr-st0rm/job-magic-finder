
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobCard } from '@/components/JobCard';
import { CircleEllipsis } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import SearchForm from '@/components/SearchForm';
import { useToast } from '@/hooks/use-toast';
import { useVacancies } from '@/hooks/useVacancies';

/**
 * Section component to display a list of jobs with a title
 */
const JobSection = ({ title, jobs, featured = false }: { 
  title: string; 
  jobs: any[]; 
  featured?: boolean 
}) => (
  <section className="py-4">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      {title}
    </h2>
    
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} featured={featured} />
      ))}
    </div>
  </section>
);

/**
 * Loading spinner component
 */
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
    <CircleEllipsis className="h-8 w-8 animate-spin text-primary" />
  </div>
);

/**
 * Home page component
 * Shows different job listings based on user role and preferences
 */
const Home = () => {
  // Hooks
  const navigate = useNavigate();
  const { role } = useUser();
  const { toast } = useToast();
  
  // API calls for different job types
  const { 
    data: featuredPage, 
    isLoading: featuredLoading 
  } = useVacancies({ is_featured: true }, 1, 10);
  
  const { 
    data: recommendedPage, 
    isLoading: recommendedLoading 
  } = useVacancies({ is_recommended: true }, 1, 10);
  
  const { 
    data: recentPage, 
    isLoading: recentLoading 
  } = useVacancies({}, 1, 10);

  useEffect(() => {
    // Redirect to my-jobs if user is a recruiter
    if (role === 'recruiter') {
      navigate('/my-jobs');
      return;
    }
  }, [navigate, role]);

  const loading = featuredLoading || recommendedLoading || recentLoading;

  // Show loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  const featuredJobs = featuredPage?.items || [];
  const recommendedJobs = recommendedPage?.items || [];
  const recentJobs = recentPage?.items || [];

  return (
    <div className="container-custom px-4">
      {/* Search section */}
      <section className="pt-6 pb-6">
        <SearchForm className="w-full" />
      </section>

      {/* Job listing sections */}
      {recommendedJobs.length > 0 && (
        <JobSection title="Рекомендуемые вакансии" jobs={recommendedJobs} />
      )}
      
      {featuredJobs.length > 0 && (
        <JobSection title="Выделенные вакансии" jobs={featuredJobs} featured={true} />
      )}
      
      {recentJobs.length > 0 && (
        <JobSection title="Новые вакансии" jobs={recentJobs} />
      )}
    </div>
  );
};

export default Home;
