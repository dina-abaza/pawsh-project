// /store/favoritesStore.js
"use Client"
import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
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
}));
