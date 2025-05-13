
/// <reference types="vite/client" />

// Global type declarations for Telegram WebApp
interface Window {
  Telegram?: {
    WebApp?: {
      ready: () => void;
      expand: () => void;
      initData: string;
      initDataUnsafe?: any;
      version?: string;
      platform?: string;
      colorScheme?: string;
      viewportHeight?: number;
      viewportStableHeight?: number;
    };
  }
}
