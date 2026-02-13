import axios from 'axios';

// --- 1. TYPES & INTERFACES ---
// export interface AuthResponse {
//     message: string;
//     sign?: string; // This is the JWT/Auth token
// }

export interface UserCredentials {
    email: string;
    password?: string;
}

export interface newUserSignup {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    orgName: string;
    orgAddress: string;
    phone: string;
}

// --- 2. AXIOS INSTANCE CONFIGURATION ---
const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// --- 3. API SERVICE FUNCTIONS ---

/**
 * Sends user credentials to create a new account
 */
export const newUserSignup = async (credentials: newUserSignup): Promise<number> => {
    try {
        const { status } = await apiClient.post<string>('users/signup', credentials);
        return status;
    } catch (error) {
        throw new Error('Sign up failed');
    }
};

/**
 * Sends user credentials to authenticate and receive a token
 * Note: Changed to .post because sending passwords via .get is insecure
 */
export const login = async (credentials: UserCredentials): Promise<number> => {
    try {
        const { status } = await apiClient.post<string>('users/auth', credentials);
        return status;
    } catch (error) {
        throw new Error('Login failed');
    }
};


export default {
    newUserSignup,
    login
};