import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index.ts';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // 1. If we are still determining if the user is logged in, 
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        {/* Match your brand color (#058177) */}
        <div className="w-12 h-12 border-4 border-[#e9f6f3] border-t-[#058177] rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">Verifying session...</p>
      </div>
    );
  }

  // 2. If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. User is authenticated
  return children;
};

export default PrivateRoute;