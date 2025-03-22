
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, TrendingUp, BriefcaseBusiness } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobCard } from '@/components/JobCard';
import { getRecentJobs, getFeaturedJobs, JobListing } from '@/data/jobs';
import { useUser } from '@/contexts/UserContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentJobs, setRecentJobs] = useState<JobListing[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobListing[]>([]);
  const navigate = useNavigate();
  const { role } = useUser();

  useEffect(() => {
    // TODO: Заменить на получение данных из API
    setRecentJobs(getRecentJobs());
    setFeaturedJobs(getFeaturedJobs());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      pathname: '/',
      search: searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '',
    });
  };

  return (
    <div className="container-custom px-4">
      {/* Поисковая форма */}
      <section className="pt-6 pb-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск вакансий"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Найти</Button>
          </form>
        </div>
      </section>

      {/* Блок для рекрутера */}
      {role === 'recruiter' && (
        <section className="py-4">
          <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <BriefcaseBusiness className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-semibold">Режим рекрутера</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Вы можете публиковать вакансии и отслеживать статистику просмотров
            </p>
            <Button 
              onClick={() => navigate('/create-job')}
              className="w-full"
            >
              Создать вакансию
            </Button>
          </div>
        </section>
      )}

      {/* Популярные вакансии */}
      <section className="py-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold flex items-center">
            <TrendingUp className="h-4 w-4 text-primary mr-2" />
            Популярные вакансии
          </h2>
          <Button variant="link" size="sm" className="text-primary p-0" onClick={() => navigate('/featured')}>
            Все
          </Button>
        </div>
        <div className="space-y-3 overflow-x-auto pb-2">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} compact={true} />
          ))}
        </div>
      </section>

      {/* Недавние вакансии */}
      <section className="py-4">
        <h2 className="text-lg font-semibold mb-3">Недавние вакансии</h2>
        <div className="space-y-3">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
