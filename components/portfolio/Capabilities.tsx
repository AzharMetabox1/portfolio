'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CapabilityItem {
  id: string;
  title: string;
  screenLabel: string;
  screenSubtitle: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Apps',
    screenLabel: 'NEXT.JS 16 // FULL-STACK',
    screenSubtitle: 'Server Components, TypeScript & PostgreSQL.',
  },
  {
    id: 'transit',
    title: 'Mobile & Transit Systems',
    screenLabel: 'FLUTTER // SPATIAL ROUTING',
    screenSubtitle: 'OpenTripPlanner multi-modal transit graphs.',
  },
  {
    id: 'three3d',
    title: '3D Web & Interactive UI',
    screenLabel: 'THREE.JS // REACT THREE FIBER',
    screenSubtitle: 'Real-time GLB morph targets & WebGL shaders.',
  },
  {
    id: 'appsec',
    title: 'Data Pipelines & AppSec',
    screenLabel: 'MAPREDUCE // BURP SUITE',
    screenSubtitle: 'Distributed Linux pipelines & access control.',
  },
];

export default function Capabilities() {
  const [activeId, setActiveId] = useState<string>('fullstack');

  return (
    <section
      id="capabilities"
      data-dark-section="true"
      className="relative w-full bg-[#141413] text-[#EFECE6] pt-16 pb-28"
    >
      {/* Top Left Label: "What I can help with" (14px, #EFECE6) above a full-width 1px hairline border */}
      <div className="w-full px-5 sm:px-8 lg:px-10 pb-4">
        <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[#EFECE6]">
          What I can help with
        </h2>
      </div>
      <div className="w-full h-[1px] bg-[rgba(239,236,230,0.12)]" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 pt-10 sm:pt-14">
        {/* 2-Column Interactive Service List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (Cols 1-4): Square framed preview card (aspect-ratio: 1/1, warm ambient background with sleek laptop mockup) */}
          <div className="lg:col-span-4 w-full max-w-[340px]">
            <div
              className="relative w-full aspect-square overflow-hidden flex flex-col justify-end p-5 sm:p-6 select-none border border-[rgba(239,236,230,0.12)]"
              style={{
                background:
                  'radial-gradient(circle at 25% 20%, #C88A56 0%, #8C5832 48%, #3D2516 88%, #1F150E 100%)',
              }}
            >
              {/* Subtle warm architectural studio light beam */}
              <div
                className="pointer-events-none absolute inset-0 opacity-45"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,235,210,0.35) 0%, transparent 50%, rgba(0,0,0,0.45) 100%)',
                }}
              />

              {/* Sleek Laptop Mockup Frame */}
              <div className="relative z-10 w-full my-auto flex flex-col items-center">
                {/* Laptop Screen Lid */}
                <div className="w-[92%] aspect-[16/10] bg-[#EFECE6] text-[#141413] rounded-t-[4px] border-[3px] border-[#1A1918] shadow-2xl overflow-hidden flex flex-col justify-between p-3 sm:p-3.5">
                  <AnimatePresence mode="wait">
                    {activeId === 'fullstack' && (
                      <motion.div
                        key="laptop-fullstack"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="w-full h-full flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-[7px] font-mono tracking-wider text-[#6E6E6A]">
                          <span>AZHAR SOOPUN // WEB ARCH</span>
                          <span className="px-1 py-0.5 bg-[#141413] text-[#EFECE6]">NEXT.JS</span>
                        </div>
                        <div className="my-auto">
                          <div className="text-[11px] sm:text-[12px] font-bold tracking-[-0.03em] leading-tight text-[#141413]">
                            Software that scales.
                            <br />
                            Zero runtime surprises.
                          </div>
                          <div className="mt-1.5 flex gap-1">
                            <span className="h-1.5 w-8 bg-[#141413]" />
                            <span className="h-1.5 w-5 bg-[#141413]/30" />
                          </div>
                        </div>
                        <div className="pt-1 border-t border-[#141413]/15 flex justify-between text-[7px] font-mono font-bold text-[#141413]">
                          <span>REACT 19 + SUPABASE</span>
                          <span>99.9% UPTIME</span>
                        </div>
                      </motion.div>
                    )}

                    {activeId === 'transit' && (
                      <motion.div
                        key="laptop-transit"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="w-full h-full flex flex-col justify-between bg-[#141413] text-[#EFECE6] -m-3 sm:-m-3.5 p-3 sm:p-3.5"
                      >
                        <div className="flex items-center justify-between text-[7px] font-mono text-emerald-400">
                          <span>OPENTRIPPLANNER ENGINE</span>
                          <span>FLUTTER</span>
                        </div>
                        <div className="my-auto space-y-1">
                          <div className="text-[10px] font-bold text-[#EFECE6]">
                            Rose Hill → Reduit Campus
                          </div>
                          <div className="w-full h-1 bg-white/10 overflow-hidden">
                            <div className="w-3/4 h-full bg-emerald-400" />
                          </div>
                          <div className="text-[8px] font-mono text-[#8E8E89]">
                            Metro Express + Bus Feeder • 17m
                          </div>
                        </div>
                        <div className="pt-1 border-t border-white/10 flex justify-between text-[7px] font-mono text-[#8E8E89]">
                          <span>POSTGIS GRAPH</span>
                          <span>42MS QUERY</span>
                        </div>
                      </motion.div>
                    )}

                    {activeId === 'three3d' && (
                      <motion.div
                        key="laptop-three3d"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="w-full h-full flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between text-[7px] font-mono text-[#6E6E6A]">
                          <span>3DBMIVISUALIZER.COM</span>
                          <span className="px-1 bg-[#141413] text-[#EFECE6]">WEBGL</span>
                        </div>
                        <div className="my-auto flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full border border-[#141413] flex items-center justify-center text-[8px] font-mono font-bold">
                            3D
                          </div>
                          <div>
                            <div className="text-[10px] font-bold leading-tight">
                              GLB Morph Keys
                            </div>
                            <div className="text-[8px] text-[#4A4A46]">
                              60fps React Three Fiber
                            </div>
                          </div>
                        </div>
                        <div className="pt-1 border-t border-[#141413]/15 flex justify-between text-[7px] font-mono font-bold">
                          <span>BLENDER PIPELINE</span>
                          <span>GPU SHADERS</span>
                        </div>
                      </motion.div>
                    )}

                    {activeId === 'appsec' && (
                      <motion.div
                        key="laptop-appsec"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="w-full h-full flex flex-col justify-between bg-[#141413] text-[#EFECE6] -m-3 sm:-m-3.5 p-3 sm:p-3.5 font-mono"
                      >
                        <div className="flex items-center justify-between text-[7px] text-amber-400">
                          <span>HADOOP + APPSEC GUARD</span>
                          <span>LINUX VM</span>
                        </div>
                        <div className="my-auto text-[8px] space-y-0.5 text-[#EFECE6]/90">
                          <div>&gt; MapReduce: 1.24M rows OK</div>
                          <div className="text-emerald-400">
                            &gt; IDOR Middleware: 403 Enforced
                          </div>
                        </div>
                        <div className="pt-1 border-t border-white/10 flex justify-between text-[7px] text-[#8E8E89]">
                          <span>BURP SUITE VERIFIED</span>
                          <span>SECURE</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Laptop Base / Keyboard Deck */}
                <div className="w-full h-[8px] bg-gradient-to-r from-[#2B2927] via-[#4A4744] to-[#1F1E1C] rounded-b-[4px] shadow-xl relative">
                  <div className="w-10 h-[2px] bg-[#141413] mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 5-12): Large Stacked Typographic List & Bottom Editorial Copy */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Stacked Typographic List (clamp(2rem, 4.2vw, 3.8rem), font-weight: 600) */}
            <div className="flex flex-col">
              {CAPABILITIES.map((cap) => {
                const isActive = activeId === cap.id;
                return (
                  <div
                    key={cap.id}
                    onMouseEnter={() => setActiveId(cap.id)}
                    onClick={() => setActiveId(cap.id)}
                    className="py-1 sm:py-1.5 cursor-pointer select-none"
                  >
                    <h3
                      className={`font-semibold tracking-[-0.04em] leading-[1.06] transition-colors duration-200 ${
                        isActive
                          ? 'text-[#EFECE6]'
                          : 'text-[#5A5A55] hover:text-[#8E8E89]'
                      }`}
                      style={{ fontSize: 'clamp(2rem, 4.2vw, 3.8rem)' }}
                    >
                      {cap.title}
                      {isActive && <span className="ml-3 inline-block">•</span>}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Bottom Right Editorial Copy (below the list, matching 00:17 - 00:18 in reference video) */}
            <div
              id="experience"
              className="mt-16 sm:mt-24 lg:ml-auto lg:w-[72%] flex flex-col gap-7"
            >
              <p className="text-[20px] sm:text-[23px] font-medium leading-[1.22] tracking-[-0.03em] text-[#EFECE6]">
                Clean architecture, from database schema to pixel-perfect UI.{' '}
                <span className="text-[#EFECE6]">
                  Nothing gets lost between frontend and backend.
                </span>
              </p>

              <p className="text-[20px] sm:text-[23px] font-medium leading-[1.22] tracking-[-0.03em] text-[#7A7A75]">
                Currently completing my{' '}
                <span className="text-[#EFECE6]">BSc in Applied Computing</span> at the{' '}
                <span className="text-[#EFECE6]">University of Mauritius</span> and building
                production software as an{' '}
                <span className="text-[#EFECE6]">
                  IT &amp; Web Development Intern at MetaBox
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
