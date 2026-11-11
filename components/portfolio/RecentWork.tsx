'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Play,
  ShieldCheck,
  Navigation,
  Terminal,
  Activity,
} from 'lucide-react';

interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  linkLabel: string;
  cursorBadge: string;
  isGame?: boolean;
}

interface RecentWorkProps {
  onOpenFlappyBat: () => void;
  onOpenContact?: () => void;
}

export default function RecentWork({ onOpenFlappyBat }: RecentWorkProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 220, y: 140 });

  // Interactive states inside the 65%-size hover mini-windows
  const [transitRoute, setTransitRoute] = useState<'fastest' | 'scenic'>('fastest');
  const [bmiValue, setBmiValue] = useState(23.4);
  const [middlewarePatched, setMiddlewarePatched] = useState(true);
  const [pipelineStage, setPipelineStage] = useState<'map' | 'shuffle' | 'reduce'>('reduce');

  const projects: Project[] = [
    {
      id: 'transit',
      index: '01',
      title: 'Multi-Modal Transit Planner',
      description:
        'Public transit journey planning mobile application for Mauritius. Integrates Metro Express light rail and bus feeder routes using real-time spatial graph routing.',
      tags: ['Flutter', 'OpenTripPlanner', 'OpenStreetMap', 'Supabase', 'PostgreSQL'],
      link: 'https://github.com/azharsoopun',
      linkLabel: 'View repo',
      cursorBadge: 'View project',
    },
    {
      id: 'bmi',
      index: '02',
      title: '3D BMI Visualizer',
      description:
        'Interactive 3D web application (3dbmivisualizer.com) that renders real-time human body composition adjustments in the browser using custom Blender GLB avatars and morph target shape keys.',
      tags: ['React', 'Three.js', 'React Three Fiber', 'Blender GLB'],
      link: 'https://3dbmivisualizer.com',
      linkLabel: 'View site',
      cursorBadge: 'View project',
    },
    {
      id: 'appsec',
      index: '03',
      title: 'E-Commerce AppSec & IDOR Lab',
      description:
        'Full-stack e-commerce web application built from scratch to demonstrate Insecure Direct Object Reference (IDOR) vulnerabilities via Burp Suite, paired with remediated access-control middleware.',
      tags: ['Cybersecurity', 'Burp Suite', 'SQLite', 'Web Security', 'Access Control'],
      link: 'https://github.com/azharsoopun',
      linkLabel: 'View repo',
      cursorBadge: 'View project',
    },
    {
      id: 'bigdata',
      index: '04',
      title: 'Distributed Big Data Analytics Pipeline',
      description:
        'Engineered a Java MapReduce data processing pipeline running in a virtualized Linux environment to parse, clean, and aggregate large-scale datasets with fault-tolerant parallel execution.',
      tags: ['Java', 'Hadoop MapReduce', 'Linux VM', 'Big Data', 'Distributed Systems'],
      link: 'https://github.com/azharsoopun',
      linkLabel: 'View repo',
      cursorBadge: 'View project',
    },
    {
      id: 'flappy',
      index: '05',
      title: 'Flappy Bat: Mauritius Edition',
      description:
        'Retro 2D pixel-art arcade game built from scratch without external engines. Features custom physics loops, sprite collision detection, and synthesized sound effects.',
      tags: ['HTML5 Canvas', 'Vanilla JS', 'Web Audio API', 'Game Dev'],
      linkLabel: 'Play in browser',
      cursorBadge: 'Play in browser',
      isGame: true,
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="recent-work" className="relative w-full bg-[#EFECE6] text-[#141413] pt-14 pb-24">
      {/* Section Header: Left-aligned label "Recent work" (16px medium) above a full-width 1px top border */}
      <div className="w-full px-5 sm:px-8 lg:px-10 pb-4">
        <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[#141413]">
          Recent work
        </h2>
      </div>
      <div className="w-full h-[1px] bg-[rgba(20,20,19,0.12)]" />

      {/* Project Rows Layout */}
      <div className="w-full flex flex-col">
        {projects.map((project) => {
          const isHovered = hoveredProject === project.id;

          return (
            <div
              key={project.id}
              className="w-full border-b border-[rgba(20,20,19,0.12)] py-10 sm:py-14 px-5 sm:px-8 lg:px-10"
            >
              <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column (Cols 1–7): Large 16:10 visual showcase container */}
                <div className="lg:col-span-7 flex flex-col">
                  <div
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                    onClick={() => {
                      if (project.isGame) {
                        onOpenFlappyBat();
                      } else if (project.link) {
                        window.open(project.link, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="group relative w-full aspect-[16/10] bg-[#181817] border border-[rgba(20,20,19,0.12)] overflow-hidden cursor-pointer select-none"
                  >
                    {/* DEFAULT STATE: Crisp, high-contrast architectural/project UI showcase */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        isHovered ? 'scale-[1.03]' : 'scale-100'
                      }`}
                    >
                      {/* 01 — Multi-Modal Transit Planner Default Showcase */}
                      {project.id === 'transit' && (
                        <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#21201E] via-[#161615] to-[#0E0E0D] text-[#EFECE6]">
                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#8E8E89]">
                            <span className="flex items-center gap-2">
                              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                              MAURITIUS SPATIAL TRANSIT GRAPH
                            </span>
                            <span>OPENTRIPPLANNER // SUPABASE</span>
                          </div>

                          {/* Architectural Transit Graph Visualization */}
                          <div className="relative my-auto w-full py-6">
                            <svg className="w-full h-36 sm:h-44" viewBox="0 0 600 170" fill="none">
                              {/* Grid coordinates */}
                              <line x1="0" y1="35" x2="600" y2="35" stroke="rgba(239,236,230,0.06)" />
                              <line x1="0" y1="85" x2="600" y2="85" stroke="rgba(239,236,230,0.06)" />
                              <line x1="0" y1="135" x2="600" y2="135" stroke="rgba(239,236,230,0.06)" />
                              {/* Alternate route */}
                              <path
                                d="M 60 115 C 180 145, 310 140, 530 60"
                                stroke="rgba(239,236,230,0.18)"
                                strokeWidth="1.5"
                                strokeDasharray="5 5"
                              />
                              {/* Primary Metro Express + Bus Feeder Path */}
                              <path
                                d="M 60 115 C 165 45, 250 55, 320 82"
                                stroke="#10B981"
                                strokeWidth="3.5"
                              />
                              <path
                                d="M 320 82 C 395 108, 460 88, 530 60"
                                stroke="#F59E0B"
                                strokeWidth="3.5"
                              />
                              {/* Nodes */}
                              <circle cx="60" cy="115" r="7" fill="#10B981" />
                              <circle cx="60" cy="115" r="14" stroke="#10B981" strokeOpacity="0.3" />
                              <circle cx="320" cy="82" r="7" fill="#F59E0B" />
                              <circle cx="320" cy="82" r="14" stroke="#F59E0B" strokeOpacity="0.3" />
                              <circle cx="530" cy="60" r="7" fill="#EFECE6" />
                              <circle cx="530" cy="60" r="14" stroke="#EFECE6" strokeOpacity="0.3" />

                              <text x="40" y="146" fill="#EFECE6" fontSize="11" fontFamily="monospace">
                                ROSE HILL CENTRAL
                              </text>
                              <text x="268" y="54" fill="#F59E0B" fontSize="11" fontFamily="monospace">
                                BUS FEEDER TRANSFER
                              </text>
                              <text x="435" y="34" fill="#EFECE6" fontSize="11" fontFamily="monospace">
                                UNIVERSITY OF MAURITIUS
                              </text>
                            </svg>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#6E6E6A]">
                            <span>METRO EXPRESS + BUS FEEDER GRAPH</span>
                            <span>A* SPATIAL ROUTING • 42MS</span>
                          </div>
                        </div>
                      )}

                      {/* 02 — 3D BMI Visualizer Default Showcase */}
                      {project.id === 'bmi' && (
                        <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#23221F] via-[#171716] to-[#0F0F0E] text-[#EFECE6]">
                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#8E8E89]">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#EFECE6]" />
                              3DBMIVISUALIZER.COM
                            </span>
                            <span>REACT THREE FIBER // GLB MORPH KEYS</span>
                          </div>

                          {/* 3D Parametric Mesh Showcase */}
                          <div className="my-auto flex items-center justify-center gap-8 sm:gap-12">
                            <div className="hidden sm:flex flex-col gap-2 font-mono text-[10px] text-[#8E8E89]">
                              <div className="px-2.5 py-1 border border-white/10 bg-white/5">
                                VERTICES: 18,420
                              </div>
                              <div className="px-2.5 py-1 border border-white/10 bg-white/5">
                                SHAPE KEYS: 8 MORPH TARGETS
                              </div>
                              <div className="px-2.5 py-1 border border-white/10 bg-white/5">
                                SHADER: PBR STUDIO LIGHT
                              </div>
                            </div>

                            <div className="relative w-36 h-40 sm:w-44 sm:h-48 flex items-center justify-center border border-white/10 bg-white/[0.02]">
                              <svg
                                viewBox="0 0 120 150"
                                className="w-full h-full p-3 text-[#EFECE6]"
                                fill="none"
                                stroke="currentColor"
                              >
                                <circle cx="60" cy="24" r="12" strokeWidth="1.4" />
                                {/* Shoulders & Torso Mesh */}
                                <path
                                  d="M 34 46 Q 60 40 86 46 L 78 92 Q 60 98 42 92 Z"
                                  strokeWidth="1.4"
                                  fill="rgba(239,236,230,0.05)"
                                />
                                {/* Morph contour rings */}
                                <ellipse
                                  cx="60"
                                  cy="62"
                                  rx="22"
                                  ry="7"
                                  strokeDasharray="3 3"
                                  strokeWidth="1"
                                  stroke="rgba(239,236,230,0.55)"
                                />
                                <ellipse
                                  cx="60"
                                  cy="78"
                                  rx="19"
                                  ry="6"
                                  strokeDasharray="3 3"
                                  strokeWidth="1"
                                  stroke="rgba(239,236,230,0.55)"
                                />
                                {/* Arms & Legs */}
                                <path d="M 34 46 L 22 92" strokeWidth="1.4" />
                                <path d="M 86 46 L 98 92" strokeWidth="1.4" />
                                <path d="M 47 93 L 42 140" strokeWidth="1.4" />
                                <path d="M 73 93 L 78 140" strokeWidth="1.4" />
                              </svg>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#6E6E6A]">
                            <span>REAL-TIME MORPH TARGET INTERPOLATION</span>
                            <span>60 FPS WEBGL PIPELINE</span>
                          </div>
                        </div>
                      )}

                      {/* 03 — E-Commerce AppSec & IDOR Lab Default Showcase */}
                      {project.id === 'appsec' && (
                        <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#191B1D] via-[#131415] to-[#0D0E0F] text-[#EFECE6]">
                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#8E8E89]">
                            <span className="flex items-center gap-2">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              BURP SUITE HTTP PROXY // ACCESS CONTROL LAB
                            </span>
                            <span>OWASP API1:2023</span>
                          </div>

                          <div className="my-auto grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto w-full font-mono text-[11px]">
                            <div className="p-4 bg-black/50 border border-red-500/25 flex flex-col gap-1.5">
                              <span className="text-[10px] text-red-400 uppercase tracking-widest">
                                [ VULNERABLE ENDPOINT ]
                              </span>
                              <div className="text-[#EFECE6]">GET /api/orders/1042 HTTP/1.1</div>
                              <div className="text-[#6E6E6A]">Cookie: session_user=2089</div>
                              <div className="text-red-400 pt-1">
                                → 200 OK (Leaked Order #1042)
                              </div>
                            </div>

                            <div className="p-4 bg-black/50 border border-emerald-500/25 flex flex-col gap-1.5">
                              <span className="text-[10px] text-emerald-400 uppercase tracking-widest">
                                [ REMEDIATED MIDDLEWARE ]
                              </span>
                              <div className="text-[#EFECE6]">GET /api/orders/1042 HTTP/1.1</div>
                              <div className="text-[#6E6E6A]">Guard: order.user_id === auth.id</div>
                              <div className="text-emerald-400 pt-1">
                                → 403 Forbidden (Policy Enforced)
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#6E6E6A]">
                            <span>INSECURE DIRECT OBJECT REFERENCE AUDIT</span>
                            <span>SQLITE + AUTH GUARD</span>
                          </div>
                        </div>
                      )}

                      {/* 04 — Distributed Big Data Analytics Pipeline Default Showcase */}
                      {project.id === 'bigdata' && (
                        <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#1C1D1B] via-[#141413] to-[#0D0D0C] text-[#EFECE6]">
                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#8E8E89]">
                            <span className="flex items-center gap-2">
                              <Terminal className="w-3.5 h-3.5 text-amber-400" />
                              HADOOP MAPREDUCE // LINUX VM CLUSTER
                            </span>
                            <span>JAVA PARALLEL PIPELINE</span>
                          </div>

                          <div className="my-auto grid grid-cols-3 gap-3 sm:gap-5 max-w-xl mx-auto w-full font-mono">
                            <div className="p-3.5 bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                              <span className="text-[10px] text-[#8E8E89]">01 // MAP PHASE</span>
                              <div className="text-base sm:text-lg font-bold text-[#EFECE6] my-2">
                                1.24M
                              </div>
                              <span className="text-[10px] text-emerald-400">KV PAIRS PARSED</span>
                            </div>

                            <div className="p-3.5 bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                              <span className="text-[10px] text-[#8E8E89]">02 // SHUFFLE</span>
                              <div className="text-base sm:text-lg font-bold text-[#EFECE6] my-2">
                                8 NODES
                              </div>
                              <span className="text-[10px] text-amber-400">PARTITIONED HASH</span>
                            </div>

                            <div className="p-3.5 bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                              <span className="text-[10px] text-[#8E8E89]">03 // REDUCE</span>
                              <div className="text-base sm:text-lg font-bold text-[#EFECE6] my-2">
                                1.42s
                              </div>
                              <span className="text-[10px] text-cyan-400">FAULT-TOLERANT</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#6E6E6A]">
                            <span>HDFS DISTRIBUTED STORAGE</span>
                            <span>ZERO DATA LOSS EXECUTION</span>
                          </div>
                        </div>
                      )}

                      {/* 05 — Flappy Bat: Mauritius Edition Default Showcase */}
                      {project.id === 'flappy' && (
                        <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#2B2620] via-[#1B1917] to-[#121110] text-[#EFECE6]">
                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#8E8E89]">
                            <span>RETRO 2D PIXEL ARCADE ENGINE</span>
                            <span>HTML5 CANVAS + WEB AUDIO SYNTH</span>
                          </div>

                          <div className="my-auto flex flex-col items-center justify-center gap-3">
                            <div className="w-20 h-16 flex items-center justify-center border border-[#EFECE6]/15 bg-black/30 p-3">
                              <svg viewBox="0 0 32 24" className="w-full h-full">
                                <rect x="12" y="8" width="8" height="8" fill="#6E4829" />
                                <rect x="14" y="5" width="5" height="5" fill="#C8933E" />
                                <rect x="17" y="6" width="1.5" height="1.5" fill="#141413" />
                                <rect x="3" y="7" width="9" height="4" fill="#2B1A0E" />
                                <rect x="20" y="7" width="9" height="4" fill="#2B1A0E" />
                              </svg>
                            </div>
                            <span className="font-mono text-xs tracking-[0.14em] uppercase text-[#EFECE6]">
                              FLAPPY BAT: MAURITIUS EDITION
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.08em] text-[#6E6E6A]">
                            <span>CUSTOM 60FPS PHYSICS LOOP</span>
                            <span>CLICK TO PLAY IN BROWSER</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* HOVER BLUR + DIM OVERLAY (backdrop-filter: blur(6px)) */}
                    <div
                      className={`absolute inset-0 bg-black/45 backdrop-blur-[6px] transition-opacity duration-300 pointer-events-none ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* HOVER STATE: Centered 65%-size floating mini-window / live interactive preview card */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 12 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 12 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute inset-0 m-auto w-[78%] sm:w-[65%] h-[72%] sm:h-[65%] bg-[#EFECE6] text-[#141413] border border-[#141413]/20 shadow-2xl p-4 sm:p-5 flex flex-col justify-between z-20 cursor-default"
                        >
                          {/* 01 Hover Mini-Window: Interactive route-node visualizer */}
                          {project.id === 'transit' && (
                            <div className="h-full flex flex-col justify-between">
                              <div className="flex items-center justify-between pb-2 border-b border-[#141413]/12 text-[10px] font-mono uppercase tracking-[0.08em]">
                                <span className="font-semibold text-[#141413]">
                                  ROUTE-NODE VISUALIZER
                                </span>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => setTransitRoute('fastest')}
                                    className={`px-2 py-0.5 text-[10px] cursor-pointer ${
                                      transitRoute === 'fastest'
                                        ? 'bg-[#141413] text-[#EFECE6]'
                                        : 'bg-[#E2DFD7] text-[#141413]'
                                    }`}
                                  >
                                    Fastest (17m)
                                  </button>
                                  <button
                                    onClick={() => setTransitRoute('scenic')}
                                    className={`px-2 py-0.5 text-[10px] cursor-pointer ${
                                      transitRoute === 'scenic'
                                        ? 'bg-[#141413] text-[#EFECE6]'
                                        : 'bg-[#E2DFD7] text-[#141413]'
                                    }`}
                                  >
                                    Direct Bus (24m)
                                  </button>
                                </div>
                              </div>

                              <div className="my-auto space-y-2 text-xs">
                                <div className="flex items-center justify-between p-2 bg-white/80 border border-[#141413]/10">
                                  <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                                    <span className="font-semibold">Rose Hill Central (Metro)</span>
                                  </div>
                                  <span className="font-mono text-[10px] text-[#6E6E6A]">08:14</span>
                                </div>

                                <div className="flex items-center justify-between px-3 py-1 font-mono text-[10px] text-[#4A4A46]">
                                  <span>
                                    ↓{' '}
                                    {transitRoute === 'fastest'
                                      ? 'Transfer → Bus Feeder 15 (Reduit)'
                                      : 'Transfer → Express Feeder 163'}
                                  </span>
                                  <span className="font-semibold text-[#141413]">
                                    {transitRoute === 'fastest' ? '+4 min' : '+7 min'}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between p-2 bg-white/80 border border-[#141413]/10">
                                  <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#141413]" />
                                    <span className="font-semibold">University of Mauritius</span>
                                  </div>
                                  <span className="font-mono text-[10px] text-[#6E6E6A]">
                                    {transitRoute === 'fastest' ? '08:31' : '08:38'}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-[#141413]/12 flex justify-between items-center text-[10px] font-mono text-[#6E6E6A]">
                                <span>GRAPH NODES: 148 STOPS</span>
                                <span className="text-[#141413] font-semibold">
                                  FARE: RS 35.00
                                </span>
                              </div>
                            </div>
                          )}

                          {/* 02 Hover Mini-Window: Interactive BMI slider card that dynamically morphs a 3D silhouette/mesh preview */}
                          {project.id === 'bmi' && (
                            <div className="h-full flex flex-col justify-between">
                              <div className="flex items-center justify-between pb-2 border-b border-[#141413]/12 text-[10px] font-mono uppercase tracking-[0.08em]">
                                <span className="font-semibold">GLB MORPH TARGET SLIDER</span>
                                <span className="px-1.5 py-0.5 bg-[#141413] text-[#EFECE6] font-bold">
                                  BMI {bmiValue.toFixed(1)}
                                </span>
                              </div>

                              <div className="my-auto flex items-center gap-4">
                                {/* Dynamic Morphing 3D Silhouette Preview */}
                                <div className="w-24 h-28 bg-[#141413] text-[#EFECE6] flex items-center justify-center shrink-0 p-2">
                                  <svg
                                    viewBox="0 0 100 120"
                                    className="w-full h-full"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <circle cx="50" cy="18" r="10" strokeWidth="1.5" />
                                    <ellipse
                                      cx="50"
                                      cy="56"
                                      rx={12 + (bmiValue - 18) * 0.95}
                                      ry="24"
                                      strokeWidth="1.6"
                                      fill="rgba(239,236,230,0.12)"
                                    />
                                    <line x1="34" y1="36" x2="22" y2="74" strokeWidth="1.5" />
                                    <line x1="66" y1="36" x2="78" y2="74" strokeWidth="1.5" />
                                    <line x1="43" y1="78" x2="39" y2="112" strokeWidth="1.5" />
                                    <line x1="57" y1="78" x2="61" y2="112" strokeWidth="1.5" />
                                  </svg>
                                </div>

                                <div className="flex-1 flex flex-col gap-2">
                                  <div className="text-xs font-semibold text-[#141413]">
                                    Shape Key Weight:{' '}
                                    {((bmiValue - 18.5) / (34 - 18.5)).toFixed(2)}
                                  </div>
                                  <input
                                    type="range"
                                    min="18.5"
                                    max="34.0"
                                    step="0.3"
                                    value={bmiValue}
                                    onChange={(e) => setBmiValue(parseFloat(e.target.value))}
                                    className="w-full accent-[#141413] cursor-pointer"
                                  />
                                  <div className="flex justify-between text-[10px] font-mono text-[#6E6E6A]">
                                    <span>18.5</span>
                                    <span>24.0</span>
                                    <span>34.0</span>
                                  </div>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-[#141413]/12 flex justify-between items-center text-[10px] font-mono">
                                <span className="text-[#6E6E6A]">3DBMIVISUALIZER.COM</span>
                                <a
                                  href="https://3dbmivisualizer.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-[#141413] underline"
                                >
                                  Launch Live 3D ↗
                                </a>
                              </div>
                            </div>
                          )}

                          {/* 03 Hover Mini-Window: Live HTTP request/response interceptor diff */}
                          {project.id === 'appsec' && (
                            <div className="h-full flex flex-col justify-between">
                              <div className="flex items-center justify-between pb-2 border-b border-[#141413]/12 text-[10px] font-mono uppercase tracking-[0.08em]">
                                <span className="font-semibold">HTTP INTERCEPTOR DIFF</span>
                                <button
                                  onClick={() => setMiddlewarePatched(!middlewarePatched)}
                                  className="px-2 py-0.5 bg-[#141413] text-[#EFECE6] cursor-pointer"
                                >
                                  {middlewarePatched
                                    ? 'Mode: Patched Middleware'
                                    : 'Mode: Unpatched IDOR'}
                                </button>
                              </div>

                              <div className="my-auto bg-[#141413] text-[#EFECE6] p-3 font-mono text-[10px] space-y-1.5">
                                <div className="text-[#8E8E89]">
                                  &gt; Request: GET /api/orders/1042 HTTP/1.1
                                </div>
                                <div className="text-[#8E8E89]">
                                  &gt; Session Actor: user_id=2089 (Customer)
                                </div>
                                {middlewarePatched ? (
                                  <>
                                    <div className="text-amber-300">
                                      &gt; Guard: verifyOrderOwnership(1042, 2089)
                                    </div>
                                    <div className="text-emerald-400 font-semibold">
                                      &gt; 403 Forbidden - Patched Middleware
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="text-red-400">
                                      &gt; Warning: Missing ownership check!
                                    </div>
                                    <div className="text-red-400 font-semibold">
                                      &gt; 200 OK - Exposed Order #1042 PII
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="pt-2 border-t border-[#141413]/12 flex justify-between items-center text-[10px] font-mono text-[#6E6E6A]">
                                <span>BURP SUITE REPEATER</span>
                                <span className="text-[#141413] font-semibold">
                                  OWASP ACCESS CONTROL
                                </span>
                              </div>
                            </div>
                          )}

                          {/* 04 Hover Mini-Window: Terminal execution monitor visualizing Map -> Shuffle -> Reduce */}
                          {project.id === 'bigdata' && (
                            <div className="h-full flex flex-col justify-between">
                              <div className="flex items-center justify-between pb-2 border-b border-[#141413]/12 text-[10px] font-mono uppercase tracking-[0.08em]">
                                <span className="font-semibold">MAPREDUCE MONITOR</span>
                                <div className="flex gap-1">
                                  {(['map', 'shuffle', 'reduce'] as const).map((stage) => (
                                    <button
                                      key={stage}
                                      onClick={() => setPipelineStage(stage)}
                                      className={`px-1.5 py-0.5 uppercase cursor-pointer ${
                                        pipelineStage === stage
                                          ? 'bg-[#141413] text-[#EFECE6]'
                                          : 'bg-[#E2DFD7] text-[#141413]'
                                      }`}
                                    >
                                      {stage}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="my-auto bg-[#141413] text-[#EFECE6] p-3 font-mono text-[10px] space-y-1.5">
                                <div className="flex items-center justify-between text-emerald-400">
                                  <span>STAGE: {pipelineStage.toUpperCase()}</span>
                                  <Activity className="w-3.5 h-3.5" />
                                </div>
                                {pipelineStage === 'map' && (
                                  <>
                                    <div>&gt; TokenizerMapper splitting CSV shards...</div>
                                    <div className="text-[#8E8E89]">
                                      &gt; Throughput: 840,000 records/sec across 4 splits
                                    </div>
                                  </>
                                )}
                                {pipelineStage === 'shuffle' && (
                                  <>
                                    <div>&gt; Sorting &amp; partitioning intermediate keys...</div>
                                    <div className="text-[#8E8E89]">
                                      &gt; Combiner compression ratio: 68.4% network saved
                                    </div>
                                  </>
                                )}
                                {pipelineStage === 'reduce' && (
                                  <>
                                    <div>&gt; IntSumReducer aggregating output nodes...</div>
                                    <div className="text-[#8E8E89]">
                                      &gt; Output written to /hdfs/output/part-r-00000
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="pt-2 border-t border-[#141413]/12 flex justify-between items-center text-[10px] font-mono text-[#6E6E6A]">
                                <span>JAVA HADOOP 3.3 // LINUX VM</span>
                                <span className="text-[#141413] font-semibold">EXIT CODE: 0</span>
                              </div>
                            </div>
                          )}

                          {/* 05 Hover Mini-Window: Playable Flappy Bat launcher */}
                          {project.id === 'flappy' && (
                            <div className="h-full flex flex-col justify-between">
                              <div className="flex items-center justify-between pb-2 border-b border-[#141413]/12 text-[10px] font-mono uppercase tracking-[0.08em]">
                                <span className="font-semibold">INTERACTIVE CANVAS ARCADE</span>
                                <span className="px-1.5 py-0.5 bg-[#141413] text-[#EFECE6]">
                                  60 FPS
                                </span>
                              </div>

                              <div className="my-auto flex flex-col items-center justify-center gap-3 text-center">
                                <p className="text-xs text-[#4A4A46] max-w-xs">
                                  Guide the Mauritian fruit bat past sugarcane stalks with custom
                                  Web Audio API sound synthesis.
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenFlappyBat();
                                  }}
                                  className="px-4 py-2 bg-[#141413] text-[#EFECE6] text-xs font-semibold rounded-[3px] hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                  <span>Play in browser</span>
                                </button>
                              </div>

                              <div className="pt-2 border-t border-[#141413]/12 flex justify-between items-center text-[10px] font-mono text-[#6E6E6A]">
                                <span>ZERO EXTERNAL ENGINES</span>
                                <span className="text-[#141413] font-semibold">HTML5 CANVAS</span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Floating White Pill Cursor Badge (follows pointer on hover) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: cursorPos.x - 48,
                            y: cursorPos.y - 42,
                          }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            opacity: { duration: 0.15 },
                            scale: { duration: 0.15 },
                            x: { type: 'spring', stiffness: 380, damping: 28, mass: 0.4 },
                            y: { type: 'spring', stiffness: 380, damping: 28, mass: 0.4 },
                          }}
                          className="pointer-events-none absolute top-0 left-0 z-30 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFECE6] text-[#141413] text-[12px] font-semibold tracking-[-0.02em] rounded-[3px] shadow-lg border border-[#141413]/15"
                        >
                          <span>{project.cursorBadge}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Below the image container on the left: Subtle ↗ View site or ↗ View repo link */}
                  <div className="mt-3 flex items-center">
                    {project.isGame ? (
                      <button
                        onClick={onOpenFlappyBat}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#141413] hover:opacity-60 transition-opacity cursor-pointer"
                      >
                        <span>↗ {project.linkLabel}</span>
                      </button>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#141413] hover:opacity-60 transition-opacity"
                      >
                        <span>↗ {project.linkLabel}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column (Cols 8–12): Index, Title, Description, Tech Stack Pills */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full py-1">
                  <div className="flex flex-col gap-5">
                    {/* Top index number in monospace: 01, 02, 03, 04, 05 */}
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#6E6E6A]">
                      {project.index}
                    </span>

                    {/* Project Title (28px–32px, bold, #141413) */}
                    <h3 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.04em] text-[#141413] leading-[1.08]">
                      {project.title}
                    </h3>

                    {/* Concise 2–3 sentence editorial description (15px, #4A4A46, max-width: 42ch) */}
                    <p className="text-[15px] leading-[1.45] text-[#4A4A46] max-w-[42ch]">
                      {project.description}
                    </p>

                    {/* Tech stack tags styled as sharp rectangular pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#E2DFD7] text-[#141413] text-[12px] font-medium px-[10px] py-[4px] rounded-[3px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
