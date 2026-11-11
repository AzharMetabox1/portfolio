"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-base">
          Interactive Counter Demo
        </h3>
        <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200">
          Client Component (useState)
        </span>
      </div>

      <p className="text-xs text-slate-600">
        This component uses <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono text-[11px]">&apos;use client&apos;</code> to manage local state, event listeners (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">onClick</code>), and reactive DOM updates in the browser.
      </p>

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={() => {
            setCount((prev) => prev + 1);
            setClicked(true);
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-all active:scale-95"
        >
          Clicked: {count} times
        </button>

        <button
          onClick={() => setCount(0)}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      {clicked && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
          <span>✨</span>
          <span>
            {count > 10
              ? "🔥 Wow! You've clicked more than 10 times!"
              : "Great job! The client state updated smoothly without re-rendering server components."}
          </span>
        </div>
      )}
    </div>
  );
}
