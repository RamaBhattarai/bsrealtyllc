import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { insuranceQuoteAPI } from '../lib/api/insuranceQuote.api';
import toast from 'react-hot-toast';

// Query keys for React Query cache management
export const INSURANCE_QUOTE_QUERY_KEYS = {
  all: ['insurance-quotes'] as const,
  lists: () => [...INSURANCE_QUOTE_QUERY_KEYS.all, 'list'] as const,
  list: (params: any) => [...INSURANCE_QUOTE_QUERY_KEYS.lists(), params] as const,
  details: () => [...INSURANCE_QUOTE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...INSURANCE_QUOTE_QUERY_KEYS.details(), id] as const,
  stats: () => [...INSURANCE_QUOTE_QUERY_KEYS.all, 'stats'] as const,
} as const;

// Get all insurance quotes query hook (admin only)
export const useInsuranceQuotes = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  dwellingUsage?: string;
  occupancyType?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: INSURANCE_QUOTE_QUERY_KEYS.list(params),
    queryFn: () => insuranceQuoteAPI.getAll(params),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true,
  });
};

// Update insurance quote status mutation hook (admin only)
export const useUpdateInsuranceQuoteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'new' | 'pending' | 'responded' | 'closed' }) =>
      insuranceQuoteAPI.updateStatus(id, status),
    onSuccess: (data, variables) => {
      // Update the quote in cache
      queryClient.setQueryData(
        INSURANCE_QUOTE_QUERY_KEYS.detail(variables.id),
        { quote: data }
      );

      // Invalidate quote lists to refresh them
      queryClient.invalidateQueries({
        queryKey: INSURANCE_QUOTE_QUERY_KEYS.lists()
      });

      // Invalidate stats
      queryClient.invalidateQueries({
        queryKey: INSURANCE_QUOTE_QUERY_KEYS.stats()
      });

      // Invalidate notifications
      queryClient.invalidateQueries({
        queryKey: ['notifications']
      });

      toast.success('Insurance quote status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update insurance quote status');
    },
  });
};

// Get insurance quote statistics query hook (admin only)
export const useInsuranceQuoteStats = () => {
  return useQuery({
    queryKey: INSURANCE_QUOTE_QUERY_KEYS.stats(),
    queryFn: insuranceQuoteAPI.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};