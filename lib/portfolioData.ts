// Portfolio Projects Database for PORTFOLIO.EXE and Projects Drawer
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  metrics: string;
  tags: string[];
  color: string;
  pixelBadge: string;
  liveUrl: string;
  githubUrl: string;
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'HYPERPIXEL ENGINE',
    category: 'Creative Tech / Canvas',
    year: '2025',
    description: 'Hardware-accelerated 8-bit particle physics & voxel rendering pipeline running directly in the browser via WebGL and Web Workers.',
    metrics: '60 FPS @ 50k particles',
    tags: ['WebGL', 'TypeScript', 'Web Workers', 'Canvas2D'],
    color: '#B8FF01', // Acid lime
    pixelBadge: '⚡ CORE',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-2',
    title: 'SYNTHESIS OS',
    category: 'Web App / System UI',
    year: '2024',
    description: 'A nostalgic Web desktop environment inspired by classic 90s workstations, featuring draggable windows, file systems, and MIDI synthesizers.',
    metrics: '120k Monthly Users',
    tags: ['Next.js', 'Web Audio API', 'Tailwind', 'Zustand'],
    color: '#38BDF8', // Cyan
    pixelBadge: '💾 SYSTEM',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-3',
    title: 'NEURAL STRAND',
    category: 'Data Visualization / 3D',
    year: '2024',
    description: 'Interactive genomic sequence analyzer visualizing algorithmic CRISPR strands in real-time 8-bit procedural helix formations.',
    metrics: 'Nature Featured',
    tags: ['Three.js', 'React', 'KaTeX', 'GLSL'],
    color: '#EC4899', // Magenta
    pixelBadge: '🧬 BIO',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-4',
    title: 'ARCADE PROTOCOL',
    category: 'Multiplayer Gaming',
    year: '2023',
    description: 'Peer-to-peer retro arcade engine supporting cross-platform matchmaking, rollback netcode, and custom pixel-art level editors.',
    metrics: '<15ms Latency',
    tags: ['WebRTC', 'Rust / WASM', 'Canvas', 'Node.js'],
    color: '#EAB308', // Retro Gold
    pixelBadge: '👾 GAME',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'project-5',
    title: 'CHRONO DECK',
    category: 'Fintech / Dashboard',
    year: '2023',
    description: 'High-frequency algorithmic trading terminal with custom tactile keyboard shortcuts, CRT shaders, and instant telemetry charts.',
    metrics: '$40M+ Volume Handled',
    tags: ['React 19', 'Turbopack', 'WebSocket', 'D3.js'],
    color: '#A855F7', // Purple
    pixelBadge: '📊 TERMINAL',
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
  },
];
