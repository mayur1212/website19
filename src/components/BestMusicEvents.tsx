"use client";

import React, { useRef } from "react";
import Image from "next/image";

type MusicEvent = {
  id: string;
  title: string;
  schedule: string;
  venue: string;
  price: string;
  image: string;
};

const MUSIC_EVENTS: MusicEvent[] = [
  {
    id: "ar-rahman-harmony",
    title: "A.R. Rahman - Harmony of Hearts | New Delhi",
    schedule: "Sat, 20 Dec, 7:00 PM",
    venue: "Indira Gandhi Indoor Stadium, Delhi/NCR",
    price: "₹999 onwards",
    image: "/movies/Discover1.jpg",
  },
  {
    id: "do-bhai-india-tour",
    title: "Do Bhai India Tour | Delhi Showcase",
    schedule: "Sun, 11 Jan, 5:00 PM",
    venue: "Dirty Good, Delhi/NCR",
    price: "₹499 onwards",
    image: "/movies/Discover2.jpg",
  },
  {
    id: "grub-fest-delhi-2025",
    title: "The Grub Fest Delhi 2025",
    schedule: "Sat, 06 Dec – Sun, 07 Dec, 1:00 PM",
    venue: "Gate No 14, Jawaharlal Nehru Stadium,…",
    price: "₹799 onwards",
    image: "/movies/Discover3.jpg",
  },
  {
    id: "mahaul",
    title: "Mahaul",
    schedule: "Tue, 30 Dec, 9:00 PM",
    venue: "Dynamo, Goa",
    price: "₹3500 onwards",
    image: "/movies/Discover1.jpg",
  },
];

export default function BestMusicEvents() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="relative mx-auto w-[85%] px-8">

        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold leading-tight text-zinc-900">
          Discover the best of Music Events
        </h2>

        <div className="relative">
          {/* Cards row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
          >
            {MUSIC_EVENTS.map((event) => (
              <article
                key={event.id}
                className="flex w-[290px] flex-shrink-0 flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
              >
                {/* Poster */}
                <div className="relative h-[360px] w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col rounded-b-[24px] bg-white px-4 pb-4 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#b89c3c]">
                    {event.schedule}
                  </p>

                  <h3 className="mt-1 text-sm font-semibold leading-snug text-zinc-900">
                    {event.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">{event.venue}</p>

                  <p className="mt-1 text-xs font-medium text-zinc-800">
                    {event.price}
                  </p>
                </div>
              </article>
            ))}

            {/* spacer so last card isn't under arrow */}
            <div className="w-16 flex-shrink-0" />
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 hover:bg-zinc-100"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
