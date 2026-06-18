import { useState, useEffect, useRef, useCallback } from 'react';
import { getAyahAudioUrl } from '../api/audioApi';

export function useAudio(totalAyahs = 0) {
  const audioRef       = useRef(null);
  const totalAyahsRef  = useRef(totalAyahs);
  const isLoopingRef   = useRef(false);
  const autoNextRef    = useRef(true);

  // Keep refs in sync with state so event listeners always see latest values
  useEffect(() => { totalAyahsRef.current = totalAyahs; }, [totalAyahs]);

  const [surah, setSurah]             = useState(null);
  const [ayahIndex, setAyahIndex]     = useState(0);   // 0-based
  const [isPlaying, setIsPlaying]     = useState(false);
  const [isLooping, _setIsLooping]    = useState(false);
  const [autoNext, _setAutoNext]      = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [isLoading, setIsLoading]     = useState(false);

  const setIsLooping = useCallback((val) => {
    const next = typeof val === 'function' ? val(isLoopingRef.current) : val;
    isLoopingRef.current = next;
    _setIsLooping(next);
  }, []);

  const setAutoNext = useCallback((val) => {
    const next = typeof val === 'function' ? val(autoNextRef.current) : val;
    autoNextRef.current = next;
    _setAutoNext(next);
  }, []);

  // Initialise audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDuration   = () => setDuration(audio.duration);
    const onWaiting    = () => setIsLoading(true);
    const onCanPlay    = () => setIsLoading(false);
    const onEnded      = () => {
      setIsPlaying(false);
      if (isLoopingRef.current) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        setIsPlaying(true);
      } else if (autoNextRef.current) {
        setAyahIndex((prev) => {
          const next = prev + 1;
          if (next < totalAyahsRef.current) {
            // playback of the new index is triggered via the effect below
            return next;
          }
          return prev;
        });
        setIsPlaying(true);
      }
    };

    audio.addEventListener('timeupdate',     onTimeUpdate);
    audio.addEventListener('durationchange', onDuration);
    audio.addEventListener('waiting',        onWaiting);
    audio.addEventListener('canplay',        onCanPlay);
    audio.addEventListener('ended',          onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate',     onTimeUpdate);
      audio.removeEventListener('durationchange', onDuration);
      audio.removeEventListener('waiting',        onWaiting);
      audio.removeEventListener('canplay',        onCanPlay);
      audio.removeEventListener('ended',          onEnded);
    };
  }, []);

  // Reload audio src when surah / ayah changes (and isPlaying is true)
  const surahRef    = useRef(null);
  const isPlayingRef = useRef(false);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  useEffect(() => {
    if (!surah || !audioRef.current) return;
    surahRef.current = surah;
    const ayahNumber = ayahIndex + 1;
    const url = getAyahAudioUrl(surah, ayahNumber);
    audioRef.current.src = url;
    audioRef.current.load();
    if (isPlayingRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [surah, ayahIndex]);

  const playAyah = useCallback((surahNum, ayahNum) => {
    setSurah(surahNum);
    setAyahIndex(ayahNum - 1);
    setIsPlaying(true);
    // Play is triggered reactively by the effect above on the next render
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlayingRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, []);

  const next = useCallback(() => {
    setAyahIndex((prev) => Math.min(prev + 1, totalAyahsRef.current - 1));
    setIsPlaying(true);
  }, []);

  const previous = useCallback(() => {
    setAyahIndex((prev) => Math.max(prev - 1, 0));
    setIsPlaying(true);
  }, []);

  const seek = useCallback((time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setSurah(null);
  }, []);

  return {
    surah,
    ayahIndex,
    ayahNumber: ayahIndex + 1,
    isPlaying,
    isLooping,
    autoNext,
    currentTime,
    duration,
    isLoading,
    playAyah,
    togglePlay,
    next,
    previous,
    seek,
    stop,
    setIsLooping,
    setAutoNext,
  };
}
