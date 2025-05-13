
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { useEffect } from "react";

// Page components
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import MyJobs from "./pages/MyJobs";
import CreateJob from "./pages/CreateJob";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import Search from "./pages/Search";
import EditJob from "./pages/EditJob";

/**
 * Create a query client instance for React Query
 * This will be used for data fetching and caching
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetches when window is focused
      retry: 1, // Only retry failed requests once
    },
  },
});

/**
 * TelegramApp component
 * Handles initialization of Telegram WebApp
 */
const TelegramApp = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Проверяем запущено ли приложение в Telegram WebApp
    const tg = window.Telegram;
    const webApp = tg?.WebApp;
    
    const isTelegramWebApp = 
      typeof window !== 'undefined' && 
      tg !== undefined && 
      webApp !== undefined && 
      typeof webApp.ready === 'function';

    // Initialize Telegram WebApp when component mounts
    if (isTelegramWebApp && webApp) {
      try {
        // Set the app to expand to full height
        webApp.expand();
        
        // Make app ready
        webApp.ready();
        
        // Log WebApp initialization
        console.log('Telegram WebApp initialized successfully');
        console.log('WebApp data:', {
          initDataUnsafe: webApp.initDataUnsafe,
          version: webApp?.version,
          platform: webApp?.platform,
          colorScheme: webApp?.colorScheme,
          viewportHeight: webApp?.viewportHeight,
          viewportStableHeight: webApp?.viewportStableHeight
        });
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
      }
    } else {
      console.log('Telegram WebApp not available - running in browser mode');
      console.log('User agent:', navigator.userAgent);
      
      // Проверка для отладки - почему не определяется Telegram WebApp
      if (tg) {
        console.log('window.Telegram exists but WebApp is missing or incomplete');
      }
    }
  }, []);

  return <>{children}</>;
};

/**
 * Main application component
 * Sets up providers and routing for the application
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <TelegramApp>
          {/* Toast notifications */}
          <Toaster />
          <Sonner />
          
          {/* Application routing */}
          <BrowserRouter>
            <Routes>
              {/* All routes are wrapped with the Layout component for consistent UI */}
              <Route path="/" element={<Layout>{<Home />}</Layout>} />
              <Route path="/job/:id" element={<Layout>{<JobDetail />}</Layout>} />
              <Route path="/profile" element={<Layout>{<Profile />}</Layout>} />
              <Route path="/my-jobs" element={<Layout>{<MyJobs />}</Layout>} />
              <Route path="/create-job" element={<Layout>{<CreateJob />}</Layout>} />
              <Route path="/edit-job/:id" element={<Layout>{<EditJob />}</Layout>} />
              <Route path="/edit-profile" element={<Layout>{<EditProfile />}</Layout>} />
              <Route path="/settings" element={<Layout>{<Settings />}</Layout>} />
              <Route path="/notifications" element={<Layout>{<Notifications />}</Layout>} />
              <Route path="/help" element={<Layout>{<Help />}</Layout>} />
              <Route path="/search" element={<Layout>{<Search />}</Layout>} />
              
              {/* Catch-all route for 404 pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TelegramApp>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
