export interface JobsResponse {
  jobs: Job[];
}

export interface Job {
  id: string;
  title: string;
  about: string;
  benefits: string;
  responsibilities: string;
  minimumQualifications: string;
  preferredRequirement: string;

  jobType: 'full_time' | 'part_time' | 'contract';
  location: string;
  locationType: 'IN_OFFICE' | 'REMOTE' | 'HYBRID';
  locationValue: string;

  salary: string;
  status: 'PUBLISHED' | 'CLOSED' | 'DRAFT';

  experienceLevel: number;
  managementLevel: number;

  createdAt: string;
  updatedAt: string;

  appliedNum?: number;
  droppedNum?: number;
  hiredNum?: number;
  viewedNum?: number;

  organization: Organization;
  jobApplies?: JobApply[];
}

export interface Organization {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  contactEmail: string;
}

export interface JobApply {
  id: string;
  createdAt: string;
  status: 'UNDER_REVIEW' | 'INTERVIEWING' | 'OFFERING' | 'EMAIL_SENT' | 'REJECTED';

  candidateTimestamp: string | null;

  candidateWalletAddress: WalletAddress;

  jobReferral: unknown | null;

  recruiterData: RecruiterData;

  talent: Talent;
}

export interface WalletAddress {
  address: string;
}

export interface RecruiterData {
  id: string;
  fitAssessment: boolean;
  matchScore: number;
  summary: string;
}

export interface Talent {
  id: string;
  status: 'NEW_PROFILE' | 'ACTIVE_PROFILE';
  user: UserJob;
}

export interface UserJob {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}
