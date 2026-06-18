import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass-card-strong rounded-3xl p-8 sm:p-14 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Mail size={24} className="text-primary" />
            </div>
            <h2 className="section-title mb-4">Stay Connected</h2>
            <p className="section-subtitle mx-auto mb-8">
              Receive weekly reflections, new features, and spiritual reminders delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-4 pr-4 py-3.5 rounded-xl bg-dark/60 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/40 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="magnetic-btn flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-dark text-sm font-semibold transition-all shadow-glow-primary disabled:opacity-80"
              >
                {submitted ? (
                  <>
                    <Check size={16} /> Subscribed
                  </>
                ) : (
                  <>
                    Subscribe <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
