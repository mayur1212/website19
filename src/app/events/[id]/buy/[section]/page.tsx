"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { EVENTS } from "@/components/EventCard";
import Header from "@/components/Header";
import SlimHeader from "@/components/SlimHeader";
import { useBookingTimer } from "@/hooks/useBookingTimer";

const PRICE_MAP: Record<string, number> = {
  platinum: 7000,
  gold: 4500,
  fanpit: 4500,
  silver: 3500,
  lounge: 15000,
};

export default function TicketQuantityPage({
  params,
}: {
  params: Promise<{ id: string; section: string }>;
}) {
  const { id, section } = React.use(params);
  const router = useRouter();

  const timeLeft = useBookingTimer();

  const eventId = Number(id);
  const event = EVENTS.find((e) => e.id === eventId);
  const price = PRICE_MAP[section];

  if (!event || !price) {
    return <div className="p-10 text-center">Invalid ticket</div>;
  }

  /* ---------------- QTY ---------------- */
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    const cartItem = {
      eventId: event.id,
      eventTitle: event.title,
      location: event.location,
      dateTime: event.dateTime,
      section: section.toUpperCase(),
      qty,
      price,
    };

    localStorage.setItem("cart", JSON.stringify(cartItem));
    router.push("/events/buy/checkout");
  };

  return (
    <div className="min-h-screen bg-white text-black pb-28">

      {/* ================= MOBILE SLIM HEADER ================= */}
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

      {/* ================= TIMER BAR ================= */}
      <div className="bg-purple-50 text-purple-700 text-sm py-2 text-center">
        ⏱ Complete your booking in{" "}
        <span className="font-semibold">
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </span>{" "}
        mins
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2">
          Phase 2 - {section.toUpperCase()}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Choose number of tickets
        </p>

        <div className="border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Ticket Price</p>
            <p className="text-2xl font-semibold">₹{price}</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-10 w-10 rounded-3xl bg-black flex items-center justify-center hover:bg-gray-900 transition active:scale-95"
            >
              <Minus className="text-white w-5 h-5" />
            </button>

            <span className="text-lg font-semibold">{qty}</span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-10 w-10 rounded-3xl bg-black flex items-center justify-center hover:bg-gray-900 transition active:scale-95"
            >
              <Plus className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= FOOTER BAR ================= */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Total Amount</p>
          <p className="text-lg font-semibold">₹{price * qty}</p>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
