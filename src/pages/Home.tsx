
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentJobs, getFeaturedJobs, getRecommendedJobs, JobListing } from '@/data/jobs';
import { JobCard } from '@/components/JobCard';
import { CircleEllipsis } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import SearchForm from '@/components/SearchForm';

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState<JobListing[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<JobListing[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { role } = useUser();

  useEffect(() => {
    if (role === 'recruiter') {
      navigate('/my-jobs');
      return;
    }

    // TODO: Заменить на получение данных из API
    setLoading(true);
    setTimeout(() => {
      setFeaturedJobs(getFeaturedJobs());
      setRecommendedJobs(getRecommendedJobs());
      setRecentJobs(getRecentJobs());
      setLoading(false);
    }, 500);
  }, [navigate, role]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <CircleEllipsis className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container-custom px-4">
      {/* Поиск */}
      <section className="pt-6 pb-6">
        <SearchForm className="w-full" />
      </section>

      {/* Рекомендуемые вакансии */}
      <section className="py-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Рекомендуемые вакансии
        </h2>
        
        <div className="space-y-4">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Выделенные вакансии */}
      <section className="py-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Выделенные вакансии
        </h2>
        
        <div className="space-y-4">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} featured={true} />
          ))}
        </div>
      </section>

      {/* Новые вакансии */}
      <section className="py-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Новые вакансии
        </h2>
        
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
