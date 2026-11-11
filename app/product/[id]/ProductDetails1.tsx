import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import { getProduct } from "@/lib/products";

export default async function ProductDetails({ productId }: { productId: string }) {
  const product = await getProduct(productId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <Link
          href="/product"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          ← Back to Catalog
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
            Server Component (ProductDetails)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-8 bg-slate-50 rounded-xl flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-72 max-w-full object-contain"
          />
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.rating && (
              <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                ★ {product.rating.rate} / 5 ({product.rating.count} reviews)
              </span>
            )}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed pt-2">
            {product.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <FavoriteButton productId={product.id} />
            <span className="text-xs text-slate-400">
              (Interactive client state inside server page)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
