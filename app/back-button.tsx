"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>Current Route:</span>
        <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">
          {pathname}
        </code>
        <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
          usePathname Hook
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
