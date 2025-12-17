"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleShopNow = () => {
    router.push("/categories"); // ← دي الصفحة اللي فيها الكاتيجوري والمنتجات
  };

  return (
    <header className="relative w-full max-w-7xl mx-auto h-[450px]">
      {/* صورة الخلفية */}
      <img
        src="/header.png"
        alt="Header Background"
        className="w-full h-full object-cover"
      />

      {/* النص فوق الصورة */}
      <div className="absolute left-20 top-20 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold mb-2">Up Sale</h1>
        <p className="text-xl">Discount 20% off 🐾</p>
        <button
          onClick={handleShopNow}
          className="bg-white text-red-700 px-4 py-1 rounded mt-2 cursor-pointer hover:bg-gray-200 transition"
        >
          Shop Now
        </button>
      </div>
    </header>
  );
}
