import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useJuz } from '../hooks/useJuz';
import JuzCard from '../components/juz/JuzCard';
import ErrorState from '../components/ui/ErrorState';

function JuzSkeletons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="glass-card rounded-2xl p-5 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-white/10 mb-4" />
          <div className="h-4 w-1/2 rounded bg-white/10 mb-2" />
          <div className="h-3 w-3/4 rounded bg-white/8" />
        </div>
      ))}
    </div>
  );
}

// Fallback list when the API returns nothing useful
const FALLBACK_JUZ = Array.from({ length: 30 }, (_, i) => ({
  juzNo: i + 1,
  startSurah: [2,2,2,2,2,3,4,5,6,7,8,9,10,11,12,13,15,17,19,21,23,25,27,29,31,33,34,36,39,41][i] ?? (i * 3 + 1),
  startAyah:  [1,142,253,24,120,111,88,82,45,88,40,93,1,6,53,35,1,1,59,1,1,21,21,32,53,1,49,144,31,47][i] ?? 1,
  endSurah:   [2,2,2,3,3,4,5,6,7,8,9,10,11,12,14,17,18,20,22,24,26,28,30,33,34,36,38,40,41,45][i] ?? ((i + 1) * 3),
  endAyah:    [141,252,286,23,119,176,81,110,206,75,129,109,123,111,52,111,110,135,78,20,227,88,60,30,54,83,88,85,46,37][i] ?? 20,
}));

export default function JuzExplorer() {
  const { juzList, loading, error } = useJuz();

  const displayList =
    Array.isArray(juzList) && juzList.length > 0 ? juzList : FALLBACK_JUZ;

  return (
    <motion.div
      key="juz"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
            <Layers size={18} className="text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Juz Explorer</h1>
            <p className="text-white/45 text-sm">30 sections of the Holy Quran</p>
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {loading ? (
        <JuzSkeletons />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayList.map((juz, i) => (
            <JuzCard key={i} juz={juz} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
