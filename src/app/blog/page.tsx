"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* =====================================================
   BLOG LIST DATA (SLUGS MUST MATCH DETAIL PAGE)
===================================================== */

type BlogItem = {
  type: "image" | "text";
  slug: string;
  category: string;
  title: string;
  image?: string;
  description?: string;
  span?: string;
};

const BLOG_ITEMS: BlogItem[] = [
  {
    type: "image",
    slug: "hayya-vision",
    category: "HAYYA",
    title: "Hayya — A New Way to Discover Life Around You",
    image: "/movies/timeless.jpg",
    span: "row-span-2",
  },
  {
    type: "text",
    slug: "about-hayya",
    category: "ABOUT",
    title: "What is Hayya?",
    description:
      "Hayya is a discovery platform designed for people who value experiences.",
  },
  {
    type: "image",
    slug: "kantara-impact",
    category: "MOVIES",
    title: "Why Kantara Became a Cultural Moment",
    image: "/movies/kantara.jpg",
  },
  {
    type: "image",
    slug: "city-nightlife",
    category: "EVENTS",
    title: "How Night Events Are Redefining City Culture",
    image: "/movies/night1.jpg",
  },
  {
    type: "text",
    slug: "curation-philosophy",
    category: "EDITORIAL",
    title: "Curated, Not Crowded",
    description:
      "Hayya believes discovery should feel calm and inspiring.",
  },
  {
    type: "image",
    slug: "poster-art",
    category: "MOVIES",
    title: "Movie Posters That Defined an Era",
    image: "/movies/poster.2.jpeg",
  },
  {
    type: "image",
    slug: "hidden-cafes",
    category: "DINING",
    title: "Hidden Cafés Locals Don’t Want You to Know",
    image: "/movies/night2.png",
  },
  {
    type: "text",
    slug: "why-hayya-matters",
    category: "VISION",
    title: "Why Hayya Matters Today",
    description:
      "In a world of endless scrolling, Hayya simplifies discovery.",
  },
  {
    type: "image",
    slug: "cinema-experience",
    category: "LIFESTYLE",
    title: "Why Cinema Still Feels Magical",
    image: "/movies/poster.4.jpeg",
  },
];

/* =====================================================
   ANIMATIONS
===================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* =====================================================
   PAGE
===================================================== */

export default function BlogPage() {
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleBlogs = BLOG_ITEMS.slice(0, visibleCount);
  const hasMore = visibleCount < BLOG_ITEMS.length;

  return (
    <>
      <Header />

      <main className="bg-white overflow-hidden">
        {/* ================= HERO ================= */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h1 className="text-5xl font-bold text-black">
              Hayya Journal
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-600">
              Stories, editorials, and curated guides around movies,
              events, dining, and modern experiences.
            </p>
          </motion.div>

          {/* ================= GRID ================= */}
          <div className="grid auto-rows-[280px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBlogs.map((item, index) => (
              <motion.div
                key={item.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={item.span ?? ""}
              >
                <Link
                  href={`/blog/${item.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
                >
                  {item.type === "image" && item.image ? (
                    <div className="relative h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 p-7 text-white">
                        <span className="text-xs uppercase tracking-widest opacity-80">
                          {item.category}
                        </span>
                        <h2 className="mt-2 text-xl font-semibold leading-snug">
                          {item.title}
                        </h2>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-center p-8">
                      <span className="text-xs uppercase tracking-widest text-gray-400">
                        {item.category}
                      </span>
                      <h2 className="mt-3 text-2xl font-semibold text-black">
                        {item.title}
                      </h2>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="mt-8 text-sm font-medium text-black underline underline-offset-4">
                        Read article
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ================= LOAD MORE ================= */}
          {hasMore && (
            <div className="mt-20 flex justify-center">
              <button
                onClick={() => setVisibleCount(BLOG_ITEMS.length)}
                className="rounded-full border border-black px-10 py-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Load more stories
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
