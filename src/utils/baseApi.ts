import { retrieveRawInitData } from "@telegram-apps/sdk";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export const createApiClient = () => {
  const fetcher = async (endpoint: string, options: FetchOptions = {}) => {
    const { params, headers = {}, ...rest } = options;

    // Получаем актуальный initData через Telegram SDK
    const rawInitData = retrieveRawInitData();

    if (rawInitData) {
      headers['X-Auth'] = rawInitData;
    }

    // Построение URL с параметрами
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const url = new URL(endpoint, baseUrl);
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

    patch: <T>(endpoint: string, data?: any, options?: FetchOptions) =>
        fetcher(endpoint, {
          ...options,
          method: 'PATCH',
          body: JSON.stringify(data)
        }) as Promise<T>,

    delete: <T>(endpoint: string, options?: FetchOptions) =>
      fetcher(endpoint, { ...options, method: 'DELETE' }) as Promise<T>,
  };
};
