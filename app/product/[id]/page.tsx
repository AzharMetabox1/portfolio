import { Suspense } from "react";
import ProductDetails from "./ProductDetails1";
import Recommendations from "./recommendations";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function DetailsSection({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetails productId={id} />;
}

async function RecommendationsSection({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Recommendations productId={id} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/3"></div>
            <div className="h-48 bg-slate-100 rounded-xl"></div>
          </div>
        }
      >
        <DetailsSection params={params} />
      </Suspense>

      <Suspense
        fallback={
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs animate-pulse space-y-4">
            <div className="h-5 bg-slate-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-20 bg-slate-100 rounded-xl"></div>
              <div className="h-20 bg-slate-100 rounded-xl"></div>
              <div className="h-20 bg-slate-100 rounded-xl"></div>
            </div>
            <p className="text-xs text-slate-400 text-center">
              Loading recommendations via streaming Server Component...
            </p>
          </div>
        }
      >
        <RecommendationsSection params={params} />
      </Suspense>
    </div>
  );
}
