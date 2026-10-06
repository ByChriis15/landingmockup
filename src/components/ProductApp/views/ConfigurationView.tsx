import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  ShieldAlert, 
  Sliders, 
  Zap 
} from 'lucide-react';
import { ARCHITECTURE_OPTIONS } from '../../../data/flowData';
import type { SystemConfig } from '../../../types';

interface ConfigurationViewProps {
  config: SystemConfig;
  onUpdateConfig: (partial: Partial<SystemConfig>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const ConfigurationView: React.FC<ConfigurationViewProps> = ({
  config,
  onUpdateConfig,
  onNextStep,
  onPrevStep,
}) => {
  const selectedArch = ARCHITECTURE_OPTIONS.find((a) => a.id === config.architectureId) || ARCHITECTURE_OPTIONS[0];

  // Calculated reactive metrics based on slider & toggles
  const estimatedHourlyCost = (selectedArch.costPerHour * config.maxReplicas * (config.enableEdgeCache ? 1.15 : 1)).toFixed(2);
  const estimatedLatency = config.enableEdgeCache ? '9.4 ms' : '14.8 ms';
  const estimatedThroughput = `${(config.maxReplicas * 18.5).toFixed(0)}k req/s`;

  return (
    <div className="h-full w-full flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-neutral-200">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              PASO 03 / 05 • CONFIGURACIÓN
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">Parámetros de Escalabilidad & Red</span>
          </div>
          <h1 className="text-base sm:text-xl font-semibold tracking-tight text-white mt-1">
            Configuración Granular del Despliegue
          </h1>
        </div>

        <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Cálculo Reactivo en Vivo</span>
        </div>
      </div>

      {/* Main 2-Column Split: Form on Left, Reactive Live Spec Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          
          {/* Control 1: Cluster Name & Region */}
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                Región Primaria de Despliegue
              </label>
              <span className="text-[11px] font-mono text-neutral-500">BGP Anycast</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'us-east-1 (N. Virginia)', label: 'us-east-1', sub: 'Virginia' },
                { id: 'eu-central-1 (Frankfurt)', label: 'eu-central-1', sub: 'Frankfurt' },
                { id: 'ap-northeast-1 (Tokyo)', label: 'ap-northeast-1', sub: 'Tokyo' },
              ].map((reg) => (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => onUpdateConfig({ region: reg.id })}
                  className={`p-2 rounded-lg text-left transition-all border text-xs ${
                    config.region === reg.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium shadow-sm'
                      : 'bg-neutral-800/40 border-neutral-750 text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                  }`}
                >
                  <div className="font-mono font-medium text-[11px] truncate">{reg.label}</div>
                  <div className="text-[10px] text-neutral-500 truncate">{reg.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Control 2: Elastic Autoscaling Slider */}
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Límite de Réplicas Elásticas (Auto-scale)
              </label>
              <span className="text-xs font-mono font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30">
                {config.maxReplicas} pods
              </span>
            </div>

            <div className="space-y-1">
              <input
                type="range"
                min="2"
                max="32"
                step="2"
                value={config.maxReplicas}
                onChange={(e) => onUpdateConfig({ maxReplicas: Number(e.target.value) })}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>Min: 2 réplicas</span>
                <span>Capacidad actual: {config.maxReplicas} réplicas</span>
                <span>Max: 32 réplicas</span>
              </div>
            </div>
          </div>

          {/* Control 3: Interactive Toggles (Failover & Edge Cache) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Toggle 1: Edge Cache */}
            <div 
              onClick={() => onUpdateConfig({ enableEdgeCache: !config.enableEdgeCache })}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                config.enableEdgeCache
                  ? 'bg-neutral-900 border-indigo-500/80'
                  : 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
              }`}
            >
              <div>
                <div className="text-xs font-medium text-white flex items-center gap-1.5">
                  <Zap className={`w-3.5 h-3.5 ${config.enableEdgeCache ? 'text-amber-400' : 'text-neutral-500'}`} />
                  Caché Perimetral
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  {config.enableEdgeCache ? 'Latencia sub-10ms activa' : 'Sin optimización L1'}
                </div>
              </div>
              <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${
                config.enableEdgeCache ? 'bg-indigo-600' : 'bg-neutral-700'
              }`}>
                <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                  config.enableEdgeCache ? 'translate-x-3.5' : 'translate-x-0'
                }`} />
              </div>
            </div>

            {/* Toggle 2: Autonomous Failover */}
            <div 
              onClick={() => onUpdateConfig({ enableFailover: !config.enableFailover })}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                config.enableFailover
                  ? 'bg-neutral-900 border-emerald-500/80'
                  : 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
              }`}
            >
              <div>
                <div className="text-xs font-medium text-white flex items-center gap-1.5">
                  <ShieldAlert className={`w-3.5 h-3.5 ${config.enableFailover ? 'text-emerald-400' : 'text-neutral-500'}`} />
                  Auto-Failover
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  {config.enableFailover ? 'Conmutación en <150ms' : 'Conmutación manual'}
                </div>
              </div>
              <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${
                config.enableFailover ? 'bg-emerald-600' : 'bg-neutral-700'
              }`}>
                <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                  config.enableFailover ? 'translate-x-3.5' : 'translate-x-0'
                }`} />
              </div>
            </div>
          </div>

          {/* Control 4: Environment Selector */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
            <span className="text-neutral-300 font-medium">Entorno:</span>
            <div className="flex items-center gap-1.5">
              {(['production', 'staging', 'canary'] as const).map((env) => (
                <button
                  key={env}
                  type="button"
                  onClick={() => onUpdateConfig({ environment: env })}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize transition-all ${
                    config.environment === env
                      ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Spec & Performance Estimator (5 cols) */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Resumen Dinámico
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Sincronizado
              </span>
            </div>

            <div className="mt-3 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Topología:</span>
                <span className="text-white font-medium">{selectedArch.title}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Región Activa:</span>
                <span className="font-mono text-neutral-200">{config.region.split(' ')[0]}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Latencia Proyectada:</span>
                <span className="font-mono text-emerald-400 font-semibold">{estimatedLatency}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Rendimiento Máximo:</span>
                <span className="font-mono text-indigo-300 font-semibold">{estimatedThroughput}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Presupuesto Estimado:</span>
                <span className="font-mono text-white font-bold">${estimatedHourlyCost} / hr</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-[11px] text-neutral-300 leading-relaxed">
            <span className="text-indigo-400 font-semibold">Garantía Zero-Downtime:</span> La configuración seleccionada permite desplegar sin degradación del servicio ni cortes de conexión activa.
          </div>
        </div>

      </div>

      {/* Bottom Step Navigation Action Buttons */}
      <div className="pt-2 flex items-center justify-between border-t border-neutral-800/60">
        <button
          onClick={onPrevStep}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Selección</span>
        </button>

        <button
          onClick={onNextStep}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all"
        >
          <span>Paso 04: Validar Pre-vuelo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
