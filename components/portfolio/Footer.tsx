'use client';

import React, { useState } from 'react';
import { RotateCcw, Check } from 'lucide-react';

interface FooterProps {
  onReplayIntro: () => void;
  onOpenContact: () => void;
}

export default function Footer({ onReplayIntro, onOpenContact }: FooterProps) {
  const [emailToast, setEmailToast] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailClick = () => {
    try {
      navigator.clipboard.writeText('azharsoopun.dev@gmail.com');
      setEmailToast(true);
      setTimeout(() => setEmailToast(false), 2600);
    } catch {
      // Fallback
    }
    onOpenContact();
  };

  return (
    <footer className="relative w-full bg-[#EFECE6] text-[#141413] pt-10 pb-0 overflow-hidden">
      {/* Copy Email Toast Notification */}
      {emailToast && (
        <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-2 px-4 py-2.5 bg-[#141413] text-[#EFECE6] text-xs font-mono uppercase tracking-wider shadow-xl rounded-[3px]">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Email copied: azharsoopun.dev@gmail.com</span>
        </div>
      )}

      {/* 3-Column Top Grid with small uppercase monospace headers (NAVIGATION, SOCIAL, CONTACT) */}
      <div className="w-full px-5 sm:px-8 lg:px-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          {/* Column 1: NAVIGATION */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6E6A]">
              NAVIGATION
            </span>
            <div className="flex flex-col items-start gap-1 text-[24px] sm:text-[28px] lg:text-[32px] font-medium tracking-[-0.035em] leading-[1.15]">
              <button
                onClick={() => scrollTo('recent-work')}
                className="hover:opacity-55 transition-opacity cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => scrollTo('capabilities')}
                className="hover:opacity-55 transition-opacity cursor-pointer"
              >
                Capabilities
              </button>
              <button
                onClick={() => scrollTo('experience')}
                className="hover:opacity-55 transition-opacity cursor-pointer"
              >
                Experience
              </button>

              <button
                onClick={scrollToTop}
                className="mt-6 hover:opacity-55 transition-opacity cursor-pointer inline-flex items-center gap-1"
              >
                <span>Back to top ↑</span>
              </button>
            </div>
          </div>

          {/* Column 2: SOCIAL */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6E6A]">
              SOCIAL
            </span>
            <div className="flex flex-col items-start gap-1 text-[24px] sm:text-[28px] lg:text-[32px] font-medium tracking-[-0.035em] leading-[1.15]">
              <a
                href="https://github.com/azharsoopun"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-55 transition-opacity"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/azharsoopun"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-55 transition-opacity"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Column 3: CONTACT */}
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6E6A]">
              CONTACT
            </span>
            <div className="flex flex-col items-start gap-1 text-[24px] sm:text-[28px] lg:text-[32px] font-medium tracking-[-0.035em] leading-[1.15]">
              <button
                onClick={handleEmailClick}
                className="hover:opacity-55 transition-opacity cursor-pointer text-left"
              >
                Email me ↗
              </button>
              <a
                href="/Azhar_Soopun_CV.pdf"
                download="Azhar_Soopun_Software_Engineer_CV.pdf"
                onClick={(e) => {
                  // Also allow opening contact modal if user wants direct contact
                  e.stopPropagation();
                }}
                className="hover:opacity-55 transition-opacity"
              >
                Download CV (PDF) ↗
              </a>

              {/* Subtle Replay Intro trigger so the preloader animation can be tested anytime */}
              <button
                onClick={onReplayIntro}
                className="mt-7 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6E6E6A] hover:text-[#141413] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay Intro</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Micro Metadata Row */}
      <div className="w-full px-5 sm:px-8 lg:px-10 pb-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[#141413]">
        <div>©2026 AZHAR SOOPUN</div>
        <div>BSC APPLIED COMPUTING — UOM</div>
        <div>PORT LOUIS, MAURITIUS</div>
      </div>

      {/* Full-width 1px Hairline Border above giant wordmark */}
      <div className="w-full h-[1px] bg-[rgba(20,20,19,0.12)]" />

      {/* Bottom Giant Edge-to-Edge Wordmark: Full-width 100vw "Azhar Soopun" cut off slightly at the bottom baseline */}
      <div className="w-full overflow-hidden select-none bg-[#EFECE6] pt-1">
        <div
          className="w-full text-center font-bold text-[#141413] whitespace-nowrap block translate-y-[14%]"
          style={{
            fontSize: 'clamp(4.2rem, 14.5vw, 17rem)',
            lineHeight: 0.86,
            letterSpacing: '-0.05em',
          }}
        >
          Azhar Soopun
        </div>
      </div>
    </footer>
  );
}
