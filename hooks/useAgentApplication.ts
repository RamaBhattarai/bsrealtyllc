import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { agentApplicationAPI, type AgentApplicationFormData } from '../lib/api/agentApplication.api';
import toast from 'react-hot-toast';

// Hook for submitting agent application
export const useSubmitAgentApplication = () => {
  return useMutation({
    mutationFn: (data: FormData) => agentApplicationAPI.submitApplication(data),
    onSuccess: (data) => {
      toast.success(data.message || 'Application submitted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to submit application';
      toast.error(message);
    },
  });
};

// Hook for getting agent applications (admin)
export const useAgentApplications = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['agent-applications', params],
    queryFn: () => agentApplicationAPI.getApplications(params),
    enabled: true,
  });
};

// Hook for getting filter options
export const useAgentApplicationFilters = () => {
  return useQuery({
    queryKey: ['agent-application-filters'],
    queryFn: () => agentApplicationAPI.getFilterOptions(),
    enabled: true,
  });
};

// Hook for getting application by ID
export const useAgentApplication = (id: string) => {
  return useQuery({
    queryKey: ['agent-application', id],
    queryFn: () => agentApplicationAPI.getApplicationById(id),
    enabled: !!id,
  });
};

// Hook for updating application status
export const useUpdateAgentApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'new' | 'pending' | 'reviewed' | 'accepted' | 'rejected' }) =>
      agentApplicationAPI.updateApplicationStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['agent-applications'] });
      toast.success(data.message || 'Application status updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update application status';
      toast.error(message);
    },
  });
};

// Hook for deleting application
export const useDeleteAgentApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => agentApplicationAPI.deleteApplication(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['agent-applications'] });
      toast.success(data.message || 'Application deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete application';
      toast.error(message);
    },
  });
};

// Hook for downloading resume
export const useDownloadAgentResume = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const blob = await agentApplicationAPI.downloadResume(id);

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `agent-resume-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    },
    onSuccess: () => {
      toast.success('Resume downloaded successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to download resume';
      toast.error(message);
    },
  });
};

// Hook for downloading license
export const useDownloadAgentLicense = () => {
  return useMutation({
    mutationFn: async ({ id, filename }: { id: string; filename: string }) => {
      const blob = await agentApplicationAPI.downloadLicense(id);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const ext = filename ? '.' + (filename.split('.').pop() || 'pdf') : '.pdf';
      link.download = `agent-license-${id}${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    },
    onSuccess: () => {
      toast.success('License downloaded successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to download license';
      toast.error(message);
    },
  });
};

// Hook for downloading ID card
export const useDownloadAgentIdCard = () => {
  return useMutation({
    mutationFn: async ({ id, filename }: { id: string; filename: string }) => {
      const blob = await agentApplicationAPI.downloadIdCard(id);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const ext = filename ? '.' + (filename.split('.').pop() || 'pdf') : '.pdf';
      link.download = `agent-id-card-${id}${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    },
    onSuccess: () => {
      toast.success('ID card downloaded successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to download ID card';
      toast.error(message);
    },
  });
};

// Hook for getting application statistics
export const useAgentApplicationStats = () => {
  return useQuery({
    queryKey: ['agent-application-stats'],
    queryFn: () => agentApplicationAPI.getStats(),
    enabled: true,
  });
};