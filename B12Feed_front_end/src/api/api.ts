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

export interface newUserSignup {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    orgName: string;
    orgAddress: string;
    phone: string;
}

export interface FoodPostData {
    _id?: string; // MongoDB ID
    id?: number | string; // Local/Legacy ID support
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
    // Flexible image support for both raw File uploads and backend responses
    image?: any; 
    resource_image?: Array<{
        image: string[];
    }>;
    // Populated User data from backend
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

/**
 * Fetches all posts for the Discover page.
 */
export const listResources = async () => {
    try {
        const response = await apiClient.get('/api/discover');
        return response;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve resources');
    }
};

/**
 * Fetches all posts for the logged-in user.
 */
export const getMyPosts = async (): Promise<FoodPostData[]> => {
    try {
        const { data } = await apiClient.get<FoodPostData[]>('/api/my-resources');
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch your posts');
    }
};

/**
 * Fetches a single post by ID (used for Details/Edit Mode)
 */
export const detailResource = async (id: string) => {
    try {
        const response = await apiClient.get(`/api/detail/${id}`);
        return response;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve details');
    }
};

/**
 * Support for fetching by ID via resourcePost route if needed
 */
export const getPostById = async (id: number | string): Promise<FoodPostData> => {
    try {
        const { data } = await apiClient.get<FoodPostData>(`/api/resourcePost/${id}`);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch post');
    }
};

/**
 * Sends NEW food post data to the backend. 
 * Uses multipart/form-data to support image uploads.
 */
export const postFood = async (foodData: any): Promise<number> => {
    try {
        const { status } = await apiClient.post('/api/resourcePost', foodData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return status;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to post food');
    }
};

/**
 * Updates an existing food post
 */
export const updateFoodPost = async (id: number | string, foodData: any): Promise<number> => {
    try {
        const { status } = await apiClient.put(`/api/resourcePost/${id}`, foodData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return status;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to update post');
    }
};

// --- 4. AUTHENTICATION FUNCTIONS ---

export const signUp = async (userData: UserCredentials): Promise<string> => {
    try {
        const { data } = await apiClient.post<string>('/signup', userData);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Sign up failed');
    }
};

export const newUserSignup = async (credentials: newUserSignup): Promise<number> => {
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
        // Log ID for debugging as in your previous version
        console.log("Claiming Resource ID:", id);
        const response = await apiClient.post('api/claimResource', { id });
        console.log("Claim Response:", response);
        return response;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to claim resource');
    }
};