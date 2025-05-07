
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { User } from '../api/types/authTypes';
import { useCurrentUser, useLogoutMutation } from '../api/hooks/useAuthQueries';

interface AuthContextType {
  user: User | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading, refetch } = useCurrentUser();
  const { mutate: logout } = useLogoutMutation();
  const token = localStorage.getItem('access_token');
  
  const isAuthenticated = !isLoading && !!user && !!token;
  
  // Refetch user when token changes
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);
  
  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
