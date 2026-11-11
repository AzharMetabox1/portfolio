'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Subtle parallax on the giant wordmark so the rising #141413 section slices cleanly across the letters
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ['0%', '42%']);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-0 bg-[#EFECE6] overflow-hidden z-0"
    >
      {/* Soft radial light-beam gradient in top-left + subtle organic diagonal light sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, #FFFFFF 0%, rgba(239, 236, 230, 0) 60%), linear-gradient(125deg, rgba(255,255,255,0.65) 0%, rgba(239,236,230,0) 42%, rgba(218,213,203,0.35) 48%, rgba(239,236,230,0) 65%)',
        }}
      />

      {/* Upper Right/Center Block (Positioned in the right 50% column, vertically centered) */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-10 flex-1 flex flex-col justify-center py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left 50% Column: Open editorial whitespace matching Davide Carusio layout */}
          <div className="hidden lg:block lg:col-span-6" />

          {/* Right 50% Column: Vertically centered two-paragraph statement */}
          <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-7 max-w-[540px]">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[22px] sm:text-[24px] lg:text-[26px] font-medium leading-[1.18] tracking-[-0.035em] text-[#141413]"
            >
              Software that scales.
              <br />
              For teams and products that don&apos;t want surprises.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="text-[22px] sm:text-[24px] lg:text-[26px] font-medium leading-[1.18] tracking-[-0.035em] text-[#141413]"
            >
              I build fast, refined web apps, mobile systems, and interactive 3D experiences—from
              multi-modal transit engines to full-stack platforms.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Lower Bar: Micro-Label, Full-Width 1px Hairline Divider & Giant Edge-to-Edge Wordmark */}
      <div className="relative z-10 w-full mt-auto">
        <div className="w-full px-5 sm:px-8 lg:px-10 pb-2.5 flex items-center justify-between">
          {/* Lower Left Micro-Label (Just above the giant name) */}
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#141413]">
            SOFTWARE ENGINEER BASED IN MAURITIUS
          </span>
        </div>

        {/* Horizontal Hairline Divider: Full-width 1px line stretching edge-to-edge above the giant name */}
        <div className="w-full h-[1px] bg-[rgba(20,20,19,0.12)]" />

        {/* Giant Edge-to-Edge Wordmark: Spanning 100vw across the bottom of the hero viewport */}
        <motion.div
          style={{ y: wordmarkY }}
          className="w-full overflow-hidden select-none bg-transparent pt-1 sm:pt-2 pb-1"
        >
          <h1
            className="w-full text-center font-bold text-[#141413] whitespace-nowrap block"
            style={{
              fontSize: 'clamp(4.2rem, 14.5vw, 17rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.05em',
            }}
          >
            Azhar Soopun
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
