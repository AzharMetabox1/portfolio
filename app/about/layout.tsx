import Link from "next/link";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Nested Layout Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">About Section</h1>
            <p className="text-xs text-slate-500">
              Demonstrating Nested Layout (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[11px]">app/about/layout.tsx</code>)
            </p>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
            Nested Server Layout
          </span>
        </div>

        <nav className="flex items-center gap-3 pt-2 border-t border-slate-100">
          <Link
            href="/about"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/about/team"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Our Team
          </Link>
        </nav>
      </div>

      <div>{children}</div>
    </div>
  );
}
