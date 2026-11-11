'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PixelMatrix, matrixToPixelList } from '@/lib/pixelArt';

interface PixelCanvasRendererProps {
  matrix: PixelMatrix;
  palette: Record<string, string>;
  pixelSize?: number;
  progress?: number; // 0 = dispersed/chaos, 1 = assembled
  hoverExplode?: boolean;
  glowColor?: string;
  className?: string;
  onPixelClick?: () => void;
}

interface ScatterPixel {
  targetX: number;
  targetY: number;
  scatterX: number;
  scatterY: number;
  color: string;
  delay: number;
  size: number;
}

export default function PixelCanvasRenderer({
  matrix,
  palette,
  pixelSize = 8,
  progress = 1,
  hoverExplode = true,
  glowColor,
  className = '',
  onPixelClick,
}: PixelCanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  const cols = matrix[0]?.length || 0;
  const rows = matrix.length;
  const width = cols * pixelSize;
  const height = rows * pixelSize;

  // Generate deterministic scattered positions for each pixel
  const pixelsRef = useRef<ScatterPixel[]>([]);

  useEffect(() => {
    const rawList = matrixToPixelList(matrix, palette, pixelSize);
    pixelsRef.current = rawList.map((p, idx) => {
      // Deterministic pseudo-random scatter vector
      const angle = (idx * 137.5 * Math.PI) / 180;
      const dist = 60 + ((idx * 37) % 180);
      return {
        targetX: p.origX || p.x,
        targetY: p.origY || p.y,
        scatterX: (p.origX || p.x) + Math.cos(angle) * dist,
        scatterY: (p.origY || p.y) + Math.sin(angle) * dist,
        color: p.color,
        delay: ((idx * 17) % 100) / 100, // Staggered assembly
        size: pixelSize,
      };
    });
  }, [matrix, palette, pixelSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Easing helper
    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

    // Padding around canvas for scattering expansion
    const padding = 50;
    canvas.width = width + padding * 2;
    canvas.height = height + padding * 2;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mouse = mousePosRef.current;

    for (let i = 0; i < pixelsRef.current.length; i++) {
      const p = pixelsRef.current[i];

      // Interpolate based on progress & delay
      const effectiveProgress = Math.min(
        1,
        Math.max(0, (progress - p.delay * 0.3) / 0.7)
      );
      const eased = easeOutCubic(effectiveProgress);

      let currentX = padding + p.scatterX + (p.targetX - p.scatterX) * eased;
      let currentY = padding + p.scatterY + (p.targetY - p.scatterY) * eased;

      // Mouse repulsion if hovered
      if (isHovered && mouse && hoverExplode) {
        const dx = currentX - mouse.x;
        const dy = currentY - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 45 && d > 0) {
          const force = (45 - d) / 45;
          currentX += (dx / d) * force * 15;
          currentY += (dy / d) * force * 15;
        }
      }

      ctx.fillStyle = p.color;
      if (glowColor && p.color !== '#0E0E0E') {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 4;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fillRect(Math.round(currentX), Math.round(currentY), p.size, p.size);

      // Subtle pixel border
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(Math.round(currentX), Math.round(currentY), p.size, p.size);
    }
  }, [progress, isHovered, width, height, pixelSize, glowColor, hoverExplode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mousePosRef.current = null;
      }}
      onMouseMove={handleMouseMove}
      onClick={onPixelClick}
      className={`pixelated transition-transform duration-150 ${className}`}
      style={{
        width: `${width + 100}px`,
        height: `${height + 100}px`,
        cursor: onPixelClick ? 'pointer' : 'default',
      }}
    />
  );
}
