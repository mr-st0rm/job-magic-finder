import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { jobCategories, jobTypes, locations } from '@/data/jobs';
import { Briefcase, Check, CreditCard, Rocket, User } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    category: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    companyDescription: '',
    companyWebsite: '',
    contactEmail: ''
  });
  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Вакансия опубликована",
      description: "Ваша вакансия была успешно размещена.",
    });
    
    // In a real app, we would submit the form data to the backend here
    // For now, we'll just navigate to the home page
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderSteps = () => (
    <div className="relative mb-10">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
      </div>
      <div className="relative flex justify-between">
        <div className="flex items-center">
          <div className={`
            rounded-full h-10 w-10 flex items-center justify-center z-10
            ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}
          `}>
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="hidden sm:block ml-3 font-medium text-sm">
            Информация о вакансии
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`
            rounded-full h-10 w-10 flex items-center justify-center z-10
            ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}
          `}>
            <User className="h-5 w-5" />
          </div>
          <div className="hidden sm:block ml-3 font-medium text-sm">
            Информация о компании
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`
            rounded-full h-10 w-10 flex items-center justify-center z-10
            ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}
          `}>
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="hidden sm:block ml-3 font-medium text-sm">
            Оплата и публикация
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-16 container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Разместите вакансию
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Заполните форму ниже, чтобы опубликовать вакансию на нашей платформе.
          </p>
          
          {renderSteps()}
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Информация о вакансии</CardTitle>
                  <CardDescription>
                    Заполните базовую информацию о вакансии, которую хотите разместить.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Название должности</Label>
                    <Input 
                      id="title" 
                      placeholder="Например: Frontend Developer" 
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => updateFormData('category', value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobCategories.slice(1).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Тип занятости</Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value) => updateFormData('type', value)}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.slice(1).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Местоположение</Label>
                      <Select 
                        value={formData.location} 
                        onValueChange={(value) => updateFormData('location', value)}
                      >
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Выберите местоположение" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.slice(1).map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="salary">Зарплата</Label>
                      <Input 
                        id="salary" 
                        placeholder="Например: $80,000 - $100,000" 
                        value={formData.salary}
                        onChange={(e) => updateFormData('salary', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание вакансии</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Опишите вакансию и ответственности..." 
                      rows={5}
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      required
                      autoResize={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Требования</Label>
                    <Textarea 
                      id="requirements" 
                      placeholder="Перечислите требования (по одному на строку)..." 
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => updateFormData('requirements', e.target.value)}
                      autoResize={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="responsibilities">Обязанности</Label>
                    <Textarea 
                      id="responsibilities" 
                      placeholder="Перечислите обязанности (по одной на строку)..." 
                      rows={4}
                      value={formData.responsibilities}
                      onChange={(e) => updateFormData('responsibilities', e.target.value)}
                      autoResize={true}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Далее
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Информация о компании</CardTitle>
                  <CardDescription>
                    Расскажите больше о вашей компании.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Название компании</Label>
                    <Input 
                      id="company" 
                      placeholder="Например: Acme Inc." 
                      value={formData.company}
                      onChange={(e) => updateFormData('company', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Веб-сайт компании</Label>
                    <Input 
                      id="companyWebsite" 
                      placeholder="https://example.com" 
                      type="url"
                      value={formData.companyWebsite}
                      onChange={(e) => updateFormData('companyWebsite', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyDescription">О компании</Label>
                    <Textarea 
                      id="companyDescription" 
                      placeholder="Расскажите о вашей компании, миссии и культуре..." 
                      rows={5}
                      value={formData.companyDescription}
                      onChange={(e) => updateFormData('companyDescription', e.target.value)}
                      autoResize={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Контактный email</Label>
                    <Input 
                      id="contactEmail" 
                      placeholder="contact@example.com" 
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateFormData('contactEmail', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Далее
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Оплата и публикация</CardTitle>
                  <CardDescription>
                    Выберите план публикации и разместите вашу вакансию.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Базовый</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">30 дней</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">$49</span>
                      </div>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Стандартное размещение
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Включён в результаты поиска
                        </li>
                        <li className="flex items-center opacity-50">
                          <Check className="h-4 w-4 mr-2" />
                          Выделенное размещение
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-2 border-primary rounded-lg p-4 bg-primary/5 relative cursor-pointer transition-colors">
                      <div className="absolute -top-3 right-4 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                        Популярный
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Премиум</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">30 дней</p>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">$99</span>
                      </div>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Стандартное размещение
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Включён в результаты поиска
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Выделенное размещение
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Приоритет в результатах
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Корпоративный</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">60 дней</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">$199</span>
                      </div>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Все функции Премиум
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          60 дней размещения
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Брендирование компании
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          Готовы к большему?
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Если вам нужно разместить несколько вакансий или у вас есть особые потребности по рекрутингу, мы предлагаем корпоративные пакеты с дополнительными возможностями.
                        </p>
                        <a href="#" className="inline-block mt-2 text-sm text-primary hover:underline">
                          Узнать о корпоративных пакетах
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button type="submit">
                    Разместить вакансию
                  </Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </div>
      </div>
      
      <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} JobFinder. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PostJob;
