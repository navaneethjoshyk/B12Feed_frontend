import axios from 'axios';

// --- 1. UPDATED TYPES ---
export interface AuthResponse {
    message: string;
    sign?: string; 
}

export interface UserCredentials {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    orgName?: string;
    orgAddress?: string;
    phone?: string;
}

// Interface for the Share Food form
export interface FoodPostData {
    title: string;
    category: string;
    description: string;
    quantity: string;
    unit: string;
    condition: string;
    pickupWindow: {
        from: string;
        to: string;
    };
    pickupAddress: string;
    expiryDate: string;
    urgency: string;
    image?: File | null; 
}

// --- 2. AXIOS INSTANCE ---
const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- 3. API SERVICE FUNCTIONS ---

export const signUp = async (userData: UserCredentials): Promise<string> => {
    try {
        const { data } = await apiClient.post<string>('/signup', userData);
        return data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Sign up failed';
        throw new Error(message);
    }
};

export const login = async (credentials: UserCredentials): Promise<AuthResponse> => {
    try {
        const { data } = await apiClient.post<AuthResponse>('/login', credentials);
        return data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Login failed';
        throw new Error(message);
    }
};

/**
 * Sends food post data to the backend. 
 * Uses FormData to support image uploads.
 */
export const postFood = async (foodData: FoodPostData): Promise<any> => {
    try {
        const formData = new FormData();
        
        // Append all standard fields
        formData.append('title', foodData.title);
        formData.append('category', foodData.category);
        formData.append('description', foodData.description);
        formData.append('quantity', foodData.quantity);
        formData.append('unit', foodData.unit);
        formData.append('condition', foodData.condition);
        formData.append('pickupAddress', foodData.pickupAddress);
        formData.append('expiryDate', foodData.expiryDate);
        formData.append('urgency', foodData.urgency);
        formData.append('pickupWindow', JSON.stringify(foodData.pickupWindow));

        // Append image if it exists
        if (foodData.image) {
            formData.append('image', foodData.image);
        }

        const { data } = await apiClient.post('/api/resources', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to post food';
        throw new Error(message);
    }
};

export default {
    signUp,
    login,
    postFood
};