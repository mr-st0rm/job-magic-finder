
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    )}>
      <div className="container-custom flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">JobFinder</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? 'nav-item-active' : 'nav-item'}
            end
          >
            Главная
          </NavLink>
          <NavLink 
            to="/search" 
            className={({ isActive }) => 
              isActive ? 'nav-item-active' : 'nav-item'}
          >
            Поиск
          </NavLink>
          <NavLink 
            to="/post-job" 
            className={({ isActive }) => 
              isActive ? 'nav-item-active' : 'nav-item'}
          >
            Разместить вакансию
          </NavLink>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'fixed inset-0 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden pt-16',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex flex-col p-4 space-y-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? 'nav-item-active' : 'nav-item'}
            onClick={() => setIsMenuOpen(false)}
            end
          >
            Главная
          </NavLink>
          <NavLink 
            to="/search" 
            className={({ isActive }) => 
              isActive ? 'nav-item-active' : 'nav-item'}
            onClick={() => setIsMenuOpen(false)}
          >
            Поиск
          </NavLink>
          <NavLink 
            to="/post-job" 
            className={({ isActive }) => 
              isActive ? 'nav-item-active' : 'nav-item'}
            onClick={() => setIsMenuOpen(false)}
          >
            Разместить вакансию
          </NavLink>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="flex items-center space-x-4">
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
