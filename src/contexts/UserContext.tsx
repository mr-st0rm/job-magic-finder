
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import TelegramAuthRequired from '@/components/TelegramAuthRequired';

/**
 * User role types - defines the possible roles a user can have
 */
export type UserRole = 'applicant' | 'recruiter';

/**
 * Telegram user data interface
 * Represents the data from Telegram's WebApp initData
 */
interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  // Add additional fields as needed according to Telegram's WebApp documentation
}

/**
 * Telegram WebApp init data interface
 * Represents the parsed initData from Telegram WebApp
 */
interface TelegramInitData {
  user?: TelegramUserData;
  auth_date?: number;
  hash?: string;
  query_id?: string;
  // Add additional fields as needed according to Telegram's WebApp documentation
}

/**
 * User context interface defining available properties and methods
 * This defines what components can access from the context
 */
interface UserContextType {
  role: UserRole;
  toggleRole: () => void;
  isAuthenticated: boolean;
  telegramUser: TelegramUserData | null;
  telegramInitData: string | null;
  parsedInitData: TelegramInitData | null;
  authHeader: string | null;
}

// Create the context with undefined initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Функция для определения запуска в Telegram
const isTelegramWebApp = (): boolean => {
  // Проверяем наличие объекта window.Telegram и характерных свойств WebApp
  const tg = window.Telegram;
  const webApp = tg?.WebApp;
  
  return Boolean(
    typeof window !== 'undefined' && 
    tg !== undefined && 
    webApp !== undefined && 
    // Дополнительно проверяем наличие характерных методов WebApp для надежности
    typeof webApp.ready === 'function'
  );
};

/**
 * Provider component that wraps the app and makes user context available
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to the context
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  // Get the initial role from localStorage or default to 'applicant'
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'applicant';
  });
  
  // Telegram data states
  const [telegramInitData, setTelegramInitData] = useState<string | null>(null);
  const [parsedInitData, setParsedInitData] = useState<TelegramInitData | null>(null);
  const [telegramUser, setTelegramUser] = useState<TelegramUserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTelegram, setIsTelegram] = useState<boolean>(false);

  // Initialize Telegram WebApp and get initData
  useEffect(() => {
    // Определяем, запущено ли приложение в Telegram
    const isInTelegram = isTelegramWebApp();
    setIsTelegram(isInTelegram);
    
    const savedInitData = localStorage.getItem('telegramInitData');
    
    if (isInTelegram) {
      console.log('Приложение запущено в Telegram WebApp');
      
      // Initialize Telegram WebApp
      const webApp = window.Telegram?.WebApp;
      if (webApp) {
        webApp.ready();
      
        // Get initData from WebApp
        const webAppInitData = webApp.initData;
        
        if (webAppInitData) {
          console.log('Получены данные initData из Telegram WebApp');
          localStorage.setItem('telegramInitData', webAppInitData);
          setTelegramInitData(webAppInitData);
        } else if (savedInitData) {
          console.log('Используем сохраненные данные из localStorage');
          setTelegramInitData(savedInitData);
        } else {
          console.log('initData отсутствует в Telegram WebApp');
        }
      }
    } else if (savedInitData) {
      console.log('Приложение запущено в обычном браузере, используем сохраненные данные');
      setTelegramInitData(savedInitData);
    } else {
      console.log('Приложение запущено в обычном браузере без сохраненных данных');
    }
  }, []);

  // Parse initData when it changes
  useEffect(() => {
    if (telegramInitData) {
      try {
        const searchParams = new URLSearchParams(telegramInitData);
        const userData = searchParams.get('user');
        
        if (userData) {
          const user = JSON.parse(userData) as TelegramUserData;
          setTelegramUser(user);
          setIsAuthenticated(true);
          
          toast({
            title: "Telegram данные получены",
            description: `Привет, ${user.first_name}!`,
          });
        }
        
        setParsedInitData({
          auth_date: Number(searchParams.get('auth_date') || 0),
          hash: searchParams.get('hash') || undefined,
          query_id: searchParams.get('query_id') || undefined,
          user: userData ? JSON.parse(userData) : undefined
        });
        
      } catch (error) {
        console.error('Failed to parse Telegram initData:', error);
        toast({
          title: "Ошибка авторизации",
          description: "Не удалось обработать данные из Telegram",
          variant: "destructive",
        });
      }
    }
  }, [telegramInitData, toast]);

  // Toggle between applicant and recruiter roles
  const toggleRole = () => {
    const newRole = role === 'applicant' ? 'recruiter' : 'applicant';
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    
    toast({
      title: "Режим изменен",
      description: `Вы переключились в режим ${newRole === 'applicant' ? 'соискателя' : 'рекрутера'}`,
    });
    
    // TODO: Connect to API to update user role preference
    // Expected request: PUT /api/users/preferences { userId: telegramUser?.id, role: newRole }
    // Expected response: { success: boolean, user: { role: string, ... } }
  };

  // Get the auth header value
  const authHeader = telegramInitData ? `X-Auth: ${telegramInitData}` : null;

  // Context value that will be provided to consumers
  const contextValue = {
    role,
    toggleRole,
    isAuthenticated,
    telegramUser,
    telegramInitData,
    parsedInitData,
    authHeader
  };

  // Если приложение должно быть запущено в Telegram, но мы не в нем,
  // и нет никаких сохраненных данных, показываем экран требования Telegram
  if (!isTelegram && !telegramInitData) {
    return <TelegramAuthRequired />;
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to use the user context
 * Provides an easy way for components to access user-related functionality
 * @returns The user context object with all properties and methods
 * @throws Error if used outside of UserProvider
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
