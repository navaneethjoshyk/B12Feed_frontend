<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 41649cc (added the MyPosting and Sharefood pages and added the sidebar component)
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo'; 
<<<<<<< HEAD
import {
  FiPlus,
  FiGrid,
  FiShoppingBag,
  FiLayers,
  FiUser,
} from "react-icons/fi";
=======
import { 
  HiOutlineHome, 
  HiOutlineUserGroup, 
  HiOutlineArrowUpTray, 
  HiOutlineUserCircle 
} from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
>>>>>>> 41649cc (added the MyPosting and Sharefood pages and added the sidebar component)

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

<<<<<<< HEAD
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
=======
  return (
    <div className="hidden md:flex flex-col fixed left-0 top-0 bg-white z-50 border-r border-[#F3F4F6] w-[260px] h-screen p-8">
      <div className="flex-1">
        <Logo />
        
        <nav className="mt-12 flex flex-col gap-2">
          <SidebarLink 
            icon={<HiOutlineHome size={22} />} 
>>>>>>> 41649cc (added the MyPosting and Sharefood pages and added the sidebar component)
            label="Discover" 
            active={isActive('/discover')} 
            onClick={() => navigate('/discover')} 
          />
          <SidebarLink 
<<<<<<< HEAD
            icon={<FiShoppingBag />} 
=======
            icon={<HiOutlineUserGroup size={22} />} 
>>>>>>> 41649cc (added the MyPosting and Sharefood pages and added the sidebar component)
            label="My Claims" 
            active={isActive('/my-claims')} 
            onClick={() => navigate('/my-claims')} 
          />
          <SidebarLink 
<<<<<<< HEAD
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

      {/* 3. PROFILE SECTION - Now using Redux User Data */}
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
=======
            icon={<HiOutlineArrowUpTray size={22} />} 
            label="My Postings" 
            active={isActive('/my-resources')} 
            onClick={() => navigate('/my-resources')} 
          />
        </nav>

        <div className="mt-8">
          <button 
            onClick={() => navigate('/share-food')}
            className="w-full bg-[#058177] text-white py-3.5 rounded-xl flex items-center justify-center gap-2.5 font-bold transition-transform active:scale-95"
          >
            <FiPlus size={20} /> Share Food
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div 
        className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => navigate('/profile')}
      >
        <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
           <HiOutlineUserCircle size={28} className="text-gray-400" />
        </div>
        <div className="overflow-hidden">
          <p className="m-0 font-bold text-sm text-gray-900 truncate">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="m-0 text-xs text-gray-500 truncate">
            {user?.organization || 'Community Member'}
          </p>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, active = false, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-[#F0FDF4] text-[#058177] font-semibold' : 'text-gray-500 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span className="text-[15px]">{label}</span>
>>>>>>> 41649cc (added the MyPosting and Sharefood pages and added the sidebar component)
  </div>
);

export default Sidebar;