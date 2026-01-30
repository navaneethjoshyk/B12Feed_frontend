import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiBell,
  FiPlus,
  FiHome,
  FiLayers,
  FiMessageSquare,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import Logo from "../components/Logo";

const Discover: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-white text-neutral-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col p-6 border-r border-[var(--color-border-soft)] bg-white">
        <div className="mb-10 px-2">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarLink icon={<FiHome />} label="Discover" active />
          <SidebarLink icon={<FiLayers />} label="My Claims" />
          <SidebarLink icon={<FiMessageSquare />} label="My Resources" />
        </nav>

        <div className="pt-6 space-y-4">
          <button className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white py-4 px-5 rounded-xl flex items-center gap-3 font-semibold shadow-sm transition-colors">
            <FiPlus size={18} />
            Share Food
          </button>


          <div className="flex items-center gap-3 bg-[--color-brand-softer] p-3 rounded-xl">
            <div className="w-9 h-9 bg-[--color-brand] rounded-lg flex items-center justify-center text-white">
              <FiUser />
            </div>
            <div className="text-sm">
              <p className="font-semibold">Mark Johnson</p>
              <p className="text-neutral-500 text-xs">
                Parkdale Community Kitchen
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-20 px-6 flex items-center justify-between bg-white">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border-soft)] bg-white focus:ring-2 focus:ring-[var(--color-brand])/20 outline-none"
            />
          </div>

          <div className="flex items-center gap-3 ml-6">
            <div className="flex items-center gap-2 bg-[var(--color-brand-soft)] px-4 py-2 rounded-xl text-sm font-semibold text-[var(--color-brand)]">
              <FiMapPin />
              Downtown Toronto
            </div>

            <button className="p-3 rounded-xl bg-white border border-[var(--color-border-soft)] relative">
              <FiBell />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
          {/* FILTERS */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <FilterPill label="Near me" />
            <FilterPill label="Expiring soon" />
            <FilterPill label="Filters" />
          </div>

          {/* SECTION */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available food</h2>
              <button className="flex items-center gap-2 text-sm font-semibold border border-[var(--color-border-soft)] rounded-full px-4 py-2 hover:bg-[var(--color-brand-softer)  ]">
                Sort by: Urgency
                <FiChevronDown />
              </button>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/resource/${i}`)}
                  className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative h-44">
                    <div className="absolute top-3 left-3">
                      <StatusPill type={i === 2 ? "pending" : "available"} />
                    </div>
                    <div className="h-full bg-neutral-100 flex items-center justify-center text-neutral-300 font-bold">
                      Image
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-lg">
                        Assorted Fruits & Veg
                      </h3>
                      <UrgencyPill urgent={i === 3} />
                    </div>

                    <p className="text-sm text-neutral-500 mb-4">
                      15 crates • 2.1 km away
                    </p>

                    <div className="flex justify-between items-center border-t border-[var(--color-border-soft)] pt-3">
                      <div className="text-xs">
                        <p className="font-semibold text-neutral-500">
                          LOCATION
                        </p>
                        <p className="text-neutral-700">
                          Downtown Food Hub
                        </p>
                      </div>

                      <button className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white px-5 py-2 rounded-xl text-sm font-semibold">
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
    </div>
  );
};

/* ---------- SUB COMPONENTS ---------- */

const SidebarLink = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <div
    className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors
      ${
        active
          ? "bg-[--color-brand-soft] text-[--color-brand] font-semibold"
          : "text-neutral-600 hover:bg-[--color-brand-softer]"
      }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);

const FilterPill = ({ label }: { label: string }) => (
  <button className="bg-white border border-[var(--color-border-soft)] rounded-full px-4 py-2 text-sm font-semibold hover:bg-[var(--color-brand-softer) ] whitespace-nowrap">
    {label}
  </button>
);

const StatusPill = ({ type }: { type: "available" | "pending" }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      type === "available"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-amber-50 text-amber-600"
    }`}
  >
    ● {type === "available" ? "Available" : "Pending pickup"}
  </span>
);

const UrgencyPill = ({ urgent }: { urgent: boolean }) =>
  urgent ? (
    <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
      4H LEFT
    </span>
  ) : (
    <span className="bg-neutral-100 text-neutral-600 text-xs font-bold px-3 py-1 rounded-full">
      23H LEFT
    </span>
  );

export default Discover;
