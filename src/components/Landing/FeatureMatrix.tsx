import React from 'react';
import { RefreshCw, Shield, Terminal, Zap } from 'lucide-react';

export const FeatureMatrix: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: 'Latencia Sub-15ms en Red Anycast',
      description: 'Enrutamiento perimetral inteligente que ubica el cómputo y el caché en el punto de presencia más cercano a tus usuarios.',
      badge: '18 Regiones',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-emerald-400" />,
      title: 'Auto-Recuperación & Healing Autónomo',
      description: 'Monitoreo continuo de salud que drena nodos degradados y reubica la carga en microsegundos sin cortes de servicio.',
      badge: '<150ms Failover',
    },
    {
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      title: 'Aislamiento Criptográfico Zero-Trust',
      description: 'Cada canal de comunicación utiliza túneles mTLS con rotación automática de llaves bajo estrictos estándares SOC2 e HIPAA.',
      badge: 'Hardware Enclave',
    },
    {
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
      title: 'Infraestructura Declarativa & Rollbacks',
      description: 'Toda topología se versiona como código. Despliegues blue-green automáticos con reversión instantánea ante cualquier anomalía.',
      badge: '1-Click Revert',
    },
  ];

  return (
    <section id="arquitectura" className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold mb-2">
          INGENIERÍA DE PRECISIÓN
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Construido para soportar cargas críticas sin interrupciones
        </h2>
        <p className="text-sm text-neutral-400 mt-2">
          Elimina la complejidad de aprovisionamiento manual y asegura una fiabilidad matemática en cada despliegue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-750 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700/60 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
