import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Code, 
  FileCheck, 
  Loader2, 
  Rocket, 
  ShieldCheck 
} from 'lucide-react';
import { ARCHITECTURE_OPTIONS } from '../../../data/flowData';
import type { SystemConfig } from '../../../types';

interface ConfirmationViewProps {
  config: SystemConfig;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  config,
  onNextStep,
  onPrevStep,
}) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [showManifest, setShowManifest] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);

  const selectedArch = ARCHITECTURE_OPTIONS.find((a) => a.id === config.architectureId) || ARCHITECTURE_OPTIONS[0];

  const handleDeployClick = () => {
    setIsDeploying(true);
    setDeployProgress(15);

    const t1 = setTimeout(() => setDeployProgress(45), 400);
    const t2 = setTimeout(() => setDeployProgress(80), 900);
    const t3 = setTimeout(() => {
      setDeployProgress(100);
      setTimeout(() => {
        setIsDeploying(false);
        onNextStep();
      }, 350);
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const yamlManifest = `apiVersion: orchestration.pulse.dev/v1alpha1
kind: ClusterMeshDeployment
metadata:
  name: ${config.clusterName}
  environment: ${config.environment}
spec:
  architecture: "${selectedArch.id}"
  primaryRegion: "${config.region.split(' ')[0]}"
  scaling:
    minReplicas: ${config.minReplicas}
    maxReplicas: ${config.maxReplicas}
    cpuThreshold: ${config.cpuThreshold}%
  features:
    edgeCacheL1: ${config.enableEdgeCache}
    autonomousFailover: ${config.enableFailover}
    mtlsEncryption: true
    auditLevel: "soc2-enterprise"`;

  return (
    <div className="h-full w-full flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-neutral-200">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              PASO 04 / 05 • AUDITORÍA & PRE-VUELO
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">Verificación de Contratos</span>
          </div>
          <h1 className="text-base sm:text-xl font-semibold tracking-tight text-white mt-1">
            Resumen de Parámetros y Validación Previa
          </h1>
        </div>

        <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>4 de 4 Chequeos Superados</span>
        </div>
      </div>

      {/* Pre-Flight Health Checks Banner */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2.5">
        <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          Comprobaciones Automáticas de Infraestructura
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/50 border border-neutral-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-neutral-300 font-mono text-[11px]">Certificados mTLS y llaves KMS listas</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/50 border border-neutral-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-neutral-300 font-mono text-[11px]">Cuotas en {config.region.split(' ')[0]} disponibles</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/50 border border-neutral-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-neutral-300 font-mono text-[11px]">Rutas Anycast sin conflictos de BGP</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/50 border border-neutral-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-neutral-300 font-mono text-[11px]">Reglas de Auto-Failover sincronizadas</span>
          </div>
        </div>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-400 font-mono uppercase">Topología</div>
          <div className="text-white font-semibold mt-1 truncate">{selectedArch.title}</div>
          <div className="text-[10px] text-indigo-400 font-mono mt-0.5">{selectedArch.tier}</div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-400 font-mono uppercase">Región Primaria</div>
          <div className="text-white font-semibold mt-1 truncate">{config.region}</div>
          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Global DNS sync</div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-400 font-mono uppercase">Escalado Máximo</div>
          <div className="text-white font-semibold mt-1">{config.maxReplicas} pods</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Elástico dinámico</div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
          <div className="text-[10px] text-neutral-400 font-mono uppercase">Entorno</div>
          <div className="text-white font-semibold mt-1 capitalize">{config.environment}</div>
          <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Zero-Downtime</div>
        </div>
      </div>

      {/* Toggleable YAML Spec Manifest */}
      <div className="rounded-xl bg-neutral-900/40 border border-neutral-800 overflow-hidden">
        <div 
          onClick={() => setShowManifest(!showManifest)}
          className="px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-neutral-800/40 transition-colors text-xs font-medium text-neutral-300"
        >
          <span className="flex items-center gap-2">
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ver Manifiesto de Infraestructura como Código (infra.yaml)</span>
          </span>
          <span className="text-[11px] font-mono text-neutral-400">
            {showManifest ? 'Ocultar ▲' : 'Expandir ▼'}
          </span>
        </div>

        {showManifest && (
          <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-[11px] font-mono text-neutral-300 overflow-x-auto leading-relaxed">
            <pre className="text-neutral-300">{yamlManifest}</pre>
          </div>
        )}
      </div>

      {/* Deploying Progress state or Action Buttons */}
      {isDeploying ? (
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
              Aprovisionando infraestructura en red global Anycast...
            </span>
            <span className="font-mono text-indigo-300">{deployProgress}%</span>
          </div>

          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${deployProgress}%` }}
            />
          </div>
          <div className="text-[11px] text-neutral-400 font-mono truncate">
            Enlazando certificados mTLS y activando {config.maxReplicas} pods en {config.region.split(' ')[0]}...
          </div>
        </div>
      ) : (
        <div className="pt-2 flex items-center justify-between border-t border-neutral-800/60">
          <button
            onClick={onPrevStep}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modificar Configuración</span>
          </button>

          <button
            onClick={handleDeployClick}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-neutral-950 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all duration-200"
          >
            <Rocket className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span>Lanzar Despliegue a Producción</span>
          </button>
        </div>
      )}

    </div>
  );
};
