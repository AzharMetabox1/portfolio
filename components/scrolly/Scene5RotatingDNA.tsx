'use client';

import React, { useEffect, useRef, useState } from 'react';
import RedactedText from '@/components/RedactedText';
import { generateDNAFrame } from '@/lib/pixelArt';
import { sound } from '@/lib/sound';

interface Scene5RotatingDNAProps {
  scrollProgress?: number;
}

export default function Scene5RotatingDNA({ scrollProgress = 0 }: Scene5RotatingDNAProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // Continuous gentle rotation plus scroll influence
      angleRef.current += 0.025 * speedMultiplier;
      const currentAngle = angleRef.current + scrollProgress * Math.PI * 2;

      const width = (canvas.width = 360);
      const height = (canvas.height = 480);
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      const { nodes, rungs } = generateDNAFrame(currentAngle, 380, 75, 30);

      // Draw connecting rungs (Cream pixel bridges)
      ctx.lineWidth = 3;
      for (let i = 0; i < rungs.length; i++) {
        const rung = rungs[i];
        ctx.strokeStyle = rung.color;
        ctx.beginPath();
        ctx.moveTo(Math.round(centerX + rung.p1.x), Math.round(centerY + rung.p1.y));
        ctx.lineTo(Math.round(centerX + rung.p2.x), Math.round(centerY + rung.p2.y));
        ctx.stroke();

        // Draw center rung node
        const midX = (rung.p1.x + rung.p2.x) / 2;
        const midY = (rung.p1.y + rung.p2.y) / 2;
        ctx.fillStyle = '#EAB308';
        ctx.fillRect(Math.round(centerX + midX - 2), Math.round(centerY + midY - 2), 5, 5);
      }

      // Draw double-helix pixel nodes sorted by depth Z
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const px = Math.round(centerX + n.x);
        const py = Math.round(centerY + n.y);

        ctx.save();
        ctx.globalAlpha = n.alpha;
        ctx.fillStyle = n.color;

        // Draw 8-bit square node
        ctx.fillRect(px - n.size / 2, py - n.size / 2, n.size, n.size);

        // Pixel border
        ctx.strokeStyle = '#0E0E0E';
        ctx.lineWidth = 1;
        ctx.strokeRect(px - n.size / 2, py - n.size / 2, n.size, n.size);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [scrollProgress, speedMultiplier]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-20 relative select-none">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COPY */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <span className="font-pixel text-[10px] text-[#EC4899] tracking-widest uppercase">
            // 05_GENETIC_ALGORITHM
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F5F5F0] leading-tight">
            From this strand, everything grows...
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            <p>
              <RedactedText
                text="Before the first line of code, there's something deeper. My DNA is a blueprint of creativity, logic, empathy, and vision. It's not just what I do, it's who I am."
                delay={200}
                triggerKey="dna-copy"
              />
            </p>
          </div>

          {/* DNA Telemetry Badge */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-3 py-1.5 bg-[#18181B] border border-[#27272A] font-pixel text-[10px] text-[#EF4444]">
              STRAND_A: 44.2% LOGIC
            </div>
            <div className="px-3 py-1.5 bg-[#18181B] border border-[#27272A] font-pixel text-[10px] text-[#F472B6]">
              STRAND_B: 55.8% EMOTION
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                sound.playSpark();
                setSpeedMultiplier(speedMultiplier === 1 ? 2.5 : 1);
              }}
              onMouseEnter={() => sound.playHover()}
              className="pixel-btn-outline px-4 py-2 font-pixel text-[10px] uppercase mt-2"
            >
              ⚡ {speedMultiplier === 1 ? 'ACCELERATE HELIX' : 'STABILIZE HELIX'}
            </button>
          </div>
        </div>

        {/* CENTER VISUAL: Rotating 8-Bit Double-Helix DNA Strand */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="p-4 bg-[#141414] border-2 border-[#27272A] shadow-[6px_6px_0px_#000] relative">
            <canvas
              ref={canvasRef}
              className="pixelated w-[300px] h-[400px] sm:w-[360px] sm:h-[480px]"
            />
            {/* Corner retro indicators */}
            <span className="absolute top-2 left-2 font-pixel text-[8px] text-[#52525B]">
              3D_VOXEL_HELIX
            </span>
            <span className="absolute bottom-2 right-2 font-pixel text-[8px] text-[#B8FF01]">
              ROTATING_60FPS
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
