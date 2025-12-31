"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://pawsh-pets-back-end-api.vercel.app/api/search",
          { params: { q: query, limit: 20 } }
        );
        if (res.data.success) {
          setResults(res.data.items || []);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen py-16 px-6 md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Search results for: "{query}"</h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <Link
              key={item._id}
              href={`/home/informations/${item._id}`}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-green-700 font-bold mt-1">${item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
