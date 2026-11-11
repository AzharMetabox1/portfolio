'use client';

import React, { useState } from 'react';
import Preloader from './Preloader';
import Header from './Header';
import Hero from './Hero';
import ScrollNarrative from './ScrollNarrative';
import RecentWork from './RecentWork';
import Capabilities from './Capabilities';
import FAQ from './FAQ';
import Footer from './Footer';
import ContactModal from './ContactModal';
import FlappyBatModal from './FlappyBatModal';

export default function PortfolioExperience() {
  const [replayCount, setReplayCount] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [flappyBatOpen, setFlappyBatOpen] = useState(false);

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setReplayCount((prev) => prev + 1);
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#EFECE6] text-[#141413] selection:bg-[#141413] selection:text-[#EFECE6]">
      {/* Tactile Editorial Noise Grain */}
      <div className="grain-overlay" />

      {/* Fullscreen Preloader */}
      <Preloader triggerReplay={replayCount} />

      {/* Sticky Minimal Adaptive Header */}
      <Header onOpenContact={() => setContactOpen(true)} />

      {/* Main Content Sections */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero />

        {/* Scroll-Triggered Dark Narrative Transition */}
        <ScrollNarrative />

        {/* Editorial Recent Work Showcase */}
        <RecentWork
          onOpenFlappyBat={() => setFlappyBatOpen(true)}
          onOpenContact={() => setContactOpen(true)}
        />

        {/* Capabilities & Experience (Charcoal Dark) */}
        <Capabilities />

        {/* Technical FAQ (Charcoal Dark) */}
        <FAQ onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* Editorial Footer with Giant Baseline Cut-off Wordmark */}
      <Footer
        onReplayIntro={handleReplayIntro}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Contact Drawer / Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Flappy Bat: Mauritius Edition Playable Canvas Modal */}
      <FlappyBatModal
        isOpen={flappyBatOpen}
        onClose={() => setFlappyBatOpen(false)}
      />
    </div>
  );
}
