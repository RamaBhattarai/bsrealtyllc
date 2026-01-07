import apiClient from './client';

export interface JobApplicationFormData {
  name: string;
  email: string;
  phone: string;
  timeZones: string;
  startupExperience: string;
  workArrangement: string;
  workSetting: string;
  availability: string;
  position: string;
  compensation: string;
  yearsExperience: string;
  technicalSkills: string[];
  programmingLanguages: string[];
  portfolioLinks: string;
  pastProjects: string;
  certifications: string;
  recentProject: string;
  whyWorkHere: string;
  referral: string;
  resume: File | null;
}

export interface JobApplication extends Omit<JobApplicationFormData, 'resume'> {
  _id: string;
  resume: string;
  status: 'new' | 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt?: string;
  jobSlug?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface JobApplicationStats {
  totalApplications: number;
  pendingApplications: number;
  reviewedApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}

export const jobApplicationAPI = {
  // Submit job application (public)
  submitApplication: async (data: FormData): Promise<{ message: string; applicationId: string }> => {
    const response = await apiClient.post('/job-applications/submit', data);
    return response.data as { message: string; applicationId: string };
  },

  // Get all job applications (admin only)
  getApplications: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    position?: string;
    search?: string;
  }): Promise<{
    data: JobApplication[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> => {
    const response = await apiClient.get('/job-applications', { params });
    return response.data as {
      data: JobApplication[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  },

  // Get application by ID (admin only)
  getApplicationById: async (id: string): Promise<JobApplication> => {
    const response = await apiClient.get(`/job-applications/${id}`);
    return response.data as JobApplication;
  },

  // Update application status (admin only)
  updateApplicationStatus: async (
    id: string,
    status: 'new' | 'pending' | 'reviewed' | 'accepted' | 'rejected'
  ): Promise<{ message: string; application: JobApplication }> => {
    const response = await apiClient.put(`/job-applications/${id}/status`, { status });
    return response.data as { message: string; application: JobApplication };
  },

  // Delete application (admin only)
  deleteApplication: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/job-applications/${id}`);
    return response.data as { message: string };
  },

  // Download resume (admin only)
  downloadResume: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(`/job-applications/${id}/resume`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  },};
