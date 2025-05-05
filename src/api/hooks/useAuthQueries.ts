
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { register, login, logout, getCurrentUser, checkAuthStatus } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async ({ name, email, password, passwordConfirmation }: 
      { name: string, email: string, password: string, passwordConfirmation: string }) => {
      return await register(name, email, password, passwordConfirmation);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success(data.message || 'Registration successful');
      navigate('/forms');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    }
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async ({ email, password }: { email: string, password: string }) => {
      return await login(email, password);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      // Force refetch user data to ensure session is active
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data.message || 'Login successful');
      // Don't navigate here, we'll do it in the component with proper redirects
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      toast.error(error.message || 'Login failed');
    }
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success(data.message || 'Logout successful');
      navigate('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Logout failed');
    }
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        // Go directly to the user endpoint instead of the auth check
        const { user } = await getCurrentUser().catch(() => ({ user: null }));
        return user;
      } catch (error) {
        // For unauthorized errors (401), just return null instead of throwing
        if (error instanceof Error && (error.message.includes('401') || error.message.includes('Unauthorized') || error.message.includes('not authenticated'))) {
          console.info('User not logged in yet');
          return null;
        }
        // Only log other types of errors that aren't authentication related
        console.error('Error fetching current user:', error);
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Explicitly ensure we return null rather than undefined
    select: (data) => data || null,
  });
};
