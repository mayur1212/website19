"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* =======================
   DATA
======================= */
type Slide = {
  id: number;
  dateTime: string;
  title: string;
  location: string;
  price: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    dateTime: "Daily, Multiple slots",
    title: "The Game Palacio | Delhi Ansal Plaza",
    location: "The Game Palacio, Delhi/NCR",
    price: "₹650 onwards",
    image: "/event/consoleevent.png",
  },
  {
    id: 2,
    dateTime: "Everyday, Multiple slots",
    title: "Smaaash | Cyber Hub",
    location: "Smaaash, DLF Cyber Hub, Gurugram",
    price: "₹799 onwards",
    image: "/event/happyevent.png",
  },
  {
    id: 3,
    dateTime: "Daily, Multiple slots",
    title: "The Game Palacio | Delhi Ansal Plaza",
    location: "The Game Palacio, Delhi/NCR",
    price: "₹650 onwards",
    image: "/event/timezoneevent.png",
  },
  {
    id: 4,
    dateTime: "Everyday, Multiple slots",
    title: "Smaaash | Cyber Hub",
    location: "Smaaash, DLF Cyber Hub, Gurugram",
    price: "₹799 onwards",
    image: "/event/timezoneevent.png",
  },
];

/* =======================
   COMPONENT
======================= */
export default function ActivitiesHero() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;
  const item = SLIDES[current];

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
    }, 4500);
    return () => clearInterval(id);
  }, [total]);

  const goNext = () => setCurrent((p) => (p + 1) % total);
  const goPrev = () => setCurrent((p) => (p - 1 + total) % total);

  return (
    <>
      {/* ================= MOBILE / TABLET ================= */}
      <section className="w-full bg-[#f4f9ff] px-4 py-6 md:py-8 lg:hidden">
        <div className="mx-auto w-full max-w-md">
          <h2 className="mb-3 text-[18px] font-semibold text-zinc-900">
            In the spotlight
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="relative h-[260px] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="px-4 py-3">
                <h3 className="text-[16px] font-semibold text-zinc-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] text-zinc-500">
                  {item.dateTime}
                </p>
                <p className="mt-1 text-[13px] text-zinc-600">
                  {item.location}
                </p>

                <div className="mt-2 text-sm font-semibold text-zinc-900">
                  {item.price}
                </div>

                <button className="mt-3 inline-flex rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
                  Book Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === current ? "w-6 bg-black" : "w-2 bg-zinc-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= DESKTOP ================= */}
      <section className="relative hidden min-h-[600px] overflow-hidden px-8 py-10 md:px-16 lg:flex">
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="scale-110 object-cover blur-[24px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white" />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-12 top-1/2 z-20 -translate-y-1/2 transition hover:scale-110"
        >
          <ChevronLeft className="h-7 w-7 text-zinc-900" />
        </button>

        <button
          onClick={goNext}
          className="absolute right-12 top-1/2 z-20 -translate-y-1/2 transition hover:scale-110"
        >
          <ChevronRight className="h-7 w-7 text-zinc-900" />
        </button>

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center gap-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + "-text"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-lg"
            >
              <h1 className="text-[44px] font-semibold text-zinc-900">
                {item.title}
              </h1>
              <p className="mt-3 text-[18px] text-zinc-700">
                {item.dateTime}
              </p>
              <p className="mt-1 text-[18px] text-zinc-700">
                {item.location}
              </p>

              <div className="mt-3 text-[20px] font-semibold">
                {item.price}
              </div>

              <button className="mt-6 w-[180px] rounded-full bg-black px-8 py-3 text-white">
                Book Now
              </button>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + "-image"}
              initial={{ opacity: 0, scale: 0.8, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -60 }}
              transition={{ duration: 0.7 }}
              className="flex flex-1 justify-end"
            >
              <div className="relative h-[420px] w-[300px] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop dots */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === current ? "w-8 bg-black" : "w-2 bg-zinc-300"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
