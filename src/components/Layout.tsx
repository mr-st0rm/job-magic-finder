
import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Home, Search, User, BriefcaseBusiness } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useUser();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Проверка, находимся ли мы на главной странице
  const isHome = location.pathname === '/';

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
      {/* Шапка */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
            {!isHome && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="font-bold text-xl text-gray-900 dark:text-white flex items-center">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">HR</span>
              </div>
              HRocket
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="pt-14 pb-16">
        {children}
      </main>

      {/* Нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 h-16">
          <Button
            variant="ghost"
            className="flex flex-col items-center justify-center rounded-none h-full"
            onClick={() => navigate('/')}
          >
            <Home className={`h-5 w-5 ${location.pathname === '/' ? 'text-primary' : ''}`} />
            <span className={`text-xs mt-1 ${location.pathname === '/' ? 'text-primary' : ''}`}>
              Вакансии
            </span>
          </Button>

          {role === 'recruiter' ? (
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center rounded-none h-full"
              onClick={() => navigate('/my-jobs')}
            >
              <BriefcaseBusiness className={`h-5 w-5 ${location.pathname === '/my-jobs' ? 'text-primary' : ''}`} />
              <span className={`text-xs mt-1 ${location.pathname === '/my-jobs' ? 'text-primary' : ''}`}>
                Мои вакансии
              </span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center rounded-none h-full"
              onClick={() => navigate('/search')}
            >
              <Search className={`h-5 w-5 ${location.pathname === '/search' ? 'text-primary' : ''}`} />
              <span className={`text-xs mt-1 ${location.pathname === '/search' ? 'text-primary' : ''}`}>
                Поиск
              </span>
            </Button>
          )}

          <Button
            variant="ghost"
            className="flex flex-col items-center justify-center rounded-none h-full"
            onClick={() => navigate('/profile')}
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
