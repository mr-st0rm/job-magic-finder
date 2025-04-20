
import { useUser } from "@/contexts/UserContext";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export const createApiClient = () => {
  const { telegramInitData } = useUser();

  const fetcher = async (endpoint: string, options: FetchOptions = {}) => {
    const { params, headers = {}, ...rest } = options;
    
    // Всегда добавляем актуальный telegramInitData в headers
    if (telegramInitData) {
      headers['X-Auth'] = telegramInitData;
    }

    // Построение URL с параметрами
    const url = new URL(endpoint, process.env.VITE_API_URL || 'http://localhost:3000');
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...rest,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  };

  return {
    get: <T>(endpoint: string, options?: FetchOptions) => 
      fetcher(endpoint, { ...options, method: 'GET' }) as Promise<T>,
    
    post: <T>(endpoint: string, data?: any, options?: FetchOptions) =>
      fetcher(endpoint, { 
        ...options, 
        method: 'POST',
        body: JSON.stringify(data)
      }) as Promise<T>,
    
    put: <T>(endpoint: string, data?: any, options?: FetchOptions) =>
      fetcher(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data)
      }) as Promise<T>,
    
    delete: <T>(endpoint: string, options?: FetchOptions) =>
      fetcher(endpoint, { ...options, method: 'DELETE' }) as Promise<T>,
  };
};
