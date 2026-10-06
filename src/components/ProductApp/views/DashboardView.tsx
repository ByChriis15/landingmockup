import React from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  Cpu, 
  Globe2, 
  Plus, 
  Server, 
  Zap,
  TrendingDown
} from 'lucide-react';
import type { SystemConfig } from '../../../types';

interface DashboardViewProps {
  onNextStep: () => void;
  config: SystemConfig;
  onOpenCommandPalette: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  onNextStep,
  config,
  onOpenCommandPalette
}) => {
  return (
    <div className="h-full w-full flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-neutral-200">
      
      {/* Top Banner / Welcome & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              Clúster de Infraestructura Global
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v4.8 • ESTABLE
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Monitoreo autónomo de nodos distribuidos y pipelines de orquestación.
          </p>
        </div>

        {/* Primary Flow Trigger CTA */}
        <button
          onClick={onNextStep}
          className="group relative inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs sm:text-sm font-medium shadow-lg shadow-indigo-600/25 transition-all duration-200"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
          <span>Configurar Nuevo Despliegue</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Real-time Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        
        {/* Metric 1: Latency */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider">Latencia P99</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-2xl font-bold font-mono text-white tracking-tight">14.2 ms</span>
            <span className="text-[10px] sm:text-xs text-emerald-400 font-mono flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -2.1ms
            </span>
          </div>
          <div className="mt-2 text-[10px] text-neutral-400 truncate">
            Enrutamiento Anycast optimizado
          </div>
        </div>

        {/* Metric 2: Autonomous Throughput */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider">Throughput QPS</span>
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-2xl font-bold font-mono text-white tracking-tight">284.5k</span>
            <span className="text-[10px] sm:text-xs text-emerald-400 font-mono">+12.4%</span>
          </div>
          <div className="mt-2 text-[10px] text-neutral-400 truncate">
            Carga distribuida en 18 POPs
          </div>
        </div>

        {/* Metric 3: Active Nodes */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider">Nodos Activos</span>
            <Server className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-2xl font-bold font-mono text-white tracking-tight">48 / 48</span>
            <span className="text-[10px] sm:text-xs text-emerald-400 font-mono">100% OK</span>
          </div>
          <div className="mt-2 text-[10px] text-neutral-400 truncate">
            Auto-recuperación activa
          </div>
        </div>

        {/* Metric 4: Efficiency SLA */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between text-neutral-400 mb-1.5">
            <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider">Disponibilidad SLA</span>
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-2xl font-bold font-mono text-white tracking-tight">99.998%</span>
            <span className="text-[10px] sm:text-xs text-neutral-400 font-mono">30d</span>
          </div>
          <div className="mt-2 text-[10px] text-neutral-400 truncate">
            Cero caídas no programadas
          </div>
        </div>

      </div>

      {/* Interactive Main Action Card / Pipeline Teaser */}
      <div className="p-4 sm:p-4.5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-neutral-900/90 to-purple-950/30 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            Flujo de Aprovisionamiento Guiado
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-white">
            Despliega un nuevo clúster autónomo con tolerancia a fallas
          </h2>
          <p className="text-xs text-neutral-400 max-w-xl">
            Sigue los pasos interactivos para seleccionar topología, afinar réplicas elásticas y auditar la seguridad antes del lanzamiento.
          </p>
        </div>

        <button
          onClick={onNextStep}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-semibold transition-all shrink-0 active:scale-95 shadow-md shadow-white/5"
        >
          <span>Paso 02: Seleccionar Arquitectura</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Pipelines & Services List */}
      <div className="rounded-xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-800/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Servicios en Ejecución
          </span>
          <button 
            onClick={onOpenCommandPalette}
            className="text-[11px] text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Buscar con</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-neutral-800 rounded border border-neutral-700">⌘K</kbd>
          </button>
        </div>

        <div className="divide-y divide-neutral-800/50 text-xs">
          {/* Row 1 */}
          <div className="p-3 sm:px-4 sm:py-3.5 flex items-center justify-between hover:bg-neutral-800/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <div className="font-medium text-white flex items-center gap-2">
                  <span>edge-gateway-router</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 font-mono">us-east-1</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">18 réplicas activas • Latencia 11ms</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono hidden sm:inline-block">Saludable</span>
              <span className="text-[11px] text-neutral-500 font-mono">hace 2m</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="p-3 sm:px-4 sm:py-3.5 flex items-center justify-between hover:bg-neutral-800/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <div className="font-medium text-white flex items-center gap-2">
                  <span>inference-pipeline-v2</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 font-mono">eu-central-1</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">32 workers • 8.4ms P99</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono hidden sm:inline-block">Saludable</span>
              <span className="text-[11px] text-neutral-500 font-mono">hace 8m</span>
            </div>
          </div>

          {/* Row 3 - Clickable to advance flow */}
          <div 
            onClick={onNextStep}
            className="p-3 sm:px-4 sm:py-3.5 flex items-center justify-between bg-indigo-950/20 hover:bg-indigo-950/40 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <div>
                <div className="font-medium text-indigo-200 group-hover:text-white transition-colors flex items-center gap-2">
                  <span>{config.clusterName}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">Pendiente de Configuración</span>
                </div>
                <div className="text-[11px] text-neutral-400">Click para seleccionar topología y continuar</div>
              </div>
            </div>
            <span className="text-indigo-400 text-xs font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Configurar →
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
