import { useState, useEffect, useCallback } from 'react';
import { fetchSurah } from '../api/quranApi';

export function useQuran(surahNumber) {
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (num) => {
    if (!num) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSurah(num);
      setSurah(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(surahNumber);
  }, [surahNumber, load]);

  return { surah, loading, error, reload: () => load(surahNumber) };
}
