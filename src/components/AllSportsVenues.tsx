"use client";

import Image from "next/image";

const FILTERS = [
  "Filters",
  "Under 5 km",
  "Badminton",
  "Box Cricket",
  "Pickleball",
  "Turf Football",
];

type Venue = {
  id: number;
  name: string;
  distance: string;
  city: string;
  image: string;
  tags: string[];
};

const VENUES: Venue[] = [
  {
    id: 1,
    name: "Alpha49 Sports",
    distance: "1.4 km",
    city: "Gurugram",
    image: "/sports-venues/alpha49.jpg",
    tags: ["Pickleball"],
  },
  {
    id: 2,
    name: "Champions Cave Box Cricket",
    distance: "1.4 km",
    city: "Gurugram",
    image: "/sports-venues/champions-cave.jpg",
    tags: ["Box Cricket"],
  },
  {
    id: 3,
    name: "Young Leaders Pickleball Club",
    distance: "2.1 km",
    city: "Gurugram",
    image: "/sports-venues/young-leaders.jpg",
    tags: ["Pickleball"],
  },
  {
    id: 4,
    name: "Coppa Play",
    distance: "2.1 km",
    city: "Gurugram",
    image: "/sports-venues/coppa-play.jpg",
    tags: ["Pickleball", "Padel"],
  },
  {
    id: 5,
    name: "Vana Greens | Gurgaon",
    distance: "2.0 km",
    city: "Gurugram",
    image: "/sports-venues/vana-greens.jpg",
    tags: ["Tennis"],
  },
  {
    id: 6,
    name: "Skyline Pickleball Courts",
    distance: "2.3 km",
    city: "Gurugram",
    image: "/sports-venues/skyline.jpg",
    tags: ["Pickleball"],
  },
  {
    id: 7,
    name: "Hozhyo Sports and Cafe",
    distance: "3.0 km",
    city: "Gurugram",
    image: "/sports-venues/hozhyo.jpg",
    tags: ["Turf Football"],
  },
  {
    id: 8,
    name: "Super Kings Academy by Push",
    distance: "3.2 km",
    city: "Gurugram",
    image: "/sports-venues/super-kings.jpg",
    tags: ["Cricket"],
  },
];

export default function AllSportsVenues() {
  return (
    <section className="w-full flex justify-center bg-white py-10">
      {/* 80% width center container */}
      <div className="w-[80%] max-w-6xl">
        {/* Heading */}
        <h1 className="text-[28px] md:text-[32px] font-semibold text-zinc-900">
          All Sports Venues
        </h1>

        {/* Filter row */}
        <div
          className="
            mt-6 mb-8 flex items-center gap-3
            overflow-x-auto whitespace-nowrap no-scrollbar
            lg:flex-wrap lg:overflow-visible lg:whitespace-normal
          "
        >
          {FILTERS.map((label, index) => {
            const isFilters = index === 0;
            return (
              <button
                key={label}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                  isFilters
                    ? "border-zinc-300 bg-white text-zinc-900 shadow-sm"
                    : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400",
                ].join(" ")}
              >
                {isFilters && (
                  <span className="text-lg leading-none">⚙️</span>
                )}
                <span>{label}</span>
                {isFilters && (
                  <span className="text-xs leading-none">▼</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Venues grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VENUES.map((venue) => (
            <article
              key={venue.id}
              className="overflow-hidden rounded-[26px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] cursor-pointer transition-transform transition-shadow hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
            >
              {/* Image */}
              <div className="relative h-[220px] w-full sm:h-[230px] lg:h-[240px]">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text block */}
              <div className="px-4 pb-4 pt-4">
                <h3 className="text-[15px] font-semibold leading-snug text-zinc-900">
                  {venue.name}
                </h3>

                <p className="mt-1 text-xs text-zinc-600">
                  {venue.distance} • {venue.city}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {venue.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
