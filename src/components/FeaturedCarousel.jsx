"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOVIES = [
  {
    id: 1,
    title: "Zootopia 2",
    certificate: "UA7+",
    genre: "Family, Animation",
    cta: "Book now",
    poster:
      "https://cdn.district.in/movies-assets/images/cinema/HorizontalZootopia-2--88e2b0a0-361b-11f0-aa9f-8fefdb33bbbf.jpg",
  },
  {
    id: 2,
    title: "120 Bahadur",
    certificate: "UA13+",
    genre: "Action",
    cta: "Book now",
    poster: "/movies/d3.jpg",
  },
  {
    id: 3,
    title: "Mastiii 4",
    certificate: "A",
    genre: "Comedy",
    cta: "Book now",
    poster: "/movies/d2.jpg",
  },
];

export default function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const total = MOVIES.length;
  const item = MOVIES[current];

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => (p + 1) % total), 4500);
    return () => clearInterval(id);
  }, [total]);

  return (
    <>
      {/* MOBILE + TABLET (matches your screenshot) */}
      <section className="w-full bg-[#f4f9ff] px-4 py-6 md:py-8 lg:hidden">
        <div className="mx-auto w-full max-w-md">
          {/* Heading */}
          <h2 className="text-[18px] font-semibold text-zinc-900 mb-3">
            In the spotlight
          </h2>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + "-mobile-card"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl bg-white border border-zinc-100 shadow-sm overflow-hidden"
            >
              {/* IMAGE — exact style you asked for */}
              <div className="relative w-full flex justify-center bg-white">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="
                    block
                    w-full
                    h-[260px] sm:h-[300px] md:h-[330px]
                    object-cover
                    object-center
                    rounded-t-2xl
                  "
                />
              </div>

              {/* Title + meta */}
              <div className="px-4 py-3">
                <h3 className="text-[16px] font-semibold text-zinc-900">
                  {item.title}
                </h3>
                <p className="text-[13px] text-zinc-500 mt-1">
                  {item.certificate}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* dots */}
          <div className="mt-4 flex justify-center gap-2">
            {MOVIES.map((movie, idx) => {
              const active = idx === current;
              return (
                <button
                  key={movie.id}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all ${
                    active ? "w-6 bg-black" : "w-2 bg-zinc-400"
                  }`}
                  aria-label={`go-to-${idx}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* DESKTOP (kept similar to previous desktop layout) */}
      <section className="relative hidden min-h-[600px] items-center overflow-hidden px-8 py-10 md:px-16 lg:flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id + "-bg-desktop"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0"
          >
            <img
              src={item.poster}
              alt={item.title}
              className="h-full w-full object-cover blur-[24px] scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white" />
          </motion.div>
        </AnimatePresence>

        {/* arrows */}
        <button
          onClick={() => setCurrent((p) => (p - 1 + total) % total)}
          className="absolute left-24 top-1/2 z-20 -translate-y-1/2 text-2xl font-semibold text-zinc-900 hover:scale-110"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrent((p) => (p + 1) % total)}
          className="absolute right-24 top-1/2 z-20 -translate-y-1/2 text-2xl font-semibold text-zinc-900 hover:scale-110"
        >
          ›
        </button>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-10 px-4">
          <div className="flex-1 md:max-w-lg">
            <h1 className="text-[34px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
              {item.title}
            </h1>
            <p className="mt-3 text-[20px] font-medium text-zinc-800">
              {item.certificate} | {item.genre}
            </p>
            <button className="mt-6 inline-flex w-[180px] items-center justify-center rounded-full bg-black px-8 py-3 text-[16px] font-semibold text-white shadow-md hover:bg-zinc-900">
              {item.cta}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="relative h-[360px] w-[240px] overflow-hidden rounded-[32px] bg-black md:h-[420px] md:w-[270px] lg:h-[460px] lg:w-[300px]">
              <img
                src={item.poster}
                alt={item.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* desktop dots */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {MOVIES.map((movie, index) => {
            const active = index === current;
            return (
              <button
                key={movie.id}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  active ? "w-8 bg-black" : "w-2 bg-zinc-300"
                }`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
