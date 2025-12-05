"use client";

import React from "react";
import Link from "next/link";

const STORIES = [
  {
    id: 1,
    title: "Kantara: A Legend Chapter-1",
    subtitle: "UA16+ | Hindi",
    image: "/movies/kantara.jpg",
    slug: "kantara-legend-1",
  },
  {
    id: 2,
    title: "Laalo - Krishna Sada Sahaayate",
    subtitle: "UA13+ | Gujarati",
    image: "/movies/pLaalo.jpg",
    slug: "laalo-krishna",
  },
  {
    id: 3,
    title: "Ikk Kudi",
    subtitle: "UA7+ | Punjabi",
    image: "/movies/Ikkuddi.jpg",
    slug: "ikk-kudi",
  },
];

export default function RegionStories() {
  return (
    <section className="w-full px-6 pt-10 md:px-10 lg:px-16 lg:pt-16">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="text-[26px] md:text-[30px] lg:text-[36px] font-semibold">
          Stories Across Regions
        </h2>

        {/* MOBILE + TABLET */}
        <div
          className="
            mt-8
            grid grid-cols-2 gap-4
            md:grid-cols-2 md:gap-6
            lg:hidden
          "
        >
          {STORIES.map((item) => (
            <Link key={item.id} href={`/movie/${item.slug}`}>
              <div
                className="
                  rounded-[20px] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)]
                  overflow-hidden cursor-pointer
                "
              >
                <div className="h-[230px] sm:h-[260px] md:h-[300px] w-full">
                  <image
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-3 py-3">
                  <h3 className="text-[14px] sm:text-[15px] font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-zinc-600">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* DESKTOP - COMPACT EXACT LOOK */}
        <div className="mt-8 hidden lg:flex gap-6">
          {STORIES.map((item) => (
            <Link key={item.id} href={`/movie/${item.slug}`}>
              <div
                className="
                  w-[200px]
                  rounded-[20px]
                  bg-white
                  border border-zinc-100
                  shadow-[0_12px_28px_rgba(0,0,0,0.12)]
                  overflow-hidden
                  cursor-pointer
                  transition
                  hover:-translate-y-[3px]
                  hover:shadow-[0_20px_40px_rgba(0,0,0,0.20)]
                "
              >
                <div className="h-[280px] w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-4 py-3">
                  <h3 className="text-[14px] font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-zinc-600">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
