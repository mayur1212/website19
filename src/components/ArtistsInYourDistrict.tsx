"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ARTISTS = [
  { id: 1, name: "A. R. Rahman", image: "/movies/a1.jpg" },
  { id: 2, name: "Sunidhi Chauhan", image: "/movies/a2.jpg" },
  { id: 3, name: "Masoom Sharma", image: "/movies/a3.jpg" },
  { id: 4, name: "Satinder Sartaaj", image: "/movies/a4.jpg" },
  { id: 5, name: "Jubin Nautiyal", image: "/movies/a5.jpg" },
  { id: 6, name: "Aditya Rikhari", image: "/movies/a6.jpg" },
  { id: 7, name: "Badshah", image: "/movies/a7.jpg" },
  { id: 8, name: "Diljit Dosanjh", image: "/movies/a8.jpg" },
];

const CARD_SIZE = 180;  // actual card width
const GAP = 40;         // gap between cards
const TOTAL_WIDTH = CARD_SIZE + GAP; // real motion width

export default function ArtistsInYourDistrict() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % ARTISTS.length);
  const prev = () => setIndex((i) => (i === 0 ? ARTISTS.length - 1 : i - 1));

  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, []);

  const extended = [...ARTISTS, ...ARTISTS];

  return (
    <section className=" py-14 bg-white  select-none">
      <div className="mx-auto w-full max-w-7xl px-2">

        <h2 className="text-3xl font-bold text-zinc-900 mb-10 ml-12">
          Artists in your District
        </h2>

        {/* SHIFT LEFT DONE HERE */}
        <div className="relative flex items-center px-6"> 


          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="h-12 w-12 rounded-full bg-white 
                       flex items-center justify-center hover:bg-zinc-100 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* CAROUSEL WINDOW */}
          <div className="overflow-hidden flex-3">
            <motion.div
              className="flex"
              animate={{ x: -index * TOTAL_WIDTH }}
              transition={{ type: "spring", stiffness: 50, damping: 18 }}
            >
              {extended.map((artist, i) => {
                const centerIndex = index % ARTISTS.length;
                const isCenter = i % ARTISTS.length === centerIndex;

                return (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center"
                    style={{ width: CARD_SIZE, marginRight: GAP }}
                    animate={{ scale: isCenter ? 1.12 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="
                        relative h-32 w-32 rounded-full overflow-hidden 
                       bg-white
                      "
                    >
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Name NEVER cuts now */}
                    <p className="mt-4 text-lg font-semibold text-zinc-800 whitespace-nowrap">
                      {artist.name}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="h-12 w-12 ml-4 rounded-full 
                       flex items-center justify-center hover:bg-zinc-100 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}
