export type StepId = 'dashboard' | 'selection' | 'configuration' | 'confirmation' | 'result';

export interface FlowStep {
  id: StepId;
  stepNumber: string; // '01', '02', etc.
  title: string;
  shortDesc: string;
  eyebrow: string;
  contextualTitle: string;
  contextualDesc: string;
  badge: string;
  iconName: string;
}

export interface ArchitectureOption {
  id: string;
  title: string;
  badge: string;
  recommended?: boolean;
  description: string;
  latency: string;
  compute: string;
  redundancy: string;
  tier: string;
  costPerHour: number;
}

export interface SystemConfig {
  architectureId: string;
  clusterName: string;
  region: string;
  minReplicas: number;
  maxReplicas: number;
  cpuThreshold: number; // percentage
  enableFailover: boolean;
  enableEdgeCache: boolean;
  environment: 'production' | 'staging' | 'canary';
  autoHealing: boolean;
  securityTier: 'standard' | 'soc2-enterprise';
}

export interface DeploymentLog {
  id: string;
  time: string;
  level: 'info' | 'success' | 'warn';
  message: string;
}
