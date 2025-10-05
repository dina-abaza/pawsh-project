"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/axios";

export const useAuthToken = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const verifyRes = await api.post("/api/auth/verify-token", { client: "web" });
        if (verifyRes.data.valid) {
          setIsAuthenticated(true);
          return router.replace("/profile");
        }

        const refreshRes = await api.post("/api/auth/refresh-token", { client: "web" });
        if (refreshRes.data.message) {
          const reVerify = await api.post("/api/auth/verify-token", { client: "web" });
          if (reVerify.data.valid) {
            setIsAuthenticated(true);
            return router.replace("/profile");
          }
        }

        throw new Error("No valid tokens, redirecting to login");
      } catch (err) {
        console.error("❌ Auth failed:", err);
        setError(err.response?.data?.message || err.message || "فشل التحقق من التوكن");
        setIsAuthenticated(false);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { loading, error, isAuthenticated };
};
