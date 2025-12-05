"use client";

import Image from "next/image";

const SPORTS = [
  { id: 1, image: "/sports/badminton.png" },
  { id: 2, image: "/sports/turf-football.png" },
  { id: 3, image: "/sports/pickleball.png" },
  { id: 4, image: "/sports/box-cricket.png" },
  { id: 5, image: "/sports/tennis.png" },
  { id: 6, image: "/sports/cricket-nets.png" },
  { id: 7, image: "/sports/padel.png" },
  { id: 8, image: "/sports/football.png" },
  { id: 9, image: "/sports/cricket.png" },
  { id: 10, image: "/sports/basketball.png" },
  { id: 11, image: "/sports/table-tennis.png" },
];

export default function ExploreSports() {
  return (
    <section className="w-full flex justify-center py-10">
      {/* 80% wrapper */}
      <div className="w-[80%] px-4 md:px-6 lg:px-10">
        
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-zinc-900 md:text-3xl mb-6">
          Explore Sports
        </h2>

        {/* Cards container */}
        <div
          className="
            flex gap-4 overflow-x-auto pb-4 no-scrollbar
            md:grid md:grid-cols-4 md:gap-6 md:overflow-visible
            lg:grid-cols-6
          "
        >
          {SPORTS.map((sport) => (
            <div
              key={sport.id}
              className="
                shrink-0
                w-[120px] md:w-full
                rounded-[18px] bg-white border border-zinc-200
                shadow-sm hover:shadow-md transition-all
                flex items-center justify-center
                h-[150px] md:h-[170px]
              "
            >
              <div className="relative h-[90px] w-[90px]">
                <Image
                  src={sport.image}
                  alt="sport"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
