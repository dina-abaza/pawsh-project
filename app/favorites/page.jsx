// /app/favorites/page.jsx
"use client";

import React from "react";
import { useFavoritesStore } from "@/app/hooks/useFavoritesStore";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const remove = useFavoritesStore((state) => state.remove);

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center pt-10 bg-green-50 p-6">
        <h1 className="text-3xl font-bold text-green-900 mb-4">Your Favorites is empty 😢</h1>
        <Link href="/categories" className="text-white bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-900 mb-6">Your Favorites</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        {favorites.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-4">
              <img src={item.image || "/placeholder.jpg"} alt={item.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-green-700 font-bold">{item.price} EGP</p>
              </div>
            </div>

            <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700 transition">
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>

      {/* زر Shop Now تحت */}
      <div className="text-center mt-6">
        <Link href="/categories" className="text-white bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
