import { createContext, useContext, useState, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import { useFavorites } from '../hooks/useFavorites';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeSurahTotal, setActiveSurahTotal] = useState(0);
  const audio     = useAudio(activeSurahTotal);
  const favorites = useFavorites();

  const startSurah = useCallback((surahNumber, totalAyahs, startAyah = 1) => {
    setActiveSurahTotal(totalAyahs);
    audio.playAyah(surahNumber, startAyah);
  }, [audio]);

  return (
    <AppContext.Provider value={{ audio, favorites, startSurah, setActiveSurahTotal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
