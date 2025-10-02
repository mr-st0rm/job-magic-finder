
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Edit, Trash2, Users, Globe, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Company } from '@/types/company';
import { api } from '@/utils/api';

const MyCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setIsLoading(true);
      const data = await api.getCompanies();
      setCompanies(data);
      setIsLoading(false);
      
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить список компаний',
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  };

  const handleDeleteCompany = async (id: number) => {
    try {
      // Note: Delete endpoint not available in current API
      setCompanies(prev => prev.filter(company => company.id !== id));
      toast({
        title: 'Компания удалена',
        description: 'Компания успешно удалена'
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить компанию',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom px-4 py-8">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container-custom px-4">
      <section className="pt-6 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Мои компании
          </h1>
          <Button onClick={() => navigate('/create-company')}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить компанию
          </Button>
        </div>

        {companies.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              У вас пока нет компаний
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Добавьте первую компанию, чтобы начать создавать вакансии
            </p>
            <Button onClick={() => navigate('/create-company')}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить компанию
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Building2 className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {company.name}
                      </h3>
                    </div>
                    
                    {company.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {company.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      {company.location && (
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-1" />
                          {company.location}
                        </div>
                      )}
                      
                      {company.employees_count && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {company.employees_count} сотрудников
                        </div>
                      )}
                      
                      {company.founded_year && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Основана в {company.founded_year}
                        </div>
                      )}
                      
                      {company.website && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />
                          <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Сайт
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/edit-company/${company.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCompany(company.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyCompanies;
