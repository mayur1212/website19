"use client";

import React from "react";
import Image from "next/image";

type Movie = {
  id: string;
  title: string;
  meta: string;
  image: string;
};

const MOVIES: Movie[] = [
  {
    id: "de-de-pyaar-de-2",
    title: "De De Pyaar De 2",
    meta: "UA13+ | Hindi",
    image: "/movies/d1.jpg",
  },
  {
    id: "mastiii-4",
    title: "Mastiii 4",
    meta: "A | Hindi",
    image: "/movies/d2.jpg",
  },
  {
    id: "120-bahadur",
    title: "120 Bahadur",
    meta: "UA13+ | Hindi",
    image: "/movies/d3.jpg",
  },
  {
    id: "haq",
    title: "Haq",
    meta: "UA13+ | Hindi",
    image: "/movies/d5.jpg",
  },
];

export default function HitsFromPreviousWeeks() {
  return (
    <section className="w-full bg-white py-10">
      
        <div className="mx-auto w-[85%] px-8">

        <h2 className="mb-6 text-2xl font-semibold leading-tight text-zinc-900">
          Hits from previous weeks
        </h2>

        {/* 2 Cards per row on mobile + tablet */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {MOVIES.map((movie) => (
            <article
              key={movie.id}
              className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
            >
              {/* Poster */}
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col px-4 pb-4 pt-3">
                <h3 className="text-sm font-semibold leading-snug text-zinc-900">
                  {movie.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-zinc-500">
                  {movie.meta}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
