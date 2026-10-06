import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeroHeader: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto text-center pt-8 sm:pt-14 pb-6 sm:pb-8 px-4 select-none">
      
      {/* 1. Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] sm:text-xs font-mono font-medium tracking-widest uppercase mb-4 sm:mb-6 shadow-sm shadow-indigo-500/10">
        <Sparkles className="w-3.5 h-3.5" />
        <span>EXPERIENCIA INTERACTIVA</span>
      </div>

      {/* 2. Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-4 sm:mb-6">
        Explora cómo funciona.
      </h1>

      {/* 3. Subheadline */}
      <p className="text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
        No te contamos cómo funciona. <span className="text-white font-medium underline decoration-indigo-500/50 underline-offset-4">Pruébalo.</span>
      </p>

    </div>
  );
};
