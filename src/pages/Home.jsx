import { useState, lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Search, Play, Sparkles } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useApp } from '../context/AppContext';
import { SkeletonList } from '../components/ui/SkeletonLoader';
import Features from '../components/landing/Features';
import Stats from '../components/landing/Stats';
import Gallery from '../components/landing/Gallery';
import Testimonials from '../components/landing/Testimonials';
import Newsletter from '../components/landing/Newsletter';
import Footer from '../components/landing/Footer';

const SurahCard = lazy(() => import('../components/surah/SurahCard'));

const REVELATION_FILTERS = ['All', 'Makkah', 'Madinah'];

const PARTICLES = [
  { left: 24, top: 28, dur: 5, delay: 0.3 },
  { left: 72, top: 22, dur: 6, delay: 1.2 },
  { left: 45, top: 75, dur: 4.5, delay: 0.7 },
  { left: 18, top: 62, dur: 5.5, delay: 1.8 },
  { left: 82, top: 58, dur: 6.5, delay: 0.5 },
  { left: 60, top: 38, dur: 5, delay: 2.1 },
];

function QuranOrb() {
  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto">
      {/* Outer rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-primary/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-6 rounded-full border border-accent/10"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-12 rounded-full border border-primary/20 border-dashed"
      />

      {/* Glow orb */}
      <div className="absolute inset-20 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-2xl" />

      {/* Quran representation */}
      <motion.div
        animate={{ y: [0, -16, 0], rotateY: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative w-48 h-64 sm:w-56 sm:h-72">
          {/* Book spine */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-4 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 rounded-l-sm" />
          {/* Pages */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-200 via-dark-300 to-dark-200 rounded-r-2xl rounded-l-sm border border-primary/30 shadow-glow-primary">
            <div className="absolute inset-3 border border-primary/10 rounded-r-xl rounded-l-sm flex flex-col items-center justify-center p-4">
              <span className="font-arabic text-4xl sm:text-5xl text-primary mb-3">القرآن</span>
              <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Al-Quran</span>
              <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
          </div>
          {/* Gold edge */}
          <div className="absolute top-1 right-1 bottom-1 w-1 bg-gradient-to-b from-primary/60 via-primary/20 to-primary/60 rounded-r" />
        </div>
      </motion.div>

      {/* Floating particles around */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/50"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { query, setQuery, results } = useSearch();
  const [revelation, setRevelation] = useState('All');
  const { audio, startSurah } = useApp();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 80]);

  const filtered = results.filter(
    (s) => revelation === 'All' || s.revelation === revelation,
  );

  const scrollToSurahs = () => {
    document.getElementById('surahs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
            {/* Left content */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6"
              >
                <Sparkles size={12} />
                Premium Digital Quran Experience
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.1] mb-6 text-balance"
              >
                Experience The Quran{' '}
                <span className="gradient-text">Like Never Before</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/45 text-base sm:text-lg max-w-xl mx-auto lg:mx-auto lg:ml-0 mb-8 leading-relaxed"
              >
                Read, Listen, Reflect and Connect through a premium digital experience crafted for your spiritual journey.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button
                  onClick={scrollToSurahs}
                  className="magnetic-btn group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-dark text-sm font-semibold transition-all shadow-glow-primary"
                >
                  <BookOpen size={17} />
                  Explore Quran
                </button>
                <button
                  onClick={() => audio.surah ? audio.togglePlay() : startSurah(1, 7, 1)}
                  className="magnetic-btn group flex items-center gap-2 px-7 py-3.5 rounded-xl glass-card hover:border-primary/30 text-white text-sm font-medium transition-all"
                >
                  <Play size={17} className="text-primary group-hover:scale-110 transition-transform" />
                  Start Listening
                </button>
              </motion.div>
            </motion.div>

            {/* Right - Quran Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative"
            >
              <QuranOrb />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/25 text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <Features />

      {/* Surahs Explore Section */}
      <section id="surahs-section" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            >
              Explore
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title mb-4"
            >
              All <span className="gradient-text">114 Surahs</span>
            </motion.h2>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 max-w-lg mx-auto"
            >
              <div className="relative group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name, number, or meaning…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-dark-200/80 border border-white/8 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/40 focus:bg-dark-200 transition-all"
                />
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 mt-5 flex-wrap"
            >
              {REVELATION_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setRevelation(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    revelation === f
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                >
                  {f}
                </button>
              ))}
              <span className="text-white/25 text-xs ml-2">{filtered.length} surahs</span>
            </motion.div>
          </div>

          {/* Grid */}
          <Suspense fallback={<SkeletonList count={12} />}>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((surah, i) => (
                  <SurahCard key={surah.number} surah={surah} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <BookOpen size={32} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/50 text-sm">
                  No surahs found for "<span className="text-white/70">{query}</span>"
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </section>

      {/* Quran Showcase Preview */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-primary/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Quran Showcase</p>
              <h2 className="section-title mb-4">
                A Reader That Feels <span className="gradient-text">Sacred</span>
              </h2>
              <p className="section-subtitle mb-8">
                Immerse yourself in a premium reading experience with crystal-clear Arabic script,
                flowing translations, and intuitive audio controls.
              </p>

              <div className="space-y-4">
                {[
                  'Large Arabic Uthmani script with verse markers',
                  'Side-by-side English translation',
                  'One-tap audio playback with visualizer',
                  'Bookmark and share any verse instantly',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-white/60 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card-strong rounded-3xl p-6 sm:p-8 max-w-md mx-auto border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Surah Ar-Rahman</p>
                    <p className="font-arabic text-2xl text-white">الرحمن</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                    55
                  </div>
                </div>

                <p dir="rtl" className="font-arabic text-2xl text-white leading-loose text-right mb-4">
                  ٱلرَّحْمَٰنُ عَلَّمَ ٱلْقُرْءَانَ
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  The Most Merciful. Taught the Qur'an.
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-dark">
                    <Play size={16} fill="currentColor" />
                  </button>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary rounded-full" />
                  </div>
                  <span className="text-white/40 text-xs">1:12</span>
                </div>
              </div>

              {/* Decorative blur */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      <Stats />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <Footer />
    </motion.div>
  );
}
