import { apiMethods, handleAPIError } from './client';

// TypeScript interfaces for property inquiry
export interface PropertyInquiryFormData {
  name: string;
  phone: string;
  email?: string;
  preferredContact: 'Phone call' | 'Text message' | 'Email';
  realEstateNeeds: string[];
  propertyType: string[];
  budgetRange?: string;
  timeline?: string;
  locations?: string;
  purchaseType: 'Cash purchase' | 'Mortgage loan' | 'Refinance';
  loanOfficerAssistance: 'Yes' | 'No' | 'Maybe';
  concerns?: string;
  investmentInterest: string[];
  insuranceInterest: string[];
  additionalInfo?: string;
}

export interface PropertyInquiry {
  id: string;
  _id?: string;
  name: string;
  phone: string;
  email?: string;
  preferredContact: 'Phone call' | 'Text message' | 'Email';
  realEstateNeeds: string[];
  propertyType: string[];
  budgetRange?: string;
  timeline?: string;
  locations?: string;
  purchaseType: 'Cash purchase' | 'Mortgage loan' | 'Refinance';
  loanOfficerAssistance: 'Yes' | 'No' | 'Maybe';
  concerns?: string;
  investmentInterest: string[];
  insuranceInterest: string[];
  additionalInfo?: string;
  status: 'new' | 'pending' | 'responded' | 'closed';
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyInquiryStats {
  total: number;
  pending: number;
  responded: number;
  closed: number;
  recent: number;
}

// Property Inquiry API endpoints
const propertyInquiryAPI = {
  // Submit property inquiry (public)
  submit: async (data: PropertyInquiryFormData): Promise<{ message: string; inquiryId: string }> => {
    try {
      return await apiMethods.post('/property-inquiries/submit', data);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get all property inquiries with pagination and filters
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    purchaseType?: string;
    preferredContact?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    inquiries: PropertyInquiry[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> => {
    try {
      const queryString = new URLSearchParams(
        Object.entries(params || {})
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ).toString();

      return await apiMethods.get(`/property-inquiries?${queryString}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get property inquiry by ID
  getById: async (id: string): Promise<{ inquiry: PropertyInquiry }> => {
    try {
      return await apiMethods.get(`/property-inquiries/${id}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Update property inquiry status
  updateStatus: async (id: string, status: 'new' | 'pending' | 'responded' | 'closed'): Promise<PropertyInquiry> => {
    try {
      const response = await apiMethods.patch(`/property-inquiries/${id}/status`, { status });
      return response.inquiry;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Delete property inquiry
  delete: async (id: string): Promise<void> => {
    try {
      await apiMethods.delete(`/property-inquiries/${id}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get property inquiry statistics
  getStats: async (): Promise<PropertyInquiryStats> => {
    try {
      return await apiMethods.get('/property-inquiries/stats');
    } catch (error) {
      throw handleAPIError(error);
    }
  },
};

export { propertyInquiryAPI };