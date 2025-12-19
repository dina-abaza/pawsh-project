"use client";
import React from "react";
import Header from "./home/header";
import InformationSection from "./home/InformationSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-4">
     <Header/>
    <InformationSection/>
    </div>
  );
}
