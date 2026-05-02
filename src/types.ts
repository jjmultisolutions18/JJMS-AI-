import { Timestamp } from 'firebase/firestore';

export type UserRole = 'ADMIN' | 'MANAGER' | 'COORDINATOR' | 'MENTOR' | 'INNOVATOR';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  department?: string;
  institution?: string;
  createdAt: Timestamp;
}

export type InnovationStage = 'STAGE_0' | 'STAGE_1' | 'STAGE_2' | 'STAGE_3';

export interface InnovationProject {
  id: string;
  title: string;
  description: string;
  innovatorId: string;
  mentorId?: string;
  programmeId: string;
  cohortId: string;
  currentStage: InnovationStage;
  status: 'ACTIVE' | 'PENDING_APPROVAL' | 'COMPLETED' | 'ON_HOLD';
  score?: number;
  sector: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Programme {
  id: string;
  name: string;
  description: string;
  department: string;
  managerId: string; // Supervisor/Manager in charge
  coordinatorId: string; // Operational lead
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  startDate: Timestamp;
  endDate: Timestamp;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED';
}

export interface Cohort {
  id: string;
  programmeId: string;
  name: string;
  year: number;
  maxParticipants: number;
  currentParticipants: number;
  status: 'OPEN' | 'CLOSED' | 'ACTIVE';
}

export interface ApprovalRequest {
  id: string;
  projectId: string;
  programmeId: string;
  requestedBy: string; // Coordinator ID
  approverId?: string; // Manager ID
  type: 'STAGE_PROGRESSION' | 'FUNDING_DISBURSEMENT' | 'RESOURCE_ALLOCATION';
  details: {
    currentStage?: InnovationStage;
    targetStage?: InnovationStage;
    amount?: number;
    reason: string;
  };
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comment?: string;
  createdAt: Timestamp;
  processedAt?: Timestamp;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}
