import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  RotateCcw, 
  Terminal, 
  Zap 
} from 'lucide-react';
import { ARCHITECTURE_OPTIONS } from '../../../data/flowData';
import type { SystemConfig } from '../../../types';

interface ResultViewProps {
  config: SystemConfig;
  onRestart: () => void;
}

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'success' | 'info' | 'metric';
  text: string;
}

export const ResultView: React.FC<ResultViewProps> = ({ config, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [trafficSpike, setTrafficSpike] = useState(false);
  const [qps, setQps] = useState(28400);
  const [pingResult, setPingResult] = useState<string | null>(null);

  const selectedArch = ARCHITECTURE_OPTIONS.find((a) => a.id === config.architectureId) || ARCHITECTURE_OPTIONS[0];
  const endpointUrl = `https://${config.clusterName}.pulse-mesh.net/api/v1`;

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '12:45:01', type: 'info', text: `Provisionando nodos en región ${config.region.split(' ')[0]}...` },
    { id: '2', timestamp: '12:45:02', type: 'success', text: `Certificados mTLS y túneles de cifrado establecidos con éxito.` },
    { id: '3', timestamp: '12:45:03', type: 'success', text: `Topología '${selectedArch.title}' sincronizada en 18 POPs Anycast.` },
    { id: '4', timestamp: '12:45:04', type: 'metric', text: `Auto-escalado activo: 2 a ${config.maxReplicas} pods con tolerancia a fallas.` },
    { id: '5', timestamp: '12:45:05', type: 'success', text: `Rutas DNS propagadas globalmente. Enrutando tráfico a producción.` },
  ]);

  const handleCopyEndpoint = () => {
    navigator.clipboard?.writeText(endpointUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateTraffic = () => {
    setTrafficSpike(true);
    setQps((prev) => prev + 14200);

    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    setLogs((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        timestamp: timeStr,
        type: 'metric',
        text: `[TRAFFIC SPIKE] Tráfico sintético inyectado (+14,200 req/s). Balanceador distribuyendo carga sin degradación.`
      }
    ]);

    setTimeout(() => {
      setTrafficSpike(false);
    }, 1800);
  };

  const handleRunPing = () => {
    setPingResult('Calculando...');
    setTimeout(() => {
      const ms = (Math.random() * 3 + 10).toFixed(1);
      setPingResult(`${ms} ms (OK)`);
    }, 350);
  };

  return (
    <div className="h-full w-full flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-neutral-200">
      
      {/* Top Banner: Success State */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h1 className="text-base sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Despliegue Activo en Red Global
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% OPERACIONAL
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            El clúster está enrutando peticiones en vivo. Todos los contratos y chequeos fueron verificados.
          </p>
        </div>

        {/* Restart Demo Button */}
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          title="Reiniciar y probar otra combinación"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Demostración</span>
        </button>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        
        {/* Metric 1: Live Status */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-emerald-500/30">
          <div className="text-[10px] text-neutral-400 font-mono uppercase">Estado Global</div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm sm:text-base font-bold text-white">Producción Activa</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">Cero errores de red</div>
        </div>

        {/* Metric 2: Live QPS */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
          <div className="text-[10px] text-neutral-400 font-mono uppercase">Throughput Actual</div>
          <div className="text-sm sm:text-base font-bold text-white font-mono mt-1 flex items-baseline gap-1.5">
            <span>{qps.toLocaleString()}</span>
            <span className="text-[10px] text-indigo-400 font-sans">req/s</span>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono mt-1">
            {trafficSpike ? '⚡ Pico absorbido' : 'Flujo balanceado'}
          </div>
        </div>

        {/* Metric 3: Active Pods */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
          <div className="text-[10px] text-neutral-400 font-mono uppercase">Pods Escalados</div>
          <div className="text-sm sm:text-base font-bold text-white font-mono mt-1">
            {trafficSpike ? `${config.maxReplicas} / ${config.maxReplicas}` : `4 / ${config.maxReplicas}`}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">
            {trafficSpike ? 'Escalado al pico' : 'Reserva elástica'}
          </div>
        </div>

        {/* Metric 4: Latency probe */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
          <div className="text-[10px] text-neutral-400 font-mono uppercase">Sonda de Latencia</div>
          <div className="text-sm sm:text-base font-bold text-white font-mono mt-1">
            {pingResult || (config.enableEdgeCache ? '9.4 ms' : '14.8 ms')}
          </div>
          <button 
            onClick={handleRunPing}
            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono underline mt-1 block"
          >
            Hacer ping ahora →
          </button>
        </div>

      </div>

      {/* Live Interactive Endpoint Box */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-indigo-950/40 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1 overflow-hidden">
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
            Endpoint Seguro Autenticado
          </span>
          <div className="font-mono text-xs sm:text-sm text-white truncate bg-neutral-950/70 px-3 py-1.5 rounded-lg border border-neutral-800">
            {endpointUrl}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyEndpoint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white text-xs font-medium transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado al portapapeles' : 'Copiar Endpoint'}</span>
          </button>

          <button
            onClick={handleSimulateTraffic}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
              trafficSpike 
                ? 'bg-amber-500 text-neutral-950' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simular Carga (+14k)</span>
          </button>
        </div>
      </div>

      {/* Live Streaming Logs Console */}
      <div className="rounded-xl bg-neutral-950 border border-neutral-800/90 overflow-hidden flex flex-col">
        <div className="px-4 py-2 bg-neutral-900/60 border-b border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-neutral-400" />
            <span>telemetry-stream.log</span>
          </div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CONEXIÓN WEBSOCKET VIVA
          </span>
        </div>

        <div className="p-3 sm:p-4 max-h-[160px] overflow-y-auto font-mono text-[11px] space-y-1.5">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2">
              <span className="text-neutral-500 shrink-0">[{log.timestamp}]</span>
              <span className={`shrink-0 font-bold ${
                log.type === 'success' ? 'text-emerald-400' :
                log.type === 'metric' ? 'text-indigo-400' : 'text-neutral-300'
              }`}>
                {log.type === 'success' ? '[READY]' : log.type === 'metric' ? '[STAT]' : '[INFO]'}
              </span>
              <span className="text-neutral-300">{log.text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
