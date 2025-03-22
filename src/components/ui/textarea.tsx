
import * as React from "react"
import { useRef, useEffect } from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    
    const resizeTextarea = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      // Сбрасываем высоту перед пересчетом
      textarea.style.height = 'auto';
      // Устанавливаем высоту равной scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`;
    };
    
    useEffect(() => {
      if (autoResize) {
        // Применяем resize при монтировании
        resizeTextarea();
        
        // Добавляем обработчик изменения значения
        const handleInput = () => resizeTextarea();
        const textarea = textareaRef.current;
        
        if (textarea) {
          textarea.addEventListener('input', handleInput);
          // Очищаем обработчик при размонтировании
          return () => textarea.removeEventListener('input', handleInput);
        }
      }
    }, [autoResize]);
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={(element) => {
          // Устанавливаем оба рефа
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
          textareaRef.current = element;
        }}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
