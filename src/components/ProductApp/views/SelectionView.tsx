import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Network, 
  ShieldCheck, 
  Sparkles, 
  Zap 
} from 'lucide-react';
import { ARCHITECTURE_OPTIONS } from '../../../data/flowData';
import type { ArchitectureOption, SystemConfig } from '../../../types';

interface SelectionViewProps {
  config: SystemConfig;
  onUpdateConfig: (partial: Partial<SystemConfig>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const SelectionView: React.FC<SelectionViewProps> = ({
  config,
  onUpdateConfig,
  onNextStep,
  onPrevStep,
}) => {
  const selectedArch = ARCHITECTURE_OPTIONS.find((a) => a.id === config.architectureId) || ARCHITECTURE_OPTIONS[0];

  const handleSelect = (option: ArchitectureOption) => {
    onUpdateConfig({ architectureId: option.id });
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'stream-realtime':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'isolated-edge':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'mesh-global':
      default:
        return <Network className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-neutral-200">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              PASO 02 / 05 • ARQUITECTURA
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">Selección de Modelo de Ejecución</span>
          </div>
          <h1 className="text-base sm:text-xl font-semibold tracking-tight text-white mt-1">
            Selecciona la Topología de tu Infraestructura
          </h1>
        </div>

        <div className="text-xs text-neutral-400 font-mono">
          Seleccionado: <span className="text-white font-medium">{selectedArch.title}</span>
        </div>
      </div>

      {/* Grid of 3 Selectable Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ARCHITECTURE_OPTIONS.map((option) => {
          const isSelected = option.id === config.architectureId;

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`relative cursor-pointer rounded-xl p-4 transition-all duration-200 flex flex-col justify-between border ${
                isSelected
                  ? 'bg-neutral-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/90'
              }`}
            >
              {/* Top Card Bar */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-neutral-800/80 border border-neutral-700/60">
                    {getIcon(option.id)}
                  </div>

                  <div className="flex items-center gap-2">
                    {option.recommended && (
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {option.badge}
                      </span>
                    )}
                    {!option.recommended && (
                      <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                        {option.badge}
                      </span>
                    )}

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected 
                        ? 'bg-indigo-600 border-indigo-400 text-white' 
                        : 'border-neutral-700 bg-neutral-800/50 text-transparent'
                    }`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">
                  {option.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                  {option.description}
                </p>
              </div>

              {/* Spec Pills inside card */}
              <div className="pt-3 border-t border-neutral-800/70 space-y-1.5 text-[11px] font-mono">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Latencia objetivo:</span>
                  <span className="text-emerald-400 font-semibold">{option.latency}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Redundancia:</span>
                  <span className="text-neutral-200">{option.redundancy}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Estimado:</span>
                  <span className="text-white">${option.costPerHour.toFixed(2)} / hr</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Inspector of the Chosen Architecture */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium text-white flex items-center gap-2">
              <span>{selectedArch.title}</span>
              <span className="text-[10px] font-mono text-emerald-400">Listo para configurar</span>
            </div>
            <div className="text-neutral-400 text-[11px]">
              {selectedArch.compute} • {selectedArch.tier}
            </div>
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 sm:text-right font-mono">
          Presupuesto base: <span className="text-white font-semibold">${selectedArch.costPerHour}/h</span>
        </div>
      </div>

      {/* Bottom Step Navigation Action Buttons */}
      <div className="pt-2 flex items-center justify-between border-t border-neutral-800/60">
        <button
          onClick={onPrevStep}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </button>

        <button
          onClick={onNextStep}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all"
        >
          <span>Paso 03: Ajustar Configuración</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
