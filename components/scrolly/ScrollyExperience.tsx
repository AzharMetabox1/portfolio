'use client';

import React, { useState, useEffect, useRef } from 'react';
import HUD from '@/components/scrolly/HUD';
import Preloader from '@/components/scrolly/Scene0Preloader';
import Scene1Hero from '@/components/scrolly/Scene1Hero';
import Scene2CharacterSelect from '@/components/scrolly/Scene2CharacterSelect';
import Scene3PixelExplosion from '@/components/scrolly/Scene3PixelExplosion';
import Scene4BlueprintBrain from '@/components/scrolly/Scene4BlueprintBrain';
import Scene5RotatingDNA from '@/components/scrolly/Scene5RotatingDNA';
import Scene6PlayingCards from '@/components/scrolly/Scene6PlayingCards';
import Scene7PixelGlasses from '@/components/scrolly/Scene7PixelGlasses';
import Scene8CreationHands from '@/components/scrolly/Scene8CreationHands';
import Scene9RetroOSCascade from '@/components/scrolly/Scene9RetroOSCascade';
import Scene10TetrisContact from '@/components/scrolly/Scene10TetrisContact';
import Scene11PixelGlobeFooter from '@/components/scrolly/Scene11PixelGlobeFooter';
import MousePixelTrail from '@/components/MousePixelTrail';
import { sound } from '@/lib/sound';

export default function ScrollyExperience() {
  const [booted, setBooted] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [mode, setMode] = useState<'developer' | 'creative'>('developer');
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [crtActive, setCrtActive] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);

  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const lastScrollY = useRef(0);

  // Monitor scroll to determine active scene and direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;

      // Find which section is most visible in viewport
      const windowHeight = window.innerHeight;
      const middleY = currentScrollY + windowHeight / 2;

      for (let i = 0; i < sceneRefs.current.length; i++) {
        const el = sceneRefs.current[i];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (middleY >= top && middleY <= top + height) {
            setCurrentScene(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to sound mute state changes
  useEffect(() => {
    return sound.subscribe((muted) => setIsMuted(muted));
  }, []);

  const scrollToScene = (index: number) => {
    const target = sceneRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0E0E0E] text-[#F5F5F0] overflow-x-hidden">
      
      {/* Physics-Based 8-Bit Mouse Pixel Trail */}
      <MousePixelTrail />

      {/* CRT Scanline & Phosphor Overlay */}
      {crtActive && (
        <>
          <div className="crt-overlay" />
          <div className="crt-vignette" />
        </>
      )}

      {/* Boot Preloader Sequence */}
      {!booted && (
        <Preloader
          onComplete={() => {
            setBooted(true);
            setCurrentScene(1);
          }}
        />
      )}

      {/* Fixed Persistent HUD Chrome */}
      <HUD
        currentScene={currentScene}
        totalScenes={12}
        isMuted={isMuted}
        onToggleMute={() => sound.toggleMute()}
        crtActive={crtActive}
        onToggleCrt={() => setCrtActive(!crtActive)}
        onOpenArcade={() => scrollToScene(10)}
        onOpenProjects={() => scrollToScene(9)}
        onScrollToScene={scrollToScene}
        scrollDirection={scrollDirection}
      />

      {/* 11 Distinct Narrative Scenes */}
      <main className="relative z-10 flex flex-col">
        {/* Scene 0 / Anchor */}
        <section
          ref={(el) => { sceneRefs.current[0] = el; }}
          className="h-0 overflow-hidden"
          id="scene-0"
        />

        {/* Scene 1: Hero Section */}
        <section
          ref={(el) => { sceneRefs.current[1] = el; }}
          id="scene-1"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene1Hero mode={mode} setMode={setMode} />
        </section>

        {/* Scene 2: RPG Character Select */}
        <section
          ref={(el) => { sceneRefs.current[2] = el; }}
          id="scene-2"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene2CharacterSelect
            mode={mode}
            setMode={setMode}
            onPlayNext={() => scrollToScene(3)}
          />
        </section>

        {/* Scene 3: Pixel Explosion */}
        <section
          ref={(el) => { sceneRefs.current[3] = el; }}
          id="scene-3"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene3PixelExplosion />
        </section>

        {/* Scene 4: Blueprint & Brain */}
        <section
          ref={(el) => { sceneRefs.current[4] = el; }}
          id="scene-4"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene4BlueprintBrain />
        </section>

        {/* Scene 5: Rotating Pixel DNA */}
        <section
          ref={(el) => { sceneRefs.current[5] = el; }}
          id="scene-5"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene5RotatingDNA />
        </section>

        {/* Scene 6: Playing Cards */}
        <section
          ref={(el) => { sceneRefs.current[6] = el; }}
          id="scene-6"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene6PlayingCards />
        </section>

        {/* Scene 7: Pixel Glasses */}
        <section
          ref={(el) => { sceneRefs.current[7] = el; }}
          id="scene-7"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene7PixelGlasses />
        </section>

        {/* Scene 8: Creation Hands */}
        <section
          ref={(el) => { sceneRefs.current[8] = el; }}
          id="scene-8"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene8CreationHands />
        </section>

        {/* Scene 9: Retro OS Cascade (PORTFOLIO.EXE) */}
        <section
          ref={(el) => { sceneRefs.current[9] = el; }}
          id="scene-9"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene9RetroOSCascade onOpenProjectsModal={() => setProjectsModalOpen(true)} />
        </section>

        {/* Scene 10: Interactive Tetris Contact */}
        <section
          ref={(el) => { sceneRefs.current[10] = el; }}
          id="scene-10"
          className="min-h-screen border-b border-[#18181B] flex items-center"
        >
          <Scene10TetrisContact />
        </section>

        {/* Scene 11: Pixel Globe Footer */}
        <section
          ref={(el) => { sceneRefs.current[11] = el; }}
          id="scene-11"
          className="min-h-screen flex items-center"
        >
          <Scene11PixelGlobeFooter />
        </section>
      </main>

    </div>
  );
}
