import apiClient, { publicApiClient } from './client';

export interface AgentApplicationFormData {
  name: string;
  email: string;
  phone: string;
  licenseStatus: string;
  licenseNumber?: string;
  licensedStates?: string;
  yearsExperience: string;
  currentBrokerage?: string;
  areasOfExpertise: string[];
  availability: string;
  workEligibility: string;
  howDidYouHear: string;
  referrerName?: string;
  resume: File | null;
  license?: File | null;
  idCard?: File | null;
}

export interface AgentApplication extends Omit<AgentApplicationFormData, 'resume' | 'license' | 'idCard'> {
  _id: string;
  resume: string;
  license?: string;
  idCard?: string;
  status: 'new' | 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AgentApplicationFilters {
  licenseStatuses: string[];
  yearsExperiences: string[];
  availabilities: string[];
  workEligibilities: string[];
  areasOfExpertise: string[];
}

export const agentApplicationAPI = {
  // Submit agent application (public)
  submitApplication: async (data: FormData): Promise<{ message: string; applicationId: string }> => {
    console.log('Submitting agent application...');
    console.log('FormData contents:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await publicApiClient.post('/agent-applications/submit', data);
      console.log('Agent application API response:', response);
      return response.data as { message: string; applicationId: string };
    } catch (error: any) {
      console.error('Agent application API error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },

  // Get all agent applications (admin only)
  getApplications: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{
    data: AgentApplication[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> => {
    const response = await apiClient.get('/agent-applications', { params });
    return response.data as {
      data: AgentApplication[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  },

  // Get filter options (admin only)
  getFilterOptions: async (): Promise<AgentApplicationFilters> => {
    const response = await apiClient.get('/agent-applications/filters');
    return response.data as AgentApplicationFilters;
  },

  // Get application by ID (admin only)
  getApplicationById: async (id: string): Promise<AgentApplication> => {
    const response = await apiClient.get(`/agent-applications/${id}`);
    return response.data as AgentApplication;
  },

  // Update application status (admin only)
  updateApplicationStatus: async (
    id: string,
    status: 'new' | 'pending' | 'reviewed' | 'accepted' | 'rejected'
  ): Promise<{ message: string; application: AgentApplication }> => {
    const response = await apiClient.put(`/agent-applications/${id}/status`, { status });
    return response.data as { message: string; application: AgentApplication };
  },

  // Delete application (admin only)
  deleteApplication: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/agent-applications/${id}`);
    return response.data as { message: string };
  },

  // Download resume (admin only)
  downloadResume: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/agent-applications/${id}/resume`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  // Download license (admin only)
  downloadLicense: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/agent-applications/${id}/license`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  // Download ID card (admin only)
  downloadIdCard: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/agent-applications/${id}/id-card`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },

  // Get agent application stats (admin only)
  getStats: async (): Promise<{
    total: number;
    pending: number;
    reviewed: number;
    accepted: number;
    rejected: number;
  }> => {
    // Mock stats for now - backend doesn't have this endpoint yet
    return {
      total: 0,
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0,
    };
  },
};