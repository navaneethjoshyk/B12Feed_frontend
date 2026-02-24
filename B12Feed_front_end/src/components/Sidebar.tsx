import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo'; 
import {
  FiPlus,
  FiGrid,
  FiShoppingBag,
  FiLayers,
  FiUser,
} from "react-icons/fi";

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Helper to get initials if no name is provided
  const getInitials = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    return <FiUser />;
  };

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 bg-white z-50 border-r border-[#F3F4F6] w-64 h-screen p-6">
      
      {/* 1. TOP SECTION: Logo and Navigation Links */}
      <div className="flex-1">
        <div className="mb-10 px-2">
          <Logo />
        </div>
        
        <nav className="space-y-1">
          <SidebarLink 
            icon={<FiGrid />} 
            label="Discover" 
            active={isActive('/discover')} 
            onClick={() => navigate('/discover')} 
          />
          <SidebarLink 
            icon={<FiShoppingBag />} 
            label="My Claims" 
            active={isActive('/my-claims')} 
            onClick={() => navigate('/my-claims')} 
          />
          <SidebarLink 
            icon={<FiLayers />} 
            label="My Postings" 
            active={isActive('/my-postings')} 
            onClick={() => navigate('/my-postings')} 
          />
        </nav>
      </div>

      {/* 2. BOTTOM ACTIONS: Post Food Button */}
      <div className="pb-6">
        <button 
          onClick={() => navigate('/share-food')}
          className="w-full bg-[#058177] hover:bg-[#046e65] text-white py-4 px-5 rounded-xl flex items-center gap-3 font-semibold shadow-sm transition-all active:scale-95"
        >
          <FiPlus size={18} />
          Post Food
        </button>
      </div>

      {/* 3. PROFILE SECTION */}
      <div 
        className="flex items-center gap-3 bg-[#F0FDF4] p-3 rounded-xl cursor-pointer hover:bg-green-100 transition-colors"
        onClick={() => navigate('/profile')}
      >
        <div className="w-9 h-9 bg-[#058177] rounded-lg flex items-center justify-center text-white flex-shrink-0 font-bold">
          {getInitials()}
        </div>
        <div className="text-sm overflow-hidden">
          <p className="font-semibold text-neutral-900 truncate m-0">
            {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Guest User'}
          </p>
          <p className="text-neutral-500 text-xs truncate m-0">
            {user?.orgName || 'Community Member'}
          </p>
        </div>
      </div>
    </aside>
  );
};

/* --- Internal Component for the Links --- */
const SidebarLink = ({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  onClick?: () => void 
}) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
      active 
        ? 'bg-[#F0FDF4] text-[#058177] font-semibold' 
        : 'text-neutral-600 hover:bg-[#F0FDF4]/50'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);

export default Sidebar;