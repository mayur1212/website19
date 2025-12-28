"use client";

import React from "react";
import Image from "next/image";

type Movie = {
  id: string;
  title: string;
  rating: string;
  lang: string;
  image: string;
};

const MOVIES: Movie[] = [
  {
    id: "now-you-see-me-2",
    title: "Now You See Me: Now You Don’t",
    rating: "UA16+",
    lang: "English",
    image: "/movies/e1.jpg",
  },
  {
    id: "spiderman-2",
    title: "The Amazing Spider-Man 2 (2014)",
    rating: "UA",
    lang: "English",
    image: "/movies/e2.jpg",
  },
  {
    id: "wicked",
    title: "Wicked: For Good",
    rating: "UA16+",
    lang: "English",
    image: "/movies/e3.jpg",
  },
  {
    id: "predator-badlands",
    title: "Predator: Badlands",
    rating: "UA 16+",
    lang: "English and 1 more",
    image: "/movies/e4.jpg",
  },
];

export default function BestOfEnglishMovies() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-[85%] px-8">

        <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
          Best of English movies
        </h2>

        <div
          className="
            flex gap-5 flex-nowrap overflow-x-auto pb-3
            lg:flex-wrap lg:overflow-visible lg:pb-0
          "
        >
          {MOVIES.map((movie) => (
            <article
              key={movie.id}
              className="
                group
                flex-shrink-0 w-[220px]
                bg-white rounded-[20px] overflow-hidden
                shadow-[0_6px_20px_rgba(0,0,0,0.1)]
                transition-all duration-300 ease-out
                hover:-translate-y-[3px]
                hover:shadow-[0_18px_36px_rgba(0,0,0,0.18)]
                sm:w-[230px]
                lg:w-[250px] lg:flex-shrink
              "
            >
              {/* Image */}
              <div className="relative h-[320px] w-full lg:h-[350px] overflow-hidden">
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

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-zinc-900">
                  {movie.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-600">
                  {movie.rating} | {movie.lang}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
