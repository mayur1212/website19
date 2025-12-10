"use client";

import Image from "next/image";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

/* ===========================================================
   ⭐ USE EVENTHERO'S SLIDES WITH FULL DATA + IDs
   =========================================================== */
const SLIDES = [
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

/* ===========================================================
   CATEGORY TITLES ONLY (hero now uses SLIDES instead)
   =========================================================== */
const CATEGORY_INFO: any = {
  "social-mixers": "Social Mixers",
  comedy: "Comedy Shows",
  music: "Music Events",
  nightlife: "Nightlife Events",
  sports: "Sports Events",
  "food-drinks": "Food & Drinks Events",
  performances: "All Performances",
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = React.use(params);
  const router = useRouter();

  const categoryTitle = CATEGORY_INFO[category];

  if (!categoryTitle)
    return (
      <div className="p-10 text-center text-lg text-gray-600 min-h-screen bg-black text-white">
        Category "{category}" not found.
      </div>
    );

  /* HERO SLIDER STATE */
  const [index, setIndex] = React.useState(0);
  const slide = SLIDES[index];

  const goNext = () => setIndex((i) => (i + 1) % SLIDES.length);
  const goPrev = () => setIndex((i) => (i === 0 ? SLIDES.length - 1 : i - 1));

  React.useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, []);

  /* ⭐ Navigate to active event */
  const openEventDetail = () => {
    router.push(`/events/${slide.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      {/* ===========================================================
          HERO SECTION (DESKTOP + MOBILE SAME AS EVENT HERO)
          Entire section clickable except Book button
      =========================================================== */}
      <section
        className="relative w-full cursor-pointer"
        onClick={openEventDetail}
      >
        {/* ------------------------------------------------------------------ */}
        {/* DESKTOP HERO */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden lg:block relative w-full h-[520px] overflow-hidden rounded-b-[40px]">

          {/* BLURRED BACKGROUND */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-bg-desktop"}
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
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20"
          >
            ←
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20"
          >
            →
          </button>

          {/* MAIN DESKTOP CONTENT */}
          <div className="relative z-10 mx-auto w-[90%] h-full flex items-center justify-between px-14">

            {/* TEXT AREA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-text-desktop"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <p className="text-sm font-medium text-black/70">{slide.dateTime}</p>

                <h1 className="mt-5 text-4xl font-bold text-black leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-4 text-lg font-medium text-black/70">{slide.location}</p>

                <p className="mt-8 text-base font-semibold text-black">{slide.price}</p>

                {/* BOOK BUTTON (should NOT navigate) */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 rounded-full bg-black px-10 py-4.5 text-white shadow-lg hover:bg-zinc-900"
                >
                  Book tickets
                </button>
              </motion.div>
            </AnimatePresence>

            {/* POSTER IMAGE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-image-desktop"}
                initial={{ opacity: 0, scale: 0.8, x: 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -60 }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-1 justify-end"
              >
                <div className="overflow-hidden rounded-3xl shadow-2xl bg-black/10">
                  <div className="relative h-[420px] w-[300px]">
                    <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DOTS */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {SLIDES.map((s, i) => (
              <button
                key={"dot-" + s.id}
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

        {/* ------------------------------------------------------------------ */}
        {/* MOBILE HERO — DIRECT COPY OF EVENT HERO MOBILE */}
        {/* ------------------------------------------------------------------ */}
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

          {/* POSTER */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-poster-mobile"}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="mx-auto rounded-2xl overflow-hidden shadow-xl w-[85%]"
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image src={slide.image} alt={slide.title} fill className="object-contain bg-black" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* TEXT */}
          <div className="px-5 mt-4">
            <p className="text-sm text-black font-medium">{slide.dateTime}</p>
            <h1 className="mt-2 text-2xl font-bold text-black leading-snug">{slide.title}</h1>
            <p className="mt-1 text-[15px] text-black/80 font-medium">{slide.location}</p>
            <p className="mt-3 text-lg font-semibold text-black">{slide.price}</p>

            {/* BOOK BUTTON */}
            <button
              onClick={(e) => e.stopPropagation()}
              className="mt-4 w-full bg-black text-white py-3 rounded-xl font-semibold shadow-md"
            >
              Book Tickets
            </button>
          </div>

          {/* DOTS */}
          <div className="mt-4 flex justify-center gap-2 pb-4">
            {SLIDES.map((s, i) => (
              <button
                key={"mobiledot-" + s.id}
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

      {/* =============================================================== */}
      {/* REST OF PAGE: CARDS (your original code untouched) */}
      {/* =============================================================== */}
      <div className="px-6 sm:px-10 lg:px-20 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">{categoryTitle}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {SLIDES.map((item, i) => (
            <div
              key={i}
              onClick={() => router.push(`/events/${item.id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                         border border-gray-200 hover:shadow-xl overflow-hidden transition-all duration-300
                         hover:scale-[1.02]"
            >
              <div className="relative h-[340px] sm:h-[360px]">
                <Image src={item.image} alt="event" fill className="object-cover" />
              </div>

              <div className="p-5">
                <p className="text-xs font-medium text-gray-500">{item.dateTime}</p>
                <h3 className="text-lg font-semibold text-black mt-1 leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.location}</p>
                <p className="text-[15px] font-bold text-black mt-3">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
