import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-neutral-800/80 bg-[#07080b] py-12 px-4 text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-white font-bold tracking-tight">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>PULSE // CLOUD PLATFORM</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="text-neutral-500 font-mono">
            © 2026 Pulse Systems, Inc. Todos los derechos reservados.
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 font-mono text-[11px] text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">Documentación</a>
          <a href="#" className="hover:text-white transition-colors">Estado de Red</a>
          <a href="#" className="hover:text-white transition-colors">Seguridad SOC2</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>TODOS LOS SISTEMAS OPERATIVOS</span>
        </div>

      </div>
    </footer>
  );
};
