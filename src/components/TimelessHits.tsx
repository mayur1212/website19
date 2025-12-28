"use client";

import React from "react";
import Image from "next/image";

type TimelessMovie = {
  id: string;
  title: string;
  meta: string;
  image: string;
};

const TIMELESS_MOVIES: TimelessMovie[] = [
  {
    id: "amazing-spiderman-2012",
    title: "The Amazing Spider-Man (2012)",
    meta: "UA | English",
    image: "/movies/night1.jpg",
  },
  {
    id: "om-shanti-om-2007",
    title: "Om Shanti Om (2007)",
    meta: "UA | Hindi",
    image: "/movies/night1.jpg",
  },
  {
    id: "chennai-express-2013",
    title: "Chennai Express (2013)",
    meta: "UA | Hindi",
    image: "/movies/night1.jpg",
  },
  {
    id: "spiderman-2002",
    title: "Spider-Man (2002)",
    meta: "UA13+ | English",
    image: "/movies/night1.jpg",
  },
];

export default function TimelessHits() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-[85%] px-8">

        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
          Timeless Hits
        </h2>

        {/* Cards Container */}
        <div
          className="
            grid grid-cols-2 gap-5
            md:grid-cols-2
            lg:flex lg:flex-nowrap lg:gap-5
            lg:overflow-x-auto lg:pb-3
            scroll-smooth no-scrollbar
          "
        >
          {TIMELESS_MOVIES.map((movie) => (
            <article
              key={movie.id}
              className="
                group
                w-full
                lg:w-[230px] lg:flex-shrink-0
                bg-white
                overflow-hidden
                rounded-[24px]
                shadow-[0_6px_20px_rgba(0,0,0,0.1)]
                transition-all duration-300 ease-out
                hover:-translate-y-[3px]
                hover:shadow-[0_18px_36px_rgba(0,0,0,0.18)]
              "
            >
              {/* Poster */}
              <div className="relative h-[220px] sm:h-[260px] md:h-[280px] w-full overflow-hidden">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="
                    object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-[1.05]
                  "
                />
              </div>

              {/* Text */}
              <div className="bg-white px-4 pb-4 pt-3">
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
