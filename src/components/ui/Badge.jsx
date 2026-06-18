export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-white/10 text-white/70 border border-white/10',
    primary: 'bg-primary/10 text-primary border border-primary/20',
    accent:  'bg-accent/10 text-accent border border-accent/20',
    makkah:  'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    madinah: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${variants[variant] ?? variants.default} ${className}`}
    >
      {children}
    </span>
  );
}
