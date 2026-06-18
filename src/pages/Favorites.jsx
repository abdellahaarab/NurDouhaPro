import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Play, Pause } from 'lucide-react';

export default function Favorites() {
  const { favorites, audio } = useApp();
  const { favorites: list, toggleFavorite, clearFavorites } = favorites;

  return (
    <motion.div
      key="favorites"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 sm:px-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Heart size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Favorites</h1>
            <p className="text-white/45 text-sm">
              {list.length} saved {list.length === 1 ? 'verse' : 'verses'}
            </p>
          </div>
        </div>
        {list.length > 0 && (
          <button
            onClick={clearFavorites}
            className="magnetic-btn flex items-center gap-2 px-3 py-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 text-xs font-medium transition-all border border-transparent hover:border-red-500/20"
          >
            <Trash2 size={13} />
            Clear all
          </button>
        )}
      </motion.div>

      {/* Empty state */}
      {list.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
            <BookOpen size={32} className="text-primary/60" />
          </div>
          <h3 className="text-white/70 font-semibold mb-2">No favorites yet</h3>
          <p className="text-white/35 text-sm mb-6 max-w-xs mx-auto">
            Tap the heart icon on any verse while reading to save it here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/15 text-primary text-sm font-medium hover:bg-primary/25 transition-all border border-primary/20"
          >
            Browse Surahs <ArrowRight size={14} />
          </Link>
        </motion.div>
      )}

      {/* Favorites list */}
      <AnimatePresence>
        {list.map((item, i) => {
          const isPlaying =
            audio.isPlaying &&
            audio.surah === item.surah &&
            audio.ayahNumber === item.ayah;

          return (
            <motion.div
              key={`${item.surah}_${item.ayah}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="glass-card rounded-2xl mb-4 overflow-hidden hover:border-primary/20 transition-colors"
            >
              <div className="p-5 sm:p-6">
                {/* Verse header */}
                <div className="flex items-center justify-between mb-4">
                  <Link
                    to={`/surah/${item.surah}`}
                    className="flex items-center gap-2 text-xs text-white/50 hover:text-primary transition-colors"
                  >
                    <span className="font-semibold text-white/70">{item.surahName}</span>
                    <span>·</span>
                    <span>Verse {item.ayah}</span>
                    <ArrowRight size={12} />
                  </Link>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => audio.playAyah(item.surah, item.ayah)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                        isPlaying
                          ? 'bg-primary text-dark'
                          : 'bg-white/8 text-white/60 hover:bg-primary/20 hover:text-primary'
                      }`}
                    >
                      {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                    </button>
                    <button
                      onClick={() =>
                        toggleFavorite(item.surah, item.ayah, item.arabic, item.english, item.surahName)
                      }
                      className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary hover:bg-red-500/15 hover:text-red-400 transition-all"
                    >
                      <Heart size={12} fill="currentColor" />
                    </button>
                  </div>
                </div>

                {/* Arabic */}
                <p dir="rtl" className="font-arabic text-xl sm:text-2xl text-white leading-loose text-right mb-3">
                  {item.arabic}
                </p>

                {/* English */}
                <p className="text-white/55 text-sm leading-relaxed">
                  {item.english}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
