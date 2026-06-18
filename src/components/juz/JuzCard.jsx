import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight } from 'lucide-react';

export default function JuzCard({ juz, index }) {
  // Support multiple API response shapes
  const number     = juz.juzNo   ?? juz.juz_number ?? juz.number ?? index + 1;
  const startSurah = juz.startSurah ?? juz.start_surah_no ?? '—';
  const startAyah  = juz.startAyah  ?? juz.start_ayah_no  ?? '—';
  const endSurah   = juz.endSurah   ?? juz.end_surah_no   ?? '—';
  const endAyah    = juz.endAyah    ?? juz.end_ayah_no    ?? '—';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.5), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/surah/${startSurah}`}
        className="group block glass-card rounded-2xl p-5 hover:border-accent/30 transition-all duration-300 h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Layers size={18} className="text-accent" />
          </div>
          <span className="text-5xl font-display font-bold text-white/[0.06] select-none leading-none group-hover:text-primary/10 transition-colors">
            {number}
          </span>
        </div>

        <h3 className="font-semibold text-white text-base mb-1">
          Juz {number}
        </h3>
        <p className="text-white/40 text-xs leading-relaxed">
          {startSurah !== '—' ? `Surah ${startSurah}:${startAyah}` : 'Start'}&nbsp;→&nbsp;
          {endSurah   !== '—' ? `Surah ${endSurah}:${endAyah}`   : 'End'}
        </p>

        <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
          <span className="text-accent text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Open first surah
          </span>
          <ArrowUpRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0" />
        </div>
      </Link>
    </motion.div>
  );
}
