'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import RedactedText from '@/components/RedactedText';
import AsciiScramble from '@/components/AsciiScramble';
import { sound } from '@/lib/sound';

const COLS = 10;
const ROWS = 16;
const BLOCK_SIZE = 20;

// Tetromino shapes & colors
const TETROMINOES = [
  { shape: [[1, 1, 1, 1]], color: '#38BDF8' }, // I (Cyan)
  { shape: [[1, 1], [1, 1]], color: '#EAB308' }, // O (Gold)
  { shape: [[0, 1, 0], [1, 1, 1]], color: '#A855F7' }, // T (Purple)
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#B8FF01' }, // S (Lime)
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#EF4444' }, // Z (Red)
  { shape: [[1, 0, 0], [1, 1, 1]], color: '#3B82F6' }, // J (Blue)
  { shape: [[0, 0, 1], [1, 1, 1]], color: '#F97316' }, // L (Orange)
];

export default function Scene10TetrisContact() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nextCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Tetris game state
  const [board, setBoard] = useState<(string | null)[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState({
    shape: TETROMINOES[0].shape,
    color: TETROMINOES[0].color,
    x: 3,
    y: 0,
  });
  const [nextPieceIndex, setNextPieceIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [perfectFit, setPerfectFit] = useState(false);
  const [isSelfPlaying, setIsSelfPlaying] = useState(true);

  // Spawn new piece
  const spawnPiece = useCallback((boardState: (string | null)[][]) => {
    const p = TETROMINOES[nextPieceIndex];
    const nextIdx = Math.floor(Math.random() * TETROMINOES.length);
    setNextPieceIndex(nextIdx);

    const newX = Math.floor((COLS - p.shape[0].length) / 2);
    setCurrentPiece({
      shape: p.shape,
      color: p.color,
      x: newX,
      y: 0,
    });
  }, [nextPieceIndex]);

  // Collision detection
  const checkCollision = (
    shape: number[][],
    posX: number,
    posY: number,
    grid: (string | null)[][]
  ): boolean => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newY = posY + r;
          const newX = posX + c;
          if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
          if (newY >= 0 && grid[newY][newX]) return true;
        }
      }
    }
    return false;
  };

  // Rotate matrix helper
  const rotateMatrix = (mat: number[][]): number[][] => {
    return mat[0].map((_, i) => mat.map((row) => row[i]).reverse());
  };

  // Main game tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPiece((prev) => {
        // If self-playing, simulate some horizontal tracking
        let targetX = prev.x;
        if (isSelfPlaying && Math.random() < 0.25) {
          const drift = Math.random() < 0.5 ? -1 : 1;
          if (!checkCollision(prev.shape, prev.x + drift, prev.y, board)) {
            targetX = prev.x + drift;
          }
        }

        // Try moving down
        if (!checkCollision(prev.shape, targetX, prev.y + 1, board)) {
          return { ...prev, x: targetX, y: prev.y + 1 };
        }

        // Lock piece into board
        sound.playTetrisDrop();
        const newBoard = board.map((row) => [...row]);
        for (let r = 0; r < prev.shape.length; r++) {
          for (let c = 0; c < prev.shape[r].length; c++) {
            if (prev.shape[r][c]) {
              const by = prev.y + r;
              const bx = prev.x + c;
              if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
                newBoard[by][bx] = prev.color;
              }
            }
          }
        }

        // Check for full line clears
        let linesCleared = 0;
        const filteredBoard = newBoard.filter((row) => {
          const isFull = row.every((cell) => cell !== null);
          if (isFull) linesCleared++;
          return !isFull;
        });

        while (filteredBoard.length < ROWS) {
          filteredBoard.unshift(Array(COLS).fill(null));
        }

        if (linesCleared > 0) {
          sound.playTetrisClear();
          setScore((s) => s + linesCleared * 100);
          setPerfectFit(true);
          setTimeout(() => setPerfectFit(false), 900);
        }

        // Check if top row reached (reset loop)
        if (newBoard[0].some((c) => c !== null)) {
          setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
        } else {
          setBoard(filteredBoard);
        }

        spawnPiece(filteredBoard);
        return prev;
      });
    }, 380);

    return () => clearInterval(timer);
  }, [board, isSelfPlaying, spawnPiece]);

  // Render main Tetris Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = '#1F1F23';
    ctx.lineWidth = 1;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * BLOCK_SIZE, 0);
      ctx.lineTo(c * BLOCK_SIZE, ROWS * BLOCK_SIZE);
      ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * BLOCK_SIZE);
      ctx.lineTo(COLS * BLOCK_SIZE, r * BLOCK_SIZE);
      ctx.stroke();
    }

    // Draw locked board blocks
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const color = board[r][c];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          ctx.strokeStyle = '#0E0E0E';
          ctx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }

    // Draw active falling piece
    const { shape, color, x, y } = currentPiece;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const drawX = (x + c) * BLOCK_SIZE;
          const drawY = (y + r) * BLOCK_SIZE;
          ctx.fillStyle = color;
          ctx.fillRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  }, [board, currentPiece]);

  // Render NEXT piece canvas preview
  useEffect(() => {
    const canvas = nextCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const piece = TETROMINOES[nextPieceIndex];

    const cellSize = 14;
    const offsetX = (canvas.width - piece.shape[0].length * cellSize) / 2;
    const offsetY = (canvas.height - piece.shape.length * cellSize) / 2;

    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          ctx.fillStyle = piece.color;
          ctx.fillRect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
          ctx.strokeStyle = '#0E0E0E';
          ctx.strokeRect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [nextPieceIndex]);

  // Player manual controls
  const handleMove = (dx: number) => {
    sound.playTetrisMove();
    setIsSelfPlaying(false);
    setCurrentPiece((prev) => {
      if (!checkCollision(prev.shape, prev.x + dx, prev.y, board)) {
        return { ...prev, x: prev.x + dx };
      }
      return prev;
    });
  };

  const handleRotate = () => {
    sound.playTetrisRotate();
    setIsSelfPlaying(false);
    setCurrentPiece((prev) => {
      const rotated = rotateMatrix(prev.shape);
      if (!checkCollision(rotated, prev.x, prev.y, board)) {
        return { ...prev, shape: rotated };
      }
      return prev;
    });
  };

  const handleDrop = () => {
    sound.playTetrisDrop();
    setIsSelfPlaying(false);
    setCurrentPiece((prev) => {
      let curY = prev.y;
      while (!checkCollision(prev.shape, prev.x, curY + 1, board)) {
        curY++;
      }
      return { ...prev, y: curY };
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 sm:px-12 py-20 relative select-none">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT VISUAL: Live Tetris Board with NEXT Preview */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Main Board Container */}
          <div className="relative p-3 bg-[#141414] border-4 border-[#3F3F46] shadow-[8px_8px_0px_#000]">
            
            {/* Header / Score bar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#27272A] font-pixel text-[10px]">
              <span className="text-[#A1A1AA]">SCORE:</span>
              <span className="text-[#B8FF01]">{score}</span>
            </div>

            {/* Board Canvas */}
            <canvas
              ref={canvasRef}
              width={COLS * BLOCK_SIZE}
              height={ROWS * BLOCK_SIZE}
              className="bg-[#0E0E0E] pixelated border border-[#27272A]"
            />

            {/* Perfect Fit Flash Overlay */}
            {perfectFit && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#B8FF01]/25 backdrop-blur-[1px] animate-pulse">
                <span className="font-pixel text-sm text-[#0E0E0E] bg-[#B8FF01] px-3 py-1 font-bold">
                  PERFECT FIT!
                </span>
              </div>
            )}

            {/* Mobile / Direct Controls */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                onClick={() => handleMove(-1)}
                className="pixel-btn-outline px-2.5 py-1 text-xs"
                title="Left"
              >
                ◀
              </button>
              <button
                onClick={handleRotate}
                className="pixel-btn-outline px-2.5 py-1 text-xs text-[#EAB308]"
                title="Rotate"
              >
                ↻
              </button>
              <button
                onClick={handleDrop}
                className="pixel-btn-outline px-2.5 py-1 text-xs text-[#B8FF01]"
                title="Drop"
              >
                ▼
              </button>
              <button
                onClick={() => handleMove(1)}
                className="pixel-btn-outline px-2.5 py-1 text-xs"
                title="Right"
              >
                ▶
              </button>
            </div>
          </div>

          {/* NEXT piece preview sidebar */}
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-[#141414] border-2 border-[#27272A] shadow-[4px_4px_0px_#000]">
              <span className="font-pixel text-[9px] text-[#A1A1AA] block text-center mb-1">
                NEXT
              </span>
              <canvas
                ref={nextCanvasRef}
                width={70}
                height={70}
                className="bg-[#0E0E0E] pixelated"
              />
            </div>

            <button
              onClick={() => setIsSelfPlaying(!isSelfPlaying)}
              className="font-pixel text-[8px] text-[#71717A] hover:text-[#B8FF01] p-1 border border-[#27272A] text-center"
            >
              {isSelfPlaying ? '● BOT PLAYING' : '○ MANUAL MODE'}
            </button>
          </div>

        </div>

        {/* RIGHT CONTENT: Speech Bubble, Headline, Copy, CTA */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* Pixel Speech Bubble */}
          <div className="pixel-speech-bubble font-pixel text-xs text-[#0E0E0E] inline-block max-w-fit">
            <span>&quot;reach out by email today.&quot;</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5F5F0] leading-tight">
            <AsciiScramble
              text="Stack your vision with mine."
              delay={200}
              triggerKey="tetris-head"
            />
          </h2>

          {/* Copy */}
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl">
            <RedactedText
              text="Good ideas deserve great execution. Have something in mind? Let's turn it into a digital experience worth remembering."
              delay={350}
              triggerKey="tetris-copy"
            />
          </p>

          {/* CTA Button */}
          <div className="pt-4 flex items-center gap-4">
            <a
              href="mailto:alex@example.com?subject=Project%20Inquiry%20via%20Portfolio"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="pixel-btn text-xs px-6 py-3.5 flex items-center gap-3"
            >
              <span>✉ CONTACT ME</span>
              <span>&gt;</span>
            </a>
            <span className="font-mono text-xs text-[#71717A]">
              Response within 24h
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
