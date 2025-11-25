"use client";

import { useRegion } from "@/contexts/RegionContext";
import { useState } from "react";

// Example data - replace with your actual data source
const COUNTRIES = [
  { code: "qa", name: "Qatar" },
  { code: "ae", name: "United Arab Emirates" },
  { code: "sa", name: "Saudi Arabia" },
];

const CITIES: Record<string, Array<{ code: string; name: string }>> = {
  qa: [
    { code: "doha", name: "Doha" },
    { code: "al-rayyan", name: "Al Rayyan" },
  ],
  ae: [
    { code: "dubai", name: "Dubai" },
    { code: "abu-dhabi", name: "Abu Dhabi" },
  ],
  sa: [
    { code: "riyadh", name: "Riyadh" },
    { code: "jeddah", name: "Jeddah" },
  ],
};

const CINEMAS: Record<string, Array<{ code: string; name: string }>> = {
  "doha": [
    { code: "cinema-1", name: "Cinema 1" },
    { code: "cinema-2", name: "Cinema 2" },
  ],
  "al-rayyan": [
    { code: "cinema-3", name: "Cinema 3" },
  ],
  "dubai": [
    { code: "cinema-4", name: "Cinema 4" },
  ],
  "abu-dhabi": [
    { code: "cinema-5", name: "Cinema 5" },
  ],
  "riyadh": [
    { code: "cinema-6", name: "Cinema 6" },
  ],
  "jeddah": [
    { code: "cinema-7", name: "Cinema 7" },
  ],
};

export function RegionSelector() {
  const { region, setCountry, setCity, setCinema, isLoading } = useRegion();
  const [selectedCountry, setSelectedCountry] = useState(region.country || "");
  const [selectedCity, setSelectedCity] = useState(region.city || "");
  const [selectedCinema, setSelectedCinema] = useState(region.cinema || "");

  const availableCities = selectedCountry ? CITIES[selectedCountry] || [] : [];
  const availableCinemas = selectedCity ? CINEMAS[selectedCity] || [] : [];

  const handleCountryChange = async (country: string) => {
    setSelectedCountry(country);
    setSelectedCity("");
    setSelectedCinema("");
    await setCountry(country);
    await setCity("");
    await setCinema("");
  };

  const handleCityChange = async (city: string) => {
    setSelectedCity(city);
    setSelectedCinema("");
    await setCity(city);
    await setCinema("");
  };

  const handleCinemaChange = async (cinema: string) => {
    setSelectedCinema(cinema);
    await setCinema(cinema);
  };

  if (isLoading) {
    return <div>Loading region...</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold">Select Region</h3>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">Select Country</option>
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">City</label>
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select City</option>
            {availableCities.map((city) => (
              <option key={city.code} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCity && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Cinema</label>
          <select
            value={selectedCinema}
            onChange={(e) => handleCinemaChange(e.target.value)}
            className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select Cinema</option>
            {availableCinemas.map((cinema) => (
              <option key={cinema.code} value={cinema.code}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {region.country && (
        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
          <p>
            <strong>Selected:</strong> {region.country}
            {region.city && ` → ${region.city}`}
            {region.cinema && ` → ${region.cinema}`}
          </p>
        </div>
      )}
    </div>
  );
}

