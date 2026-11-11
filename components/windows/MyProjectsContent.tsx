'use client';

import { useDesktopStore, WindowId } from '@/lib/store';

const projects: {
  id: WindowId;
  icon: string;
  label: string;
}[] = [
  { id: 'project-1', icon: '🔷', label: 'DevFlow' },
  { id: 'project-2', icon: '🛒', label: 'PixelShop' },
  { id: 'project-3', icon: '⏱️', label: 'ChronoTask' },
];

export default function MyProjectsContent() {
  const { openWindow } = useDesktopStore();

  return (
    <div className="win98-folder">
      <div className="win98-folder-status-bar">
        <span>3 object(s)</span>
      </div>
      <div className="win98-folder-icons">
        {projects.map((p) => (
          <button
            key={p.id}
            className="win98-desktop-icon"
            onDoubleClick={() => openWindow(p.id)}
          >
            <span className="win98-desktop-icon-img">{p.icon}</span>
            <span className="win98-desktop-icon-label">{p.label}</span>
          </button>
        ))}
      </div>
      <div className="win98-folder-hint">
        Double-click a project icon to open it
      </div>
    </div>
  );
}
