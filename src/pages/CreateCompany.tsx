
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CompanyCreateSchema } from '@/types/company';
import { api } from '@/utils/api';
import { Building2, Globe, MapPin, Users, Calendar } from 'lucide-react';

const CreateCompany = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyCreateSchema>();

  const onSubmit = async (data: CompanyCreateSchema) => {
    try {
      setIsSubmitting(true);
      
      await api.createCompany(data);
      
      toast({
        title: 'Компания создана',
        description: 'Компания успешно добавлена в ваш список'
      });
      navigate('/my-companies');
      
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать компанию',
        variant: 'destructive'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom px-4">
      <section className="pt-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Добавить компанию
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Основная информация
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Название компании *</Label>
                <Input
                  id="name"
                  {...register('name', { 
                    required: 'Введите название компании',
                    minLength: { value: 2, message: 'Минимум 2 символа' }
                  })}
                  placeholder="Например: ООО ТехноИнновации"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Описание компании</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Краткое описание деятельности компании..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="website">Веб-сайт</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-input rounded-l-md">
                    <Globe className="h-4 w-4 text-gray-500" />
                  </span>
                  <Input
                    id="website"
                    {...register('website', {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Введите корректный URL (с http:// или https://)'
                      }
                    })}
                    placeholder="https://example.com"
                    className={`rounded-l-none ${errors.website ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.website && (
                  <p className="text-xs text-destructive mt-1">{errors.website.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Местоположение</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-input rounded-l-md">
                    <MapPin className="h-4 w-4 text-gray-500" />
                  </span>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="Москва, Россия"
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employees_count">Количество сотрудников</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-input rounded-l-md">
                      <Users className="h-4 w-4 text-gray-500" />
                    </span>
                    <Input
                      id="employees_count"
                      type="number"
                      {...register('employees_count', {
                        min: { value: 1, message: 'Минимум 1 сотрудник' },
                        max: { value: 1000000, message: 'Максимум 1,000,000 сотрудников' }
                      })}
                      placeholder="50"
                      className={`rounded-l-none ${errors.employees_count ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.employees_count && (
                    <p className="text-xs text-destructive mt-1">{errors.employees_count.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="founded_year">Год основания</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-input rounded-l-md">
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </span>
                    <Input
                      id="founded_year"
                      type="number"
                      {...register('founded_year', {
                        min: { value: 1800, message: 'Минимум 1800 год' },
                        max: { value: new Date().getFullYear(), message: 'Максимум текущий год' }
                      })}
                      placeholder="2020"
                      className={`rounded-l-none ${errors.founded_year ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.founded_year && (
                    <p className="text-xs text-destructive mt-1">{errors.founded_year.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/my-companies')}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Создание...' : 'Создать компанию'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateCompany;
