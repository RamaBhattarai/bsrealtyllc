import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { homeImprovementQuoteAPI, type HomeImprovementQuoteFormData, type HomeImprovementQuote, type QuotesResponse, type SubmitResponse } from '../lib/api/homeImprovementQuote.api';
import toast from 'react-hot-toast';

// Query keys for React Query cache management
export const HOME_IMPROVEMENT_QUOTE_QUERY_KEYS = {
  all: ['home-improvement-quotes'] as const,
  lists: () => [...HOME_IMPROVEMENT_QUOTE_QUERY_KEYS.all, 'list'] as const,
  list: (params: any) => [...HOME_IMPROVEMENT_QUOTE_QUERY_KEYS.lists(), params] as const,
  details: () => [...HOME_IMPROVEMENT_QUOTE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...HOME_IMPROVEMENT_QUOTE_QUERY_KEYS.details(), id] as const,
} as const;

// Submit home improvement quote mutation hook
export const useSubmitHomeImprovementQuote = () => {
  const queryClient = useQueryClient();

  return useMutation<SubmitResponse, Error, HomeImprovementQuoteFormData>({
    mutationFn: homeImprovementQuoteAPI.submit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success(data.message || 'Quote submitted successfully! We\'ll get back to you soon.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit quote. Please try again.');
    },
  });
};

// Get all home improvement quotes query hook (admin only)
export const useHomeImprovementQuotes = (params?: {
  page?: number;
  limit?: number;
  propertyType?: string;
  timeline?: string;
}) => {
  return useQuery<QuotesResponse>({
    queryKey: HOME_IMPROVEMENT_QUOTE_QUERY_KEYS.list(params),
    queryFn: () => homeImprovementQuoteAPI.getAll(params),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true,
  });
};

// Get home improvement quote by ID query hook (admin only)
export const useHomeImprovementQuote = (id: string, enabled: boolean = true) => {
  return useQuery<HomeImprovementQuote>({
    queryKey: HOME_IMPROVEMENT_QUOTE_QUERY_KEYS.detail(id),
    queryFn: () => homeImprovementQuoteAPI.getById(id),
    enabled,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Delete home improvement quote mutation hook (admin only)
export const useDeleteHomeImprovementQuote = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: homeImprovementQuoteAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_IMPROVEMENT_QUOTE_QUERY_KEYS.all });
      toast.success('Quote deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete quote');
    },
  });
};

// Update home improvement quote status mutation hook (admin only)
export const useUpdateHomeImprovementQuoteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<HomeImprovementQuote, Error, { id: string; status: 'new' | 'pending' | 'responded' | 'closed' }>({
    mutationFn: ({ id, status }) => homeImprovementQuoteAPI.updateStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: HOME_IMPROVEMENT_QUOTE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success(`Quote status updated to ${variables.status}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update quote status');
    },
  });
};