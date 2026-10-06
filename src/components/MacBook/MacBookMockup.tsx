import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface MacBookMockupProps {
  children: ReactNode;
  activeStepNumber?: string;
  isAutoTouring?: boolean;
  deviceMode?: 'auto' | 'macbook' | 'phone';
}

export const MacBookMockup: React.FC<MacBookMockupProps> = ({
  children,
  activeStepNumber = '01',
  isAutoTouring = false,
  deviceMode = 'auto',
}) => {
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine whether to display as phone or laptop
  const isPhone = deviceMode === 'phone' || (deviceMode === 'auto' && isMobileScreen);

  return (
    <div 
      className={`relative mx-auto select-none transition-all duration-700 cubic-bezier(0.4,0,0.2,1) ${
        isPhone 
          ? 'w-full max-w-[365px] sm:max-w-[380px]' 
          : 'w-full max-w-[1240px]'
      }`}
    >
      {/* Ambient background glow behind device */}
      <div 
        className={`absolute -top-12 left-1/2 -translate-x-1/2 rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
          isPhone
            ? 'w-[280px] h-[280px] opacity-20'
            : 'w-4/5 h-[340px] opacity-25'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 80%)'
        }}
      />

      {/* Smartphone Physical Side Buttons (Visible when transforming to phone) */}
      <div 
        aria-hidden="true" 
        className={`transition-opacity duration-500 ${isPhone ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Left Side: Action Button */}
        <div className="absolute left-[-3.5px] top-[95px] w-[3.5px] h-[24px] phone-side-button rounded-l-xs z-30" />
        {/* Left Side: Volume Up */}
        <div className="absolute left-[-3.5px] top-[132px] w-[3.5px] h-[44px] phone-side-button rounded-l-xs z-30" />
        {/* Left Side: Volume Down */}
        <div className="absolute left-[-3.5px] top-[188px] w-[3.5px] h-[44px] phone-side-button rounded-l-xs z-30" />
        {/* Right Side: Power Button */}
        <div className="absolute right-[-3.5px] top-[140px] w-[3.5px] h-[60px] phone-side-button rounded-r-xs z-30" />
      </div>

      {/* Outer Device Chassis Enclosure */}
      <div 
        className={`relative mx-auto w-full macbook-chassis border border-neutral-700/60 transition-all duration-700 cubic-bezier(0.4,0,0.2,1) ${
          isPhone 
            ? 'rounded-[48px] sm:rounded-[52px] p-[10px] shadow-[0_28px_70px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.12)_inset]' 
            : 'rounded-[24px] p-[10px] sm:p-[12px] md:p-[14px]'
        }`}
      >
        {/* Subtle Smartphone Ear Speaker Slit */}
        <div 
          className={`absolute top-[4px] left-1/2 -translate-x-1/2 w-[52px] h-[2.5px] rounded-full bg-neutral-800 transition-opacity duration-500 z-40 ${
            isPhone ? 'opacity-100' : 'opacity-0'
          }`} 
        />
        
        {/* Metal Chamfer Bevel Ring */}
        <div 
          className={`relative w-full bg-gradient-to-b from-neutral-600/40 via-neutral-800/30 to-neutral-900/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-700 cubic-bezier(0.4,0,0.2,1) p-[2px] ${
            isPhone 
              ? 'rounded-[40px] sm:rounded-[44px]' 
              : 'rounded-[18px]'
          }`}
        >
          {/* Black Glass Display Bezel */}
          <div 
            className={`relative w-full overflow-hidden macbook-screen-bezel flex flex-col transition-all duration-700 cubic-bezier(0.4,0,0.2,1) ${
              isPhone
                ? 'rounded-[36px] sm:rounded-[40px] aspect-[9/19] min-h-[650px]'
                : 'rounded-[16px] aspect-[16/10] min-h-[480px] sm:min-h-[540px] md:min-h-[600px]'
            }`}
          >
            {/* Top Camera Housing / Notch (MacBook) ⟷ Dynamic Island (Smartphone) */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 z-30 flex items-center justify-center transition-all duration-700 cubic-bezier(0.4,0,0.2,1) ${
                isPhone
                  ? 'top-2.5 w-[110px] h-[26px] rounded-full dynamic-island border border-neutral-800/80 shadow-md gap-2.5 px-3'
                  : 'top-0 w-[140px] sm:w-[170px] md:w-[200px] h-[16px] sm:h-[18px] md:h-[22px] macbook-camera-notch rounded-b-[7px] border-b border-x border-neutral-800/80 shadow-[0_2px_4px_rgba(0,0,0,0.8)] gap-2'
              }`}
            >
              {/* Camera Lens */}
              <div className="w-[6px] h-[6px] rounded-full bg-[#0a0d14] border border-neutral-700 flex items-center justify-center shadow-inner">
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
              {/* Subtle Mic / FaceID sensor port */}
              <div className="w-[3px] h-[3px] rounded-full bg-neutral-800" />
            </div>

            {/* Subtle Screen Reflection Glare Overlay */}
            <div className="absolute inset-0 macbook-glare pointer-events-none z-20 mix-blend-screen opacity-40" />

            {/* Inner Interactive Web Application Screen (Always Functional) */}
            <div className="relative w-full h-full overflow-hidden bg-[#0c0d12] flex flex-col z-10">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* MacBook Bottom Base / Hinge & Lip (Fades out and collapses when morphing to Smartphone) */}
      <div 
        className={`relative mx-auto macbook-base rounded-b-[18px] md:rounded-b-[24px] flex items-start justify-center shadow-2xl transition-all duration-700 cubic-bezier(0.4,0,0.2,1) overflow-hidden ${
          isPhone
            ? 'h-0 opacity-0 max-h-0 scale-90 pointer-events-none -mt-0'
            : '-mt-[3px] w-[103%] -left-[1.5%] h-[14px] sm:h-[18px] md:h-[22px] opacity-100 scale-100'
        }`}
      >
        {/* Hinge recess line */}
        <div className="w-[45%] h-[2px] bg-black/60 rounded-full mx-auto" />
        
        {/* Thumb Opening Notch / Lip Cutout */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] sm:w-[130px] md:w-[170px] h-[5px] sm:h-[6px] md:h-[8px] macbook-lip rounded-b-[8px] border-b border-x border-neutral-700/40" />
      </div>

      {/* Ambient Surface Shadow Casting on the Desk */}
      <div 
        className={`relative mx-auto macbook-table-shadow pointer-events-none transition-all duration-700 cubic-bezier(0.4,0,0.2,1) ${
          isPhone
            ? 'w-[75%] h-[20px] blur-md -mt-[2px] opacity-75'
            : 'w-[96%] h-[24px] sm:h-[34px] md:h-[46px] -mt-[4px] blur-md sm:blur-lg opacity-90'
        }`} 
      />

      {/* Subtle indicator caption underneath */}
      <div className="mt-2 text-center transition-all duration-500">
        <span className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-mono text-neutral-500 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>
            {isPhone ? 'MODO SMARTPHONE' : 'MODO MACBOOK PRO'} • ENTORNO EN VIVO • PASO {activeStepNumber} / 05
          </span>
        </span>
      </div>
    </div>
  );
};
