
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, getCurrentUser } from '@/api/services/authService';
import { User } from '@/api/types/authTypes';
import { toast } from 'sonner';
import { useTranslation } from './TranslationContext';
import { addLanguageToPath } from '@/i18n/languageUtils';

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { currentLanguage } = useTranslation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const loginHandler = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.access_token || '');
      setUser(response.user);
      navigate(addLanguageToPath('/dashboard', currentLanguage));
      toast.success('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logout();
      localStorage.removeItem('token');
      setUser(null);
      navigate(addLanguageToPath('/login', currentLanguage));
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const authContextValue: AuthContextProps = {
    user,
    isLoading,
    login: loginHandler,
    logout: logoutHandler
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
