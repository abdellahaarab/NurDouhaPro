import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import AudioPlayer from '../audio/AudioPlayer';
import SearchBar from '../search/SearchBar';
import { useApp } from '../../context/AppContext';

export default function Layout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { audio } = useApp();
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Cmd/Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Cursor glow follower
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mousePos.current.x}px`;
        cursorRef.current.style.top = `${mousePos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <div className="min-h-screen bg-dark">
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow hidden lg:block" />

      {/* Aurora ambient background */}
      <div className="aurora-bg" />

      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? 'rgba(222,166,155,0.5)' : i % 3 === 1 ? 'rgba(185,240,163,0.4)' : 'rgba(255,255,255,0.25)',
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30 - Math.random() * 40, 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <Navbar onSearchClick={() => setSearchOpen(true)} />

      <main className="relative z-10 pt-28 pb-36 min-h-screen">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* Persistent audio player */}
      <AnimatePresence>
        {audio.surah && (
          <motion.div
            key="audio-player"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-0 inset-x-0 z-40"
          >
            <AudioPlayer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <SearchBar onClose={closeSearch} />
        )}
      </AnimatePresence>
    </div>
  );
}
