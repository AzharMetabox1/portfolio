'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';

interface FAQProps {
  onOpenContact: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'stack',
    question: 'What is your core tech stack for production projects?',
    answer:
      'I build production software using React, Next.js, React Native, and Flutter on the client side, paired with Three.js and React Three Fiber for interactive 3D web graphics. On the backend and data layer, I work extensively with Supabase, PostgreSQL, SQLite, and RESTful APIs—supported by disciplined Git version control and Linux workflows.',
  },
  {
    id: 'availability',
    question: 'What is your current availability for internships or full-time engineering roles?',
    answer:
      'I am currently completing my BSc in Applied Computing at the University of Mauritius while gaining hands-on commercial experience as an IT & Web Development Intern at MetaBox. I am ready and available for software engineering roles, graduate positions, and high-impact collaborative projects.',
  },
  {
    id: 'performance',
    question: 'How do you handle complex backend routing or 3D performance on the web?',
    answer:
      'For multi-modal transit routing, I optimize OpenTripPlanner spatial graphs using A* heuristics and indexed topological stops to keep pathfinding queries fast and predictable. For 3D web applications like 3dbmivisualizer.com, I compress Blender GLB assets and drive real-time mesh deformations through GPU-accelerated morph target shape keys in React Three Fiber to maintain a locked 60 FPS.',
  },
  {
    id: 'workflow',
    question: 'Can you jump into an existing codebase or collaborative engineering workflow?',
    answer:
      'Yes. Through my engineering work at MetaBox and distributed systems projects, I regularly jump into existing Next.js and React Native repositories using structured Git branching strategies, SSH remote workflows, Burp Suite security testing, and virtualized Linux VM environments.',
  },
];

export default function FAQ({ onOpenContact }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      data-dark-section="true"
      className="relative w-full bg-[#141413] text-[#EFECE6] pt-14 pb-28"
    >
      {/* Top Left Label above hairline border */}
      <div className="w-full px-5 sm:px-8 lg:px-10 pb-4">
        <h3 className="text-[14px] font-medium tracking-[-0.01em] text-[#EFECE6]">
          Background &amp; FAQ
        </h3>
      </div>
      <div className="w-full h-[1px] bg-[rgba(239,236,230,0.12)]" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column Spacer matching editorial grid */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* Right Column: Large Heading, 4 Expandable Accordion Rows & CTA Block */}
          <div className="lg:col-span-9 flex flex-col">
            <h2
              className="font-bold tracking-[-0.04em] leading-[1.04] text-[#EFECE6] pb-12 max-w-2xl"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              The most common
              <br />
              questions, answered.
            </h2>

            {/* 4 Expandable Accordion Rows */}
            <div className="flex flex-col border-t border-[rgba(239,236,230,0.12)]">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="border-b border-[rgba(239,236,230,0.12)]"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full py-5 sm:py-6 flex items-center justify-between gap-6 text-left group cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[16px] sm:text-[18px] font-medium tracking-[-0.02em] text-[#EFECE6] group-hover:opacity-80 transition-opacity">
                        {item.question}
                      </span>

                      <span
                        className={`text-[#EFECE6] transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                      >
                        <Plus className="w-5 h-5 stroke-[1.75]" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pr-8 text-[15px] leading-[1.55] text-[#6E6E6A] max-w-2xl">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* CTA Block Below Accordion (matching 00:19 in reference video) */}
            <div className="mt-16 sm:mt-20 flex flex-col items-start gap-5">
              <div className="text-[24px] sm:text-[30px] font-semibold tracking-[-0.035em] leading-[1.12]">
                <div className="text-[#EFECE6]">Want to build something together?</div>
                <div className="text-[#6E6E6A]">Feel free to reach out.</div>
              </div>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EFECE6] text-[#141413] font-semibold text-[13px] tracking-[-0.02em] rounded-[3px] hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
