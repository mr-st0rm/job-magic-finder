
import { useState, useEffect } from 'react';
import { BellRing, CircleEllipsis, User, Mail, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

/**
 * Notification data type
 */
type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'message' | 'view' | 'application' | 'system';
};

/**
 * Notifications page component
 * Shows user notifications and notification settings
 */
const Notifications = () => {
  // State
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  /**
   * Fetch notifications on component mount
   */
  useEffect(() => {
    fetchNotifications();
  }, []);

  /**
   * Fetch notifications from API
   * TODO: Replace with actual API call
   * Expected request: GET /api/notifications
   * Expected response: { notifications: Notification[] }
   */
  const fetchNotifications = () => {
    setLoading(true);

    setTimeout(() => {
      const sampleNotifications: Notification[] = [];
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 500);
  };

  /**
   * Get icon for notification based on type
   */
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
  
  /**
   * Mark all notifications as read
   * TODO: Connect to API
   * Expected request: PUT /api/notifications/read-all
   * Expected response: { success: boolean }
   */
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    
    // TODO: Send API request to mark all as read
  };
  
  /**
   * Update notification settings
   * TODO: Connect to API
   * Expected request: PUT /api/notifications/settings { email: boolean, push: boolean }
   * Expected response: { success: boolean, settings: { email: boolean, push: boolean } }
   */
  const updateNotificationSettings = (type: 'email' | 'push', value: boolean) => {
    if (type === 'email') {
      setEmailNotifications(value);
    } else {
      setPushNotifications(value);
    }
    
    // TODO: Send API request to update settings
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
      <section className="pt-6 pb-4">
        {/* Header with mark all as read button */}
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

        {/* Notification settings */}
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
                onCheckedChange={(value) => updateNotificationSettings('email', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Push-уведомления
              </span>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={(value) => updateNotificationSettings('push', value)}
              />
            </div>
          </div>
        </div>
        
        {/* Notification list */}
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
          // Empty state
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
