"use client";

import React, { useState } from "react";

export type CityItem = {
  city: string;
  country: string;
};

// MASTER DATA
const DATA = {
  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah"],
  Qatar: ["Doha", "Al Khor", "Al Rayyan", "Al Wakrah"],
  SaudiArabia: ["Abha", "Al Bahah", "Al Haridhah", "Al Jubail", "Al Qatif", "Dammam", "Jeddah", "Mecca", "Medina", "Riyadh"," Taif","Tenomah"],
};

// COUNTRY ICONS (put these in /public/country-icons/)
const COUNTRY_ICONS: Record<string, string> = {
  UAE: "/country-icons/uae.png",
  Qatar: "/country-icons/qatar.png",
  SaudiArabia: "/country-icons/saudiarabia.png",
};

export default function LocationModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (loc: CityItem) => void;
}) {
  const [activeCountry, setActiveCountry] =
    useState<keyof typeof DATA | null>(null);

  const [search, setSearch] = useState("");

  if (!open) return null;

  // MERGE ALL CITIES
  const ALL_CITY_LIST = Object.entries(DATA).flatMap(([country, cities]) =>
    cities.map((city) => ({ city, country }))
  );

  // FILTER BY COUNTRY
  const FILTERED_COUNTRY =
    activeCountry === null
      ? ALL_CITY_LIST
      : ALL_CITY_LIST.filter((c) => c.country === activeCountry);

  // APPLY SEARCH FILTER
  const FILTERED_CITIES = FILTERED_COUNTRY.filter((item) =>
    item.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20">
      <div
        className="
          relative w-[850px] bg-white rounded-3xl shadow-2xl
          p-8 min-h-[600px] max-h-[90vh] flex flex-col
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="text-2xl absolute right-10 top-8 text-black"
        >
          ×
        </button>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto pr-2 mt-2">
          {/* HEADER */}
          <h2 className="text-xl font-semibold text-black">Select Location</h2>

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city, area or locality"
            className="w-full mt-4 border border-zinc-300 px-4 py-3 rounded-xl text-black"
          />

          {/* USE LOCATION */}
<button className="flex items-center gap-2 text-red-600 font-medium mt-4">
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF3B30"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21c4-4 6-7 6-10a6 6 0 1 0-12 0c0 3 2 6 6 10z" />
    <circle cx="12" cy="11" r="2.5" />
  </svg>
    Use Current Location
</button>


          {/* COUNTRIES GRID (DISTRICT STYLE) */}
          <h3 className="text-lg font-semibold text-black mt-6 mb-3">
            Countries
          </h3>

          <div className="grid grid-cols-3 gap-5 mb-8">
            {Object.keys(DATA).map((country) => (
              <button
                key={country}
                onClick={() => setActiveCountry(country as any)}
                className={`
                  flex flex-col items-center justify-center
                  rounded-2xl p-2 w-40 transition border
                  ${
                    activeCountry === country
                      ? "border-purple-600 bg-purple-50"
                      : "border-zinc-300 bg-zinc-100 hover:bg-zinc-200"
                  }
                `}
              >
                {/* BIG ICON */}
                <img
                  src={COUNTRY_ICONS[country]}
                  alt={country}
                  className="w-16 h-16 object-contain mb-3"
                />

                {/* NAME */}
                <span
                  className={`
                    text-sm font-semibold
                    ${activeCountry === country ? "text-purple-600" : "text-black"}
                  `}
                >
                  {country}
                </span>
              </button>
            ))}
          </div>

          

          {/* CITY LIST */}
          <div className="grid grid-cols-3 gap-y-3 pb-4">
            {FILTERED_CITIES.map((item) => (
              <button
                key={item.city}
                onClick={() => {
                  onSelect({ city: item.city, country: item.country });
                  onClose();
                }}
                className="text-left text-[15px] text-black hover:text-purple-600 hover:underline"
              >
                {item.city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
