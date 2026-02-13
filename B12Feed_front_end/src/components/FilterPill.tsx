import React from 'react';

interface FilterPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string; 
}

const FilterPill: React.FC<FilterPillProps> = ({ 
  label, 
  isActive = false, 
  onClick, 
  icon,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        /* Layout */
        flex items-center justify-center whitespace-nowrap transition-all duration-200
        
        /* Regular Sizing (h-9 is ~36px) */
        h-9 px-4 rounded-full text-[14px] font-medium border
        
        /* Interactive States */
        active:scale(0.96) cursor-pointer
        
        /* State-based Colors */
        ${isActive 
          ? "bg-[#e9f6f3] border-[#058177] text-[#058177] shadow-sm" 
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
        }
        
        /* Inherit global Arial font */
        font-sans ${className}
      `}
    >
      <span>{label}</span>
      {icon && <span className="ml-2 flex items-center">{icon}</span>}
    </button>
  );
};

export default FilterPill;