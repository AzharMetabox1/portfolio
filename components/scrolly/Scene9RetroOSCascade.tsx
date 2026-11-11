'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/lib/portfolioData';
import { sound } from '@/lib/sound';

interface Scene9RetroOSCascadeProps {
  onOpenProjectsModal?: () => void;
}

interface OSWindowItem {
  id: number;
  title: string;
  body: string;
  x: number;
  y: number;
  highlight?: boolean;
}

const OS_CASCADE_WINDOWS: OSWindowItem[] = [
  { id: 1, title: 'SYSTEM.ALERT', body: 'Initializing system modules...', x: 40, y: 30 },
  { id: 2, title: 'LOADING.EXE', body: 'Optimizing pixel renderer...', x: 90, y: 70 },
  { id: 3, title: 'ASSETS.DLL', body: 'Mounting procedural palettes...', x: 140, y: 110 },
  { id: 4, title: 'WARNING.EXE', body: 'This portfolio may cause sudden inspiration.', x: 190, y: 150, highlight: true },
  { id: 5, title: 'MODULES.SYNC', body: 'Syncing reactive state machines...', x: 240, y: 190 },
  { id: 6, title: 'PIXEL_ENGINE.EXE', body: 'Compiling 8-bit shaders & Web Audio...', x: 290, y: 230 },
  { id: 7, title: 'SYSTEM.SCAN', body: 'Scanning creativity levels... Levels stable.', x: 340, y: 270 },
  { id: 8, title: 'PORTFOLIO_LOADER.SYS', body: 'Prepping client project files...', x: 390, y: 310 },
  { id: 9, title: 'SYSTEM_READY', body: 'All creative components successfully assembled.', x: 440, y: 350, highlight: true },
];

