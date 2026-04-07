import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { aboutConfig } from '@/config';
import { Check } from 'lucide-react';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ years: 0, doctors: 0, patients: 0, satisfaction: 0 });

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

  // Animate counters
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      years: 25,
      doctors: 50,
      patients: 100,
      satisfaction: 99,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        years: Math.round(targets.years * easeOut),
        doctors: Math.round(targets.doctors * easeOut),
        patients: Math.round(targets.patients * easeOut),
        satisfaction: Math.round(targets.satisfaction * easeOut),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const highlights = [
    'Board-certified specialists',
    'State-of-the-art facilities',
    'Personalized treatment plans',
    'Comprehensive health screenings',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-[#f8fafc]"
    >
      <div className="w-full px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={cn(
              'relative transition-all duration-1000',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            )}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutConfig.images[0]?.src}
                  alt={aboutConfig.images[0]?.alt}
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-8 -right-8 bg-[#1DA1F2] text-white p-8 rounded-2xl shadow-xl">
                <p className="text-5xl font-bold">{counters.years}+</p>
                <p className="text-white/80 mt-1">Years of<br />Experience</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#e6f7ff] rounded-2xl -z-10" />
              <div className="absolute -bottom-4 right-20 w-16 h-16 bg-[#1DA1F2]/10 rounded-full -z-10" />
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span
              className={cn(
                'inline-block text-sm font-geist-mono uppercase tracking-[0.2em] text-[#1DA1F2] mb-4 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {aboutConfig.label}
            </span>
            
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold text-[#0a1e3f] mb-6 transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              About DANMEDY
            </h2>
            
            <p
              className={cn(
                'text-lg text-gray-600 leading-relaxed mb-8 transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {aboutConfig.description}
            </p>

            {/* Highlights */}
            <div
              className={cn(
                'grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#1DA1F2]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#1DA1F2]" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className={cn(
                'grid grid-cols-3 gap-6 transition-all duration-700 delay-400',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-3xl font-bold text-[#1DA1F2]">{counters.doctors}+</p>
                <p className="text-sm text-gray-600 mt-1">Specialists</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-3xl font-bold text-[#1DA1F2]">{counters.patients}k+</p>
                <p className="text-sm text-gray-600 mt-1">Patients</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-3xl font-bold text-[#1DA1F2]">{counters.satisfaction}%</p>
                <p className="text-sm text-gray-600 mt-1">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
