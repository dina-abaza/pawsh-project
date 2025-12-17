// /store/cartStore.js
"use Client"

import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  // إضافة منتج للسلة
  add: (product) =>
    set((state) => {
      const existing = state.cart.find((p) => p.id === product.id);
      if (existing) {
        // لو المنتج موجود مسبقًا، نزود الكمية
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  // إزالة منتج من السلة
  remove: (productId) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== productId),
    })),

  // تفريغ السلة
  clear: () => set({ cart: [] }),

  // تعديل كمية منتج
  updateQuantity: (productId, qty) =>
    set((state) => ({
      cart: state.cart.map((p) =>
        p.id === productId ? { ...p, quantity: qty } : p
      ),
    })),
}));
