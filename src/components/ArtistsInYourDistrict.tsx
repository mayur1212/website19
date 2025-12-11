"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const extended = [...ARTISTS, ...ARTISTS]; // for smooth infinite feel
  const autoRef = useRef<number | null>(null);

  // scroll ref for touch devices / fallback
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const next = () => setIndex((i) => (i + 1) % ARTISTS.length);
  const prev = () => setIndex((i) => (i === 0 ? ARTISTS.length - 1 : i - 1));

  // Auto-advance every 3.5s
  useEffect(() => {
    // clear first just in case
    if (autoRef.current) {
      window.clearInterval(autoRef.current);
      autoRef.current = null;
    }
    autoRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % ARTISTS.length);
    }, 3500);

    return () => {
      if (autoRef.current) {
        window.clearInterval(autoRef.current);
        autoRef.current = null;
      }
    };
  }, []);

  // Keep scrollRef in sync on small screens (when user wants to scroll manually)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // If viewport is narrow, scroll to make the "index" visible
    if (window.innerWidth < 720) {
      const targetLeft = index * (CARD_SIZE + 24); // smaller gap for responsive layout
      el.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  }, [index]);

  // Pause auto on hover (desktop)
  const handleMouseEnter = () => {
    if (autoRef.current) {
      window.clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };
  const handleMouseLeave = () => {
    if (!autoRef.current) {
      autoRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % ARTISTS.length);
      }, 3500);
    }
  };

  return (
    <section
      className="py-12 bg-white select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-zinc-900 mb-10">
          Artists in your District
        </h2>

        {/* SLIDER */}
        <div className="relative flex items-center gap-6">
          {/* LEFT ARROW */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="h-10 w-10 rounded-full bg-white border flex items-center justify-center shadow-sm hover:bg-zinc-100 transition"
            title="Previous"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* CAROUSEL */}
          <div
            className="overflow-hidden w-full"
            ref={scrollRef}
            role="region"
            aria-label="Artists carousel"
          >
            <motion.div
              className="flex items-center"
              animate={{ x: -index * TOTAL_WIDTH }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
            >
              {extended.map((artist, i) => (
                <Link
                  key={`${artist.id}-${i}`}
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
            aria-label="Next"
            className="h-10 w-10 rounded-full bg-white border flex items-center justify-center shadow-sm hover:bg-zinc-100 transition"
            title="Next"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* mobile next button (overlay) */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-zinc-100 sm:hidden"
            aria-label="Scroll next"
            title="Scroll next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
