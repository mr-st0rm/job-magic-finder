
import { useState, useEffect } from 'react';
import { PlusCircle, CircleEllipsis, Eye, User, Mail, Search, Pencil, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getRecentJobs, JobListing } from '@/data/jobs';
import { useUser } from '@/contexts/UserContext';
import { Input } from '@/components/ui/input';

// Extended job type for recruiter view
interface RecruiterJobStats extends JobListing {
  views: number;
  contactsViewed: number;
  applicants: number;
}

const MyJobs = () => {
  const [jobs, setJobs] = useState<RecruiterJobStats[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<RecruiterJobStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { role } = useUser();
  
  useEffect(() => {
    // Redirect if not a recruiter
    if (role !== 'recruiter') {
      navigate('/profile');
      return;
    }
    
    // TODO: Заменить на получение данных из API
    setLoading(true);
    setTimeout(() => {
      // Временное решение: добавляем статистику к существующим вакансиям
      const userJobs = getRecentJobs().map(job => ({
        ...job,
        views: Math.floor(Math.random() * 100) + 10,
        contactsViewed: Math.floor(Math.random() * 20) + 1,
        applicants: Math.floor(Math.random() * 15)
      }));
      setJobs(userJobs);
      setFilteredJobs(userJobs);
      setLoading(false);
    }, 500);
  }, [navigate, role]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  if (loading) {
    return (
      <div className="container-custom px-4 py-8 flex justify-center">
        <CircleEllipsis className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container-custom px-4">
      {/* Заголовок */}
      <section className="pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Мои вакансии</h1>
          <Button 
            onClick={() => navigate('/create-job')}
            size="sm"
            className="flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Создать
          </Button>
        </div>
      </section>

      {/* Поиск */}
      <section className="py-2 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск по вакансиям"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Список вакансий */}
      <section className="py-2">
        {filteredJobs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm transition-transform hover:translate-y-[-2px]"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-3">
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
                  
                  <div className="flex-1">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white truncate">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {job.location} • {job.type}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Опубликовано {job.postedAt}
                    </p>
                    
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white">{job.views}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Просмотры</span>
                      </div>
                      
                      <div className="flex flex-col items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white">{job.contactsViewed}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Контакты</span>
                      </div>
                      
                      <div className="flex flex-col items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white">{job.applicants}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Просмотры</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/job/${job.id}`)}
                    className="flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Просмотреть
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                    className="flex items-center"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Редактировать
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              У вас пока нет вакансий
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Создайте вашу первую вакансию, чтобы начать поиск кандидатов
            </p>
            <Button onClick={() => navigate('/create-job')}>
              Создать вакансию
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyJobs;
