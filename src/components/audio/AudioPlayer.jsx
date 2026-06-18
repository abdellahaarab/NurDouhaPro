import { useRef } from 'react';
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
  const progressRef = useRef(null);

  const progressPct = audio.duration > 0
    ? (audio.currentTime / audio.duration) * 100
    : 0;

  const handleSeek = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.seek(ratio * audio.duration);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-5">
      <motion.div
        layout
        className="rounded-2xl border border-white/10 bg-dark-100/90 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="h-1.5 bg-white/5 cursor-pointer group relative"
          onClick={handleSeek}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/60 relative"
            style={{ width: `${progressPct}%` }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary shadow-lg opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100" />
          </motion.div>
          {/* Waveform decoration */}
          <div className="absolute inset-0 flex items-center justify-center gap-[3px] opacity-10 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-white/40 rounded-full"
                style={{ height: `${Math.random() * 60 + 20}%` }}
              />
            ))}
          </div>
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
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
            >
              <SkipBack size={14} fill="currentColor" />
            </button>

            <button
              onClick={audio.togglePlay}
              disabled={audio.isLoading}
              className="w-11 h-11 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-dark transition-all shadow-glow-primary disabled:opacity-60"
            >
              {audio.isLoading ? (
                <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
              ) : audio.isPlaying ? (
                <Pause size={17} fill="currentColor" />
              ) : (
                <Play size={17} fill="currentColor" />
              )}
            </button>

            <button
              onClick={() => audio.next()}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
            >
              <SkipForward size={14} fill="currentColor" />
            </button>
          </div>

          {/* Secondary controls */}
          <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => audio.setIsLooping((v) => !v)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
                audio.isLooping
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'bg-white/5 text-white/50 hover:text-white border-white/5 hover:border-white/10'
              }`}
              title="Loop ayah"
            >
              <Repeat size={13} />
            </button>

            <button
              onClick={() => audio.setAutoNext((v) => !v)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
                audio.autoNext
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-white/5 text-white/50 hover:text-white border-white/5 hover:border-white/10'
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
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/15 border border-white/5 hover:border-red-500/20 flex items-center justify-center text-white/40 hover:text-red-400 transition-all flex-shrink-0"
            title="Stop"
          >
            <X size={13} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
