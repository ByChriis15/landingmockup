import React from 'react';
import { ArrowRight, CheckCircle2, Terminal } from 'lucide-react';

interface CtaSectionProps {
  onOpenDemoModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 sm:py-16 px-4 text-center">
      
      {/* Container */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-600/15 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-[11px] font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Acceso Inmediato a Sandbox
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Listo para elevar la confiabilidad de tu arquitectura?
          </h2>

          <p className="text-sm sm:text-base text-neutral-400">
            Únete a cientos de equipos de ingeniería que han reemplazado scripts frágiles de despliegue por una plataforma autónoma y determinística.
          </p>

          {/* Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-100 active:scale-95 text-neutral-950 font-semibold text-sm shadow-xl shadow-white/10 transition-all duration-200"
            >
              <span>Conocer el sistema</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#arquitectura"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-300 hover:text-white font-medium text-sm transition-all duration-200"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Ver Especificaciones Técnicas</span>
            </a>
          </div>

          {/* Trust bullet points */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-400 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 14 días de prueba completa
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sin tarjeta de crédito requerida
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cumplimiento SOC2 Tipo II
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};
