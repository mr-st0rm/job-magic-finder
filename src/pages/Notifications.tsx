
import { useState, useEffect } from 'react';
import { BellRing, CircleEllipsis, User, Mail, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'message' | 'view' | 'application' | 'system';
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  useEffect(() => {
    // TODO: Заменить на получение данных из API
    setLoading(true);
    setTimeout(() => {
      const sampleNotifications: Notification[] = [
        {
          id: '1',
          title: 'Новый отклик на вакансию',
          description: 'Дмитрий П. откликнулся на вашу вакансию "React разработчик"',
          date: '1 час назад',
          read: false,
          type: 'application'
        },
        {
          id: '2',
          title: 'Просмотр контактов',
          description: 'Кто-то просмотрел ваши контакты по вакансии "UX/UI дизайнер"',
          date: '3 часа назад',
          read: false,
          type: 'view'
        },
        {
          id: '3',
          title: 'Сообщение от поддержки',
          description: 'Ваша вакансия "Java разработчик" успешно опубликована',
          date: 'Вчера',
          read: true,
          type: 'system'
        }
      ];
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 500);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'view':
        return <Eye className="h-5 w-5 text-green-500" />;
      case 'application':
        return <User className="h-5 w-5 text-purple-500" />;
      default:
        return <BellRing className="h-5 w-5 text-primary" />;
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
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
      <section className="pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Уведомления
          </h1>
          {notifications.some(n => !n.read) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
            >
              Отметить все как прочитанные
            </Button>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Настройки уведомлений
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Email-уведомления
              </span>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Push-уведомления
              </span>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications} 
              />
            </div>
          </div>
        </div>
        
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm ${!notification.read ? 'border-l-4 border-primary' : ''}`}
              >
                <div className="flex">
                  <div className="mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {notification.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellRing className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              У вас пока нет уведомлений
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Когда появятся новые уведомления, они будут отображаться здесь
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Notifications;
