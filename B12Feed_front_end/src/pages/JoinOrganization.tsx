import React from "react";
import { useNavigate } from "react-router-dom";
import { FiInfo } from "react-icons/fi"; 

const JoinOrganization: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        
         
        <div className="mb-8 w-24 h-24 rounded-full bg-[#EBF5FF] flex items-center justify-center">
          <FiInfo size={44} className="text-[#3B82F6]" />
        </div>

        {/* Text Content */}
        <h1 className="text-[32px] font-bold text-neutral-800 tracking-tight mb-4">
          Join an organization
        </h1>
        
        <div className="space-y-1 mb-10 text-neutral-500 font-medium leading-relaxed">
          <p>You'll need an invite to join an organization</p>
          <p>Ask your organization admin to send you an invite link.</p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full py-4 px-8 rounded-xl bg-[#058177] text-white font-bold text-lg hover:bg-[#046b63] transition-all duration-300 shadow-lg shadow-[#058177]/10 active:scale-[0.98]"
        >
          Back to sign in
        </button>
      </div>
    </div>
  );
};

export default JoinOrganization;