"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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

// CARD layout
const CARD_SIZE = 150;
const GAP = 40;
const TOTAL_WIDTH = CARD_SIZE + GAP;

export default function ArtistsInYourDistrict() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % ARTISTS.length);
  const prev = () => setIndex((i) => (i === 0 ? ARTISTS.length - 1 : i - 1));

  useEffect(() => {
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, []);

  const extended = [...ARTISTS, ...ARTISTS];

  return (
    <section className="py-12 bg-white select-none">
      <div className="mx-auto w-full max-w-7xl px-6">

        <h2 className="text-3xl font-bold text-zinc-900 mb-10">
          Artists in your District
        </h2>

        {/* SLIDER */}
        <div className="relative flex items-center gap-6">

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="h-10 w-10 rounded-full bg-white border flex items-center justify-center shadow-sm hover:bg-zinc-100 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* CAROUSEL */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex"
              animate={{ x: -index * TOTAL_WIDTH }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
            >
              {extended.map((artist, i) => (
                <Link
                  key={i}
                  href={`/artist/${artist.id}`}
                  className="flex flex-col items-center cursor-pointer"
                  style={{ width: CARD_SIZE, marginRight: GAP }}
                >
                  {/* CIRCLE IMAGE */}
                  <div className="relative w-[172px] h-[172px] rounded-full overflow-hidden shadow bg-white">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <p className="mt-4 text-base font-semibold text-zinc-900 text-center">
                    {artist.name}
                  </p>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="h-10 w-10 rounded-full bg-white border flex items-center justify-center shadow-sm hover:bg-zinc-100 transition"
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
