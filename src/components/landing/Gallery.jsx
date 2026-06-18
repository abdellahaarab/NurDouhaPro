import { motion } from 'framer-motion';

import SacredArchitecture from '../../assets/Sacred_Architecture.png';

import IslamicCalligraphy from '../../assets/Islamic_Calligraphy.png';
import IslamicCalligraphyAlt from '../../assets/Islamic__Calligraphy.png';
import IslamicCalligraphy1 from '../../assets/Islamic_Calligraphy_1.png';

import QuranPages from '../../assets/Quran_Pages.png';
import QuranPagesAlt from '../../assets/Quran__Pages.png';

import MosqueInterior from '../../assets/Mosque_Interior.png';
import MosqueInteriorAlt from '../../assets/Mosque__Interior.png';

import GeometricPatterns from '../../assets/Geometric_Patterns.png';
import GeometricPatternsAlt from '../../assets/Geometric__Patterns.png';

import PrayerHall from '../../assets/Prayer_Hall.png';
import PrayerHallAlt from '../../assets/Prayer__Hall.png';
import Prayer from '../../assets/Prayer.png';


const IMAGES = [
  {
    src: SacredArchitecture,
    title: 'Sacred Architecture',
    span: 'col-span-1 row-span-2',
  },
  {
    src: IslamicCalligraphy,
    title: 'Islamic Calligraphy',
    span: 'col-span-1 row-span-1',
  },
  {
    src: QuranPages,
    title: 'Quran Pages',
    span: 'col-span-1 row-span-1',
  },
  {
    src: MosqueInterior,
    title: 'Mosque Interior',
    span: 'col-span-1 row-span-2',
  },
  {
    src: GeometricPatterns,
    title: 'Geometric Patterns',
    span: 'col-span-1 row-span-1',
  },
  {
    src: PrayerHall,
    title: 'Prayer Hall',
    span: 'col-span-1 row-span-1',
  },
  {
    src: MosqueInteriorAlt,
    title: 'Mosque Interior',
    span: 'col-span-1 row-span-2',
  },
  {
    src: QuranPagesAlt,
    title: 'Quran Pages',
    span: 'col-span-1 row-span-1',
  },
  {
    src: PrayerHallAlt,
    title: 'Prayer Hall',
    span: 'col-span-1 row-span-1',
  },
];

export default function Gallery() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Visual Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Islamic <span className="gradient-text">Art Gallery</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {img.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
