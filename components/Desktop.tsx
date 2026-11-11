'use client';

import { useDesktopStore, WindowId } from '@/lib/store';

const desktopIcons: { id: WindowId; icon: string; label: string }[] = [
  { id: 'readme', icon: '📄', label: 'README.txt' },
  { id: 'my-projects', icon: '📁', label: 'My Projects' },
  { id: 'system-properties', icon: '⚙️', label: 'System\nProperties.exe' },
  { id: 'internet-mail', icon: '📧', label: 'Internet\nMail.exe' },
];

export default function Desktop() {
  const { openWindow } = useDesktopStore();

  return (
    <div className="win98-desktop">
      {/* Desktop Icons */}
      <div className="win98-desktop-icons-col">
        {desktopIcons.map((icon) => (
          <button
            key={icon.id}
            className="win98-desktop-icon"
            onDoubleClick={() => openWindow(icon.id)}
            title={`Double-click to open ${icon.label}`}
          >
            <span className="win98-desktop-icon-img">{icon.icon}</span>
            <span className="win98-desktop-icon-label">{icon.label}</span>
          </button>
        ))}
      </div>

      {/* Decorative desktop art */}
      <div className="win98-desktop-watermark">
        <div>🖥️</div>
        <div>Alex Morgan OS</div>
        <div>Version 2026</div>
      </div>
    </div>
  );
}
