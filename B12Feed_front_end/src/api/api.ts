import axios from 'axios';

// --- 1. TYPES & INTERFACES ---
export interface AuthResponse {
    message: string;
    sign?: string; // This is the JWT/Auth token
}

export interface UserCredentials {
    email: string;
    password?: string;
}

// --- 2. AXIOS INSTANCE CONFIGURATION ---
const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- 3. API SERVICE FUNCTIONS ---

/**
 * Sends user credentials to create a new account
 */
export const signUp = async (credentials: UserCredentials): Promise<string> => {
    try {
        const { data } = await apiClient.post<string>('/signup', credentials);
        return data;
    } catch (error) {
        throw new Error('Sign up failed');
    }
};

/**
 * Sends user credentials to authenticate and receive a token
 * Note: Changed to .post because sending passwords via .get is insecure
 */
export const login = async (credentials: UserCredentials): Promise<AuthResponse> => {
    try {
        const { data } = await apiClient.post<AuthResponse>('/login', credentials);
        return data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

export default {
    signUp,
    login
};