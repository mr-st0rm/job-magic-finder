
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * FAQ item interface - defines the structure for each FAQ question/answer pair
 */
interface FAQItem {
  id: string;         // Unique identifier for the FAQ item
  question: string;   // The question text
  answer: string;     // The answer text
}

/**
 * Predefined frequently asked questions
 * Each item has a unique ID, a question, and an answer
 */
const faqItems: FAQItem[] = [
  {
    id: "create-job",
    question: "Как создать вакансию?",
    answer: "Чтобы создать вакансию, перейдите в режим рекрутера в своем профиле, затем нажмите кнопку \"Создать вакансию\". Заполните все необходимые поля формы и нажмите \"Опубликовать\"."
  },
  {
    id: "edit-profile",
    question: "Как изменить личные данные?",
    answer: "Для изменения личных данных перейдите в раздел \"Профиль\", затем выберите \"Личные данные\". Здесь вы можете обновить свою информацию и сохранить изменения."
  },
  {
    id: "recruiter-mode",
    question: "Как работает режим рекрутера?",
    answer: "Режим рекрутера позволяет публиковать вакансии и отслеживать статистику по ним. Для переключения в режим рекрутера перейдите в профиль и активируйте соответствующий переключатель. После этого вам станут доступны дополнительные функции для работы с вакансиями."
  },
  {
    id: "job-statistics",
    question: "Как отслеживать статистику по вакансиям?",
    answer: "В режиме рекрутера перейдите в раздел \"Мои вакансии\", где для каждой вакансии отображается статистика просмотров, открытых контактов и откликов. Эта информация обновляется в реальном времени."
  }
];

/**
 * FAQ Section component - displays an accordion with frequently asked questions
 * @returns React component for the FAQ section
 */
const FAQSection = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-6">
    <div className="flex items-center gap-2 mb-4">
      <HelpCircle className="h-5 w-5 text-primary" />
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Часто задаваемые вопросы
      </h2>
    </div>
    
    {/* Accordion for FAQ items - only one item can be open at a time */}
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

/**
 * Support Contact component - displays support contact options
 * Provides a button to open a support chat
 */
const SupportContact = () => {
  // State to track if the chat request is being processed
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  /**
   * Handles opening the support chat
   * Shows a loading state and simulates the action with a toast notification
   */
  const handleOpenSupportChat = () => {
    setIsLoading(true);
    console.log("Support chat requested");
    
    // Simulate API request with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Запрос отправлен",
        description: "Оператор поддержки свяжется с вами в ближайшее время",
      });
    }, 1500);
    
    // TODO: Implement actual chat functionality with support team
    // Expected request: POST /api/support/chat { userId, topic? }
    // Expected response: { success: boolean, chatId: string, url: string }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
        Связаться с поддержкой
      </h2>
      
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Если у вас возникли вопросы или проблемы, напишите нам, и мы постараемся помочь вам как можно скорее.
        </p>
        
        <Button 
          className="flex items-center gap-2"
          onClick={handleOpenSupportChat}
          disabled={isLoading}
        >
          <MessageSquare className="h-4 w-4" />
          {isLoading ? "Открываем чат..." : "Открыть чат с поддержкой"}
        </Button>
      </div>
    </div>
  );
};

/**
 * Help and Support page component
 * Main container that combines the FAQ and Support Contact sections
 * @returns Complete Help page component
 */
const Help = () => {
  return (
    <div className="container-custom px-4">
      <section className="pt-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Помощь и поддержка
        </h1>
        
        {/* Support contact section */}
        <SupportContact />
        
        {/* Frequently asked questions section */}
        <FAQSection />
      </section>
    </div>
  );
};

export default Help;
