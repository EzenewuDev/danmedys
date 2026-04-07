import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { featuresConfig } from '@/config';
import * as LucideIcons from 'lucide-react';

export function Features() {
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

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 bg-white"
    >
      <div className="w-full px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={cn(
              'inline-block text-sm font-geist-mono uppercase tracking-[0.2em] text-[#1DA1F2] mb-4 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {featuresConfig.label}
          </span>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-bold text-[#0a1e3f] transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {featuresConfig.heading}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresConfig.features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'group relative p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:border-[#1DA1F2]/20 transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-[#e6f7ff] rounded-xl flex items-center justify-center text-[#1DA1F2] mb-6 group-hover:bg-[#1DA1F2] group-hover:text-white transition-colors duration-300">
                {getIcon(feature.iconName)}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#0a1e3f] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#1DA1F2] rounded-b-2xl group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
