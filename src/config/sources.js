// Central configuration for all external data sources.
// Change base URLs here to swap providers without touching any component.

export const QURAN_API_BASE = 'https://quranapi.pages.dev/api';
export const AUDIO_CDN_BASE = 'https://the-quran-project.github.io/Quran-Audio/Data';

export const ENDPOINTS = {
  surah:       (number)        => `${QURAN_API_BASE}/${number}.json`,
  juz:         ()              => `${QURAN_API_BASE}/juz.json`,
  tafsir:      (surah, ayah)  => `${QURAN_API_BASE}/${surah}_${ayah}.json`,
  english:     ()              => `${QURAN_API_BASE}/english.json`,
};

export const AUDIO_ENDPOINTS = {
  ayah: (surah, ayah) =>
    `${AUDIO_CDN_BASE}/${surah}/${surah}_${ayah}.mp3`,
};

export const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
