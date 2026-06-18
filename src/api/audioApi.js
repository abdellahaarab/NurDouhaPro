import { AUDIO_ENDPOINTS } from '../config/sources';

export function getAyahAudioUrl(surah, ayah) {
  return AUDIO_ENDPOINTS.ayah(surah, ayah);
}

export function preloadAyahAudio(surah, ayah) {
  const url = getAyahAudioUrl(surah, ayah);
  const audio = new Audio();
  audio.preload = 'metadata';
  audio.src = url;
  return audio;
}
