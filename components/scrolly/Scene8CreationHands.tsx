'use client';

import React, { useState } from 'react';
import PixelCanvasRenderer from '@/components/PixelCanvasRenderer';
import RedactedText from '@/components/RedactedText';
import { HAND_LIME_MATRIX, HAND_CREAM_MATRIX } from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

export default function Scene8CreationHands() {
  const [touchProgress, setTouchProgress] = useState(0.85); // 0 = apart, 1 = touched
  const [isSparking, setIsSparking] = useState(false);

  const handleTouch = () => {
    sound.playSpark();
    setIsSparking(true);
    setTouchProgress(1.05);
    setTimeout(() => {
      setTouchProgress(0.85);
      setIsSparking(false);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-20 relative select-none">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT / CENTER VISUAL: Michelangelo's Creation of Adam in 8-Bit */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] relative">
          
          <div
            onClick={handleTouch}
            className="relative w-full max-w-[500px] h-[280px] bg-[#141414] border-2 border-[#27272A] p-4 flex items-center justify-between shadow-[6px_6px_0px_#000] cursor-pointer"
            title="Click to spark connection"
          >
            {/* Top-Left: Lime Cybernetic Hand reaching right */}
            <div
              className="transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${(touchProgress - 0.5) * 45}px) translateY(-10px)`,
              }}
            >
              <PixelCanvasRenderer
                matrix={HAND_LIME_MATRIX}
                palette={{ '.': 'transparent', L: '#B8FF01' }}
                pixelSize={7}
                hoverExplode={false}
                glowColor="rgba(184, 255, 1, 0.5)"
              />
              <span className="font-pixel text-[8px] text-[#B8FF01] mt-1 block">
                MACHINE / CODE
              </span>
            </div>

            {/* Middle Spark of Creation */}
            <div className="flex flex-col items-center justify-center relative">
              {isSparking && (
                <div className="absolute animate-ping w-8 h-8 bg-[#FFFFFF] shadow-[0_0_20px_#B8FF01] z-30" />
              )}
              <div className="w-3 h-3 bg-[#EAB308] animate-pulse shadow-[0_0_10px_#EAB308]" />
              <span className="font-pixel text-[8px] text-[#EAB308] mt-2">
                SYNTHESIS
              </span>
            </div>

            {/* Bottom-Right: Cream Organic Hand reaching left */}
            <div
              className="transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${(touchProgress - 0.5) * 45}px) translateY(10px)`,
              }}
            >
              <PixelCanvasRenderer
                matrix={HAND_CREAM_MATRIX}
                palette={{ '.': 'transparent', C: '#FEF3C7' }}
                pixelSize={7}
                hoverExplode={false}
                glowColor="rgba(254, 243, 199, 0.4)"
              />
              <span className="font-pixel text-[8px] text-[#FEF3C7] mt-1 block text-right">
                HUMAN / TOUCH
              </span>
            </div>

          </div>

          <div className="mt-4">
            <button
              onClick={handleTouch}
              onMouseEnter={() => sound.playHover()}
              className="pixel-btn-outline px-4 py-2 font-pixel text-[10px] uppercase"
            >
              ⚡ CLICK TO SPARK DIGITAL TOUCH
            </button>
          </div>
        </div>

        {/* RIGHT COPY */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <span className="font-pixel text-[10px] text-[#B8FF01] tracking-widest uppercase">
            // 08_CRAFTSMANSHIP
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F5F5F0] leading-tight">
            Ideas are nothing without hands to build them.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            <p>
              <RedactedText
                text="Every project here is something I've touched and brought to life. Bridging the gap between synthetic engineering precision and genuine human touch."
                delay={200}
                triggerKey="hands-copy"
              />
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3 font-mono text-xs text-[#71717A]">
            <span className="text-[#B8FF01]">★</span>
            <span>Handcrafted interfaces, custom architectures, zero generic shortcuts.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
