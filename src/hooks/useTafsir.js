import { useState, useCallback } from 'react';
import { fetchTafsir } from '../api/tafsirApi';

export function useTafsir() {
  const [tafsir, setTafsir]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [activeVerse, setActiveVerse] = useState(null);

  const loadTafsir = useCallback(async (surah, ayah) => {
    const key = `${surah}_${ayah}`;
    if (activeVerse === key) {
      setActiveVerse(null);
      setTafsir(null);
      return;
    }
    setActiveVerse(key);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTafsir(surah, ayah);
      setTafsir(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeVerse]);

  const close = useCallback(() => {
    setActiveVerse(null);
    setTafsir(null);
  }, []);

  return { tafsir, loading, error, activeVerse, loadTafsir, close };
}
