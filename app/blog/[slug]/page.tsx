import { Suspense } from "react";
import Link from "next/link";
import Filters from "./filters";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

async function BlogBody({ params }: BlogPostProps) {
  const { slug } = await params;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
          Dynamic Param: {slug}
        </span>
        <h1 className="text-2xl font-bold text-slate-900 capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed pt-2">
          This page demonstrates Next.js dynamic routing with <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">[slug]</code>. The slug parameter is extracted asynchronously on the server.
        </p>
      </div>

      <Suspense fallback={<div className="text-xs text-slate-400">Loading query params...</div>}>
        <Filters />
      </Suspense>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <p className="text-xs font-bold text-slate-700">Try query parameters:</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/blog/${slug}?postNumber=42`}
            className="text-xs font-mono bg-white px-2.5 py-1 rounded border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 transition-colors"
          >
            ?postNumber=42
          </Link>
          <Link
            href={`/blog/${slug}?postNumber=99`}
            className="text-xs font-mono bg-white px-2.5 py-1 rounded border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 transition-colors"
          >
            ?postNumber=99
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogPost({ params }: BlogPostProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          ← Back to Home
        </Link>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
          Server Component (Dynamic Route: /blog/[slug])
        </span>
      </div>

      <Suspense fallback={<div className="text-xs text-slate-400">Loading blog post...</div>}>
        <BlogBody params={params} />
      </Suspense>
    </div>
  );
}
