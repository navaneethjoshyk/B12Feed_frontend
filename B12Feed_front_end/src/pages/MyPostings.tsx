import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineSearch, 
  HiOutlineLocationMarker, 
  HiOutlineBell, 
  HiOutlineClock 
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar'; 
import MobileNav from '../components/MobileNav';
import Logo from '../components/Logo';
import { getMyPosts } from '../api/api';
import type { FoodPostData } from '../api/api';

const MyPostings: React.FC = () => {
  const [posts, setPosts] = useState<FoodPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getMyPosts();
        setPosts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filterOptions = ['All', 'Available', 'Pending', 'Completed'];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar (hidden on mobile) */}
      <Sidebar />

      {/* Content Area */}
      <main className="flex-1 md:ml-[260px] p-4 md:p-10 pb-32 md:pb-10">
        
        {/* Mobile Header: Logo + Icons */}
        <div className="flex md:hidden items-center justify-between mb-6 pt-2">
          <Logo />
          <div className="flex items-center gap-3">
            <div className="bg-[#F0FDF4] p-2.5 rounded-xl text-[#058177]">
              <HiOutlineLocationMarker size={24} />
            </div>
            <button className="p-2.5 bg-[#F9FAFB] rounded-xl text-gray-600">
              <HiOutlineBell size={24} />
            </button>
          </div>
        </div>

        {/* Desktop Header (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div className="relative w-full max-w-md">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#F9FAFB] border-none rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#058177]/10"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F0FDF4] text-[#058177] px-4 py-2.5 rounded-full font-bold text-sm">
              <HiOutlineLocationMarker size={18} />
              <span>Downtown Toronto</span>
            </div>
            <button className="p-3 bg-[#F9FAFB] rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
              <HiOutlineBell size={22} />
            </button>
          </div>
        </div>

        {/* Title and Sort Row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Postings</h1>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium border border-gray-100 rounded-full px-4 py-2 cursor-pointer bg-white shadow-sm">
            Sort by: <span className="font-bold text-gray-900">Urgency</span>
            <span className="text-[10px]">▼</span>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="relative w-full mb-6 md:hidden">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-white border border-gray-100 rounded-xl py-3.5 pl-12 pr-4 outline-none shadow-sm"
          />
        </div>

        {/* Horizontal Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-6 py-2.5 rounded-full border text-sm font-bold transition-all whitespace-nowrap ${
                filter === opt 
                ? 'bg-[#E6F3F2] border-[#058177] text-[#058177]' 
                : 'border-gray-100 text-gray-500 bg-white'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Grid of Posting Cards */}
        {loading ? (
          <div className="flex justify-center py-20 text-[#058177] font-bold">Loading Postings...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-100 rounded-[28px] overflow-hidden shadow-sm bg-white">
                <div className="relative h-52 bg-gray-50">
                   <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm z-10">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[11px] font-black text-green-700 uppercase tracking-tight">Available</span>
                   </div>
                   {post.image ? (
                     <img src={typeof post.image === 'string' ? post.image : ''} className="w-full h-full object-cover" alt="" />
                   ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">No Image</div>
                   )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-gray-900 leading-tight">{post.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold bg-gray-50 px-2.5 py-1.5 rounded-lg shrink-0">
                      <HiOutlineClock className="text-gray-400" />
                      <span>24H LEFT</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm font-medium flex items-center gap-2 mb-6">
                    📦 {post.quantity} {post.unit}
                  </p>

                  <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                      <p className="text-[13px] font-bold text-gray-700">Downtown Food Hub</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/share-food/edit/${post.id}`)}
                      className="px-6 py-2 border-2 border-[#058177] text-[#058177] font-black rounded-xl text-sm hover:bg-[#058177] hover:text-white transition-all"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Global Mobile Nav */}
      <MobileNav />
    </div>
  );
};

export default MyPostings;