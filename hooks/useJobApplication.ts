import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobApplicationAPI, type JobApplicationFormData } from '../lib/api/jobApplication.api';
import toast from 'react-hot-toast';

// Hook for submitting job application
export const useSubmitJobApplication = () => {
  return useMutation({
    mutationFn: (data: FormData) => jobApplicationAPI.submitApplication(data),
    onSuccess: (data) => {
      toast.success(data.message || 'Application submitted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to submit application';
      toast.error(message);
    },
  });
};

// Hook for getting job applications (admin)
export const useJobApplications = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  position?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['job-applications', params],
    queryFn: () => jobApplicationAPI.getApplications(params),
    enabled: true,
  });
};

// Hook for getting application by ID
export const useJobApplication = (id: string) => {
  return useQuery({
    queryKey: ['job-application', id],
    queryFn: () => jobApplicationAPI.getApplicationById(id),
    enabled: !!id,
  });
};

// Hook for updating application status
export const useUpdateJobApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'new' | 'pending' | 'reviewed' | 'accepted' | 'rejected' }) =>
      jobApplicationAPI.updateApplicationStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
      toast.success(data.message || 'Application status updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update application status';
      toast.error(message);
    },
  });
};

// Hook for deleting application
export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobApplicationAPI.deleteApplication(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
      toast.success(data.message || 'Application deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete application';
      toast.error(message);
    },
  });
};

// Hook for downloading resume
export const useDownloadResume = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const blob = await jobApplicationAPI.downloadResume(id);

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume-${id}.pdf`; // You might want to get the actual filename from the response headers
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

// Hook for exporting applications to CSV
export const useExportJobApplications = () => {
  return useMutation({
    mutationFn: () => {
      // For now, we'll implement a simple export
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success('Export functionality will be implemented soon!');
    },
    onError: (error: any) => {
      toast.error('Export not yet implemented');
    },
  });
};

// Hook for getting application statistics
export const useJobApplicationStats = () => {
  return useQuery({
    queryKey: ['job-application-stats'],
    queryFn: () => {
      // Mock stats for now
      return Promise.resolve({
        totalApplications: 0,
        pendingApplications: 0,
        reviewedApplications: 0,
        acceptedApplications: 0,
        rejectedApplications: 0,
      });
    },
    enabled: true,
  });
};
