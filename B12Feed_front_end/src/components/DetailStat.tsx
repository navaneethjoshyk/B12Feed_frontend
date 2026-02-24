import React from 'react';

interface DetailStatProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const DetailStat: React.FC<DetailStatProps> = ({ label, value, icon }) => {
  return (
    <div className="flex items-center gap-4 group transition-all">
      {/* Icon Container */}
      <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-gray-50 flex items-center justify-center text-xl text-[#058177] group-hover:bg-[#F0FDF4] transition-colors">
        {icon}
      </div>
      
      {/* Text Container */}
      <div className="flex flex-col">
        <p className="text-sm font-bold text-gray-900 leading-tight">
          {label}
        </p>
        <p className="text-sm text-gray-400 font-medium mt-0.5">
          {value || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default DetailStat;