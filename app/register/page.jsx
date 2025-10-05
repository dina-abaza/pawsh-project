"use client";

import { useState } from "react";
import LayoutHome from "../layoutHome/page";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { useRegister } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function Register() {
   const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { mutate, isPending, error, isSuccess } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmpassword) {
      return alert("Please fill all the fields");
    }
    if (formData.password !== formData.confirmpassword) {
      return alert("Passwords do not match");
    }
    if (formData.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }
    if (!agree) {
      return alert("You must agree to the Privacy Policy");
    }

   mutate(
      {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  return (
    <LayoutHome
      title="pawsh"
      description="happy pet's happy hearts"
      img="/dogshome3.jpg"
    >
      <div className="mt-10 flex flex-col items-center gap-6 w-full max-w-md mx-auto">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-white text-center">create your account</h2>

          {/* Errors / Success */}
          {error && <p className="text-red-500">{error.message}</p>}
          {isSuccess && <p className="text-green-500">Registration successful ✅</p>}

          {/* Full Name */}
          <label className="flex flex-col text-white text-sm">
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 px-3 py-2 border border-white rounded-lg bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </label>

          {/* Email */}
          <label className="flex flex-col text-white text-sm">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 px-3 py-2 border border-white rounded-lg bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </label>

          {/* Password */}
          <label className="flex flex-col text-white text-sm relative">
            Password
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 w-full px-3 py-2 border border-white rounded-lg bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </label>

          {/* Confirm Password */}
          <label className="flex flex-col text-white text-sm relative">
            Confirm Password
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="mt-1 w-full px-3 py-2 border border-white rounded-lg bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </label>

          {/* Privacy Policy */}
          <label className="flex items-center gap-2 text-white text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="w-4 h-4 border border-white rounded-sm cursor-pointer"
            />
            I agree to the Privacy Policy
          </label>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full py-2 rounded-lg bg-white text-black disabled:opacity-50"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-white">
          Already have an account?{" "}
          <a href="/login" className="text-white font-semibold underline ml-2">
            Login
          </a>
        </p>

        {/* Or continue with */}
        <div className="flex flex-col items-center mt-6 w-full max-w-md">
          <div className="flex items-center w-full gap-2">
            <div className="flex-1 h-px bg-white"></div>
            <span className="text-white text-sm whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-px bg-white"></div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="p-2 bg-white rounded-full cursor-pointer flex items-center justify-center">
              <FaGoogle className="text-2xl" style={{ color: "#FFD700" }} />
            </div>
            <div className="p-2 bg-white rounded-full cursor-pointer flex items-center justify-center">
              <FaFacebookF className="text-2xl" style={{ color: "#1877F2" }} />
            </div>
          </div>
        </div>
      </div>

      {isSuccess && <p className="text-green-500">✅ Registered Successfully!</p>}
      {error && <p className="text-red-500">❌ {error.response?.data?.message || error.message}</p>}
    </LayoutHome>
  );
}
