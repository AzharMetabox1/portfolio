'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AsciiScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  triggerKey?: string | number;
  scrambleColor?: string;
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________01010101$%&@~';

export default function AsciiScramble({
  text,
  className = '',
  delay = 0,
  triggerKey,
  scrambleColor = 'text-[#B8FF01]',
}: AsciiScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const frameRef = useRef<number>(0);
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      setIsScrambling(true);
      const length = Math.max(text.length, displayText.length);
      const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];

      for (let i = 0; i < length; i++) {
        const from = displayText[i] || '';
        const to = text[i] || '';
        const start = Math.floor(Math.random() * 15);
        const end = start + Math.floor(Math.random() * 25);
        queue.push({ from, to, start, end });
      }

      queueRef.current = queue;
      frameRef.current = 0;

      const update = () => {
        let output = '';
        let complete = 0;

        for (let i = 0; i < queueRef.current.length; i++) {
          const item = queueRef.current[i];
          const { from, to, start, end } = item;
          let char = item.char;

          if (frameRef.current >= end) {
            complete++;
            output += to;
          } else if (frameRef.current >= start) {
            if (!char || Math.random() < 0.28) {
              char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              item.char = char;
            }
            output += char;
          } else {
            output += from;
          }
        }

        setDisplayText(output);

        if (complete === queueRef.current.length) {
          setIsScrambling(false);
        } else {
          frameRef.current++;
          reqIdRef.current = requestAnimationFrame(update);
        }
      };

      reqIdRef.current = requestAnimationFrame(update);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [text, triggerKey, delay]);

  return (
    <span
      className={`font-mono transition-colors duration-200 ${
        isScrambling ? scrambleColor : ''
      } ${className}`}
    >
      {displayText}
    </span>
  );
}
