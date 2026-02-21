import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiInfo } from "react-icons/fi"; 
import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";
// Updated to use the correct function name from your api.ts
import { signupUser } from "../api/api";

const RegisterJoin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  // Using the logic from the incoming commit: check if name exists
  const orgName = queryParams.get("name"); 

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // API State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Cast the payload as any or use a specific interface if you have one for 'Join'
      // Note: signupUser expects NewUserSignupData, make sure the backend handles 
      // missing org fields for 'Join' requests.
      await signupUser({ 
        ...formData,
        orgName: orgName || "",
        orgAddress: "", // These might be populated by the invite logic on the backend
        phone: ""
      } as any);
      
      navigate("/discover"); 
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER LOGIC ---

  // SCENARIO A: No invite name in URL (Show Info Screen)
  if (!orgName) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md flex flex-col items-center text-center">
          <div className="mb-8 w-24 h-24 rounded-full bg-[#EBF5FF] flex items-center justify-center">
            <FiInfo size={44} className="text-[#3B82F6]" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight mb-4">
            Join an organization
          </h1>
          <div className="text-neutral-500 font-medium leading-relaxed mb-10">
            <p>You'll need an invite to join an organization</p>
            <p>Ask your organization admin to send you an invite link.</p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 px-8 rounded-xl bg-[#058177] text-white font-bold text-lg hover:bg-[#046b63] transition-all shadow-md"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  // SCENARIO B: Invite name exists (Show Registration Form)
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6 font-sans">
      <Logo />
      <div className="w-full max-w-xl text-center">
        <div className="mt-8 mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
            Join your organization
          </h1>
          <p className="text-neutral-500 mt-6 font-medium">You’ve been invited to join:</p>
          <h2 className="text-2xl font-bold text-[#058177] mt-3">{orgName}</h2>
        </div>

        <form className="space-y-5 text-left" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl text-center font-medium border border-red-100">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" placeholder="e.g. John" value={formData.firstName} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" placeholder="e.g. Doe" value={formData.lastName} onChange={handleChange} required />
          </div>
          <Input label="Email" type="email" name="email" placeholder="name@organization.com" value={formData.email} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
          <Button type="submit" variant="primary" className={`w-full py-4 rounded-2xl font-bold text-lg mt-6 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterJoin;