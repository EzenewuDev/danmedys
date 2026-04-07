import { useState } from 'react';
import { footerConfig } from '@/config';
import * as LucideIcons from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Heart, Send } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <footer id="contact" className="bg-[#0a1e3f] text-white">
      {/* Main Footer */}
      <div className="w-full px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#1DA1F2] rounded-lg flex items-center justify-center font-bold text-lg">
                D
              </div>
              <span className="text-2xl font-semibold">{footerConfig.logo}</span>
            </div>
            <p className="text-white/70 mb-6 max-w-sm">
              {footerConfig.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {footerConfig.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#1DA1F2] transition-colors"
                >
                  {getIcon(link.iconName)}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerConfig.columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-lg mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#1DA1F2] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">{footerConfig.newsletterHeading}</h4>
              <p className="text-white/70">{footerConfig.newsletterDescription}</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footerConfig.newsletterPlaceholder}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#1DA1F2] transition-colors"
                />
              </div>
              <AnimatedButton type="submit" variant="primary" size="md">
                {isSubscribed ? (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {footerConfig.newsletterButtonText}
                  </>
                )}
              </AnimatedButton>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-6 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              {footerConfig.copyright}
            </p>
            <p className="text-white/60 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {footerConfig.credit}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
