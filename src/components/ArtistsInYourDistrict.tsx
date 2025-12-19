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

const CARD_SIZE = 150;
const GAP = 40;
const TOTAL_WIDTH = CARD_SIZE + GAP;

export default function ArtistsInYourDistrict() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const extended = [...ARTISTS, ...ARTISTS];
  const autoRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ detect screen size safely
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = () => setIndex((i) => (i + 1) % ARTISTS.length);
  const prev = () => setIndex((i) => (i === 0 ? ARTISTS.length - 1 : i - 1));

  // auto slide (desktop only)
  useEffect(() => {
    if (isMobile) return;

    autoRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % ARTISTS.length);
    }, 3500);

    return () => {
      if (autoRef.current) {
        window.clearInterval(autoRef.current);
        autoRef.current = null;
      }
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (autoRef.current) {
      window.clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !autoRef.current) {
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
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">
          Artists in your District
        </h2>

        <div className="relative flex items-center gap-6">
          {/* LEFT ARROW — desktop only */}
          <button
            onClick={prev}
            className="hidden sm:flex h-10 w-10 rounded-full bg-white border items-center justify-center shadow-sm hover:bg-zinc-100 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2" fill="none">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* CAROUSEL */}
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto sm:overflow-hidden scrollbar-hide"
          >
            <motion.div
              className="flex items-start"
              animate={!isMobile ? { x: -index * TOTAL_WIDTH } : {}}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
            >
              {extended.map((artist, i) => (
                <Link
                  key={`${artist.id}-${i}`}
                  href={`/artist/${artist.id}`}
                  className="flex flex-col items-center shrink-0"
                  style={{
                    width: isMobile ? 96 : CARD_SIZE,
                    marginRight: isMobile ? 24 : GAP,
                  }}
                >
                  {/* IMAGE */}
                  <div
                    className="
                      relative
                      w-[88px] h-[88px]
                      sm:w-[172px] sm:h-[172px]
                      rounded-full overflow-hidden
                      bg-white
                      shadow-sm
                      sm:hover:shadow-xl
                      sm:hover:scale-[1.06]
                      transition-all
                    "
                  >
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover sm:hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* NAME */}
                  <p className="mt-2 sm:mt-4 text-xs sm:text-base font-semibold text-zinc-900 text-center">
                    {artist.name}
                  </p>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* RIGHT ARROW — desktop only */}
          <button
            onClick={next}
            className="hidden sm:flex h-10 w-10 rounded-full bg-white border items-center justify-center shadow-sm hover:bg-zinc-100 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="#333" strokeWidth="2" fill="none">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
