"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import EventFilterModal from "./EventFilterModal";

/* ===================== QUICK FILTER TABS ===================== */

const QUICK_FILTERS = [
  "Today",
  "Tomorrow",
  "This Weekend",
  "Under 10 km",
  "Comedy",
  "Music",
];

/* ===================== TYPES ===================== */

export type Artist = {
  id: number;
  name: string;
  image: string;
  role: string;
  shortBio: string;
};

export type Event = {
  id: number;
  image: string;
  dateTime: string;
  title: string;
  location: string;
  price: number;
  category: string;
  distance: number;
  popularity: number;
  date: Date;
  artist?: Artist;
};

type EventCardProps = {
  quickFilter: string | null;
  modalFilters: string[];
  onQuickSelect: (chip: string | null) => void;
  onModalApply: (filters: string[]) => void;
};

/* ===================== EVENTS DATA ===================== */

export const EVENTS: Event[] = [
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
    artist: {
      id: 1,
      name: "A. R. Rahman",
      image: "/movies/a1.jpg",
      role: "Music Composer",
      shortBio:
        "Legendary Indian composer known globally for soulful melodies and iconic film scores.",
    },
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
    artist: {
      id: 3,
      name: "Zakir Khan",
      image: "/movies/a3.jpg",
      role: "Stand-up Comedian",
      shortBio:
        "One of India’s most loved stand-up comedians, known for relatable storytelling and humor.",
    },
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
    artist: {
      id: 2,
      name: "Sunidhi Chauhan",
      image: "/movies/a2.jpg",
      role: "Playback Singer",
      shortBio:
        "Powerhouse Bollywood singer and live performer known for high-energy vocals.",
    },
  },
];

/* ===================== FILTER LOGIC ===================== */

function filterByQuick(event: Event, quick: string | null) {
  if (!quick) return true;
  if (quick === "Comedy") return event.category === "Comedy";
  if (quick === "Music") return event.category === "Music";
  if (quick === "Under 10 km") return event.distance <= 10;
  return true;
}

function applyModalFilters(events: Event[], modalFilters: string[]) {
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
    out.sort((a, b) => a.date.getTime() - b.date.getTime());

  return out;
}

/* ===================== COMPONENT ===================== */

export default function EventCard({
  quickFilter,
  modalFilters,
  onQuickSelect,
  onModalApply,
}: EventCardProps) {
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const orderedFilters = useMemo(() => {
    if (!quickFilter) return QUICK_FILTERS;
    return [quickFilter, ...QUICK_FILTERS.filter((f) => f !== quickFilter)];
  }, [quickFilter]);

  let filtered = EVENTS.filter((event) =>
    filterByQuick(event, quickFilter)
  );
  filtered = applyModalFilters(filtered, modalFilters);

  const toggleModalFilter = (filter: string) => {
    if (modalFilters.includes(filter)) {
      onModalApply(modalFilters.filter((f) => f !== filter));
    } else {
      onModalApply([...modalFilters, filter]);
    }
  };

  return (
    <>
      {/* ================= FILTER BAR ================= */}
      {/* ================= FILTER BAR ================= */}
{/* ================= FILTER BAR ================= */}
<div
  className="
    w-full
    sticky
    top-[128px] md:top-[72px]
    z-40
    bg-white
    border-b border-zinc-200
  "
>
  <div className="w-[90%] md:w-[80%] mx-auto pt-4 pb-3">
    <h2 className="text-2xl font-semibold text-black mb-4">
      All events
    </h2>

    {/* ✅ MOBILE HORIZONTAL SCROLL */}
    <div className="flex gap-3 items-center overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      {/* Filters button */}
      <button
        onClick={() => setOpenFilterModal(true)}
        className="flex items-center gap-2 px-4 py-2 border border-purple-400 bg-purple-50 text-purple-700 rounded-lg font-medium shrink-0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>
        Filters
      </button>

      {modalFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => toggleModalFilter(filter)}
          className="px-4 py-2 rounded-lg text-sm bg-purple-100 border border-purple-400 text-purple-700 shrink-0"
        >
          {filter}
        </button>
      ))}

      {orderedFilters.map((chip) => (
        <button
          key={chip}
          onClick={() =>
            onQuickSelect(quickFilter === chip ? null : chip)
          }
          className={`px-4 py-2 rounded-lg text-sm border transition shrink-0
            ${
              quickFilter === chip
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
        >
          {chip}
        </button>
      ))}
    </div>
  </div>
</div>



      {/* ================= EVENTS GRID ================= */}
      <section className="w-full pb-16">
        <div className="w-[90%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {filtered.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="bg-white rounded-2xl shadow hover:scale-[1.02] transition overflow-hidden"
            >
              {/* ✅ ROUNDED TOP IMAGE */}
              <div className="relative w-full h-[260px] rounded-t-2xl overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="px-4 py-4 text-black">
                <p className="text-xs">{event.dateTime}</p>
                <h3 className="text-sm font-semibold mt-1">
                  {event.title}
                </h3>
                <p className="text-xs">{event.location}</p>
                <p className="text-sm font-semibold mt-1">
                  ₹{event.price} onwards
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FILTER MODAL ================= */}
      <EventFilterModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        selectedFilters={modalFilters}
        onApply={(filters) => {
          onModalApply(filters);
          setOpenFilterModal(false);
        }}
      />
    </>
  );
}
