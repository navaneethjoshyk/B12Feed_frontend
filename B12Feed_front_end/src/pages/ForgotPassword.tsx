import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Logo from '../components/Logo'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigates to the success screen and passes the email address through state
    navigate('/check-email', { state: { email } }); 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      
      <Logo />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
            Reset your password
          </h1>
          
          <p className="text-neutral-500 mt-3 font-medium">
            Don’t worry. Enter your email and we’ll send you a <br className="hidden sm:block" /> link to reset your password.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleReset}>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-neutral-700 ml-1">
              Email
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.com"
              className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 outline-none focus:ring-2 focus:ring-[#058177]/20 focus:border-[#058177] transition-all"
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-4 rounded-2xl font-bold text-lg mt-4"
          >
            Reset password
          </Button>
        </form>

        <div className="text-center mt-8">
          <span 
            onClick={() => navigate('/login')} 
            className="text-[#058177] font-bold cursor-pointer hover:underline text-sm"
          >
            Back to sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;