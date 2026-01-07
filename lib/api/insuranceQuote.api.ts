import { apiMethods, handleAPIError } from './client';

// TypeScript interfaces for insurance quote
export interface InsuranceQuoteFormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Not Specified';
  email: string;
  phone: string;
  dlNumber: string;
  dlState?: string;
  ageLicensed?: number;
  dlStatus: 'Valid' | 'Permit' | 'Expired' | 'Suspended' | 'Cancelled' | 'Permanently Revoked';
  licenseSuspendedYears: 'Yes' | 'No';
  primaryAddress: string;
  yearsAtAddress: number;
  monthsAtAddress?: number;
  previousAddress?: string;
  maritalStatus: 'Single' | 'Married' | 'Domestic Partner' | 'Divorced' | 'Widowed' | 'Separated';
  occupation: string;
  military: 'Yes' | 'No';
  paperless: 'Yes' | 'No';

  // Co-Applicant Information
  coApplicantRelationship?: 'Spouse' | 'Child' | 'Parent' | 'Domestic Partner' | 'Relative' | 'Others';
  coApplicantFullName?: string;
  coApplicantDOB?: string;
  coApplicantDLNumber?: string;
  coApplicantMilitary?: 'Yes' | 'No';

  // Auto Section
  priorCarrier?: string;
  yearsWithPrior?: number;
  priorExpirationDate?: string;
  newEffectiveDate?: string;
  vin: string;
  datePurchased: string;
  vehicleUse: string;
  milesPerDay?: number;
  ownershipType?: string;
  bodilyInjury?: 'State Minimum' | '25/50' | '50/100' | '100/300';
  propertyDamage?: 'State Minimum' | '25000' | '50000' | '100000' | '250000';
  uninsuredMotor?: 'Yes' | 'No';
  comprehensiveDeduction?: 'No coverage' | '$0' | '$50' | '$100' | '$200' | '$500' | '$1000' | '$2000' | '$2500';
  collisionDeduction?: 'No coverage' | '$0' | '$50' | '$100' | '$200' | '$500' | '$1000' | '$2000' | '$2500';
  towingCoverage?: string;
  rentalCoverage?: string;

  // Property Section
  propertyAddress: string;
  propertyPriorCarrier?: string;
  propertyPurchaseDate?: string;
  currentPolicyExpiration?: string;
  yearsWithPriorPolicy?: number;
  yearsContinuousPolicy?: number;
  newPropertyEffectiveDate?: string;
  dwellingUsage: 'Primary Home' | 'Secondary Home' | 'Seasonal Home' | 'Farm' | 'Rental Property' | 'Commercial Property';
  occupancyType: 'Owner Occupied' | 'Renter Occupied' | 'Unoccupied' | 'Vacant' | 'Business';
  foundationType: 'Basement - Finished' | 'Basement - Partially Finished' | 'Basement - Unfinished' | 'Crawl Space - Enclosed' | 'Crawl Space - Open' | 'Slab' | 'Piers' | 'Pilings/stilts' | 'Hillside Foundation' | 'Other';
  roofType: 'Architectural Shingles' | 'Asphalt Shingles' | 'Composition' | 'Copper' | 'Corrugated Steel' | 'Fiberglass' | 'Foam' | 'Gravel' | 'Metal' | 'Plastic' | 'Tar' | 'Slate' | 'Other';
  additionalInfo?: string;
}

export interface InsuranceQuote {
  id: string;
  _id?: string;
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Not Specified';
  email: string;
  phone: string;
  dlNumber: string;
  dlState?: string;
  ageLicensed?: number;
  dlStatus: 'Valid' | 'Permit' | 'Expired' | 'Suspended' | 'Cancelled' | 'Permanently Revoked';
  licenseSuspendedYears: 'Yes' | 'No';
  primaryAddress: string;
  yearsAtAddress: number;
  monthsAtAddress?: number;
  previousAddress?: string;
  maritalStatus: 'Single' | 'Married' | 'Domestic Partner' | 'Divorced' | 'Widowed' | 'Separated';
  occupation: string;
  military: 'Yes' | 'No';
  paperless: 'Yes' | 'No';