export default function Scene9RetroOSCascade({ onOpenProjectsModal }: Scene9RetroOSCascadeProps) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showProjectDrawer, setShowProjectDrawer] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Sequentially pop up cascade windows
  useEffect(() => {
    let count = 1;
    const interval = setInterval(() => {
      count++;
      if (count <= OS_CASCADE_WINDOWS.length) {
        sound.playWindowPopup();
        setVisibleCount(count);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          sound.playWindowPopup();
          setShowPromptModal(true);
        }, 500);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  const handleOpenDrawer = () => {
    sound.playClick();
    setShowPromptModal(false);
    setShowProjectDrawer(true);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-12 py-20 relative select-none overflow-hidden">
      
      {/* Background Section Title */}
      <div className="absolute top-12 left-8 z-0">
        <span className="font-pixel text-[10px] text-[#A855F7] tracking-widest uppercase">
          // 09_OS_CASCADE
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#3F3F46] mt-1">
          PORTFOLIO.EXE
        </h2>
      </div>

      {/* CASCADE CONTAINER */}
      <div className="relative w-full max-w-5xl h-[520px] mx-auto z-10 hidden sm:block">
        {OS_CASCADE_WINDOWS.slice(0, visibleCount).map((win) => (
          <div
            key={win.id}
            className={`absolute w-72 bg-[#18181B] border-2 shadow-[4px_4px_0px_#000] transition-all duration-200 ${
              win.highlight ? 'border-[#B8FF01]' : 'border-[#3F3F46]'
            }`}
            style={{
              left: `${win.x}px`,
              top: `${win.y}px`,
              zIndex: win.id,
            }}
          >
            {/* Title Bar */}
            <div
              className={`px-2 py-1 flex items-center justify-between text-[10px] font-pixel ${
                win.highlight ? 'bg-[#B8FF01] text-[#0E0E0E]' : 'bg-[#27272A] text-[#F5F5F0]'
              }`}
            >
              <span>{win.title}</span>
              <span className="cursor-pointer">×</span>
            </div>
            {/* Content Body */}
            <div className="p-3 font-mono text-xs text-[#D4D4D8]">
              {win.body}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Stack fallback for small screens */}
      <div className="sm:hidden flex flex-col gap-2 w-full z-10 max-h-[400px] overflow-y-auto">
        {OS_CASCADE_WINDOWS.slice(0, Math.min(4, visibleCount)).map((win) => (
          <div key={win.id} className="bg-[#18181B] border-2 border-[#3F3F46] p-2">
            <span className="font-pixel text-[9px] text-[#B8FF01]">{win.title}</span>
            <p className="font-mono text-xs text-[#D4D4D8] mt-1">{win.body}</p>
          </div>
        ))}
      </div>

      {/* FOREGROUND MODAL: PORTFOLIO.EXE asks to open */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="max-w-md w-full bg-[#18181B] border-4 border-[#B8FF01] p-6 shadow-[8px_8px_0px_#000] relative animate-fade-in">
            {/* Title Bar */}
            <div className="bg-[#B8FF01] text-[#0E0E0E] px-3 py-1 font-pixel text-xs font-bold flex items-center justify-between -mx-6 -mt-6 mb-5">
              <span>PORTFOLIO.EXE</span>
              <button
                onClick={() => setShowPromptModal(false)}
                className="hover:bg-black hover:text-white px-1"
              >
                ×
              </button>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl">💾</span>
              <div>
                <h3 className="font-pixel text-sm text-[#F5F5F0]">
                  The portfolio is ready.
                </h3>
                <p className="font-mono text-xs text-[#A1A1AA] mt-2">
                  Would you like to open the interactive project showcase drawer now?
                </p>
              </div>
            </div>

            {/* Buttons: [No] and lime-green [Yes] */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-[#27272A]">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowPromptModal(false);
                }}
                onMouseEnter={() => sound.playHover()}
                className="pixel-btn-outline px-4 py-2 font-pixel text-[10px]"
              >
                [NO]
              </button>
              <button
                onClick={handleOpenDrawer}
                onMouseEnter={() => sound.playHover()}
                className="pixel-btn px-5 py-2 font-pixel text-[10px]"
              >
                [YES, OPEN]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT SHOWCASE RETRO DRAWER / MODAL */}
      {showProjectDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-8">
          <div className="max-w-4xl w-full h-[85vh] bg-[#141414] border-4 border-[#EAB308] flex flex-col shadow-[12px_12px_0px_#000] relative">
            
            {/* Window Header */}
            <div className="bg-[#EAB308] text-[#0E0E0E] px-4 py-2 font-pixel text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>📁</span>
                <span>C:\PORTFOLIO\FEATURED_PROJECTS.DIR</span>
              </div>
              <button
                onClick={() => setShowProjectDrawer(false)}
                onMouseEnter={() => sound.playHover()}
                className="bg-[#0E0E0E] text-white px-2 py-0.5 hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Content Body Grid */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {PORTFOLIO_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  onMouseEnter={() => sound.playHover()}
                  className="bg-[#18181B] border-2 border-[#27272A] hover:border-[#B8FF01] p-5 cursor-pointer transition-all shadow-[4px_4px_0px_#000] flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-pixel text-[10px] text-[#EAB308]">
                        {proj.pixelBadge}
                      </span>
                      <span className="font-pixel text-[9px] text-[#71717A]">
                        {proj.year}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-[#F5F5F0] group-hover:text-[#B8FF01] transition-colors">
                      {proj.title}
                    </h4>
                    <p className="font-mono text-xs text-[#A1A1AA] mt-2 line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between">
                    <span className="font-pixel text-[9px] text-[#38BDF8]">
                      {proj.metrics}
                    </span>
                    <span className="font-pixel text-[10px] text-[#B8FF01] group-hover:translate-x-1 transition-transform">
                      VIEW &gt;
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Status Bar */}
            <div className="bg-[#18181B] border-t border-[#27272A] px-4 py-2 flex items-center justify-between font-pixel text-[10px] text-[#71717A]">
              <span>{PORTFOLIO_PROJECTS.length} OBJECTS VERIFIED</span>
              <span>PRESS ESC OR [×] TO CLOSE</span>
            </div>

          </div>
        </div>
      )}

      {/* SINGLE PROJECT DETAIL POPUP */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="max-w-lg w-full bg-[#18181B] border-4 border-[#38BDF8] p-6 shadow-[8px_8px_0px_#000]">
            <div className="bg-[#38BDF8] text-[#0E0E0E] px-3 py-1 font-pixel text-xs font-bold flex items-center justify-between -mx-6 -mt-6 mb-4">
              <span>{selectedProject.title}</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="hover:bg-black hover:text-white px-1"
              >
                ×
              </button>
            </div>

            <span className="font-pixel text-[10px] text-[#EAB308]">
              {selectedProject.category} // {selectedProject.year}
            </span>

            <p className="font-mono text-sm text-[#D4D4D8] mt-4 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="my-4 p-3 bg-[#0E0E0E] border border-[#27272A] flex items-center justify-between font-pixel text-xs">
              <span className="text-[#A1A1AA]">PERFORMANCE:</span>
              <span className="text-[#B8FF01]">{selectedProject.metrics}</span>
            </div>

            <div className="flex flex-wrap gap-2 my-4">
              {selectedProject.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 bg-[#27272A] font-pixel text-[9px] text-[#F5F5F0]"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#27272A]">
              <button
                onClick={() => setSelectedProject(null)}
                className="pixel-btn-outline px-4 py-2 font-pixel text-[10px]"
              >
                BACK
              </button>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn px-4 py-2 font-pixel text-[10px] text-black inline-block"
              >
                GITHUB REPO &gt;
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
