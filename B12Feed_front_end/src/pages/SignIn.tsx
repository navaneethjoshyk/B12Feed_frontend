import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <Logo />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
            Welcome back
          </h1>
          <p className="text-neutral-500 mt-3 font-medium">
            Helping good food reach the right hands.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/discover");
          }}
        >
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-700 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="name@organization.com"
              className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 outline-none focus:ring-2 focus:ring-[#058177]/20 focus:border-[#058177] transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-700 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 outline-none focus:ring-2 focus:ring-[#058177]/20 focus:border-[#058177] transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-neutral-300 accent-[#058177]" 
              />
              <span className="text-sm font-medium text-neutral-600 group-hover:text-black transition-colors">
                Remember me
              </span>
            </label>
            
            <span 
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-bold text-[#058177] cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 rounded-2xl font-bold text-lg mt-4"
          >
            Sign in
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-500 mt-8">
          New to B12Feed?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-bold text-[#058177] cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;