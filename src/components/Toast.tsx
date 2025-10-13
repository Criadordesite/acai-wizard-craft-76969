import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export const Toast = ({ message, show, onClose }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] animate-in slide-in-from-bottom-5">
      <div className="bg-success text-success-foreground rounded-lg shadow-2xl p-4 flex items-center gap-3 min-w-[300px] max-w-[400px]">
        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="hover:bg-white/20 rounded p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
