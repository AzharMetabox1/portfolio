'use client';

import React, { useState } from 'react';
import PixelCanvasRenderer from '@/components/PixelCanvasRenderer';
import RedactedText from '@/components/RedactedText';
import AsciiScramble from '@/components/AsciiScramble';
import { HERO_BUST_MATRIX, HERO_BUST_PALETTE } from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

interface Scene1HeroProps {
  mode: 'developer' | 'creative';
  setMode: (mode: 'developer' | 'creative') => void;
}

export default function Scene1Hero({ mode, setMode }: Scene1HeroProps) {
  const [speechVisible, setSpeechVisible] = useState(true);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-20 relative">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Large Pixel-Art Bust Portrait with Speech Bubble */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Pixel Speech Bubble */}
          <div
            className={`transition-all duration-300 transform mb-4 ${
              speechVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'
            }`}
          >
            <div className="pixel-speech-bubble font-pixel text-xs text-[#0E0E0E]">
              <span>Hello, world!</span>
            </div>
          </div>

          {/* Hero Developer Bust Canvas */}
          <div
            onMouseEnter={() => {
              setSpeechVisible(true);
              sound.playSpark();
            }}
            className="relative cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <PixelCanvasRenderer
              matrix={HERO_BUST_MATRIX}
              palette={HERO_BUST_PALETTE}
              pixelSize={10}
              glowColor="rgba(184, 255, 1, 0.25)"
              hoverExplode={true}
            />
          </div>

          <div className="mt-2 text-center">
            <span className="font-pixel text-[10px] text-[#71717A] tracking-wider uppercase">
              [ Interactive Avatar: Hover to scatter ]
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Headlines & Interactive Mode Switcher */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Status Chip */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#18181B] border border-[#27272A] text-xs font-pixel text-[#B8FF01]">
            <span className="w-2 h-2 rounded-none bg-[#B8FF01] animate-ping" />
            <span>AVAILABLE FOR WORK 2026</span>
          </div>

          {/* Headline with ASCII/Color-bar reveal */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F0] leading-tight tracking-tight">
            <AsciiScramble
              text="Turning Pixels into Memorable Digital Experiences."
              delay={200}
              triggerKey="hero-headline"
            />
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-[#A1A1AA] font-normal leading-relaxed max-w-xl">
            <RedactedText
              text="Seamless code and thoughtful design, crafting and bringing visions to life since 2018."
              delay={400}
            />
          </p>

          {/* Interactive Mode Switcher with > pixel arrow indicator */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-md">
            <button
              onClick={() => {
                sound.playModeSwitch();
                setMode('developer');
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex-1 flex items-center justify-between px-4 py-3.5 border-2 transition-all font-pixel text-xs ${
                mode === 'developer'
                  ? 'bg-[#B8FF01] text-[#0E0E0E] border-[#FFFFFF] shadow-[4px_4px_0px_#000]'
                  : 'bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:border-[#52525B]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={mode === 'developer' ? 'opacity-100 font-bold' : 'opacity-0'}>
                  &gt;
                </span>
                <span>Developer Mode</span>
              </div>
              <span className="text-[10px] opacity-75">{mode === 'developer' ? 'ACTIVE' : ''}</span>
            </button>

            <button
              onClick={() => {
                sound.playModeSwitch();
                setMode('creative');
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex-1 flex items-center justify-between px-4 py-3.5 border-2 transition-all font-pixel text-xs ${
                mode === 'creative'
                  ? 'bg-[#EC4899] text-[#FFFFFF] border-[#FFFFFF] shadow-[4px_4px_0px_#000]'
                  : 'bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:border-[#52525B]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={mode === 'creative' ? 'opacity-100 font-bold' : 'opacity-0'}>
                  &gt;
                </span>
                <span>Creative Mode</span>
              </div>
              <span className="text-[10px] opacity-75">{mode === 'creative' ? 'ACTIVE' : ''}</span>
            </button>
          </div>

          {/* Scroll Down Hint */}
          <div className="pt-8 flex items-center gap-3 text-xs font-pixel text-[#52525B]">
            <span className="animate-bounce text-[#B8FF01]">↓</span>
            <span>SCROLL TO EXPLORE THE STORY</span>
          </div>
        </div>

      </div>
    </div>
  );
}
