import { apiMethods, handleAPIError } from './client';

// TypeScript interfaces for auth
export interface LoginRequest {
  email: string;
  password: string;
  role: 'agent' | 'client' | 'admin';
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'agent' | 'client';
  phone?: string;
  licenseNumber?: string;
  brokerage?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    phone?: string;
    licenseNumber?: string;
    brokerage?: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  licenseNumber?: string;
  brokerage?: string;
}

// Auth API endpoints
export const authAPI = {
  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      return await apiMethods.post('/auth/login', data);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Register user
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      return await apiMethods.post('/auth/register', data);
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get user profile
  getProfile: async (): Promise<{ user: UserProfile }> => {
    try {
      return await apiMethods.get('/auth/profile');
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Logout (clear token)
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('authToken');
  },

  // Get stored token
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  },

  // Store token
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  },
};