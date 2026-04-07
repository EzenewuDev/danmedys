import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#1DA1F2] text-white shadow-lg flex items-center justify-center transition-all duration-500 ease-out-cubic hover:bg-[#0a1e3f] hover:scale-110 hover:shadow-xl',
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
      
      {/* Pulse animation ring */}
      <span className={cn(
        'absolute inset-0 rounded-full bg-[#1DA1F2] animate-ping opacity-30',
        !isVisible && 'hidden'
      )} />
    </button>
  );
}
