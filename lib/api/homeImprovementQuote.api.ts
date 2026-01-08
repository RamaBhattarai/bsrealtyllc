import { publicApiClient } from './client';
import apiClient from './client';

// Home Improvement Quote API functions
export const homeImprovementQuoteAPI = {
  // Submit quote (public)
  submit: async (data: HomeImprovementQuoteFormData): Promise<SubmitResponse> => {
    const response = await publicApiClient.post('/home-improvement-quotes', data);
    return response.data as SubmitResponse;
  },

  // Get all quotes (admin only)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    propertyType?: string;
    timeline?: string;
    status?: string;
  }): Promise<QuotesResponse> => {
    const response = await apiClient.get('/home-improvement-quotes', { params });
    return response.data as QuotesResponse;
  },

  // Get quote by ID (admin only)
  getById: async (id: string): Promise<HomeImprovementQuote> => {
    const response = await apiClient.get(`/home-improvement-quotes/${id}`);
    return response.data as HomeImprovementQuote;
  },

  // Delete quote (admin only)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/home-improvement-quotes/${id}`);
  },

  // Get stats (admin only)
  getStats: async (): Promise<HomeImprovementQuoteStats> => {
    const response = await apiClient.get('/home-improvement-quotes/stats');
    return response.data as HomeImprovementQuoteStats;
  },

  // Update quote status (admin only)
  updateStatus: async (id: string, status: 'new' | 'pending' | 'responded' | 'closed'): Promise<HomeImprovementQuote> => {
    const response = await apiClient.patch(`/home-improvement-quotes/${id}/status`, { status });
    return response.data as HomeImprovementQuote;
  },
};

// Types
export interface HomeImprovementQuoteFormData {
  helpType: string[];
  installReplaceItem: string[];
  propertyType: string;
  timeline: string;
  projectDescription: string;
  areasOfWork: string[];
  address: string;
  phoneNumber: string;
  textUpdates: boolean;
  name: string;
  email: string;
  projectUpdates: boolean;
}

export interface HomeImprovementQuote {
  _id: string;
  helpType: string[];
  installReplaceItem: string[];
  propertyType: string;
  timeline: string;
  projectDescription: string;
  areasOfWork: string[];
  address: string;
  phoneNumber: string;
  textUpdates: boolean;
  name: string;
  email: string;
  projectUpdates: boolean;
  status: 'new' | 'pending' | 'responded' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
  quoteId?: string;
}

export interface QuotesResponse {
  quotes: HomeImprovementQuote[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface HomeImprovementQuoteStats {
  total: number;
  pending: number;
  responded: number;
  closed: number;
  recent: number;
}