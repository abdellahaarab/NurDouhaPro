import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { SURAHS } from '../utils/surahs';
import { useSearch } from '../hooks/useSearch';
import { SkeletonList } from '../components/ui/SkeletonLoader';

const SurahCard = lazy(() => import('../components/surah/SurahCard'));

const REVELATION_FILTERS = ['All', 'Makkah', 'Madinah'];

export default function Home() {
  const { query, setQuery, results } = useSearch();
  const [revelation, setRevelation] = useState('All');

  const filtered = results.filter(
    (s) => revelation === 'All' || s.revelation === revelation,
  );

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Hero */}
      <div className="text-center mb-12 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-arabic text-4xl sm:text-5xl text-white/90 mb-3 leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-white/40 text-sm font-sans">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 max-w-lg mx-auto"
        >
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, number, or meaning…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-dark-200 border border-white/8 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/40 transition-all"
            />
          </div>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-center gap-2 mt-5"
        >
          {REVELATION_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setRevelation(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                revelation === f
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="text-white/25 text-xs ml-2">{filtered.length} surahs</span>
        </motion.div>
      </div>

      {/* Grid */}
      <Suspense fallback={<SkeletonList count={12} />}>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((surah, i) => (
              <SurahCard key={surah.number} surah={surah} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/50 text-sm">
              No surahs found for "<span className="text-white/70">{query}</span>"
            </p>
          </div>
        )}
      </Suspense>
    </motion.div>
  );
}
