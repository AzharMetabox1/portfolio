import Link from "next/link";
import { getRecommendations } from "@/lib/products";

interface RecommendationsProps {
  productId: string;
}

export default async function Recommendations({ productId }: RecommendationsProps) {
  // Simulate delay to showcase streaming server rendering with React Suspense
  await new Promise((resolve) => setTimeout(resolve, 800));

  const items = await getRecommendations("electronics");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recommended Products</h2>
          <p className="text-xs text-slate-500">
            Streamed in via React Suspense (Server Component)
          </p>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
          Suspense Streamed Server Component
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.id}`}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all flex items-center gap-3 group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-12 h-12 object-contain shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 truncate">
                {item.title}
              </p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
