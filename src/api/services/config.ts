
// Base API URL - adjust based on your environment
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Export a function to check if backend is available
export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    console.error('Backend connection check failed:', error);
    return false;
  }
};
