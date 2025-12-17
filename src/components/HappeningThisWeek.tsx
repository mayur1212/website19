"use client";

import React, { useRef } from "react";
import Image from "next/image";

type WeekEvent = {
  id: string;
  title: string;
  schedule: string;
  venue: string;
  price: string;
  image: string;
  offer?: string; // optional purple strip
};

const HAPPENING_EVENTS: WeekEvent[] = [
  {
    id: "golf-workshop",
    title: "Squad Goals: Golf Workshop with ZEN Golf Range & Academy",
    schedule: "Tue, 25 Nov – Sun, 30 Nov, 6:00 AM",
    venue: "ZEN GOLF Range & Academy, Gurugram",
    price: "₹1400 onwards",
    image: "/movies/happen1.jpg",
  },
  {
    id: "eod-adventure-park",
    title: "E-O-D Adventure Park",
    schedule: "Tue, 25 Nov – Sun, 30 Nov, 9:00 AM",
    venue: "E-O-D Adventure Park, Delhi/NCR",
    price: "₹399 onwards",
    image: "/movies/happen2.png",
    offer: "50% off up to ₹300",
  },
  {
    id: "peppy-cubs",
    title: "Peppy Cubs | Gurugram",
    schedule: "Daily, 9:00 AM onwards",
    venue: "Peppy Cubs, Gurugram",
    price: "₹550 onwards",
    image: "/movies/happen1.jpg",
  },
  {
    id: "boulderbox",
    title: "Boulderbox",
    schedule: "Daily, 9:00 AM onwards",
    venue: "BoulderBox – Climbing Centre, Delhi/NCR",
    price: "₹800",
    image: "/movies/happen2.png",
    offer: "20% off up to ₹150",
  },
];

export default function HappeningThisWeek() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="relative mx-auto w-[85%] px-8">

        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold leading-tight text-zinc-900">
          Happening this week
        </h2>

        <div className="relative">
          {/* Scroll row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
          >
            {HAPPENING_EVENTS.map((event) => (
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

                {/* Offer strip (optional) */}
                {event.offer && (
                  <div className="flex items-center gap-2 bg-[#7b2cff] px-4 py-2 text-xs font-medium text-white">
                    <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-white/15">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                      >
                        <path
                          d="M5 5h8l6 6-8 8-6-6V5z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle cx="9" cy="9" r="1" fill="currentColor" />
                      </svg>
                    </span>
                    <span>{event.offer}</span>
                  </div>
                )}

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
