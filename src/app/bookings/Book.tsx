"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logored.png";

const Book = () => {
  const [activeTab, setActiveTab] = useState("dining");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <div className="flex justify-center mt-6 mb-4">
      <Image
          src={Logo}
          alt="Hayya Logo"
          width={120}
          height={40}
          className="rounded-xl"
        />
      </div>

      {/* TOP BAR WITH BACK BUTTON */}
      <div className="flex items-center justify-center gap-4 px-4 py-4 border-b">
        <button
          onClick={() => router.back()}
          className="text-2xl font-light text-zinc-700"
        >
          ←
        </button>

        <h1 className="text-lg md:text-xl font-semibold">Review your bookings</h1>
      </div>

      {/* TABS */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-3 bg-zinc-100 rounded-full px-3 py-2">
          
          {/* Dining */}
          <button
            onClick={() => setActiveTab("dining")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeTab === "dining"
                ? "bg-black text-white"
                : "text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            Dining
          </button>

          {/* Events */}
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeTab === "events"
                ? "bg-black text-white"
                : "text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            Events
          </button>

          {/* Movies */}
          <button
            onClick={() => setActiveTab("movies")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeTab === "movies"
                ? "bg-black text-white"
                : "text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            Movies
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      <div className="flex flex-col items-center justify-center flex-1 mt-16">
        <img
          src="/empty-bookings.png"
          alt="No bookings"
          className="w-36 h-36 opacity-80"
        />

        <p className="text-lg font-semibold text-black mt-4">
          No bookings yet!
        </p>
      </div>

    </div>
  );
};


export default Book;
