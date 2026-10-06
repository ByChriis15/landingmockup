import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  LayoutDashboard, 
  RotateCcw, 
  Search, 
  ShieldCheck, 
  Sliders, 
  X
} from 'lucide-react';
import type { StepId } from '../../../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStep: (stepId: StepId) => void;
  onRestart: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectStep,
  onRestart,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'dashboard', label: '01 / Ir al Dashboard General', desc: 'Métricas P99 y estado de clústeres', icon: <LayoutDashboard className="w-4 h-4 text-neutral-400" />, action: () => { onSelectStep('dashboard'); onClose(); } },
    { id: 'selection', label: '02 / Seleccionar Topología de Red', desc: 'Explorar plantillas y motores de ejecución', icon: <Cpu className="w-4 h-4 text-indigo-400" />, action: () => { onSelectStep('selection'); onClose(); } },
    { id: 'configuration', label: '03 / Ajustar Parámetros de Escalado', desc: 'Configurar réplicas y latencia objetivo', icon: <Sliders className="w-4 h-4 text-amber-400" />, action: () => { onSelectStep('configuration'); onClose(); } },
    { id: 'confirmation', label: '04 / Ejecutar Pre-vuelo y Auditoría', desc: 'Validar contratos y verificar mTLS', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, action: () => { onSelectStep('confirmation'); onClose(); } },
    { id: 'result', label: '05 / Ver Telemetría & Endpoints en Vivo', desc: 'Consultar logs y tráfico en tiempo real', icon: <Activity className="w-4 h-4 text-cyan-400" />, action: () => { onSelectStep('result'); onClose(); } },
    { id: 'restart', label: 'Reiniciar Demostración', desc: 'Restablecer todos los parámetros iniciales', icon: <RotateCcw className="w-4 h-4 text-neutral-400" />, action: () => { onRestart(); onClose(); } },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe una acción o comando (ej. 'Topología', 'Escalado')..."
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-64 overflow-y-auto p-2 space-y-1 text-xs">
          {filtered.length === 0 ? (
            <div className="py-6 text-center text-neutral-500">
              No se encontraron comandos coincidentes.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-800/80 flex items-center gap-3 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-neutral-800 group-hover:bg-neutral-700/80 transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white group-hover:text-indigo-300 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {item.desc}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-300">
                  Enter ↵
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 text-[10px] font-mono text-neutral-500 flex justify-between items-center">
          <span>Pulse Command Shell v4.8</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700">ESC</kbd> para cerrar
          </span>
        </div>
      </div>
    </div>
  );
};
