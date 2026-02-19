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

export interface FoodPostData {
    id?: number;
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
    image?: File | string | null;
    // Added to support the populated backend data for Discover page
    userId?: {
        _id: string;
        firstName: string;
        orgName: string;
        address: string;
    };
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
 * Fetches all posts for the Discover page.
 */
export const getAllPosts = async (): Promise<FoodPostData[]> => {
    try {
        const { data } = await apiClient.get<FoodPostData[]>('/api/discover');
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch discover posts');
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
        const message = error.response?.data?.message || 'Failed to fetch your posts';
        throw new Error(message);
    }
};

/**
 * Fetches a single post by ID (used for Edit Mode)
 */
export const getPostById = async (id: number | string): Promise<FoodPostData> => {
    try {
        const { data } = await apiClient.get<FoodPostData>(`/api/resourcePost/${id}`);
        return data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to fetch post';
        throw new Error(message);
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
        const message = error.response?.data?.message || 'Failed to post food';
        throw new Error(message);
    }
}

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
        const message = error.response?.data?.message || 'Failed to update post';
        throw new Error(message);
    }
};

// --- AUTHENTICATION FUNCTIONS ---

export const signUp = async (userData: UserCredentials): Promise<string> => {
    try {
        const { data } = await apiClient.post<string>('/signup', userData);
        return data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Sign up failed';
        throw new Error(message);
    }
};

export const newUserSignup = async (credentials: newUserSignup): Promise<number> => {
    try {
        const { status } = await apiClient.post<string>('users/signup', credentials);
        return status;
    } catch (error) {
        throw new Error('Sign up failed');
    }
};

export const login = async (credentials: UserCredentials): Promise<any> => {
    try {
        const response = await apiClient.post<string>('users/auth', credentials);
        return response;
    } catch (error) {
        throw new Error('Login failed');
    }
};

// --- RESOURCE ACTION FUNCTIONS ---

export const claimResource = async(id: string) => {
    try {
        console.log(id)
        const response = await apiClient.post<string>('api/claimResource', {id: id}, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        return response;
    } catch(error) {
        throw new Error('Failed to claim')
    }
}

export const listResources = async() => {
    try {
        const response = await apiClient.get('api/discover');
        return response;
    } catch(error) {
        throw new Error('Failed to retrieve')
    }
}

export const detailResource = async(id: string) => {
    try {
        const response = await apiClient.get(`api/detail/${id}`)
        return response;
    } catch(error) {
        throw new Error('Failed to retrieve');
    }
}