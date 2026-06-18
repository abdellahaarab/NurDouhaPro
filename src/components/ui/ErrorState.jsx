import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
        <AlertCircle size={26} className="text-red-400" />
      </div>
      <h3 className="text-white font-semibold mb-1">Something went wrong</h3>
      <p className="text-white/50 text-sm mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="magnetic-btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 hover:bg-white/12 text-white/80 text-sm font-medium transition-all border border-white/10 hover:border-white/15"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
