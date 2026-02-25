import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiShare2, FiClock, FiMapPin, 
  FiArrowRight, FiPackage, FiLayers 
} from 'react-icons/fi';
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

// API & Types
import { claimResource, detailResource } from '../api/api';

// Components
import DetailStat from '../components/DetailStat';

const FoodDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [foodData, setFoodData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  // 1. DATA FETCHING LOGIC (Using centralized API)
  useEffect(() => {
    const fetchResourceDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await detailResource(id);
        setFoodData(response.data);
      } catch (err) {
        console.error("Failed to load details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResourceDetail();
  }, [id]);

  // 2. CLAIM ACTION LOGIC
  const handleClaim = async () => {
    if (!id) return;
    setIsClaiming(true);
    try {
      await claimResource(id);
      alert("Success! You have claimed this food.");
      navigate('/my-claims'); 
    } catch (err: any) {
      alert(err.message || "Failed to claim resource.");
    } finally {
      setIsClaiming(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#e9f6f3] border-t-[#058177] rounded-full animate-spin"></div>
    </div>
  );

  if (!foodData) return <div className="min-h-screen flex items-center justify-center font-bold">Item not found.</div>;

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-12">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-30 md:max-w-6xl md:mx-auto">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Food Details</h1>
        <button className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors">
          <FiShare2 />
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* IMAGE SECTION */}
          <div className="md:order-2 space-y-6">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-sm aspect-[4/3] md:aspect-square bg-gray-50">
              <img 
                src={foodData.resource_image?.[0]?.image?.[0] || foodData.image || "https://images.unsplash.com/photo-1610348725531-843dff563e2c"} 
                className="w-full h-full object-cover"
                alt={foodData.title}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[12px] font-bold text-emerald-600 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {foodData.status || "Available"}
                </span>
              </div>
            </div>

            {/* Desktop Claim Button */}
            <button 
              onClick={handleClaim}
              disabled={isClaiming}
              className="hidden md:flex w-full bg-[#058177] text-white py-5 rounded-2xl items-center justify-center gap-3 font-bold text-lg shadow-lg active:scale-[0.98] transition-all disabled:bg-gray-300"
            >
              {isClaiming ? 'Claiming...' : 'Claim Food'} <FiArrowRight />
            </button>
          </div>

          {/* TEXT CONTENT SECTION */}
          <div className="md:order-1 space-y-6">
            <div className="flex items-center gap-3 pl-4 border-l-4 border-[#058177]">
               <p className="text-gray-500 font-medium">Posted by <span className="text-gray-900 font-bold">{foodData.userId?.orgName || foodData.postedBy || 'Community Member'}</span></p>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{foodData.title}</h2>
              <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                <span className="flex items-center gap-1.5"><FiPackage /> {foodData.quantity} {foodData.unit || ''}</span>
                <span className="flex items-center gap-1.5"> <span className="w-1 h-1 rounded-full bg-gray-300"/> {foodData.distance || 'Nearby'}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#F0FDF4] text-[#058177] px-4 py-2 rounded-full text-[11px] font-bold border border-[#DCFCE7]">Available</span>
              {foodData.urgency === 'high' && (
                <span className="bg-[#FEF2F2] text-[#EF4444] px-4 py-2 rounded-full text-[11px] font-bold border border-[#FEE2E2] flex items-center gap-2">
                  <HiOutlineExclamationTriangle size={14}/> High Urgency
                </span>
              )}
              <span className="bg-white text-gray-600 px-4 py-2 rounded-full text-[11px] font-bold border border-gray-200 flex items-center gap-2">
                <FiClock size={14}/> {foodData.expiryDate ? "EXPIRES SOON" : "24H LEFT"}
              </span>
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-3">
              <h3 className="text-xl font-bold">Overview</h3>
              <p className="text-gray-500 leading-relaxed">{foodData.description || foodData.overview}</p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <DetailStat label="Quantity" value={foodData.quantity} icon={<FiLayers />} />
               <DetailStat label="Condition" value={foodData.condition || 'Fresh'} icon={<FiClock />} />
               <DetailStat label="Category" value={foodData.category || 'Food'} icon={<FiPackage />} />
            </div>

            {/* Pickup Info */}
            <div className="bg-[#F0FDF4] p-6 rounded-3xl flex items-center justify-between border border-[#DCFCE7]">
              <div>
                <p className="text-[10px] font-bold text-[#058177] uppercase tracking-widest mb-1">Pickup Window</p>
                <p className="text-lg font-extrabold text-gray-900">
                  {foodData.pickupWindow?.from ? `${foodData.pickupWindow.from} - ${foodData.pickupWindow.to}` : 'Today 2:00PM - 5:00PM'}
                </p>
                <div className="flex items-center gap-2 text-sm text-[#058177] mt-1 font-medium">
                   <FiMapPin /> {foodData.pickupAddress || foodData.address || "Location on request"}
                </div>
              </div>
              <div className="text-[#058177]/20"><FiClock size={32} /></div>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE FOOTER BUTTON */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 px-6 z-40">
        <button 
          onClick={handleClaim}
          disabled={isClaiming}
          className="w-full bg-[#058177] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-2xl active:scale-95 transition-transform disabled:bg-gray-400"
        >
          {isClaiming ? 'Claiming...' : 'Claim Food'} <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;