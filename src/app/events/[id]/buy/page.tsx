"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { EVENTS } from "@/components/EventCard";
import Header from "@/components/Header";
import SlimHeader from "@/components/SlimHeader";

export default function BuyTicketsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = React.use(params);
  const eventId = Number(id);
  const event = EVENTS.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="p-10 text-center text-xl text-black">
        Event not found
      </div>
    );
  }

  /* ---------------- PRICE FILTER ---------------- */
  const priceFilters = ["3500", "4500", "7000", "10000", "15000"];
  const [selectedPrice, setSelectedPrice] = useState("15000");

  const sectionColors: Record<string, string[]> = {
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

  /* ---------------- NAVIGATION ---------------- */
  const goToSection = (section: string) => {
    router.push(`/events/${event.id}/buy/${section}`);
  };

  return (
    <div className="min-h-screen bg-white text-black pb-28 md:pb-0">

      {/* ================= MOBILE HEADER (FIXED) ================= */}
      <div className="md:hidden sticky top-0 z-50">
        <SlimHeader
          title={event.title}
          subtitle={`${event.dateTime} • ${event.location}`}
        />
      </div>

      {/* ================= DESKTOP HEADER (UNCHANGED) ================= */}
      <div className="hidden md:block">
        <Header
          centerContent={
            <>
              <h1 className="text-[15px] font-semibold text-black truncate max-w-[420px]">
                {event.title}
              </h1>
              <p className="text-[12px] text-zinc-500">
                {event.dateTime} • {event.location}
              </p>
            </>
          }
        />
      </div>

      {/* ================= SEAT MAP ================= */}
      <div className="w-full flex justify-center mt-6 md:mt-10 relative">

        {/* ZOOM CONTROLS */}
        <div className="fixed md:absolute bottom-24 right-4 md:right-10 md:top-1/2 z-30 flex flex-col gap-2">

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

        {/* SEAT LAYOUT */}
        <div
          className="transition-transform"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="seat-box bg-gray-200">STAGE</div>

          <button
            onClick={() => goToSection("fanpit")}
            className={`seat-box cursor-pointer ${
              isActive("fanpit") ? "bg-pink-300" : "bg-gray-200"
            }`}
          >
            FANPIT ↑
          </button>

          <button
            onClick={() => goToSection("platinum")}
            className={`seat-box cursor-pointer ${
              isActive("platinum") ? "bg-blue-300" : "bg-gray-200"
            }`}
          >
            PLATINUM ↑
          </button>

          <button
            onClick={() => goToSection("gold")}
            className={`seat-box cursor-pointer ${
              isActive("gold") ? "bg-yellow-300" : "bg-gray-200"
            }`}
          >
            GOLD ↑
          </button>

          <button
            onClick={() => goToSection("silver")}
            className={`seat-box cursor-pointer ${
              isActive("silver") ? "bg-green-300" : "bg-gray-200"
            }`}
          >
            SILVER ↑
          </button>

          <button
            onClick={() => goToSection("lounge")}
            className={`seat-box md:side-seat cursor-pointer ${
              isActive("lounge") ? "bg-purple-300" : "bg-gray-200"
            }`}
          >
            LOUNGE
          </button>
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
