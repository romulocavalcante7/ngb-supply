import { useToastStore } from '../../stores/toastStore';
import { X, CheckCircle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
          error: <ShieldAlert className="w-5 h-5 text-danger" />,
          warning: <AlertCircle className="w-5 h-5 text-warning" />,
          info: <Info className="w-5 h-5 text-primary" />,
        };

        const borders = {
          success: 'border-l-emerald-500',
          error: 'border-l-danger',
          warning: 'border-l-warning',
          info: 'border-l-primary',
        };

        return (
          <div 
            key={toast.id}
            className={`flex items-center gap-3 bg-slate-900 border border-slate-800 ${borders[toast.type]} border-l-4 p-4 rounded-lg shadow-xl pointer-events-auto animate-slide-left w-80`}
          >
            {icons[toast.type]}
            <p className="flex-1 text-sm text-slate-200">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
