'use client';

import React from 'react';
import PixelCanvasRenderer from '@/components/PixelCanvasRenderer';
import RedactedText from '@/components/RedactedText';
import {
  RPG_DEV_MATRIX,
  RPG_DEV_PALETTE,
  RPG_CREATIVE_MATRIX,
  RPG_CREATIVE_PALETTE,
} from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

interface Scene2CharacterSelectProps {
  mode: 'developer' | 'creative';
  setMode: (mode: 'developer' | 'creative') => void;
  onPlayNext: () => void;
}

export default function Scene2CharacterSelect({
  mode,
  setMode,
  onPlayNext,
}: Scene2CharacterSelectProps) {
  const isDev = mode === 'developer';

  const toggleMode = () => {
    sound.playModeSwitch();
    setMode(isDev ? 'creative' : 'developer');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-20 relative select-none">
      <div className="max-w-4xl w-full bg-[#141414] border-4 border-[#27272A] p-6 sm:p-10 shadow-[8px_8px_0px_#000] relative">
        
        {/* TOP STATUS BAR: RPG Stats */}
        <div className="flex items-center justify-between border-b-2 border-[#27272A] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-xs text-[#EAB308]">LVL. 32</span>
            <span className="font-pixel text-[10px] text-[#71717A] hidden sm:inline">
              CLASS: {isDev ? 'ARCHITECT / DEV' : 'VISUAL STORYTELLER'}
            </span>
          </div>

          {/* Three 8-bit Red Pixel Hearts */}
          <div className="flex items-center gap-1.5 text-lg" aria-label="3 HP Hearts">
            <span className="text-[#EF4444] animate-pulse">♥</span>
            <span className="text-[#EF4444] animate-pulse">♥</span>
            <span className="text-[#EF4444] animate-pulse">♥</span>
          </div>
        </div>

        {/* HEADER: Section Title */}
        <div className="text-center mb-8">
          <span className="font-pixel text-[10px] text-[#B8FF01] tracking-widest uppercase">
            // CHARACTER SELECT
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#F5F5F0] mt-2">
            The Creator Behind the Code and Pixels.
          </h2>
        </div>

        {/* CENTER STAGE: Avatar Carousel & Outfit Switch */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 my-6">
          {/* Left Arrow Button */}
          <button
            onClick={toggleMode}
            onMouseEnter={() => sound.playHover()}
            className="w-12 h-12 bg-[#1F1F23] border-2 border-[#3F3F46] hover:border-[#B8FF01] text-[#F5F5F0] font-pixel text-lg flex items-center justify-center shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]"
            title="Previous Costume"
            aria-label="Previous Outfit"
          >
            &lt;
          </button>

          {/* Character Sprite Display */}
          <div className="relative p-6 bg-[#0E0E0E] border-2 border-[#27272A] shadow-inner flex flex-col items-center min-w-[200px]">
            {isDev ? (
              <PixelCanvasRenderer
                key="dev-sprite"
                matrix={RPG_DEV_MATRIX}
                palette={RPG_DEV_PALETTE}
                pixelSize={7}
                hoverExplode={true}
              />
            ) : (
              <PixelCanvasRenderer
                key="creative-sprite"
                matrix={RPG_CREATIVE_MATRIX}
                palette={RPG_CREATIVE_PALETTE}
                pixelSize={7}
                hoverExplode={true}
              />
            )}

            <span className="mt-2 font-pixel text-[10px] text-[#A1A1AA]">
              {isDev ? 'OUTFIT: DARK HOODIE' : 'OUTFIT: CHIC CASUAL'}
            </span>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={toggleMode}
            onMouseEnter={() => sound.playHover()}
            className="w-12 h-12 bg-[#1F1F23] border-2 border-[#3F3F46] hover:border-[#B8FF01] text-[#F5F5F0] font-pixel text-lg flex items-center justify-center shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]"
            title="Next Costume"
            aria-label="Next Outfit"
          >
            &gt;
          </button>
        </div>

        {/* DYNAMIC BIO COPY (Swaps using rainbow block-redaction effect) */}
        <div className="bg-[#18181B] border border-[#27272A] p-5 my-6 text-center min-h-[90px] flex items-center justify-center">
          <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed max-w-2xl">
            {isDev ? (
              <RedactedText
                key="dev-bio"
                triggerKey="dev"
                text="I'm a developer who codes with clarity, builds with purpose, and cares deeply about structure, interaction, and real-world digital performance."
                delay={100}
              />
            ) : (
              <RedactedText
                key="creative-bio"
                triggerKey="creative"
                text="I'm a designer who tells stories through pixels—blending emotion, motion, and aesthetic to craft interfaces that feel alive and human."
                delay={100}
              />
            )}
          </p>
        </div>

        {/* BOTTOM CONTROL BOX: Mode badge + Lime-green "Play" button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-[#27272A]">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-xs text-[#71717A]">CURRENT PROFILE:</span>
            <span
              className={`font-pixel text-xs px-2.5 py-1 ${
                isDev ? 'bg-[#B8FF01] text-[#0E0E0E]' : 'bg-[#EC4899] text-white'
              }`}
            >
              {isDev ? 'DEVELOPER MODE' : 'CREATIVE MODE'}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onPlayNext();
            }}
            onMouseEnter={() => sound.playHover()}
            className="pixel-btn text-xs px-6 py-3 flex items-center gap-2"
          >
            <span>▶ PLAY STORY</span>
          </button>
        </div>

      </div>
    </div>
  );
}
