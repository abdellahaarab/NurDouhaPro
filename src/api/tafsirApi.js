import { ENDPOINTS, CACHE_TTL_MS } from '../config/sources';
import { getCache, setCache } from '../utils/cache';

export async function fetchTafsir(surah, ayah) {
  const key = `tafsir_${surah}_${ayah}`;
  const cached = getCache(key);
  if (cached) return cached;

  const res = await fetch(ENDPOINTS.tafsir(surah, ayah));
  if (!res.ok) throw new Error(`Failed to load tafsir for ${surah}:${ayah} (${res.status})`);

  const raw = await res.json();
  const data = normalizeTafsir(raw, surah, ayah);
  setCache(key, data, CACHE_TTL_MS);
  return data;
}

function normalizeTafsir(raw, surah, ayah) {
  // quranapi may embed tafsir text under different keys depending on the endpoint
  const text =
    raw.tafsirEnglish ??
    raw.tafsir ??
    raw.tafsir_english ??
    raw.english ??
    raw.text ??
    'Tafsir not available for this verse.';

  return {
    surah,
    ayah,
    arabic: raw.arabic ?? '',
    english: raw.english ?? '',
    tafsir: text,
  };
}
