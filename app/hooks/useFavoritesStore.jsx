"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],

      // إضافة منتج للمفضلات
    
add: (product) =>
  set((state) => {
    // نتأكد إن المنتج مش موجود بالفعل
    if (!state.favorites.find((p) => p.id === product.id)) {
      return { favorites: [...state.favorites, product] };
    }
    return state;
  }),

      // إزالة منتج من المفضلات
      remove: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        })),

      // تفريغ كل المفضلات
      clear: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage", // الاسم اللي هيحفظ البيانات في localStorage
    }
  )
);
