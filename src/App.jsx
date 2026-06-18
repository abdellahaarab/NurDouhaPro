import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

const Home        = lazy(() => import('./pages/Home'));
const SurahReader = lazy(() => import('./pages/SurahReader'));
const JuzExplorer = lazy(() => import('./pages/JuzExplorer'));
const Favorites   = lazy(() => import('./pages/Favorites'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 rounded-full border border-primary/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-t-primary/60 border-r-primary/20 border-b-primary/20 border-l-primary/20"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="font-arabic text-2xl text-primary/80">بسم</span>
          </motion.div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-white/30 text-xs tracking-[0.2em] uppercase">Preparing Your Spiritual Journey</p>
          <div className="h-0.5 w-24 mx-auto bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-1/2 bg-primary/50 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/surah/:number" element={<SurahReader />} />
            <Route path="/juz"         element={<JuzExplorer />} />
            <Route path="/favorites"   element={<Favorites />} />
            <Route path="*"            element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </AppProvider>
  );
}
