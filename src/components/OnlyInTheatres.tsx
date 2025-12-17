// src/components/OnlyInTheatres.tsx
"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

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
  { id: 1, title: "De De Pyaar De 2", cert: "UA13+", language: "Hindi", image: "/movies/d1.jpg", tags: ["New Releases"], genres: ["Comedy", "Drama"] },
  { id: 2, title: "Tere Ishk Mein", cert: "UA16+", language: "Hindi", image: "/movies/d2.jpg", tags: ["New Releases"], genres: ["Romance", "Drama"] },
  { id: 3, title: "Mastiii 4", cert: "A", language: "Hindi", image: "/movies/d3.jpg", tags: ["New Releases", "3D"], genres: ["Comedy"] },
  { id: 4, title: "120 Bahadur", cert: "UA13+", language: "Hindi", image: "/movies/d4.jpg", tags: ["New Releases"], genres: ["Action"] },
  { id: 5, title: "Haq", cert: "UA13+", language: "Hindi", image: "/movies/d5.jpg", tags: ["Re-Releases"], genres: ["Drama"] },
  { id: 6, title: "Thamma", cert: "UA16+", language: "Hindi", image: "/movies/d1.jpg", tags: ["New Releases"], genres: ["Thriller"] },
  { id: 7, title: "Skyfall", cert: "UA13+", language: "English", image: "/movies/d2.jpg", tags: ["Re-Releases"], genres: ["Action"] },
  { id: 8, title: "Avatar: The Way of Water", cert: "UA13+", language: "English", image: "/movies/d3.jpg", tags: ["3D", "4DX", "IMAX"], genres: ["Adventure", "Fantasy"] },
  { id: 9, title: "Pushpa 2", cert: "UA16+", language: "Hindi", image: "/movies/d4.jpg", tags: ["New Releases"], genres: ["Action"] },
  { id: 10, title: "Spider-Man: No Way Home", cert: "UA13+", language: "English", image: "/movies/d5.jpg", tags: ["Re-Releases", "3D"], genres: ["Action", "Fantasy"] }
];

const GENRES = ["Action", "Adventure", "Animation", "Anime", "Comedy", "Crime", "Devotional", "Drama", "Family", "Fantasy", "Thriller"];
const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu"];
const FORMATS = ["2D", "3D", "4DX", "IMAX"];

const QUICK_FILTERS = [
  { label: "Hindi", type: "language", value: "Hindi" },
  { label: "English", type: "language", value: "English" },
  { label: "New Releases", type: "tag", value: "New Releases" },
  { label: "Re-Releases", type: "tag", value: "Re-Releases" },
  { label: "3D", type: "tag", value: "3D" },
  { label: "4DX–3D", type: "tag", value: "4DX" }
];

type ChipGroup = "Genre" | "Language" | "Format" | "Quick";

