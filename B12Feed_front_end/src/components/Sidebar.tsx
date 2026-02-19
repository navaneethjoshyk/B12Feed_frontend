import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo'; 
import { 
  HiOutlineHome, 
  HiOutlineUserGroup, 
  HiOutlineArrowUpTray, 
  HiOutlineUserCircle 
} from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex flex-col fixed left-0 top-0 bg-white z-50 border-r border-[#F3F4F6] w-[260px] h-screen p-8">
      <div className="flex-1">
        <Logo />
        
        <nav className="mt-12 flex flex-col gap-2">
          <SidebarLink 
            icon={<HiOutlineHome size={22} />} 
            label="Discover" 
            active={isActive('/discover')} 
            onClick={() => navigate('/discover')} 
          />
          <SidebarLink 
            icon={<HiOutlineUserGroup size={22} />} 
            label="My Claims" 
            active={isActive('/my-claims')} 
            onClick={() => navigate('/my-claims')} 
          />
          <SidebarLink 
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
  </div>
);

export default Sidebar;