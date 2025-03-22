
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Пользователь попытался получить доступ к несуществующему маршруту:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
          <div className="absolute top-2 right-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
            <Search className="h-5 w-5 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Страница не найдена</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button variant="default" className="w-full flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              На главную
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="outline" className="w-full">
              К поиску вакансий
            </Button>
          </Link>
        </div>
      </div>
      
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        HRocket &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default NotFound;
