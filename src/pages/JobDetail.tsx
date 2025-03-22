
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  CalendarClock, 
  Building2, 
  Clock, 
  Share2,
  Heart,
  Phone,
  Mail,
  CheckCircle,
  CircleEllipsis,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getJobById, JobListing } from '@/data/jobs';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactsVisible, setContactsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useUser();

  useEffect(() => {
    // TODO: Заменить на получение данных из API
    setLoading(true);
    setTimeout(() => {
      if (id) {
        const jobData = getJobById(id);
        if (jobData) {
          setJob(jobData);
          // TODO: Отправить запрос на сервер для учета просмотра
          console.log('Просмотр вакансии id:', id);
        }
      }
      setLoading(false);
    }, 300);
  }, [id]);

  const handleShare = () => {
    // TODO: Реализовать функционал "Поделиться"
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Вакансия: ${job?.title} в ${job?.company}`,
        url: window.location.href,
      })
      .catch(error => console.log('Ошибка при попытке поделиться', error));
    } else {
      toast({
        title: 'Ссылка скопирована',
        description: 'Теперь вы можете поделиться ей'
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное',
      description: isFavorite ? 'Вакансия удалена из избранного' : 'Вакансия добавлена в избранное'
    });
    // TODO: Отправить запрос на сервер для сохранения в избранное
  };

  const showContacts = () => {
    setContactsVisible(true);
    // TODO: Отправить на сервер статистику просмотра контактов
    console.log('Просмотр контактов для вакансии id:', id);
  };

  if (loading) {
    return (
      <div className="container-custom px-4 py-8 flex justify-center">
        <CircleEllipsis className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container-custom px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Вакансия не найдена</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Запрашиваемая вакансия не существует или была удалена
          </p>
          <Button onClick={() => navigate('/')}>Вернуться к списку вакансий</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom px-4">
      {/* Шапка вакансии */}
      <section className="pt-6 pb-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-start">
            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-4 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <img 
                src={job.logo || '/placeholder.svg'} 
                alt={job.company} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CalendarClock className="h-4 w-4 mr-1" />
                  <span>Опубликовано {job.postedAt}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {job.salary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Действия с вакансией */}
      <section className="py-2">
        {role !== 'recruiter' ? (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={toggleFavorite} 
              variant={isFavorite ? "default" : "outline"}
              className="flex items-center"
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'В избранном' : 'В избранное'}
            </Button>
            <Button 
              onClick={handleShare} 
              variant="outline"
              className="flex items-center"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Поделиться
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {job.id && (
              <Button 
                onClick={() => navigate(`/edit-job/${job.id}`)} 
                variant="default"
                className="flex items-center"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Редактировать
              </Button>
            )}
            <Button 
              onClick={handleShare} 
              variant="outline"
              className="flex items-center"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Поделиться
            </Button>
          </div>
        )}
      </section>

      {/* Описание вакансии */}
      <section className="py-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Описание</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {job.description}
          </p>
          
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Требования</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
          
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Обязанности</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {job.responsibilities.map((resp, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-1 text-primary flex-shrink-0" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* О компании */}
      <section className="py-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">О компании</h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Компания</p>
                <p className="text-gray-900 dark:text-white">{job.companyInfo.name}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Основана</p>
                <p className="text-gray-900 dark:text-white">{job.companyInfo.founded}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Расположение</p>
                <p className="text-gray-900 dark:text-white">{job.companyInfo.headquarters}</p>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              {job.companyInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Контакты для связи */}
      {role !== 'recruiter' && (
        <section className="py-2 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Контакты</h2>
            
            {contactsVisible ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Телефон</p>
                    <p className="text-gray-900 dark:text-white">+7 (999) 123-45-67</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">hr@{job.company.toLowerCase().replace(/\s+/g, '')}.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Telegram</p>
                    <p className="text-gray-900 dark:text-white">@hr_{job.company.toLowerCase().replace(/\s+/g, '')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                onClick={showContacts} 
                className="w-full"
              >
                Показать контакты
              </Button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default JobDetail;
