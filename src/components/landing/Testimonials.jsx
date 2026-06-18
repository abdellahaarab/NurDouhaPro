import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Amina R.',
    role: 'Student',
    text: 'The most beautiful Quran app I have ever used. The design feels sacred and the audio is crystal clear.',
    avatar: 'AR',
  },
  {
    name: 'Omar H.',
    role: 'Teacher',
    text: 'I recommend this to all my students. The tafsir integration and clean interface make learning effortless.',
    avatar: 'OH',
  },
  {
    name: 'Fatima S.',
    role: 'Designer',
    text: 'Finally, a Quran platform that matches the beauty of the words inside. Truly a spiritual experience.',
    avatar: 'FS',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Community
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Loved by <span className="gradient-text">Muslims</span> Worldwide
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group glass-card rounded-2xl p-6 hover:border-primary/25 transition-colors duration-500"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-primary/70 fill-primary/70" />
                ))}
              </div>
              <p className="text-white/75 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary text-xs font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
