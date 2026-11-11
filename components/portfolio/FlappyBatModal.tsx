'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, RotateCcw, Volume2, VolumeX, Trophy } from 'lucide-react';

interface FlappyBatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FlappyBatModal({ isOpen, onClose }: FlappyBatModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio Context for synthesized retro sound effects
  const playSound = useCallback((type: 'flap' | 'score' | 'hit') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'flap') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(560, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'score') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.setValueAtTime(780, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // AudioContext blocked or unsupported
    }
  }, [soundEnabled]);

  useEffect(() => {
    const saved = localStorage.getItem('flappy_bat_highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const flapRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frames = 0;

    // Game variables
    let batY = 160;
    let batVelocity = 0;
    const gravity = 0.35;
    const jump = -6.2;
    const batX = 70;
    const batWidth = 28;
    const batHeight = 20;

    interface Pipe {
      x: number;
      top: number;
      bottom: number;
      passed: boolean;
    }

    let pipes: Pipe[] = [];
    const pipeWidth = 44;
    const pipeGap = 125;
    let localScore = 0;
    let isGameOver = false;
    let isRunning = false;

    const resetGame = () => {
      batY = 160;
      batVelocity = 0;
      pipes = [];
      localScore = 0;
      isGameOver = false;
      isRunning = true;
      setScore(0);
      setGameState('playing');
    };

    const doFlap = () => {
      if (isGameOver) {
        resetGame();
        return;
      }
      if (!isRunning) {
        resetGame();
      }
      batVelocity = jump;
      playSound('flap');
    };

    flapRef.current = doFlap;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        doFlap();
      }
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Draw Mauritius Fruit Bat sprite on Canvas
    const drawBat = (x: number, y: number, wingFrame: number) => {
      ctx.save();
      ctx.translate(x, y);

      // Bat body (golden-brown fruit bat)
      ctx.fillStyle = '#6E4829';
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Golden head/fur collar
      ctx.fillStyle = '#C8933E';
      ctx.beginPath();
      ctx.arc(8, -2, 5, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#141413';
      ctx.fillRect(9, -4, 2, 2);

      // Ears
      ctx.fillStyle = '#4A2E16';
      ctx.beginPath();
      ctx.moveTo(6, -6);
      ctx.lineTo(8, -11);
      ctx.lineTo(10, -6);
      ctx.fill();

      // Wings (flapping animation)
      ctx.fillStyle = '#2B1A0E';
      const wingOffset = Math.sin(wingFrame * 0.3) * 8;
      ctx.beginPath();
      ctx.moveTo(-4, -2);
      ctx.quadraticCurveTo(-14, -14 + wingOffset, -22, -6 + wingOffset);
      ctx.quadraticCurveTo(-12, 0, -4, 2);
      ctx.fill();

      ctx.restore();
    };

    // Main render loop
    const render = () => {
      frames++;

      // Canvas background: Alabaster / Warm twilight
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#D6D1C4');
      bgGrad.addColorStop(0.7, '#EAE6DD');
      bgGrad.addColorStop(1, '#BEB8A8');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background silhouette: Mauritius Pieter Both mountain peak
      ctx.fillStyle = '#A39C8E';
      ctx.beginPath();
      ctx.moveTo(20, canvas.height - 40);
      ctx.lineTo(110, 140);
      // Pieter Both boulder balance peak
      ctx.arc(110, 134, 10, 0, Math.PI * 2);
      ctx.lineTo(180, canvas.height - 40);
      ctx.lineTo(260, 160);
      ctx.lineTo(340, canvas.height - 40);
      ctx.lineTo(440, 190);
      ctx.lineTo(canvas.width, canvas.height - 40);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // Ground (sugarcane earth)
      ctx.fillStyle = '#5A5852';
      ctx.fillRect(0, canvas.height - 35, canvas.width, 35);
      ctx.fillStyle = '#3F3E3A';
      ctx.fillRect(0, canvas.height - 35, canvas.width, 4);

      if (isRunning && !isGameOver) {
        batVelocity += gravity;
        batY += batVelocity;

        // Spawn sugarcane stalk pipes
        if (frames % 95 === 0) {
          const minPipe = 50;
          const maxPipe = canvas.height - pipeGap - 90;
          const topHeight = Math.floor(Math.random() * (maxPipe - minPipe + 1)) + minPipe;
          pipes.push({
            x: canvas.width,
            top: topHeight,
            bottom: canvas.height - 35 - (topHeight + pipeGap),
            passed: false,
          });
        }

        // Check ground and ceiling collisions
        if (batY + batHeight / 2 >= canvas.height - 35 || batY - batHeight / 2 <= 0) {
          isGameOver = true;
          setGameState('gameover');
          playSound('hit');
        }
      }

      // Draw and update pipes (Sugarcane stalks)
      for (let i = pipes.length - 1; i >= 0; i--) {
        const p = pipes[i];
        if (isRunning && !isGameOver) {
          p.x -= 2.2;
        }

        // Sugarcane stalk design (green/bamboo segments)
        ctx.fillStyle = '#445E3B';
        // Top pipe
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        ctx.fillStyle = '#31442B';
        ctx.fillRect(p.x - 3, p.top - 14, pipeWidth + 6, 14);

        // Bottom pipe
        const bottomY = canvas.height - 35 - p.bottom;
        ctx.fillStyle = '#445E3B';
        ctx.fillRect(p.x, bottomY, pipeWidth, p.bottom);
        ctx.fillStyle = '#31442B';
        ctx.fillRect(p.x - 3, bottomY, pipeWidth + 6, 14);

        // Score update
        if (isRunning && !isGameOver && !p.passed && p.x + pipeWidth < batX) {
          p.passed = true;
          localScore += 1;
          setScore(localScore);
          playSound('score');
          if (localScore > highScore) {
            setHighScore(localScore);
            localStorage.setItem('flappy_bat_highscore', localScore.toString());
          }
        }

        // Collision detection
        if (
          isRunning &&
          !isGameOver &&
          batX + 8 > p.x &&
          batX - 8 < p.x + pipeWidth &&
          (batY - 7 < p.top || batY + 7 > bottomY)
        ) {
          isGameOver = true;
          setGameState('gameover');
          playSound('hit');
        }

        // Remove off-screen pipes
        if (p.x + pipeWidth < -10) {
          pipes.splice(i, 1);
        }
      }

      // Draw the Bat
      drawBat(batX, batY, frames);

      // Overlay text if idle
      if (!isRunning && !isGameOver) {
        ctx.fillStyle = 'rgba(20, 20, 19, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#EFECE6';
        ctx.font = 'bold 20px "Inter Tight", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('FLAPPY BAT: MAURITIUS EDITION', canvas.width / 2, canvas.height / 2 - 25);

        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillStyle = '#C8C5BE';
        ctx.fillText('PRESS SPACE OR CLICK TO FLAP', canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('DODGE SUGARCANE & VOLCANIC CLIFFS', canvas.width / 2, canvas.height / 2 + 30);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, soundEnabled, highScore, playSound, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg bg-[#141413] border border-[#EFECE6]/20 shadow-2xl p-6 flex flex-col text-[#EFECE6]">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]/12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8E8E89]">
              [ 05 // MINI-GAME ]
            </span>
            <span className="text-sm font-semibold tracking-tight">Flappy Bat: Mauritius Edition</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score & HUD */}
        <div className="flex items-center justify-between py-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#8E8E89]">CURRENT SCORE:</span>
            <span className="text-base font-bold text-white tabular-nums">{score}</span>
          </div>
          <div className="flex items-center gap-2 text-[#C8C5BE]">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[#8E8E89]">HIGH SCORE:</span>
            <span className="font-bold text-amber-400 tabular-nums">{highScore}</span>
          </div>
        </div>

        {/* Canvas Game Viewport */}
        <div
          onClick={() => flapRef.current()}
          className="relative w-full aspect-[4/3] bg-[#000] border border-[#EFECE6]/15 cursor-pointer overflow-hidden select-none"
        >
          <canvas
            ref={canvasRef}
            width={480}
            height={360}
            className="w-full h-full block"
          />

          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-3 animate-in fade-in duration-200">
              <span className="font-mono text-xs text-red-400 tracking-widest">[ CRASHED ]</span>
              <h3 className="text-2xl font-bold tracking-tight text-white">GAME OVER</h3>
              <p className="text-xs font-mono text-[#8E8E89]">FINAL SCORE: {score}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  flapRef.current();
                }}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#EFECE6] text-[#141413] text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>PLAY AGAIN</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer instructions */}
        <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#8E8E89]">
          <span>SPACEBAR / TAP TO FLAP</span>
          <span>BUILT WITH HTML5 CANVAS & WEB AUDIO</span>
        </div>
      </div>
    </div>
  );
}
