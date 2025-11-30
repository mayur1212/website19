"use client";

import React, { useRef } from "react";
import Image from "next/image";

const ARTISTS = [
  { id: 1, name: "A. R. Rahman", image: "/movies/a1.jpg" },
  { id: 2, name: "Sunidhi Chauhan", image: "/movies/a2.jpg" },
  { id: 3, name: "Masoom Sharma", image: "/movies/a3.jpg" },
  { id: 4, name: "Satinder Sartaaj", image: "/movies/a4.jpg" },
  { id: 5, name: "Jubin Nautiyal", image: "/movies/a5.jpg" },
  { id: 6, name: "Aditya Rikhari", image: "/movies/a6.jpg" },
];

export default function ArtistsInYourDistrict() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const next = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="w-full py-10 bg-white">
      <div className="mx-auto w-full max-w-6xl px-8">

        <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
          Artists in your District
        </h2>

        <div className="relative">

          <div
            ref={scrollRef}
            className="flex gap-10 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
          >
            {ARTISTS.map((artist) => (
              <div key={artist.id} className="flex flex-col items-center flex-shrink-0">
                
                <div className="relative h-44 w-44 rounded-full overflow-hidden shadow-md">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 text-base font-medium text-zinc-900">
                  {artist.name}
                </p>
              </div>
            ))}

            <div className="w-16 flex-shrink-0" />
          </div>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-zinc-100"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}
