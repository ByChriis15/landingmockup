import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Landing/Navbar';
import { HeroHeader } from './components/Landing/HeroHeader';
import { FlowNavigation } from './components/Landing/FlowNavigation';
import { ContextualCallouts } from './components/Landing/ContextualCallouts';
import { CtaSection } from './components/Landing/CtaSection';
import { FeatureMatrix } from './components/Landing/FeatureMatrix';
import { TestimonialsBadges } from './components/Landing/TestimonialsBadges';
import { Footer } from './components/Landing/Footer';
import { DemoModal } from './components/Landing/DemoModal';
import { MacBookMockup } from './components/MacBook/MacBookMockup';
import { ProductScreen } from './components/ProductApp/ProductScreen';
import { INITIAL_CONFIG, FLOW_STEPS } from './data/flowData';
import type { StepId, SystemConfig } from './types';

export function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('dashboard');
  const [config, setConfig] = useState<SystemConfig>(INITIAL_CONFIG);
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const demoSectionRef = useRef<HTMLDivElement>(null);

  // Auto-tour timer effect
  useEffect(() => {
    if (!isAutoTouring) return;

    const steps: StepId[] = ['dashboard', 'selection', 'configuration', 'confirmation', 'result'];
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const idx = steps.indexOf(prev);
        const nextIdx = (idx + 1) % steps.length;
        return steps[nextIdx];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoTouring]);

  const handleUpdateConfig = (partial: Partial<SystemConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleRestart = () => {
    setConfig(INITIAL_CONFIG);
    setCurrentStep('dashboard');
    setIsAutoTouring(false);
  };

  const handleStepChange = (step: StepId) => {
    setCurrentStep(step);
    // If user manually clicks, stop auto-tour so they can explore freely
    if (isAutoTouring) {
      setIsAutoTouring(false);
    }
  };

  const handleScrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentStepObj = FLOW_STEPS.find((s) => s.id === currentStep) || FLOW_STEPS[0];

  return (
    <div className="min-h-screen bg-[#07080b] text-[#e4e7ec] flex flex-col font-sans relative selection:bg-indigo-500/30 selection:text-white">
      
      {/* Background Ambient Tech Mesh & Glows */}
      <div className="fixed inset-0 tech-grid-bg pointer-events-none opacity-40 z-0" />
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full pointer-events-none z-0 opacity-20 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)'
        }}
      />

      {/* 1. Header / Navbar */}
      <Navbar 
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onScrollToDemo={handleScrollToDemo}
      />

      <main className="relative z-10 flex-1 flex flex-col items-center">
        
        {/* 2. Hero Section */}
        <section ref={demoSectionRef} className="w-full max-w-7xl px-4 sm:px-6 pt-4 pb-12 flex flex-col items-center">
          
          {/* Eyebrow, Headline, Subheadline */}
          <HeroHeader />

          {/* Stepper Controls Above MacBook */}
          <div className="w-full mb-6 sm:mb-8">
            <FlowNavigation 
              currentStep={currentStep}
              onSelectStep={handleStepChange}
              isAutoTouring={isAutoTouring}
              onToggleAutoTour={() => setIsAutoTouring(!isAutoTouring)}
              onRestart={handleRestart}
            />
          </div>

          {/* 3. Hero MacBook Mockup with Functional Web App inside */}
          <div className={`w-full transition-all duration-500 ease-out ${
            isExpanded ? 'max-w-[1400px] scale-[1.02]' : 'max-w-[1240px]'
          }`}>
            <MacBookMockup 
              activeStepNumber={currentStepObj.stepNumber}
              isAutoTouring={isAutoTouring}
            >
              <ProductScreen 
                currentStep={currentStep}
                onStepChange={handleStepChange}
                config={config}
                onUpdateConfig={handleUpdateConfig}
                onRestart={handleRestart}
                onToggleExpandMockup={() => setIsExpanded(!isExpanded)}
                isExpanded={isExpanded}
              />
            </MacBookMockup>
          </div>

          {/* 4. External Contextual Information & Product Tour Pills */}
          <div className="w-full mt-6 sm:mt-8">
            <ContextualCallouts currentStep={currentStep} />
          </div>

        </section>

        {/* 5. Trust Logos Bar */}
        <TestimonialsBadges />

        {/* 6. Feature Matrix & Architecture Deep Dive */}
        <FeatureMatrix />

        {/* 7. External CTA Section: "Conocer el sistema" */}
        <CtaSection onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Interactive Demo & Sandbox Key Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

    </div>
  );
}

export default App;
