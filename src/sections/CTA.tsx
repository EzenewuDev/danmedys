import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ctaConfig } from '@/config';
import { AnimatedButton } from '@/components/AnimatedButton';
import { ArrowRight, Mail } from 'lucide-react';

interface CTAProps {
  onBookClick?: () => void;
}

export function CTA({ onBookClick }: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative py-24 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={ctaConfig.backgroundImage}
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a1e3f]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tags */}
          <div
            className={cn(
              'flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {ctaConfig.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h2
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {ctaConfig.heading}
          </h2>

          {/* Description */}
          <p
            className={cn(
              'text-xl text-white/80 mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {ctaConfig.description}
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              'flex flex-wrap justify-center gap-4 mb-8 transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <AnimatedButton onClick={onBookClick} variant="primary" size="lg">
              {ctaConfig.buttonText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </AnimatedButton>
          </div>

          {/* Email */}
          <div
            className={cn(
              'flex items-center justify-center gap-2 text-white/70 transition-all duration-700 delay-400',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Mail className="w-5 h-5" />
            <a href={`mailto:${ctaConfig.email}`} className="hover:text-white transition-colors">
              {ctaConfig.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
