
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { getJobById } from '@/data/jobs';
import { CircleEllipsis } from 'lucide-react';

const EditJob = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    contact_telegram: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      // TODO: Заменить на получение данных из API
      setIsLoading(true);
      setTimeout(() => {
        const job = getJobById(id);
        if (job) {
          setFormData({
            title: job.title,
            company: job.company,
            location: job.location,
            type: job.type,
            salary: job.salary,
            description: job.description,
            requirements: job.requirements.join('\n'),
            responsibilities: job.responsibilities.join('\n'),
            contact_name: 'HR Manager', // Placeholder data
            contact_phone: '+7 (999) 123-45-67',
            contact_email: `hr@${job.company.toLowerCase().replace(/\s+/g, '')}.com`,
            contact_telegram: `@hr_${job.company.toLowerCase().replace(/\s+/g, '')}`,
          });
        } else {
          toast({
            title: 'Ошибка',
            description: 'Вакансия не найдена',
            variant: 'destructive'
          });
          navigate('/my-jobs');
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, navigate, toast]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error for this field if it exists
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Проверяем обязательные поля
    if (!formData.title.trim()) newErrors.title = 'Введите название должности';
    if (!formData.company.trim()) newErrors.company = 'Введите название компании';
    if (!formData.location.trim()) newErrors.location = 'Введите местоположение';
    if (!formData.type) newErrors.type = 'Выберите тип занятости';
    
    // Проверяем зарплату - должна содержать хотя бы одну цифру
    if (!formData.salary.trim()) {
      newErrors.salary = 'Введите информацию о зарплате';
    } else if (!/\d/.test(formData.salary)) {
      newErrors.salary = 'Зарплата должна содержать хотя бы одну цифру';
    }
    
    // Проверяем описание
    if (!formData.description.trim()) newErrors.description = 'Добавьте описание вакансии';
    if (!formData.requirements.trim()) newErrors.requirements = 'Укажите требования';
    if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Укажите обязанности';
    
    // Проверяем контакты (хотя бы один способ связи должен быть указан)
    if (!formData.contact_name.trim()) newErrors.contact_name = 'Укажите контактное лицо';
    
    const hasEmail = formData.contact_email.trim() !== '';
    const hasPhone = formData.contact_phone.trim() !== '';
    const hasTelegram = formData.contact_telegram.trim() !== '';
    
    if (!hasEmail && !hasPhone && !hasTelegram) {
      newErrors.contact_email = 'Укажите хотя бы один способ связи';
      newErrors.contact_phone = 'Укажите хотя бы один способ связи';
      newErrors.contact_telegram = 'Укажите хотя бы один способ связи';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // TODO: Отправить данные на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Вакансия обновлена',
        description: 'Изменения успешно сохранены'
      });
      navigate('/my-jobs');
    }, 1000);
  };
  
  if (isLoading) {
    return (
      <div className="container-custom px-4 py-8 flex justify-center">
        <CircleEllipsis className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container-custom px-4">
      <section className="pt-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Редактировать вакансию
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Основная информация
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className={errors.title ? 'text-destructive' : ''}>Название должности</Label>
                <Input 
                  id="title" 
                  placeholder="Например: React-разработчик" 
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company" className={errors.company ? 'text-destructive' : ''}>Компания</Label>
                  <Input 
                    id="company" 
                    placeholder="Название компании" 
                    value={formData.company}
                    onChange={handleChange}
                    className={errors.company ? 'border-destructive' : ''}
                  />
                  {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
                </div>
                
                <div>
                  <Label htmlFor="location" className={errors.location ? 'text-destructive' : ''}>Местоположение</Label>
                  <Input 
                    id="location" 
                    placeholder="Город или 'Удаленно'" 
                    value={formData.location}
                    onChange={handleChange}
                    className={errors.location ? 'border-destructive' : ''}
                  />
                  {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className={errors.type ? 'text-destructive' : ''}>Тип занятости</Label>
                  <select 
                    id="type" 
                    className={`w-full h-10 px-3 py-2 bg-transparent border ${errors.type ? 'border-destructive' : 'border-input'} rounded-md`}
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="">Выберите тип</option>
                    <option value="Полная занятость">Полная занятость</option>
                    <option value="Частичная занятость">Частичная занятость</option>
                    <option value="Проектная работа">Проектная работа</option>
                    <option value="Стажировка">Стажировка</option>
                  </select>
                  {errors.type && <p className="text-xs text-destructive mt-1">{errors.type}</p>}
                </div>
                
                <div>
                  <Label htmlFor="salary" className={errors.salary ? 'text-destructive' : ''}>Зарплата</Label>
                  <Input 
                    id="salary" 
                    placeholder="Например: 150 000 - 200 000 ₽" 
                    value={formData.salary}
                    onChange={handleChange}
                    className={errors.salary ? 'border-destructive' : ''}
                  />
                  {errors.salary && <p className="text-xs text-destructive mt-1">{errors.salary}</p>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Описание вакансии
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="description" className={errors.description ? 'text-destructive' : ''}>Описание</Label>
                <Textarea 
                  id="description" 
                  placeholder="Опишите вакансию подробно..." 
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'border-destructive' : ''}
                  autoResize={true}
                />
                {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
              </div>
              
              <div>
                <Label htmlFor="requirements" className={errors.requirements ? 'text-destructive' : ''}>Требования</Label>
                <Textarea 
                  id="requirements" 
                  placeholder="Перечислите требования, каждое с новой строки" 
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  className={errors.requirements ? 'border-destructive' : ''}
                  autoResize={true}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Каждое требование с новой строки
                </p>
                {errors.requirements && <p className="text-xs text-destructive mt-1">{errors.requirements}</p>}
              </div>
              
              <div>
                <Label htmlFor="responsibilities" className={errors.responsibilities ? 'text-destructive' : ''}>Обязанности</Label>
                <Textarea 
                  id="responsibilities" 
                  placeholder="Перечислите обязанности, каждую с новой строки" 
                  rows={4}
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className={errors.responsibilities ? 'border-destructive' : ''}
                  autoResize={true}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Каждая обязанность с новой строки
                </p>
                {errors.responsibilities && <p className="text-xs text-destructive mt-1">{errors.responsibilities}</p>}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Контактная информация
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact_name" className={errors.contact_name ? 'text-destructive' : ''}>Контактное лицо</Label>
                <Input 
                  id="contact_name" 
                  placeholder="Имя и фамилия" 
                  value={formData.contact_name}
                  onChange={handleChange}
                  className={errors.contact_name ? 'border-destructive' : ''}
                />
                {errors.contact_name && <p className="text-xs text-destructive mt-1">{errors.contact_name}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contact_phone" className={errors.contact_phone ? 'text-destructive' : ''}>Телефон (опционально)</Label>
                  <Input 
                    id="contact_phone" 
                    placeholder="+7 (999) 123-45-67" 
                    value={formData.contact_phone}
                    onChange={handleChange}
                    className={errors.contact_phone ? 'border-destructive' : ''}
                  />
                  {errors.contact_phone && <p className="text-xs text-destructive mt-1">{errors.contact_phone}</p>}
                </div>
                
                <div>
                  <Label htmlFor="contact_email" className={errors.contact_email ? 'text-destructive' : ''}>Email (опционально)</Label>
                  <Input 
                    id="contact_email" 
                    type="email" 
                    placeholder="example@company.com" 
                    value={formData.contact_email}
                    onChange={handleChange}
                    className={errors.contact_email ? 'border-destructive' : ''}
                  />
                  {errors.contact_email && <p className="text-xs text-destructive mt-1">{errors.contact_email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="contact_telegram" className={errors.contact_telegram ? 'text-destructive' : ''}>Telegram (опционально)</Label>
                  <Input 
                    id="contact_telegram" 
                    placeholder="@username" 
                    value={formData.contact_telegram}
                    onChange={handleChange}
                    className={errors.contact_telegram ? 'border-destructive' : ''}
                  />
                  {errors.contact_telegram && <p className="text-xs text-destructive mt-1">{errors.contact_telegram}</p>}
                </div>
              </div>
              <p className="text-xs text-gray-500">* Укажите хотя бы один способ связи (телефон, email или Telegram)</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/my-jobs')}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditJob;
