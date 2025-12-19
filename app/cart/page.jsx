"use client";

import React from "react";
import { useCartStore } from "@/app/hooks/useCartStore";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const remove = useCartStore((state) => state.remove);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center pt-10 bg-green-50 p-6">
        <h1 className="text-3xl font-bold text-green-900 mb-4">the cart is empty😢</h1>
        <Link href="/categories" className="text-green-700 underline">shop now</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-900 mb-6">Your Purchases</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-4">
              <img src={item.image || "/placeholder.jpg"} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-green-700 font-bold">{item.price} EGP</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity || 1}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-16 border rounded p-1 text-center"
              />
              <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700 transition">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}

        <div className="text-right mt-4 text-lg font-bold">
         total: <span className="text-green-900">{total} EGP</span>
        </div>
        
<div className="mt-6 flex justify-center">
  <Link
    href="/categories"
    className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
  >
    Shop Now
  </Link>
</div>
      </div>
     
    </div>
  );
}
