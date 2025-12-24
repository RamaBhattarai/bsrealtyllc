import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI, type LoginRequest, type RegisterRequest } from '../lib/api/auth.api';
import toast from 'react-hot-toast';

// Query keys for React Query cache management
export const AUTH_QUERY_KEYS = {
  profile: ['auth', 'profile'] as const,
  user: (id: string) => ['auth', 'user', id] as const,
} as const;

// Login mutation hook
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // Store token
      authAPI.setToken(data.token);
      
      // Update cache with user data
      queryClient.setQueryData(AUTH_QUERY_KEYS.profile, { user: data.user });
      
      // Show success message
      toast.success(data.message || 'Login successful!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed');
    },
  });
};

// Register mutation hook
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      // Store token
      authAPI.setToken(data.token);
      
      // Update cache with user data
      queryClient.setQueryData(AUTH_QUERY_KEYS.profile, { user: data.user });
      
      // Show success message
      toast.success(data.message || 'Registration successful!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed');
    },
  });
};

// Get profile query hook
export const useProfile = (enabled: boolean = true) => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.profile,
    queryFn: authAPI.getProfile,
    enabled: enabled && authAPI.isAuthenticated(),
    retry: (failureCount, error: any) => {
      // Don't retry on 401 (unauthorized)
      if (error?.status === 401) return false;
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Logout mutation hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      authAPI.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all cache
      queryClient.clear();
      
      // Show success message
      toast.success('Logged out successfully');
      
      // Redirect to home or login page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    },
  });
};

// Helper hook to get current user
export const useCurrentUser = () => {
  const { data, isLoading, error } = useProfile();
  return {
    user: data?.user || null,
    isLoading,
    isAuthenticated: !!data?.user,
    error,
  };
};

// Helper hook to check authentication status
export const useAuth = () => {
  const { user, isLoading, isAuthenticated } = useCurrentUser();
  
  return {
    user,
    isLoading,
    isAuthenticated,
    isAgent: user?.role === 'agent',
    isClient: user?.role === 'client',
    isAdmin: user?.role === 'admin',
  };
};