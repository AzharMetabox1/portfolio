'use client';

import React, { useState } from 'react';
import PixelCanvasRenderer from '@/components/PixelCanvasRenderer';
import RedactedText from '@/components/RedactedText';
import AsciiScramble from '@/components/AsciiScramble';
import { ACE_CARD_MATRIX, CARD_PALETTE } from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

interface Scene6PlayingCardsProps {
  scrollProgress?: number;
}

export default function Scene6PlayingCards({ scrollProgress = 0 }: Scene6PlayingCardsProps) {
  // State: 'stacked' | 'fanned' | 'dealt'
  const [cardState, setCardState] = useState<'fanned' | 'stacked' | 'dealt'>('fanned');

  const handleDeal = () => {
    sound.playClick();
    if (cardState === 'fanned') setCardState('stacked');
    else if (cardState === 'stacked') setCardState('dealt');
    else setCardState('fanned');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-20 relative select-none">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* CENTER/LEFT VISUAL: Three Oversized Pixel-Art Ace of Hearts Cards */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[460px] relative">
          
          <div
            onClick={handleDeal}
            className="relative w-[340px] h-[440px] cursor-pointer flex items-center justify-center"
            title="Click to deal cards"
          >
            {/* Card 1 (Bottom layer) */}
            <div
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform:
                  cardState === 'fanned'
                    ? 'rotate(-16deg) translate(-55px, 15px)'
                    : cardState === 'stacked'
                    ? 'rotate(-2deg) translate(-4px, 4px)'
                    : 'rotate(-45deg) translate(-280px, 300px) scale(0.6)',
                opacity: cardState === 'dealt' ? 0.3 : 1,
                zIndex: 10,
              }}
            >
              <PixelCanvasRenderer
                matrix={ACE_CARD_MATRIX}
                palette={CARD_PALETTE}
                pixelSize={5.5}
                hoverExplode={false}
              />
            </div>

            {/* Card 2 (Middle layer) */}
            <div
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform:
                  cardState === 'fanned'
                    ? 'rotate(0deg) translate(0px, 0px)'
                    : cardState === 'stacked'
                    ? 'rotate(0deg) translate(0px, 0px)'
                    : 'rotate(-20deg) translate(-140px, 200px) scale(0.8)',
                opacity: cardState === 'dealt' ? 0.6 : 1,
                zIndex: 20,
              }}
            >
              <PixelCanvasRenderer
                matrix={ACE_CARD_MATRIX}
                palette={CARD_PALETTE}
                pixelSize={5.5}
                hoverExplode={false}
              />
            </div>

            {/* Card 3 (Top layer) */}
            <div
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform:
                  cardState === 'fanned'
                    ? 'rotate(16deg) translate(55px, 15px)'
                    : cardState === 'stacked'
                    ? 'rotate(3deg) translate(4px, -4px)'
                    : 'rotate(5deg) translate(0px, 80px) scale(1)',
                zIndex: 30,
              }}
            >
              <PixelCanvasRenderer
                matrix={ACE_CARD_MATRIX}
                palette={CARD_PALETTE}
                pixelSize={5.5}
                hoverExplode={false}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleDeal}
              onMouseEnter={() => sound.playHover()}
              className="pixel-btn-outline px-3 py-1.5 font-pixel text-[10px]"
            >
              ♠ STATE: {cardState.toUpperCase()} [CLICK TO CYCLE]
            </button>
          </div>
        </div>

        {/* RIGHT HEADLINE & BOTTOM-LEFT COPY */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <span className="font-pixel text-[10px] text-[#EF4444] tracking-widest uppercase">
            // 06_CARD_SHUFFLE
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F5F5F0] leading-tight">
            <AsciiScramble
              text="More than just function."
              delay={150}
              triggerKey="cards-head"
            />
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            <p>
              <RedactedText
                text="Design evokes emotion. I bring your vision to life with purpose and care, creating websites that truly connect."
                delay={300}
                triggerKey="cards-copy"
              />
            </p>
          </div>

          {/* Suit Badges */}
          <div className="flex items-center gap-3 pt-4">
            <span className="px-2.5 py-1 bg-[#18181B] border border-[#EF4444] font-pixel text-xs text-[#EF4444]">
              ♥ EMOTION
            </span>
            <span className="px-2.5 py-1 bg-[#18181B] border border-[#27272A] font-pixel text-xs text-[#F5F5F0]">
              ♦ PRECISION
            </span>
            <span className="px-2.5 py-1 bg-[#18181B] border border-[#27272A] font-pixel text-xs text-[#B8FF01]">
              ♣ STRATEGY
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
