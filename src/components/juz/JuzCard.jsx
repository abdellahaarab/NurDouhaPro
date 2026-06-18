import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export default function JuzCard({ juz, index }) {
  // Support multiple API response shapes
  const number     = juz.juzNo   ?? juz.juz_number ?? juz.number ?? index + 1;
  const startSurah = juz.startSurah ?? juz.start_surah_no ?? '—';
  const startAyah  = juz.startAyah  ?? juz.start_ayah_no  ?? '—';
  const endSurah   = juz.endSurah   ?? juz.end_surah_no   ?? '—';
  const endAyah    = juz.endAyah    ?? juz.end_ayah_no    ?? '—';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
    >
      <Link
        to={`/surah/${startSurah}`}
        className="group block glass-card rounded-2xl p-5 hover:border-accent/30 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
            <Layers size={16} className="text-accent" />
          </div>
          <span className="text-4xl font-display font-bold text-white/8 select-none leading-none">
            {number}
          </span>
        </div>

        <h3 className="font-semibold text-white text-sm mb-1">
          Juz {number}
        </h3>
        <p className="text-white/40 text-xs leading-relaxed">
          {startSurah !== '—' ? `Surah ${startSurah}:${startAyah}` : 'Start'}&nbsp;→&nbsp;
          {endSurah   !== '—' ? `Surah ${endSurah}:${endAyah}`   : 'End'}
        </p>

        <div className="mt-4 pt-3 border-t border-white/6 flex items-center justify-between">
          <span className="text-accent text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Open first surah →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
