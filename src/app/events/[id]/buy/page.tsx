"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

import Logo from "@/assets/logored.png";
import { EVENTS } from "@/components/EventCard";
import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";

export default function BuyTicketsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const eventId = Number(id);
  const event = EVENTS.find((e) => e.id === eventId);

  if (!event)
    return (
      <div className="p-10 text-center text-xl text-black">
        Event not found
      </div>
    );

  /* ---------------- LOGIN ---------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("logged_in") === "true")
      setIsLoggedIn(true);
  }, []);

  /* ---------------- PRICE FILTER ---------------- */
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

  /* ---------------- ZOOM ---------------- */
  const [zoom, setZoom] = useState(1);

  return (
    <div className="min-h-screen bg-white text-black pb-28 md:pb-0">
      {/* ================= HEADER ================= */}
      <header className="w-full border-b bg-white shadow-sm px-4 md:px-6 py-2 flex items-center justify-between">
        <Image
          src={Logo}
          alt="Hayya"
          width={100}
          height={36}
          className="cursor-pointer rounded-2xl"
          onClick={() => (window.location.href = "/")}
        />

        <div className="text-center flex flex-col leading-tight max-w-[180px] md:max-w-[350px]">
          <h2 className="text-sm md:text-base font-semibold truncate">
            {event.title}
          </h2>
          <p className="text-[11px] md:text-xs text-gray-600">
            {event.dateTime} • {event.location}
          </p>
        </div>

        <button
          onClick={() =>
            isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
          }
          className="h-9 w-9 rounded-full bg-black text-white text-sm font-semibold"
        >
          U
        </button>
      </header>

      <ProfileLoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />

      <ProfileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onLoggedOut={() => setIsLoggedIn(false)}
      />

      {/* ================= SEAT MAP ================= */}
      <div className="w-full flex justify-center mt-6 md:mt-10 relative">
        {/* ZOOM (mobile bottom-right, desktop center-right) */}
        <div className="fixed md:absolute bottom-24 right-4 md:right-10 md:top-1/2 z-50 flex flex-col gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 1.6))}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow border flex items-center justify-center"
          >
            <Plus />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.6))}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow border flex items-center justify-center"
          >
            <Minus />
          </button>
        </div>

        <div
          className="transition-transform"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="seat-box bg-gray-200">STAGE</div>

          <div className={`seat-box ${isActive("fanpit") ? "bg-pink-300" : "bg-gray-200"}`}>
            FANPIT ↑
          </div>

          <div className={`seat-box ${isActive("platinum") ? "bg-blue-300" : "bg-gray-200"}`}>
            PLATINUM ↑
          </div>

          <div className={`seat-box ${isActive("gold") ? "bg-yellow-300" : "bg-gray-200"}`}>
            GOLD ↑
          </div>

          <div className={`seat-box ${isActive("silver") ? "bg-green-300" : "bg-gray-200"}`}>
            SILVER ↑
          </div>

          {/* LOUNGE — inline on mobile, side on desktop */}
          <div
            className={`seat-box md:side-seat ${
              isActive("lounge") ? "bg-purple-300" : "bg-gray-200"
            }`}
          >
            LOUNGE
          </div>
        </div>
      </div>

      {/* ================= BOTTOM PRICE BAR ================= */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg px-3 py-3">
        <div className="flex md:justify-center gap-2 overflow-x-auto no-scrollbar">
          {priceFilters.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPrice(p)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedPrice === p
                  ? "bg-black text-white"
                  : "border text-black"
              }`}
            >
              ₹{p}
            </button>
          ))}
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .seat-box {
          width: 90vw;
          max-width: 380px;
          height: 64px;
          border-radius: 12px;
          margin: 10px auto;
          border: 1px solid #d4d4d4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 600;
        }

        .side-seat {
          position: absolute;
          right: -140px;
          top: 160px;
          width: 140px;
          height: 180px;
        }
      `}</style>
    </div>
  );
}
