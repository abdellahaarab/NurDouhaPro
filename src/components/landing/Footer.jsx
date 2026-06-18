import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Gitlab, Heart } from 'lucide-react';

const LINKS = {
  Explore: [
    { label: 'All Surahs', to: '/' },
    { label: 'Juz Explorer', to: '/juz' },
    { label: 'Favorites', to: '/favorites' },
  ],
  Resources: [
    { label: 'Quran Audio', to: '/' },
    { label: 'Tafsir', to: '/' },
    { label: 'Translations', to: '/' },
  ],
};

const SOCIALS = [
  { icon: Twitter, href: 'https://x.com/deabdellahaarab', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdellahaarab', label: 'Linkedin' },
  { icon: Github, href: 'https://github.com/abdellahaarab', label: 'GitHub' },
  { icon: Gitlab, href: 'https://gitlab.com/abdellahaarab', label: 'Gitlab' },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 overflow-hidden">
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="text-xl font-arabic text-primary">ﷺ</span>
              </div>
              <div className="leading-none">
                <p className="font-display font-semibold text-white text-lg tracking-wide">Al-Quran Pro</p>
              </div>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed max-w-sm mb-6">
              A premium digital Quran experience crafted for reflection, learning, and spiritual connection.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-5">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-white/45 text-sm hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/6"
        >
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Al-Quran Pro. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-primary fill-primary" /> for the Ummah
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
