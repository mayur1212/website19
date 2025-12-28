"use client";

import React from "react";
import Image from "next/image";

type Movie4DX = {
  id: string;
  title: string;
  meta: string;
  image: string;
};

const MOVIES_4DX: Movie4DX[] = [
  {
    id: "thamma",
    title: "Thamma",
    meta: "UA16+ | Hindi",
    image: "/movies/i1.png",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba…",
    meta: "UA13+ | Japanese and 1 more",
    image: "/movies/3d1.jpg",
  },
  {
    id: "wicked-2024",
    title: "Wicked (2024)",
    meta: "UA | English",
    image: "/movies/3d1.jpg",
  },
];

export default function ExperienceIn4DX() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-[85%] px-8">

        <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
          Experience in 4DX
        </h2>

        <div
          className="
            flex gap-5 overflow-x-auto pb-3 scroll-smooth no-scrollbar
            lg:flex-wrap lg:overflow-visible lg:pb-0
          "
        >
          {MOVIES_4DX.map((movie) => (
            <article
              key={movie.id}
              className="
                group
                flex-shrink-0 w-[200px] sm:w-[220px]
                lg:w-[230px] lg:flex-shrink
                overflow-hidden
                rounded-[24px]
                bg-white
                shadow-[0_6px_20px_rgba(0,0,0,0.1)]
                transition-all duration-300 ease-out
                hover:-translate-y-[3px]
                hover:shadow-[0_18px_36px_rgba(0,0,0,0.18)]
              "
            >
              {/* Poster */}
              <div className="relative h-[260px] sm:h-[280px] w-full overflow-hidden">
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
              <div className="px-4 pb-4 pt-3 bg-white">
                <h3 className="text-sm font-semibold text-zinc-900">
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
