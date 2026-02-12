import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiShoppingBag, FiPlus, FiLayers, FiUser } from 'react-icons/fi';

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {/* Horizontal padding handles the spacing of icons from the screen edge */}
      <div className="flex items-center justify-between px-8 pb-8 pt-3 relative max-w-full">
        
        {/* Discover */}
        <button onClick={() => navigate('/discover')} className={isActive('/discover') ? "text-[#058177]" : "text-gray-300"}>
          <FiGrid size={24} />
        </button>
        
        {/* My Claims ) */}
        <button onClick={() => navigate('/my-claims')} className={isActive('/my-claims') ? "text-[#058177]" : "text-gray-300"}>
          <FiShoppingBag size={24} />
        </button>

        {/* Floating Plus Button */}
        <div className="relative -mt-16 flex justify-center">
          <button 
            onClick={() => navigate('/share-food')}
            className="bg-[#058177] text-white p-4 rounded-full shadow-xl border-[6px] border-white active:scale-90 transition-transform"
          >
            <FiPlus size={28} strokeWidth={3} />
          </button>
        </div>

        {/* My Resources */}
        <button onClick={() => navigate('/my-resources')} className={isActive('/my-resources') ? "text-[#058177]" : "text-gray-300"}>
          <FiLayers size={24} />
        </button>

        {/* Profile */}
        <button onClick={() => navigate('/profile')} className={isActive('/profile') ? "text-[#058177]" : "text-gray-300"}>
          <FiUser size={24} />
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;