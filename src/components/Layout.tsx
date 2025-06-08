import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Home, Search, User, Sparkles, BriefcaseBusiness, PlusCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {api} from "@/utils/api.ts";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Handles theme switching and navigation
 */
const Layout = ({ children }: LayoutProps) => {
  // State for dark/light theme
  const [darkMode, setDarkMode] = useState(false);
  
  // Hooks for navigation
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Get user role from context
  const { role } = useUser();

  /**
   * Load theme preference from localStorage on initial render
   */
  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      const isDark = savedTheme === 'true';
      setDarkMode(isDark);
      
      // Apply theme to document
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  /**
   * Toggle between dark and light theme
   */
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', String(newDarkMode));
    api.updateCurrentUserSettings({ settings: { dark_mode: darkMode } }).then();
    
    // Apply theme to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Define which pages are considered "main pages" to hide back button
  const isMainPage = location.pathname === '/' || 
                     location.pathname === '/my-jobs' || 
                     location.pathname === '/create-job' ||
                     (role === 'recruiter' && location.pathname === '/');
  
  // Only show back button on non-main pages
  const showBackButton = !isMainPage;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900`}>
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
            {/* Back button - only shown on non-main pages */}
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="mr-2"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            {/* App logo and name */}
            <div className="font-bold text-xl text-gray-900 dark:text-white flex items-center">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">HR</span>
              </div>
              HRocket
            </div>
          </div>
          
          {/* Theme toggle button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <main className="pt-14 pb-16">
        {children}
      </main>

      {/* Bottom navigation bar - Different for recruiter and applicant roles */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="grid grid-cols-3 h-16">
          {role === 'recruiter' ? (
            <>
              {/* My Jobs tab - Recruiter */}
              <Link 
                to="/my-jobs"
                className={`flex flex-col items-center justify-center h-full ${location.pathname === '/my-jobs' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <BriefcaseBusiness className="h-5 w-5" />
                <span className="text-xs mt-1">Мои вакансии</span>
              </Link>

              {/* Create Job tab - Recruiter */}
              <Link 
                to="/create-job"
                className={`flex flex-col items-center justify-center h-full ${location.pathname === '/create-job' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <PlusCircle className="h-5 w-5" />
                <span className="text-xs mt-1">Создать</span>
              </Link>

              {/* Profile tab - Recruiter */}
              <Link 
                to="/profile"
                className={`flex flex-col items-center justify-center h-full ${location.pathname === '/profile' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <User className="h-5 w-5" />
                <span className="text-xs mt-1">Профиль</span>
              </Link>
            </>
          ) : (
            <>
              {/* Home tab - Applicant */}
              <Link 
                to="/"
                className={`flex flex-col items-center justify-center h-full ${location.pathname === '/' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <Home className="h-5 w-5" />
                <span className="text-xs mt-1">Вакансии</span>
              </Link>

              {/* Search tab - Applicant */}
              <Link 
                to="/search"
                className={`flex flex-col items-center justify-center h-full ${location.pathname === '/search' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <Search className="h-5 w-5" />
                <span className="text-xs mt-1">Поиск</span>
              </Link>

              {/* Profile tab - Applicant */}
              <Link 
                to="/profile"
                className={`flex flex-col items-center justify-center h-full ${location.pathname === '/profile' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <User className="h-5 w-5" />
                <span className="text-xs mt-1">Профиль</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
