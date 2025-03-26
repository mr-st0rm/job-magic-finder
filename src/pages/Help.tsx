
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare } from "lucide-react";

/**
 * Help and Support page component
 * Displays FAQ and support contact options
 */
const Help = () => {
  /**
   * Handler for opening support chat
   * TODO: Implement actual chat functionality with support team
   */
  const handleOpenSupportChat = () => {
    // This will be implemented when backend is available
    console.log("Support chat requested");
    // TODO: Connect to support chat API
    // Expected response: { success: boolean, chatId: string }
  };

  return (
    <div className="container-custom px-4">
      <section className="pt-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Помощь и поддержка
        </h1>
        
        {/* Support contact card */}
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
            >
              <MessageSquare className="h-4 w-4" />
              Открыть чат с поддержкой
            </Button>
          </div>
        </div>
        
        {/* Frequently asked questions section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Часто задаваемые вопросы
            </h2>
          </div>
          
          {/* Accordion for FAQ items */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Как создать вакансию?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Чтобы создать вакансию, перейдите в режим рекрутера в своем профиле, затем нажмите кнопку "Создать вакансию". Заполните все необходимые поля формы и нажмите "Опубликовать".
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Как изменить личные данные?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Для изменения личных данных перейдите в раздел "Профиль", затем выберите "Личные данные". Здесь вы можете обновить свою информацию и сохранить изменения.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Как работает режим рекрутера?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Режим рекрутера позволяет публиковать вакансии и отслеживать статистику по ним. Для переключения в режим рекрутера перейдите в профиль и активируйте соответствующий переключатель. После этого вам станут доступны дополнительные функции для работы с вакансиями.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Как отслеживать статистику по вакансиям?</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-400">
                  В режиме рекрутера перейдите в раздел "Мои вакансии", где для каждой вакансии отображается статистика просмотров, открытых контактов и откликов. Эта информация обновляется в реальном времени.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Help;
