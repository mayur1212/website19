"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EventSlide = {
  id: number;
  dateTime: string;
  title: string;
  location: string;
  price: string;
  image: string;
};

const SLIDES: EventSlide[] = [
  {
    id: 1,
    dateTime: "Sat, 20 Dec, 7:00 PM",
    title: "A.R. Rahman - Harmony of Hearts | New Delhi",
    location: "Indira Gandhi Indoor Stadium, Delhi/NCR",
    price: "₹999 onwards",
    image: "/movies/d1.jpg",
  },
  {
    id: 2,
    dateTime: "Sun, 21 Dec, 8:00 PM",
    title: "Live Symphony Night | Mumbai",
    location: "Jio World Convention Centre, Mumbai",
    price: "₹1,499 onwards",
    image: "/movies/d2.jpg",
  },
  {
    id: 3,
    dateTime: "Mon, 22 Dec, 6:30 PM",
    title: "Arijit Singh Live Concert | Pune",
    location: "Balewadi Stadium, Pune",
    price: "₹2,199 onwards",
    image: "/movies/d3.jpg",
  },
];

export default function EventHero() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  // Auto-slide
  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const goNext = () => setActive((i) => (i + 1) % SLIDES.length);
  const goPrev = () =>
    setActive((i) => (i === 0 ? SLIDES.length - 1 : i - 1));

  return (
    <section className="relative w-full">

      {/* ========================================================= */}
      {/* ⭐ DESKTOP HERO (unchanged) */}
      {/* ========================================================= */}
      <div className="hidden lg:block relative w-full h-[520px] overflow-hidden rounded-b-[40px]">

        {/* BLURRED BACKGROUND */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover scale-125 blur-[70px] opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white"></div>
          </motion.div>
        </AnimatePresence>

        {/* LEFT ARROW */}
        <button
          onClick={goPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
        >
          <ChevronLeft className="w-7 h-7 text-black" />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={goNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
        >
          <ChevronRight className="w-7 h-7 text-black" />
        </button>

        {/* MAIN CONTENT (unchanged desktop layout) */}
        <div className="relative z-10 mx-auto w-[90%] h-full flex items-center justify-between px-14">

          {/* TEXT SIDE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-text"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <p className="text-sm font-medium text-black/70">
                {slide.dateTime}
              </p>

              <h1 className="mt-5 text-4xl font-bold text-black leading-tight">
                {slide.title}
              </h1>

              <p className="mt-4 text-lg font-medium text-black/70">
                {slide.location}
              </p>

              <p className="mt-8 text-base font-semibold text-black">
                {slide.price}
              </p>

              <button className="mt-5 rounded-full bg-black px-10 py-4.5 text-white shadow-lg hover:bg-zinc-900">
                Book tickets
              </button>
            </motion.div>
          </AnimatePresence>

          {/* IMAGE CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-image"}
              initial={{ opacity: 0, scale: 0.8, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -60 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex flex-1 justify-end"
            >
              <div className="overflow-hidden rounded-3xl shadow-2xl bg-black/10">
                <div className="relative h-[420px] w-[300px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* PROGRESS DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {SLIDES.map((s, index) => (
            <button
              key={"bigdot-" + s.id}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all ${
                active === index ? "w-6 bg-black" : "w-1.5 bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ⭐ MOBILE HERO (H2 — Same Animations + Stacked Layout) */}
      {/* ========================================================= */}
      <div className="lg:hidden w-full mt-4 relative">

        {/* BLURRED BACKGROUND */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-bg-mobile"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 -z-10"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover blur-xl scale-125 opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/70 to-white"></div>
          </motion.div>
        </AnimatePresence>

        {/* IMAGE CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-image-mobile"}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="mx-auto rounded-2xl overflow-hidden shadow-xl w-[85%]"
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
  <Image
    src={slide.image}
    alt={slide.title}
    fill
    className="object-contain bg-black"
  />
</div>

          </motion.div>
        </AnimatePresence>

        {/* TEXT */}
        {/* TEXT (High Contrast for Mobile) */}
<div className="px-5 mt-4">

  <p className="text-sm text-black font-medium">
    {slide.dateTime}
  </p>

  <h1 className="mt-2 text-2xl font-bold text-black leading-snug">
    {slide.title}
  </h1>

  <p className="mt-1 text-[15px] text-black/80 font-medium">
    {slide.location}
  </p>

  <p className="mt-3 text-lg font-semibold text-black">
    {slide.price}
  </p>

  <button className="mt-4 w-full bg-black text-white py-3 rounded-xl font-semibold shadow-md">
    Book Tickets
  </button>
</div>


        {/* PROGRESS DOTS */}
        <div className="mt-4 flex justify-center gap-2 pb-4">
          {SLIDES.map((s, index) => (
            <button
              key={"mobiledot-" + s.id}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all ${
                active === index ? "w-6 bg-black" : "w-1.5 bg-zinc-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
