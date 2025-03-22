
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const CreateJob = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Отправить данные на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Вакансия создана',
        description: 'Ваша вакансия успешно опубликована'
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
                <Label htmlFor="title">Название должности</Label>
                <Input id="title" placeholder="Например: React-разработчик" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Компания</Label>
                  <Input id="company" placeholder="Название компании" required />
                </div>
                
                <div>
                  <Label htmlFor="location">Местоположение</Label>
                  <Input id="location" placeholder="Город или 'Удаленно'" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Тип занятости</Label>
                  <select 
                    id="type" 
                    className="w-full h-10 px-3 py-2 bg-transparent border border-input rounded-md"
                    required
                  >
                    <option value="">Выберите тип</option>
                    <option value="Полная занятость">Полная занятость</option>
                    <option value="Частичная занятость">Частичная занятость</option>
                    <option value="Проектная работа">Проектная работа</option>
                    <option value="Стажировка">Стажировка</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="salary">Зарплата</Label>
                  <Input id="salary" placeholder="Например: 150 000 - 200 000 ₽" required />
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
                <Label htmlFor="description">Описание</Label>
                <Textarea 
                  id="description" 
                  placeholder="Опишите вакансию подробно..." 
                  rows={6}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="requirements">Требования</Label>
                <Textarea 
                  id="requirements" 
                  placeholder="Перечислите требования, каждое с новой строки" 
                  rows={4}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Каждое требование с новой строки
                </p>
              </div>
              
              <div>
                <Label htmlFor="responsibilities">Обязанности</Label>
                <Textarea 
                  id="responsibilities" 
                  placeholder="Перечислите обязанности, каждую с новой строки" 
                  rows={4}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Каждая обязанность с новой строки
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Контактная информация
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_name">Контактное лицо</Label>
                  <Input id="contact_name" placeholder="Имя и фамилия" required />
                </div>
                
                <div>
                  <Label htmlFor="contact_phone">Телефон</Label>
                  <Input id="contact_phone" placeholder="+7 (999) 123-45-67" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="contact_email">Email</Label>
                <Input 
                  id="contact_email" 
                  type="email" 
                  placeholder="example@company.com" 
                  required 
                />
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
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Публикация...' : 'Опубликовать вакансию'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateJob;
