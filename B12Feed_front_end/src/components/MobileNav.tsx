import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiOutlineHome, 
  HiOutlineUserGroup, 
  HiOutlineArrowUpTray, 
  HiOutlineUserCircle 
} from 'react-icons/hi2'; // Icons exactly as used in Sidebar
import { FiPlus } from 'react-icons/fi'; // Icon exactly as used in Sidebar

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation Logic: Checks current path to highlight the correct icon
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 z-50 px-8 pb-8 pt-3 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between relative max-w-full">
        
        {/* Discover - Home Icon */}
        <button 
          onClick={() => navigate('/discover')} 
          className={isActive('/discover') ? "text-[#058177]" : "text-gray-300"}
        >
          <HiOutlineHome size={26} />
        </button>
        
        {/* My Claims - Group Icon */}
        <button 
          onClick={() => navigate('/my-claims')} 
          className={isActive('/my-claims') ? "text-[#058177]" : "text-gray-300"}
        >
          <HiOutlineUserGroup size={26} />
        </button>

        {/* Floating Plus Button - Share Food Action */}
        <div className="relative -mt-16 flex justify-center">
          <button 
            onClick={() => navigate('/share-food')}
            className="bg-[#058177] text-white p-4 rounded-full shadow-xl border-[6px] border-white active:scale-90 transition-transform"
          >
            <FiPlus size={28} strokeWidth={3} />
          </button>
        </div>

        {/* My Postings - Tray Icon (Synced with path /my-resources) */}
        <button 
          onClick={() => navigate('/my-resources')} 
          className={isActive('/my-resources') 
            ? "text-[#058177] bg-[#F0FDF4] p-2 rounded-xl" 
            : "text-gray-300 p-2"
          }
        >
          <HiOutlineArrowUpTray size={26} />
        </button>

        {/* Profile - User Icon */}
        <button 
          onClick={() => navigate('/profile')} 
          className={isActive('/profile') ? "text-[#058177]" : "text-gray-300"}
        >
          <HiOutlineUserCircle size={26} />
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;