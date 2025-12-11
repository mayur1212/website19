// src/components/OnlyInTheatres.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Sample data and filter UI for "Only in Theatres".
 */

type MovieItem = {
  id: number;
  title: string;
  cert: string;
  language: string;
  image: string;
  tags: string[];
  genres: string[];
};

const MOVIES: MovieItem[] = [
  {
    id: 1,
    title: "De De Pyaar De 2",
    cert: "UA13+",
    language: "Hindi",
    image: "/movies/d1.jpg",
    tags: ["New Releases"],
    genres: ["Comedy", "Drama"],
  },
  {
    id: 2,
    title: "Tere Ishk Mein",
    cert: "UA16+",
    language: "Hindi",
    image: "/movies/d2.jpg",
    tags: ["New Releases"],
    genres: ["Romance", "Drama"],
  },
  {
    id: 3,
    title: "Mastiii 4",
    cert: "A",
    language: "Hindi",
    image: "/movies/d3.jpg",
    tags: ["New Releases", "3D"],
    genres: ["Comedy"],
  },
  {
    id: 4,
    title: "120 Bahadur",
    cert: "UA13+",
    language: "Hindi",
    image: "/movies/d4.jpg",
    tags: ["New Releases"],
    genres: ["Action"],
  },
  {
    id: 5,
    title: "Haq",
    cert: "UA13+",
    language: "Hindi",
    image: "/movies/d5.jpg",
    tags: ["Re-Releases"],
    genres: ["Drama"],
  },
  {
    id: 6,
    title: "Thamma",
    cert: "UA16+",
    language: "Hindi",
    image: "/movies/d1.jpg",
    tags: ["New Releases"],
    genres: ["Thriller"],
  },
  {
    id: 7,
    title: "Skyfall",
    cert: "UA13+",
    language: "English",
    image: "/movies/d2.jpg",
    tags: ["Re-Releases"],
    genres: ["Action"],
  },
  {
    id: 8,
    title: "Avatar: The Way of Water",
    cert: "UA13+",
    language: "English",
    image: "/movies/d3.jpg",
    tags: ["3D", "4DX", "IMAX"],
    genres: ["Adventure", "Fantasy"],
  },
  {
    id: 9,
    title: "Pushpa 2",
    cert: "UA16+",
    language: "Hindi",
    image: "/movies/d4.jpg",
    tags: ["New Releases"],
    genres: ["Action"],
  },
  {
    id: 10,
    title: "Spider-Man: No Way Home",
    cert: "UA13+",
    language: "English",
    image: "/movies/d5.jpg",
    tags: ["Re-Releases", "3D"],
    genres: ["Action", "Fantasy"],
  },
];

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Anime",
  "Comedy",
  "Crime",
  "Devotional",
  "Drama",
  "Family",
  "Fantasy",
  "Thriller",
];
const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu"];
const FORMATS = ["2D", "3D", "4DX", "IMAX"];

const QUICK_FILTERS = [
  { label: "Hindi", type: "language", value: "Hindi" },
  { label: "English", type: "language", value: "English" },
  { label: "New Releases", type: "tag", value: "New Releases" },
  { label: "Re-Releases", type: "tag", value: "Re-Releases" },
  { label: "4DX", type: "tag", value: "4DX" },
  { label: "IMAX 3D", type: "tag", value: "IMAX" },
];

type ChipGroup = "Genre" | "Language" | "Format";

