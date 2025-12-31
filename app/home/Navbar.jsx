"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPaw, FaUserCircle, FaCog, FaSignOutAlt, FaShoppingCart, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/app/hooks/useAuthStore";
import { useCartStore } from "@/app/hooks/useCartStore";
import { useFavoritesStore } from "@/app/hooks/useFavoritesStore";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const username = user?.username || "User";

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const favorites = useFavoritesStore((state) => state.favorites);

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const favCount = favorites.length;

  // جلب الاقتراحات
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        "https://pawsh-pets-back-end-api.vercel.app/api/search/suggest",
        { params: { q: query } }
      );
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSuggestionClick = (item) => {
    router.push(`/search?q=${encodeURIComponent(item.title)}`);
    setSearchQuery("");
    setSuggestions([]);
    setShowSearch(false);
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-[#f5f5f5] shadow-sm">
      {/* Left Icons */}
      <div className="flex items-center gap-4 relative">

        {/* أيقونة النقط + القائمة */}
        <div className="relative">
          <HiOutlineDotsVertical
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-gray-400 text-xl hover:text-gray-500 cursor-pointer transition"
          />

          <AnimatePresence>
            {showMenu && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-[200] overflow-hidden"
              >
                <Link
                  href="/petData"
                  className="flex items-center gap-2 px-4 py-3 text-green-900 hover:bg-black/10 transition text-sm"
                  onClick={() => setShowMenu(false)}
                >
                  <FaUserCircle className="text-green-700 text-base" />
                  <span>Profile</span>
                </Link>

                <Link
                  href="/setting"
                  className="flex items-center gap-2 px-4 py-3 text-green-900 hover:bg-black/10 transition text-sm"
                  onClick={() => setShowMenu(false)}
                >
                  <FaCog className="text-green-700 text-base" />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={async () => {
                    setShowMenu(false);
                    try {
                      await logout();
                      router.push("/register");
                    } catch (error) {
                      console.error("Logout failed:", error);
                    }
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-900 hover:bg-black/10 transition text-sm"
                >
                  <FaSignOutAlt className="text-red-700 text-base" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Section */}
        <div className="flex items-center gap-2 relative">
          <FiSearch
            onClick={() => setShowSearch((prev) => !prev)}
            className="text-gray-400 text-xl hover:text-gray-500 cursor-pointer transition"
          />

          <AnimatePresence>
            {showSearch && (
              <motion.div
                key="search-container"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-2 py-1 text-sm rounded-md border border-gray-300 outline-none focus:border-green-500 w-full"
                />

                {/* Dropdown الاقتراحات */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-lg z-50 rounded-md overflow-hidden">
                    {suggestions.map((item) => (
                      <button
                        key={item._id}
                        onClick={() => handleSuggestionClick(item)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                      >
                        {item.title} - ${item.price}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Favorites & Cart */}
        <div className="flex items-center gap-4 ml-2">
          <Link href="/favorites" className="relative">
            <FaHeart className="text-gray-400 text-xl hover:text-gray-500 transition cursor-pointer" />
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {favCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-gray-400 text-xl hover:text-gray-500 transition cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Center Title */}
      <Link href="/" className="cursor-pointer text-gray-700 font-semibold text-lg relative inline-block">
        <h1 className="text-[2.5rem] font-extrabold text-green-800 relative z-10">
          pawsh
        </h1>
        <FaPaw
          className="absolute -top-[6px] right-[6px] text-yellow-400 text-3xl rotate-[35deg] translate-x-[-6px]"
        />
      </Link>

      {/* Right User Greeting */}
      <div className="text-gray-600 font-semibold text-base">
        Hello <span className="font-medium">{username}</span>
      </div>
    </nav>
  );
};

export default Navbar;
