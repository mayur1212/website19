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
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // 🔥 drawer animation state
  const [visible, setVisible] = useState(false);

  // drawer animation control
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  // load saved selection
  useEffect(() => {
    if (open) {
      const savedCity = localStorage.getItem("selected_city");
      const savedCountry = localStorage.getItem("selected_country");

      if (savedCity) setSelectedCity(savedCity);
      if (savedCountry) setActiveCountry(savedCountry as any);
    }
  }, [open]);

  // safe unmount AFTER animation
  if (!open && !visible) return null;

  // MERGE ALL CITIES
  const ALL_CITY_LIST = Object.entries(DATA).flatMap(([country, cities]) =>
    cities.map((city) => ({ city, country }))
  );

  const FILTERED_COUNTRY =
    activeCountry === null
      ? ALL_CITY_LIST
      : ALL_CITY_LIST.filter((c) => c.country === activeCountry);

  const FILTERED_CITIES = FILTERED_COUNTRY.filter((item) =>
    item.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleCitySelect = (item: CityItem) => {
    setSelectedCity(item.city);
    localStorage.setItem("selected_city", item.city);
    localStorage.setItem("selected_country", item.country);
    onSelect(item);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

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

        localStorage.setItem("selected_city", city);
        localStorage.setItem("selected_country", country);

        onSelect({ city, country });
        onClose();
      },
      () => alert("Unable to access GPS.")
    );
  };

  return (
    /* OVERLAY — click outside closes (desktop + mobile) */
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex justify-center items-end sm:items-center"
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()} // prevent close on inside click
        className={`
          relative bg-white rounded-3xl shadow-2xl
          w-full max-w-[480px] sm:max-w-[850px]
          h-[80vh] sm:min-h-[600px]
          overflow-hidden flex flex-col p-6 sm:p-8

          transform transition-transform duration-700
          ease-[cubic-bezier(0.32,0.72,0,1)]
          ${visible ? "translate-y-0" : "translate-y-full"}
          sm:translate-y-0
        `}
      >
        {/* MOBILE DRAG HANDLE */}
        <div className="sm:hidden flex justify-center mb-2">
          <div className="w-10 h-1.5 bg-zinc-300 rounded-full" />
        </div>

        {/* ❌ CLOSE BUTTON — MOBILE ONLY */}
        <button
          onClick={onClose}
          className="sm:hidden text-2xl absolute right-6 top-4 text-black"
        >
          ×
        </button>

        {/* STICKY HEADER (MOBILE ONLY) */}
        <div className="sticky top-0 bg-white z-10 sm:static">
          <h2 className="text-xl font-semibold text-black">
            Select Location
          </h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city, area or locality"
            className="w-full mt-4 border border-zinc-300 px-4 py-3 rounded-xl text-black"
          />

          <button
            onClick={handleUseCurrentLocation}
            className="flex items-center gap-2 text-red-600 font-medium mt-4"
          >
            Use Current Location
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto pr-1 mt-6">
          <h3 className="text-lg font-semibold text-black mb-3">
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
