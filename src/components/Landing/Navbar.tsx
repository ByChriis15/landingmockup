import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenDemoModal: () => void;
  onScrollToDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal, onScrollToDemo }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#07080b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0c0e14] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="font-bold tracking-tight text-white text-base sm:text-lg flex items-center gap-1.5">
              PULSE <span className="text-neutral-500 font-mono text-xs font-normal">// CLOUD</span>
            </span>
          </a>

          {/* System status pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>99.999% SLA • OPERACIONAL</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-neutral-400">
          <button onClick={onScrollToDemo} className="hover:text-white transition-colors">
            Demostración en Vivo
          </button>
          <a href="#arquitectura" className="hover:text-white transition-colors">
            Arquitectura
          </a>
          <a href="#benchmarks" className="hover:text-white transition-colors">
            Benchmarks
          </a>
          <a href="#seguridad" className="hover:text-white transition-colors">
            Seguridad SOC2
          </a>
          <a href="#precios" className="hover:text-white transition-colors">
            Precios
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onScrollToDemo}
            className="text-xs font-medium text-neutral-300 hover:text-white hidden sm:block transition-colors"
          >
            Probar Mockup
          </button>

          <button
            onClick={onOpenDemoModal}
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white hover:bg-neutral-100 active:scale-95 text-neutral-950 text-xs sm:text-sm font-semibold shadow-md shadow-white/10 transition-all duration-200"
          >
            <span>Conocer el sistema</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
};
