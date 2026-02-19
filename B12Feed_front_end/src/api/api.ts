import axios from 'axios';

// --- 1. TYPES & INTERFACES ---

export interface UserCredentials {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    orgName?: string;
    orgAddress?: string;
    phone?: string;
}

// Renamed to avoid "Type vs Value" naming conflicts
export interface NewUserSignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    orgName: string;
    orgAddress: string;
    phone: string;
}

export interface FoodPostData {
    _id?: string;
    id?: number | string;
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
    image?: any; 
    resource_image?: Array<{
        image: string[];
    }>;
    userId?: {
        _id: string;
        firstName: string;
        orgName: string;
        address: string;
    };
    status?: string;
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

export const listResources = async () => {
    try {
        const response = await apiClient.get('/api/discover');
        return response;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve resources');
    }
};

export const getMyPosts = async (): Promise<FoodPostData[]> => {
    try {
        const { data } = await apiClient.get<FoodPostData[]>('/api/my-resources');
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch your posts');
    }
};

export const detailResource = async (id: string) => {
    try {
        const response = await apiClient.get(`/api/detail/${id}`);
        return response;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve details');
    }
};

export const getPostById = async (id: number | string): Promise<FoodPostData> => {
    try {
        const { data } = await apiClient.get<FoodPostData>(`/api/resourcePost/${id}`);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch post');
    }
};

export const postFood = async (foodData: any): Promise<number> => {
    try {
        const { status } = await apiClient.post('/api/resourcePost', foodData);
        return status;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to post food');
    }
};

export const updateFoodPost = async (id: number | string, foodData: any): Promise<number> => {
    try {
        const { status } = await apiClient.put(`/api/resourcePost/${id}`, foodData);
        return status;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to update post');
    }
};

// --- 4. AUTHENTICATION FUNCTIONS ---

/**
 * Main Signup function
 * Uses the /users/signup endpoint
 */
export const signupUser = async (credentials: NewUserSignupData): Promise<number> => {
    try {
        const { status } = await apiClient.post('users/signup', credentials);
        return status;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Sign up failed');
    }
};

export const login = async (credentials: UserCredentials): Promise<any> => {
    try {
        return await apiClient.post('users/auth', credentials);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

// --- 5. RESOURCE ACTION FUNCTIONS ---

export const claimResource = async (id: string) => {
    try {
        const response = await apiClient.post('api/claimResource', { id });
        return response;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to claim resource');
    }
};