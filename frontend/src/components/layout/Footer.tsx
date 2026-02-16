import { Github, Linkedin, Mail, Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#github' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@example.com' },
  ];

  const footerLinks = [
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
    { name: 'Sitemap', href: '#sitemap' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-bold text-white">
              Bill Gleeson
            </h3>
            <p className="text-text-secondary text-sm">
              Building meaningful software solutions with a focus on user experience
              and technical excellence.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-text-secondary hover:text-accent-teal transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-accent-teal text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Built With</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-background border border-border rounded-full text-xs text-text-secondary">
                React
              </span>
              <span className="px-3 py-1 bg-background border border-border rounded-full text-xs text-text-secondary">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-background border border-border rounded-full text-xs text-text-secondary">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 bg-background border border-border rounded-full text-xs text-text-secondary">
                Supabase
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-secondary text-sm flex items-center gap-1">
              © {currentYear} Bill Gleeson. All rights reserved.
            </p>
            <p className="text-text-secondary text-sm flex items-center gap-1">
              Made with <Heart size={14} className="text-accent-amber" fill="currentColor" /> and <Code size={14} className="text-accent-teal" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
