import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchSurahs } from '../../utils/surahs';

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setResults(query.trim() ? searchSurahs(query).slice(0, 8) : []);
    setSelected(0);
  }, [query]);

  const goTo = (number) => {
    navigate(`/surah/${number}`);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((v) => Math.min(v + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((v) => Math.max(v - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      goTo(results[selected].number);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -20 }}
        className="relative w-full max-w-xl"
      >
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/8">
            <Search size={18} className="text-white/40 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search surahs by name, number, or meaning…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-white/40 hover:text-white transition-colors">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <ul className="max-h-72 overflow-y-auto">
              {results.map((surah, i) => (
                <li key={surah.number}>
                  <button
                    onClick={() => goTo(surah.number)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                      i === selected ? 'bg-primary/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs font-bold">{surah.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{surah.name}</p>
                      <p className="text-white/40 text-xs">{surah.translation} · {surah.verses} verses</p>
                    </div>
                    <span className="font-arabic text-white/50 text-sm">{surah.arabic}</span>
                    {i === selected && <ArrowRight size={14} className="text-primary flex-shrink-0" />}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-white/40 text-sm">
              No surahs found for "<span className="text-white/60">{query}</span>"
            </div>
          )}

          {!query && (
            <div className="px-4 py-3 flex items-center gap-4 text-white/30 text-xs">
              <span><kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded">↵</kbd> open</span>
              <span><kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded">Esc</kbd> close</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
