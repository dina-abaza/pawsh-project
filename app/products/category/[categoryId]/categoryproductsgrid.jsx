"use client";

import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export default function CategoryProductsGrid({ products }) {
  const BASE = "https://pawsh-pets-back-end-api.vercel.app";

  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        لا توجد منتجات في هذه الفئة حاليًا
      </div>
    );
  }

  return (
    <section className="p-6 min-h-screen">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl p-3 shadow-lg  transition-transform duration-300 hover:-translate-y-1 flex flex-col border border-green-200"
          >
            <h2 className="text-lg font-semibold text-green-900 flex items-center gap-2 mb-2">
              <FaPaw className="text-yellow-500" /> {product.title}
            </h2>

            <div className="w-full aspect-[4/3] mb-2 overflow-hidden rounded-lg">
              <img
                src={product.image ? `${BASE}${product.image}` : "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-green-700 font-semibold mb-2">{product.price} EGP</p>

            <Link
              href={`/products/${product._id}`}
              className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              <FaPaw /> view Product
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
