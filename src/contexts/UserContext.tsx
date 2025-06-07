
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useTelegramSDK } from '@/hooks/useTelegramSDK';
import TelegramAuthRequired from '@/components/TelegramAuthRequired';

export type UserRole = 'applicant' | 'recruiter';

interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramInitData {
  user?: TelegramUserData;
  auth_date?: number;
  hash?: string;
  query_id?: string;
}

interface UserContextType {
  role: UserRole;
  toggleRole: () => void;
  isAuthenticated: boolean;
  telegramUser: TelegramUserData | null;
  telegramInitData: string | null;
  parsedInitData: TelegramInitData | null;
  authHeader: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const {
    isInitialized,
    initData,
    parsedInitData,
    telegramUser,
    isAuthenticated,
    isTelegramApp,
    error,
    authHeader
  } = useTelegramSDK();
  
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || 'applicant';
  });
  
  const [showAuthRequired, setShowAuthRequired] = useState(false);

  const toggleRole = () => {
    const newRole = role === 'applicant' ? 'recruiter' : 'applicant';
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    
    toast({
      title: "Режим изменен",
      description: `Вы переключились в режим ${newRole === 'applicant' ? 'соискателя' : 'рекрутера'}`,
    });
  };

  // Проверяем нужно ли показать экран авторизации
  useEffect(() => {
    if (isInitialized) {
      if (!isTelegramApp && !initData) {
        setShowAuthRequired(true);
      } else {
        setShowAuthRequired(false);
      }
    }
  }, [isInitialized, isTelegramApp, initData]);

  // Показываем ошибку если есть
  useEffect(() => {
    if (error) {
      toast({
        title: "Ошибка авторизации",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const contextValue = {
    role,
    toggleRole,
    isAuthenticated,
    telegramUser,
    telegramInitData: initData,
    parsedInitData,
    authHeader
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Инициализация...</p>
        </div>
      </div>
    );
  }

  if (showAuthRequired) {
    return <TelegramAuthRequired />;
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
