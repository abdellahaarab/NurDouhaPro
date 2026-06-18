import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';

const STATS = [
  { value: 114, suffix: '', label: 'Surahs' },
  { value: 6236, suffix: '', label: 'Verses' },
  { value: 30, suffix: '', label: 'Juz' },
  { value: 1.9, suffix: 'B+', label: 'Muslims' },
];

function AnimatedNumber({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 90 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = value % 1 !== 0
          ? latest.toFixed(1)
          : Math.floor(latest).toLocaleString();
      }
    });
    return unsubscribe;
  }, [springValue, value]);

  return (
    <span ref={ref}>
      {value % 1 !== 0 ? value.toFixed(1) : Math.floor(value).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass-card-strong rounded-3xl p-10 sm:p-14 border border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/40 text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
