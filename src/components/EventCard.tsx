"use client";

import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import React, { useState } from "react";
import EventFilterModal from "./EventFilterModal";

const FILTER_CHIPS = [
  "Today",
  "Tomorrow",
  "This Weekend",
  "Under 10 km",
  "Comedy",
  "Music",
];

export const EVENTS = [
  {
    id: 1,
    image: "/movies/event2.jpg",
    dateTime: "Sat, 06 Dec – Sun, 07 Dec, 1:00 PM",
    title: "The Grub Fest Delhi 2025",
    location: "Jawaharlal Nehru Stadium, New Delhi",
    price: 799,
    category: "Food",
    distance: 12,
    popularity: 88,
    date: new Date("2025-12-06"),
  },
  {
    id: 2,
    image: "/movies/event2.jpg",
    dateTime: "Sun, 11 Jan, 5:00 PM",
    title: "Standup Comedy Night",
    location: "Dirty Good, Delhi/NCR",
    price: 749,
    category: "Comedy",
    distance: 8,
    popularity: 94,
    date: new Date("2025-01-11"),
  },
  {
    id: 3,
    image: "/movies/event2.jpg",
    dateTime: "Sat, 29 Nov, 5:00 PM",
    title: "Local Train – India Tour",
    location: "Leisure Valley Park, Gurugram",
    price: 5000,
    category: "Music",
    distance: 6,
    popularity: 98,
    date: new Date("2025-11-29"),
  },
];

function filterByQuick(event: any, quick: string | null) {
  if (!quick) return true;
  if (quick === "Comedy") return event.category === "Comedy";
  if (quick === "Music") return event.category === "Music";
  if (quick === "Under 10 km") return event.distance <= 10;
  return true;
}

function applyModalFilters(events: any[], modalFilters: string[]) {
  let out = [...events];

  if (modalFilters.includes("Popularity"))
    out.sort((a, b) => b.popularity - a.popularity);

  if (modalFilters.includes("Price Low to High"))
    out.sort((a, b) => a.price - b.price);

  if (modalFilters.includes("Price High to Low"))
    out.sort((a, b) => b.price - a.price);

  if (modalFilters.includes("Near to Far"))
    out.sort((a, b) => a.distance - b.distance);

  if (modalFilters.includes("Date"))
    out.sort((a, b) => a.date - b.date);

  return out;
}

export default function EventCardPage() {
  const [quickFilter, setQuickFilter] = useState<string | null>(null);
  const [modalFilters, setModalFilters] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const removeFilter = (f: string) => {
    setModalFilters((prev) => prev.filter((p) => p !== f));
  };

  let filtered = EVENTS.filter((event) => filterByQuick(event, quickFilter));
  filtered = applyModalFilters(filtered, modalFilters);

  return (
    <>
      <EventFilterModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedFilters={modalFilters}
        onApply={setModalFilters}
      />

      <section className="w-full py-10">
        <div className="w-[80%] mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-black">All events</h2>

          {/* ⭐ CHIP BAR */}
          <div className="mb-8 flex items-center gap-3 overflow-x-auto no-scrollbar">

            {/* FILTER BUTTON */}
            <button
              onClick={() => setOpenModal(true)}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* ⭐ SELECTED FILTERS COME FIRST */}
            {/* SELECTED FILTER CHIPS — DISTRICT STYLE */}
{modalFilters.map((f) => (
  <button
    key={f}
    onClick={() => {
      // toggle this filter OFF when clicked again
      setModalFilters((prev) =>
        prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
      );
    }}
    className="rounded-md px-4 py-2 text-sm bg-red-100 text-black border border-red-500"
  >
    {f}
  </button>
))}

            {/* QUICK FILTER CHIPS */}
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setQuickFilter(chip)}
                className={`rounded-md px-4 py-2 text-sm border ${
                  quickFilter === chip
                    ? "bg-red-100 text-black border-red-500"
                    : "bg-white text-zinc-800 border-zinc-200"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* EVENT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {filtered.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-white rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <div className="relative w-full h-[260px]">
                  <Image src={event.image} alt={event.title} fill className="object-cover" />
                </div>

                <div className="px-4 py-4 text-black">
                  <p className="text-xs text-black">{event.dateTime}</p>
                  <h3 className="text-sm font-semibold mt-1 text-black">{event.title}</h3>
                  <p className="text-xs text-black">{event.location}</p>
                  <p className="text-sm font-semibold mt-1 text-black">₹{event.price} onwards</p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-zinc-500 mt-10">
              No events found for selected filters.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
