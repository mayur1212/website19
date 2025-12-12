"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

import Logo from "@/assets/logored.png";
import { EVENTS } from "@/components/EventCard";
import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";

export default function BuyTicketsPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = React.use(params);  // ⭐ Correct way
  const eventId = Number(id);

  const event = EVENTS.find((e) => e.id === eventId);

  if (!event)
    return (
      <div className="p-10 text-center text-xl text-black">Event not found</div>
    );

  /* ---------------------------------- LOGIN LOGIC ---------------------------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("logged_in");
    if (logged === "true") setIsLoggedIn(true);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("logged_in", "true");
    setIsLoggedIn(true);
    setOpenDrawer(true);
  };

  /* ---------------------------------- FILTER LOGIC ---------------------------------- */
  const priceFilters = ["3500", "4500", "7000", "10000", "15000"];
  const [selectedPrice, setSelectedPrice] = useState("15000");

  const sectionColors: any = {
    "15000": ["lounge"],
    "10000": ["gold"],
    "7000": ["platinum"],
    "4500": ["fanpit"],
    "3500": ["silver"],
  };

  const activeSections = sectionColors[selectedPrice];
  const isActive = (name: string) =>
    activeSections?.includes(name.toLowerCase());

  /* ---------------------------------- ZOOM LOGIC ---------------------------------- */
  const [zoom, setZoom] = useState(1);
  const increaseZoom = () => setZoom((z) => Math.min(z + 0.1, 1.6));
  const decreaseZoom = () => setZoom((z) => Math.max(z - 0.1, 0.6));

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ---------------------------------------------------------------------- */}
      {/* TOP HEADER (LOGO + EVENT TITLE + PROFILE BUTTON) */}
      {/* ---------------------------------------------------------------------- */}
      <header className="w-full border-b bg-white shadow-sm px-6 py-2 flex items-center justify-between">

  {/* LEFT — LOGO */}
  <Image
    src={Logo}
    alt="Hayya"
    width={110}
    height={40}
    className="cursor-pointer rounded-2xl"
    onClick={() => (window.location.href = "/")}
  />

  {/* CENTER — EVENT INFO (moved UP with tighter spacing) */}
  <div className="text-center flex flex-col leading-tight">
    <h2 className="text-base font-semibold truncate max-w-[350px] mx-auto">
      {event.title}
    </h2>
    <p className="text-xs text-gray-600 -mt-0.5">
      {event.dateTime} • {event.location}
    </p>
  </div>

  {/* RIGHT — PROFILE BUTTON */}
  <button
    onClick={() => (isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true))}
    className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 text-white font-semibold"
  >
    U
  </button>
</header>

      {/* LOGIN MODAL */}
      <ProfileLoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* PROFILE DRAWER */}
      <ProfileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onLoggedOut={() => {
          setIsLoggedIn(false);
          setOpenDrawer(false);
        }}
      />

      {/* ---------------------------------------------------------------------- */}
      {/* SEAT MAP + ZOOM */}
      {/* ---------------------------------------------------------------------- */}
      <div className="w-full flex flex-col items-center mt-10 relative">

        {/* ZOOM BUTTONS */}
        <div className="fixed right-10 top-1/2 z-50 flex flex-col gap-3">
          <button
            onClick={increaseZoom}
            className="h-12 w-12 rounded-full border flex items-center justify-center bg-white shadow text-black"
          >
            <Plus />
          </button>

          <button
            onClick={decreaseZoom}
            className="h-12 w-12 rounded-full border flex items-center justify-center bg-white shadow text-black"
          >
            <Minus />
          </button>
        </div>

        <div
          className="transition-all"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
        >
          {/* SEAT BLOCKS */}

          <div className="seat-box bg-gray-200">STAGE</div>

          <div
            className={`seat-box ${
              isActive("fanpit") ? "bg-pink-300" : "bg-gray-200"
            }`}
          >
            FANPIT ↑
          </div>

          <div
            className={`seat-box ${
              isActive("platinum") ? "bg-blue-300" : "bg-gray-200"
            }`}
          >
            PLATINUM ↑
          </div>

          <div
            className={`seat-box ${
              isActive("gold") ? "bg-yellow-300" : "bg-gray-200"
            }`}
          >
            GOLD ↑
          </div>

          <div
            className={`seat-box ${
              isActive("silver") ? "bg-green-300" : "bg-gray-200"
            }`}
          >
            SILVER ↑
          </div>

          {/* LOUNGE RIGHT SIDE */}
          <div
            className={`
              seat-box side-seat 
              ${isActive("lounge") ? "bg-purple-300" : "bg-gray-200"}
            `}
          >
            LOUNGE
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* PRICE FILTER BAR (BOTTOM) */}
      {/* ---------------------------------------------------------------------- */}
      <div className="fixed bottom-0 left-0 w-full border-t bg-white shadow-lg py-4 flex items-center justify-center gap-4">
        <span className="text-sm text-black flex items-center gap-1">Filter stands by</span>

        {priceFilters.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPrice(p)}
            className={`px-5 py-2 rounded-full border text-sm ${
              selectedPrice === p
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            ₹{p}
          </button>
        ))}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .seat-box {
          width: 380px;
          height: 70px;
          border-radius: 12px;
          margin: 12px auto;
          border: 1px solid #d4d4d4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          color: black;
        }

        .side-seat {
          position: absolute;
          right: -130px;
          top: 170px;
          width: 130px;
          height: 180px;
        }
      `}</style>
    </div>
  );
}
