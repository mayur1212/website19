"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const MOVIES = [
  {
    id: "de-de-pyaar-de-2",
    title: "De De Pyaar De 2",
    meta: "UA13+ | Hindi",
    poster: "/movies/d1.jpg",
    herf: "/movie/de-de-pyaar-de-2",
  },
  {
    id: "mastiii-4",
    title: "Mastiii 4",
    meta: "A | Hindi",
    poster: "/movies/d2.jpg",
    herf: "/movie/mastiii-4",
  },
  {
    id: "120-bahadur",
    title: "120 Bahadur",
    meta: "UA13+ | Hindi",
    poster: "/movies/d3.jpg",
    herf: "/movie/120-bahadur",
  },
  {
    id: "tere-ishk-mein",
    title: "Tere Ishk Mein",
    meta: "UA16+ | Hindi",
    poster: "/movies/d4.jpg",
    herf: "/movie/tere-ishk-mein",
  },
];

export default function TopHindiMovies() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f3ecff] to-white py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold leading-tight text-zinc-900">
          Top Hindi movies near you
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {MOVIES.map((movie) => (
            <div
              key={movie.id}
              className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            >
              <Link href={movie.herf}>
                {/* Poster */}
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text area */}
                <div className="px-4 py-3">
                  <h3 className="text-base font-semibold text-zinc-900">
                    {movie.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-zinc-500">
                    {movie.meta}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
