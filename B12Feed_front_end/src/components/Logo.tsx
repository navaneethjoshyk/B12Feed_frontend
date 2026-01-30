import React from "react";
import LogoSvg from "../assets/Logo.svg";

interface LogoProps {
  subtitle?: string;
}

const Logo: React.FC<LogoProps> = ({ subtitle }) => {
  return (
    <div className="mb-6 flex flex-col items-center">
      <img
        src={LogoSvg}
        alt="B12Feed Logo"
        className="w-40 mb-4"
      />

      {subtitle && (
        <p className="text-neutral-500 text-center font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Logo;
