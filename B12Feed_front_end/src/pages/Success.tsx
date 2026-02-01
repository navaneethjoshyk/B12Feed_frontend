import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    // Centering wrapper to match the full-screen layout
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans text-center">
      <div className="w-full max-w-md">
        
        {/* Success Icon: Teal checkmark in light teal circle */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-[#E6F6F4] rounded-full flex items-center justify-center text-[#058177]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        {/* Heading: Matches exact text from design */}
        <h1 className="text-3xl font-bold text-neutral-800 tracking-tight mb-4">
          Request received
        </h1>
        
        {/* Description: Matches exact text and spacing */}
        <div className="text-neutral-500 font-medium leading-relaxed mb-10">
          <p>Your organization has been submitted for review.</p>
          <p>We'll email you when it's ready.</p>
          <p className="mt-4">This usually takes 1–2 business days.</p>
        </div>

        {/* Action Button: Primary brand teal */}
        <Button
          onClick={() => navigate("/login")}
          variant="primary"
          className="w-full py-4 rounded-2xl font-bold text-lg"
        >
          Back to sign in
        </Button>
      </div>
    </div>
  );
};

export default Success;