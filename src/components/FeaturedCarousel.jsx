"use client";

import { useState } from "react";
import Image from "next/image";

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

  return (
    <>
      {/* ==================== MOBILE + TABLET VERSION ==================== */}
      <section className="w-full bg-[#f5f9ff] py-8 px-4 md:py-10 lg:hidden">
        <div className="mx-auto w-full max-w-3xl">
          {/* Heading */}
          <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
            In the spotlight
          </h2>

          {/* Card */}
          <article className="mt-4 overflow-hidden rounded-[24px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
            {/* Poster */}
            <div className="relative h-[200px] sm:h-[220px] md:h-[240px] w-full">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="px-4 pb-4 pt-3 sm:pb-5">
              <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">
                {item.title}
              </h3>

              <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
                {item.certificate}
              </p>
            </div>
          </article>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {MOVIES.map((movie, index) => {
              const active = index === current;

              return (
                <button
                  key={movie.id}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    active ? "w-7 bg-zinc-900" : "w-2 bg-zinc-300"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== DESKTOP VERSION ==================== */}
      <section className="relative hidden min-h-[520px] items-center overflow-hidden px-8 py-10 md:px-16 lg:flex">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={item.poster}
            alt={item.title}
            fill
            priority
            className="h-full w-full scale-110 object-cover blur-3xl opacity-70"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white" />
        </div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-16 top-[52%] hidden -translate-y-1/2 text-4xl font-bold text-black md:flex"
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-16 top-[52%] hidden -translate-y-1/2 text-4xl font-bold text-black md:flex"
        >
          ›
        </button>

        {/* Content Layout */}
        <div className="flex w-full max-w-6xl items-center justify-between gap-6">
          {/* LEFT TEXT BLOCK */}
          <div className="ml-16 flex flex-1 flex-col gap-6 md:max-w-lg">
            <h1 className="text-[34px] font-semibold tracking-tight text-zinc-900 md:text-[44px]">
              {item.title}
            </h1>

            <p className="text-[20px] font-medium text-zinc-800">
              {metaText}
            </p>

            <button className="mt-2 inline-flex w-[180px] items-center justify-center rounded-full bg-black px-8 py-3 text-[16px] font-semibold text-white shadow-md transition hover:bg-zinc-900">
              {item.cta}
            </button>
          </div>

          {/* RIGHT IMAGE BLOCK */}
          <div className="mr-16 flex flex-1 items-center justify-end">
            <div className="relative h-[360px] w-[240px] overflow-hidden rounded-[32px] bg-black shadow-[0_28px_60px_rgba(0,0,0,0.35)] md:h-[420px] md:w-[270px] lg:h-[460px] lg:w-[300px]">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Dots Bottom */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
          {MOVIES.map((movie, index) => {
            const active = index === current;

            return (
              <button
                key={movie.id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  active ? "w-7 bg-black" : "w-2 bg-zinc-300"
                }`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
