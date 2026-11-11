'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  birth: number;
  lifespan: number;
}

const TRAIL_COLORS = [
  '#B8FF01', // Acid lime
  '#38BDF8', // Cyan
  '#EC4899', // Magenta
  '#F97316', // Orange
  '#EAB308', // Gold
  '#A855F7', // Purple
  '#FFFFFF', // White
];

export default function MousePixelTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let lastX = -100;
    let lastY = -100;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const dist = Math.hypot(dx, dy);

      // Only spawn if mouse moved sufficiently
      if (dist > 8) {
        lastX = currentX;
        lastY = currentY;

        // Spawn 1 to 2 pixel squares
        const count = 1 + (dist > 25 ? 1 : 0);
        for (let i = 0; i < count; i++) {
          const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
          particles.push({
            x: Math.floor((currentX + (Math.random() * 8 - 4)) / 6) * 6, // Snapped to 6px grid for 8-bit aesthetic
            y: Math.floor((currentY + (Math.random() * 8 - 4)) / 6) * 6,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5, // slight upward float
            size: 12, // 12px x 12px exact specification
            color,
            birth: performance.now(),
            lifespan: 600, // 600ms lifespan
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Filter active particles
      particles = particles.filter((p) => now - p.birth < p.lifespan);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const age = now - p.birth;
        const progress = age / p.lifespan; // 0 to 1
        const alpha = Math.max(0, 1 - progress);

        p.x += p.vx;
        p.y += p.vy;

        // Snap to pixel grid
        const drawX = Math.round(p.x);
        const drawY = Math.round(p.y);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(drawX, drawY, p.size, p.size);

        // Dark retro pixel border
        ctx.strokeStyle = '#0E0E0E';
        ctx.lineWidth = 1;
        ctx.strokeRect(drawX, drawY, p.size, p.size);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 pixelated"
      aria-hidden="true"
    />
  );
}
