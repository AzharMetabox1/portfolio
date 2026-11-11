'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollCharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function ScrollChar({ char, progress, range }: ScrollCharProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity, display: 'inline-block' }}>
      {char}
    </motion.span>
  );
}

interface StatementBlockProps {
  text: string;
  textColorClass: string;
}

function StatementBlock({ text, textColorClass }: StatementBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  // Character scrub progress: strictly as block travels from ["start 75%", "center 45%"]
  const { scrollYProgress: scrubProgress } = useScroll({
    target: blockRef,
    offset: ['start 75%', 'center 45%'],
  });

  // Exit fade progress: as block scrolls upward past center toward top ["center 35%", "end 15%"]
  const { scrollYProgress: exitProgress } = useScroll({
    target: blockRef,
    offset: ['center 35%', 'end 15%'],
  });

  const blockExitOpacity = useTransform(exitProgress, [0, 1], [1, 0]);

  const words = text.split(' ');
  const totalChars = words.reduce((sum, word) => sum + word.length, 0);
  let charCursor = 0;

  return (
    <motion.div
      ref={blockRef}
      style={{ opacity: blockExitOpacity }}
      className="min-h-screen h-[100vh] w-full flex items-center justify-center px-6 sm:px-12 lg:px-20 select-none"
    >
      <h2
        className={`text-center font-semibold tracking-[-0.04em] leading-[1.08] max-w-4xl ${textColorClass}`}
        style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
      >
        {words.map((word, wordIdx) => {
          const chars = word.split('');
          const isLastWord = wordIdx === words.length - 1;
          return (
            <span
              key={`${word}-${wordIdx}`}
              className="inline-block whitespace-nowrap"
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                marginRight: isLastWord ? '0' : '0.28em',
              }}
            >
              {chars.map((char, charIdx) => {
                const index = charCursor++;
                const start = index / totalChars;
                const end = Math.min(1, start + 1 / totalChars);
                return (
                  <ScrollChar
                    key={`${char}-${charIdx}`}
                    char={char}
                    progress={scrubProgress}
                    range={[start, end]}
                  />
                );
              })}
              {!isLastWord && <span className="sr-only">{' '}</span>}
            </span>
          );
        })}
      </h2>
    </motion.div>
  );
}

export default function ScrollNarrative() {
  return (
    <section
      data-dark-section="true"
      data-dark-end-ratio="0.72"
      className="relative z-10 w-full min-h-[350vh] flex flex-col justify-between py-[12vh]"
      style={{
        background:
          'linear-gradient(180deg, #141413 0%, #141413 28%, #1F1E1C 42%, #4A4843 60%, #8C8980 76%, #EFECE6 92%, #EFECE6 100%)',
      }}
    >
      {/* Quote 1: Pure dark charcoal #141413 background with crisp #EFECE6 text */}
      <StatementBlock
        text="Why do you need software that actually performs?"
        textColorClass="text-[#EFECE6]"
      />

      {/* Vertical isolation spacer */}
      <div className="my-[30vh]" style={{ marginTop: '30vh', marginBottom: '30vh' }} aria-hidden="true" />

      {/* Quote 2: Deep warm slate/charcoal transition #1F1E1C -> #4A4843 with #EFECE6 text */}
      <StatementBlock
        text="Architecture is where users feel quality first. No lag, no fragile code."
        textColorClass="text-[#EFECE6]"
      />

      {/* Vertical isolation spacer */}
      <div className="my-[30vh]" style={{ marginTop: '30vh', marginBottom: '30vh' }} aria-hidden="true" />

      {/* Quote 3: Warm stone #8C8980 blending into #EFECE6 alabaster with deep ink #141413 text */}
      <StatementBlock
        text="Your application isn't just a prototype. It works in production, 24/7."
        textColorClass="text-[#141413]"
      />
    </section>
  );
}
