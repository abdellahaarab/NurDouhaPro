import { ENDPOINTS, CACHE_TTL_MS } from '../config/sources';
import { getCache, setCache } from '../utils/cache';

export async function fetchSurah(surahNumber) {
  const key = `surah_${surahNumber}`;
  const cached = getCache(key);
  if (cached) return cached;

  const res = await fetch(ENDPOINTS.surah(surahNumber));
  if (!res.ok) throw new Error(`Failed to load surah ${surahNumber} (${res.status})`);

  const raw = await res.json();
  const data = normalizeSurah(raw, surahNumber);
  setCache(key, data, CACHE_TTL_MS);
  return data;
}

export async function fetchJuz() {
  const key = 'juz_all';
  const cached = getCache(key);
  if (cached) return cached;

  const res = await fetch(ENDPOINTS.juz());
  if (!res.ok) throw new Error(`Failed to load juz data (${res.status})`);

  const data = await res.json();
  setCache(key, data, CACHE_TTL_MS);
  return data;
}

// Normalize the quranapi.pages.dev response into a consistent shape.
function normalizeSurah(raw, surahNumber) {
  const arabicVerses = raw.arabic1 || raw.arabic || raw.verses?.map((v) => v.arabic) || [];
  const englishVerses = raw.english || raw.verses?.map((v) => v.english) || [];

  const ayahs = arabicVerses.map((text, i) => ({
    number: i + 1,
    arabic: text,
    english: englishVerses[i] || '',
  }));

  return {
    number: raw.surahNo ?? raw.chapter_no ?? surahNumber,
    name: raw.surahName ?? raw.chapter_name ?? `Surah ${surahNumber}`,
    nameArabic: raw.surahNameArabic ?? raw.chapter_name_ar ?? '',
    translation: raw.surahNameTranslation ?? raw.chapter_meaning ?? '',
    revelation: raw.revelationPlace ?? raw.revelation_place ?? 'Makkah',
    totalAyahs: ayahs.length,
    ayahs,
  };
}
