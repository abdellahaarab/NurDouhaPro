export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-5 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-white/10" />
        <div className="w-16 h-4 rounded bg-white/10" />
      </div>
      <div className="h-6 w-2/3 rounded bg-white/10 mb-2 ml-auto" />
      <div className="h-3 w-1/2 rounded bg-white/8" />
    </div>
  );
}

export function SkeletonAyah() {
  return (
    <div className="glass-card rounded-2xl p-6 mb-4 animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="w-8 h-8 rounded-full bg-white/10" />
        <div className="w-12 h-4 rounded bg-white/10" />
      </div>
      <div className="flex justify-end mb-6">
        <div className="w-3/4 h-10 rounded bg-white/10" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded bg-white/8" />
        <div className="h-4 w-5/6 rounded bg-white/8" />
        <div className="h-4 w-4/6 rounded bg-white/8" />
      </div>
      <div className="flex gap-2 mt-4">
        <div className="w-8 h-8 rounded-full bg-white/10" />
        <div className="w-8 h-8 rounded-full bg-white/10" />
        <div className="w-8 h-8 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
