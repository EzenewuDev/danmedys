import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { heroConfig } from '@/config';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Activity, Shield, Clock } from 'lucide-react';

interface HeroProps {
  onBookClick?: () => void;
}

export function Hero({ onBookClick }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!heroConfig.name && heroConfig.roles.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-neutral-900"
    >
      {/* Background Image */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-[1800ms]',
          isLoaded && imageLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <img
          src={heroConfig.backgroundImage}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.6)' }}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e3f]/90 via-[#0a1e3f]/60 to-[#0a1e3f]/30" />
      </div>

      {/* Role labels on sides */}
      {heroConfig.roles[0] && (
        <div
          className={cn(
            'absolute left-6 lg:left-12 top-[18%] lg:top-1/2 -translate-y-1/2 z-30 transition-all duration-[1200ms] ease-out-quart',
            'lg:-rotate-90 lg:origin-left',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transitionDelay: '800ms' }}
        >
          <span className="text-[10px] lg:text-xs font-geist-mono uppercase tracking-[0.4em] text-white/40 whitespace-nowrap">
            {heroConfig.roles[0]}
          </span>
        </div>
      )}
      {heroConfig.roles[1] && (
        <div
          className={cn(
            'absolute right-6 lg:right-12 top-[18%] lg:top-1/2 -translate-y-1/2 z-30 transition-all duration-[1200ms] ease-out-quart',
            'lg:rotate-90 lg:origin-right',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transitionDelay: '900ms' }}
        >
          <span className="text-[10px] lg:text-xs font-geist-mono uppercase tracking-[0.4em] text-white/40 whitespace-nowrap">
            {heroConfig.roles[1]}
          </span>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-30 flex flex-col items-start justify-center min-h-screen px-6 lg:px-16 pointer-events-none pb-20 pt-32 lg:pt-0">
        <div className="max-w-2xl w-full">
          {/* Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 transition-all duration-[1200ms] ease-out-quart border border-white/10',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <Activity className="w-4 h-4 text-[#1DA1F2]" />
            <span className="text-sm text-white/90 font-medium tracking-wide">{heroConfig.badge}</span>
          </div>

          {/* Main Heading */}
          <h1
            className={cn(
              'text-[clamp(2.2rem,6vw,5rem)] font-bold text-white tracking-tight leading-[1.1] mb-8 transition-all duration-[1200ms] ease-out-quart',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '500ms' }}
          >
            {heroConfig.name}
          </h1>

          {/* Description */}
          <p
            className={cn(
              'text-lg lg:text-xl text-white/80 max-w-xl mb-10 leading-relaxed transition-all duration-[1200ms] ease-out-quart',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            {heroConfig.subheading}
          </p>

          {/* Action Buttons */}
          <div
            className={cn(
              'flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-[1200ms] ease-out-quart pointer-events-auto',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '700ms' }}
          >
            <AnimatedButton
              onClick={onBookClick}
              variant="primary"
              size="lg"
              className="px-10 py-5 rounded-2xl shadow-xl shadow-[#1DA1F2]/20"
            >
              Book Appointment
            </AnimatedButton>
            <a href="#services">
              <AnimatedButton
                variant="outline-white"
                size="lg"
                className="px-10 py-5 rounded-2xl"
                showIcon={false}
              >
                Our Services
              </AnimatedButton>
            </a>
          </div>
        </div>

        {/* Hero Stats */}
        <div
          className={cn(
            'flex flex-wrap items-center gap-8 lg:gap-12 mt-16 transition-all duration-[1200ms] ease-out-quart',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
              <Shield className="w-5 h-5 text-[#1DA1F2]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white leading-none mb-1">50+</p>
              <p className="text-xs text-white/50 uppercase tracking-widest font-medium">Expert Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
              <Clock className="w-5 h-5 text-[#1DA1F2]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white leading-none mb-1">24/7</p>
              <p className="text-xs text-white/50 uppercase tracking-widest font-medium">Available</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
              <Activity className="w-5 h-5 text-[#1DA1F2]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white leading-none mb-1">100k+</p>
              <p className="text-xs text-white/50 uppercase tracking-widest font-medium">Patients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
