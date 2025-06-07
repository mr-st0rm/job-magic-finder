
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const TelegramAuthRequired = () => {
  const BOT_LINK = "https://t.me/hrocket_bot";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-8">HRocket</h2>
          
          <Alert variant="destructive" className="mb-6 border-red-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Требуется Telegram</AlertTitle>
            <AlertDescription>
              Это приложение доступно только через Telegram Mini App
            </AlertDescription>
          </Alert>
          
          <h3 className="text-xl font-bold text-center mb-4">
            Запустите приложение в Telegram
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            Для использования HRocket, пожалуйста, откройте приложение через нашего Telegram бота.
          </p>
          
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => window.open(BOT_LINK, '_blank')}
          >
            Открыть бота в Telegram
          </Button>
        </div>
        
        <div className="text-center p-4 text-sm text-gray-500">
          @hrocket_bot
        </div>
      </div>
    </div>
  );
};

export default TelegramAuthRequired;
