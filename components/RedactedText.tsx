'use client';

import React, { useEffect, useState, useRef } from 'react';

interface RedactedTextProps {
  text: string;
  className?: string;
  delay?: number;
  triggerKey?: string | number;
  colorSet?: string[];
  pixelSize?: number;
}

const DEFAULT_BLOCK_COLORS = [
  '#38BDF8', // Cyan
  '#EC4899', // Magenta
  '#F97316', // Orange
  '#EAB308', // Yellow/Gold
  '#A855F7', // Purple
  '#B8FF01', // Acid Lime
];

export default function RedactedText({
  text,
  className = '',
  delay = 0,
  triggerKey,
  colorSet = DEFAULT_BLOCK_COLORS,
}: RedactedTextProps) {
  // Reveal stage: 'redacted' -> 'revealing' -> 'settled'
  const [phase, setPhase] = useState<'redacted' | 'revealing' | 'settled'>('redacted');
  const [scrambleText, setScrambleText] = useState(text);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    setPhase('redacted');
    let isCancelled = false;

    const startTimer = setTimeout(() => {
      if (isCancelled) return;
      setPhase('revealing');

      // Intermediate scramble during color wipe
      const chars = '█▓▒░#$*@&%01';
      let frame = 0;
      const totalFrames = 8;

      const scrambleInterval = setInterval(() => {
        if (isCancelled) return;
        frame++;
        if (frame >= totalFrames) {
          clearInterval(scrambleInterval);
          setScrambleText(text);
          setPhase('settled');
        } else {
          setScrambleText(
            text
              .split('')
              .map((char) => {
                if (char === ' ' || char === '\n') return char;
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('')
          );
        }
      }, 45);

      return () => clearInterval(scrambleInterval);
    }, delay);

    return () => {
      isCancelled = true;
      clearTimeout(startTimer);
    };
  }, [text, triggerKey, delay]);

  // Break text into words/chunks so multi-colored blocks tile across nicely
  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Underlying rendered text */}
      <span
        className={`transition-opacity duration-150 ${
          phase === 'settled' ? 'opacity-100' : phase === 'revealing' ? 'opacity-80' : 'opacity-0'
        }`}
      >
        {phase === 'settled' ? text : scrambleText}
      </span>

      {/* Redaction pixel blocks overlay */}
      {phase !== 'settled' && (
        <span
          className="absolute inset-0 flex flex-wrap gap-1 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          {words.map((word, wIdx) => {
            const blockColor = colorSet[(wIdx + (triggerKey ? String(triggerKey).length : 0)) % colorSet.length];
            return (
              <span
                key={wIdx}
                className="relative inline-block h-full transition-transform duration-300 ease-out"
                style={{
                  minWidth: `${Math.max(16, word.length * 10)}px`,
                  backgroundColor: blockColor,
                  transform: phase === 'revealing' ? 'scaleX(0)' : 'scaleX(1)',
                  transformOrigin: 'right center',
                  transitionDelay: `${wIdx * 35}ms`,
                  boxShadow: '1px 1px 0px rgba(0,0,0,0.8)',
                  height: '1.2em',
                }}
              >
                {/* 8-bit block pixel pattern */}
                <span className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:4px_4px]" />
              </span>
            );
          })}
        </span>
      )}
    </span>
  );
}
