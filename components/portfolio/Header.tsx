'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const darkSections = document.querySelectorAll('[data-dark-section="true"]');
      let insideDark = false;
      const probeY = 36; // navbar vertical center in viewport coordinates

      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // For ScrollNarrative which blends into light at the very bottom, check data-dark-end-ratio if present
        const ratioAttr = el.getAttribute('data-dark-end-ratio');
        const effectiveBottom = ratioAttr
          ? rect.top + rect.height * parseFloat(ratioAttr)
          : rect.bottom;

        if (rect.top <= probeY && effectiveBottom >= probeY) {
          insideDark = true;
        }
      });

      setIsDarkSection(insideDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isDarkSection ? 'text-[#EFECE6]' : 'text-[#141413]'
        } px-5 sm:px-8 lg:px-10 py-4`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Left: Azhar Soopun (bold, tight tracking, 15px) */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[15px] font-bold tracking-[-0.04em] cursor-pointer hover:opacity-70 transition-opacity"
          >
            Azhar Soopun
          </button>

          {/* Center: Anchor links Projects, Capabilities, Experience (14px, hover opacity shift) */}
          <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium tracking-[-0.02em]">
            <button
              onClick={() => scrollTo('recent-work')}
              className="cursor-pointer hover:opacity-55 transition-opacity"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('capabilities')}
              className="cursor-pointer hover:opacity-55 transition-opacity"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="cursor-pointer hover:opacity-55 transition-opacity"
            >
              Experience
            </button>
          </nav>

          {/* Right: Rectangular button Get in touch ↗ */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold tracking-[-0.02em] rounded-[3px] transition-all duration-200 cursor-pointer ${
                isDarkSection
                  ? 'bg-[#EFECE6] text-[#141413] hover:opacity-90'
                  : 'bg-[#141413] text-[#EFECE6] hover:opacity-85'
              }`}
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 pt-20 px-6 flex flex-col gap-6 md:hidden transition-colors ${
            isDarkSection ? 'bg-[#141413] text-[#EFECE6]' : 'bg-[#EFECE6] text-[#141413]'
          }`}
        >
          <div className="flex flex-col gap-5 text-2xl font-semibold tracking-[-0.03em] border-b border-current/15 pb-8">
            <button
              onClick={() => scrollTo('recent-work')}
              className="text-left py-2 hover:opacity-70"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('capabilities')}
              className="text-left py-2 hover:opacity-70"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="text-left py-2 hover:opacity-70"
            >
              Experience
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className={`w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold rounded-[3px] ${
              isDarkSection ? 'bg-[#EFECE6] text-[#141413]' : 'bg-[#141413] text-[#EFECE6]'
            }`}
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
