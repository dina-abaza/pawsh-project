import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../../axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: async () => {
        try {
          const response = await api.post(
            "/api/auth/logout",
            { client: "web" },
            { withCredentials: true }
          );
          console.log("Logout successful:", response.data.message);
          set({ user: null });
          return response.data;

        } catch (error) {
          console.error(
            "Error during logout:",
            error.response ? error.response.data.message : error.message
          );
          throw error;
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
