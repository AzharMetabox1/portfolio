'use client';

interface ProjectData {
  name: string;
  tech: string[];
  description: string;
  link: string;
  year: string;
  status: string;
}

const projects: Record<string, ProjectData> = {
  'project-1': {
    name: 'DevFlow',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    description:
      'A developer productivity platform that integrates GitHub, Jira, and Slack into a unified workflow dashboard — with AI-powered PR summaries and smart task prioritization.',
    link: 'https://github.com/alexmorgan/devflow',
    year: '2026',
    status: 'Active',
  },
  'project-2': {
    name: 'PixelShop',
    tech: ['React', 'Node.js', 'Stripe', 'MongoDB', 'Redis'],
    description:
      'A lightning-fast e-commerce storefront with server-side rendering, real-time inventory tracking, and a fully custom checkout flow powered by Stripe.',
    link: 'https://github.com/alexmorgan/pixelshop',
    year: '2025',
    status: 'Shipped',
  },
  'project-3': {
    name: 'ChronoTask',
    tech: ['React Native', 'Expo', 'Supabase', 'Zustand'],
    description:
      'A cross-platform mobile task manager with Pomodoro timer, habit tracking streaks, and offline-first sync via Supabase Realtime.',
    link: 'https://github.com/alexmorgan/chronotask',
    year: '2025',
    status: 'Shipped',
  },
};

interface ProjectContentProps {
  projectId: 'project-1' | 'project-2' | 'project-3';
}

export default function ProjectContent({ projectId }: ProjectContentProps) {
  const project = projects[projectId];
  if (!project) return null;

  return (
    <div className="win98-project-view">
      <div className="win98-project-header">
        <div className="win98-project-title">{project.name}</div>
        <div className="win98-project-meta">
          <span className="win98-badge">Year: {project.year}</span>
          <span className="win98-badge win98-badge-green">Status: {project.status}</span>
        </div>
      </div>

      <div className="win98-panel win98-panel-inset" style={{ margin: '8px', padding: '8px' }}>
        <div className="win98-label">📋 Description</div>
        <p className="win98-text">{project.description}</p>
      </div>

      <div className="win98-panel win98-panel-inset" style={{ margin: '8px', padding: '8px' }}>
        <div className="win98-label">🔧 Tech Stack</div>
        <div className="win98-tags">
          {project.tech.map((t) => (
            <span key={t} className="win98-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="win98-panel win98-panel-inset" style={{ margin: '8px', padding: '8px' }}>
        <div className="win98-label">🔗 Repository</div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="win98-link"
        >
          {project.link}
        </a>
      </div>

      <div className="win98-status-bar" style={{ margin: '8px 8px 0' }}>
        <span>Ready</span>
        <span>{project.tech.length} technologies used</span>
      </div>
    </div>
  );
}
