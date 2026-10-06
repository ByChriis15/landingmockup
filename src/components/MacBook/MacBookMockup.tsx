import React from 'react';
import type { ReactNode } from 'react';

interface MacBookMockupProps {
  children: ReactNode;
  activeStepNumber?: string;
  isAutoTouring?: boolean;
}

export const MacBookMockup: React.FC<MacBookMockupProps> = ({
  children,
  activeStepNumber = '01',
  isAutoTouring = false,
}) => {
  return (
    <div className="relative w-full max-w-[1240px] mx-auto select-none transition-all duration-500 ease-out">
      {/* Ambient background glow behind MacBook */}
      <div 
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-4/5 h-[340px] rounded-full blur-[120px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 80%)'
        }}
      />

      {/* Outer MacBook Screen Enclosure (Lid) */}
      <div className="relative mx-auto w-full rounded-[24px] p-[10px] sm:p-[12px] md:p-[14px] macbook-chassis border border-neutral-700/60 transition-transform duration-300">
        
        {/* Metal Chamfer Bevel Ring */}
        <div className="relative w-full rounded-[18px] p-[2px] bg-gradient-to-b from-neutral-600/40 via-neutral-800/30 to-neutral-900/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          
          {/* Black Glass Display Bezel */}
          <div className="relative w-full rounded-[16px] overflow-hidden macbook-screen-bezel aspect-[16/10] min-h-[480px] sm:min-h-[540px] md:min-h-[600px] flex flex-col">
            
            {/* Top Bezel Notch / Camera Housing */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
              <div className="w-[140px] sm:w-[170px] md:w-[200px] h-[16px] sm:h-[18px] md:h-[22px] macbook-camera-notch flex items-center justify-center gap-2 border-b border-x border-neutral-800/80 shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {/* Camera Lens */}
                <div className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-[#0a0d14] border border-neutral-700 flex items-center justify-center shadow-inner">
                  <div className="w-[2px] h-[2px] rounded-full bg-blue-900/90" />
                </div>
                {/* Green Activity LED (glows subtly when active) */}
                <div 
                  className={`w-[3px] h-[3px] rounded-full transition-colors duration-500 ${
                    isAutoTouring 
                      ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' 
                      : 'bg-emerald-500/50 shadow-[0_0_4px_rgba(16,185,129,0.3)]'
                  }`}
                  title="Pulse System Sensor Active"
                />
                {/* Subtle Mic sensor port */}
                <div className="w-[2px] h-[2px] rounded-full bg-neutral-800" />
              </div>
            </div>

            {/* Subtle Screen Reflection Glare Overlay (pointer-events-none so it doesn't block clicks) */}
            <div className="absolute inset-0 macbook-glare pointer-events-none z-20 mix-blend-screen opacity-40" />

            {/* Inner Interactive Web Application Screen */}
            <div className="relative w-full h-full overflow-hidden bg-[#0c0d12] flex flex-col z-10">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* MacBook Bottom Base / Hinge & Lip */}
      <div className="relative -mt-[3px] mx-auto w-[103%] -left-[1.5%] h-[14px] sm:h-[18px] md:h-[22px] macbook-base rounded-b-[18px] md:rounded-b-[24px] flex items-start justify-center shadow-2xl">
        {/* Hinge recess line */}
        <div className="w-[45%] h-[2px] bg-black/60 rounded-full mx-auto" />
        
        {/* Thumb Opening Notch / Lip Cutout */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] sm:w-[130px] md:w-[170px] h-[5px] sm:h-[6px] md:h-[8px] macbook-lip rounded-b-[8px] border-b border-x border-neutral-700/40" />
      </div>

      {/* MacBook Surface Shadow Casting on the Desk */}
      <div className="relative mx-auto w-[96%] h-[24px] sm:h-[34px] md:h-[46px] -mt-[4px] macbook-table-shadow blur-md sm:blur-lg opacity-90 pointer-events-none" />

      {/* Subtle indicator caption underneath */}
      <div className="mt-2 text-center">
        <span className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-mono text-neutral-500 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>ENTORNO INTERACTIVO EN VIVO • PASO {activeStepNumber} / 05</span>
        </span>
      </div>
    </div>
  );
};
