"use client";

import React from "react";

const infoCards = [
  { id: 1, title: "Supplies", image: "/dog1.jpg", bg: "bg-blue-500" },
  { id: 2, title: "Veterinary", image: "/dog2.jpg", bg: "bg-pink-500" },
  { id: 3, title: "Grooming", image: "/dog3.jpg", bg: "bg-green-500" },
  { id: 4, title: "Pet Sitting", image: "/dog4.jpg", bg: "bg-yellow-500" },
  { id: 5, title: "Shelter", image: "/dog5.jpg", bg: "bg-purple-500" },
  { id: 6, title: "Pet's Food", image: "/dog6.jpg", bg: "bg-red-500" },
  { id: 7, title: "Medication", image: "/dog10.jpg", bg: "bg-teal-500" },
  { id: 8, title: "Health & Beauty", image: "/dog8.jpg", bg: "bg-orange-500" },
  { id: 9, title: "Training", image: "/dog9.jpg", bg: "bg-lime-500" },
  { id: 11, title: "Adoption", image: "/dog11.jpg", bg: "bg-rose-500" },
  { id: 12, title: "Community", image: "/dog12.jpg", bg: "bg-amber-500" },
   { id: 10, title: "Articles", image: "/dog7.jpg", bg: "bg-cyan-500" },
];

export default function InformationSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {infoCards.map((card) => (
          <div
            key={card.id}
            className={`flex items-stretch rounded-2xl shadow-lg overflow-hidden ${card.bg} transition-transform duration-300 hover:-translate-y-1`}
          >
              <div className="w-1/3 h-40">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* الجزء الخاص بالنص */}
            <div className="w-3/4 flex items-center justify-center p-4">
              <h3 className="text-xl font-semibold text-white text-center">
                {card.title}
              </h3>
            </div>

            {/* الجزء الخاص بالصورة */}
          
          </div>
        ))}
      </div>
    </section>
  );
}
