'use client';

const skills = {
  'Frontend Memory': [
    'React 19',
    'Next.js 16',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Redux / Zustand',
    'HTML5 / CSS3',
  ],
  'Backend Processors': [
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'Prisma ORM',
    'REST APIs',
    'GraphQL',
  ],
  'System Tools': [
    'Git & GitHub',
    'Docker',
    'AWS (EC2, S3, Lambda)',
    'Vercel',
    'CI/CD (GitHub Actions)',
    'Linux / Bash',
    'Figma',
  ],
};

const SKILL_COLORS: Record<string, string> = {
  'Frontend Memory': '#000080',
  'Backend Processors': '#800000',
  'System Tools': '#006400',
};

export default function SystemPropertiesContent() {
  return (
    <div className="win98-sysinfo">
      {/* System Banner */}
      <div className="win98-sysinfo-banner">
        <div className="win98-sysinfo-banner-logo">
          <span style={{ fontSize: 32 }}>💻</span>
        </div>
        <div>
          <div className="win98-sysinfo-name">Alex Morgan OS</div>
          <div className="win98-sysinfo-version">Version 2026.11 &nbsp; © Portfolio Corp.</div>
        </div>
      </div>

      <div style={{ padding: '0 8px 8px' }}>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 8 }}>
            <div className="win98-sysinfo-category" style={{ color: SKILL_COLORS[category] }}>
              {category}
            </div>
            <div className="win98-panel win98-panel-inset" style={{ padding: '6px 8px' }}>
              <div className="win98-tags">
                {items.map((skill) => (
                  <span key={skill} className="win98-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="win98-sysinfo-footer">
        <div className="win98-panel win98-panel-inset" style={{ padding: '4px 8px', margin: '0 8px 8px', fontSize: 11 }}>
          Available Memory: <strong>∞ Ideas</strong> &nbsp;|&nbsp;
          CPU: <strong>Coffee-Powered @ 9000MHz</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 8px 8px', gap: 6 }}>
          <button className="win98-btn">OK</button>
          <button className="win98-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}
