import axios from 'axios';

// --- 1. TYPES & INTERFACES ---
// export interface AuthResponse {
//     message: string;
//     sign?: string; // This is the JWT/Auth token
// }

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

// Claim food status
interface claimFoodStatus {
    status: string;
}

// --- 2. AXIOS INSTANCE ---
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

export const signUp = async (userData: UserCredentials): Promise<string> => {
    try {
        const { data } = await apiClient.post<string>('/signup', userData);
        return data;
    } catch (error: any) {
        const message = error.response?.data?.message || 'Sign up failed';
        throw new Error(message);
    }
};


/**
 * Sends food post data to the backend. 
 * Uses FormData to support image uploads.
 */
export const postFood = async (foodData: FoodPostData): Promise<any> => {
    try {
        // const formData = new FormData();
        // // Append all standard fields
        // formData.append('title', foodData.title);
        // formData.append('category', foodData.category);
        // formData.append('description', foodData.description);
        // formData.append('quantity', foodData.quantity);
        // formData.append('unit', foodData.unit);
        // formData.append('condition', foodData.condition);
        // formData.append('pickupAddress', foodData.pickupAddress);
        // formData.append('expiryDate', foodData.expiryDate);
        // formData.append('urgency', foodData.urgency);
        // formData.append('pickupWindow', JSON.stringify(foodData.pickupWindow));
        // console.log(formData)
        // Append image if it exists
        // if (foodData.image) {
        //     formData.append('image', foodData.image);
        // }
        console.log(foodData)
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
export const login = async (credentials: UserCredentials): Promise<any> => {
    try {
        const response = await apiClient.post<string>('users/auth', credentials);
        return response;
    } catch (error) {
        throw new Error('Login failed');
    }
};

export const claimResource = async(id: string) => {
    try {
        console.log(id)
        const response = await apiClient.post<string>('api/claimResource', {id: id}, {
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        console.log(response)
        return response;
    } catch(error) {
        throw new Error('Failed to claim')
    }
}
