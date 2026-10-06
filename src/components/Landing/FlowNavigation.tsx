import React from 'react';
import { Check, Pause, Play, RotateCcw } from 'lucide-react';
import { FLOW_STEPS } from '../../data/flowData';
import type { StepId } from '../../types';

interface FlowNavigationProps {
  currentStep: StepId;
  onSelectStep: (stepId: StepId) => void;
  isAutoTouring: boolean;
  onToggleAutoTour: () => void;
  onRestart: () => void;
}

export const FlowNavigation: React.FC<FlowNavigationProps> = ({
  currentStep,
  onSelectStep,
  isAutoTouring,
  onToggleAutoTour,
  onRestart,
}) => {
  const currentIdx = FLOW_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-3">
      
      {/* Step Pills Navigation Bar */}
      <div className="w-full p-1.5 sm:p-2 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 shadow-xl backdrop-blur-md flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5">
        {FLOW_STEPS.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isPassed = idx < currentIdx;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`flex-1 min-w-[120px] sm:min-w-0 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl transition-all duration-300 text-left flex items-center gap-2 group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-neutral-800 to-neutral-800/90 text-white shadow-md border border-neutral-700/80 ring-1 ring-indigo-500/30'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40 border border-transparent'
              }`}
            >
              {/* Step indicator circle */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40'
                    : isPassed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                }`}
              >
                {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : step.stepNumber}
              </div>

              {/* Title & Short description */}
              <div className="truncate min-w-0">
                <div className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                  {step.title}
                </div>
                <div className="text-[10px] text-neutral-500 font-mono hidden md:block truncate">
                  {step.shortDesc}
                </div>
              </div>

              {/* Active animated bottom glow line */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Auxiliary Controls: Auto-Tour Play/Pause + Restart */}
      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button
          onClick={onToggleAutoTour}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
            isAutoTouring
              ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 shadow-sm shadow-indigo-500/20'
              : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white'
          }`}
          title={isAutoTouring ? "Pausar tour automático" : "Iniciar recorrido guiado paso a paso"}
        >
          {isAutoTouring ? (
            <>
              <Pause className="w-3.5 h-3.5 text-indigo-400" />
              <span>Tour Automático Activo</span>
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping ml-1" />
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-neutral-400" />
              <span>Reproducir Tour Guiado</span>
            </>
          )}
        </button>

        <span className="text-neutral-700">•</span>

        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:text-neutral-200 transition-colors"
          title="Reiniciar flujo"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar</span>
        </button>
      </div>

    </div>
  );
};
