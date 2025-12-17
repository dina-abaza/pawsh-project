"use client";

import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export default function ProductsGrid({ products }) {
  const BASE = "https://pawsh-pets-back-end-api.vercel.app";

  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        لا توجد منتجات حاليًا
      </div>
    );
  }

  return (
    <section className="p-8">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.image ? `${BASE}${product.image}` : "/placeholder.jpg"}
              alt={product.title || "product"}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-green-700 font-bold">{product.price} EGP</p>
            <Link
              href={`/products/${product._id}`}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              <FaPaw /> عرض المنتج
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
