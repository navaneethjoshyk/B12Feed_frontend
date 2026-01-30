import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShare2, FiClock, FiMapPin, FiArrowRight, FiBell, FiPlus, FiHome, FiLayers, FiMessageSquare, FiUser } from 'react-icons/fi';

const ResourceDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden">
      
      {/* SIDEBAR: Hidden on Mobile */}
      <aside className="hidden md:flex w-64 border-r border-neutral-200 flex-col p-6 h-full shrink-0">
        <div className="bg-neutral-200 h-16 rounded-xl flex items-center justify-center mb-10 font-black uppercase">b12feed</div>
        <nav className="flex-1 space-y-2">
          <SidebarLink icon={<FiHome />} label="Discover" active />
          <SidebarLink icon={<FiLayers />} label="My Claims" />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-y-auto pb-24 md:pb-0">
        {/* MOBILE HEADER */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-4 flex justify-between items-center md:hidden border-b border-neutral-100">
          <button onClick={() => navigate('/discover')} className="p-2 bg-neutral-100 rounded-full"><FiArrowLeft /></button>
          <span className="font-bold">Resource Details</span>
          <button className="p-2 bg-neutral-100 rounded-full"><FiShare2 /></button>
        </div>

        <div className="p-4 md:p-12 max-w-6xl mx-auto w-full">
          {/* Back Button for Desktop */}
          <button onClick={() => navigate('/discover')} className="hidden md:flex items-center gap-2 bg-neutral-100 px-6 py-3 rounded-2xl font-bold mb-8 transition-colors hover:bg-neutral-200">
            <FiArrowLeft /> Back to Feed
          </button>

          {/* GRID: Stacks on mobile, Side-by-Side on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            <div className="space-y-4 md:space-y-6">
              <div className="aspect-square bg-neutral-100 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center text-neutral-300 font-black">IMAGE</div>
              <div className="flex gap-2">
                <span className="bg-neutral-100 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider">Prepared</span>
                <span className="bg-neutral-100 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider">Fresh</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Prepared Meals</h1>
              <p className="text-neutral-400 text-sm mb-8">Posted by: Recovery Org • <span className="text-black underline font-medium cursor-pointer">View Profile</span></p>

              <div className="mb-10 p-6 bg-neutral-50 rounded-3xl border border-black/5">
                <h3 className="font-bold text-xs uppercase tracking-widest text-neutral-400 mb-4">Pickup Window</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Today 2PM - 5PM</h2>
                    <p className="text-sm text-neutral-500 mt-2 flex items-center gap-2"><FiMapPin /> 123 Main St, Brampton</p>
                  </div>
                  <FiClock size={40} className="text-neutral-200 hidden sm:block" />
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-black/10">Claim Now <FiArrowRight /></button>
                <button className="w-full border-2 border-neutral-100 py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2">Message Organization</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarLink = ({ icon, label, active = false }: any) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-xl ${active ? 'bg-neutral-200 font-bold' : 'text-neutral-500'}`}>
    <span className="text-xl">{icon}</span><span className="text-sm">{label}</span>
  </div>
);

export default ResourceDetails;