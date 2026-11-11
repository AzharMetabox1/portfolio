import type { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/app/back-button";

export const metadata: Metadata = {
  title: "About Us | Next.js Demo App",
  description: "Learn more about our team and mission.",
};

export default function AboutPage() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">About This Project</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          This project was built for the MetaBox Intern Training curriculum. It showcases modern full-stack React capabilities powered by Next.js App Router, demonstrating the separation of concerns between Server Components and Client Components.
        </p>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Client Navigation Component
        </h3>
        <Suspense fallback={<div className="text-xs text-slate-400">Loading navigation...</div>}>
          <BackButton />
        </Suspense>
      </div>
    </div>
  );
}
