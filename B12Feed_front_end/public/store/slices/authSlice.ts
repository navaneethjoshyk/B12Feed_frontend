import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  profileImage?: string;
  roles: string[];
  organization?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  roles: string[]; // Added to match your App.tsx usage
  loading: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  roles: JSON.parse(localStorage.getItem("roles") || "[]"),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // This is the action your SignIn component is calling
    setAuth: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
      // Note: Token is usually handled separately or passed here
    },
    login: (state, action: PayloadAction<{ user: AuthUser; token: string; roles: string[] }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("roles", JSON.stringify(action.payload.roles));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
    },
    loadUserFromLocalStorage: (state) => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const token = localStorage.getItem("token");
      if (user && token) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
    }
  },
});

export const { setAuth, login, logout, loadUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;