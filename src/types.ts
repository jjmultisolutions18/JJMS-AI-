export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export type InnovationStage = 'STAGE 0: Pipeline & Awareness' | 'STAGE 1: Ideation' | 'STAGE 2: Technology Development' | 'STAGE 3: Commercialisation';

export interface InnovationIdea {
  title: string;
  description: string;
  problem: string;
  solution: string;
  targetMarket: string;
  uvp: string;
  businessModel: string;
  stage: InnovationStage;
}
