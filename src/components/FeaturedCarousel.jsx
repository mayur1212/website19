"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MOVIES = [
  {
    id: 1,
    title: "120 Bahadur",
    certificate: "UA13+",
    genre: "Action, Historical +1 more",
    cta: "Book now",
    poster: "/movies/d3.jpg",
  },
  {
    id: 2,
    title: "Random Movie 2",
    certificate: "U/A",
    genre: "Drama",
    cta: "Book now",
    poster: "/movies/d1.jpg",
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

  const next = () => setCurrent((p) => (p + 1) % total);
  const prev = () => setCurrent((p) => (p - 1 + total) % total);

  const metaText = `${item.certificate} | ${item.genre}`;
  const bgImage = item.poster;

  // AUTO SLIDE
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
    }, 5000);
    return () => clearInterval(id);
  }, [total]);

  return (
    <>
      {/* ==================== MOBILE + TABLET ==================== */}
      <section className="relative w-full px-4 py-6 overflow-hidden md:py-8 lg:hidden">

  {/* BACKGROUND BLUR */}
  <AnimatePresence mode="wait">
    <motion.div
      key={item.id + "-bg-mobile"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute inset-0"
    >
      <Image
        src={bgImage}
        alt={item.title}
        fill
        className="h-full w-full scale-110 object-cover blur-xl"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white" />
    </motion.div>
  </AnimatePresence>

  <div className="relative z-10 mx-auto w-full max-w-md">

    {/* Title just above card */}
    <h2 className="text-[20px] font-semibold text-zinc-900 mb-3">
      In the spotlight
    </h2>

    {/* CARD */}
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id + "-mobile-card"}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-white shadow-lg overflow-hidden"
      >
        




   
   <div className="relative w-full rounded-t-2xl overflow-hidden">
    <img
      src={item.poster}
      alt={item.title}
      className="
        w-full
        h-[260px] sm:h-[300px] md:h-[330px]
        object-fill
        object-center
        block
      "
    />
  </div>











        {/* TEXT */}
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

    {/* DOTS */}
    <div className="mt-4 flex justify-center gap-2">
      {MOVIES.map((movie, index) => {
        const active = index === current;
        return (
          <button
            key={movie.id}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              active ? "w-6 bg-black" : "w-2 bg-black/30"
            }`}
          />
        );
      })}
    </div>

  </div>
</section>




      {/* ==================== DESKTOP VERSION ==================== */}
      <section className="relative hidden min-h-[600px] items-center overflow-hidden px-8 py-10 md:px-16 lg:flex">
        {/* BG ANIMATION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id + "-bg-desktop"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0"
          >
            <Image
              src={bgImage}
              alt={item.title}
              fill
              className="h-full w-full scale-110 object-cover blur-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white" />
          </motion.div>
        </AnimatePresence>

        {/* ARROWS */}
        <button
          onClick={prev}
          className="absolute left-24 top-1/2 z-20 -translate-y-1/2 text-2xl font-semibold text-zinc-900 transition-transform hover:scale-110"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-24 top-1/2 z-20 -translate-y-1/2 text-2xl font-semibold text-zinc-900 transition-transform hover:scale-110"
        >
          ›
        </button>

        {/* MAIN CONTENT */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-10 px-4">
          {/* TEXT WITH ANIMATION */}
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + "-text-desktop"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="flex flex-1 flex-col gap-6 md:max-w-lg"
            >
              <h1 className="text-[34px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
                {item.title}
              </h1>

              <p className="text-[20px] font-medium text-zinc-800">
                {metaText}
              </p>

              <button className="mt-2 inline-flex w-[180px] items-center justify-center rounded-full bg-black px-8 py-3 text-[16px] font-semibold text-white shadow-md transition hover:bg-zinc-900">
                {item.cta}
              </button>
            </motion.div>
          </AnimatePresence>

          {/* POSTER IMAGE WITH SAME SCALE + SLIDE ANIMATION */}
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + "-img-desktop"}
              initial={{ opacity: 0, scale: 0.8, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -60 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-1 items-center justify-end"
            >
              <div className="relative h-[360px] w-[240px] overflow-hidden rounded-[32px] bg-black md:h-[420px] md:w-[270px] lg:h-[460px] lg:w-[300px]">
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DESKTOP DOTS (center pill + side circles) */}
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
