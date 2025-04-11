
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { register, login, logout, getCurrentUser } from '../services/authService';
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
      toast.success(data.message || 'Login successful');
      navigate('/forms');
    },
    onError: (error: Error) => {
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
        const { user } = await getCurrentUser();
        return user;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
