export function padNumber(n, size = 3) {
  return String(n).padStart(size, '0');
}

export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function toArabicNumerals(num) {
  return String(num).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
}

export function getSurahLabel(surah) {
  if (!surah) return '';
  return `${surah.name} — ${surah.nameArabic}`;
}
