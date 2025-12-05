// (full file, only heights changed for poster container)
"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

// ✅ MOVIE DATA – UPDATED IMAGES (d1.jpg, d2.jpg ...)
const MOVIES = [
  { id: 1, title: "De De Pyaar De 2", cert: "UA13+", language: "Hindi", image: "/movies/d1.jpg", tags: ["New Releases"], genres: ["Comedy", "Drama"] },
  { id: 2, title: "Tere Ishk Mein", cert: "UA16+", language: "Hindi", image: "/movies/d2.jpg", tags: ["New Releases"], genres: ["Romance", "Drama"] },
  { id: 3, title: "Mastiii 4", cert: "A", language: "Hindi", image: "/movies/d3.jpg", tags: ["New Releases", "3D"], genres: ["Comedy"] },
  { id: 4, title: "120 Bahadur", cert: "UA13+", language: "Hindi", image: "/movies/d4.jpg", tags: ["New Releases"], genres: ["Action"] },
  { id: 5, title: "Haq", cert: "UA13+", language: "Hindi", image: "/movies/d5.jpg", tags: ["Re-Releases"], genres: ["Drama"] },
  { id: 6, title: "Thamma", cert: "UA16+", language: "Hindi", image: "/movies/d1.jpg", tags: ["New Releases"], genres: ["Thriller"] },
  { id: 7, title: "Skyfall", cert: "UA13+", language: "English", image: "/movies/d2.jpg", tags: ["Re-Releases"], genres: ["Action"] },
  { id: 8, title: "Avatar: The Way of Water", cert: "UA13+", language: "English", image: "/movies/d3.jpg", tags: ["3D", "4DX", "IMAX"], genres: ["Adventure", "Fantasy"] },
  { id: 9, title: "Pushpa 2", cert: "UA16+", language: "Hindi", image: "/movies/d4.jpg", tags: ["New Releases"], genres: ["Action"] },
  { id: 10, title: "Spider-Man: No Way Home", cert: "UA13+", language: "English", image: "/movies/d5.jpg", tags: ["Re-Releases", "3D"], genres: ["Action", "Fantasy"] },
];

const GENRES = ["Action", "Adventure", "Animation", "Anime", "Comedy", "Crime", "Devotional", "Drama", "Family", "Fantasy", "Thriller"];
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

export default function OnlyInTheatres() {
  const router = useRouter();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Genre");

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  const toggleQuickFilter = (value: string) => {
    setQuickFilters((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const filteredMovies = MOVIES.filter((movie) => {
    const quickLang = quickFilters.some((f) => LANGUAGES.includes(f));
    const quickTag = quickFilters.some((f) => FORMATS.includes(f) || f.includes("Re") || f.includes("New"));

    const quickLangOk = !quickLang || quickFilters.includes(movie.language);
    const quickTagOk = !quickTag || movie.tags.some((t) => quickFilters.includes(t));

    const modalLangOk = selectedLanguages.length === 0 || selectedLanguages.includes(movie.language);
    const modalFormatOk = selectedFormats.length === 0 || movie.tags.some((tag) => selectedFormats.includes(tag));
    const modalGenreOk = selectedGenres.length === 0 || movie.genres.some((g) => selectedGenres.includes(g));

    return quickLangOk && quickTagOk && modalLangOk && modalFormatOk && modalGenreOk;
  });

  return (
    <section className="w-full px-4 pt-10 md:px-6 lg:px-16 lg:pt-16">
      <div className="mx-auto max-w-6xl">

        <h2 className="mb-6 text-[26px] font-semibold md:text-[32px] lg:text-[36px]">
          Only in Theatres
        </h2>

        {/* QUICK FILTERS */}
        <div className="mb-6 flex flex-wrap gap-3">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => toggleQuickFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm border shadow-sm ${
                quickFilters.includes(f.value)
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-700 border-zinc-300"
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={() => setShowFilterModal(true)}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* MOVIE GRID */}
<div className="mx-auto w-full">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-3">
    {filteredMovies.map((movie) => (
      <div
        key={movie.id}
        onClick={() => {
          const slug = movie.title.toLowerCase().replace(/ /g, "-");
          router.push(`/movie/${slug}`);
        }}
        className="cursor-pointer w-full min-w-0 overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
      >
        {/* ← UPDATED RESPONSIVE HEIGHTS:
            - base (mobile): larger
            - sm (small tablet): slightly larger
            - md (tablet / larger): even larger
            - lg (desktop): keep original desktop size
        */}
        <div className="h-[260px] sm:h-[280px] md:h-[300px] lg:h-[260px]">
          <img src={movie.image} alt={movie.title} className="h-full w-full object-cover" />
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
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl p-6 md:p-8 shadow-lg">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filter by</h2>
                <button onClick={() => setShowFilterModal(false)} className="text-xl font-bold text-zinc-600">✕</button>
              </div>

              <div className="flex gap-6">
                <div className="w-40 border-r pr-4">
                  {["Genre", "Language", "Format"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`block w-full text-left px-2 py-3 rounded-lg text-sm font-medium ${
                        activeTab === tab ? "bg-zinc-100 text-zinc-900" : "text-zinc-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 h-[380px] overflow-y-auto pr-4">
                  {activeTab === "Genre" && (
                    <div className="grid gap-3">
                      {GENRES.map((genre) => (
                        <label key={genre} className="flex items-center gap-3">
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

                  {activeTab === "Language" && (
                    <div className="grid gap-3">
                      {LANGUAGES.map((lang) => (
                        <label key={lang} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(lang)}
                            onChange={() =>
                              setSelectedLanguages((prev) =>
                                prev.includes(lang)
                                  ? prev.filter((x) => x !== lang)
                                  : [...prev, lang]
                              )
                            }
                            className="h-5 w-5"
                          />
                          <span className="text-sm">{lang}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {activeTab === "Format" && (
                    <div className="grid gap-3">
                      {FORMATS.map((format) => (
                        <label key={format} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedFormats.includes(format)}
                            onChange={() =>
                              setSelectedFormats((prev) =>
                                prev.includes(format)
                                  ? prev.filter((x) => x !== format)
                                  : [...prev, format]
                              )
                            }
                            className="h-5 w-5"
                          />
                          <span className="text-sm">{format}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => {
                    setSelectedGenres([]);
                    setSelectedLanguages([]);
                    setSelectedFormats([]);
                  }}
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
