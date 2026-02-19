import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  FiSearch,
  FiMapPin,
  FiBell,
  FiPlus,
  FiGrid,
  FiShoppingBag,
  FiLayers,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import Logo from "../components/Logo";
import MobileNav from "../components/MobileNav";

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  
  // State for filters: null means nothing is selected by default
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (label: string) => {
    // Toggle logic: click same filter to deselect
    setActiveFilter(activeFilter === label ? null : label);
  };

  return (
    <div className="flex min-h-screen bg-white text-neutral-900 overflow-x-hidden font-sans">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col p-6 border-r border-[var(--color-border-soft)] bg-white fixed h-screen left-0 top-0">
        <div className="mb-10 px-2">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink 
            icon={<FiGrid />} 
            label="Discover" 
            active 
            onClick={() => navigate('/discover')} 
          />
          <SidebarLink 
            icon={<FiShoppingBag />} 
            label="My Claims" 
            onClick={() => navigate('/my-claims')} 
          />
          {/* LINKED: Connects to your My Postings page */}
          <SidebarLink 
            icon={<FiLayers />} 
            label="My Postings" 
            onClick={() => navigate('/my-postings')} 
          />
        </nav>

        <div className="pt-6 space-y-4">
          <button 
            onClick={() => navigate('/share-food')}
            className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white py-4 px-5 rounded-xl flex items-center gap-3 font-semibold shadow-sm transition-all active:scale-95"
          >
            <FiPlus size={18} />
            Post Food
          </button>

          <div className="flex items-center gap-3 bg-[var(--color-brand-softer)] p-3 rounded-xl">
            <div className="w-9 h-9 bg-[var(--color-brand)] rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <FiUser />
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-semibold truncate">
                {user?.firstName} {user?.lastName || 'User'}
              </p>
              <p className="text-neutral-500 text-xs truncate">
                {user?.organization || 'Community Member'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
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
                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border-soft)] bg-white focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none"
               />
             </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center justify-center gap-2 bg-[var(--color-brand-soft)] w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 rounded-full md:rounded-xl text-sm font-semibold text-[var(--color-brand)]">
              <FiMapPin />
              <span className="hidden md:inline whitespace-nowrap">Downtown Toronto</span>
            </div>

            <button className="p-3 rounded-xl bg-white border border-[var(--color-border-soft)] relative">
              <FiBell />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 px-6 py-6 md:py-8 space-y-6 md:space-y-8">
          
          {/* Mobile Search */}
          <div className="relative w-full md:hidden">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border-soft)] bg-white outline-none"
            />
          </div>

          <section>
            {/* HEADING ABOVE FILTERS */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available food</h2>
              <button className="flex items-center gap-2 text-sm font-semibold border border-[var(--color-border-soft)] rounded-full px-4 py-2 hover:bg-[var(--color-brand-softer)]">
                Sort by: Urgency
                <FiChevronDown />
              </button>
            </div>

            {/* NEUTRAL FILTERS: Selected only when clicked */}
            <div className="flex gap-2 overflow-x-auto mb-8 no-scrollbar">
              <FilterPill 
                label="Near me" 
                isActive={activeFilter === "Near me"} 
                onClick={() => handleFilterClick("Near me")}
              />
              <FilterPill 
                label="Expiring soon" 
                isActive={activeFilter === "Expiring soon"} 
                onClick={() => handleFilterClick("Expiring soon")}
              />
              <FilterPill 
                label="Filters" 
                isActive={activeFilter === "Filters"}
                icon={<FiChevronDown size={16} className={activeFilter === "Filters" ? "text-white" : "text-gray-400"} />}
                onClick={() => handleFilterClick("Filters")}
              />
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["69951e3da5d23ae9d12c4103", 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/resource/${i}`)}
                  className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-50"
                >
                  <div className="relative h-44 m-1.5 rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center text-neutral-300 font-bold">
                    <div className="absolute top-3 left-3 z-10">
                      <StatusPill type={i === 2 ? "pending" : "available"} />
                    </div>
                    <img 
                      src={`https://picsum.photos/seed/${i + "10"}/600/400`} 
                      alt="Food" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 pt-3">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-lg">Assorted Fruits & Veg</h3>
                      <UrgencyPill urgent={i === 3} />
                    </div>

                    <p className="text-sm text-neutral-500 mb-4">
                      15 crates • 2.1 km away
                    </p>

                    <div className="flex justify-between items-center border-t border-[var(--color-border-soft)] pt-4">
                      <div className="text-xs">
                        <p className="font-semibold text-neutral-400 uppercase tracking-wide">LOCATION</p>
                        <p className="text-neutral-700 font-medium">Downtown Food Hub</p>
                      </div>

                      <button className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                        Claim Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

/* ---------- SUB COMPONENTS ---------- */

const SidebarLink = ({
  icon,
  label,
  active = false,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors
      ${
        active
          ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)] font-semibold"
          : "text-neutral-600 hover:bg-[var(--color-brand-softer)]"
      }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);

const FilterPill = ({ 
  label, 
  isActive = false, 
  onClick, 
  icon 
}: { 
  label: string; 
  isActive?: boolean; 
  onClick?: () => void;
  icon?: React.ReactNode;
}) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center justify-center whitespace-nowrap transition-all active:scale-95
      h-9 px-4 rounded-full text-[14px] font-semibold border
      ${isActive 
        ? "bg-neutral-800 border-neutral-800 text-white shadow-sm" 
        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
      }
    `}
  >
    {label}
    {icon && <span className="ml-1.5">{icon}</span>}
  </button>
);

const StatusPill = ({ type }: { type: "available" | "pending" }) => (
  <span
    className={`px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1.5 shadow-sm ${
      type === "available"
        ? "bg-white text-emerald-600"
        : "bg-amber-50 text-amber-600"
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${type === 'available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
    {type === "available" ? "Available" : "Pending pickup"}
  </span>
);

const UrgencyPill = ({ urgent }: { urgent: boolean }) =>
  urgent ? (
    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-lg">4H LEFT</span>
  ) : (
    <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2 py-1 rounded-lg">23H LEFT</span>
  );

export default Discover;