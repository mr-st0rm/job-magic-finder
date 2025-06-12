import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { companiesApi, Company } from '@/utils/companiesApi';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company_id: '', // Изменено с company на company_id
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
    isPremium: false,
    isFeatured: false,
    status: 'draft' as 'draft' | 'published',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  // Загружаем список компаний пользователя
  const { data: companies = [], isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['my-companies'],
    queryFn: companiesApi.getMyCompanies,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };
  
  const handleSelectChange = (value: string, fieldName: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Введите название должности';
    if (!formData.company_id) newErrors.company_id = 'Выберите компанию';
    if (!formData.location.trim()) newErrors.location = 'Введите местоположение';
    if (!formData.type) newErrors.type = 'Выберите тип занятости';
    
    if (!formData.salary.trim()) {
      newErrors.salary = 'Введите информацию о зарплате';
    } else if (!/\d/.test(formData.salary)) {
      newErrors.salary = 'Зарплата должна содержать хотя бы одну цифру';
    }
    
    if (!formData.description.trim()) newErrors.description = 'Добавьте описание вакансии';
    if (!formData.requirements.trim()) newErrors.requirements = 'Укажите требования';
    if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Укажите обязанности';
    
    if (!formData.contact_name.trim()) newErrors.contact_name = 'Укажите контактное лицо';
    
    const hasEmail = formData.contact_email.trim() !== '';
    const hasPhone = formData.contact_phone.trim() !== '';
    const hasTelegram = formData.contact_telegram.trim() !== '';
    
    if (!hasEmail && !hasPhone && !hasTelegram) {
      newErrors.contact_email = 'Укажите хотя бы один способ связи';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // TODO: Отправить данные на сервер
    console.log('Создание вакансии с данными:', formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      const statusMessage = formData.status === 'published' 
        ? 'опубликована' 
        : 'сохранена как черновик';
          
      toast({
        title: 'Вакансия создана',
        description: `Ваша вакансия успешно ${statusMessage}${formData.isPremium ? ' и будет выделена в результатах поиска' : ''}`,
        duration: 5000,
      });
      navigate('/my-jobs');
    }, 1000);
  };

  return (
    <div className="container-custom px-4">
      <section className="pt-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Создать вакансию
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
                  <Label htmlFor="company_id" className={errors.company_id ? 'text-destructive' : ''}>Компания</Label>
                  {isLoadingCompanies ? (
                    <div className="h-10 border rounded-md flex items-center px-3 text-gray-500">
                      Загрузка компаний...
                    </div>
                  ) : companies.length === 0 ? (
                    <div className="space-y-2">
                      <div className="h-10 border rounded-md flex items-center px-3 text-gray-500">
                        У вас нет компаний
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/create-company')}
                      >
                        Создать компанию
                      </Button>
                    </div>
                  ) : (
                    <Select
                      value={formData.company_id}
                      onValueChange={(value) => handleSelectChange(value, 'company_id')}
                    >
                      <SelectTrigger className={errors.company_id ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Выберите компанию" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 shadow-lg">
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {errors.company_id && <p className="text-xs text-destructive mt-1">{errors.company_id}</p>}
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
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange(value, 'type')}
                  >
                    <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 shadow-lg">
                      <SelectItem value="Полная занятость">Полная занятость</SelectItem>
                      <SelectItem value="Частичная занятость">Частичная занятость</SelectItem>
                      <SelectItem value="Проектная работа">Проектная работа</SelectItem>
                      <SelectItem value="Стажировка">Стажировка</SelectItem>
                    </SelectContent>
                  </Select>
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
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
              <p className="text-xs text-gray-500 dark:text-gray-400">* Укажите хотя бы один способ связи (телефон, email или Telegram)</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Параметры публикации
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPremium"
                  checked={formData.isPremium}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="isPremium"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                >
                  Выделение вакансии в поиске (платно)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                >
                  Добавить в рекомендуемые вакансии (платно)
                </label>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Label htmlFor="status">Статус публикации</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange(value as 'draft' | 'published', 'status')}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 shadow-lg">
                    <SelectItem value="draft">Сохранить как черновик</SelectItem>
                    <SelectItem value="published">Опубликовать сразу</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Обратите внимание:</strong> Выделение вакансии и добавление в рекомендуемые тарифицируются отдельно.
                </p>
              </div>
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
              disabled={isSubmitting || companies.length === 0}
              className="flex-1"
            >
              {isSubmitting ? 'Публикация...' : formData.status === 'published' 
                ? 'Опубликовать вакансию' 
                : 'Сохранить черновик'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateJob;
