
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  BriefcaseBusiness, 
  Bell,
  ChevronRight, 
  HelpCircle,
  RefreshCw,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';
import {api} from "@/utils/api.ts";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { role, toggleRole } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    api.getCurrentUser().then((usr) => setUser(usr));
  }, []);

  const handleToggleRole = () => {
    toggleRole();
    toast({
      title: role === 'applicant' ? 'Режим рекрутера активирован' : 'Режим соискателя активирован',
      description: 'Ваш интерфейс обновлен согласно выбранной роли',
    });
    api.updateCurrentUserSettings({role}).then();
  };

  return (
    <div className="container-custom px-4">
      {/* Шапка профиля */}
      <section className="pt-6 pb-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.first_name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {role === 'applicant' ? 'Соискатель' : 'Рекрутер'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Режим пользователя */}
      <section className="py-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 text-primary mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Режим рекрутера</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Включите, чтобы размещать вакансии
                </p>
              </div>
            </div>
            <Switch 
              checked={role === 'recruiter'} 
              onCheckedChange={handleToggleRole}
            />
          </div>
        </div>
      </section>

      {/* Настройки аккаунта */}
      <section className="py-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-1">Настройки аккаунта</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <Button 
            variant="ghost" 
            className="w-full justify-start py-3 px-4 rounded-none border-b border-gray-100 dark:border-gray-700"
            onClick={() => navigate('/edit-profile')}
          >
            <User className="h-5 w-5 mr-3 text-gray-500" />
            <span className="flex-1 text-left">Личные данные</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start py-3 px-4 rounded-none border-b border-gray-100 dark:border-gray-700"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5 mr-3 text-gray-500" />
            <span className="flex-1 text-left">Настройки</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start py-3 px-4 rounded-none border-b border-gray-100 dark:border-gray-700"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5 mr-3 text-gray-500" />
            <span className="flex-1 text-left">Уведомления</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start py-3 px-4 rounded-none"
            onClick={() => navigate('/help')}
          >
            <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
            <span className="flex-1 text-left">Помощь и поддержка</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
      </section>

      {/* Блок для рекрутера */}
      {role === 'recruiter' && (
        <section className="py-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-1">Инструменты рекрутера</h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <Button 
              variant="ghost" 
              className="w-full justify-start py-3 px-4 rounded-none border-b border-gray-100 dark:border-gray-700"
              onClick={() => navigate('/my-companies')}
            >
              <Building2 className="h-5 w-5 mr-3 text-gray-500" />
              <span className="flex-1 text-left">Мои компании</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start py-3 px-4 rounded-none border-b border-gray-100 dark:border-gray-700"
              onClick={() => navigate('/my-jobs')}
            >
              <BriefcaseBusiness className="h-5 w-5 mr-3 text-gray-500" />
              <span className="flex-1 text-left">Мои вакансии</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start py-3 px-4 rounded-none"
              onClick={() => navigate('/create-job')}
            >
              <BriefcaseBusiness className="h-5 w-5 mr-3 text-gray-500" />
              <span className="flex-1 text-left">Создать вакансию</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;
