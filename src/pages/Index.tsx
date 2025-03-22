
import { useState, useEffect } from 'react';
import { Search, MapPin, BriefcaseBusiness, Users, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SearchForm } from '@/components/SearchForm';
import { FeaturedJobs } from '@/components/FeaturedJobs';
import { JobCard } from '@/components/JobCard';
import { getRecentJobs } from '@/data/jobs';

const Index = () => {
  const [recentJobs, setRecentJobs] = useState(getRecentJobs());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className={`w-full lg:w-1/2 space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <TrendingUp className="mr-1.5 h-4 w-4" />
                Найдите идеальную работу
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Найдите свою следующую <span className="text-primary">карьерную возможность</span> прямо сейчас
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Ищете новую работу? Исследуйте тысячи вакансий и найдите идеальную позицию для вашей карьеры.
              </p>
              
              <div className="w-full max-w-3xl">
                <SearchForm />
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <BriefcaseBusiness className="mr-1.5 h-5 w-5 text-primary" />
                  <span>10,000+ вакансий</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="mr-1.5 h-5 w-5 text-primary" />
                  <span>2,000+ компаний</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="mr-1.5 h-5 w-5 text-primary" />
                  <span>Удаленная работа</span>
                </div>
              </div>
            </div>
            
            <div className={`w-full lg:w-1/2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="Job seeker"
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <FeaturedJobs />
      
      {/* Recent Jobs Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Недавние вакансии
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Просмотрите последние добавленные вакансии
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <a
              href="/search"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Просмотреть все вакансии
            </a>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Вы рекрутер или работодатель?
          </h2>
          <p className="text-primary-foreground mb-8 max-w-2xl mx-auto">
            Разместите свою вакансию и найдите идеального кандидата для вашей компании.
          </p>
          <a
            href="/post-job"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-primary bg-white hover:bg-gray-50 transition-colors"
          >
            Разместить вакансию
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xl">J</span>
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">JobFinder</span>
              </a>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                Найдите идеальную работу или разместите вакансию на нашей платформе.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Для соискателей
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/search" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      Найти работу
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      Создать резюме
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      Советы по карьере
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Для работодателей
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/post-job" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      Разместить вакансию
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      Найти кандидатов
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      Решения для найма
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  О компании
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      О нас
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      Контакты
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      Политика конфиденциальности
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              &copy; {new Date().getFullYear()} JobFinder. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
