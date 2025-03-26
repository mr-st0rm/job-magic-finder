
import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Home, Search, User, Plus } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

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

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 h-16">
          {/* Home/Jobs button */}
          <Button
            variant="ghost"
            className="flex flex-col items-center justify-center rounded-none h-full"
            onClick={() => navigate('/')}
            aria-label={role === 'recruiter' ? "My jobs" : "Jobs"}
          >
            <Home className={`h-5 w-5 ${location.pathname === '/' ? 'text-primary' : ''}`} />
            <span className={`text-xs mt-1 ${location.pathname === '/' ? 'text-primary' : ''}`}>
              {role === 'recruiter' ? 'Мои вакансии' : 'Вакансии'}
            </span>
          </Button>

          {/* Middle button - Create for recruiter, Search for applicant */}
          {role === 'recruiter' ? (
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center rounded-none h-full"
              onClick={() => navigate('/create-job')}
              aria-label="Create job"
            >
              <Plus className={`h-5 w-5 ${location.pathname === '/create-job' ? 'text-primary' : ''}`} />
              <span className={`text-xs mt-1 ${location.pathname === '/create-job' ? 'text-primary' : ''}`}>
                Создать
              </span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center rounded-none h-full"
              onClick={() => navigate('/search')}
              aria-label="Search jobs"
            >
              <Search className={`h-5 w-5 ${location.pathname === '/search' ? 'text-primary' : ''}`} />
              <span className={`text-xs mt-1 ${location.pathname === '/search' ? 'text-primary' : ''}`}>
                Поиск
              </span>
            </Button>
          )}

          {/* Profile button */}
          <Button
            variant="ghost"
            className="flex flex-col items-center justify-center rounded-none h-full"
            onClick={() => navigate('/profile')}
            aria-label="Profile"
          >
            <User className={`h-5 w-5 ${location.pathname === '/profile' ? 'text-primary' : ''}`} />
            <span className={`text-xs mt-1 ${location.pathname === '/profile' ? 'text-primary' : ''}`}>
              Профиль
            </span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
