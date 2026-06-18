import { motion } from 'framer-motion';
import { X, BookOpen, Loader2 } from 'lucide-react';
import { useTafsir } from '../../hooks/useTafsir';
import { useEffect } from 'react';

export default function TafsirPanel({ surah, ayah, onClose }) {
  const { tafsir, loading, error, loadTafsir } = useTafsir();

  useEffect(() => {
    loadTafsir(surah, ayah);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surah, ayah]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="border-t border-accent/20 bg-accent/5 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-accent" />
            <span className="text-accent text-sm font-semibold">Tafsir</span>
            <span className="text-white/40 text-xs">
              {surah}:{ayah}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
          >
            <X size={11} />
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Loader2 size={14} className="animate-spin" />
            Loading tafsir…
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {tafsir && !loading && (
          <div className="space-y-3">
            {tafsir.arabic && (
              <p dir="rtl" className="font-arabic text-lg text-white/80 text-right leading-loose">
                {tafsir.arabic}
              </p>
            )}
            <p className="text-white/70 text-sm leading-relaxed">
              {tafsir.tafsir || tafsir.english || 'No tafsir text available for this verse.'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
