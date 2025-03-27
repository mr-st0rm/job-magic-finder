import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

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
  role: UserRole;                         // Current user role
  toggleRole: () => void;                 // Function to switch between roles
  isAuthenticated: boolean;               // Authentication state (via Telegram)
  telegramUser: TelegramUserData | null;  // Telegram user data
  telegramInitData: string | null;        // Raw initData from Telegram
  parsedInitData: TelegramInitData | null; // Parsed initData object
  setTelegramInitData: (data: string) => void; // Function to set telegram initData
}

// Create the context with undefined initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

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

  // Parse initData when it changes
  useEffect(() => {
    if (telegramInitData) {
      try {
        // Telegram sends data as URL-encoded string
        const searchParams = new URLSearchParams(telegramInitData);
        const userData = searchParams.get('user');
        
        // Create a parsed data object
        const parsed: TelegramInitData = {
          auth_date: Number(searchParams.get('auth_date') || 0),
          hash: searchParams.get('hash') || undefined,
          query_id: searchParams.get('query_id') || undefined,
        };
        
        // Parse the user data if present
        if (userData) {
          const user = JSON.parse(userData) as TelegramUserData;
          parsed.user = user;
          setTelegramUser(user);
          setIsAuthenticated(true);
          
          // You can use Telegram user data to determine role if needed
          // For example, checking against a list of recruiter IDs
          // For now, we keep the role selection functionality
        }
        
        setParsedInitData(parsed);
        
        // Store in localStorage for persistence
        localStorage.setItem('telegramInitData', telegramInitData);
        
        toast({
          title: "Telegram данные получены",
          description: `Привет, ${parsed.user?.first_name || 'пользователь'}!`,
        });
        
        // TODO: Send initData to backend for validation (important for security)
        // This would validate that the request is actually coming from Telegram
        // Expected request: POST /api/telegram/validate { initData: telegramInitData }
        // Expected response: { valid: boolean, user?: { id, name, ... } }
        
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

  // Try to restore Telegram data from localStorage on initial load
  useEffect(() => {
    const savedInitData = localStorage.getItem('telegramInitData');
    if (savedInitData) {
      setTelegramInitData(savedInitData);
    }
    
    // Setup Telegram WebApp if it's available
    if (window.Telegram?.WebApp) {
      // Initialize Telegram WebApp
      window.Telegram.WebApp.ready();
      
      // If initData is not provided manually, get it from WebApp
      if (!telegramInitData && window.Telegram.WebApp.initData) {
        setTelegramInitData(window.Telegram.WebApp.initData);
      }
    }
  }, [telegramInitData]);

  /**
   * Toggle between applicant and recruiter roles
   * Updates local storage and could connect to an API
   */
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

  // Context value that will be provided to consumers
  const contextValue = {
    role,
    toggleRole,
    isAuthenticated,
    telegramUser,
    telegramInitData,
    parsedInitData,
    setTelegramInitData
  };

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

// Add TypeScript declaration for Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;  // Add the missing expand method
        initData: string;
        initDataUnsafe?: any;
        // Add more Telegram WebApp methods as needed
      };
    };
  }
}
