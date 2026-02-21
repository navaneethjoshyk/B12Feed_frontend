import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiMapPin, 
  FiBell, 
  FiClock, 
  FiChevronDown 
} from 'react-icons/fi';
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
    <div className="flex min-h-screen bg-white overflow-x-hidden font-sans">
      <Sidebar />

      <main className="flex-1 w-full md:ml-64 p-4 md:p-10 pb-32">
        
        {/* UNIFIED HEADER */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center flex-1">
            <div className="md:hidden scale-75 origin-left mr-4">
              <Logo /> 
            </div>
            <div className="relative w-full max-w-md hidden md:block">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-[#F9FAFB] border-none rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#058177]/10"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#F0FDF4] text-[#058177] px-4 py-2.5 rounded-full font-bold text-sm">
              <FiMapPin size={18} />
              <span>Downtown Toronto</span>
            </div>
            <button className="p-3 bg-[#F9FAFB] rounded-full text-gray-600 relative">
              <FiBell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Title and Sort Row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Postings</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium border border-gray-100 rounded-full px-4 py-2 cursor-pointer bg-white shadow-sm">
            Sort by: <span className="font-bold text-gray-900">Urgency</span>
            <FiChevronDown />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="relative w-full mb-6 md:hidden">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-white border border-gray-100 rounded-xl py-3.5 pl-12 pr-4 outline-none shadow-sm"
          />
        </div>

        {/* Filters */}
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

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20 text-[#058177] font-bold">Loading Postings...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-100 rounded-[28px] overflow-hidden shadow-sm bg-white group">
                <div className="relative h-52 bg-gray-50 overflow-hidden">
                   <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm z-10">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[11px] font-black text-emerald-700 uppercase tracking-tight">Available</span>
                   </div>
                   {post.image ? (
                     <img 
                      src={typeof post.image === 'string' ? post.image : ''} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt="" 
                    />
                   ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">No Image</div>
                   )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-gray-900 leading-tight truncate mr-2">{post.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold bg-gray-50 px-2.5 py-1.5 rounded-lg shrink-0">
                      <FiClock />
                      <span>24H LEFT</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm font-medium mb-6">
                    📦 {post.quantity} {post.unit} • Downtown
                  </p>

                  <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                      <p className="text-[13px] font-bold text-gray-700 truncate">Downtown Food Hub</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/share-food/edit/${post.id}`)}
                      className="px-6 py-2 border-2 border-[#058177] text-[#058177] font-black rounded-xl text-sm hover:bg-[#058177] hover:text-white transition-all shrink-0 ml-2"
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

      <MobileNav />
    </div>
  );
};

export default MyPostings;