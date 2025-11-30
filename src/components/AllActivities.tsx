"use client";

import React from "react";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, Tag } from "lucide-react";

type Activity = {
  id: number;
  title: string;
  image: string;
  discountText: string;
  dateInfo: string;
  venue: string;
  location: string;
  price: string;
};

const FILTER_CHIPS = [
  "Under 5 km",
  "Bowling",
  "Today",
  "Tomorrow",
  "This Weekend",
  "Art & Craft Workshops",
  "Workshops",
];

const ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "F9 Go Karting | Sector 18",
    image: "/activities/f9-karting.jpg",
    discountText: "20% off up to ₹150",
    dateInfo: "Thu, 27 Nov – Sun, 14 Dec, Multiple slots",
    venue: "F9 Go Karting, Gurugram",
    location: "Sector 18",
    price: "₹750 onwards",
  },
  {
    id: 2,
    title: "Sky Jumper Trampoline Park | ILD Gurugram",
    image: "/activities/skyjumper.jpg",
    discountText: "50% off up to ₹300",
    dateInfo: "Daily, Multiple slots",
    venue: "SkyJumper Trampoline Park – Gurgaon, ILD…",
    location: "Gurugram",
    price: "₹490 onwards",
  },
  {
    id: 3,
    title: "ISKATE by Roseate",
    image: "/activities/iskate.jpg",
    discountText: "50% off up to ₹300",
    dateInfo: "Daily, Multiple slots",
    venue: "ISKATE by Roseate, Gurugram",
    location: "Gurugram",
    price: "₹900 onwards",
  },
  {
    id: 4,
    title: "The Game Palacio | Delhi Ansal Plaza",
    image: "/activities/game-palacio.jpg",
    discountText: "50% off up to ₹300",
    dateInfo: "Daily, Multiple slots",
    venue: "The Game Palacio, Delhi/NCR",
    location: "Delhi/NCR",
    price: "₹650 onwards",
  },
  // अजून कार्ड्स हवे असतील तर इथे add करू शकतोस
];

export default function AllActivities() {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-6 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
          All Activities
        </h2>

        {/* Filters row */}
        <div
          className="
            mt-6 mb-8 flex items-center gap-3
            overflow-x-auto whitespace-nowrap no-scrollbar
            lg:flex-wrap lg:overflow-visible lg:whitespace-normal
          "
        >
          {/* Filters pill */}
          <button className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Other chips */}
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-400"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div
          className="
            grid gap-6
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4 lg:gap-8
          "
        >
          {ACTIVITIES.map((activity) => (
            <article
              key={activity.id}
              className="
                flex flex-col overflow-hidden
                rounded-[26px] bg-white
                shadow-[0_18px_40px_rgba(0,0,0,0.12)]
                cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,0,0.18)]
              "
            >
              {/* Poster */}
              <div className="relative h-[320px] w-full">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Discount strip */}
              <div className="flex items-center gap-2 bg-[#7047ff] px-4 py-2 text-xs font-semibold text-white">
                <Tag className="h-3.5 w-3.5" />
                <span>{activity.discountText}</span>
              </div>

              {/* Text content */}
              <div className="px-4 py-4">
                <p className="text-[11px] font-medium text-zinc-500">
                  {activity.dateInfo}
                </p>

                <h3 className="mt-1 text-[15px] font-semibold leading-snug text-zinc-900 line-clamp-2">
                  {activity.title}
                </h3>

                <p className="mt-1 text-[12px] text-zinc-500 line-clamp-2">
                  {activity.venue}
                </p>

                <p className="mt-2 text-[13px] font-semibold text-zinc-900">
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
