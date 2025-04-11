
import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '../api/types/authTypes';
import { useCurrentUser, useLogoutMutation } from '../api/hooks/useAuthQueries';

interface AuthContextType {
  user: User | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogoutMutation();
  
  const isAuthenticated = !!user;
  
  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, logout }}>
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
