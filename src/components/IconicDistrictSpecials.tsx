"use client";

import React from "react";
import Image from "next/image";

const SPECIALS = [
  {
    id: "signature-packages",
    title: "Signature packages",
    description: "Curated menus & selections across the best spots in town",
    image: "/movies/dx4.jpg",
    rotation: "-rotate-3",
  },
  {
    id: "peak-hour-booking",
    title: "Peak hour booking",
    description: "Skip the queue – priority entry at top restaurants",
    image: "/movies/d3.jpg",
    rotation: "rotate-2",
  },
  {
    id: "on-the-house",
    title: "On-the-house",
    description: "Complimentary delights along with your favourite meals",
    image: "/movies/d3.jpg",
    rotation: "-rotate-2",
  },
];

export default function IconicDistrictSpecials() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f6f0ff] via-[#fbf7ff] to-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-zinc-900 sm:text-[28px] md:text-[32px]">
          Enjoy iconic District specials
        </h2>

        {/* Underline */}
        <div className="mt-4 flex justify-center">
          <div className="h-[3px] w-36 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300" />
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-14 sm:grid-cols-2 md:grid-cols-3">
          {SPECIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">
                {item.title}
              </h3>

              <p className="mt-2 max-w-xs text-sm text-zinc-600">
                {item.description}
              </p>

              {/* Polaroid */}
              <div
                className={`mt-8 inline-block transform ${item.rotation}`}
              >
                <div className="relative mx-auto w-[220px] bg-[#ead6ff] pb-6 shadow-[10px_10px_0px_#000]">
                  {/* Tape */}
                  <div className="absolute left-1/2 top-1 -translate-x-1/2">
                    <div className="h-3 w-16 bg-zinc-300" />
                  </div>

                  {/* Image */}
                  <div className="mx-4 mt-5 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={260}
                      height={300}
                      className="h-[220px] w-full object-cover"
                    />
                  </div>

                  {/* Bottom Polaroid Space */}
                  <div className="mt-4 h-4 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
