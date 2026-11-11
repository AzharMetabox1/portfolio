"use client";

import { useState } from "react";

export default function FavoriteButton({ productId }: { productId?: number }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <button
      onClick={() => setFavorited(!favorited)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        favorited
          ? "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
      }`}
      aria-label="Toggle favorite"
    >
      <span className={favorited ? "text-rose-500" : "text-slate-400"}>
        {favorited ? "❤️" : "🤍"}
      </span>
      <span>{favorited ? "Saved to Favorites" : "Add to Favorites"}</span>
    </button>
  );
}
