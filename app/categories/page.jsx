import Link from "next/link";
import api from "@/axios";
import { FaPaw } from "react-icons/fa";

export default async function CategoriesPage() {
  try {
    const res = await api.get("/api/categories");
    const categories = res.data.categories;

    return (
      <section className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 py-10 px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <FaPaw className="text-4xl text-yellow-400 mx-auto mb-3 rotate-12" />
          <h1 className="text-3xl font-extrabold text-green-900">
            Shop by Category
          </h1>
          <p className="text-gray-600 mt-2">
            Choose what fits your pet best 🐾
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/products/category/${cat._id}`}
              className="
                group bg-white rounded-2xl p-6
                border border-green-100
                shadow-sm hover:shadow-lg
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              {/* Icon */}
              <div
                className="
                  w-14 h-14 flex items-center justify-center
                  rounded-full mb-4
                  bg-green-100 text-green-700
                  group-hover:bg-yellow-400
                  group-hover:text-red-500
                  transition
                  duration-300
                "
              >
                <FaPaw className="text-2xl" />
              </div>

              {/* Name */}
              <h2 className="text-lg font-bold text-green-900 group-hover:text-red-500 transition">
                {cat.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {cat.description || "Explore products for your lovely pet"}
              </p>

              {/* CTA */}
              <span className="inline-block mt-4 text-sm font-semibold text-green-700 group-hover:text-red-500 transition">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg">
        Failed to load categories 😢
      </div>
    );
  }
}
