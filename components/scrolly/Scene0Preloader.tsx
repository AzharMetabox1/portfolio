'use client';

import React, { useEffect, useState } from 'react';
import PixelCanvasRenderer from '@/components/PixelCanvasRenderer';
import { HEART_MATRIX, CODE_MATRIX, DINO_MATRIX } from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  // Step sequence:
  // 0: "I" appears
  // 1: [Heart] appears
  // 2: [Code] brackets appear
  // 3: "->" arrow appears
  // 4: [Lime Dino / Monster] appears
  // 5: Wipe transition out
  const [step, setStep] = useState(0);
  const [columnsWiped, setColumnsWiped] = useState(false);

  useEffect(() => {
    sound.playBoot();

    const t1 = setTimeout(() => setStep(1), 400);  // Heart
    const t2 = setTimeout(() => {
      sound.playBlip(523, 0.05);
      setStep(2); // Code
    }, 900);
    const t3 = setTimeout(() => {
      sound.playBlip(659, 0.05);
      setStep(3); // Arrow
    }, 1400);
    const t4 = setTimeout(() => {
      sound.playBlip(880, 0.1);
      setStep(4); // Dino
    }, 1900);
    const t5 = setTimeout(() => {
      sound.playExplode();
      setColumnsWiped(true);
    }, 2800);
    const t6 = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  // 12 vertical pixel columns for the transition wipe
  const columns = Array.from({ length: 12 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0E0E] overflow-hidden select-none">
      {/* Center 8-bit sequence */}
      <div className={`relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 transition-opacity duration-300 ${columnsWiped ? 'opacity-0' : 'opacity-100'}`}>
        {/* "I" */}
        <span className="font-pixel text-2xl sm:text-4xl text-[#F5F5F0]">I</span>

        {/* [Heart] */}
        {step >= 1 && (
          <div className="animate-bounce">
            <PixelCanvasRenderer
              matrix={HEART_MATRIX}
              palette={{ '.': 'transparent', R: '#EF4444' }}
              pixelSize={5}
              hoverExplode={false}
            />
          </div>
        )}

        {/* [Code] */}
        {step >= 2 && (
          <div className="flex items-center">
            <PixelCanvasRenderer
              matrix={CODE_MATRIX}
              palette={{ '.': 'transparent', W: '#38BDF8', G: '#B8FF01' }}
              pixelSize={5}
              hoverExplode={false}
            />
          </div>
        )}

        {/* "->" */}
        {step >= 3 && (
          <span className="font-pixel text-xl sm:text-3xl text-[#EAB308] crt-glow-gold">
            &gt;
          </span>
        )}

        {/* [Lime Dino/Monster] */}
        {step >= 4 && (
          <div className="scale-110">
            <PixelCanvasRenderer
              matrix={DINO_MATRIX}
              palette={{ '.': 'transparent', L: '#B8FF01', E: '#0E0E0E' }}
              pixelSize={5}
              hoverExplode={false}
            />
          </div>
        )}
      </div>

      {/* Boot terminal text at bottom */}
      <div className="absolute bottom-10 font-pixel text-[10px] text-[#52525B] tracking-widest uppercase">
        {step < 4 ? 'SYSTEM_BOOTING...' : 'INITIALIZING PIXEL_MATRIX...'}
      </div>

      {/* Vertical Pixel-Column Wipe Screen Transition */}
      <div className="absolute inset-0 pointer-events-none flex">
        {columns.map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-[#0E0E0E] border-r border-[#1a1a1a] transition-transform duration-500 ease-in-out"
            style={{
              transform: columnsWiped ? 'translateY(-105%)' : 'translateY(0%)',
              transitionDelay: `${i * 45}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