  // Co-Applicant Information
  coApplicantRelationship?: 'Spouse' | 'Child' | 'Parent' | 'Domestic Partner' | 'Relative' | 'Others';
  coApplicantFullName?: string;
  coApplicantDOB?: string;
  coApplicantDLNumber?: string;
  coApplicantMilitary?: 'Yes' | 'No';

  // Auto Section
  priorCarrier?: string;
  yearsWithPrior?: number;
  priorExpirationDate?: string;
  newEffectiveDate?: string;
  vin: string;
  datePurchased: string;
  vehicleUse: string;
  milesPerDay?: number;
  ownershipType?: string;
  bodilyInjury?: 'State Minimum' | '25/50' | '50/100' | '100/300';
  propertyDamage?: 'State Minimum' | '25000' | '50000' | '100000' | '250000';
  uninsuredMotor?: 'Yes' | 'No';
  comprehensiveDeduction?: 'No coverage' | '$0' | '$50' | '$100' | '$200' | '$500' | '$1000' | '$2000' | '$2500';
  collisionDeduction?: 'No coverage' | '$0' | '$50' | '$100' | '$200' | '$500' | '$1000' | '$2000' | '$2500';
  towingCoverage?: string;
  rentalCoverage?: string;

  // Property Section
  propertyAddress: string;
  propertyPriorCarrier?: string;
  propertyPurchaseDate?: string;
  currentPolicyExpiration?: string;
  yearsWithPriorPolicy?: number;
  yearsContinuousPolicy?: number;
  newPropertyEffectiveDate?: string;
  dwellingUsage: 'Primary Home' | 'Secondary Home' | 'Seasonal Home' | 'Farm' | 'Rental Property' | 'Commercial Property';
  occupancyType: 'Owner Occupied' | 'Renter Occupied' | 'Unoccupied' | 'Vacant' | 'Business';
  foundationType: 'Basement - Finished' | 'Basement - Partially Finished' | 'Basement - Unfinished' | 'Crawl Space - Enclosed' | 'Crawl Space - Open' | 'Slab' | 'Piers' | 'Pilings/stilts' | 'Hillside Foundation' | 'Other';
  roofType: 'Architectural Shingles' | 'Asphalt Shingles' | 'Composition' | 'Copper' | 'Corrugated Steel' | 'Fiberglass' | 'Foam' | 'Gravel' | 'Metal' | 'Plastic' | 'Tar' | 'Slate' | 'Other';
  additionalInfo?: string;
  investmentInterest: string[];
  insuranceInterest: string[];

  // Metadata
  status: 'new' | 'pending' | 'responded' | 'closed';
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InsuranceQuoteStats {
  total: number;
  pending: number;
  responded: number;
  closed: number;
  recent: number;
}

export interface InsuranceQuoteResponse {
  quotes: InsuranceQuote[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Insurance Quote API endpoints
const insuranceQuoteAPI = {
  // Submit insurance quote (public)
  submit: async (data: InsuranceQuoteFormData): Promise<{ message: string; quoteId: string }> => {
    try {
      return await apiMethods.post('/insurance-quotes/submit', data);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get all insurance quotes with pagination and filters
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    dwellingUsage?: string;
    occupancyType?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<InsuranceQuoteResponse> => {
    try {
      const queryString = new URLSearchParams(
        Object.entries(params || {})
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ).toString();

      return await apiMethods.get(`/insurance-quotes?${queryString}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get insurance quote by ID
  getById: async (id: string): Promise<{ quote: InsuranceQuote }> => {
    try {
      return await apiMethods.get(`/insurance-quotes/${id}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Update insurance quote status
  updateStatus: async (id: string, status: 'new' | 'pending' | 'responded' | 'closed'): Promise<InsuranceQuote> => {
    try {
      const response = await apiMethods.patch(`/insurance-quotes/${id}/status`, { status });
      return response.quote;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Delete insurance quote
  delete: async (id: string): Promise<void> => {
    try {
      await apiMethods.delete(`/insurance-quotes/${id}`);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get insurance quote statistics
  getStats: async (): Promise<InsuranceQuoteStats> => {
    try {
      return await apiMethods.get('/insurance-quotes/stats');
    } catch (error) {
      throw handleAPIError(error);
    }
  },
};

export { insuranceQuoteAPI };