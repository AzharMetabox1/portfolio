'use client';

import React, { useState } from 'react';
import PixelCanvasRenderer from '@/components/PixelCanvasRenderer';
import AsciiScramble from '@/components/AsciiScramble';
import { GLASSES_MATRIX, GLASSES_PALETTE } from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

export default function Scene7PixelGlasses() {
  const [reflectionOffset, setReflectionOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setReflectionOffset({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full min-h-screen flex flex-col items-center justify-between px-6 sm:px-12 py-20 relative select-none"
    >
      {/* TOP CENTER HEADLINE */}
      <div className="text-center max-w-3xl pt-8 z-10">
        <span className="font-pixel text-[10px] text-[#EAB308] tracking-widest uppercase">
          // 07_OPTICAL_PRECISION
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F0] mt-3 tracking-tight">
          <AsciiScramble
            text="Form follows function, but beauty leads."
            delay={200}
            triggerKey="glasses"
          />
        </h2>
      </div>

      {/* CENTER VISUAL: Giant Cream-Colored 8-bit Eyeglasses Frame */}
      <div className="my-auto relative flex flex-col items-center justify-center">
        <div
          onMouseEnter={() => sound.playSpark()}
          className="relative transition-transform duration-200 hover:scale-105 p-6"
        >
          {/* Glasses Frame Canvas */}
          <PixelCanvasRenderer
            matrix={GLASSES_MATRIX}
            palette={GLASSES_PALETTE}
            pixelSize={9}
            hoverExplode={true}
            glowColor="rgba(254, 243, 199, 0.4)"
          />

          {/* Interactive Mouse Glimmer Overlay in Lenses */}
          <div
            className="absolute pointer-events-none transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${reflectionOffset.x}px, ${reflectionOffset.y}px)`,
              top: '42%',
              left: '26%',
            }}
          >
            <div className="w-3 h-3 bg-[#B8FF01] shadow-[0_0_8px_#B8FF01] animate-pulse" />
          </div>
          <div
            className="absolute pointer-events-none transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${reflectionOffset.x}px, ${reflectionOffset.y}px)`,
              top: '42%',
              right: '26%',
            }}
          >
            <div className="w-3 h-3 bg-[#B8FF01] shadow-[0_0_8px_#B8FF01] animate-pulse" />
          </div>
        </div>

        <span className="font-pixel text-[10px] text-[#71717A] tracking-wider uppercase mt-2">
          [ Move cursor over lenses to steer focal glint ]
        </span>
      </div>

      {/* BOTTOM CAPTION */}
      <div className="text-center max-w-xl pb-8 z-10">
        <p className="font-mono text-sm sm:text-base text-[#D4D4D8] bg-[#141414] px-5 py-2.5 border-2 border-[#27272A] shadow-[4px_4px_0px_#000]">
          &quot;My eye discerns, guides, and finds harmony in pixels.&quot;
        </p>
      </div>
    </div>
  );
}
