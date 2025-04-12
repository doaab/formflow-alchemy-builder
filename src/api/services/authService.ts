
import { User } from '../types/authTypes';
import { API_URL } from './config';

/**
 * Get CSRF cookie from Laravel Sanctum
 */
export const getCsrfCookie = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CSRF cookie: ${response.status}`);
    }

    // Give the browser a moment to save the cookie
    await new Promise(resolve => setTimeout(resolve, 100));
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
    
    return await response.json();
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
    
    // After successful login, check the authentication status
    const authCheckResponse = await fetch(`${API_URL}/auth/check`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    
    if (!authCheckResponse.ok) {
      throw new Error('Authentication verification failed after login');
    }
    
    const authStatus = await authCheckResponse.json();
    if (!authStatus.authenticated) {
      throw new Error('Login succeeded but session was not established');
    }
    
    return await response.json();
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
    // Get CSRF cookie first if needed
    await getCsrfCookie();
    
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
 * Check auth status without throwing (for internal use)
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
    
    if (!response.ok) return false;
    
    const status = await response.json();
    return status.authenticated === true;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};
