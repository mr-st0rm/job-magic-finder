
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Upload, Briefcase, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const EditProfile = () => {
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
        title: 'Профиль обновлен',
        description: 'Ваши данные успешно сохранены'
      });
      navigate('/profile');
    }, 1000);
  };
  
  return (
    <div className="container-custom px-4">
      <section className="pt-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Редактирование профиля
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center relative flex-shrink-0">
                <User className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <div className="absolute bottom-0 right-0">
                  <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Фото профиля
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Рекомендуемый размер 200x200 пикселей
                </p>
              </div>
            </div>
            
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Личная информация
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" defaultValue="Иван" required />
                </div>
                
                <div>
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" defaultValue="Иванов" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-input rounded-l-md">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </span>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue="ivan@example.com" 
                      className="rounded-l-none" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-input rounded-l-md">
                      <Phone className="h-4 w-4 text-gray-500" />
                    </span>
                    <Input 
                      id="phone" 
                      type="tel" 
                      defaultValue="+7 (999) 123-45-67" 
                      className="rounded-l-none" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Местоположение</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-input rounded-l-md">
                    <MapPin className="h-4 w-4 text-gray-500" />
                  </span>
                  <Input 
                    id="location" 
                    defaultValue="Москва" 
                    className="rounded-l-none" 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">О себе</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Расскажите о себе..." 
                  rows={4}
                  defaultValue="Опытный специалист в области IT с более чем 5-летним стажем работы."
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Опыт работы
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Старший разработчик
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ООО "ТехноПлюс"
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    2020 - н.в.
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Разработка и поддержка веб-приложений, менторинг младших разработчиков.
                </p>
              </div>
            </div>
            
            <Button variant="outline" type="button" className="w-full">
              Добавить место работы
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Образование
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Московский Технический Университет
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Информационные технологии
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    2012 - 2016
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Бакалавр компьютерных наук
                </p>
              </div>
            </div>
            
            <Button variant="outline" type="button" className="w-full">
              Добавить образование
            </Button>
          </div>
          
          <Separator />
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/profile')}
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

export default EditProfile;
