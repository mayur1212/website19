"use client";

import { useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    dateTime: "Daily, Multiple slots",
    title: "The Game Palacio | Delhi Ansal Plaza",
    location: "The Game Palacio, Delhi/NCR",
    price: "₹650 onwards",
    image: "/events/game-palacio.jpg",
  },
  {
    id: 2,
    dateTime: "Everyday, Multiple slots",
    title: "Smaaash | Cyber Hub",
    location: "Smaaash, DLF Cyber Hub, Gurugram",
    price: "₹799 onwards",
    image: "/events/smaaash.jpg",
  },
  {
    id: 3,
    dateTime: "Daily, Multiple slots",
    title: "The Game Palacio | Delhi Ansal Plaza",
    location: "The Game Palacio, Delhi/NCR",
    price: "₹650 onwards",
    image: "/events/game-palacio.jpg",
  },
  {
    id: 4,
    dateTime: "Everyday, Multiple slots",
    title: "Smaaash | Cyber Hub",
    location: "Smaaash, DLF Cyber Hub, Gurugram",
    price: "₹799 onwards",
    image: "/events/smaaash.jpg",
  },
];

export default function ActivitiesHero() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  const goNext = () => setActive((i) => (i + 1) % SLIDES.length);
  const goPrev = () => setActive((i) => (i === 0 ? SLIDES.length - 1 : i - 1));

  return (
    <>
      {/* ========= MOBILE + TABLET : Featured Activities cards ========= */}
      <section className="w-full bg-white px-4 py-8 sm:px-5 md:px-6 lg:hidden">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
            Featured Activities
          </h2>

          {/* horizontally scroll cards */}
          <div className="relative mt-4">
            {/* हलकं fade effect side ला (optional) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent" />

            <div
              className="
                flex gap-5 overflow-x-auto pb-4
                snap-x snap-mandatory no-scrollbar
              "
            >
              {SLIDES.map((item, index) => (
                <article
                  key={item.id}
                  onClick={() => setActive(index)}
                  className={`
                    snap-center shrink-0
                    w-[260px] sm:w-[280px]
                    overflow-hidden rounded-[24px]
                    bg-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]
                    transition-transform duration-200
                    ${
                      index === active
                        ? "scale-[1.02]"
                        : "scale-[0.97] opacity-90"
                    }
                  `}
                >
                  {/* Poster */}
                  <div className="relative h-[320px] sm:h-[340px] w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="px-4 pb-4 pt-3">
                    <h3 className="text-sm font-semibold leading-snug text-zinc-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-zinc-500">
                      {item.price}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* dots खाली */}
          <div className="mt-3 flex justify-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === active ? "w-6 bg-zinc-900" : "w-2 bg-zinc-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========= DESKTOP UI (lg+) – तुझं जुने hero जसंच्या तसं ========= */}
      <section className="relative hidden w-full overflow-hidden bg-gradient-to-r from-[#d9d8df] via-[#ebe7ef] to-[#f6f3f6] px-12 py-20 lg:flex">
        {/* LEFT SIDE TEXT + LEFT ARROW */}
        <div className="relative flex-1 pl-20">
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-black hover:text-zinc-800"
          >
            ‹
          </button>

          <p className="text-sm font-medium text-zinc-700">{slide.dateTime}</p>

          <h1 className="mt-4 text-5xl font-bold leading-tight text-zinc-900">
            {slide.title}
          </h1>

          <p className="mt-4 text-lg font-medium text-zinc-700">
            {slide.location}
          </p>

          <p className="mt-8 text-lg font-semibold text-zinc-900">
            {slide.price}
          </p>

          <button className="mt-6 rounded-full bg-black px-10 py-3 text-sm font-semibold text-white shadow-xl hover:bg-zinc-900">
            Book tickets
          </button>
        </div>

        {/* RIGHT SIDE IMAGE + RIGHT ARROW */}
        <div className="relative flex flex-1 justify-center pr-16">
          <div className="overflow-hidden rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.3)]">
            <div className="relative h-[430px] w-[320px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-black hover:text-zinc-800"
          >
            ›
          </button>
        </div>

        {/* DOTS */}
        <div className="absolute bottom-10 flex w-full justify-center gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={
                idx === active
                  ? "h-2 w-8 rounded-full bg-black"
                  : "h-2 w-2 rounded-full bg-zinc-400"
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
