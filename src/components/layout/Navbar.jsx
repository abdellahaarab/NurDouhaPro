import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-4 rounded-2xl border transition-all duration-500 ${
            scrolled
              ? 'bg-dark-100/85 border-white/10 shadow-2xl backdrop-blur-2xl'
              : 'bg-dark-100/50 border-white/[0.06] backdrop-blur-xl'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
                <span className="text-xl font-arabic text-primary">ﷺ</span>
                <div className="absolute inset-0 rounded-xl bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
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
                    `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-primary'
                        : 'text-white/55 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={15} />
                        {label}
                        {label === 'Favorites' && favorites.favorites.length > 0 && (
                          <span className="ml-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-dark text-[10px] font-bold flex items-center justify-center">
                            {favorites.favorites.length}
                          </span>
                        )}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onSearchClick}
                className="group flex items-center gap-2 px-3 py-2 rounded-xl text-white/50 hover:text-white transition-all text-sm border border-transparent hover:border-white/10 hover:bg-white/[0.03]"
              >
                <Search size={16} className="group-hover:text-primary transition-colors" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-mono">⌘K</kbd>
              </button>
              <button
                className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-4 mt-2 rounded-2xl border border-white/10 bg-dark-100/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
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
                {label === 'Favorites' && favorites.favorites.length > 0 && (
                  <span className="ml-auto min-w-[20px] h-5 rounded-full bg-primary text-dark text-[10px] font-bold flex items-center justify-center">
                    {favorites.favorites.length}
                  </span>
                )}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
