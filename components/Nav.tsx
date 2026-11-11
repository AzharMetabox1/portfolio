'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <span className="nav-logo">AM.</span>
      <ul className="nav-links">
        {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map((s) => (
          <li key={s}>
            <a href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">Hire Me ↗</a>
    </nav>
  );
}
