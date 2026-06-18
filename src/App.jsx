import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

const Home        = lazy(() => import('./pages/Home'));
const SurahReader = lazy(() => import('./pages/SurahReader'));
const JuzExplorer = lazy(() => import('./pages/JuzExplorer'));
const Favorites   = lazy(() => import('./pages/Favorites'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <p className="font-arabic text-3xl text-white/30 animate-pulse">بسم الله</p>
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
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
