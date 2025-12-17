"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  certificate: string;
  genre?: string;
  cta?: string;
  poster: string;
};

const MOVIES: Movie[] = [
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

  const goNext = () => setCurrent((p) => (p + 1) % total);
  const goPrev = () => setCurrent((p) => (p - 1 + total) % total);

  return (
    <>
      {/* MOBILE + TABLET */}
      <section className="w-full bg-[#f4f9ff] px-4 py-6 md:py-8 lg:hidden">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-[18px] font-semibold text-zinc-900 mb-3">In the spotlight</h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + "-mobile-card"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl bg-white border border-zinc-100 shadow-sm overflow-hidden"
            >
              {/* Poster (keeps object-fit behavior similar to EventHero) */}
              <div className="relative w-full flex justify-center bg-white">
                <div className="relative w-full h-[260px] sm:h-[300px] md:h-[330px] rounded-t-2xl overflow-hidden">
                  {/* Use next/image for local assets, fallback to img for external images */}
                  {item.poster.startsWith("/") ? (
                    <Image src={item.poster} alt={item.title} fill className="object-cover object-center" />
                  ) : (
                    <img src={item.poster} alt={item.title} className="block w-full h-full object-cover object-center" />
                  )}
                </div>
              </div>

              <div className="px-4 py-3">
                <h3 className="text-[16px] font-semibold text-zinc-900">{item.title}</h3>
                <p className="text-[13px] text-zinc-500 mt-1">{item.certificate} {item.genre ? `| ${item.genre}` : null}</p>
                <div className="mt-3">
                  <button className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm">
                    {item.cta ?? "Book"}
                  </button>
                </div>
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
                  className={`h-2 rounded-full transition-all ${active ? "w-6 bg-black" : "w-2 bg-zinc-400"}`}
                  aria-label={`go-to-${idx}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* DESKTOP */}
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
            {/* blurred background with scale like EventHero */}
            {item.poster.startsWith("/") ? (
              <Image src={item.poster} alt={item.title} fill className="h-full w-full object-cover blur-[24px] scale-110" />
            ) : (
              <img src={item.poster} alt={item.title} className="h-full w-full object-cover blur-[24px] scale-110" />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white" />
          </motion.div>
        </AnimatePresence>

       



        <button
  onClick={goPrev}
  className="absolute left-12 top-1/2 z-20 -translate-y-1/2 hover:scale-110 transition"
>
  <ChevronLeft className="w-7 h-7 text-zinc-900" />
</button>

<button
  onClick={goNext}
  className="absolute right-12 top-1/2 z-20 -translate-y-1/2 hover:scale-110 transition"
>
  <ChevronRight className="w-7 h-7 text-zinc-900" />
</button>



        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + "-text"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="flex-1 md:max-w-lg"
            >
              <h1 className="text-[34px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">{item.title}</h1>
              <p className="mt-3 text-[20px] font-medium text-zinc-800">{item.certificate} {item.genre ? `| ${item.genre}` : null}</p>
              <button className="mt-6 inline-flex w-[180px] items-center justify-center rounded-full bg-black px-8 py-3 text-[16px] font-semibold text-white shadow-md hover:bg-zinc-900">{item.cta}</button>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + "-image"}
              initial={{ opacity: 0, scale: 0.8, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -60 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 flex items-center justify-end"
            >
              <div className="relative h-[420px] w-[300px] overflow-hidden rounded-3xl shadow-2xl bg-black/10">
                {item.poster.startsWith("/") ? (
                  <Image src={item.poster} alt={item.title} fill className="object-cover" />
                ) : (
                  <img src={item.poster} alt={item.title} className="h-full w-full object-cover" />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* desktop dots */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {MOVIES.map((movie, index) => {
            const active = index === current;
            return (
              <button
                key={movie.id}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${active ? "w-8 bg-black" : "w-2 bg-zinc-300"}`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
