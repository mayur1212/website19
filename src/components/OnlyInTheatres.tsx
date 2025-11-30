"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react"; // 👈 NEW

const MOVIES = [
  {
    id: 1,
    title: "De De Pyaar De 2",
    cert: "UA13+",
    language: "Hindi",
    image: "/movies/de-de-pyaar-de-2.jpg",
    tags: ["New Releases"],
  },
  {
    id: 2,
    title: "Tere Ishk Mein",
    cert: "UA16+",
    language: "Hindi",
    image: "/movies/tere-ishk-mein.jpg",
    tags: ["New Releases"],
  },
  {
    id: 3,
    title: "Mastiii 4",
    cert: "A",
    language: "Hindi",
    image: "/movies/mastiii4.jpg",
    tags: ["New Releases", "3D"],
  },
  {
    id: 4,
    title: "120 Bahadur",
    cert: "UA13+",
    language: "Hindi",
    image: "/movies/120-bahadur.jpg",
    tags: ["New Releases"],
  },
  {
    id: 5,
    title: "Haq",
    cert: "UA13+",
    language: "Hindi",
    image: "/movies/haq.jpg",
    tags: ["Re-Releases"],
  },
  {
    id: 6,
    title: "Thamma",
    cert: "UA16+",
    language: "Hindi",
    image: "/movies/thamma.jpg",
    tags: ["New Releases"],
  },
  {
    id: 7,
    title: "Skyfall",
    cert: "UA13+",
    language: "English",
    image: "/movies/skyfall.jpg",
    tags: ["Re-Releases"],
  },
  {
    id: 8,
    title: "Avatar: The Way of Water",
    cert: "UA13+",
    language: "English",
    image: "/movies/avatar-2.jpg",
    tags: ["3D", "4DX-2D"],
  },
  {
    id: 9,
    title: "Pushpa 2",
    cert: "UA16+",
    language: "Hindi",
    image: "/movies/pushpa-2.jpg",
    tags: ["New Releases"],
  },
  {
    id: 10,
    title: "Spider-Man: No Way Home",
    cert: "UA13+",
    language: "English",
    image: "/movies/spiderman-nwh.jpg",
    tags: ["Re-Releases", "3D"],
  },
  {
    id: 11,
    title: "Spider-Man: No Way Home",
    cert: "UA13+",
    language: "English",
    image: "/movies/spiderman-nwh.jpg",
    tags: ["Re-Releases", "3D"],
  },
];

const LANGUAGE_FILTERS = ["All", "English", "Hindi"];
const TAG_FILTERS = ["All", "New Releases", "Re-Releases", "3D", "4DX-2D"];

export default function OnlyInTheatres() {
  const [language, setLanguage] = useState<"All" | "English" | "Hindi">("All");
  const [tag, setTag] = useState<string>("All");

  const filteredMovies = MOVIES.filter((movie) => {
    const matchLang = language === "All" || movie.language === language;
    const matchTag = tag === "All" || movie.tags.includes(tag);
    return matchLang && matchTag;
  });

  return (
    <section className="w-full px-4 pt-10 md:px-6 lg:px-16 lg:pt-16">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="mb-6 text-[26px] font-semibold md:text-[32px] lg:text-[36px]">
          Only in Theatres
        </h2>

        {/* Filters row */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {/* Filters pill – NEW ICONS */}
          <button className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Language filters */}
          {LANGUAGE_FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setLanguage(item as any)}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                language === item
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
              }`}
            >
              {item}
            </button>
          ))}

          {/* Tag filters */}
          {TAG_FILTERS.map((item) =>
            item === "All" ? null : (
              <button
                key={item}
                onClick={() => setTag(item)}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  tag === item
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        {/* Cards grid */}
        <div
          className="
            grid
            grid-cols-2 gap-4
            sm:grid-cols-2 sm:gap-5
            md:grid-cols-2 md:gap-6
            lg:grid-cols-5 lg:gap-8
          "
        >
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)] lg:rounded-[26px] lg:shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="h-[220px] w-full sm:h-[240px] md:h-[260px] lg:h-[310px]">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="px-3 py-3 md:px-4 md:py-4">
                <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug md:text-[15px] lg:text-[16px]">
                  {movie.title}
                </h3>
                <p className="mt-1 text-[12px] text-zinc-500 md:text-[13px]">
                  {movie.cert} | {movie.language}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
