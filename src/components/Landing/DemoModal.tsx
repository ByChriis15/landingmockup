import React, { useState } from 'react';
import { Check, Copy, Sparkles, Terminal, X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const mockApiKey = 'pulse_live_99a8b1c4e72f910408d3e';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(mockApiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="space-y-5 text-center py-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">¡Acceso Sandbox Generado!</h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Hemos enviado la confirmación a <span className="text-white font-mono">{email}</span>.
              </p>
            </div>

            {/* Generated API key box */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-left space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                <span>Tu Clave de Prueba (Sandbox):</span>
                <span>Válida por 14 días</span>
              </div>
              <div className="flex items-center justify-between gap-2 font-mono text-xs text-emerald-400 bg-neutral-900/80 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                <span className="truncate">{mockApiKey}</span>
                <button
                  onClick={handleCopyKey}
                  className="p-1 hover:text-white transition-colors shrink-0"
                  title="Copiar clave"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs sm:text-sm transition-all"
            >
              Cerrar y Volver a la Demostración
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Acceso para Desarrolladores & Empresas
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Comienza con PULSE en tu entorno
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Ingresa tu correo de trabajo para generar una credencial de sandbox y agendar una sesión técnica de 15 minutos.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Correo electrónico profesional
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.nombre@empresa.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-400 space-y-1.5">
                <div className="font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  ¿Prefieres probar vía CLI?
                </div>
                <div className="font-mono text-[11px] text-neutral-300 bg-neutral-900 px-2 py-1 rounded border border-neutral-800">
                  curl -fsSL https://get.pulse.dev | sh
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all"
              >
                Solicitar Acceso Inmediato
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
