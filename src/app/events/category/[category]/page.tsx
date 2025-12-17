"use client";

import Image from "next/image";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

/* ===========================================================
   CATEGORY NAMES (Must be declared BEFORE usage)
   =========================================================== */
const CATEGORY_INFO: Record<string, string> = {
  "social-mixers": "Social Mixers",
  comedy: "Comedy Shows",
  music: "Music Events",
  nightlife: "Nightlife Events",
  sports: "Sports Events",
  "food-drinks": "Food & Drinks Events",
  performances: "All Performances",
  "fests-fairs": "Fests & Fairs",
};

/* ===========================================================
   SLIDES
   =========================================================== */
const SLIDES = [
  {
    id: 1,
    dateTime: "Sat, 20 Dec, 7:00 PM",
    title: "A.R. Rahman - Harmony of Hearts | New Delhi",
    location: "Indira Gandhi Indoor Stadium, Delhi/NCR",
    price: "₹999 onwards",
    image: "/movies/d1.jpg",
    bookLink: "/events/1",
  },
  {
    id: 2,
    dateTime: "Sun, 21 Dec, 8:00 PM",
    title: "Live Symphony Night | Mumbai",
    location: "Jio World Convention Centre, Mumbai",
    price: "₹1,499 onwards",
    image: "/movies/d2.jpg",
    bookLink: "/events/2",
  },
  {
    id: 3,
    dateTime: "Mon, 22 Dec, 6:30 PM",
    title: "Arijit Singh Live Concert | Pune",
    location: "Balewadi Stadium, Pune",
    price: "₹2,199 onwards",
    image: "/movies/d3.jpg",
    bookLink: "/events/3",
  },
];

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = React.use(params);
  const router = useRouter();

  const categoryTitle = CATEGORY_INFO[category];

  if (!categoryTitle)
    return (
      <div className="p-10 text-center text-lg min-h-screen bg-black text-white">
        Category "{category}" not found.
      </div>
    );

  /* ===========================================================
     SLIDER STATE
     =========================================================== */
  const [index, setIndex] = React.useState(0);
  const slide = SLIDES[index];

  const goNext = () => setIndex((i) => (i + 1) % SLIDES.length);
  const goPrev = () => setIndex((i) => (i === 0 ? SLIDES.length - 1 : i - 1));

  React.useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, []);

  /* ⭐ CLICK ON HERO → OPEN EVENT DETAILS */
  const openEventDetails = () => {
    router.push(`/events/${slide.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      {/* ===========================================================
          HERO SECTION (FULL CLICKABLE)
      =========================================================== */}
      <section
        className="relative w-full cursor-pointer"
        onClick={openEventDetails}
      >
        {/* DESKTOP HERO */}
        <div className="hidden lg:flex relative w-full min-h-[600px] items-center overflow-hidden px-8 py-10 md:px-16">

          {/* BACKGROUND */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-bg-desktop"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 pointer-events-none"
            >
              <Image
                src={slide.image}
                alt="bg"
                fill
                className="object-cover blur-[24px] scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white" />
            </motion.div>
          </AnimatePresence>

          {/* LEFT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent detail page routing
              goPrev();
            }}
            className="absolute left-12 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition"
          >
            <span className="text-3xl font-bold text-zinc-900">‹</span>
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-12 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition"
          >
            <span className="text-3xl font-bold text-zinc-900">›</span>
          </button>

          {/* MAIN CONTENT */}
          <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-10">

            {/* TEXT */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-text"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="flex-1 md:max-w-lg"
              >
                <p className="text-[16px] text-zinc-700">{slide.dateTime}</p>
                <h1 className="text-[44px] font-semibold tracking-tight text-zinc-900 mt-2">
                  {slide.title}
                </h1>
                <p className="mt-3 text-[18px] text-zinc-700">{slide.location}</p>
                <p className="mt-3 text-[20px] font-semibold text-black">
                  {slide.price}
                </p>

                {/* BOOK — STOP NAVIGATION */}
                
                <button
  onClick={(e) => {
    e.stopPropagation();
    router.push(slide.bookLink);   // ⭐ Navigate correctly
  }}
  className="mt-6 w-[180px] rounded-full bg-black px-8 py-3 text-[16px] font-semibold text-white hover:bg-zinc-900"
>
  Book Tickets
</button>

              </motion.div>
            </AnimatePresence>

            {/* POSTER CARD (MOVIE STYLE) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-poster"}
                initial={{ opacity: 0, scale: 0.8, x: 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -60 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex-1 flex justify-end"
              >
                <div className="relative h-[420px] w-[300px] rounded-3xl overflow-hidden shadow-2xl bg-black/10">
                  <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DOTS */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={(e) => {
                  e.stopPropagation(); // prevent click to details
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === i ? "w-8 bg-black" : "w-2 bg-zinc-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* MOBILE HERO */}
        <div className="lg:hidden w-full mt-4 relative">

          {/* BACKGROUND */}
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
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/70 to-white" />
            </motion.div>
          </AnimatePresence>

          {/* MOBILE POSTER */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-poster-mobile"}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-[85%] rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
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
          <div className="px-5 mt-4">
            <p className="text-sm text-black font-medium">{slide.dateTime}</p>
            <h1 className="mt-2 text-2xl font-bold leading-snug">{slide.title}</h1>
            <p className="text-[15px] text-black/80">{slide.location}</p>
            <p className="mt-3 text-lg text-black font-semibold">{slide.price}</p>

            {/* STOP EVENT NAVIGATION */}
            <button
  onClick={(e) => {
    e.stopPropagation();
    router.push(slide.bookLink);  // ⭐ Navigate correctly
  }}
  className="mt-4 w-full bg-black text-white py-3 rounded-xl font-semibold shadow-md"
>
  Book Tickets
</button>

          </div>

          {/* DOTS */}
          <div className="mt-3 flex justify-center gap-2 pb-4">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === i ? "w-6 bg-black" : "w-1.5 bg-zinc-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===========================================================
          EVENTS GRID
      =========================================================== */}
      <div className="px-6 sm:px-10 lg:px-20 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
          {categoryTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {SLIDES.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/events/${item.id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl overflow-hidden transition-all hover:scale-[1.02]"
            >
              <div className="relative h-[340px] sm:h-[360px]">
                <Image src={item.image} alt="event" fill className="object-cover" />
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-500">{item.dateTime}</p>
                <h3 className="text-lg font-semibold text-black mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.location}</p>
                <p className="mt-3 text-[15px] text-black font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
