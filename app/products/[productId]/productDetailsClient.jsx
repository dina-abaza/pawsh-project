// /app/products/[productId]/ProductDetailsClient.jsx
"use client";

import { useFavoritesStore } from "../../hooks/useFavoritesStore";
import { useCartStore } from "../../hooks/useCartStore";
import { FaHeart, FaShoppingCart, FaPaw } from "react-icons/fa";

export default function ProductDetailsClient({ product }) {
  const addToFavorites = useFavoritesStore((state) => state.add);
  const addToCart = useCartStore((state) => state.add);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg">
        فشل تحميل المنتج 😢
      </div>
    );
  }

  const BASE = "https://pawsh-pets-back-end-api.vercel.app";
  const imageUrl = product.image
    ? `${BASE}${product.image}`
    : "/placeholder.jpg";

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex items-center justify-center p-6">
      {/* Container */}
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-10">
        
        {/* Image */}
        <div className="md:w-1/2 flex-shrink-0">
          <div className=" w-full aspect-[4/3]">
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover rounded-2xl "
            />
           
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          {/* Text */}
          <div>
            <h1 className="relative text-3xl font-extrabold text-green-900 flex items-center gap-2">
             <FaPaw className="absolute top-0 right-0 text-yellow-400 text-3xl rotate-12" />  {product.title}
            </h1>

            <p className="text-2xl font-bold text-green-700 mt-3">
              {product.price} EGP
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToFavorites(product)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              <FaHeart /> Add to Favorites
            </button>

            <button
              onClick={() => addToCart(product)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-700 text-white font-semibold hover:bg-green-800 transition"
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
