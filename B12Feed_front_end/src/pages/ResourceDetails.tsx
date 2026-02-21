import React, { useEffect, useState } from 'react';
import { claimResource, detailResource } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiShare2, FiClock, FiMapPin, 
  FiArrowRight, FiPackage, FiLayers 
} from 'react-icons/fi';
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

// Helper component for statistics
const DetailStat = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#058177] shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const FoodDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 1. Fix: Correct useParams usage
  const navigate = useNavigate();
  
  const [detail, setDetail] = useState<any>(null);
  const [isClaiming, setIsClaiming] = useState(false); // 2. Fix: Define missing state

  useEffect(() => {
    const fetchResourceDetail = async () => {
      if (id) {
        try {
          const response = await detailResource(id);
          setDetail(response.data);
        } catch (err) {
          console.error("Failed to load details", err);
        }
      }
    };
    fetchResourceDetail();
  }, [id]);

  const handleClaim = async () => { // 3. Fix: Define handleClaim
    if (!id) return;
    setIsClaiming(true);
    try {
      await claimResource(id);
      alert("Resource claimed successfully!");
      navigate('/discover');
    } catch (err) {
      alert("Failed to claim resource.");
    } finally {
      setIsClaiming(false);
    }
  };

  if (!detail) return (
    <div className="flex justify-center items-center min-h-screen text-[#058177] font-bold">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-12">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-30 md:max-w-6xl md:mx-auto">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full border border-gray-100 shadow-sm">
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Food Details</h1>
        <button className="p-2 bg-neutral-100 rounded-full"><FiShare2 /></button>
      </header>

      <main className="p-4 md:p-12 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* Image Section */}
          <div className="space-y-6">
            <div className="aspect-square bg-neutral-100 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
               {detail.resource_image?.[0]?.image?.[0] ? (
                  <img src={detail.resource_image[0].image[0]} alt={detail.title} className="w-full h-full object-cover" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">No Image Available</div>
               )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#F0FDF4] text-[#058177] px-4 py-2 rounded-full text-[11px] font-bold border border-[#DCFCE7]">Available</span>
              {detail.urgency === 'high' && (
                <span className="bg-[#FEF2F2] text-[#EF4444] px-4 py-2 rounded-full text-[11px] font-bold border border-[#FEE2E2] flex items-center gap-2">
                  <HiOutlineExclamationTriangle size={14}/> High Urgency
                </span>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <p className="text-[#058177] font-bold text-sm mb-2">
                Posted by {detail.userId?.orgName || 'Downtown Food Hub'}
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">{detail.title}</h2>
              <p className="text-gray-500 leading-relaxed">{detail.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <DetailStat label="Quantity" value={detail.quantity} icon={<FiLayers />} />
               <DetailStat label="Condition" value={detail.condition || 'Fresh'} icon={<FiClock />} />
            </div>

            <div className="bg-[#F0FDF4] p-6 rounded-3xl flex items-center justify-between border border-[#DCFCE7]">
              <div>
                <p className="text-[10px] font-bold text-[#058177] uppercase tracking-widest mb-1">Pickup Window</p>
                <p className="text-lg font-extrabold text-gray-900">
                    {detail.pickupWindow?.from} - {detail.pickupWindow?.to}
                </p>
                <div className="flex items-center gap-2 text-sm text-[#058177] mt-1 font-medium">
                    <FiMapPin /> {detail.pickupAddress}
                </div>
              </div>
              <FiClock size={32} className="text-[#058177]/20" />
            </div>

            {/* Claim Button for Desktop */}
            <button 
              onClick={handleClaim}
              disabled={isClaiming}
              className="hidden md:flex w-full bg-[#058177] text-white py-5 rounded-2xl items-center justify-center gap-3 font-bold text-lg shadow-lg active:scale-[0.98] transition-all disabled:bg-gray-300"
            >
              {isClaiming ? 'Claiming...' : 'Claim Food'} <FiArrowRight />
            </button>
          </div>
        </div>
      </main>

      {/* Fixed Mobile Footer Button */}
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