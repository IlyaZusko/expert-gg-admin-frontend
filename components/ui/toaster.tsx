'use client';
import { CheckCheck, X } from 'lucide-react';

import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        isSucces,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            duration={5000}
            className=" bg-custom-cover"
          >
            <div className="grid gap-1 bg-custom-cover">
              {title && (
                <div className="flex flex-row gap-2 items-center">
                  {isSucces ? (
                    <CheckCheck width={22} height={22} color="#12CC46" />
                  ) : (
                    <X width={22} height={22} color="#FE0000" />
                  )}
                  <p className="text-white text-sm font-normal">{title}</p>
                </div>
              )}
              {description && (
                <p className="text-gray-400 text-xs font-normal">
                  {description}
                </p>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
