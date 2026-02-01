import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface CheckEmailProps {
  email?: string;
}

const CheckEmail: React.FC<CheckEmailProps> = ({ email = "your email" }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(56);

  useEffect(() => {
    
    if (timer <= 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    
    return () => clearInterval(countdown);
  }, [timer]);

  
  const formatTime = (seconds: number) => {
    const s = seconds < 10 ? `0${seconds}` : seconds;
    return `0:${s}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md text-center flex flex-col items-center">
        
        {/* Success Icon  */}
        <div className="w-20 h-20 bg-[#E6F6F4] rounded-full flex items-center justify-center mb-8">
          <div className="w-10 h-10 rounded-full border-4 border-[#058177] flex items-center justify-center">
            <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
              <path 
                d="M2 7.5L7 12.5L18 1.5" 
                stroke="#058177" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-neutral-800 mb-3">
          Check your email
        </h1>
        
        <p className="text-neutral-500 font-medium leading-relaxed max-w-[340px]">
          If an account exists for that email, we’ve sent a password reset link.
        </p>
        
        {/* Functional Timer */}
        <p className="text-neutral-500 mt-6 font-medium">
            {timer > 0 ? (
                <>
                Didn’t receive a link? Resend code in{" "}
                <span className="text-[#058177] font-bold">
                    {formatTime(timer)}
                </span>
                </>
            ) : (
                <span className="text-neutral-500 mt-6 font-medium">Didn’t receive a link?Resend code</span>
            )}
        </p>

        
        <Button 
            variant="outline" 
            className={`w-full py-4 rounded-2xl font-bold mt-8 transition-all border-none ${
                timer > 0 
                ? "!bg-neutral-100 !text-neutral-400 cursor-not-allowed shadow-none" 
                : "!bg-[#058177] !text-white hover:opacity-90 cursor-pointer shadow-lg shadow-[#058177]/20"
            }`}
            onClick={() => {
                if (timer === 0) {
                setTimer(59); 
                console.log("Resending link to:", email);
                }
            }}
            >
            Resend link
        </Button>

        <div className="mt-8">
          <span 
            onClick={() => navigate("/login")} 
            className="text-[#058177] font-bold cursor-pointer hover:underline text-sm"
          >
            Back to sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;