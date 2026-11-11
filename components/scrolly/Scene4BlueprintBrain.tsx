'use client';

import React, { useState, useEffect } from 'react';
import PixelCanvasRenderer from '@/components/PixelCanvasRenderer';
import RedactedText from '@/components/RedactedText';
import {
  HEAD_AND_BRAIN_MATRIX,
  BRAIN_PALETTE,
  SPLIT_BRAIN_LEFT,
  SPLIT_BRAIN_RIGHT,
} from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

interface Scene4BlueprintBrainProps {
  progress?: number; // Scroll progress
}

export default function Scene4BlueprintBrain({ progress = 0 }: Scene4BlueprintBrainProps) {
  // Transition states:
  // Phase 1 (progress < 0.5): Head silhouette with exposed brain sparking
  // Phase 2 (progress >= 0.5): Head dissolves, pink brain splits into L/R hemispheres with a pixel bridge
  const [isSplit, setIsSplit] = useState(false);

  useEffect(() => {
    if (progress > 0.45 && !isSplit) {
      setIsSplit(true);
      sound.playSpark();
    } else if (progress <= 0.45 && isSplit) {
      setIsSplit(false);
    }
  }, [progress, isSplit]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-20 relative select-none">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COPY */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <span className="font-pixel text-[10px] text-[#38BDF8] tracking-widest uppercase">
            // 04_COGNITIVE_ARCHITECTURE
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F5F5F0] leading-tight">
            This is where ideas take shape.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            <p>
              <RedactedText
                text="Where it begins. The brain sparks the blueprint. Every line of code, every design decision, it all starts here."
                delay={200}
                triggerKey="brain-1"
              />
            </p>
            <p className="text-sm font-mono text-[#71717A]">
              Connecting analytical algorithmic structure with emotional visual storytelling.
            </p>
          </div>

          {/* Interactive Trigger Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playSpark();
                setIsSplit(!isSplit);
              }}
              onMouseEnter={() => sound.playHover()}
              className="pixel-btn-outline px-4 py-2 font-pixel text-[10px] uppercase flex items-center gap-2"
            >
              <span>{isSplit ? '« Reassemble Head' : '⚡ Split Hemispheres'}</span>
            </button>
          </div>
        </div>

        {/* CENTER VISUAL: Head Silhouette & Exposed Brain -> Split Hemispheres */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] relative">
          {!isSplit ? (
            /* Phase 1: Head with pulsing brain sparks */
            <div className="flex flex-col items-center animate-fade-in transition-all duration-300">
              <PixelCanvasRenderer
                key="head-brain"
                matrix={HEAD_AND_BRAIN_MATRIX}
                palette={BRAIN_PALETTE}
                pixelSize={11}
                hoverExplode={true}
                glowColor="rgba(184, 255, 1, 0.4)"
              />
              <span className="mt-4 font-pixel text-[10px] text-[#A1A1AA]">
                [ SPARKING SYNAPSE ENGINE: ACTIVE ]
              </span>
            </div>
          ) : (
            /* Phase 2: Split Hemispheres with Pixel Bridge */
            <div className="flex items-center justify-center gap-6 sm:gap-10 transition-all duration-300 animate-fade-in">
              {/* Left Hemisphere (Logic / Code) */}
              <div className="flex flex-col items-center">
                <PixelCanvasRenderer
                  matrix={SPLIT_BRAIN_LEFT}
                  palette={BRAIN_PALETTE}
                  pixelSize={11}
                  glowColor="rgba(56, 189, 248, 0.5)"
                />
                <span className="mt-2 font-pixel text-[10px] text-[#38BDF8]">
                  LOGIC // CODE
                </span>
              </div>

              {/* Pixel Bridge */}
              <div className="flex flex-col items-center gap-1.5 my-auto">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#B8FF01] animate-ping" />
                  <span className="w-2 h-2 bg-[#EC4899] animate-pulse" />
                  <span className="w-2 h-2 bg-[#38BDF8] animate-bounce" />
                </div>
                <span className="font-pixel text-[9px] text-[#EAB308] tracking-widest uppercase">
                  BRIDGE
                </span>
                <div className="w-16 h-1 bg-gradient-to-r from-[#38BDF8] via-[#B8FF01] to-[#EC4899]" />
              </div>

              {/* Right Hemisphere (Creativity / Art) */}
              <div className="flex flex-col items-center">
                <PixelCanvasRenderer
                  matrix={SPLIT_BRAIN_RIGHT}
                  palette={BRAIN_PALETTE}
                  pixelSize={11}
                  glowColor="rgba(236, 72, 153, 0.5)"
                />
                <span className="mt-2 font-pixel text-[10px] text-[#EC4899]">
                  AESTHETIC // ART
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
