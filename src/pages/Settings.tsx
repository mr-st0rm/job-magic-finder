
import { useState } from 'react';
import { Shield, Database, Bell, Languages, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [language] = useState('ru');
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    // TODO: Отправить настройки на сервер
    toast({
      title: 'Настройки сохранены',
      description: 'Ваши настройки успешно обновлены',
    });
  };
  
  return (
    <div className="container-custom px-4">
      <section className="pt-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Настройки
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Уведомления
              </h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Push-уведомления
                  </p>
                  <p className="text-xs text-gray-500">
                    Получать уведомления в браузере
                  </p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Languages className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Язык
              </h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Текущий язык
                </p>
                <div className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md">
                  {language === 'ru' ? 'Русский' : 'English'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Данные
              </h2>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                Экспортировать мои данные
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Безопасность
              </h2>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                Изменить пароль
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Separator className="my-4" />
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>
              Сохранить настройки
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
