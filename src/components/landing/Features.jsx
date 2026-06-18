import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Headphones, ScrollText, Bookmark, Moon, Languages } from 'lucide-react';
import { useRef } from 'react';

const FEATURES = [
  { icon: BookOpen, title: 'Quran Reader', desc: 'Crystal-clear Arabic text with Uthmani script and verse markers.', color: 'primary' },
  { icon: Headphones, title: 'Audio Recitation', desc: 'Listen to beautiful recitations with synchronized verse highlighting.', color: 'primary' },
  { icon: ScrollText, title: 'Tafsir Explorer', desc: 'Deepen understanding with scholarly explanations for every verse.', color: 'accent' },
  { icon: Bookmark, title: 'Bookmarks', desc: 'Save your favorite verses and return to them anytime, anywhere.', color: 'primary' },
  { icon: Moon, title: 'Night Reading', desc: 'A calming dark interface designed for peaceful nighttime reflection.', color: 'accent' },
  { icon: Languages, title: 'Translations', desc: 'Read English translations alongside the original Arabic text.', color: 'primary' },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = feature.icon;
  const isPrimary = feature.color === 'primary';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative"
    >
      <div className="relative h-full glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-primary/30 transition-colors duration-500 overflow-hidden">
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isPrimary ? 'bg-primary/15' : 'bg-accent/10'}`} />

        <div className="relative z-10">
          <div className={`w-12 h-12 rounded-2xl mb-5 flex items-center justify-center ${isPrimary ? 'bg-primary/10 border border-primary/20' : 'bg-accent/10 border border-accent/20'}`}>
            <Icon size={22} className={isPrimary ? 'text-primary' : 'text-accent'} />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
          <p className="text-white/45 text-sm leading-relaxed">{feature.desc}</p>
        </div>

        {/* Hover shine */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
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
            Sacred Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Everything You Need to <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            A complete spiritual toolkit designed for focus, beauty, and peace.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
