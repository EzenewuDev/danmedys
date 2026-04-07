import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { testimonialsConfig } from '@/config';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsConfig.testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsConfig.testimonials.length) % testimonialsConfig.testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsConfig.testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
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
            {testimonialsConfig.label}
          </span>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-bold text-[#0a1e3f] transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            {testimonialsConfig.heading}
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div
          className={cn(
            'relative max-w-4xl mx-auto transition-all duration-1000 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Main testimonial card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-[#e6f7ff] rounded-full flex items-center justify-center">
              <Quote className="w-8 h-8 text-[#1DA1F2]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {testimonialsConfig.testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.author}
                  className={cn(
                    'transition-all duration-500',
                    index === currentIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                  )}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-200'
                        )}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-[#0a1e3f] leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#0a1e3f]">{testimonial.author}</p>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative wave */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1DA1F2] via-[#0a1e3f] to-[#1DA1F2]" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#0a1e3f] hover:bg-[#1DA1F2] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonialsConfig.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-[#1DA1F2] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  )}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#0a1e3f] hover:bg-[#1DA1F2] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
