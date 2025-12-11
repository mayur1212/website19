"use client";

import React, { useEffect, useState } from "react";

export type CityItem = {
  city: string;
  country: string;
};

// MASTER DATA
const DATA = {
  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah"],
  Qatar: ["Doha", "Al Khor", "Al Rayyan", "Al Wakrah"],
  SaudiArabia: [
    "Abha",
    "Al Bahah",
    "Al Haridhah",
    "Al Jubail",
    "Al Qatif",
    "Dammam",
    "Jeddah",
    "Mecca",
    "Medina",
    "Riyadh",
    "Taif",
    "Tenomah",
  ],
  Bahrain: ["Manama", "Riffa", "Muharraq", "Hamad Town", "A'ali"],
};

// ICONS
const COUNTRY_ICONS: Record<string, string> = {
  UAE: "/country-icons/uae.png",
  Qatar: "/country-icons/qatar.png",
  SaudiArabia: "/country-icons/saudiarabia.png",
  Bahrain: "/country-icons/bahrain.png",
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

  // ⭐ New persistent selected city
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Load saved selection when modal opens
  useEffect(() => {
    if (open) {
      const savedCity = localStorage.getItem("selected_city");
      const savedCountry = localStorage.getItem("selected_country");

      if (savedCity) setSelectedCity(savedCity);
      if (savedCountry) setActiveCountry(savedCountry as any);
    }
  }, [open]);

  if (!open) return null;

  // MERGE ALL CITIES
  const ALL_CITY_LIST = Object.entries(DATA).flatMap(([country, cities]) =>
    cities.map((city) => ({ city, country }))
  );

  // FILTER CITIES BY COUNTRY
  const FILTERED_COUNTRY =
    activeCountry === null
      ? ALL_CITY_LIST
      : ALL_CITY_LIST.filter((c) => c.country === activeCountry);

  // APPLY SEARCH FILTER
  const FILTERED_CITIES = FILTERED_COUNTRY.filter((item) =>
    item.city.toLowerCase().includes(search.toLowerCase())
  );

  // ⭐ Handle manual city selection
  const handleCitySelect = (item: CityItem) => {
    setSelectedCity(item.city);

    localStorage.setItem("selected_city", item.city);
    localStorage.setItem("selected_country", item.country);

    onSelect(item);
    onClose();
  };

  // ⭐ Handle Use Current Location (reverse geocoding)
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            "Unknown";

          const country = data.address.country || "Unknown";

          // Save
          setSelectedCity(city);
          localStorage.setItem("selected_city", city);
          localStorage.setItem("selected_country", country);

          // Send to header
          onSelect({ city, country });

          onClose();
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          alert("Unable to fetch location details.");
        }
      },
      () => alert("Unable to access GPS. Please enable location.")
    );
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex justify-center items-start sm:items-center pt-10 sm:pt-0">
      <div
        className="
          relative bg-white rounded-3xl shadow-2xl 
          w-full max-w-[480px] sm:max-w-[850px]
          h-[80vh] sm:min-h-[600px]
          overflow-hidden flex flex-col p-6 sm:p-8
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="text-2xl absolute right-6 top-4 text-black"
        >
          ×
        </button>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto pr-1 mt-6">
          <h2 className="text-xl font-semibold text-black">Select Location</h2>

          {/* SEARCH BAR */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city, area or locality"
            className="w-full mt-4 border border-zinc-300 px-4 py-3 rounded-xl text-black"
          />

          {/* ⭐ USE CURRENT LOCATION */}
          <button
            onClick={handleUseCurrentLocation}
            className="flex items-center gap-2 text-red-600 font-medium mt-4"
          >
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

          {/* COUNTRY SELECT */}
          <h3 className="text-lg font-semibold text-black mt-6 mb-3">
            Countries
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {Object.keys(DATA).map((country) => (
              <button
                key={country}
                onClick={() => setActiveCountry(country as any)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-2xl border transition
                  ${
                    activeCountry === country
                      ? "border-red-600 bg-red-50"
                      : "border-zinc-300 bg-zinc-100 hover:bg-zinc-200"
                  }
                `}
              >
                <img
                  src={COUNTRY_ICONS[country]}
                  alt={country}
                  className="w-12 h-12 object-contain mb-2"
                />

                <span
                  className={`text-sm font-semibold ${
                    activeCountry === country ? "text-red-600" : "text-black"
                  }`}
                >
                  {country}
                </span>
              </button>
            ))}
          </div>

          {/* CITY LIST */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 pb-12">
            {FILTERED_CITIES.map((item) => {
              const isSelected = selectedCity === item.city;

              return (
                <button
                  key={item.city}
                  onClick={() => handleCitySelect(item)}
                  className={`
                    text-center text-[15px] px-2 py-1 rounded-lg transition
                    ${
                      isSelected
                        ? "text-red-600 font-semibold"
                        : "text-black hover:text-red-600 hover:bg-red-50"
                    }
                  `}
                >
                  {item.city}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
