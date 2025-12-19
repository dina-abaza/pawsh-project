"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // إضافة منتج للسلة
      add: (product) =>
        set((state) => {
          // نتأكد إن كل منتج عنده id فريد
          if (!product.id) {
            console.warn("Product must have a unique id!");
            return state;
          }

          const existing = state.cart.find((p) => p.id === product.id);
          if (existing) {
            // لو موجود، نزود الكمية بس
            return {
              cart: state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: (p.quantity || 1) + 1 }
                  : p
              ),
            };
          }

          // إذا جديد، نضيفه كسطر جديد مع quantity = 1
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
    }),
    {
      name: "cart-storage", // الاسم اللي هيحفظ البيانات في localStorage
    }
  )
);
