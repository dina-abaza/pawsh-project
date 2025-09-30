// hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import api from "@/axios";

// Login Hook
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await api.post("/api/auth/login", { email, password, client: "web" });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("✅ Login success:", data);
      // هنا تقدري تخزني الـ user في Zustand أو localStorage لو عايزة
    },
    onError: (error) => {
      console.error("❌ Login error:", error.response?.data || error.message);
    },
  });
};

// Register Hook
export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ username, email, password }) => {
      const res = await api.post("/api/auth/register", { username, email, password });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("✅ Register success:", data);
    },
    onError: (error) => {
      console.error("❌ Register error:", error.response?.data || error.message);
    },
  });
};
