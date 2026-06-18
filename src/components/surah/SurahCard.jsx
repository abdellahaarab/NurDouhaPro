import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import { useApp } from '../../context/AppContext';

export default function SurahCard({ surah, index }) {
  const { startSurah } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.6), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="group glass-card rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          {/* Number badge */}
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-sm font-bold font-arabic">
              {surah.number}
            </span>
          </div>
          {/* Revelation badge */}
          <Badge variant={surah.revelation === 'Makkah' ? 'makkah' : 'madinah'}>
            {surah.revelation}
          </Badge>
        </div>

        {/* Arabic name */}
        <div className="text-right mb-2 flex-1">
          <p className="font-arabic text-2xl text-white leading-relaxed">{surah.arabic}</p>
        </div>

        {/* Latin name */}
        <div className="mb-4">
          <h3 className="font-semibold text-white/90 text-sm">{surah.name}</h3>
          <p className="text-white/45 text-xs mt-0.5">{surah.translation}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
          <span className="text-white/40 text-xs">{surah.verses} verses</span>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                startSurah(surah.number, surah.verses, 1);
              }}
              className="w-8 h-8 rounded-lg bg-primary/15 hover:bg-primary/30 border border-primary/20 flex items-center justify-center text-primary transition-all"
              title="Play surah"
            >
              <Play size={12} fill="currentColor" />
            </button>
            <Link
              to={`/surah/${surah.number}`}
              className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
            >
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
