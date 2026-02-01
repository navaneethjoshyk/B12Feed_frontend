import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError("Incorrect password. Try again or reset it.");
      hasError = true;
    }

    if (!hasError) {
      navigate("/discover");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <Logo />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-neutral-500 mt-3 font-medium">
            Helping good food reach the right hands.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSignIn}>
          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="name@organization.com"
            error={emailError}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            error={passwordError}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(""); 
            }}
          />

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
            Get started
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;