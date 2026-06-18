const PREFIX = 'quran_cache_';

export function getCache(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function setCache(key, data, ttlMs) {
  try {
    const payload = JSON.stringify({ data, expiresAt: Date.now() + ttlMs });
    localStorage.setItem(PREFIX + key, payload);
  } catch {
    // Storage quota exceeded — silently skip caching
  }
}

export function clearCache() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(PREFIX))
    .forEach((k) => localStorage.removeItem(k));
}
