"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";

interface SearchResult {
  id: number;
  title: string;
  price?: number;
}

export default function SearchBox() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        if (res.ok) {
          const data: SearchResult[] = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="search-input" className="text-sm font-semibold text-slate-700">
          Interactive Product Search
        </label>
        <span className="text-xs bg-indigo-100 text-indigo-700 font-medium px-2 py-0.5 rounded-full border border-indigo-200">
          Client Component (useState + fetch)
        </span>
      </div>

      <div className="relative">
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search products by title (e.g. SSD, backpack, jacket)..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-slate-50 placeholder:text-slate-400"
        />
        {loading && (
          <div className="absolute right-3 top-2.5 text-xs text-slate-400">
            Searching...
          </div>
        )}
      </div>

      {results.length > 0 && (
        <ul className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-200 max-h-56 overflow-y-auto bg-white">
          {results.map((r) => (
            <li key={r.id} className="p-2.5 hover:bg-slate-50 transition-colors">
              <Link
                href={`/product/${r.id}`}
                className="flex items-center justify-between text-sm text-slate-800 hover:text-indigo-600"
              >
                <span className="truncate pr-2 font-medium">{r.title}</span>
                {r.price !== undefined && (
                  <span className="text-xs font-semibold text-slate-500 shrink-0">
                    ${r.price}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query.length > 1 && results.length === 0 && !loading && (
        <p className="mt-2 text-xs text-slate-500 italic">No matching products found.</p>
      )}
    </div>
  );
}
