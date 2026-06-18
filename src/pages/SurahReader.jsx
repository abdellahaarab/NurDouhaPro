import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Play, Pause, Share2,
} from 'lucide-react';
import { useQuran } from '../hooks/useQuran';
import { getSurahByNumber } from '../utils/surahs';
import { SkeletonAyah } from '../components/ui/SkeletonLoader';
import ErrorState from '../components/ui/ErrorState';
import Badge from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

const AyahCard = lazy(() => import('../components/surah/AyahCard'));

export default function SurahReader() {
  const { number } = useParams();
  const surahNum = parseInt(number, 10);
  const navigate = useNavigate();

  const { surah, loading, error, reload } = useQuran(surahNum);
  const { audio, startSurah, setActiveSurahTotal } = useApp();
  const meta = getSurahByNumber(surahNum);

  const [activeTafsirVerse, setActiveTafsirVerse] = useState(null);

  useEffect(() => {
    if (surah) setActiveSurahTotal(surah.totalAyahs);
  }, [surah, setActiveSurahTotal]);

  // Scroll active ayah into view when audio advances
  useEffect(() => {
    if (!audio.surah || audio.surah !== surahNum) return;
    const el = document.getElementById(`ayah-${audio.ayahNumber}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [audio.ayahNumber, audio.surah, surahNum]);

  const isPlayingThisSurah = audio.surah === surahNum && audio.isPlaying;

  const handlePlayPause = () => {
    if (audio.surah === surahNum) {
      audio.togglePlay();
    } else if (surah) {
      startSurah(surahNum, surah.totalAyahs);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: meta?.name, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <motion.div
      key={`surah-${surahNum}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto px-4 sm:px-6"
    >
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-6 text-sm text-white/40"
      >
        <Link to="/" className="hover:text-white/70 transition-colors">Surahs</Link>
        <ChevronRight size={14} />
        <span className="text-white/70">{meta?.name ?? `Surah ${surahNum}`}</span>
      </motion.div>

      {/* Surah header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card-strong rounded-3xl p-8 sm:p-10 mb-10 text-center relative overflow-hidden"
      >
        {/* Decorative */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/8 blur-3xl" />
          <div className="geo-frame opacity-[0.04]" />
        </div>

        <div className="relative z-10">
          {meta && (
            <Badge
              variant={meta.revelation === 'Makkah' ? 'makkah' : 'madinah'}
              className="mb-5"
            >
              {meta.revelation}
            </Badge>
          )}

          <p className="font-arabic text-5xl sm:text-6xl text-white leading-loose mb-3">
            {meta?.arabic ?? surah?.nameArabic ?? ''}
          </p>
          <h1 className="font-display text-2xl text-white font-semibold mb-1">
            {meta?.name ?? surah?.name ?? `Surah ${surahNum}`}
          </h1>
          <p className="text-white/50 text-sm">
            {meta?.translation ?? surah?.translation}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={handlePlayPause}
              className="magnetic-btn flex items-center gap-2.5 px-7 py-3 rounded-xl bg-primary hover:bg-primary/90 text-dark text-sm font-semibold transition-all shadow-glow-primary"
            >
              {isPlayingThisSurah ? (
                <><Pause size={15} fill="currentColor" /> Pause</>
              ) : (
                <><Play size={15} fill="currentColor" /> Play Surah</>
              )}
            </button>
            <button
              onClick={handleShare}
              className="magnetic-btn flex items-center gap-2 px-5 py-3 rounded-xl glass-card hover:border-primary/30 text-white/70 text-sm font-medium transition-all"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>

          {surah && (
            <p className="mt-5 text-white/35 text-xs tracking-wide">
              {surah.totalAyahs} verses · {meta?.revelation}
            </p>
          )}
        </div>
      </motion.div>

      {/* Bismillah (all surahs except At-Tawbah) */}
      {surahNum !== 9 && surahNum !== 1 && !loading && surah && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-10"
        >
          <p className="font-arabic text-2xl sm:text-3xl text-white/60 leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </motion.div>
      )}

      {/* Error */}
      {error && <ErrorState message={error} onRetry={reload} />}

      {/* Skeleton */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonAyah key={i} />)}
        </div>
      )}

      {/* Ayahs */}
      <Suspense fallback={null}>
        {surah && !loading && (
          <div className="space-y-4">
            {surah.ayahs.map((ayah) => (
              <div key={ayah.number} id={`ayah-${ayah.number}`}>
                <AyahCard
                  ayah={ayah}
                  surahNumber={surahNum}
                  surahName={meta?.name ?? surah.name}
                  activeTafsirVerse={activeTafsirVerse}
                  onTafsirOpen={setActiveTafsirVerse}
                />
              </div>
            ))}
          </div>
        )}
      </Suspense>

      {/* Prev / Next surah navigation */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-14 mb-4"
        >
          {surahNum > 1 ? (
            <Link
              to={`/surah/${surahNum - 1}`}
              className="group flex items-center gap-2 px-5 py-3 rounded-2xl glass-card hover:border-primary/30 text-white/70 hover:text-white text-sm font-medium transition-all"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>
                {getSurahByNumber(surahNum - 1)?.name ?? `Surah ${surahNum - 1}`}
              </span>
            </Link>
          ) : <div />}

          {surahNum < 114 && (
            <Link
              to={`/surah/${surahNum + 1}`}
              className="group flex items-center gap-2 px-5 py-3 rounded-2xl glass-card hover:border-primary/30 text-white/70 hover:text-white text-sm font-medium transition-all"
            >
              <span>
                {getSurahByNumber(surahNum + 1)?.name ?? `Surah ${surahNum + 1}`}
              </span>
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
