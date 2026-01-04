import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  // No default Content-Type for FormData
});

// Create public API client without auth interceptor
export const publicApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  // No default Content-Type for FormData
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config: any) => {
    // Get token from localStorage or wherever you store it
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // Global error handling
    console.error('API Error:', error);

    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Internal server error');
          break;
        default:
          console.error('API Error:', error.response.data?.message || 'Unknown error');
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

// Generic API methods
export const apiMethods = {
  get: (url: string, config?: any) =>
    apiClient.get(url, config).then((response: any) => response.data),

  post: (url: string, data?: any, config?: any) =>
    apiClient.post(url, data, config).then((response: any) => response.data),

  put: (url: string, data?: any, config?: any) =>
    apiClient.put(url, data, config).then((response: any) => response.data),

  patch: (url: string, data?: any, config?: any) =>
    apiClient.patch(url, data, config).then((response: any) => response.data),

  delete: (url: string, config?: any) =>
    apiClient.delete(url, config).then((response: any) => response.data),
};

// API Error class for better error handling
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Error handler utility
export const handleAPIError = (error: any): APIError => {
  if (error.response) {
    return new APIError(
      error.response.data?.message || 'Server error',
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    return new APIError('Network error - please check your connection');
  } else {
    return new APIError(error.message || 'Unknown error');
  }
};

export default apiClient;