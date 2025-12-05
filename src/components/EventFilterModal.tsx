"use client";

import React, { useState, useEffect } from "react";

export default function EventFilterModal({
  open,
  onClose,
  selectedFilters,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  selectedFilters: string[];
  onApply: (filters: string[]) => void;
}) {
  const [tempFilters, setTempFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"sort" | "genre">("sort");

  // Load previously applied filters into modal
  useEffect(() => {
    if (open) {
      setTempFilters(selectedFilters.filter((f) => !f.includes("Price") && !f.includes("Date") && !f.includes("Popularity") && !f.includes("Near")));
      const foundSort = selectedFilters.find(
        (f) =>
          f.includes("Price") ||
          f.includes("Date") ||
          f.includes("Popularity") ||
          f.includes("Near")
      );
      setSelectedSort(foundSort || null);
      setActiveTab("sort");
    }
  }, [open, selectedFilters]);

  if (!open) return null;

  const SORT_OPTIONS = [
    "Date",
    "Popularity",
    "Price Low to High",
    "Price High to Low",
    "Near to Far",
  ];

  const GENRES = [
    "Acoustic",
    "Art Exhibitions",
    "Art Fairs",
    "Artist Showcase",
    "Beverage Tastings",
    "Bollywood Music",
    "Bollywood Night",
    "Business Conferences & Talks",
    "Career Fairs",
  ];

  // Toggle genre items
  const toggleGenre = (item: string) => {
    setTempFilters((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  // Apply filters → send to parent component
  const applyFilters = () => {
    const combined = [
      ...(selectedSort ? [selectedSort] : []),
      ...tempFilters,
    ];
    onApply(combined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[680px] rounded-2xl bg-white shadow-xl animate-slideUp p-6">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-600 hover:text-black text-[24px]"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-black mb-6">Filter by</h2>

        <div className="flex gap-4">

          {/* LEFT TABS */}
          <div className="w-[140px] flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("sort")}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-black 
                ${activeTab === "sort" ? "bg-purple-100" : "bg-zinc-200"}`}
            >
              Sort By
            </button>

            <button
              onClick={() => setActiveTab("genre")}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-black 
                ${activeTab === "genre" ? "bg-purple-100" : "bg-zinc-200"}`}
            >
              Genre
            </button>
          </div>

          {/* RIGHT CONTENT PANEL */}
          <div className="flex-1 bg-zinc-100 rounded-xl p-6 h-[350px] overflow-y-auto">

            {/* SORT OPTIONS */}
            {activeTab === "sort" && (
              <div className="space-y-4">
                {SORT_OPTIONS.map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer">

                    {/* RADIO BUTTON */}
                    <span
                      onClick={() => setSelectedSort(item)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer
                        ${
                          selectedSort === item
                            ? "border-purple-600"
                            : "border-zinc-400"
                        }`}
                    >
                      {selectedSort === item && (
                        <span className="w-2.5 h-2.5 bg-purple-600 rounded-full"></span>
                      )}
                    </span>

                    <span className="text-black text-sm">{item}</span>
                  </label>
                ))}
              </div>
            )}

            {/* GENRE OPTIONS */}
            {activeTab === "genre" && (
              <div className="space-y-3">
                {GENRES.map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={tempFilters.includes(item)}
                      onChange={() => toggleGenre(item)}
                      className="w-4 h-4 accent-purple-600"
                    />

                    <span className="text-black text-sm">{item}</span>
                  </label>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between items-center mt-6">
          
          {/* CLEAR */}
          <button
            onClick={() => {
              setTempFilters([]);
              setSelectedSort(null);
            }}
            className="text-sm underline text-zinc-700"
          >
            Clear filters
          </button>

          {/* APPLY */}
          <button
            onClick={applyFilters}
            className="px-8 py-2 bg-black text-white rounded-xl text-sm font-medium"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
}
