"use client";

import React, { useRef } from "react";
import Image from "next/image";

type ComedyShow = {
  id: string;
  title: string;
  schedule: string;
  venue: string;
  price: string;
  image: string;
};

const SHOWS: ComedyShow[] = [
  {
    id: "noida-comedy-show",
    title: "Noida Comedy Show | Sec-18",
    schedule: "Tue, 25 Nov – Fri, 5 Dec, Multiple slots",
    venue: "Comedy Club Sector 18 Noida, Noida",
    price: "₹299 onwards",
    image: "/movies/bc1.png",
  },
  {
    id: "late-night-comedy",
    title: "The Late Night Comedy Show",
    schedule: "Tue, 25 Nov – Sun, 30 Nov, Multiple slots",
    venue: "Guftagu Cafe, Gurugram",
    price: "₹299",
    image: "/movies/bc2.jpg",
  },
  {
    id: "chhoti-soch",
    title: "Chhoti Soch – Standup Comedy Show by Shubham Pujari",
    schedule: "Sat, 29 Nov, 7:00 PM",
    venue: "Comedy County by HITCHIN, Noida",
    price: "₹399 onwards",
    image: "/movies/bc3.png",
  },
  {
    id: "lalkar",
    title: "Lalkaar – A Literature & Laughter Show",
    schedule: "Fri, 19 Dec, 7:00 PM",
    venue: "Aiwan-e-Ghalib Auditorium, Delhi/NCR",
    price: "₹349 onwards",
    image: "/movies/bc4.jpg",
  },
];

export default function BestInComedy() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="relative mx-auto w-full max-w-6xl px-8">
        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold leading-tight text-zinc-900">
          Best in Comedy
        </h2>

        <div className="relative">
          {/* Cards row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
          >
            {SHOWS.map((show) => (
              <article
                key={show.id}
                className="flex w-[290px] flex-shrink-0 flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
              >
                {/* Poster */}
                <div className="relative h-[360px] w-full">
                  <Image
                    src={show.image}
                    alt={show.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col rounded-b-[24px] bg-white px-4 pb-4 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#b89c3c]">
                    {show.schedule}
                  </p>

                  <h3 className="mt-1 text-sm font-semibold leading-snug text-zinc-900">
                    {show.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">{show.venue}</p>

                  <p className="mt-1 text-xs font-medium text-zinc-800">
                    {show.price}
                  </p>
                </div>
              </article>
            ))}

            {/* extra spacer so last card isn’t hidden behind arrow */}
            <div className="w-16 flex-shrink-0" />
          </div>

          {/* Right arrow like screenshot */}
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
