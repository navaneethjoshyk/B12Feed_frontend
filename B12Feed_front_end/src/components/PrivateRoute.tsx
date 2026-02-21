import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/slices/authSlice';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/api", {
          method: "GET",
          credentials: "include"
        });

        if (response.ok) {
          const responseText = await response.text();
          
          if (responseText) {
            const data = JSON.parse(responseText);
            
            // --- DATA MAPPING LOGIC START ---
            // We identify the user object (handling if it's nested under data.user or top-level)
            const rawUser = data.user || data;

            // Normalize the user object so it matches what Sidebar/Discover expect
            const normalizedUser = {
              ...rawUser,
              firstName: rawUser.firstName || rawUser.first_name || rawUser.name?.split(' ')[0] || "User",
              lastName: rawUser.lastName || rawUser.last_name || rawUser.name?.split(' ')[1] || ""
            };
            // --- DATA MAPPING LOGIC END ---

            // Dispatch to Redux using the normalized data
            dispatch(login({
              user: normalizedUser,
              token: data.token || localStorage.getItem("token") || "",
              roles: data.roles || rawUser.roles || []
            }));
            
            setIsAuthorized(true);
          } else {
            console.warn("Auth check returned 200 OK with no body content.");
            setIsAuthorized(true);
          }
        } else {
          dispatch(logout());
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  // 1. LOADING LOGIC
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-[#e9f6f3] border-t-[#058177] rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">Verifying session...</p>
      </div>
    );
  }

  // 2. AUTHENTICATION CHECK 
  if (!isAuthorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. SUCCESS 
  return children;
};

export default PrivateRoute;