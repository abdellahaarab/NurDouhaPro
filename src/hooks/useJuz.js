import { useState, useEffect } from 'react';
import { fetchJuz } from '../api/quranApi';

export function useJuz() {
  const [juzList, setJuzList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchJuz()
      .then(setJuzList)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { juzList, loading, error };
}
