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
import { useCompanies } from '@/hooks/useCompanies';
import { useCategories } from '@/hooks/useCategories';
import { useSkills } from '@/hooks/useSkills';
import { api } from '@/utils/api';
import { JobType } from '@/types/vacancy';
import { CircleEllipsis } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company_id: 0,
    location: '',
    work_type: '' as JobType | '',
    salary_min: '' as string,
    salary_max: '' as string,
    salary_currency: 'RUB',
    description: '',
    requirements: '',
    responsibilities: '',
    category_id: 0,
    skills: [] as number[],
    is_recommended: false,
    is_featured: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load reference data
  const { data: companies = [], isLoading: isLoadingCompanies } = useCompanies();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: skills = [], isLoading: isLoadingSkills } = useSkills();

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
    const processedValue = fieldName === 'company_id' || fieldName === 'category_id' 
      ? parseInt(value) 
      : value;
    setFormData(prev => ({ ...prev, [fieldName]: processedValue }));
    
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
    if (!formData.work_type) newErrors.work_type = 'Выберите тип занятости';
    if (!formData.category_id) newErrors.category_id = 'Выберите категорию';
    
    if (!formData.description.trim()) newErrors.description = 'Добавьте описание вакансии';
    if (!formData.requirements.trim()) newErrors.requirements = 'Укажите требования';
    if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Укажите обязанности';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const vacancyData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        salary_min: formData.salary_min ? parseFloat(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseFloat(formData.salary_max) : null,
        salary_currency: formData.salary_currency || null,
        work_type: formData.work_type as JobType,
        location: formData.location || null,
        is_recommended: formData.is_recommended,
        is_featured: formData.is_featured,
        category_id: formData.category_id,
        company_id: formData.company_id,
        skills: formData.skills.length > 0 ? formData.skills : null,
      };

      await api.createVacancy(vacancyData);
      
      toast({
        title: 'Вакансия создана',
        description: `Ваша вакансия отправлена на проверку${formData.is_featured ? ' и будет выделена после одобрения' : ''}`,
        duration: 5000,
      });
      navigate('/my-jobs');
    } catch (error) {
      console.error('Error creating vacancy:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать вакансию',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isLoadingCompanies || isLoadingCategories || isLoadingSkills;

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
                  {companies.length === 0 ? (
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
                      value={formData.company_id ? formData.company_id.toString() : ''}
                      onValueChange={(value) => handleSelectChange(value, 'company_id')}
                    >
                      <SelectTrigger className={errors.company_id ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Выберите компанию" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id.toString()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {errors.company_id && <p className="text-xs text-destructive mt-1">{errors.company_id}</p>}
                </div>
                
                <div>
                  <Label htmlFor="category_id" className={errors.category_id ? 'text-destructive' : ''}>Категория</Label>
                  <Select
                    value={formData.category_id ? formData.category_id.toString() : ''}
                    onValueChange={(value) => handleSelectChange(value, 'category_id')}
                  >
                    <SelectTrigger className={errors.category_id ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category_id && <p className="text-xs text-destructive mt-1">{errors.category_id}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                <div>
                  <Label htmlFor="work_type" className={errors.work_type ? 'text-destructive' : ''}>Тип занятости</Label>
                  <Select
                    value={formData.work_type}
                    onValueChange={(value) => handleSelectChange(value, 'work_type')}
                  >
                    <SelectTrigger className={errors.work_type ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Полная занятость</SelectItem>
                      <SelectItem value="PART_TIME">Частичная занятость</SelectItem>
                      <SelectItem value="CONTRACT">Проектная работа</SelectItem>
                      <SelectItem value="FREELANCE">Фриланс</SelectItem>
                      <SelectItem value="REMOTE">Удаленная работа</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.work_type && <p className="text-xs text-destructive mt-1">{errors.work_type}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="salary_min">Зарплата от</Label>
                  <Input 
                    id="salary_min" 
                    type="number"
                    placeholder="150000" 
                    value={formData.salary_min}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="salary_max">Зарплата до</Label>
                  <Input 
                    id="salary_max" 
                    type="number"
                    placeholder="200000" 
                    value={formData.salary_max}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="salary_currency">Валюта</Label>
                  <Select
                    value={formData.salary_currency}
                    onValueChange={(value) => handleSelectChange(value, 'salary_currency')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Валюта" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RUB">₽ Рубль</SelectItem>
                      <SelectItem value="USD">$ Доллар</SelectItem>
                      <SelectItem value="EUR">€ Евро</SelectItem>
                    </SelectContent>
                  </Select>
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
                />
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
                />
                {errors.responsibilities && <p className="text-xs text-destructive mt-1">{errors.responsibilities}</p>}
              </div>
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
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="is_featured"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                >
                  Выделить вакансию (рекомендуемая)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_recommended"
                  checked={formData.is_recommended}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="is_recommended"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                >
                  Добавить в рекомендуемые вакансии
                </label>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Проверка модерации
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Все новые вакансии отправляются на проверку модератора перед публикацией. 
                        Обычно проверка занимает несколько часов.
                      </p>
                    </div>
                  </div>
                </div>
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
              {isSubmitting ? 'Отправка на проверку...' : 'Создать вакансию'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateJob;
