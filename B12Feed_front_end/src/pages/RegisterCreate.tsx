import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, type NewUserSignupData } from "../api/api";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";

const RegisterCreate: React.FC = () => {
  const navigate = useNavigate();

  // State to manage all form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    orgName: "",
    orgAddress: "",
    phone: "",
  });

  // API State
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Function to format phone: (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user types
    if (apiError) setApiError("");

    // Apply formatting if the field is 'phone'
    const finalValue = name === "phone" ? formatPhoneNumber(value) : value;
    
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    
    try {
      console.log("Submitting:", formData);
      
      // Use signupUser (the function) and NewUserSignupData (the type)
      const status = await signupUser(formData as NewUserSignupData);

      // Check for successful status (200 or 201)
      if (status === 200 || status === 201) {
        navigate("/signup/success");
      } else {
        setApiError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      // Capture the error message thrown by the axios catch block in api.ts
      setApiError(err.message || "Failed to create account. Please check your details.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6 font-sans">
      <Logo />

      <div className="w-full max-w-xl">
        <div className="text-center mt-8 mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
            Create your organization
          </h1>
          <p className="text-neutral-500 mt-3 font-medium">
            Set up your organization to start using B12Feed.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {apiError && (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-2xl text-center font-medium border border-red-100 animate-in fade-in duration-300">
              {apiError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              placeholder="e.g. John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="e.g. Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="name@organization.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Organization name"
            name="orgName"
            placeholder="e.g. Parkdale Community Kitchen"
            value={formData.orgName}
            onChange={handleChange}
            required
          />

          <Input
            label="Organization address"
            name="orgAddress"
            placeholder="Street address, City"
            value={formData.orgAddress}
            onChange={handleChange}
            required
          />

          <Input
            label="Primary contact phone"
            name="phone"
            type="tel"
            placeholder="e.g. (416) 555-0123"
            value={formData.phone}
            onChange={handleChange}
            maxLength={14}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className={`w-full py-4 rounded-2xl font-bold text-lg mt-6 transition-all ${
              loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "active:scale-[0.98]"
            }`}
          >
            {loading ? "Processing..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCreate;