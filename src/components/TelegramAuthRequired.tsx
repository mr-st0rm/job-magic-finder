
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const TelegramAuthRequired = () => {
  // TODO: Заменить на реальную ссылку вашего бота в Telegram
  const BOT_LINK = "https://t.me/hrocket_bot"; // Пример ссылки

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Требуется Telegram</AlertTitle>
          <AlertDescription>
            Это приложение доступно только через Telegram Mini App
          </AlertDescription>
        </Alert>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Запустите приложение в Telegram
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Для использования HRocket, пожалуйста, откройте приложение через нашего Telegram бота.
          </p>
          <Button 
            className="w-full"
            onClick={() => window.open(BOT_LINK, '_blank')}
          >
            Открыть бота в Telegram
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TelegramAuthRequired;
