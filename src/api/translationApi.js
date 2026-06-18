import { ENDPOINTS, CACHE_TTL_MS } from '../config/sources';
import { getCache, setCache } from '../utils/cache';

export async function fetchEnglishTranslation() {
  const key = 'translation_english_all';
  const cached = getCache(key);
  if (cached) return cached;

  const res = await fetch(ENDPOINTS.english());
  if (!res.ok) throw new Error(`Failed to load English translation (${res.status})`);

  const data = await res.json();
  setCache(key, data, CACHE_TTL_MS);
  return data;
}

// Returns the English translation for a specific surah ayah from the full dataset.
export function getTranslationForVerse(allTranslations, surahIndex, ayahIndex) {
  if (!Array.isArray(allTranslations)) return '';
  const surahData = allTranslations[surahIndex];
  if (!surahData) return '';
  if (Array.isArray(surahData)) return surahData[ayahIndex] ?? '';
  if (surahData.verses) return surahData.verses[ayahIndex]?.text ?? '';
  return '';
}
