import { motion } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward, Repeat, Zap, X, Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDuration } from '../../utils/formatters';
import { getSurahByNumber } from '../../utils/surahs';

export default function AudioPlayer() {
  const { audio } = useApp();
  const surahMeta = getSurahByNumber(audio.surah);

  const progressPct = audio.duration > 0
    ? (audio.currentTime / audio.duration) * 100
    : 0;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.seek(ratio * audio.duration);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
      <div className="rounded-2xl border border-white/10 bg-dark-100/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div
          className="h-1 bg-white/10 cursor-pointer group relative"
          onClick={handleSeek}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/70 relative"
            style={{ width: `${progressPct}%` }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        <div className="flex items-center gap-4 px-4 py-3">
          {/* Track info */}
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-medium truncate">
              {surahMeta?.name ?? `Surah ${audio.surah}`}
              <span className="text-white/40 ml-2 text-xs">
                Ayah {audio.ayahNumber}
              </span>
            </p>
            <p className="text-white/40 text-xs font-arabic truncate">
              {surahMeta?.arabic ?? ''}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => audio.previous()}
              className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <SkipBack size={14} fill="currentColor" />
            </button>

            <button
              onClick={audio.togglePlay}
              disabled={audio.isLoading}
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/80 flex items-center justify-center text-dark transition-all shadow-[0_0_15px_rgba(222,166,155,0.4)] hover:shadow-[0_0_25px_rgba(222,166,155,0.6)] disabled:opacity-60"
            >
              {audio.isLoading ? (
                <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
              ) : audio.isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" />
              )}
            </button>

            <button
              onClick={() => audio.next()}
              className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <SkipForward size={14} fill="currentColor" />
            </button>
          </div>

          {/* Secondary controls */}
          <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => audio.setIsLooping((v) => !v)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                audio.isLooping
                  ? 'bg-accent/20 text-accent'
                  : 'bg-white/8 text-white/50 hover:text-white hover:bg-white/12'
              }`}
              title="Loop ayah"
            >
              <Repeat size={13} />
            </button>

            <button
              onClick={() => audio.setAutoNext((v) => !v)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                audio.autoNext
                  ? 'bg-primary/20 text-primary'
                  : 'bg-white/8 text-white/50 hover:text-white hover:bg-white/12'
              }`}
              title="Auto-play next"
            >
              <Zap size={13} />
            </button>
          </div>

          {/* Time */}
          <div className="hidden md:flex items-center gap-1 text-white/40 text-xs font-mono flex-shrink-0 tabular-nums">
            <span>{formatDuration(audio.currentTime)}</span>
            <span>/</span>
            <span>{formatDuration(audio.duration)}</span>
          </div>

          {/* Stop */}
          <button
            onClick={audio.stop}
            className="w-7 h-7 rounded-full bg-white/8 hover:bg-red-500/20 flex items-center justify-center text-white/40 hover:text-red-400 transition-all flex-shrink-0"
            title="Stop"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
