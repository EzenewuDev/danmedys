import { useState, useEffect, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AnimatedButton } from './AnimatedButton';
import { navigationConfig } from '@/config';
import { User, LogOut, X } from 'lucide-react';

interface NavigationProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Navigation({ isAuthenticated = false, onLogout }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!navigationConfig.logo && navigationConfig.links.length === 0) return null;

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (!isHomePage) {
        navigate('/' + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsMenuOpen(false);
    }
  };

  const handleBooking = () => {
    if (!isHomePage) {
      navigate('/#doctors');
    } else {
      const element = document.getElementById('doctors');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-circ',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
          isScrolled || !isHomePage ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            {navigationConfig.logo && (
              <Link to="/" className="flex items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-colors duration-500",
                  isScrolled || !isHomePage ? "bg-[#1DA1F2] text-white" : "bg-white/20 text-white backdrop-blur-sm"
                )}>
                  D
                </div>
                <span className={cn(
                  "text-2xl font-semibold tracking-tight transition-colors duration-500",
                  isScrolled || !isHomePage ? "text-[#0a1e3f]" : "text-white"
                )}>
                  {navigationConfig.logo}
                </span>
              </Link>
            )}

            {/* Desktop Navigation */}
            {navigationConfig.links.length > 0 && (
              <div className="hidden lg:flex items-center gap-10">
                {navigationConfig.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "text-base transition-colors duration-500 relative group cursor-pointer",
                      isScrolled || !isHomePage ? "text-[#0a1e3f]/80 hover:text-[#0a1e3f]" : "text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                    <span className={cn(
                      "absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                      isScrolled || !isHomePage ? "bg-[#1DA1F2]" : "bg-white"
                    )} />
                  </a>
                ))}
              </div>
            )}

            {/* Right Side - Auth & CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <AnimatedButton
                onClick={handleBooking}
                variant={isScrolled || !isHomePage ? "primary" : "outline-white"}
                size="md"
              >
                {navigationConfig.contactLabel}
              </AnimatedButton>

              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <AnimatedButton variant={isScrolled || !isHomePage ? "secondary" : "outline-white"} size="md">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </AnimatedButton>
                  </Link>
                  <button
                    onClick={onLogout}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      isScrolled || !isHomePage ? "text-[#0a1e3f] hover:bg-gray-100" : "text-white hover:bg-white/10"
                    )}
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      isScrolled || !isHomePage ? "text-[#0a1e3f]/80 hover:text-[#0a1e3f]" : "text-white/90 hover:text-white"
                    )}>
                      Login
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            {navigationConfig.links.length > 0 && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative w-8 h-6 flex flex-col justify-between"
                aria-label="Toggle menu"
              >
                <span
                  className={cn(
                    'w-full h-0.5 transition-all duration-500 ease-out-quad origin-center',
                    isScrolled || !isHomePage ? 'bg-[#0a1e3f]' : 'bg-white',
                    isMenuOpen && 'translate-y-[10px] rotate-[-45deg]'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 transition-all duration-300 ease-out-quad',
                    isScrolled || !isHomePage ? 'bg-[#0a1e3f]' : 'bg-white',
                    isMenuOpen && 'scale-0 opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 transition-all duration-500 ease-out-quad origin-center',
                    isScrolled || !isHomePage ? 'bg-[#0a1e3f]' : 'bg-white',
                    isMenuOpen && '-translate-y-[10px] rotate-[45deg]'
                  )}
                />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {navigationConfig.links.length > 0 && (
        <div
          className={cn(
            'fixed inset-0 z-40 bg-white transition-all duration-500 ease-out-cubic lg:hidden flex flex-col',
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          )}
        >
          {/* Header area in mobile menu for the X button */}
          <div className="w-full px-6 py-4 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-[#0a1e3f] hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-12 overflow-y-auto">
            {navigationConfig.links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'text-3xl font-semibold text-[#0a1e3f] transition-all duration-500 ease-out-quart',
                  isMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-4 mt-4 w-full px-12 max-w-sm">
              <AnimatedButton
                onClick={handleBooking}
                variant="primary"
                size="lg"
                className="w-full justify-center"
              >
                {navigationConfig.contactLabel}
              </AnimatedButton>

              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <AnimatedButton variant="secondary" size="lg" className="w-full justify-center">
                      <User className="w-5 h-5 mr-2" />
                      Dashboard
                    </AnimatedButton>
                  </Link>
                  <button 
                    onClick={() => { onLogout?.(); setIsMenuOpen(false); }}
                    className="py-2 text-[#0a1e3f]/70 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <AnimatedButton variant="outline" size="lg" className="w-full justify-center">
                      Login
                    </AnimatedButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
