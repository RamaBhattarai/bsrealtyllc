const API_BASE_URL = 'http://localhost:5000/api'; // Update this for production

export interface LoginRequest {
  email: string;
  password: string;
  role: 'agent' | 'client' | 'admin';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    role: 'agent' | 'client' | 'admin';
    name: string;
  };
  token?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  },

  register: async (data: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
  },

  // Contact form submission
  submitContact: async (data: ContactFormData) => {
    const response = await fetch(`${API_BASE_URL}/contacts/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit contact form');
    }

    return response.json();
  },
};

// Generic API error handler
export const handleAPIError = (error: unknown): string => {
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
      return 'Unable to connect to server. Please check your internet connection and try again.';
    }
    
    // Server errors
    if (error.message.includes('500')) {
      return 'Server error. Please try again later.';
    }
    
    // Validation or other API errors
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};
