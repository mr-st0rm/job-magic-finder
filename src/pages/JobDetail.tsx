
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { getJobById } from '@/data/jobs';
import { 
  Clock, 
  MapPin, 
  Briefcase, 
  Building2, 
  Users, 
  Calendar, 
  Globe, 
  Share2,
  BookmarkPlus,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState(id ? getJobById(id) : null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setJob(id ? getJobById(id) : null);
      setLoading(false);
    }, 300);
  }, [id]);

  const handleApply = () => {
    toast({
      title: "Заявка отправлена",
      description: "Ваша заявка на вакансию была успешно отправлена.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Вакансия сохранена",
      description: "Вакансия была добавлена в ваши сохраненные.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Ссылка скопирована",
      description: "Ссылка на вакансию скопирована в буфер обмена.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 pb-16 container-custom flex items-center justify-center">
          <div className="animate-pulse flex flex-col w-full max-w-4xl">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 pb-16 container-custom flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Вакансия не найдена
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Запрашиваемая вакансия не существует или была удалена.
          </p>
          <Button onClick={() => navigate('/search')}>
            Вернуться к поиску
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/search" className="hover:text-primary transition-colors">
              Поиск вакансий
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 dark:text-white">{job.title}</span>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Назад к результатам
          </button>
          
          {/* Job Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {job.logo ? (
                  <img 
                    src={job.logo} 
                    alt={`${job.company} logo`} 
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-500">
                    {job.company.charAt(0)}
                  </span>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Building2 className="mr-1.5 h-4 w-4 text-gray-500" />
                    <span>{job.company}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="mr-1.5 h-4 w-4 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Briefcase className="mr-1.5 h-4 w-4 text-gray-500" />
                    <span>{job.type}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4 text-gray-500" />
                    <span>Опубликовано {job.postedAt}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end gap-2 mt-4 sm:mt-0">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {job.salary}
                </div>
                <span className={`job-tag job-tag-${job.featured ? 'green' : 'blue'}`}>
                  {job.featured ? 'Featured' : job.category}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {job.tags.map((tag) => (
                <span key={tag} className="job-tag job-tag-blue">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <Button className="flex-1" onClick={handleApply}>
                Откликнуться
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none"
                onClick={handleSave}
              >
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Сохранить
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Поделиться
              </Button>
            </div>
          </div>
          
          {/* Job Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Описание вакансии
                </h2>
                <div className="prose dark:prose-invert prose-p:text-gray-600 dark:prose-p:text-gray-400 max-w-none">
                  <p>{job.description}</p>
                </div>
              </div>
              
              {/* Requirements */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Требования
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li 
                      key={index} 
                      className="flex items-start text-gray-600 dark:text-gray-400"
                    >
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium mr-3 mt-0.5">
                        ✓
                      </span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Responsibilities */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Обязанности
                </h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li 
                      key={index} 
                      className="flex items-start text-gray-600 dark:text-gray-400"
                    >
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Company Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  О компании
                </h2>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
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
                  
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {job.companyInfo.name}
                    </div>
                    <a 
                      href={job.companyInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      <Globe className="mr-1 h-3 w-3" />
                      Веб-сайт
                    </a>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {job.companyInfo.description}
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Сотрудники
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {job.companyInfo.employees}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Штаб-квартира
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {job.companyInfo.headquarters}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Год основания
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {job.companyInfo.founded}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Нужна помощь?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Есть вопросы по этой вакансии? Свяжитесь с нашей службой поддержки.
                </p>
                <Button variant="outline" className="w-full">
                  Связаться с поддержкой
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - simplified for this page */}
      <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="container-custom">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} JobFinder. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default JobDetail;
