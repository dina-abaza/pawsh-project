"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPaw, FaUserCircle, FaCog, FaSignOutAlt, FaShoppingCart, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/app/hooks/useAuthStore";
import { useCartStore } from "@/app/hooks/useCartStore"; // سلة التسوق
import { useFavoritesStore } from "@/app/hooks/useFavoritesStore"; // المفضلة

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const username = user?.username || "User";

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Zustand
  const cart = useCartStore((state) => state.cart);
  const favorites = useFavoritesStore((state) => state.favorites);

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const favCount = favorites.length;

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
              <motion.input
                key="search"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 160, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                type="text"
                placeholder="Search..."
                className="px-2 py-1 text-sm rounded-md border border-gray-300 outline-none focus:border-green-500"
              />
            )}
          </AnimatePresence>
        </div>

      {/* السلة والمفضلة */}
<div className="flex items-center gap-4 ml-2">
  {/* Favorites */}
  <Link href="/favorites" className="relative">
    <FaHeart className="text-gray-400 text-xl hover:text-gray-500 transition cursor-pointer" />
    {favCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
        {favCount}
      </span>
    )}
  </Link>

  {/* Cart */}
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
