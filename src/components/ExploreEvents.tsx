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
    <section className="w-[100%] py-10 flex flex-col items-center mx-auto">

      {/* ⭐ Explore Events heading */}
      <h2 className="w-[80%] text-left text-2xl sm:text-3xl font-bold text-black mb-6">
        Explore Events
      </h2>

      {/* CATEGORY CARDS */}
      <div
        className="w-[80%] 
                   grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                   lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-auto"
      >
        {EVENT_CATEGORIES.map((item, index) => (
          <Link
            key={index}
            href={`/events/category/${item.slug}`}
            className="rounded-3xl p-5 bg-gradient-to-b from-[#fff9db] to-[#ffeaa7]
                       shadow-md border border-yellow-200 flex flex-col items-center justify-center
                       hover:shadow-xl transition cursor-pointer"
          >
            <div className="h-29 w-29 relative mb-3">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            <p className="mt-1 text-sm font-semibold text-black">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
