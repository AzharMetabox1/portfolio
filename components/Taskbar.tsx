'use client';

import { useEffect, useState } from 'react';
import { useDesktopStore, WindowId } from '@/lib/store';

const START_MENU_ITEMS: { label: string; id: WindowId; icon: string }[] = [
  { label: 'README.txt', id: 'readme', icon: '📄' },
  { label: 'My Projects', id: 'my-projects', icon: '📁' },
  { label: 'System Properties', id: 'system-properties', icon: '⚙️' },
  { label: 'Internet Mail', id: 'internet-mail', icon: '📧' },
];

export default function Taskbar() {
  const { windows, openWindow, restoreWindow, bringToFront } = useDesktopStore();
  const [clock, setClock] = useState('');
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const openItems = Object.values(windows).filter(
    (w) => w.isOpen
  );

  const handleTaskbarItem = (id: WindowId) => {
    const win = windows[id];
    if (win.isMinimized) {
      restoreWindow(id);
    } else {
      bringToFront(id);
    }
  };

  const handleStartItem = (id: WindowId) => {
    openWindow(id);
    setStartOpen(false);
  };

  return (
    <>
      {/* Start Menu Popup */}
      {startOpen && (
        <div
          className="win98-start-menu"
          style={{ position: 'fixed', bottom: 40, left: 0, zIndex: 9999 }}
        >
          <div className="win98-start-menu-sidebar">
            <span>Windows 98</span>
          </div>
          <div className="win98-start-menu-items">
            {START_MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                className="win98-start-menu-item"
                onClick={() => handleStartItem(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <div className="win98-start-menu-divider" />
            <button className="win98-start-menu-item" onClick={() => setStartOpen(false)}>
              <span>🚪</span>
              <span>Shut Down...</span>
            </button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div
        className="win98-taskbar"
        onClick={() => setStartOpen(false)}
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9000 }}
      >
        {/* Start Button */}
        <button
          className={`win98-start-btn ${startOpen ? 'win98-start-btn-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen((v) => !v);
          }}
        >
          <span className="win98-start-logo">🪟</span>
          <span>Start</span>
        </button>

        {/* Divider */}
        <div className="win98-taskbar-divider" />

        {/* Open Window Buttons */}
        <div className="win98-taskbar-items">
          {openItems.map((win) => (
            <button
              key={win.id}
              className={`win98-taskbar-item ${!win.isMinimized ? 'win98-taskbar-item-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleTaskbarItem(win.id);
              }}
            >
              {win.title}
            </button>
          ))}
        </div>

        {/* Clock */}
        <div className="win98-clock">
          {clock}
        </div>
      </div>
    </>
  );
}
