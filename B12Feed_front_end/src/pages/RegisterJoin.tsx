import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";

const RegisterJoin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Reads the organization name from the URL (?name=Something) 
  // Defaults to "Parkdale Community Kitchen" if nothing is in the URL
  const queryParams = new URLSearchParams(location.search);
  const orgName = queryParams.get("name") || "Parkdale Community Kitchen";

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logic to handle account creation
    console.log("Account Created for:", formData);

    // Redirect user to the dashboard after successful join
    navigate("/discover"); 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6 font-sans">
      <Logo />

      <div className="w-full max-w-xl text-center">
        <div className="mt-8 mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
            Join your organization
          </h1>
          <p className="text-neutral-500 mt-6 font-medium">
            You’ve been invited to join:
          </p>
          {/* Dynamic organization name styled in brand teal */}
          <h2 className="text-2xl font-bold text-[#058177] mt-3">
            {orgName}
          </h2>
        </div>

        <form className="space-y-5 text-left" onSubmit={handleSubmit}>
          {/* Row: First and Last Name */}
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

          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 rounded-2xl font-bold text-lg mt-6"
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterJoin;