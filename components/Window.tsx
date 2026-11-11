'use client';

import { useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useDesktopStore, WindowId } from '@/lib/store';

interface WindowProps {
  id: WindowId;
  children: React.ReactNode;
}

export default function Window({ id, children }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, bringToFront, maximizeWindow } =
    useDesktopStore();
  const win = windows[id];
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get viewport element as drag constraint
  }, []);

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      initial={{ x: win.defaultPosition.x, y: win.defaultPosition.y, opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.12 }}
      style={{
        position: 'fixed',
        zIndex: win.zIndex,
        width: win.defaultSize.width,
        minWidth: 280,
      }}
      className="win98-window"
      onMouseDown={() => bringToFront(id)}
    >
      {/* Title Bar */}
      <div
        className="win98-titlebar"
        onPointerDown={(e) => {
          dragControls.start(e);
        }}
        style={{ cursor: 'move', userSelect: 'none' }}
      >
        <span className="win98-titlebar-text">{win.title}</span>
        <div className="win98-titlebar-buttons">
          <button
            className="win98-btn win98-btn-sm"
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            title="Minimize"
          >
            _
          </button>
          <button
            className="win98-btn win98-btn-sm"
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            title="Maximize"
          >
            □
          </button>
          <button
            className="win98-btn win98-btn-sm win98-btn-close"
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar (decorative) */}
      <div className="win98-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
      </div>

      {/* Content */}
      <div
        className="win98-content"
        style={{ minHeight: win.defaultSize.height - 60 }}
      >
        {children}
      </div>
    </motion.div>
  );
}
