import { Suspense } from "react";
import Link from "next/link";

interface DocsPageProps {
  params: Promise<{ slug: string[] }>;
}

async function DocsContent({ params }: DocsPageProps) {
  const { slug } = await params;
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-indigo-600">
      /{slug ? slug.join("/") : ""}
    </div>
  );
}

export default function DocsPage({ params }: DocsPageProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          ← Back to Home
        </Link>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
          Catch-all Server Route ([...slug])
        </span>
      </div>

      <h1 className="text-2xl font-bold text-slate-900">Documentation</h1>
      <p className="text-sm text-slate-600">Current path segments captured:</p>
      <Suspense fallback={<div className="text-xs text-slate-400">Loading route segments...</div>}>
        <DocsContent params={params} />
      </Suspense>
    </div>
  );
}
