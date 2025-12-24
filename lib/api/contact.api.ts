import { apiMethods, handleAPIError } from './client';

// TypeScript interfaces for contact
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  contactId?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface ContactStats {
  total: number;
  pending: number;
  responded: number;
  closed: number;
  thisMonth: number;
  lastMonth: number;
}

// Contact API endpoints
export const contactAPI = {
  // Submit contact form (public endpoint)
  submit: async (data: ContactFormData): Promise<ContactSubmissionResponse> => {
    try {
      return await apiMethods.post('/contacts/submit', data);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get all contacts (admin only)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{
    contacts: Contact[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    try {
      const queryString = new URLSearchParams(
        Object.entries(params || {})
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ).toString();
      
      return await apiMethods.get(`/contacts?${queryString}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get contact by ID (admin only)
  getById: async (id: string): Promise<{ contact: Contact }> => {
    try {
      return await apiMethods.get(`/contacts/${id}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Update contact status (admin only)
  updateStatus: async (
    id: string,
    status: 'pending' | 'responded' | 'closed'
  ): Promise<{ contact: Contact; message: string }> => {
    try {
      return await apiMethods.patch(`/contacts/${id}/status`, { status });
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Delete contact (admin only)
  delete: async (id: string): Promise<{ message: string }> => {
    try {
      return await apiMethods.delete(`/contacts/${id}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Export contacts to CSV (admin only)
  exportCSV: async (): Promise<Blob> => {
    try {
      // For CSV export, we need to handle the response differently
      return await apiMethods.get('/contacts/export/csv', {
        responseType: 'blob'
      });
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get contact statistics (admin only)
  getStats: async (): Promise<ContactStats> => {
    try {
      return await apiMethods.get('/contacts/stats/overview');
    } catch (error) {
      throw handleAPIError(error);
    }
  },
};