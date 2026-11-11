'use client';

import { create } from 'zustand';

export type WindowId =
  | 'readme'
  | 'my-projects'
  | 'system-properties'
  | 'internet-mail'
  | 'project-1'
  | 'project-2'
  | 'project-3';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

interface DesktopStore {
  windows: Record<WindowId, WindowState>;
  topZIndex: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  bringToFront: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
}

const initialWindows: Record<WindowId, WindowState> = {
  readme: {
    id: 'readme',
    title: 'README.txt - Notepad',
    isOpen: true,
    isMinimized: false,
    zIndex: 10,
    defaultPosition: { x: 80, y: 60 },
    defaultSize: { width: 520, height: 340 },
  },
  'my-projects': {
    id: 'my-projects',
    title: 'My Projects',
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    defaultPosition: { x: 180, y: 100 },
    defaultSize: { width: 480, height: 360 },
  },
  'system-properties': {
    id: 'system-properties',
    title: 'System Properties',
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    defaultPosition: { x: 240, y: 80 },
    defaultSize: { width: 420, height: 400 },
  },
  'internet-mail': {
    id: 'internet-mail',
    title: 'Internet Mail',
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    defaultPosition: { x: 140, y: 120 },
    defaultSize: { width: 500, height: 440 },
  },
  'project-1': {
    id: 'project-1',
    title: 'Project: DevFlow',
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    defaultPosition: { x: 200, y: 90 },
    defaultSize: { width: 460, height: 320 },
  },
  'project-2': {
    id: 'project-2',
    title: 'Project: PixelShop',
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    defaultPosition: { x: 230, y: 110 },
    defaultSize: { width: 460, height: 320 },
  },
  'project-3': {
    id: 'project-3',
    title: 'Project: ChronoTask',
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    defaultPosition: { x: 260, y: 130 },
    defaultSize: { width: 460, height: 320 },
  },
};

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: initialWindows,
  topZIndex: 10,

  openWindow: (id) => {
    const { topZIndex } = get();
    const newZ = topZIndex + 1;
    set((state) => ({
      topZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
        },
      },
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false, isMinimized: false },
      },
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
    }));
  },

  restoreWindow: (id) => {
    const { topZIndex } = get();
    const newZ = topZIndex + 1;
    set((state) => ({
      topZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: false,
          isOpen: true,
          zIndex: newZ,
        },
      },
    }));
  },

  bringToFront: (id) => {
    const { topZIndex } = get();
    const newZ = topZIndex + 1;
    set((state) => ({
      topZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: newZ },
      },
    }));
  },

  maximizeWindow: (id) => {
    // For simplicity, maximizing just brings it to front in this implementation
    const { bringToFront } = get();
    bringToFront(id);
  },
}));
