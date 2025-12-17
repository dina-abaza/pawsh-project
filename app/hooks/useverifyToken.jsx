"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/axios";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // 🔹 interceptor للـ response
    const interceptor = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;

        // لو request فشل 401 ولسه مجربناش نعمل refresh
        if (
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            // 🔄 نجدد التوكن
            await api.post("/api/auth/refresh-token", {
              client: "web",
            });

            // 🔁 نعيد نفس الطلب
            return api(originalRequest);
          } catch (refreshError) {
            // ❌ الريفرش فشل
            router.replace("/login");
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // تنظيف interceptor لما الصفحة تتقفل
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [router]);
};
