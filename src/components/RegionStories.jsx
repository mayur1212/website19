"use client";

import React from "react";

const STORIES = [
  {
    id: 1,
    title: "Ikk Kudi",
    subtitle: "UA7+ | Punjabi",
    image: "/movies/kantara.jpg",
  },
  {
    id: 2,
    title: "Kantara: A Legend Chapter-1",
    subtitle: "UA16+ | Hindi",
    image: "/movies/kantara.jpg",
  },
  {
    id: 3,
    title: "Laalo - Krishna Sada Sahaayate",
    subtitle: "UA13+ | Gujarati",
    image: "/movies/kantara.jpg",
  },
];

export default function RegionStories() {
  return (
    <section className="w-full px-6 pt-10 md:px-10 lg:px-16 lg:pt-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-[26px] md:text-[30px] lg:text-[36px] font-semibold">
          Stories Across Regions
        </h2>

        {/* ================= MOBILE + TABLET (2 cards per row, bigger UI) ================= */}
        <div
          className="
            mt-8
            grid grid-cols-2 gap-4
            md:grid-cols-2 md:gap-6
            lg:hidden
          "
        >
          {STORIES.map((item) => (
            <div
              key={item.id}
              className="
                rounded-[20px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)]
                overflow-hidden cursor-pointer
              "
            >
              {/* Poster */}
              

                <div className="h-[230px] sm:h-[260px] md:h-[300px] w-full">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="px-3 py-3">
                <h3 className="text-[14px] sm:text-[15px] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-[12px] text-zinc-600">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= DESKTOP VIEW (UNCHANGED) ================= */}
        <div className="mt-10 hidden lg:flex gap-8">
          {STORIES.map((item) => (
            <div
              key={item.id}
              className="w-[230px] rounded-[26px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] overflow-hidden cursor-pointer transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,0,0.18)]"
            >
              {/* Poster */}
              <div className="h-[320px] w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="px-5 py-4">
                <h3 className="text-[16px] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] text-zinc-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
