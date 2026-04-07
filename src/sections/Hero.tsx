import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { heroConfig } from '@/config';
import { AnimatedButton } from '@/components/AnimatedButton';
import { ArrowRight, Activity, Shield, Clock } from 'lucide-react';

const boxSize = 450;
const halfBox = boxSize / 2;

interface HeroProps {
  onBookClick?: () => void;
}

export function Hero({ onBookClick }: HeroProps) {
  if (!heroConfig.name && heroConfig.roles.length === 0) return null;

  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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
            'absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-30 transition-all duration-[1200ms] ease-out-quart',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transitionDelay: '800ms' }}
        >
          <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-white/70">
            {heroConfig.roles[0]}
          </span>
        </div>
      )}
      {heroConfig.roles[1] && (
        <div
          className={cn(
            'absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 transition-all duration-[1200ms] ease-out-quart',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transitionDelay: '900ms' }}
        >
          <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-white/70">
            {heroConfig.roles[1]}
          </span>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-30 flex flex-col items-start justify-center min-h-screen px-6 lg:px-16 pointer-events-none">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 transition-all duration-[1200ms] ease-out-quart',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <Activity className="w-4 h-4 text-[#1DA1F2]" />
            <span className="text-sm text-white/90 font-medium">{heroConfig.badge}</span>
          </div>

          {/* Main Heading */}
          <h1
            className={cn(
              'text-[clamp(2.5rem,6vw,5rem)] font-bold text-white tracking-tight leading-[1.1] mb-6 transition-all duration-[1200ms] ease-out-quart',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '500ms' }}
          >
            {heroConfig.heading}
          </h1>

          {/* Subheading */}
          <p
            className={cn(
              'text-lg md:text-xl text-white/80 mb-8 max-w-xl transition-all duration-[1200ms] ease-out-quart',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            {heroConfig.subheading}
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              'flex flex-wrap gap-4 mb-12 transition-all duration-[1200ms] ease-out-quart pointer-events-auto',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '700ms' }}
          >
            <AnimatedButton onClick={onBookClick} variant="primary" size="lg">
              {heroConfig.cta}
              <ArrowRight className="w-5 h-5 ml-2" />
            </AnimatedButton>
            <a href="#services">
              <AnimatedButton variant="outline-white" size="lg">
                Our Services
              </AnimatedButton>
            </a>
          </div>

          {/* Stats */}
          <div
            className={cn(
              'flex flex-wrap gap-8 transition-all duration-[1200ms] ease-out-quart',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1DA1F2]/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#1DA1F2]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-sm text-white/70">Expert Doctors</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1DA1F2]/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#1DA1F2]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-sm text-white/70">Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1DA1F2]/20 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#1DA1F2]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100k+</p>
                <p className="text-sm text-white/70">Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
