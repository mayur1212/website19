"use client";

import React, { useRef } from "react";
import Image from "next/image";

type Activity = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  offer: string;
  schedule: string;
  image: string;
};

const ACTIVITIES: Activity[] = [
  {
    id: "game-palacio",
    title: "The Game Palacio | Delhi Ansal Plaza",
    subtitle: "The Game Palacio, Delhi/NCR",
    location: "The Game Palacio, Delhi/NCR",
    price: "₹650 onwards",
    offer: "50% off up to ₹300",
    schedule: "Tue, 25 Nov – Sun, 30 Nov, Multiple slots",
    image: "/movies/c1.jpg",
  },
  {
    id: "f9-gokarting",
    title: "F9 Go Karting | Sector 18",
    subtitle: "F9 Go Karting, Gurugram",
    location: "F9 Go Karting, Gurugram",
    price: "₹750 onwards",
    offer: "50% off up to ₹300",
    schedule: "Tue, 25 Nov – Sun, 14 Dec, Multiple slots",
    image: "/movies/c2.png",
  },
  {
    id: "chokhi-dhani",
    title: "Chokhi Dhani | Sonipat",
    subtitle: "Chokhi Dhani Sonipat, Haryana",
    location: "Chokhi Dhani Sonipat, Haryana",
    price: "₹700 onwards",
    offer: "20% off up to ₹150",
    schedule: "Daily, 6:00 PM onwards",
    image: "/movies/c3.jpg",
  },
  {
    id: "iskate",
    title: "ISKATE by Roseate",
    subtitle: "ISKATE by Roseate, Gurugram",
    location: "ISKATE by Roseate, Gurugram",
    price: "₹900 onwards",
    offer: "50% off up to ₹300",
    schedule: "Daily, Multiple slots",
    image: "/movies/c4.png",
  },
];


export default function CrowdFavouriteActivities() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-full max-w-6xl px-8 relative">

        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold leading-tight text-zinc-900">
          Crowd Favourite Activities
        </h2>

        {/* LEFT ARROW */}
<button
  onClick={scrollLeft}
  className="
    absolute left-0 top-[55%] z-20 hidden md:flex
    -translate-y-1/2 items-center justify-center
    bg-transparent shadow-none rounded-none
    hover:scale-125 transition-transform duration-200
  "
>
  <span className="text-3xl font-light text-black">&lsaquo;</span>
</button>

{/* RIGHT ARROW */}
<button
  onClick={scrollRight}
  className="
    absolute right-0 top-[55%] z-20 hidden md:flex
    -translate-y-1/2 items-center justify-center
    bg-transparent shadow-none rounded-none
    hover:scale-125 transition-transform duration-200
  "
>
  <span className="text-3xl font-light text-black">&rsaquo;</span>
</button>


        {/* Cards Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
        >
          {ACTIVITIES.map((activity) => (
            <article
              key={activity.id}
              className="flex w-[290px] flex-shrink-0 flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
            >
              {/* Image */}
              <div className="relative h-[360px] w-full">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Offer strip */}
              <div className="flex items-center gap-2 bg-[#7b2cff] px-4 py-2 text-xs font-medium text-white">
                <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-white/15">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                    <path
                      d="M5 5h8l6 6-8 8-6-6V5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="9" cy="9" r="1" fill="currentColor" />
                  </svg>
                </span>
                <span>{activity.offer}</span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col rounded-b-[24px] bg-white px-4 pb-4 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8F8E21]">
                  {activity.schedule}
                </p>

                <h3 className="mt-1 text-sm font-semibold leading-snug text-zinc-900">
                  {activity.title}
                </h3>

                <p className="mt-1 text-xs text-zinc-500">{activity.subtitle}</p>

                <p className="mt-1 text-xs font-medium text-zinc-700">
                  {activity.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
