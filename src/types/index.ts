export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  credits: number;
  hasPaymentMethod: boolean;
  createdAt: string;
  suspended: boolean;
}

export interface Application {
  id: string;
  name: string;
  userId: string;
  repoUrl: string;
  envVars: Record<string, string>;
  status: 'building' | 'running' | 'stopped' | 'failed';
  subdomain: string;
  createdAt: string;
  lastDeployment: string;
  containerId?: string;
}

export interface Deployment {
  id: string;
  applicationId: string;
  status: 'pending' | 'building' | 'success' | 'failed';
  logs: string[];
  createdAt: string;
  buildTime?: number;
}

export interface RedeemCode {
  id: string;
  code: string;
  credits: number;
  used: boolean;
  usedBy?: string;
  createdAt: string;
  expiresAt: string;
}

export interface BillingInfo {
  userId: string;
  credits: number;
  hasPaymentMethod: boolean;
  lastPayment?: string;
  subscriptionStatus?: 'active' | 'inactive' | 'cancelled';
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}