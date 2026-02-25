import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Logo from "../components/Logo";
import { 
  FiSearch, 
  FiMapPin, 
  FiBell, 
  FiClock, 
  FiChevronDown 
} from "react-icons/fi";

// API Integration
import { getMyPosts } from "../api/api"; 
import type { FoodPostData } from "../api/api";

const MyClaims: React.FC = () => {
  const [claims, setClaims] = useState<FoodPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  
  const filterOptions = ["All", "Pending", "Completed", "Failed"];

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        // Assuming your backend returns claimed items here 
        // Or you can create a specific 'getMyClaims' in api.ts
        const data = await getMyPosts(); 
        setClaims(data);
      } catch (err) {
        console.error("Error fetching claims:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  // Filter logic based on the status in your Flow Diagram
  const filteredClaims = claims.filter(item => {
    if (filter === "All") return true;
    return item.urgency?.toLowerCase() === filter.toLowerCase(); // Adjust property based on your DB schema
  });

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
                  placeholder="Search my claims"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-[#F9FAFB] focus:ring-2 focus:ring-[#058177]/10 outline-none"
                />
              </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center justify-center gap-2 bg-[#F0FDF4] px-4 py-2.5 rounded-full text-sm font-bold text-[#058177]">
              <FiMapPin />
              <span className="hidden md:inline whitespace-nowrap">Downtown Toronto</span>
            </div>
            <button className="p-3 rounded-full bg-[#F9FAFB] text-gray-600 relative">
              <FiBell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium border border-gray-100 rounded-full px-4 py-2 bg-white shadow-sm cursor-pointer">
            Sort by: <span className="font-bold text-gray-900">Urgency</span> <FiChevronDown />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto mb-8 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
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

        {/* Claims Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-[#058177] font-bold">
            Loading your claims...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClaims.map((item) => (
              <div key={item.id} className="bg-white rounded-[28px] border border-gray-100 overflow-hidden shadow-sm group">
                
                <div className="relative h-52 overflow-hidden bg-gray-50">
                  <div className="absolute top-4 left-4 z-10">
                    {/* Status Pill matching your Flow Diagram colors */}
                    <StatusPill status={item.urgency || "Pending"} />
                  </div>
                  {item.image ? (
                    <img 
                      src={typeof item.image === 'string' ? item.image : ''} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt={item.title} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 italic">No Image</div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight truncate mr-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 font-bold text-[11px] bg-gray-50 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                      <FiClock />
                      {/* Urgency logic from diagram (24h) */}
                      24H LEFT
                    </div>
                  </div>

                  <p className="text-gray-400 font-medium text-sm flex items-center gap-2 mb-6">
                    📦 {item.quantity} {item.unit} • {item.pickupAddress || "Downtown"}
                  </p>

                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                      <p className="text-[13px] font-bold text-gray-700 truncate max-w-[120px]">
                        {item.pickupAddress || "Main Hub"}
                      </p>
                    </div>
                    <button className="px-6 py-2.5 border-2 border-[#058177] text-[#058177] rounded-xl font-black text-sm hover:bg-[#058177] hover:text-white transition-all">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredClaims.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[32px]">
            <p className="text-gray-400 font-medium">No claims found in this category.</p>
          </div>
        )}
      </main>
      <MobileNav />
    </div>
  );
};

/* --- Helper Component for Flow Status --- */
const StatusPill = ({ status }: { status: string }) => {
  let styles = "bg-white/95 text-orange-700"; // Default: Pending
  let dotColor = "bg-orange-500";
  let label = "Pending pickup";

  if (status.toLowerCase() === "completed") {
    styles = "bg-white/95 text-emerald-700";
    dotColor = "bg-emerald-500";
    label = "Completed";
  } else if (status.toLowerCase() === "failed") {
    styles = "bg-white/95 text-red-700";
    dotColor = "bg-red-500";
    label = "Failed pickup";
  }

  return (
    <div className={`backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm ${styles}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor} ${status.toLowerCase() === 'pending' ? 'animate-pulse' : ''}`}></span>
      <span className="text-[11px] font-black uppercase tracking-tight">
        {label}
      </span>
    </div>
  );
};

export default MyClaims;