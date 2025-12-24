import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactAPI, type ContactFormData } from '../lib/api/contact.api';
import toast from 'react-hot-toast';

// Query keys for React Query cache management
export const CONTACT_QUERY_KEYS = {
  all: ['contacts'] as const,
  lists: () => [...CONTACT_QUERY_KEYS.all, 'list'] as const,
  list: (params: any) => [...CONTACT_QUERY_KEYS.lists(), params] as const,
  details: () => [...CONTACT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CONTACT_QUERY_KEYS.details(), id] as const,
  stats: () => [...CONTACT_QUERY_KEYS.all, 'stats'] as const,
} as const;

// Submit contact form mutation hook
export const useSubmitContact = () => {
  return useMutation({
    mutationFn: contactAPI.submit,
    onSuccess: (data) => {
      toast.success(data.message || 'Message sent successfully! We\'ll get back to you soon.');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send message. Please try again.');
    },
  });
};

// Get all contacts query hook (admin only)
export const useContacts = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: CONTACT_QUERY_KEYS.list(params),
    queryFn: () => contactAPI.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get contact by ID query hook (admin only)
export const useContact = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: CONTACT_QUERY_KEYS.detail(id),
    queryFn: () => contactAPI.getById(id),
    enabled: enabled && !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Update contact status mutation hook (admin only)
export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'responded' | 'closed' }) =>
      contactAPI.updateStatus(id, status),
    onSuccess: (data, variables) => {
      // Update the contact in cache
      queryClient.setQueryData(
        CONTACT_QUERY_KEYS.detail(variables.id),
        { contact: data.contact }
      );
      
      // Invalidate contact lists to refresh them
      queryClient.invalidateQueries({
        queryKey: CONTACT_QUERY_KEYS.lists()
      });
      
      // Invalidate stats
      queryClient.invalidateQueries({
        queryKey: CONTACT_QUERY_KEYS.stats()
      });
      
      toast.success(data.message || 'Contact status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update contact status');
    },
  });
};

// Delete contact mutation hook (admin only)
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactAPI.delete,
    onSuccess: (data, contactId) => {
      // Remove contact from cache
      queryClient.removeQueries({
        queryKey: CONTACT_QUERY_KEYS.detail(contactId)
      });
      
      // Invalidate contact lists to refresh them
      queryClient.invalidateQueries({
        queryKey: CONTACT_QUERY_KEYS.lists()
      });
      
      // Invalidate stats
      queryClient.invalidateQueries({
        queryKey: CONTACT_QUERY_KEYS.stats()
      });
      
      toast.success(data.message || 'Contact deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete contact');
    },
  });
};

// Get contact statistics query hook (admin only)
export const useContactStats = () => {
  return useQuery({
    queryKey: CONTACT_QUERY_KEYS.stats(),
    queryFn: contactAPI.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Export contacts to CSV mutation hook (admin only)
export const useExportContacts = () => {
  return useMutation({
    mutationFn: contactAPI.exportCSV,
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Contacts exported successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to export contacts');
    },
  });
};