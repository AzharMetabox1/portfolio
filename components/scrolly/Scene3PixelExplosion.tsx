'use client';

import React, { useEffect, useRef, useState } from 'react';
import AsciiScramble from '@/components/AsciiScramble';
import { sound } from '@/lib/sound';

interface Scene3PixelExplosionProps {
  progress?: number; // 0 to 1 scroll scrub progress
}

interface Shard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  distance: number;
  angle: number;
}

const SHARD_COLORS = [
  '#B8FF01', // Lime
  '#38BDF8', // Cyan
  '#EC4899', // Magenta
  '#F97316', // Orange
  '#EAB308', // Gold
  '#A855F7', // Purple
  '#EF4444', // Red
  '#FFFFFF', // Off white
];

export default function Scene3PixelExplosion({ progress = 0 }: Scene3PixelExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shardsRef = useRef<Shard[]>([]);
  const [exploded, setExploded] = useState(false);

  // Initialize radial shards
  useEffect(() => {
    const shardCount = 350;
    const list: Shard[] = [];

    for (let i = 0; i < shardCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      list.push({
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: SHARD_COLORS[Math.floor(Math.random() * SHARD_COLORS.length)],
        size: Math.random() > 0.6 ? 8 : 6,
        distance: 20 + Math.random() * 650,
        angle,
      });
    }

    shardsRef.current = list;
  }, []);

  // Scrub animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Dynamic explosion scrub: either from scroll progress or hover trigger
    const expansionFactor = exploded ? 1 : Math.max(0.02, Math.min(1, progress * 1.5));

    // Center seed pixel when unexploded
    if (expansionFactor < 0.1) {
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#B8FF01';
      ctx.shadowBlur = 10;
      ctx.fillRect(centerX - 6, centerY - 6, 12, 12);
      ctx.shadowBlur = 0;
    }

    // Radial exploding pixel blocks
    for (let i = 0; i < shardsRef.current.length; i++) {
      const s = shardsRef.current[i];
      const currentDist = s.distance * expansionFactor;
      const px = centerX + Math.cos(s.angle) * currentDist;
      const py = centerY + Math.sin(s.angle) * currentDist;

      // Draw pixel square
      ctx.fillStyle = s.color;
      ctx.fillRect(Math.round(px), Math.round(py), s.size, s.size);

      // Dark border
      ctx.strokeStyle = '#0E0E0E';
      ctx.lineWidth = 1;
      ctx.strokeRect(Math.round(px), Math.round(py), s.size, s.size);
    }
  }, [progress, exploded]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between px-6 py-24 relative select-none overflow-hidden">
      
      {/* Center Background Canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full pixelated pointer-events-auto cursor-pointer"
          onClick={() => {
            sound.playExplode();
            setExploded(!exploded);
          }}
          title="Click to detonate explosion"
        />
      </div>

      {/* Center Text */}
      <div className="relative z-10 text-center max-w-3xl my-auto pointer-events-none">
        <h2 className="font-display font-extrabold text-3xl sm:text-6xl text-[#F5F5F0] tracking-tight leading-tight crt-glow-lime">
          <AsciiScramble
            text="It all starts with the pixels."
            delay={100}
            triggerKey="scene3"
          />
        </h2>
        <div className="mt-4">
          <span className="font-pixel text-[11px] text-[#B8FF01] uppercase tracking-wider bg-[#0E0E0E]/80 px-4 py-1.5 border border-[#27272A] inline-block">
            [ Click anywhere to trigger big bang ]
          </span>
        </div>
      </div>

      {/* Bottom Caption */}
      <div className="relative z-10 text-center max-w-xl pb-6 pointer-events-none">
        <p className="font-mono text-sm sm:text-base text-[#A1A1AA] bg-[#0E0E0E]/90 px-4 py-2 border border-[#27272A] inline-block">
          &quot;Each one placed with purpose. I build pixel-perfect stories on the web.&quot;
        </p>
      </div>

    </div>
  );
}
