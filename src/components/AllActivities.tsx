"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, Tag } from "lucide-react";

/* ================= TYPES ================= */

type Activity = {
  id: number;
  title: string;
  image: string;
  discountText: string;
  dateInfo: string;
  venue: string;
  location: string;
  category: string;
  dateTag: "Today" | "Tomorrow" | "Weekend";
  price: string;
};

/* ================= FILTER DATA ================= */

const SORT_OPTIONS = [
  "Popularity",
  "Price: Low to High",
  "Price: High to Low",
  "Date",
  "Distance: Near to Far",
];

const GENRES = [
  "Bowling",
  "Acting Workshops",
  "Adventure",
  "Adventure Parks",
  "Arcades",
  "Art & Craft Workshops",
  "Art Exhibitions",
  "Attractions",
  "Baking",
  "Beach Activities",
];

const QUICK_CHIPS = [
  "Under 5 km",
  "Bowling",
  "Today",
  "Tomorrow",
  "This Weekend",
  "Game Zones",
  "Workshops",
];

/* ================= ACTIVITIES ================= */

const ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "F9 Go Karting | Sector 18",
    image: "/movies/c1.jpg",
    discountText: "20% off up to ₹150",
    dateInfo: "Today, Multiple slots",
    venue: "F9 Go Karting, Gurugram",
    location: "Gurugram",
    category: "Bowling",
    dateTag: "Today",
    price: "₹750 onwards",
  },
  {
    id: 2,
    title: "Sky Jumper Trampoline Park",
    image: "/movies/c2.png",
    discountText: "50% off up to ₹300",
    dateInfo: "Tomorrow, Multiple slots",
    venue: "SkyJumper – ILD",
    location: "Gurugram",
    category: "Workshops",
    dateTag: "Tomorrow",
    price: "₹490 onwards",
  },
  {
    id: 3,
    title: "ISKATE by Roseate",
    image: "/movies/c3.jpg",
    discountText: "50% off up to ₹300",
    dateInfo: "This Weekend",
    venue: "ISKATE by Roseate",
    location: "Gurugram",
    category: "Art & Craft Workshops",
    dateTag: "Weekend",
    price: "₹900 onwards",
  },
  {
    id: 4,
    title: "The Game Palacio | Delhi Ansal Plaza",
    image: "/movies/c4.png",
    discountText: "50% off up to ₹300",
    dateInfo: "Daily, Multiple slots",
    venue: "The Game Palacio, Delhi/NCR",
    location: "Delhi/NCR",
    category: "Bowling",
    dateTag: "Today",
    price: "₹650 onwards",
  },
];

/* ================= COMPONENT ================= */

export default function AllActivities() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"Sort" | "Genre">("Sort");

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  /* ================= HELPERS ================= */

  const toggleQuick = (v: string) => {
    setQuickFilters(prev =>
      prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]
    );
  };

  // 🔥 ACTIVE CHIPS (jo Filters ke paas aayenge)
  const activeChips = [
    ...quickFilters,
    ...selectedGenres.filter(g => !quickFilters.includes(g)),
  ];

  /* ================= FILTER LOGIC ================= */

  const filteredActivities = ACTIVITIES.filter(a => {
    if (quickFilters.includes("Today") && a.dateTag !== "Today") return false;
    if (quickFilters.includes("Tomorrow") && a.dateTag !== "Tomorrow") return false;
    if (quickFilters.includes("This Weekend") && a.dateTag !== "Weekend") return false;

    if (
      selectedGenres.length > 0 &&
      !selectedGenres.includes(a.category)
    ) {
      return false;
    }

    return true;
  });

  /* ================= UI ================= */

  return (
    <section className="w-full bg-white px-4 py-10">
      <div className="mx-auto w-[85%]">

        <h2 className="text-2xl font-semibold mb-6">All Activities</h2>

        {/* ================= FILTER BAR ================= */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-8">

          {/* FILTER BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm bg-white shadow-sm flex-shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* SELECTED CHIPS (LEFT SIDE) */}
          {activeChips.map(chip => (
            <button
              key={`active-${chip}`}
              onClick={() => {
                if (quickFilters.includes(chip)) {
                  setQuickFilters(prev => prev.filter(x => x !== chip));
                } else {
                  setSelectedGenres(prev => prev.filter(x => x !== chip));
                }
              }}
              className="
                flex-shrink-0 px-4 py-2 rounded-lg border text-sm
                bg-[#eae5ff] border-[#7c3aed] text-[#4b1fa8]
              "
            >
              {chip}
            </button>
          ))}

          {/* DIVIDER */}
          <div className="h-6 w-px bg-zinc-300 mx-2 flex-shrink-0" />

          {/* UNSELECTED QUICK CHIPS (RIGHT SIDE) */}
          {QUICK_CHIPS.filter(c => !activeChips.includes(c)).map(c => (
            <button
              key={`quick-${c}`}
              onClick={() => toggleQuick(c)}
              className="
                flex-shrink-0 px-4 py-2 rounded-lg border text-sm
                bg-white border-zinc-300
              "
            >
              {c}
            </button>
          ))}
        </div>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredActivities.map(a => (
            <div
              key={a.id}
              className="rounded-[26px] bg-white shadow-md hover:-translate-y-1 transition"
            >
              <div className="relative h-[300px]">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover rounded-t-[26px]"
                />
              </div>

              <div className="bg-[#7047ff] text-white text-xs px-4 py-2 flex gap-2">
                <Tag className="h-4 w-4" />
                {a.discountText}
              </div>

              <div className="p-4">
                <p className="text-xs text-zinc-500">{a.dateInfo}</p>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-zinc-500">{a.venue}</p>
                <p className="font-semibold mt-2">{a.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= FILTER MODAL ================= */}
        {open && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl w-full max-w-4xl p-6">

              <h3 className="text-lg font-semibold mb-4">Filter by</h3>

              <div className="flex gap-6">
                {/* LEFT TABS */}
                <div className="w-44">
                  {["Sort", "Genre"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`block w-full text-left px-4 py-3 rounded-lg mb-1
                        ${activeTab === tab ? "bg-[#ede9fe]" : ""}`}
                    >
                      {tab === "Sort" ? "Sort By" : "Genre"}
                    </button>
                  ))}
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1 bg-zinc-50 rounded-2xl p-4 h-[360px] overflow-y-auto">
                  {activeTab === "Sort" &&
                    SORT_OPTIONS.map(s => (
                      <label key={s} className="flex items-center gap-3 py-2">
                        <input
                          type="radio"
                          name="sort"
                          checked={sortBy === s}
                          onChange={() => setSortBy(s)}
                        />
                        {s}
                      </label>
                    ))}

                  {activeTab === "Genre" &&
                    GENRES.map(g => (
                      <label key={g} className="flex items-center gap-3 py-2">
                        <input
                          type="checkbox"
                          checked={selectedGenres.includes(g)}
                          onChange={() =>
                            setSelectedGenres(prev =>
                              prev.includes(g)
                                ? prev.filter(x => x !== g)
                                : [...prev, g]
                            )
                          }
                        />
                        {g}
                      </label>
                    ))}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => {
                    setSortBy(null);
                    setSelectedGenres([]);
                    setQuickFilters([]);
                  }}
                  className="text-sm underline"
                >
                  Clear filters
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="bg-black text-white px-8 py-3 rounded-full"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
