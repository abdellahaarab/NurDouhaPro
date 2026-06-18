import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import AudioPlayer from '../audio/AudioPlayer';
import SearchBar from '../search/SearchBar';
import { useApp } from '../../context/AppContext';

export default function Layout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { audio } = useApp();

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

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <div className="min-h-screen bg-dark">
      {/* Ambient bg gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <Navbar onSearchClick={() => setSearchOpen(true)} />

      <main className="relative pt-24 pb-32 min-h-screen">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* Persistent audio player */}
      <AnimatePresence>
        {audio.surah && (
          <motion.div
            key="audio-player"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
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
