
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, login, logout, register } from '../services/authService';
import { AuthResponse } from '../types/authTypes';

export const useAuth = () => {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
        const result = await login(email, password);
        return result;
    };

    const logoutUser = async () => {
        const result = await logout();
        return result;
    };

    const registerUser = async (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ): Promise<AuthResponse> => {
        const result = await register(name, email, password, passwordConfirmation);
        return result;
    };

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login: loginUser,
        logout: logoutUser,
        register: registerUser,
    };
};
