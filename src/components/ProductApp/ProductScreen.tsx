import React, { useState } from 'react';
import { 
  Activity, 
  ChevronRight, 
  Cpu, 
  LayoutDashboard, 
  Lock, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Search, 
  ShieldCheck, 
  Sliders, 
  Sparkles 
} from 'lucide-react';
import type { StepId, SystemConfig } from '../../types';
import { DashboardView } from './views/DashboardView';
import { SelectionView } from './views/SelectionView';
import { ConfigurationView } from './views/ConfigurationView';
import { ConfirmationView } from './views/ConfirmationView';
import { ResultView } from './views/ResultView';
import { CommandPaletteModal } from './modals/CommandPaletteModal';

interface ProductScreenProps {
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
  config: SystemConfig;
  onUpdateConfig: (partial: Partial<SystemConfig>) => void;
  onRestart: () => void;
  onToggleExpandMockup?: () => void;
  isExpanded?: boolean;
}

export const ProductScreen: React.FC<ProductScreenProps> = ({
  currentStep,
  onStepChange,
  config,
  onUpdateConfig,
  onRestart,
  onToggleExpandMockup,
  isExpanded = false,
}) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stepOrder: StepId[] = ['dashboard', 'selection', 'configuration', 'confirmation', 'result'];
  const currentIndex = stepOrder.indexOf(currentStep);

  const handleNextStep = () => {
    if (currentIndex < stepOrder.length - 1) {
      onStepChange(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevStep = () => {
    if (currentIndex > 0) {
      onStepChange(stepOrder[currentIndex - 1]);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  // URL path mapping per step
  const getUrlPath = () => {
    switch (currentStep) {
      case 'dashboard': return '/console/dashboard';
      case 'selection': return '/console/orchestrator/topology';
      case 'configuration': return '/console/orchestrator/scaling';
      case 'confirmation': return '/console/orchestrator/pre-flight';
      case 'result': return '/console/orchestrator/live-telemetry';
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0c0e14] text-neutral-100 overflow-hidden font-sans select-text">
      
      {/* Top OS Window Header & URL Bar */}
      <div className="h-10 sm:h-11 bg-[#13151c] border-b border-neutral-800/80 px-3 sm:px-4 flex items-center justify-between gap-2 shrink-0 select-none z-20">
        
        {/* Left: Window Traffic Lights */}
        <div className="flex items-center gap-2 w-20 sm:w-28 shrink-0">
          <div 
            onClick={onRestart}
            className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] cursor-pointer hover:opacity-80 transition-opacity" 
            title="Cerrar / Reiniciar flujo"
          />
          <div 
            onClick={handleRefresh}
            className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] cursor-pointer hover:opacity-80 transition-opacity" 
            title="Refrescar estado"
          />
          <div 
            onClick={onToggleExpandMockup}
            className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] cursor-pointer hover:opacity-80 transition-opacity" 
            title="Pantalla completa del dispositivo"
          />
        </div>

        {/* Center: Interactive Browser Address / Command Bar */}
        <div className="flex-1 max-w-lg mx-auto flex items-center gap-2">
          {/* Back/Forward buttons */}
          <div className="hidden sm:flex items-center gap-1 text-neutral-400">
            <button 
              onClick={handlePrevStep}
              disabled={currentIndex === 0}
              className="p-1 rounded hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Paso anterior"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            </button>
            <button 
              onClick={handleNextStep}
              disabled={currentIndex === stepOrder.length - 1}
              className="p-1 rounded hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Paso siguiente"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={handleRefresh}
              className={`p-1 rounded hover:bg-neutral-800 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
              title="Recargar"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Browser Address Bar with Lock & Latency */}
          <div 
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex-1 h-7 sm:h-7.5 px-2.5 sm:px-3 rounded-lg bg-neutral-900/90 border border-neutral-700/60 hover:border-neutral-600 flex items-center justify-between gap-2 cursor-pointer transition-colors shadow-xs group"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-mono text-neutral-300 truncate">
                <span className="text-neutral-500">https://</span>pulse.internal{getUrlPath()}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1 h-1 rounded-full bg-emerald-400" /> 14ms
              </span>
              <kbd className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 border border-neutral-700 text-neutral-400 group-hover:text-white">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center justify-end gap-1.5 w-20 sm:w-28 shrink-0 text-neutral-400">
          <button 
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-1.5 rounded-lg hover:text-white hover:bg-neutral-800 transition-colors"
            title="Abrir comandos"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={onToggleExpandMockup}
            className="p-1.5 rounded-lg hover:text-white hover:bg-neutral-800 transition-colors hidden sm:block"
            title={isExpanded ? "Reducir vista" : "Expandir vista"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
            P
          </div>
        </div>

      </div>

      {/* Main Container: Sidebar + Active View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Mini Rail */}
        <aside className="w-12 sm:w-14 bg-[#101217] border-r border-neutral-800/80 flex flex-col items-center py-3 justify-between shrink-0 select-none">
          {/* Top Logo / App icon */}
          <div className="flex flex-col items-center gap-3">
            <div 
              onClick={() => onStepChange('dashboard')}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 cursor-pointer hover:scale-105 transition-transform"
              title="Pulse Platform Core"
            >
              <Sparkles className="w-4 h-4" />
            </div>

            {/* Step icons for direct navigation */}
            <nav className="flex flex-col items-center gap-1.5 mt-2">
              <button
                onClick={() => onStepChange('dashboard')}
                className={`p-2 rounded-xl transition-all ${
                  currentStep === 'dashboard'
                    ? 'bg-indigo-600/25 text-indigo-400 border border-indigo-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
                title="Paso 01: Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>

              <button
                onClick={() => onStepChange('selection')}
                className={`p-2 rounded-xl transition-all ${
                  currentStep === 'selection'
                    ? 'bg-indigo-600/25 text-indigo-400 border border-indigo-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
                title="Paso 02: Selección"
              >
                <Cpu className="w-4 h-4" />
              </button>

              <button
                onClick={() => onStepChange('configuration')}
                className={`p-2 rounded-xl transition-all ${
                  currentStep === 'configuration'
                    ? 'bg-indigo-600/25 text-indigo-400 border border-indigo-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
                title="Paso 03: Configuración"
              >
                <Sliders className="w-4 h-4" />
              </button>

              <button
                onClick={() => onStepChange('confirmation')}
                className={`p-2 rounded-xl transition-all ${
                  currentStep === 'confirmation'
                    ? 'bg-indigo-600/25 text-indigo-400 border border-indigo-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
                title="Paso 04: Confirmación"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>

              <button
                onClick={() => onStepChange('result')}
                className={`p-2 rounded-xl transition-all ${
                  currentStep === 'result'
                    ? 'bg-indigo-600/25 text-indigo-400 border border-indigo-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
                title="Paso 05: Resultado"
              >
                <Activity className="w-4 h-4" />
              </button>
            </nav>
          </div>

          {/* Bottom Settings & Status */}
          <div className="flex flex-col items-center gap-2 text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Sistema conectado" />
          </div>
        </aside>

        {/* Viewport Content Area */}
        <main className={`flex-1 overflow-hidden transition-opacity duration-300 ${isRefreshing ? 'opacity-30' : 'opacity-100'}`}>
          {currentStep === 'dashboard' && (
            <DashboardView 
              onNextStep={handleNextStep} 
              config={config}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            />
          )}

          {currentStep === 'selection' && (
            <SelectionView 
              config={config} 
              onUpdateConfig={onUpdateConfig}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />
          )}

          {currentStep === 'configuration' && (
            <ConfigurationView 
              config={config} 
              onUpdateConfig={onUpdateConfig}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />
          )}

          {currentStep === 'confirmation' && (
            <ConfirmationView 
              config={config} 
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />
          )}

          {currentStep === 'result' && (
            <ResultView 
              config={config} 
              onRestart={onRestart}
            />
          )}
        </main>

      </div>

      {/* In-App Command Palette Modal */}
      <CommandPaletteModal 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectStep={onStepChange}
        onRestart={onRestart}
      />

    </div>
  );
};
