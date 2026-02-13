import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FiSearch, FiMapPin, FiBell, FiPlus, FiGrid, FiShoppingBag, 
  FiLayers, FiUser, FiChevronDown, FiClock, FiEdit3, FiPackage 
} from 'react-icons/fi';
import type { RootState } from '../store';
import Logo from '../components/Logo';
import MobileNav from '../components/MobileNav';

const MyPostings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeFilter, setActiveFilter] = useState('All');

  // Placeholder data 
  const myPosts = [
    {
      id: 1,
      title: "Mixed Salad Items",
      quantity: "12 crates",
      location: "Downtown Food Hub",
      status: "Available",
      expiry: "24H LEFT",
      image: "https://picsum.photos/seed/salad/600/400"
    }
  ];

  return (
    <div className="flex min-h-screen bg-white text-neutral-900 overflow-x-hidden font-sans">
      {/* SIDEBAR - Keep synced with Discover page */}
      <aside className="hidden md:flex w-64 flex-col p-6 border-r border-gray-100 bg-white fixed h-screen left-0 top-0">
        <div className="mb-10 px-2">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink icon={<FiGrid />} label="Discover" onClick={() => navigate('/discover')} />
          <SidebarLink icon={<FiShoppingBag />} label="My Claims" onClick={() => navigate('/my-claims')} />
          <SidebarLink icon={<FiLayers />} label="My Postings" active onClick={() => navigate('/my-postings')} />
        </nav>

        <div className="pt-6 space-y-4">
          <button 
            onClick={() => navigate('/share-food')}
            className="w-full bg-[#058177] hover:bg-[#046c64] text-white py-4 px-5 rounded-xl flex items-center gap-3 font-semibold shadow-sm transition-all active:scale-95"
          >
            <FiPlus size={18} />
            Share Food
          </button>

          <div className="flex items-center gap-3 bg-[#f4fbf9] p-3 rounded-xl">
            <div className="w-9 h-9 bg-[#058177] rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <FiUser />
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-semibold truncate">{user?.firstName} {user?.lastName || 'User'}</p>
              <p className="text-neutral-500 text-xs truncate">{user?.organization || 'Community Member'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col md:ml-64 pb-24 md:pb-0">
        
        {/* HEADER */}
        <header className="h-20 px-6 flex items-center justify-between bg-white sticky top-0 z-30 border-b border-gray-50/50">
          <div className="flex items-center flex-1">
             <div className="md:hidden scale-75 origin-left mr-4 transform translate-y-2">
               <Logo /> 
             </div>
             <div className="relative w-full max-w-md hidden md:block">
               <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
               <input
                 type="text"
                 placeholder="Search"
                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-white focus:ring-2 focus:ring-[#058177]/20 outline-none"
               />
             </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center justify-center gap-2 bg-[#e9f6f3] px-4 py-2 rounded-xl text-sm font-semibold text-[#058177]">
              <FiMapPin />
              <span className="hidden md:inline whitespace-nowrap">Downtown Toronto</span>
            </div>
            <button className="p-3 rounded-xl bg-white border border-gray-100 relative">
              <FiBell />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        <div className="flex-1 px-6 py-6 md:py-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Postings</h1>
            <button className="flex items-center gap-2 text-sm font-semibold border border-gray-100 rounded-full px-4 py-2 hover:bg-gray-50">
              Sort by: <span className="text-neutral-900">Urgency</span>
              <FiChevronDown />
            </button>
          </div>

          {/* STATUS FILTERS */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Available', 'Pending', 'Completed'].map((filter) => (
              <FilterPill 
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </div>

          {/* POSTINGS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPosts.map((post) => (
              <div key={post.id} className="group bg-white rounded-[24px] shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
                {/* Image Section */}
                <div className="relative h-48 m-2 rounded-[20px] overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                    <StatusPill type={post.status.toLowerCase()} />
                  </div>
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                {/* Content Section */}
                <div className="p-5 pt-2 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{post.title}</h3>
                      <div className="flex items-center gap-2 text-neutral-400 mt-1">
                        <FiPackage size={14} />
                        <span className="text-sm">{post.quantity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-neutral-50 px-2 py-1 rounded-lg text-[10px] font-bold text-neutral-600">
                      <FiClock size={12} />
                      {post.expiry}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">Location</p>
                      <p className="text-sm font-medium text-neutral-600">{post.location}</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/edit-post/${post.id}`)}
                      className="flex items-center gap-2 border border-[#058177] text-[#058177] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#e9f6f3] transition-colors"
                    >
                      <FiEdit3 size={14} />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

/* --- SHARED COMPONENTS (Keep these consistent) --- */

const SidebarLink = ({ icon, label, active = false, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors
      ${active ? "bg-[#e9f6f3] text-[#058177] font-semibold" : "text-neutral-600 hover:bg-[#f4fbf9]"}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);

const FilterPill = ({ label, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`h-9 px-5 rounded-full text-[14px] font-semibold border transition-all active:scale-95
      ${isActive ? "bg-neutral-900 border-neutral-900 text-white shadow-sm" : "bg-white border-gray-200 text-neutral-600 hover:border-gray-300"}`}
  >
    {label}
  </button>
);

const StatusPill = ({ type }: { type: string }) => (
  <span className="bg-white/90 backdrop-blur-sm text-[#058177] px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
    <span className="w-1.5 h-1.5 rounded-full bg-[#058177]" />
    {type.charAt(0).toUpperCase() + type.slice(1)}
  </span>
);

export default MyPostings;