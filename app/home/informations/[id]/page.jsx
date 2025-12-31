"use client";

import { useParams } from "next/navigation";
import React from "react";
import { infoCards } from "../infoCardsData";
import { FaPaw } from "react-icons/fa";

export default function InformationPage() {
  const params = useParams();
  const card = infoCards.find(c => c.id === parseInt(params.id));

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <FaPaw className="text-5xl text-green-700 mb-4 animate-bounce" />
        <p className="text-lg font-medium text-center">No Section found 😢</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-lg overflow-hidden">

        {/* الكارت كامل */}
<div className={`flex flex-col lg:flex-row ${card.bg} rounded-2xl overflow-hidden min-h-[500px]`}>

          {/* الصورة */}
          <div className="lg:w-1/3 w-full h-80 lg:h-auto overflow-hidden flex-shrink-0">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* النص والعنوان */}
          <div className="lg:w-2/3 w-full p-6 flex flex-col justify-center">
            <h2 className={`text-3xl font-bold mb-4 text-white text-center lg:text-left`}>
              {card.title}
            </h2>

            <div className="prose prose-lg text-white">
              {card.content.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
