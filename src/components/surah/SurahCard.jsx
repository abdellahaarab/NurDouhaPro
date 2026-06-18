import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import { useApp } from '../../context/AppContext';

export default function SurahCard({ surah, index }) {
  const { startSurah } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      whileHover={{ y: -2 }}
    >
      <div className="group glass-card rounded-2xl p-5 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          {/* Number badge */}
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-xs font-bold font-arabic">
              {surah.number}
            </span>
          </div>
          {/* Revelation badge */}
          <Badge variant={surah.revelation === 'Makkah' ? 'makkah' : 'madinah'}>
            {surah.revelation}
          </Badge>
        </div>

        {/* Arabic name */}
        <div className="text-right mb-2">
          <p className="font-arabic text-xl text-white leading-relaxed">{surah.arabic}</p>
        </div>

        {/* Latin name */}
        <div className="mb-4">
          <h3 className="font-semibold text-white/90 text-sm">{surah.name}</h3>
          <p className="text-white/45 text-xs mt-0.5">{surah.translation}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8">
          <span className="text-white/40 text-xs">{surah.verses} verses</span>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                startSurah(surah.number, surah.verses, 1);
              }}
              className="w-7 h-7 rounded-lg bg-primary/20 hover:bg-primary/35 flex items-center justify-center text-primary transition-all"
              title="Play surah"
            >
              <Play size={12} fill="currentColor" />
            </button>
            <Link
              to={`/surah/${surah.number}`}
              className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
            >
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
