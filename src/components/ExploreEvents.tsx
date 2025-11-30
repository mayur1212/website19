"use client";

import Image from "next/image";

const EVENT_CATEGORIES = [
  { title: "Music", image: "/movies/githar.png" },
  { title: "Nightlife", image: "/movies/githar.png" },
  { title: "Comedy", image: "/movies/githar.png" },
  { title: "Sports", image: "/movies/githar.png" },
  { title: "Performances", image: "/movies/githar.png" },
  { title: "Food & Drinks", image: "/movies/githar.png" },
  { title: "Fests & Fairs", image: "/movies/githar.png" },
  { title: "Social Mixers", image: "/movies/githar.png" },
  { title: "Fitness", image: "/movies/githar.png" },
  { title: "Pets", image: "/movies/githar.png" },
  { title: "Art Exhibitions", image: "/movies/githar.png" },
  { title: "Conferences", image: "/movies/githar.png" },
  { title: "Expos", image: "/movies/githar.png" },
  { title: "Open Mics", image: "/movies/githar.png" },
];

export default function ExploreEvents() {
  return (
    <section className="w-full py-10 flex justify-center">
      <div className="w-[80%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">

        {EVENT_CATEGORIES.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl p-5 bg-gradient-to-b from-[#fff9db] to-[#ffeaa7] shadow-md border border-yellow-200 flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="h-24 w-24 relative mb-3">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
