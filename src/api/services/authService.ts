
import { User } from '../types/authTypes';
import { API_URL } from './config';

/**
 * Get CSRF cookie from Laravel Sanctum
 */
export const getCsrfCookie = async (): Promise<void> => {
  try {
    const csrfUrl = `${API_URL.replace('/api', '')}/sanctum/csrf-cookie`;
    console.log('Fetching CSRF token from:', csrfUrl);
    
    const response = await fetch(csrfUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
    });
    
    console.log('CSRF cookie response:', response.status);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF token: ${response.status}`);
    }
    
    // Wait a moment to ensure cookie is set
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return;
  } catch (error) {
    console.error('Error fetching CSRF cookie:', error);
    throw error;
  }
};

/**
 * Register a new user
 */
export const register = async (name: string, email: string, password: string, passwordConfirmation: string): Promise<{user: User, message: string}> => {
  try {
    // Get CSRF cookie first
    await getCsrfCookie();
    
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include', 
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Registration failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verify we're logged in after registration
    const authCheck = await checkAuthStatus();
    if (!authCheck) {
      throw new Error('Authentication verification failed after registration');
    }
    
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

/**
 * Login a user
 */
export const login = async (email: string, password: string): Promise<{user: User, message: string}> => {
  try {
    // Get CSRF cookie first
    await getCsrfCookie();
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include', 
      body: JSON.stringify({
        email,
        password
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Verify we're logged in after login
    const authCheck = await checkAuthStatus();
    if (!authCheck) {
      throw new Error('Authentication verification failed after login');
    }
    
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

/**
 * Logout the current user
 */
export const logout = async (): Promise<{message: string}> => {
  try {
    // Get CSRF cookie first
    await getCsrfCookie();
    
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Logout failed with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = async (): Promise<{user: User}> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    });
    
    if (response.status === 401) {
      throw new Error('User not authenticated');
    }
    
    if (!response.ok) {
      throw new Error(`Failed to get user with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};

/**
 * Check auth status using the /auth/check endpoint
 */
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/auth/check`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    
    if (!response.ok) {
      console.error('Auth check failed with status:', response.status);
      return false;
    }
    
    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};