export default function OnlyInTheatres() {
  const router = useRouter();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] =
    useState<"Genre" | "Language" | "Format">("Genre");

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  const toggleQuickFilter = (value: string) => {
    setQuickFilters((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  // values that have quick pills outside
  const QUICK_VALUES = QUICK_FILTERS.map((f) => f.value);

  // build chips only for modal filters that DON'T have quick pills
  const activeFilterChips: {
    key: string;
    group: ChipGroup;
    value: string;
    label: string;
  }[] = [];

  selectedGenres.forEach((g) => {
    const isDupQuick = QUICK_VALUES.includes(g);
    if (isDupQuick) return;
    activeFilterChips.push({
      key: `Genre-${g}`,
      group: "Genre",
      value: g,
      label: g,
    });
  });

  selectedLanguages.forEach((l) => {
    const isDupQuick = QUICK_VALUES.includes(l);
    if (isDupQuick) return;
    activeFilterChips.push({
      key: `Language-${l}`,
      group: "Language",
      value: l,
      label: l,
    });
  });

  selectedFormats.forEach((f) => {
    const isDupQuick = QUICK_VALUES.includes(f);
    if (isDupQuick) return;
    activeFilterChips.push({
      key: `Format-${f}`,
      group: "Format",
      value: f,
      label: f,
    });
  });

  const handleRemoveFilterChip = (group: ChipGroup, value: string) => {
    if (group === "Genre") {
      setSelectedGenres((prev) => prev.filter((g) => g !== value));
    } else if (group === "Language") {
      setSelectedLanguages((prev) => prev.filter((l) => l !== value));
    } else {
      setSelectedFormats((prev) => prev.filter((f) => f !== value));
    }
  };

  const handleClearModalFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSelectedFormats([]);
  };

  // Filtering logic: quick filters + modal filters
  const filteredMovies = MOVIES.filter((movie) => {
    const quickLang = quickFilters.some((f) => LANGUAGES.includes(f));
    const quickTag = quickFilters.some(
      (f) => FORMATS.includes(f) || f.includes("Re") || f.includes("New")
    );

    const quickLangOk = !quickLang || quickFilters.includes(movie.language);
    const quickTagOk =
      !quickTag || movie.tags.some((t) => quickFilters.includes(t));

    const modalLangOk =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(movie.language);
    const modalFormatOk =
      selectedFormats.length === 0 ||
      movie.tags.some((tag) => selectedFormats.includes(tag));
    const modalGenreOk =
      selectedGenres.length === 0 ||
      movie.genres.some((g) => selectedGenres.includes(g));

    return (
      quickLangOk && quickTagOk && modalLangOk && modalFormatOk && modalGenreOk
    );
  });

  return (
    <section className="w-full px-4 pt-10 md:px-6 lg:px-16 lg:pt-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-[26px] font-semibold md:text-[32px] lg:text-[36px]">
          Only in Theatres
        </h2>

        {/* FILTER STRIP – single horizontal line, scrollable */}
        <div className="mb-6">
          <div className="flex w-full items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* Filters button (opens modal) */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Chips from popup (modal) filters */}
            {activeFilterChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() =>
                  handleRemoveFilterChip(chip.group, chip.value)
                }
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700"
              >
                <span>{chip.label}</span>
                <span className="text-xs leading-none">✕</span>
              </button>
            ))}

            {activeFilterChips.length > 0 && (
              <button
                type="button"
                onClick={handleClearModalFilters}
                className="flex-shrink-0 text-xs font-medium text-zinc-500 underline underline-offset-4"
              >
                Clear all
              </button>
            )}

            {/* Divider between popup chips & quick toggles */}
            <div className="flex-shrink-0 h-6 w-px bg-zinc-200" />

            {/* QUICK TOGGLES – same line, scroll horizontally */}
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.label}
                onClick={() => toggleQuickFilter(f.value)}
                className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  quickFilters.includes(f.value)
                    ? "border-black bg-black text-white"
                    : "border-zinc-300 bg-white text-zinc-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* MOVIE GRID */}
        <div className="mx-auto w-full">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  const slug = movie.title.toLowerCase().replace(/ /g, "-");
                  router.push(`/movie/${slug}`);
                }}
                className="w-full min-w-0 cursor-pointer overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="h-[260px] sm:h-[280px] md:h-[300px] lg:h-[260px]">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-3 py-3 md:px-4 md:py-4">
                  <h3 className="line-clamp-2 text-[14px] font-semibold md:text-[16px]">
                    {movie.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-zinc-500 md:text-[13px]">
                    {movie.cert} | {movie.language}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FILTER MODAL */}
        {showFilterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 p-4 backdrop-blur-md">
            <div className="w-full max-w-4xl rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filter by</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-xl font-bold text-zinc-600"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-6">
                <div className="w-40 border-r pr-4">
                  {(["Genre", "Language", "Format"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`block w-full rounded-lg px-2 py-3 text-left text-sm font-medium ${
                        activeTab === tab
                          ? "bg-zinc-100 text-zinc-900"
                          : "text-zinc-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="h-[380px] flex-1 overflow-y-auto pr-4">
                  {/* GENRE TAB */}
                  {activeTab === "Genre" && (
                    <div className="grid gap-3">
                      {GENRES.map((genre) => (
                        <label
                          key={genre}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() =>
                              setSelectedGenres((prev) =>
                                prev.includes(genre)
                                  ? prev.filter((x) => x !== genre)
                                  : [...prev, genre]
                              )
                            }
                            className="h-5 w-5"
                          />
                          <span className="text-sm">{genre}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* LANGUAGE TAB */}
                  {activeTab === "Language" && (
                    <div className="grid gap-3">
                      {LANGUAGES.map((lang) => (
                        <label key={lang} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={
                              QUICK_VALUES.includes(lang)
                                ? quickFilters.includes(lang)
                                : selectedLanguages.includes(lang)
                            }
                            onChange={() => {
                              if (QUICK_VALUES.includes(lang)) {
                                // sync with quick pill
                                toggleQuickFilter(lang);
                              } else {
                                setSelectedLanguages((prev) =>
                                  prev.includes(lang)
                                    ? prev.filter((x) => x !== lang)
                                    : [...prev, lang]
                                );
                              }
                            }}
                            className="h-5 w-5"
                          />
                          <span className="text-sm">{lang}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* FORMAT TAB */}
                  {activeTab === "Format" && (
                    <div className="grid gap-3">
                      {FORMATS.map((format) => (
                        <label
                          key={format}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="checkbox"
                            checked={
                              QUICK_VALUES.includes(format)
                                ? quickFilters.includes(format)
                                : selectedFormats.includes(format)
                            }
                            onChange={() => {
                              if (QUICK_VALUES.includes(format)) {
                                // sync with quick pill (4DX / IMAX)
                                toggleQuickFilter(format);
                              } else {
                                setSelectedFormats((prev) =>
                                  prev.includes(format)
                                    ? prev.filter((x) => x !== format)
                                    : [...prev, format]
                                );
                              }
                            }}
                            className="h-5 w-5"
                          />
                          <span className="text-sm">{format}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handleClearModalFilters}
                  className="text-sm font-medium text-zinc-600 underline"
                >
                  Clear Filters
                </button>

                <button
                  onClick={() => setShowFilterModal(false)}
                  className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white"
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
