
import { useEffect, useState } from 'react';
import { init, miniApp, retrieveRawInitData } from '@telegram-apps/sdk';
import { useToast } from '@/hooks/use-toast';

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

export const useTelegramSDK = () => {
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);
  const [initData, setInitData] = useState<string | null>(null);
  const [parsedInitData, setParsedInitData] = useState<TelegramInitData | null>(null);
  const [telegramUser, setTelegramUser] = useState<TelegramUserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTelegramApp, setIsTelegramApp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeTelegramSDK = async () => {
      try {
        // Инициализируем Telegram SDK
        await init();
        setIsTelegramApp(true);

        // Проверяем готовность miniApp
        if (miniApp.ready.isAvailable()) {
          await miniApp.ready();
        }

        // Получаем raw initData
        const rawInitData = retrieveRawInitData();
        
        if (rawInitData) {
          setInitData(rawInitData);
          localStorage.setItem('telegramInitData', rawInitData);
          
          // Парсим initData
          const searchParams = new URLSearchParams(rawInitData);
          const userData = searchParams.get('user');
          
          if (userData) {
            const user = JSON.parse(userData) as TelegramUserData;
            setTelegramUser(user);
            setIsAuthenticated(true);
          }
          
          setParsedInitData({
            auth_date: Number(searchParams.get('auth_date') || 0),
            hash: searchParams.get('hash') || undefined,
            query_id: searchParams.get('query_id') || undefined,
            user: userData ? JSON.parse(userData) : undefined
          });
        } else {
          // Пробуем получить сохраненные данные
          const savedInitData = localStorage.getItem('telegramInitData');
          if (savedInitData) {
            setInitData(savedInitData);
            
            const searchParams = new URLSearchParams(savedInitData);
            const userData = searchParams.get('user');
            
            if (userData) {
              const user = JSON.parse(userData) as TelegramUserData;
              setTelegramUser(user);
              setIsAuthenticated(true);
            }
          }
        }
        
        setIsInitialized(true);
        
      } catch (error) {
        console.error('Ошибка инициализации Telegram SDK:', error);
        setError('Ошибка открытия приложения. Попробуйте снова ❤️');
        setIsTelegramApp(false);
        
        // Пробуем получить сохраненные данные как fallback
        const savedInitData = localStorage.getItem('telegramInitData');
        if (savedInitData) {
          setInitData(savedInitData);
          
          const searchParams = new URLSearchParams(savedInitData);
          const userData = searchParams.get('user');
          
          if (userData) {
            const user = JSON.parse(userData) as TelegramUserData;
            setTelegramUser(user);
            setIsAuthenticated(true);
          }
        }
        
        setIsInitialized(true);
      }
    };

    initializeTelegramSDK();
  }, [toast]);

  return {
    isInitialized,
    initData,
    parsedInitData,
    telegramUser,
    isAuthenticated,
    isTelegramApp,
    error,
    authHeader: initData ? `X-Auth: ${initData}` : null
  };
};