export default function OnlyInTheatres() {
  const router = useRouter();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"Genre" | "Language" | "Format">("Genre");

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  const toggleQuickFilter = (value: string) => {
    setQuickFilters(prev =>
      prev.includes(value) ? prev.filter(x => x !== value) : [...prev, value]
    );
  };

  const QUICK_VALUES = QUICK_FILTERS.map(f => f.value);

  // Build active filter chips. We include quick-chips (from quickFilters or from modal selections if they are quick-values),
  // and then non-quick selections. This ensures each quick-value shows only once.
  const activeFilterChips: { key: string; group: ChipGroup; value: string; label: string; isQuick?: boolean }[] = [];
  const addedQuick = new Set<string>();

  // 1) Add quick-chips from quickFilters (explicit quick clicks)
  quickFilters.forEach(q => {
    if (!addedQuick.has(q)) {
      activeFilterChips.push({ key: `Quick-${q}`, group: "Quick", value: q, label: q, isQuick: true });
      addedQuick.add(q);
    }
  });

  // 2) If modal selections include a QUICK value (e.g., selectedLanguages includes "Hindi"),
  //    add it as a quick chip as well (if not already added).
  selectedLanguages.forEach(l => {
    if (QUICK_VALUES.includes(l) && !addedQuick.has(l)) {
      activeFilterChips.push({ key: `Quick-${l}`, group: "Quick", value: l, label: l, isQuick: true });
      addedQuick.add(l);
    }
  });
  selectedFormats.forEach(f => {
    if (QUICK_VALUES.includes(f) && !addedQuick.has(f)) {
      activeFilterChips.push({ key: `Quick-${f}`, group: "Quick", value: f, label: f, isQuick: true });
      addedQuick.add(f);
    }
  });

  // 3) Add other non-quick selected chips (genres and other languages/formats that are not in QUICK_VALUES)
  selectedGenres.forEach(g => {
    activeFilterChips.push({ key: `Genre-${g}`, group: "Genre", value: g, label: g });
  });

  selectedLanguages.forEach(l => {
    if (!QUICK_VALUES.includes(l)) {
      activeFilterChips.push({ key: `Language-${l}`, group: "Language", value: l, label: l });
    }
  });

  selectedFormats.forEach(f => {
    if (!QUICK_VALUES.includes(f)) {
      activeFilterChips.push({ key: `Format-${f}`, group: "Format", value: f, label: f });
    }
  });

  // Filter movies using quickFilters and the selected sets
  const filteredMovies = MOVIES.filter(movie => {
    const quickOk =
      quickFilters.length === 0 ||
      quickFilters.includes(movie.language) ||
      movie.tags.some(t => quickFilters.includes(t));

    const langOk = selectedLanguages.length === 0 || selectedLanguages.includes(movie.language);
    const formatOk = selectedFormats.length === 0 || movie.tags.some(tag => selectedFormats.includes(tag));
    const genreOk = selectedGenres.length === 0 || movie.genres.some(g => selectedGenres.includes(g));

    return quickOk && langOk && formatOk && genreOk;
  });

  return (
    <section className="w-full px-4 pt-10 pb-16 md:px-6 lg:px-6 lg:pt-16 lg:pb-16">

  <div className="w-full max-w-none">

        <h2 className="mb-6 text-[26px] font-semibold md:text-[32px] lg:text-[36px]">Only in Theatres</h2>

        {/* FILTER STRIP */}
        <div className="mb-6">
          <div className="flex w-full items-center gap-2 overflow-x-auto no-scrollbar py-1">

            {/* FILTER BUTTON (medium corners) */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* SHOW selected quick / active chips immediately after Filters button */}
            {activeFilterChips.map(chip => {
              // Quick chips toggle quickFilters
              if (chip.isQuick) {
                const selected = quickFilters.includes(chip.value) || selectedLanguages.includes(chip.value) || selectedFormats.includes(chip.value);
                return (
                  <button
                    key={chip.key}
                    onClick={() => {
                      // if modal selected it may not be in quickFilters; toggling should remove it from whichever state holds it.
                      // Prioritize removing from quickFilters; if not present there, remove from selectedLanguages/selectedFormats appropriately.
                      if (quickFilters.includes(chip.value)) {
                        toggleQuickFilter(chip.value);
                      } else if (selectedLanguages.includes(chip.value)) {
                        setSelectedLanguages(prev => prev.filter(x => x !== chip.value));
                      } else if (selectedFormats.includes(chip.value)) {
                        setSelectedFormats(prev => prev.filter(x => x !== chip.value));
                      } else {
                        // fallback: toggle quickFilters
                        toggleQuickFilter(chip.value);
                      }
                    }}
                    className={`flex-shrink-0 px-4 py-2 text-sm font-medium border transition rounded-lg
                      ${selected ? "bg-[#eae5ff] border-[#7c3aed] text-[#4b1fa8]" : "bg-white border-zinc-300 text-zinc-700"}`}
                  >
                    {chip.label}
                  </button>
                );
              }

              // Non-quick chips (Genre / Language / Format that are not quick values)
              const isSelected =
                (chip.group === "Genre" && selectedGenres.includes(chip.value)) ||
                (chip.group === "Language" && selectedLanguages.includes(chip.value)) ||
                (chip.group === "Format" && selectedFormats.includes(chip.value));

              return (
                <button
                  key={chip.key}
                  onClick={() => {
                    if (chip.group === "Genre") {
                      setSelectedGenres(prev =>
                        prev.includes(chip.value) ? prev.filter(x => x !== chip.value) : [...prev, chip.value]
                      );
                    } else if (chip.group === "Language") {
                      setSelectedLanguages(prev =>
                        prev.includes(chip.value) ? prev.filter(x => x !== chip.value) : [...prev, chip.value]
                      );
                    } else {
                      setSelectedFormats(prev =>
                        prev.includes(chip.value) ? prev.filter(x => x !== chip.value) : [...prev, chip.value]
                      );
                    }
                  }}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-medium border transition rounded-lg
                    ${isSelected ? "bg-[#eae5ff] border-[#7c3aed] text-[#4b1fa8]" : "bg-white border-zinc-300 text-zinc-700"}`}
                >
                  {chip.label}
                </button>
              );
            })}

            {/* DIVIDER */}
            <div className="h-6 w-px bg-zinc-200 flex-shrink-0" />

            {/* QUICK FILTER BUTTONS (don't render values that are already active anywhere) */}
            {QUICK_FILTERS
              .filter(f => {
                // skip if present in quickFilters OR selectedLanguages OR selectedFormats
                return !quickFilters.includes(f.value) && !selectedLanguages.includes(f.value) && !selectedFormats.includes(f.value);
              })
              .map(f => (
                <button
                  key={f.value}
                  onClick={() => toggleQuickFilter(f.value)}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-medium border transition rounded-lg
                    ${quickFilters.includes(f.value) ? "bg-[#eae5ff] border-[#7c3aed] text-[#4b1fa8]" : "bg-white border-zinc-300 text-zinc-700"}`}
                >
                  {f.label}
                </button>
              ))}
          </div>
        </div>

        {/* MOVIE GRID */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-6">

  {filteredMovies.map(movie => (
    <div
      key={movie.id}
      onClick={() =>
        router.push(`/movie/${movie.title.toLowerCase().replace(/ /g, "-")}`)
      }
      className="cursor-pointer w-full rounded-2xl bg-white shadow-md
                 hover:-translate-y-1 hover:shadow-lg
                 transition-all duration-200"
    >
      <div className="h-[260px] md:h-[300px] overflow-hidden rounded-t-2xl">
        {/* image with rounded top corners */}
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-3 py-3">
        <h3 className="text-[14px] font-semibold line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-[12px] text-zinc-500">
          {movie.cert} | {movie.language}
        </p>
      </div>
    </div>
  ))}
</div>


        {/* FILTER MODAL */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-4xl shadow-lg">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setShowFilterModal(false)}>✕</button>
              </div>

              <div className="flex gap-6">
                {/* Left Tabs */}
                <div className="w-40 border-r pr-4">
                  {["Genre", "Language", "Format"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`block w-full text-left px-2 py-2 rounded-md ${activeTab === tab ? "bg-zinc-200" : "text-zinc-600"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Right Options */}
                <div className="flex-1 h-[350px] overflow-y-auto pr-4">
                  {activeTab === "Genre" &&
                    GENRES.map(g => (
                      <label key={g} className="flex items-center gap-3 py-2">
                        <input
                          type="checkbox"
                          checked={selectedGenres.includes(g)}
                          onChange={() =>
                            setSelectedGenres(prev =>
                              prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
                            )
                          }
                          className="h-5 w-5"
                        />
                        {g}
                      </label>
                    ))}

                  {activeTab === "Language" &&
                    LANGUAGES.map(l => (
                      <label key={l} className="flex items-center gap-3 py-2">
                        <input
                          type="checkbox"
                          checked={
                            QUICK_VALUES.includes(l)
                              ? quickFilters.includes(l) || selectedLanguages.includes(l)
                              : selectedLanguages.includes(l)
                          }
                          onChange={() => {
                            if (QUICK_VALUES.includes(l)) {
                              // if it's a quick value, toggling should add/remove from selectedLanguages (we want it represented as active chip)
                              if (selectedLanguages.includes(l)) {
                                setSelectedLanguages(prev => prev.filter(x => x !== l));
                              } else {
                                setSelectedLanguages(prev => [...prev, l]);
                              }
                            } else {
                              // non-quick languages (rare) handled normally
                              setSelectedLanguages(prev =>
                                prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]
                              );
                            }
                          }}
                          className="h-5 w-5"
                        />
                        {l}
                      </label>
                    ))}

                  {activeTab === "Format" &&
                    FORMATS.map(f => (
                      <label key={f} className="flex items-center gap-3 py-2">
                        <input
                          type="checkbox"
                          checked={
                            QUICK_VALUES.includes(f)
                              ? quickFilters.includes(f) || selectedFormats.includes(f)
                              : selectedFormats.includes(f)
                          }
                          onChange={() => {
                            if (QUICK_VALUES.includes(f)) {
                              if (selectedFormats.includes(f)) {
                                setSelectedFormats(prev => prev.filter(x => x !== f));
                              } else {
                                setSelectedFormats(prev => [...prev, f]);
                              }
                            } else {
                              setSelectedFormats(prev =>
                                prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
                              );
                            }
                          }}
                          className="h-5 w-5"
                        />
                        {f}
                      </label>
                    ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setSelectedGenres([]);
                    setSelectedLanguages([]);
                    setSelectedFormats([]);
                    setQuickFilters([]);
                  }}
                  className="text-sm underline text-zinc-600"
                >
                  Clear Filters
                </button>

                <button
                  onClick={() => setShowFilterModal(false)}
                  className="bg-black text-white px-6 py-3 rounded-full"
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
