"use client";

import { useSearchParams } from "next/navigation";

export default function Filters() {
  const searchParams = useSearchParams();
  const postNumber = searchParams.get("postNumber");

  return (
    <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-indigo-900">
          Client Query Parameters Hook
        </span>
        <span className="text-[10px] bg-indigo-200 text-indigo-800 font-semibold px-2 py-0.5 rounded-full">
          useSearchParams()
        </span>
      </div>
      <p className="text-xs text-indigo-700">
        Value read from URL query:{" "}
        {postNumber ? (
          <strong className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-200 text-indigo-900">
            postNumber = {postNumber}
          </strong>
        ) : (
          <span className="italic text-slate-500">
            No &apos;postNumber&apos; param in URL (click the pills below to test)
          </span>
        )}
      </p>
    </div>
  );
}
