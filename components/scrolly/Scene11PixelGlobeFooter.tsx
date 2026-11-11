'use client';

import React, { useEffect, useRef } from 'react';
import AsciiScramble from '@/components/AsciiScramble';
import RedactedText from '@/components/RedactedText';
import { GLOBE_MAP_DATA } from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

export default function Scene11PixelGlobeFooter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotAngleRef = useRef(0);

  // Render rotating 3D Pixel Globe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const radius = 120;
    const size = 320;
    canvas.width = size;
    canvas.height = size;
    const centerX = size / 2;
    const centerY = size / 2;

    const latCount = GLOBE_MAP_DATA.length;
    const lonCount = GLOBE_MAP_DATA[0].length;

    const render = () => {
      rotAngleRef.current += 0.015;
      const angle = rotAngleRef.current;

      ctx.clearRect(0, 0, size, size);

      // Collect projected 3D pixel points
      const points: { x: number; y: number; z: number; isLand: boolean; size: number }[] = [];

      for (let latIdx = 0; latIdx < latCount; latIdx++) {
        // Latitude from +PI/2 to -PI/2
        const phi = ((latIdx / (latCount - 1)) - 0.5) * Math.PI;
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        for (let lonIdx = 0; lonIdx < lonCount; lonIdx++) {
          // Longitude from 0 to 2*PI + rotation
          const theta = (lonIdx / lonCount) * Math.PI * 2 + angle;
          const x = radius * cosPhi * Math.cos(theta);
          const y = radius * sinPhi;
          const z = radius * cosPhi * Math.sin(theta);

          // Only keep points facing forward (Z > -10)
          if (z > -20) {
            const isLand = GLOBE_MAP_DATA[latIdx][lonIdx];
            const scale = (z + radius) / (radius * 2);
            points.push({
              x: centerX + x,
              y: centerY + y,
              z,
              isLand,
              size: Math.max(3, Math.round(7 * scale)),
            });
          }
        }
      }

      // Sort by depth Z
      points.sort((a, b) => a.z - b.z);

      // Draw Globe Pixels
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        ctx.fillStyle = p.isLand ? '#B8FF01' : '#0284C7'; // Acid Lime land, Blue ocean
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);

        ctx.strokeStyle = '#0E0E0E';
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <footer className="w-full min-h-screen flex flex-col justify-between px-6 sm:px-12 py-20 relative select-none">
      
      {/* MAIN CONTENT GRID */}
      <div className="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <span className="font-pixel text-[10px] text-[#B8FF01] tracking-widest uppercase">
            // 11_GLOBAL_HORIZON
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5F5F0] leading-tight">
            <AsciiScramble
              text="Let's build your next project, one pixel at a time."
              delay={200}
              triggerKey="footer-head"
            />
          </h2>

          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl">
            <RedactedText
              text="My work connects. Across screens, across cities, across cultures. The pixel may be small, but the world I design with it is infinite."
              delay={350}
              triggerKey="footer-copy"
            />
          </p>

          {/* SOCIAL & CONTACT LINKS with hover > arrow indicator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 font-pixel text-xs text-[#F5F5F0] hover:text-[#B8FF01] transition-colors group p-2 border border-[#27272A] hover:border-[#B8FF01] bg-[#141414]"
            >
              <span className="text-[#B8FF01] group-hover:translate-x-1 transition-transform">&gt;</span>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 font-pixel text-xs text-[#F5F5F0] hover:text-[#EC4899] transition-colors group p-2 border border-[#27272A] hover:border-[#EC4899] bg-[#141414]"
            >
              <span className="text-[#EC4899] group-hover:translate-x-1 transition-transform">&gt;</span>
              <span>Instagram</span>
            </a>

            <a
              href="mailto:contact@example.com"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 font-pixel text-xs text-[#F5F5F0] hover:text-[#EAB308] transition-colors group p-2 border border-[#27272A] hover:border-[#EAB308] bg-[#141414]"
            >
              <span className="text-[#EAB308] group-hover:translate-x-1 transition-transform">&gt;</span>
              <span>Send me an email</span>
            </a>
          </div>
        </div>

        {/* RIGHT VISUAL: Rotating 8-bit Pixel Earth */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="p-4 bg-[#141414] border-2 border-[#27272A] shadow-[8px_8px_0px_#000] relative">
            <canvas
              ref={canvasRef}
              className="pixelated w-[260px] h-[260px] sm:w-[320px] sm:h-[320px]"
            />
            {/* Corner tags */}
            <span className="absolute top-2 left-2 font-pixel text-[8px] text-[#38BDF8]">
              LAT/LON: SYNCHRONIZED
            </span>
            <span className="absolute bottom-2 right-2 font-pixel text-[8px] text-[#B8FF01]">
              PLANET_EARTH.VOX
            </span>
          </div>
        </div>

      </div>

      {/* BOTTOM CENTER COPYRIGHT */}
      <div className="w-full text-center pt-12 border-t border-[#1F1F23]">
        <p className="font-pixel text-[11px] text-[#52525B]">
          © JLD2ND 2026. CRAFTED WITH ZERO EXTERNAL ASSETS. ALL CODE &amp; PIXELS PROCEDURAL.
        </p>
      </div>

    </footer>
  );
}
