import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { blogConfig } from '@/config';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export function Blog() {
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

  const featuredPost = blogConfig.posts[0];
  const otherPosts = blogConfig.posts.slice(1);

  return (
    <section
      ref={sectionRef}
      id="blog"
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
              {blogConfig.label}
            </span>
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold text-[#0a1e3f] transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {blogConfig.heading}
            </h2>
          </div>
          <div
            className={cn(
              'mt-6 md:mt-0 transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#1DA1F2] font-medium hover:gap-3 transition-all"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          <div
            className={cn(
              'group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3f]/80 via-transparent to-transparent" />
              
              {/* Category badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#1DA1F2] text-white text-sm rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {featuredPost.category}
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-4 text-white/70 text-sm mb-3">
                  <span>{featuredPost.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#1DA1F2] transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-white/80 line-clamp-2">
                  {featuredPost.excerpt}
                </p>
              </div>
            </div>
          </div>

          {/* Other Posts */}
          <div className="space-y-6">
            {otherPosts.map((post, index) => (
              <div
                key={post.id}
                className={cn(
                  'group flex gap-6 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="relative w-40 h-32 flex-shrink-0 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 py-4 pr-4">
                  <div className="flex items-center gap-3 text-gray-500 text-xs mb-2">
                    <span className="text-[#1DA1F2]">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0a1e3f] mb-2 group-hover:text-[#1DA1F2] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
