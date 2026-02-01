import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import CreateIcon from "../assets/Building.svg"; 
import JoinIcon from "../assets/Duo.svg"; 

const RegisterChoice: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <Logo />

      <div className="w-full max-w-4xl text-center mt-8">
        <h1 className="text-3xl font-bold text-neutral-800 tracking-tight mb-4">
          Get started with us
        </h1>
        <p className="text-neutral-500 font-medium max-w-xl mx-auto leading-relaxed mb-12">
          B12Feed is a private platform for food recovery organizations. New organizations 
          must be reviewed before access is granted.
        </p>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          
          <OptionCard
            title="Create an organization"
            description="For organizations new to B12Feed platform."
            onClick={() => navigate("/signup/create")}
            icon={<img src={CreateIcon} alt="Building Icon" className="w-10 h-10" />}
          />

          <OptionCard
            title="Join an organization"
            description="If you’ve been invited by your team."
            onClick={() => navigate("/signup/join")}
            icon={<img src={JoinIcon} alt="Users Icon" className="w-10 h-10" />}
          />
        </div>
      </div>
    </div>
  );
};

/* --- Internal Component for the Cards --- */
interface OptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer p-10 rounded-3xl border border-neutral-100 bg-neutral-50/30 hover:bg-white hover:border-[#058177]/30 hover:shadow-xl hover:shadow-[#058177]/5 transition-all duration-300 flex flex-col items-center text-center"
    >
      
      <div className="mb-6 p-4 rounded-2xl bg-white group-hover:bg-[#E6F6F4] transition-colors duration-300 flex items-center justify-center">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-neutral-800 mb-2">
        {title}
      </h3>
      
      <p className="text-neutral-500 text-sm font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default RegisterChoice;