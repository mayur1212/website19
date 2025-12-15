"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  onOpenModal: () => void;
  onQuickSelect: (chip: string) => void;
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
      shortBio: "Oscar-winning composer and global music icon.",
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
      shortBio: "Powerhouse Bollywood singer and live performer.",
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
}: EventCardProps) {
  let filtered = EVENTS.filter((event) =>
    filterByQuick(event, quickFilter)
  );
  filtered = applyModalFilters(filtered, modalFilters);

  return (
    <section className="w-full py-10">
      <div className="w-[80%] mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          All events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {filtered.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="bg-white rounded-2xl shadow hover:scale-[1.02] transition"
            >
              <div className="relative w-full h-[260px]">
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
      </div>
    </section>
  );
}
