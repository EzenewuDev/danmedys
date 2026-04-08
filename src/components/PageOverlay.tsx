import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

interface PageOverlayProps {
  isVisible: boolean;
}

export function PageOverlay({ isVisible }: PageOverlayProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    if (isVisible) {
      const timer = setTimeout(() => setProgress(0), 0);
      interval = window.setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + Math.random() * 15 : prev));
      }, 200);
      return () => {
        clearTimeout(timer);
        if (interval) window.clearInterval(interval);
      };
    } else {
      const timer = setTimeout(() => setProgress(100), 0);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] bg-[#0a1e3f] flex flex-col items-center justify-center transition-all duration-700 ease-in-out',
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
      )}
    >
      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        {/* Animated Logo Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
            <Activity className="w-10 h-10 text-[#1DA1F2]" />
          </div>
          {/* Pulsing ring around logo */}
          <div className="absolute inset-0 border-4 border-white/20 rounded-3xl animate-ping opacity-20" />
        </div>

        {/* Text & Progress */}
        <div className="space-y-4 max-w-xs">
          <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
            DANMEDY
          </h2>
          <p className="text-[#1DA1F2] font-medium text-sm tracking-[0.2em] uppercase animate-pulse">
            Advanced Medical Care
          </p>
          
          {/* Progress Bar Container */}
          <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-6 mx-auto">
            <div 
              className="absolute inset-y-0 left-0 bg-[#1DA1F2] transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(29,161,242,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mt-2">
            System Initializing {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
