'use client';

import React from 'react';
import { sound } from '@/lib/sound';

interface HUDProps {
  currentScene: number;
  totalScenes?: number;
  isMuted: boolean;
  onToggleMute: () => void;
  crtActive: boolean;
  onToggleCrt: () => void;
  onOpenArcade: () => void;
  onOpenProjects: () => void;
  onScrollToScene: (index: number) => void;
  scrollDirection?: 'up' | 'down';
}

export default function HUD({
  currentScene,
  totalScenes = 12, // Scene 0 to 11
  isMuted,
  onToggleMute,
  crtActive,
  onToggleCrt,
  onOpenArcade,
  onOpenProjects,
  onScrollToScene,
  scrollDirection = 'down',
}: HUDProps) {
  // 9 navigation indicator dots (representing core story chapters 1 to 9 or 0-11 mapped)
  const navDots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <>
      {/* 1. TOP CENTER LOGO: JLD'2ND in Acid Lime Green with subtle CRT glow */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => onScrollToScene(1)}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0E0E0E]/90 border-2 border-[#27272A] hover:border-[#B8FF01] transition-all group"
            title="Return to Hero"
          >
            <span className="w-2.5 h-2.5 bg-[#B8FF01] inline-block animate-pulse" />
            <span className="font-pixel text-xs text-[#B8FF01] crt-glow-lime tracking-wider group-hover:text-white transition-colors">
              JLD&apos;2ND
            </span>
          </button>
        </div>

        {/* Top-Right Active Scene Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1 bg-[#141414]/90 border border-[#27272A] text-[10px] font-pixel text-[#EAB308]">
          <span className="text-[#A1A1AA]">ACT:</span>
          <span className="text-[#B8FF01]">#{String(currentScene).padStart(2, '0')}</span>
        </div>
      </header>

      {/* 2. BOTTOM-LEFT UTILITY DOCK: 4 crisp pixel-art icons in warm gold */}
      <aside className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5 select-none">
        {/* Sound/Mute Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleMute();
          }}
          onMouseEnter={() => sound.playHover()}
          className="w-11 h-11 bg-[#141414] border-2 border-[#3F3F46] hover:border-[#EAB308] hover:bg-[#1E1E1E] flex items-center justify-center text-[#EAB308] transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
          title={isMuted ? 'Unmute Audio (Web Audio Synth)' : 'Mute Audio'}
          aria-label="Sound Toggle"
        >
          {isMuted ? (
            /* Muted Speaker Pixel Icon */
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 5h3l4-4v14l-4-4H2V5zM14 5l-4 4m0-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          ) : (
            /* Sound Waves Pixel Icon */
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 5h3l4-4v14l-4-4H2V5zM11 6c.7.7 1 1.7 1 2.5s-.3 1.8-1 2.5m2-7c1.3 1.3 2 3 2 4.5s-.7 3.2-2 4.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          )}
        </button>

        {/* CRT Scanline / Contrast Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleCrt();
          }}
          onMouseEnter={() => sound.playHover()}
          className={`w-11 h-11 bg-[#141414] border-2 transition-all shadow-[2px_2px_0px_#000] flex items-center justify-center ${
            crtActive ? 'border-[#B8FF01] text-[#B8FF01]' : 'border-[#3F3F46] hover:border-[#EAB308] text-[#EAB308]'
          }`}
          title="CRT Scanline & Phosphor Filter Toggle"
          aria-label="CRT Filter Toggle"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="12" height="10" rx="1" />
            <line x1="2" y1="5" x2="14" y2="5" />
            <line x1="2" y1="8" x2="14" y2="8" />
            <line x1="6" y1="14" x2="10" y2="14" />
            <line x1="8" y1="12" x2="8" y2="14" />
          </svg>
        </button>

        {/* Mini-game / Arcade Shortcut */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenArcade();
          }}
          onMouseEnter={() => sound.playHover()}
          className="w-11 h-11 bg-[#141414] border-2 border-[#3F3F46] hover:border-[#EAB308] hover:bg-[#1E1E1E] flex items-center justify-center text-[#EAB308] transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
          title="Arcade / Mini-Game Mode (Scene 10)"
          aria-label="Arcade Mode Shortcut"
        >
          {/* Gamepad Pixel Icon */}
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 4h10a2 2 0 012 2v4a2 2 0 01-2 2h-1l-2-2H6L4 12H3a2 2 0 01-2-2V6a2 2 0 012-2z" fill="#222" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 6v4M3 8h4M11 7h.01M13 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>

        {/* Portfolio Projects Folder Drawer Trigger */}
        <button
          onClick={() => {
            sound.playWindowPopup();
            onOpenProjects();
          }}
          onMouseEnter={() => sound.playHover()}
          className="w-11 h-11 bg-[#141414] border-2 border-[#3F3F46] hover:border-[#EAB308] hover:bg-[#1E1E1E] flex items-center justify-center text-[#EAB308] transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
          title="PORTFOLIO.EXE Project Drawer"
          aria-label="Open Projects Drawer"
        >
          {/* Retro Floppy Disk / Folder Icon */}
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h8l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="5" y="2" width="6" height="4" fill="currentColor" opacity="0.4" />
            <rect x="4" y="9" width="8" height="4" fill="currentColor" opacity="0.6" />
          </svg>
        </button>
      </aside>

      {/* 3. RIGHT-SIDE SCROLL PROGRESS INDICATOR: Gold dots + Rocket Badge */}
      <nav
        aria-label="Scene progress"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none"
      >
        {navDots.map((dotIdx) => {
          const isActive = currentScene === dotIdx;

          return (
            <div key={dotIdx} className="relative flex items-center justify-center">
              {isActive ? (
                /* Active Section Dot expands into larger circular badge containing pixel rocket/chevron */
                <button
                  onClick={() => onScrollToScene(dotIdx)}
                  className="w-8 h-8 rounded-full bg-[#141414] border-2 border-[#EAB308] shadow-[0_0_10px_rgba(234,179,8,0.5)] flex items-center justify-center transition-all duration-300"
                  title={`Scene ${dotIdx}`}
                >
                  <span
                    className={`inline-block font-pixel text-xs text-[#EAB308] transition-transform duration-300 ${
                      scrollDirection === 'up' ? '-rotate-90' : 'rotate-90'
                    }`}
                  >
                    🚀
                  </span>
                </button>
              ) : (
                /* Inactive Dot */
                <button
                  onClick={() => {
                    sound.playClick();
                    onScrollToScene(dotIdx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="group p-1 flex items-center justify-center"
                  title={`Go to Scene ${dotIdx}`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3F3F46] group-hover:bg-[#EAB308] transition-colors" />
                </button>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
