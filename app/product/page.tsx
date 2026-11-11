import { Suspense } from "react";
import Link from "next/link";
import SearchBox from "./searchBox";
import FavoriteButton from "./FavoriteButton";
import Modal from "./modal";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Products Catalog | Next.js Server Component Data Page",
  description:
    "Demonstrating server-side data fetching with App Router and client interactivity",
};

async function ProductList() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
        >
          {/* Image Container */}
          <div className="relative aspect-4/3 p-6 bg-white flex items-center justify-center border-b border-slate-100">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {product.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Link
                  href={`/product/${product.id}`}
                  className="font-semibold text-slate-900 group-hover:text-indigo-600 text-sm line-clamp-2 transition-colors"
                >
                  {product.title}
                </Link>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                {product.description}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.rating && (
                  <span className="text-xs text-amber-600 font-medium">
                    ★ {product.rating.rate} ({product.rating.count})
                  </span>
                )}
              </div>

              {/* Client Components Section */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <FavoriteButton productId={product.id} />

                <div className="flex items-center gap-2">
                  <Modal buttonText="Quick View" title={product.title}>
                    <div className="space-y-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-32 mx-auto object-contain"
                      />
                      <p className="text-sm font-semibold text-slate-900">
                        Price: ${product.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </Modal>

                  <Link
                    href={`/product/${product.id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4"
        >
          <div className="h-40 bg-slate-100 rounded-xl"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-100 rounded w-1/2"></div>
          <div className="h-8 bg-slate-100 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header / Demo Explanation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Products Catalog</h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Server Component (Data Page)
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Async Data Fetching with Suspense
          </span>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          This page is an <strong className="text-slate-800">async Server Component</strong>. It fetches product data on the server during request time without shipping any data fetching libraries to the client browser. Client components like the Search Box, Favorite toggles, and Quick View modals are cleanly composed inside this server tree.
        </p>
      </div>

      {/* Client Component: Search Box */}
      <SearchBox />

      {/* Server Component Streamed inside Suspense */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
