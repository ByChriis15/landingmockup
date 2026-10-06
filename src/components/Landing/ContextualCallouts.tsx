import React from 'react';
import { 
  Activity, 
  CheckCircle, 
  Cpu, 
  Layers, 
  Radio, 
  ShieldCheck, 
  Sliders, 
  Sparkles, 
  Zap 
} from 'lucide-react';
import { FLOW_STEPS } from '../../data/flowData';
import type { StepId } from '../../types';

interface ContextualCalloutsProps {
  currentStep: StepId;
}

export const ContextualCallouts: React.FC<ContextualCalloutsProps> = ({ currentStep }) => {
  const step = FLOW_STEPS.find((s) => s.id === currentStep) || FLOW_STEPS[0];

  // Specific floating annotations per step
  const annotationsByStep: Record<StepId, { label: string; detail: string; icon: React.ReactNode }[]> = {
    dashboard: [
      { label: 'Gestión Centralizada', detail: 'Consola unificada para 18 regiones globales', icon: <Layers className="w-3.5 h-3.5 text-indigo-400" /> },
      { label: 'Telemetría P99', detail: 'Monitoreo sub-milisegundo en tiempo real', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
      { label: 'Health Autocurativo', detail: 'Detección y reemplazo autónomo de fallos', icon: <Activity className="w-3.5 h-3.5 text-emerald-400" /> },
    ],
    selection: [
      { label: 'Topología Modular', detail: 'Plantillas auditadas de baja latencia', icon: <Cpu className="w-3.5 h-3.5 text-indigo-400" /> },
      { label: 'Zero-Trust VPC', detail: 'Aislamiento de red SOC2 Tipo II', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> },
      { label: 'Escalado Elástico', detail: 'Hasta 10,000 requests por segundo base', icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" /> },
    ],
    configuration: [
      { label: 'Ajuste Dinámico', detail: 'Cálculo reactivo de costos por hora', icon: <Sliders className="w-3.5 h-3.5 text-indigo-400" /> },
      { label: 'Caché Perimetral L1', detail: 'Reducción de latencia a <10ms en borde', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
      { label: 'Failover Autónomo', detail: 'Conmutación en menos de 150 milisegundos', icon: <Radio className="w-3.5 h-3.5 text-emerald-400" /> },
    ],
    confirmation: [
      { label: 'Auditoría Pre-vuelo', detail: 'Validación estricta de políticas IAM y cuotas', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> },
      { label: 'Infraestructura como Código', detail: 'Manifiesto YAML generado y firmado', icon: <Layers className="w-3.5 h-3.5 text-indigo-400" /> },
      { label: 'Cero Riesgo de Caída', detail: 'Despliegues blue-green sin downtime', icon: <CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> },
    ],
    result: [
      { label: 'Tráfico en Producción', detail: 'Rutas DNS Anycast activas globalmente', icon: <Radio className="w-3.5 h-3.5 text-emerald-400" /> },
      { label: 'Streaming de Logs', detail: 'Conexión WebSocket viva a cada nodo', icon: <Activity className="w-3.5 h-3.5 text-indigo-400" /> },
      { label: 'Simulación Sintética', detail: 'Inyección de pruebas de carga en vivo', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
    ],
  };

  const currentAnnotations = annotationsByStep[currentStep];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 my-2 select-none">
      
      {/* Dynamic Contextual Text Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-indigo-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            {step.eyebrow}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
            {step.contextualTitle}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            {step.contextualDesc}
          </p>
        </div>

        {/* Step Badge */}
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
            <Sparkles className="w-3.5 h-3.5" />
            {step.badge}
          </span>
        </div>
      </div>

      {/* Product Tour Feature Pills around the device */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {currentAnnotations.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700/80 transition-all flex items-start gap-2.5 group"
          >
            <div className="p-1.5 rounded-lg bg-neutral-800/80 group-hover:bg-neutral-800 border border-neutral-700/50 shrink-0">
              {item.icon}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                {item.label}
              </div>
              <div className="text-[11px] text-neutral-400 truncate">
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
