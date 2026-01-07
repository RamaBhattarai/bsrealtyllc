import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { propertyInquiryAPI } from '../lib/api/propertyInquiry.api';
import toast from 'react-hot-toast';

// Query keys for React Query cache management
export const PROPERTY_INQUIRY_QUERY_KEYS = {
  all: ['property-inquiries'] as const,
  lists: () => [...PROPERTY_INQUIRY_QUERY_KEYS.all, 'list'] as const,
  list: (params: any) => [...PROPERTY_INQUIRY_QUERY_KEYS.lists(), params] as const,
  details: () => [...PROPERTY_INQUIRY_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...PROPERTY_INQUIRY_QUERY_KEYS.details(), id] as const,
  stats: () => [...PROPERTY_INQUIRY_QUERY_KEYS.all, 'stats'] as const,
} as const;

// Get all property inquiries query hook (admin only)
export const usePropertyInquiries = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  purchaseType?: string;
  preferredContact?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: PROPERTY_INQUIRY_QUERY_KEYS.list(params),
    queryFn: () => propertyInquiryAPI.getAll(params),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true,
  });
};

// Update property inquiry status mutation hook (admin only)
export const useUpdatePropertyInquiryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'new' | 'pending' | 'responded' | 'closed' }) =>
      propertyInquiryAPI.updateStatus(id, status),
    onSuccess: (data, variables) => {
      // Update the inquiry in cache
      queryClient.setQueryData(
        PROPERTY_INQUIRY_QUERY_KEYS.detail(variables.id),
        { inquiry: data }
      );

      // Invalidate inquiry lists to refresh them
      queryClient.invalidateQueries({
        queryKey: PROPERTY_INQUIRY_QUERY_KEYS.lists()
      });

      // Invalidate stats
      queryClient.invalidateQueries({
        queryKey: PROPERTY_INQUIRY_QUERY_KEYS.stats()
      });

      // Invalidate notifications
      queryClient.invalidateQueries({
        queryKey: ['notifications']
      });

      toast.success('Property inquiry status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update property inquiry status');
    },
  });
};

// Get property inquiry statistics query hook (admin only)
export const usePropertyInquiryStats = () => {
  return useQuery({
    queryKey: PROPERTY_INQUIRY_QUERY_KEYS.stats(),
    queryFn: propertyInquiryAPI.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};