"use client";

import Image from "next/image";
import Link from "next/link";

const EVENT_CATEGORIES = [
  { title: "Music", slug: "music", image: "/movies/githar.png" },
  { title: "Nightlife", slug: "nightlife", image: "/movies/githar.png" },
  { title: "Comedy", slug: "comedy", image: "/movies/githar.png" },
  { title: "Sports", slug: "sports", image: "/movies/githar.png" },
  { title: "Performances", slug: "performances", image: "/movies/githar.png" },
  { title: "Food & Drinks", slug: "food-drinks", image: "/movies/githar.png" },
  { title: "Fests & Fairs", slug: "fests-fairs", image: "/movies/githar.png" },
  { title: "Social Mixers", slug: "social-mixers", image: "/movies/githar.png" },
];

export default function ExploreEvents() {
  return (
    <section className="w-full py-8 flex flex-col items-center mx-auto">

      {/* HEADING */}
      <h2 className="w-[90%] sm:w-[80%] text-left text-xl sm:text-3xl font-bold text-black mb-6">
        Explore Events
      </h2>

      {/* CATEGORY GRID */}
      <div
        className="
          w-full sm:w-[80%]

          /* MOBILE */
          grid grid-rows-2 grid-flow-col
          gap-3
          overflow-x-auto
          px-4
          snap-x snap-mandatory
          scrollbar-hide

          /* DESKTOP */
          sm:grid-rows-none
          sm:grid-flow-row
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-8
          sm:gap-6
          sm:overflow-visible
          sm:px-0
        "
      >
        {EVENT_CATEGORIES.map((item, index) => (
          <Link
            key={index}
            href={`/events/category/${item.slug}`}
            className="
              /* MOBILE SIZE */
              min-w-[118px]
              px-3 py-4

              /* DESKTOP SIZE */
              sm:min-w-0
              sm:px-4 sm:py-6

              snap-start
              rounded-2xl
              bg-gradient-to-b from-[#fff9db] to-[#ffeaa7]
              border border-yellow-200

              flex flex-col items-center justify-center
              transition hover:scale-[1.03]
            "
          >
            {/* ICON */}
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 mb-3">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            {/* TITLE */}
            <p className="text-[13px] sm:text-sm font-semibold text-black text-center leading-tight">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
