import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  FiSearch,
  FiMapPin,
  FiBell,
  FiChevronDown,
  FiClock,
  FiPackage
} from "react-icons/fi";

// Components
import Logo from "../components/Logo";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar"; 
import { listResources, type FoodPostData } from "../api/api";

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [posts, setPosts] = useState<FoodPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllFood = async () => {
      try {
        setLoading(true);
        const response = await listResources();
        // Assuming response.data contains the array of posts
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching discover posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllFood();
  }, []);

  const handleFilterClick = (label: string) => {
    setActiveFilter(activeFilter === label ? null : label);
  };

  return (
    <div className="flex min-h-screen bg-white text-neutral-900 overflow-x-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col w-full md:ml-64 p-4 md:p-10 pb-32">
        
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
                  placeholder="Search available food"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-[#F9FAFB] focus:ring-2 focus:ring-[#058177]/10 outline-none"
                />
              </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center justify-center gap-2 bg-[#F0FDF4] px-4 py-2.5 rounded-full text-sm font-bold text-[#058177]">
              <FiMapPin />
              <span className="hidden md:inline whitespace-nowrap">Downtown Toronto</span>
            </div>

            <button className="p-3 rounded-full bg-[#F9FAFB] text-gray-600 relative hover:bg-gray-100 transition-colors">
              <FiBell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* TITLE & SORT */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Available food</h2>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 border border-gray-100 rounded-full px-4 py-2 bg-white shadow-sm hover:bg-gray-50">
            Sort by: <span className="font-bold text-gray-900">Urgency</span>
            <FiChevronDown />
          </button>
        </div>

        {/* MOBILE SEARCH */}
        <div className="relative w-full mb-6 md:hidden">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search available food"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-100 bg-white outline-none shadow-sm"
          />
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 overflow-x-auto mb-8 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          <FilterPill label="Near me" isActive={activeFilter === "Near me"} onClick={() => handleFilterClick("Near me")} />
          <FilterPill label="Expiring soon" isActive={activeFilter === "Expiring soon"} onClick={() => handleFilterClick("Expiring soon")} />
          <FilterPill label="Category" isActive={activeFilter === "Category"} icon={<FiChevronDown size={16} />} onClick={() => handleFilterClick("Category")} />
        </div>

        {/* CARDS GRID */}
        {!loading ? (
          posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <div
                  key={post._id}
                  onClick={() => navigate(`/resource/${post._id}`)}
                  className="group cursor-pointer bg-white rounded-[28px] shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100"
                >
                  {/* Image Section */}
                  <div className="relative h-52 bg-gray-50 overflow-hidden">
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm z-10">
                      <div className={`w-2 h-2 rounded-full ${post.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      <span className="text-[11px] font-black text-emerald-700 uppercase tracking-tight">
                        {post.status || "Available"}
                      </span>
                    </div>
                    
                    <img 
                      src={post.resource_image?.[0]?.image?.[0] || 'https://via.placeholder.com/400'} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-gray-900 leading-tight truncate mr-2">{post.title}</h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-bold bg-gray-50 px-2.5 py-1.5 rounded-lg shrink-0">
                        <FiClock />
                        <span>24H LEFT</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm font-medium mb-6 flex items-center gap-1.5">
                      <FiPackage className="text-neutral-400" /> {post.quantity} {post.unit} • {post.category}
                    </p>

                    <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">LOCATION</p>
                        <p className="text-[13px] font-bold text-gray-700 truncate">
                           {post.userId?.orgName || "Downtown Food Hub"}
                        </p>
                      </div>

                      <button className="px-6 py-2 bg-[#058177] text-white font-black rounded-xl text-sm hover:bg-[#046e65] transition-all shrink-0 ml-2">
                        Claim
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No food available at the moment.</p>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center py-20">
             <div className="w-10 h-10 border-4 border-[#058177]/20 border-t-[#058177] rounded-full animate-spin"></div>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
};

/* --- Internal Helpers --- */
const FilterPill = ({ label, isActive, onClick, icon }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
      isActive 
      ? "bg-[#E6F3F2] border-[#058177] text-[#058177]" 
      : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"
    }`}
  >
    {label} {icon}
  </button>
);

export default Discover;