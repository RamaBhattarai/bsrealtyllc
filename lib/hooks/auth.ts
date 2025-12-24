import { useMutation } from '@tanstack/react-query';
import { authAPI, type LoginRequest, type AuthResponse } from '../api/auth.api';
import toast from 'react-hot-toast';

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      if (data.token) {
        // Store token using the API utility
        authAPI.setToken(data.token);

        toast.success('Login successful! Welcome back.');

        // Navigation will be handled in the component
        // You can also set up global state management here
        // For example, with Zustand, Redux, or Context API
      }
    },
    onError: (error) => {
      console.error('Login error:', error.message);
      toast.error(error.message || 'Login failed. Please try again.');
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      // Toast will be shown by the login page when redirected
    },
    onError: (error) => {
      console.error('Registration error:', error.message);
      toast.error(error.message || 'Registration failed. Please try again.');
    },
  });
};

// Utility functions for auth state
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
