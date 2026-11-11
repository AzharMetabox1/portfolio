'use client';

import { AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/lib/store';
import Window from '@/components/Window';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import ReadmeContent from '@/components/windows/ReadmeContent';
import MyProjectsContent from '@/components/windows/MyProjectsContent';
import SystemPropertiesContent from '@/components/windows/SystemPropertiesContent';
import InternetMailContent from '@/components/windows/InternetMailContent';
import ProjectContent from '@/components/windows/ProjectContent';

export default function DesktopOS() {
  const { windows } = useDesktopStore();

  return (
    <div className="win98-screen">
      {/* Desktop background + icons */}
      <Desktop />

      {/* Windows layer */}
      <AnimatePresence>
        {windows.readme.isOpen && !windows.readme.isMinimized && (
          <Window key="readme" id="readme">
            <ReadmeContent />
          </Window>
        )}
        {windows['my-projects'].isOpen && !windows['my-projects'].isMinimized && (
          <Window key="my-projects" id="my-projects">
            <MyProjectsContent />
          </Window>
        )}
        {windows['system-properties'].isOpen && !windows['system-properties'].isMinimized && (
          <Window key="system-properties" id="system-properties">
            <SystemPropertiesContent />
          </Window>
        )}
        {windows['internet-mail'].isOpen && !windows['internet-mail'].isMinimized && (
          <Window key="internet-mail" id="internet-mail">
            <InternetMailContent />
          </Window>
        )}
        {windows['project-1'].isOpen && !windows['project-1'].isMinimized && (
          <Window key="project-1" id="project-1">
            <ProjectContent projectId="project-1" />
          </Window>
        )}
        {windows['project-2'].isOpen && !windows['project-2'].isMinimized && (
          <Window key="project-2" id="project-2">
            <ProjectContent projectId="project-2" />
          </Window>
        )}
        {windows['project-3'].isOpen && !windows['project-3'].isMinimized && (
          <Window key="project-3" id="project-3">
            <ProjectContent projectId="project-3" />
          </Window>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
