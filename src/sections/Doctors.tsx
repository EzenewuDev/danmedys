import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { doctorsConfig, type Doctor } from '@/config';
import { Star, Calendar, ArrowRight } from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';

interface DoctorsProps {
  onBookClick?: (doctor: Doctor) => void;
}

export function Doctors({ onBookClick }: DoctorsProps) {
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

  return (
    <section
      ref={sectionRef}
      id="doctors"
      className="py-24 bg-white"
    >
      <div className="w-full px-6 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span
              className={cn(
                'inline-block text-sm font-geist-mono uppercase tracking-[0.2em] text-[#1DA1F2] mb-4 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {doctorsConfig.label}
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold text-[#0a1e3f] mb-4 transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {doctorsConfig.heading}
            </h2>
            <p
              className={cn(
                'text-lg text-gray-600 max-w-xl transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {doctorsConfig.description}
            </p>
          </div>
          <div
            className={cn(
              'mt-6 md:mt-0 transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <AnimatedButton variant="outline" size="md">
              View All Doctors
              <ArrowRight className="w-4 h-4 ml-2" />
            </AnimatedButton>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {doctorsConfig.doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className={cn(
                'group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#1DA1F2]/20 transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${250 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Rating badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-[#0a1e3f]">{doctor.rating}</span>
                </div>

                {/* Book button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onBookClick?.(doctor)}
                    className="px-6 py-3 bg-[#1DA1F2] text-white rounded-xl font-bold uppercase tracking-wide shadow-lg hover:bg-[#0a1e3f] transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#0a1e3f] mb-1 group-hover:text-[#1DA1F2] transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-sm text-[#1DA1F2] font-medium mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {doctor.experience} experience
                </p>
                
                {/* Availability */}
                <div className="flex flex-wrap gap-1">
                  {doctor.availability.slice(0, 3).map(day => (
                    <span
                      key={day}
                      className="px-2 py-1 bg-[#e6f7ff] text-[#1DA1F2] text-xs rounded-md"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
