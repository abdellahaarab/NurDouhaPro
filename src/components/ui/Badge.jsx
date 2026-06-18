export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-white/10 text-white/70',
    primary: 'bg-primary/15 text-primary',
    accent:  'bg-accent/15 text-accent',
    makkah:  'bg-amber-500/15 text-amber-400',
    madinah: 'bg-emerald-500/15 text-emerald-400',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${variants[variant] ?? variants.default} ${className}`}
    >
      {children}
    </span>
  );
}
