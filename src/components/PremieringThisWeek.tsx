"use client";

import React from "react";
import Image from "next/image";

type PremieringMovie = {
  id: string;
  title: string;
  meta: string;
  image: string;
};

const PREMIERING: PremieringMovie[] = [
  {
    id: "tere-ishk-mein",
    title: "Tere Ishk Mein",
    meta: "UA16+ | Hindi",
    image: "/movies/d4.jpg",
  },
];

export default function PremieringThisWeek() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-full max-w-6xl px-8">
        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
          Premiering this week
        </h2>

        {/* Cards row (right now only 1, but ready for more) */}
        <div className="flex flex-wrap gap-6">
          {PREMIERING.map((movie) => (
            <article
              key={movie.id}
              className="w-[230px] flex-shrink-0 overflow-hidden rounded-[24px] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
            >
              {/* Poster */}
              <div className="relative h-[300px] w-full">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text area */}
              <div className="rounded-b-[24px] bg-white px-4 pb-4 pt-3">
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
