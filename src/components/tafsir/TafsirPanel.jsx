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
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-accent/20 bg-accent/[0.04] overflow-hidden"
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <BookOpen size={14} className="text-accent" />
            </div>
            <span className="text-accent text-sm font-semibold">Tafsir</span>
            <span className="text-white/40 text-xs">
              {surah}:{ayah}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
          >
            <X size={12} />
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
            <p className="text-white/65 text-sm leading-relaxed">
              {tafsir.tafsir || tafsir.english || 'No tafsir text available for this verse.'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
