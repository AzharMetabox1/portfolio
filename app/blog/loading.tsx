export default function Loading() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-8 bg-slate-200 rounded w-1/2"></div>
      <div className="h-16 bg-slate-100 rounded"></div>
      <p className="text-xs text-slate-400 text-center">
        Loading blog post via Next.js <code className="font-mono">loading.tsx</code>...
      </p>
    </div>
  );
}
