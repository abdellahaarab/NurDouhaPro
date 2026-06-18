import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Layers, Heart, Menu, X, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
  { to: '/',          label: 'Surahs',   icon: BookOpen },
  { to: '/juz',       label: 'Juz',      icon: Layers   },
  { to: '/favorites', label: 'Favorites',icon: Heart    },
];

export default function Navbar({ onSearchClick }) {
  const [open, setOpen] = useState(false);
  const { favorites } = useApp();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 rounded-2xl border border-white/8 bg-dark-100/80 backdrop-blur-xl shadow-xl">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-arabic text-primary">ﷺ</span>
              <div className="leading-none">
                <p className="font-display font-semibold text-white text-sm tracking-wide">Al-Quran</p>
                <p className="text-[10px] text-white/40 font-sans tracking-widest uppercase">Pro</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={15} />
                  {label}
                  {label === 'Favorites' && favorites.favorites.length > 0 && (
                    <span className="ml-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-dark text-[10px] font-bold flex items-center justify-center">
                      {favorites.favorites.length}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onSearchClick}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                <Search size={16} />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-mono">⌘K</kbd>
              </button>
              <button
                className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2 rounded-2xl border border-white/8 bg-dark-100/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-4 text-sm font-medium border-b border-white/5 last:border-0 transition-all ${
                    isActive ? 'text-primary bg-primary/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
