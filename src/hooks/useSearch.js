import { useState, useMemo } from 'react';
import { searchSurahs } from '../utils/surahs';

export function useSearch() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchSurahs(query), [query]);
  return { query, setQuery, results };
}
