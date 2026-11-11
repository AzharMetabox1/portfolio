'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
  triggerReplay?: number;
}

const STATUS_MESSAGES = [
  'INITIALIZING SPATIAL GRAPH ENGINE...',
  'COMPILING SHADERS & ROUTING GRAPHS...',
  'THE BEST CODE IS PRODUCTION CODE',
];

export default function Preloader({ onComplete, triggerReplay = 0 }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setProgress(0);
    setStatusIndex(0);

    const startTime = Date.now();
    const duration = 1800; // 1.8s smooth left-to-right fill

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(currentProgress);

      if (currentProgress < 35) {
        setStatusIndex(0);
      } else if (currentProgress < 72) {
        setStatusIndex(1);
      } else {
        setStatusIndex(2);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 250);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [triggerReplay, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#141413] text-[#EFECE6] px-6 py-7 select-none"
        >
          {/* Top spacer to keep center element perfectly centered */}
          <div className="w-full h-4" />

          {/* Center Element: "Azhar Soopun" in 32px tight sans-serif font, dim grey #3A3A38 to crisp #EFECE6 */}
          <div className="relative my-auto flex flex-col items-center">
            <div className="relative text-[32px] font-bold tracking-[-0.04em] leading-none select-none">
              {/* Background dim grey text */}
              <span className="text-[#3A3A38]">Azhar Soopun</span>

              {/* Foreground crisp white text masked by left-to-right width progress */}
              <div
                className="absolute inset-0 overflow-hidden text-[#EFECE6] whitespace-nowrap pointer-events-none"
                style={{ width: `${progress}%` }}
              >
                <span>Azhar Soopun</span>
              </div>
            </div>
          </div>

          {/* Bottom Micro-Text status */}
          <div className="w-full max-w-xl flex flex-col items-center pb-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={statusIndex}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.16 }}
                className="text-[10px] font-mono tracking-[0.08em] text-[#EFECE6]/80 uppercase text-center h-4"
              >
                {STATUS_MESSAGES[statusIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thin 2px white progress bar expanding across the very bottom edge of the viewport */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#222220]">
            <div
              className="h-full bg-[#EFECE6] transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
