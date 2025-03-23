
import { useState, useEffect } from 'react';
import { PlusCircle, CircleEllipsis, Eye, Search, Pencil, ExternalLink, Clock, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getRecentJobs, JobListing } from '@/data/jobs';
import { useUser } from '@/contexts/UserContext';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Extended job type for recruiter view
interface RecruiterJobStats extends JobListing {
  views: number;
  contactsViewed: number;
  status: 'draft' | 'review' | 'published' | 'archived';
}

const MyJobs = () => {
  const [jobs, setJobs] = useState<RecruiterJobStats[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<RecruiterJobStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();
  const { role } = useUser();
  const { toast } = useToast();
  
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
      const userJobs = getRecentJobs().map((job, index) => ({
        ...job,
        views: Math.floor(Math.random() * 100) + 10,
        contactsViewed: Math.floor(Math.random() * 20) + 1,
        status: ['draft', 'review', 'published', 'archived', 'published'][index % 5] as 'draft' | 'review' | 'published' | 'archived'
      }));
      setJobs(userJobs);
      setFilteredJobs(userJobs);
      setLoading(false);
    }, 500);
  }, [navigate, role]);

  useEffect(() => {
    let filtered = jobs;
    
    // Фильтр по статусу
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }
    
    // Фильтр по поисковому запросу
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredJobs(filtered);
  }, [searchQuery, statusFilter, jobs]);

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'draft': return 'Черновик';
      case 'review': return 'На проверке';
      case 'published': return 'Опубликована';
      case 'archived': return 'Архивирована';
      default: return 'Неизвестно';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'draft': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'review': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'published': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300';
      case 'archived': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'draft': return <Clock className="h-3 w-3 mr-1" />;
      case 'review': return <AlertCircle className="h-3 w-3 mr-1" />;
      case 'published': return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'archived': return <AlertCircle className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };
  
  const updateJobStatus = (jobId: string, newStatus: 'draft' | 'review' | 'published' | 'archived') => {
    // TODO: Заменить на отправку на API
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
    
    toast({
      title: "Статус обновлен",
      description: `Вакансия ${getStatusLabel(newStatus).toLowerCase()}`,
      duration: 5000,
    });
  };

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

      {/* Фильтр и поиск */}
      <section className="py-2 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Поиск по вакансиям"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-60">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="draft">Черновики</SelectItem>
                <SelectItem value="review">На проверке</SelectItem>
                <SelectItem value="published">Опубликованные</SelectItem>
                <SelectItem value="archived">Архивированные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Список вакансий */}
      <section className="py-2">
        {filteredJobs.length > 0 ? (
          <div className="grid gap-4 grid-cols-1">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className={cn(
                  "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm transition-transform hover:translate-y-[-2px]",
                  job.featured && "ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10"
                )}
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
                    <div className="flex justify-between items-start">
                      <h3 className="text-md font-medium text-gray-900 dark:text-white truncate mr-2">
                        {job.title}
                      </h3>
                      <div className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(job.status)}`}>
                        {getStatusIcon(job.status)}
                        {getStatusLabel(job.status)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {job.location} • {job.type}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Опубликовано {job.postedAt}
                    </p>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="flex flex-col items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">{job.views}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Просмотры</span>
                      </div>
                      
                      <div className="flex flex-col items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-1">
                          <UserPlus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">{job.contactsViewed}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Контакты</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col gap-2">
                    <div>
                      {job.status === 'published' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateJobStatus(job.id, 'archived')}
                          className="w-full"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Снять с публикации
                        </Button>
                      )}
                      
                      {job.status === 'archived' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateJobStatus(job.id, 'published')}
                          className="w-full"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Опубликовать
                        </Button>
                      )}
                      
                      {job.status === 'draft' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateJobStatus(job.id, 'published')}
                          className="w-full"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Опубликовать черновик
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/job/${job.id}`)}
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Просмотр
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/edit-job/${job.id}`)}
                        className="flex items-center justify-center"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Редактировать
                      </Button>
                    </div>
                  </div>
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
              {statusFilter !== 'all' 
                ? `У вас нет вакансий со статусом "${getStatusLabel(statusFilter)}"` 
                : 'У вас пока нет вакансий'}
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
