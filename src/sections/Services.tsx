import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { servicesConfig } from '@/config';
import * as LucideIcons from 'lucide-react';

export function Services() {
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
      { threshold: 0.1 }
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
      id="services"
      className="py-24 bg-[#f8fafc]"
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
            {servicesConfig.label}
          </span>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-bold text-[#0a1e3f] mb-4 transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {servicesConfig.heading}
          </h2>
          <p
            className={cn(
              'text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            Comprehensive care across all specialties. Our expert team is ready to help you with any health concern.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesConfig.services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                'group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/60 to-transparent" />
                
                {/* Icon badge */}
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1DA1F2] shadow-lg">
                  {getIcon(service.iconName)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0a1e3f] mb-2 group-hover:text-[#1DA1F2] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#1DA1F2] rounded-2xl transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
