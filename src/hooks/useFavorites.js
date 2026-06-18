import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'quran_favorites';

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (surah, ayah) => favorites.some((f) => f.surah === surah && f.ayah === ayah),
    [favorites],
  );

  const toggleFavorite = useCallback((surah, ayah, arabic, english, surahName) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.surah === surah && f.ayah === ayah);
      if (exists) return prev.filter((f) => !(f.surah === surah && f.ayah === ayah));
      return [...prev, { surah, ayah, arabic, english, surahName, savedAt: Date.now() }];
    });
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
