import Link from "next/link";

export const metadata = {
  title: "5-Minute Demo Presentation Guide | Next.js",
  description:
    "Cheat sheet and talking points for the 5-minute demo showing Server vs Client components",
};

export default function DemoPage() {
  const componentBreakdown = [
    {
      name: "RootLayout (app/layout.tsx)",
      type: "Server Component",
      isServer: true,
      reason:
        "Renders initial HTML shell (html, body, metadata) with zero client bundle overhead.",
    },
    {
      name: "Nav (app/nav.tsx)",
      type: "Client Component",
      isServer: false,
      reason:
        "Uses 'use client' and usePathname() hook to highlight active links dynamically in the browser.",
    },
    {
      name: "ProductsPage (app/product/page.tsx)",
      type: "Server Component",
      isServer: true,
      reason:
        "Data Page: Fetches product list directly on the server (async/await) with caching and revalidation.",
    },
    {
      name: "SearchBox (app/product/searchBox.tsx)",
      type: "Client Component",
      isServer: false,
      reason:
        "Handles real-time keystroke input (onChange) and maintains query state (useState).",
    },
    {
      name: "FavoriteButton (app/product/FavoriteButton.tsx)",
      type: "Client Component",
      isServer: false,
      reason:
        "Manages local toggled/favorited state and click events (onClick).",
    },
    {
      name: "Modal (app/product/modal.tsx)",
      type: "Client Component",
      isServer: false,
      reason:
        "Toggles modal open/closed state via useState and handles overlay click interactions.",
    },
    {
      name: "ProductDetails (app/product/[id]/ProductDetails1.tsx)",
      type: "Server Component",
      isServer: true,
      reason:
        "Server-rendered component fetching single product data based on route param [id].",
    },
    {
      name: "Recommendations (app/product/[id]/recommendations.tsx)",
      type: "Server Component (Suspense Streamed)",
      isServer: true,
      reason:
        "Wrapped in <Suspense> for streaming server rendering — renders after simulated delay without blocking main product view.",
    },
    {
      name: "Counter (components/counter.tsx)",
      type: "Client Component",
      isServer: false,
      reason:
        "Classic client component showcasing useState, button counter increments, and reactive conditional rendering.",
    },
    {
      name: "BackButton (app/back-button.tsx)",
      type: "Client Component",
      isServer: false,
      reason:
        "Uses useRouter() and usePathname() to trigger client-side programmatic navigation.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900">
            5-Minute Demo Presentation Guide
          </h1>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
            Web Week Day 4 Presentation
          </span>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          Use this page as your quick reference script during your 5-minute demo. It clearly categorizes every component in your project as either a <strong>Server Component</strong> or a <strong>Client Component</strong>, explaining the exact reason why.
        </p>
      </div>

      {/* 5-Minute Demo Script Outline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>⏱️</span>
          <span>Suggested 5-Minute Demo Flow</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-indigo-600 text-xs uppercase tracking-wider">
              Minute 1
            </span>
            <p className="font-semibold text-slate-800 text-sm">Introduction &amp; Layout</p>
            <p className="text-xs text-slate-500">
              Open Home page. Point out <code className="font-mono text-slate-700">RootLayout</code> (Server) and persistent <code className="font-mono text-slate-700">Nav</code> (Client with usePathname).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-indigo-600 text-xs uppercase tracking-wider">
              Minute 2
            </span>
            <p className="font-semibold text-slate-800 text-sm">Client Interactivity</p>
            <p className="text-xs text-slate-500">
              Show <code className="font-mono text-slate-700">Counter</code> on Home page. Explain why &apos;use client&apos; is needed for state (<code className="font-mono text-slate-700">useState</code>) and event handling.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-indigo-600 text-xs uppercase tracking-wider">
              Minute 3
            </span>
            <p className="font-semibold text-slate-800 text-sm">The Data Page</p>
            <p className="text-xs text-slate-500">
              Navigate to <Link href="/product" className="text-indigo-600 underline">/product</Link>. Show async server fetch, cached data, and composition with Client Search &amp; Favorites.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-indigo-600 text-xs uppercase tracking-wider">
              Minutes 4-5
            </span>
            <p className="font-semibold text-slate-800 text-sm">Dynamic Routes &amp; Suspense</p>
            <p className="text-xs text-slate-500">
              Click a product to open <code className="font-mono text-slate-700">/product/[id]</code>. Highlight <code className="font-mono text-slate-700">&lt;Suspense&gt;</code> streaming recommendations asynchronously!
            </p>
          </div>
        </div>
      </div>

      {/* Component Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Component Breakdown Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Component &amp; File</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Why It&apos;s Server or Client</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {componentBreakdown.map((c) => (
                <tr key={c.name} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono font-medium text-slate-900">
                    {c.name}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                        c.isServer
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-indigo-100 text-indigo-800 border border-indigo-200"
                      }`}
                    >
                      {c.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 leading-normal">
                    {c.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary of Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <h3 className="font-bold text-emerald-900">When to use Server Components</h3>
          </div>
          <ul className="text-xs text-emerald-800 space-y-1.5 list-disc list-inside">
            <li>Fetching data directly from backends, databases, or APIs</li>
            <li>Keeping sensitive credentials, secrets, and API tokens private</li>
            <li>Reducing JavaScript sent to the client browser</li>
            <li>Static layouts, content pages, and initial HTML generation</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💡</span>
            <h3 className="font-bold text-indigo-900">When to use Client Components (&apos;use client&apos;)</h3>
          </div>
          <ul className="text-xs text-indigo-800 space-y-1.5 list-disc list-inside">
            <li>State management with React hooks (<code className="font-mono">useState</code>, <code className="font-mono">useReducer</code>)</li>
            <li>Listening to DOM events (<code className="font-mono">onClick</code>, <code className="font-mono">onChange</code>, <code className="font-mono">onSubmit</code>)</li>
            <li>Browser-only APIs (<code className="font-mono">localStorage</code>, <code className="font-mono">window</code>)</li>
            <li>Navigation hooks (<code className="font-mono">usePathname</code>, <code className="font-mono">useRouter</code>, <code className="font-mono">useSearchParams</code>)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
