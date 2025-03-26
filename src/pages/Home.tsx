
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentJobs, getFeaturedJobs, getRecommendedJobs, JobListing } from '@/data/jobs';
import { JobCard } from '@/components/JobCard';
import { CircleEllipsis } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import SearchForm from '@/components/SearchForm';
import { useToast } from '@/hooks/use-toast';

/**
 * Section component to display a list of jobs with a title
 * @param {Object} props - Component props
 * @param {string} props.title - The section title
 * @param {JobListing[]} props.jobs - Array of job listings to display
 * @param {boolean} props.featured - Whether jobs should be displayed as featured
 */
const JobSection = ({ title, jobs, featured = false }: { title: string; jobs: JobListing[]; featured?: boolean }) => (
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
  // State for job listings
  const [featuredJobs, setFeaturedJobs] = useState<JobListing[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<JobListing[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Hooks
  const navigate = useNavigate();
  const { role } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect to my-jobs if user is a recruiter
    if (role === 'recruiter') {
      navigate('/my-jobs');
      return;
    }
    
    // Fetch job data
    loadJobData();
  }, [navigate, role]);

  /**
   * Load job data from API or mock data
   * In a real app, this would make API calls to fetch the different job categories
   */
  const loadJobData = async () => {
    setLoading(true);
    
    try {
      // TODO: Replace with actual API calls
      // Expected API endpoints:
      // GET /api/jobs/featured - Expected response: { jobs: JobListing[] }
      // GET /api/jobs/recommended - Expected response: { jobs: JobListing[] }
      // GET /api/jobs/recent - Expected response: { jobs: JobListing[] }
      
      // Using setTimeout to simulate API delay
      setTimeout(() => {
        setFeaturedJobs(getFeaturedJobs());
        setRecommendedJobs(getRecommendedJobs());
        setRecentJobs(getRecentJobs());
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to load jobs:', error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить список вакансий",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-custom px-4">
      {/* Search section */}
      <section className="pt-6 pb-6">
        <SearchForm className="w-full" />
      </section>

      {/* Job listing sections */}
      <JobSection title="Рекомендуемые вакансии" jobs={recommendedJobs} />
      <JobSection title="Выделенные вакансии" jobs={featuredJobs} featured={true} />
      <JobSection title="Новые вакансии" jobs={recentJobs} />
    </div>
  );
};

export default Home;
