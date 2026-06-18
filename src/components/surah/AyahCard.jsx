import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, BookOpen, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TafsirPanel from '../tafsir/TafsirPanel';

export default function AyahCard({ ayah, surahNumber, surahName, onTafsirOpen, activeTafsirVerse }) {
  const { audio, favorites } = useApp();

  const isCurrentlyPlaying =
    audio.isPlaying &&
    audio.surah === surahNumber &&
    audio.ayahNumber === ayah.number;

  const isFav = favorites.isFavorite(surahNumber, ayah.number);

  const handlePlayPause = () => {
    if (audio.surah === surahNumber && audio.ayahNumber === ayah.number) {
      audio.togglePlay();
    } else {
      audio.playAyah(surahNumber, ayah.number);
    }
  };

  const handleShare = async () => {
    const text = `${surahName} ${ayah.number}: ${ayah.english}`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const isTafsirOpen = activeTafsirVerse === `${surahNumber}_${ayah.number}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
        isCurrentlyPlaying ? 'border-primary/40 shadow-[0_0_20px_rgba(222,166,155,0.12)]' : ''
      }`}
    >
      <div className="p-5 sm:p-7">
        {/* Verse number pill */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                isCurrentlyPlaying
                  ? 'bg-primary text-dark animate-pulse-slow'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {ayah.number}
            </div>
            {isCurrentlyPlaying && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-0.5 items-end h-4"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-primary rounded-full"
                    animate={{ height: ['4px', '14px', '4px'] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </div>
          <span className="text-white/25 text-xs font-arabic">﴿{ayah.number}﴾</span>
        </div>

        {/* Arabic text */}
        <p
          dir="rtl"
          className="font-arabic text-2xl sm:text-3xl text-white leading-loose text-right mb-6 tracking-wide"
        >
          {ayah.arabic}
        </p>

        {/* English translation */}
        <p className="text-white/65 text-sm leading-relaxed font-sans">
          {ayah.english}
        </p>
      </div>

      {/* Tafsir panel */}
      <AnimatePresence>
        {isTafsirOpen && (
          <TafsirPanel surah={surahNumber} ayah={ayah.number} onClose={() => onTafsirOpen(null)} />
        )}
      </AnimatePresence>

      {/* Action bar */}
      <div className="px-5 sm:px-7 py-3 border-t border-white/6 flex items-center gap-2">
        <button
          onClick={handlePlayPause}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isCurrentlyPlaying
              ? 'bg-primary/20 text-primary'
              : 'bg-white/8 text-white/60 hover:bg-white/12 hover:text-white'
          }`}
        >
          {isCurrentlyPlaying ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
          {isCurrentlyPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={() => onTafsirOpen(`${surahNumber}_${ayah.number}`)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isTafsirOpen
              ? 'bg-accent/20 text-accent'
              : 'bg-white/8 text-white/60 hover:bg-white/12 hover:text-white'
          }`}
        >
          <BookOpen size={12} />
          Tafsir
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-all"
            title="Share verse"
          >
            <Share2 size={12} />
          </button>
          <button
            onClick={() =>
              favorites.toggleFavorite(surahNumber, ayah.number, ayah.arabic, ayah.english, surahName)
            }
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              isFav
                ? 'bg-primary/20 text-primary'
                : 'bg-white/8 text-white/50 hover:text-white hover:bg-white/12'
            }`}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={12} fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
