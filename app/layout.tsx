import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Azhar Soopun — Software Engineer",
  description:
    "Software Engineer based in Mauritius building high-performance web applications, multi-modal transit systems, interactive 3D experiences, and secure scalable architectures.",
  keywords: [
    "Azhar Soopun",
    "Software Engineer",
    "Mauritius",
    "Full-Stack Developer",
    "Transit Planner",
    "Three.js",
    "Next.js",
    "React",
    "Flutter",
    "Laravel",
  ],
  authors: [{ name: "Azhar Soopun" }],
  openGraph: {
    title: "Azhar Soopun — Software Engineer",
    description:
      "Software that scales. For teams and products that don't want surprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#EFECE6] text-[#141413] antialiased selection:bg-[#141413] selection:text-[#EFECE6] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
