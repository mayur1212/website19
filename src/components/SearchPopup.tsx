"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Category = "All" | "Dining" | "Events" | "Movies" | "Activities";

type SearchItem = {
  title: string;
  type: string;
  image: string;
};

const CATEGORIES: Category[] = ["All", "Dining", "Events", "Movies", "Activities"];

const SAMPLE_DATA: Record<Category, SearchItem[]> = {
  Dining: [
    { title: "Starbucks Coffee", type: "Restaurant", image: "/movies/a1.jpg" },
    { title: "The Studs", type: "Restaurant", image: "/movies/a2.jpg" },
  ],
  Movies: [
    { title: "Avatar: Fire and Ash", type: "Movie", image: "/movies/a3.jpg" },
    { title: "Kis Kisko Pyaar Karoon 2", type: "Movie", image: "/movies/a4.jpg" },
  ],
  Events: [
    { title: "Hamleys Wonderland", type: "Event", image: "/movies/a5.jpg" },
    { title: "Jubin Nautiyal Live | Mumbai", type: "Event", image: "/movies/a6.jpg" },
  ],
  Activities: [
    { title: "Hempresso Sativa", type: "Activity", image: "/movies/a7.jpg" },
  ],
  All: [],
};

SAMPLE_DATA.All = [
  ...SAMPLE_DATA.Dining,
  ...SAMPLE_DATA.Movies,
  ...SAMPLE_DATA.Events,
  ...SAMPLE_DATA.Activities,
];

export default function SearchPopup({
  onClose,
  activeTab: initialTab = "All",
}: {
  onClose: () => void;
  activeTab: Category;
}) {
  // ⭐ Active Tab Controlled by Header
  const [activeTab, setActiveTab] = useState<Category>(initialTab);

  // When header sends a new tab, update popup tab
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter results based on tab + search text
  const filteredList: SearchItem[] = SAMPLE_DATA[activeTab].filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-3">

      {/* POPUP CARD */}
      <div
        className="
          w-full max-w-lg md:max-w-3xl 
          bg-white rounded-3xl shadow-xl 
          p-5 md:p-6 pt-14
          animate-fadeIn flex flex-col relative
        "
        style={{
          height: "78vh",
          maxHeight: "620px",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-black text-2xl font-bold hover:scale-110 transition"
        >
          ×
        </button>

        {/* SEARCH BAR */}
        <div className="mb-3 md:mb-4">
          <input
            className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-black text-sm focus:outline-none"
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center justify-between border-b pb-3 mb-3 md:gap-4 md:justify-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-semibold transition-all
                ${activeTab === cat ? "bg-red-500 text-white" : "text-gray-600"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RESULTS AREA */}
        <div className="flex-1 overflow-y-auto pr-1 md:pr-2">
          <h3 className="font-semibold text-black mb-2">Trending in Mumbai</h3>

          {filteredList.length === 0 ? (
            <p className="text-gray-500 text-sm mt-4">No results found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredList.map((item: SearchItem, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  
                  {/* IMAGE */}
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="font-semibold text-black text-sm md:text-base">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
