import { useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function AnimatedButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  showIcon = false,
  className,
  style,
  disabled = false,
  type = 'button',
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = cn(
    'relative overflow-hidden inline-flex items-center justify-center gap-2',
    'transition-all duration-300 ease-out-quad font-bold tracking-wide uppercase',
    {
      'bg-[#1DA1F2] text-white hover:bg-[#0a1e3f] shadow-lg hover:shadow-[#1DA1F2]/20': variant === 'primary',
      'bg-white text-[#0a1e3f] border-2 border-gray-100 hover:border-[#1DA1F2] hover:text-[#1DA1F2]': variant === 'secondary',
      'bg-transparent text-[#0a1e3f] border-2 border-[#0a1e3f] hover:bg-[#0a1e3f] hover:text-white': variant === 'outline',
      'bg-transparent text-white border-2 border-white/80 hover:bg-white hover:text-[#0a1e3f]': variant === 'outline-white',
      'px-4 py-2 text-xs': size === 'sm',
      'px-6 py-3 text-sm': size === 'md',
      'px-8 py-4 text-base': size === 'lg',
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showIcon && (
          <ArrowRight
            className={cn(
              'w-4 h-4 transition-transform duration-300 ease-out-quad',
              isHovered ? 'translate-x-1' : 'translate-x-0'
            )}
          />
        )}
      </span>
      {/* Subtle background overlay on hover */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-300',
          isHovered ? 'opacity-10' : 'opacity-0',
          {
            'bg-black': variant === 'primary' || variant === 'outline-white',
            'bg-[#1DA1F2]': variant === 'secondary',
            'bg-white': variant === 'outline',
          }
        )}
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseStyles}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
      style={style}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
  );
}
