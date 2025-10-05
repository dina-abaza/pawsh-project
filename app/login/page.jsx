"use client";

import { useState } from "react";
import LayoutHome from "../layoutHome/page";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
   mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/profile");
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
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <h2 className="text-white text-center">login to your account</h2>

        
          {error && (
            <p className="text-red-400 text-center">{error.message}</p>
          )}

          
          <label className="flex flex-col text-white text-sm">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 px-3 py-2 border border-white rounded-lg bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </label>

          
          <label className="flex flex-col text-white text-sm relative">
            Password
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
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

          
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-white text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="w-4 h-4 border border-white rounded-sm cursor-pointer"
              />
              remember me
            </label>
            <p className="text-sm text-white cursor-pointer">forget password?</p>
          </div>

          
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full py-2 rounded-lg bg-white text-black disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

        
          <p className="text-sm text-white flex justify-center">
            don't have an account?{" "}
            <a
              href="/register"
              className="text-white font-semibold underline ml-2"
            >
              sign up
            </a>
          </p>
        </form>

      
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
    </LayoutHome>
  );
}
