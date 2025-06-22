
import { useState, useEffect } from 'react';
import { PlusCircle, CircleEllipsis, Eye, Search, Pencil, ExternalLink, Clock, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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
import { useVacancies } from '@/hooks/useVacancies';
import { Vacancy } from '@/types/vacancy';
import { api } from '@/utils/api';

/**
 * MyJobs component - Recruiter dashboard for job management
 */
const MyJobs = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Hooks
  const navigate = useNavigate();
  const { role } = useUser();
  const { toast } = useToast();
  
  // Load vacancies with filters
  const { 
    data: vacanciesPage, 
    isLoading: loading, 
    refetch 
  } = useVacancies({
    title: searchQuery || null,
  });
  
  const jobs = vacanciesPage?.items || [];
  
  /**
   * Filter jobs by status and search query
   */
  const filteredJobs = jobs.filter(job => {
    // Filter by status
    if (statusFilter !== 'all' && statusFilter !== job.status) {
      return false;
    }
    
    // Filter by search query is handled by API
    return true;
  });
  
  /**
   * Load jobs on component mount and redirect if not a recruiter
   */
  useEffect(() => {
    // Redirect if not a recruiter
    if (role !== 'recruiter') {
      navigate('/profile');
      return;
    }
  }, [navigate, role]);

  /**
   * Get human-readable status label
   */
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'DRAFT': return 'Черновик';
      case 'PENDING': return 'На проверке';
      case 'ACTIVE': return 'Опубликована';
      case 'DELETED': return 'Архивирована';
      default: return 'Неизвестно';
    }
  };
  
  /**
   * Get CSS classes for status badge
   */
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'PENDING': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'ACTIVE': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300';
      case 'DELETED': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
  
  /**
   * Get icon for status badge
   */
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'DRAFT': return <Clock className="h-3 w-3 mr-1" />;
      case 'PENDING': return <AlertCircle className="h-3 w-3 mr-1" />;
      case 'ACTIVE': return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'DELETED': return <AlertCircle className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };
  
  /**
   * Update job status via API
   */
  const updateJobStatus = async (job: Vacancy, newStatus: 'DRAFT' | 'PENDING' | 'ACTIVE' | 'DELETED') => {
    try {
      await api.updateVacancy(job.id, {
        ...job,
        status: newStatus,
        category_id: job.category.id,
        skills: job.skills.map(vs => vs.skill.id),
      });
      
      // Refresh the list
      refetch();
      
      // Show success message
      toast({
        title: "Статус обновлен",
        description: `Вакансия ${getStatusLabel(newStatus).toLowerCase()}`,
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус вакансии",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="container-custom px-4 py-8 flex justify-center">
        <CircleEllipsis className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container-custom px-4">
      {/* Header with create button */}
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

      {/* Search and filter section */}
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
                <SelectItem value="DRAFT">Черновики</SelectItem>
                <SelectItem value="PENDING">На проверке</SelectItem>
                <SelectItem value="ACTIVE">Опубликованные</SelectItem>
                <SelectItem value="DELETED">Архивированные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Jobs list */}
      <section className="py-2">
        {filteredJobs.length > 0 ? (
          <div className="grid gap-4 grid-cols-1">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className={cn(
                  "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm transition-transform hover:translate-y-[-2px]",
                  job.is_featured && "ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10"
                )}
              >
                {/* Job card header */}
                <div className="flex items-start">
                  {/* Category icon as placeholder */}
                  <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-3">
                    <span className="text-lg font-bold text-gray-500">
                      {job.category.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Job details */}
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
                      {job.location} • {job.work_type}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {job.category.name}
                    </p>
                    
                    {/* Stats counters */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="flex flex-col items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">{job.job_views_count}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Просмотры</span>
                      </div>
                      
                      <div className="flex flex-col items-center py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-1">
                          <UserPlus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">{job.job_contact_views_count}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Контакты</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col gap-2">
                    {/* Primary action based on job status */}
                    <div>
                      {job.status === 'ACTIVE' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateJobStatus(job, 'DELETED')}
                          className="w-full"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Снять с публикации
                        </Button>
                      )}
                      
                      {job.status === 'DELETED' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateJobStatus(job, 'ACTIVE')}
                          className="w-full"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Опубликовать
                        </Button>
                      )}
                      
                      {job.status === 'DRAFT' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateJobStatus(job, 'ACTIVE')}
                          className="w-full"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Опубликовать черновик
                        </Button>
                      )}
                    </div>
                    
                    {/* Secondary actions */}
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
          // Empty state
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
