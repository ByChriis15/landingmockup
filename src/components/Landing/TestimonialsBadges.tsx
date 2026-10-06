import React from 'react';

export const TestimonialsBadges: React.FC = () => {
  const brands = [
    { name: 'KINETIC LABS', tag: 'AI Inference' },
    { name: 'NEXUS CLOUD', tag: 'Fintech Engine' },
    { name: 'AETHER SCALE', tag: 'Autonomous Mesh' },
    { name: 'CYBERDATA IO', tag: 'Zero-Trust Sec' },
    { name: 'HYPERION CORP', tag: 'Global Telecom' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 text-center select-none border-y border-neutral-800/60 my-8">
      <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
        INFRAESTRUCTURA CONFIADA POR LÍDERES EN SISTEMAS DISTRIBUIDOS
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70 hover:opacity-100 transition-opacity">
        {brands.map((b, i) => (
          <div key={i} className="flex items-center gap-2 text-neutral-400 font-mono text-xs sm:text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            <span className="font-bold tracking-wider text-neutral-300">{b.name}</span>
            <span className="text-[10px] text-neutral-600 px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 hidden sm:inline">
              {b.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
