"use client";

import React, { useRef } from "react";
import Image from "next/image";

type EventCard = {
  id: string;
  title: string;
  dateTime: string;
  venue: string;
  price: string;
  image: string;
};

const EVENTS: EventCard[] = [
  {
    id: "masoom-sharma",
    title: "BAN Kafila | Masoom Sharma",
    dateTime: "Sat, 06 Dec, 4:00 PM",
    venue: "Dockyard Sports Club, Gurugram",
    price: "₹999 onwards",
    image: "/movies/i1.png",
  },
  {
    id: "one-night-in-tokio",
    title: "One Night in Toki-O",
    dateTime: "Fri, 28 Nov, 5:00 PM",
    venue: "One Horizon Center, Gurugram",
    price: "₹1999 onwards",
    image: "/movies/i2.jpg",
  },
  {
    id: "ar-rahman",
    title: "A.R. Rahman - Harmony of Hearts | New Delhi",
    dateTime: "Sat, 20 Dec, 7:00 PM",
    venue: "Indira Gandhi Indoor Stadium, Delhi/NCR",
    price: "₹999 onwards",
    image: "/movies/i3.jpg",
  },
  {
    id: "ind-vs-sa",
    title: "IDFC First Bank Series 3rd T20I: India vs South Africa",
    dateTime: "Sun, 14 Dec, 7:00 PM",
    venue: "Himachal Pradesh Cricket Association...",
    price: "₹7000 onwards",
    image: "/movies/i4.jpg",
  },
];

export default function IndiasTopEvents() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="relative mx-auto w-full max-w-6xl px-8">
        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold leading-tight text-zinc-900">
          India&apos;s Top Events
        </h2>
    

       {/* Left arrow */}
<button
  type="button"
  onClick={scrollLeft}
  className="absolute left-0 top-[55%] z-20 hidden md:flex 
             -translate-y-1/2 items-center justify-center
             bg-transparent shadow-none ring-0"
>
  <span className="text-xl font-bold text-black">&lt;</span>
</button>

{/* Right arrow */}
<button
  type="button"
  onClick={scrollRight}
  className="absolute right-0 top-[55%] z-20 hidden md:flex 
             -translate-y-1/2 items-center justify-center
             bg-transparent shadow-none ring-0"
>
  <span className="text-xl font-bold text-black">&gt;</span>
</button>


        {/* Cards row */}
        <div
  ref={scrollRef}
  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
>


          {EVENTS.map((event) => (
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
                  {event.dateTime}
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
        </div>
      </div>
    </section>
  );
}
