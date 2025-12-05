// src/app/theatre/[slug]/page.tsx
"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* SAMPLE DATA */
const SAMPLE_DATA = {
  id: 1,
  slug: "pvr-arved-transcube",
  name: "PVR Arved Transcube, Vijay Nagar, Ahmedabad",
  distance: "3.8 km away",
  address: "Bandhu Nagar, Vijay Nagar, Ranip, Ahmedabad, Gujarat 382480, India",
  logo: "/movies/pvrc.png",
  amenities: [
    { key: "cancellation", label: "Allows cancellation" },
    { key: "food", label: "Food & Beverages" },
    { key: "parking", label: "Parking" },
    { key: "recliners", label: "Recliners" },
    { key: "digital", label: "Digital Payments" },
    { key: "wheelchair", label: "Wheelchair Friendly" },
    { key: "mobile", label: "Mobile Ticket" },
    { key: "ac", label: "Air Conditioning" },
  ],
  movies: [
    {
      id: 1,
      title: "Dhurandhar",
      poster: "/movies/dhurandhar.jpg",
      certificate: "A",
      language: "Hindi",
      genre: "Action",
      seatType: "RECLINERS",
      price: 250,
      showtimes: ["08:30 AM", "09:30 AM", "10:30 AM", "11:05 AM", "11:45 AM"],
      is3D: false,
      isNewRelease: false,
    },
    {
      id: 2,
      title: "Tere Ishk Mein",
      poster: "/movies/tere-ishq.jpg",
      certificate: "UA16+",
      language: "Hindi",
      genre: "Drama, Romance",
      seatType: "RECLINERS",
      price: 450,
      showtimes: ["11:30 AM", "12:30 PM", "03:00 PM", "04:00 PM", "07:30 PM", "10:00 PM"],
      is3D: true,
      isNewRelease: true,
    },
    {
      id: 3,
      title: "Malayalam Movie",
      poster: "/movies/tere-ishq.jpg",
      certificate: "U",
      language: "Malayalam",
      genre: "Drama",
      seatType: "REGULAR",
      price: 150,
      showtimes: ["06:00 AM", "09:00 AM", "02:00 PM", "08:00 PM"],
      is3D: false,
      isNewRelease: true,
    },
  ],
};

type Movie = typeof SAMPLE_DATA.movies[number];

/* Showtime popover (V arrow below) */
function ShowtimePopover({
  tiers,
}: {
  tiers: { label: string; price: number; status: "available" | "almost" }[];
}) {
  return (
    <div
      className="
        pointer-events-none
        absolute bottom-full left-1/2 z-20 mb-4
        -translate-x-1/2 transform
        w-[340px]
      "
      aria-hidden
    >
      <div className="relative rounded-2xl bg-[#f5f5f6] px-6 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-3 gap-4 text-center">
          {tiers.map((t) => (
            <div key={t.label} className="px-2 py-1">
              <div className="text-xs font-semibold text-zinc-700">{t.label.toUpperCase()}</div>
              <div className="text-sm font-bold mt-2">₹{t.price}</div>
              <div
                className={`mt-2 text-[13px] font-semibold ${
                  t.status === "available" ? "text-emerald-500" : "text-orange-500"
                }`}
              >
                {t.status === "available" ? "AVAILABLE" : "ALMOST FULL"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center -mt-1">
        <svg width="56" height="18" viewBox="0 0 56 18" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <polygon points="0,0 56,0 28,18" fill="#f5f5f6" stroke="#e6e6e6" strokeWidth="1" />
          <polygon points="6,0 50,0 28,14" fill="rgba(255,255,255,0.02)" />
        </svg>
      </div>
    </div>
  );
}

/* simple slugify helper — remove if your API provides movie.slug */
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TheatrePage() {
  const cinema = SAMPLE_DATA;

  const dates = [
    { day: "Thu", date: 4 },
    { day: "Fri", date: 5 },
    { day: "Sat", date: 6 },
    { day: "Sun", date: 7 },
    { day: "Mon", date: 8 },
  ];

  const [selectedDate, setSelectedDate] = useState<number>(6);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);

  const [visibleMovies, setVisibleMovies] = useState<Movie[]>(cinema.movies);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"Language" | "Showtime" | "Price" | "Others">("Language");

  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());
  const [selectedShowtimeRanges, setSelectedShowtimeRanges] = useState<Set<string>>(new Set());
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Set<string>>(new Set());
  const [selectedOthers, setSelectedOthers] = useState<Set<string>>(new Set());

  // hover state now controlled with timers
  const [hoveredShowtime, setHoveredShowtime] = useState<string | null>(null);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const firstInlineAmenities = cinema.amenities.slice(0, 2);
  const remainingCount = cinema.amenities.length - firstInlineAmenities.length;

  function AmenityIcon({ name }: { name: string }) {
    const common = {
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      width: 16,
      height: 16,
    } as any;

    switch (name) {
      case "cancellation":
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <path d="M12 2l7 4v6a7 7 0 01-7 7 7 7 0 01-7-7V6l7-4z" />
            <path d="M9.5 12.5l1.8 1.8L15 10" />
          </svg>
        );
      case "food":
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <path d="M3 7h18" />
            <path d="M6 7v9a3 3 0 006 0V7" />
            <path d="M14 7v9" />
          </svg>
        );
      case "parking":
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <path d="M5 21V3h14v18" />
            <path d="M9 7h3a3 3 0 010 6H9z" />
          </svg>
        );
      case "recliners":
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <path d="M3 13h14v6H3z" />
            <path d="M7 13V7a3 3 0 016 0v6" />
          </svg>
        );
      case "digital":
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M7 8h10" />
          </svg>
        );
      case "wheelchair":
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <circle cx="11" cy="4" r="2" />
            <path d="M6 14a6 6 0 101.5 4.5L12 15" />
            <path d="M14 7l4 4v3" />
          </svg>
        );
      case "mobile":
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <path d="M11 18h2" />
          </svg>
        );
      case "ac":
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M8 12h8" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
    }
  }

  function splitLabelTwoLines(label: string) {
    const idx = label.indexOf(" ");
    if (idx === -1) return [label, ""];
    return [label.slice(0, idx), label.slice(idx + 1)];
  }

  function timeStrTo24h(timeStr: string) {
    const m = timeStr.match(/(\d{1,2}):?(\d{0,2})\s*(AM|PM)/i);
    if (!m) return null;
    let hour = parseInt(m[1], 10);
    const min = m[2] ? parseInt(m[2], 10) : 0;
    const ampm = m[3].toUpperCase();
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return { hour, min };
  }

  function getShowtimeCategory(timeStr: string) {
    const t = timeStrTo24h(timeStr);
    if (!t) return "Unknown";
    const h = t.hour;
    if (h >= 0 && h < 8) return "Early Morning";
    if (h >= 8 && h < 12) return "Morning";
    if (h >= 12 && h < 16) return "Afternoon";
    if (h >= 16 && h < 19) return "Evening";
    return "Night";
  }

  const languageOptions = Array.from(new Set(cinema.movies.map((m) => m.language)));
  const showtimeOptions = ["Early Morning", "Morning", "Afternoon", "Evening", "Night"];
  const priceOptions = ["100-200", "200-300", "300-400", "400-500", "500-700"];
  const othersOptions = ["Premium Seats", "3D", "New Release"];

  function toggleInSet(set: Set<string>, value: string, setSetter: (s: Set<string>) => void) {
    const newSet = new Set(set);
    if (newSet.has(value)) newSet.delete(value);
    else newSet.add(value);
    setSetter(newSet);
  }

  function computeTiers(movie: Movie) {
    const classic = Math.round(movie.price * 1.3);
    const prime = Math.round(movie.price * 1.6);
    const recliner = Math.round(movie.price * 2.2);
    return [
      { label: "Classic", price: classic, available: true },
      { label: "Prime", price: prime, available: true },
      { label: "Recliner", price: recliner, available: movie.seatType?.toLowerCase().includes("reclin") },
    ];
  }

  function runFilters() {
    const result = cinema.movies.filter((movie) => {
      if (selectedLanguages.size > 0 && !selectedLanguages.has(movie.language)) return false;
      if (selectedShowtimeRanges.size > 0) {
        const anyMatch = movie.showtimes.some((t) => selectedShowtimeRanges.has(getShowtimeCategory(t)));
        if (!anyMatch) return false;
      }
      if (selectedPriceRanges.size > 0) {
        const matchesPrice = Array.from(selectedPriceRanges).some((pr) => {
          const [aStr, bStr] = pr.split("-").map((x) => x.trim());
          const a = parseInt(aStr, 10);
          const b = parseInt(bStr, 10);
          return movie.price >= a && movie.price <= b;
        });
        if (!matchesPrice) return false;
      }
      if (selectedOthers.size > 0) {
        if (selectedOthers.has("Premium Seats")) {
          const isPremium = movie.seatType && movie.seatType.toLowerCase().includes("recliner");
          if (!isPremium) return false;
        }
        if (selectedOthers.has("3D")) {
          if (!(movie as any).is3D) return false;
        }
        if (selectedOthers.has("New Release")) {
          if (!(movie as any).isNewRelease) return false;
        }
      }
      return true;
    });

    setVisibleMovies(result);
    return result;
  }

  function applyFilters() {
    runFilters();
    setShowFilterModal(false);
  }

  function clearFilters() {
    setSelectedLanguages(new Set());
    setSelectedShowtimeRanges(new Set());
    setSelectedPriceRanges(new Set());
    setSelectedOthers(new Set());
    setVisibleMovies(cinema.movies);
  }

  // Quick filters...
  function toggleQuickFilter(f: string) {
    const languageQuick = ["Hindi", "Gujarati", "Malayalam"];
    if (languageQuick.includes(f)) {
      const newSet = new Set(selectedLanguages);
      if (newSet.has(f)) newSet.delete(f);
      else newSet.add(f);
      setSelectedLanguages(newSet);
      setTimeout(runFilters, 0);
      return;
    }
    if (f === "Morning") {
      const newSet = new Set(selectedShowtimeRanges);
      if (newSet.has("Morning")) newSet.delete("Morning");
      else newSet.add("Morning");
      setSelectedShowtimeRanges(newSet);
      setTimeout(runFilters, 0);
      return;
    }
    if (f === "After 5 PM") {
      const newSet = new Set(selectedShowtimeRanges);
      const hasEvening = newSet.has("Evening");
      const hasNight = newSet.has("Night");
      if (hasEvening && hasNight) {
        newSet.delete("Evening");
        newSet.delete("Night");
      } else {
        newSet.add("Evening");
        newSet.add("Night");
      }
      setSelectedShowtimeRanges(newSet);
      setTimeout(runFilters, 0);
      return;
    }
    if (f === "3D" || f === "New Release") {
      const newSet = new Set(selectedOthers);
      if (newSet.has(f)) newSet.delete(f);
      else newSet.add(f);
      setSelectedOthers(newSet);
      setTimeout(runFilters, 0);
      return;
    }
  }

  function quickFilterActive(f: string) {
    const languageQuick = ["Hindi", "Gujarati", "Malayalam"];
    if (languageQuick.includes(f)) return selectedLanguages.has(f);
    if (f === "Morning") return selectedShowtimeRanges.has("Morning");
    if (f === "After 5 PM") return selectedShowtimeRanges.has("Evening") && selectedShowtimeRanges.has("Night");
    if (f === "3D") return selectedOthers.has("3D");
    if (f === "New Release") return selectedOthers.has("New Release");
    return false;
  }

  // --- NEW: show/hide with timers to avoid instant flicker on quick mouse passes
  const SHOW_DELAY = 200; // ms before showing popup after mouseenter
  const HIDE_DELAY = 150; // ms before hiding after mouseleave

  function handleMouseEnterShow(id: string) {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
    showTimerRef.current = window.setTimeout(() => {
      setHoveredShowtime(id);
      showTimerRef.current = null;
    }, SHOW_DELAY);
  }

  function handleMouseLeaveHide(id: string) {
    if (showTimerRef.current) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      setHoveredShowtime((h) => (h === id ? null : h));
      hideTimerRef.current = null;
    }, HIDE_DELAY);
  }

  React.useEffect(() => {
    return () => {
      if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto py-10 px-6">
        {/* header */}
        <header className="flex items-start gap-6">
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image src={cinema.logo} alt="logo" fill className="object-contain rounded-full" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-zinc-900 leading-tight">{cinema.name}</h1>
                <p className="text-sm text-zinc-500 mt-1">{cinema.distance}</p>
                <p className="text-sm text-zinc-500 mt-1">{cinema.address}</p>
              </div>

              <div className="ml-4 flex items-start gap-3">
                <button aria-label="favourite" className="p-2 rounded-full border border-zinc-200 hover:bg-zinc-50">
                  <Heart className="w-5 h-5 text-zinc-700" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Services & amenities */}
        <section className="mt-8">
          <h3 className="text-sm font-semibold text-zinc-800">Services & amenities</h3>

          {!showAllAmenities && (
            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
              {firstInlineAmenities.map((a) => {
                const [top, bottom] = splitLabelTwoLines(a.label);
                return (
                  <div key={a.key} className="inline-flex flex-col items-center gap-0">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-zinc-400 border border-zinc-100">
                      <AmenityIcon name={a.key} />
                    </div>
                    <div className="mt-1 text-center text-xs text-zinc-600 leading-tight">
                      <div>{top}</div>
                      {bottom && <div>{bottom}</div>}
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => setShowAllAmenities(true)}
                className="ml-2 text-sm font-medium text-zinc-700"
                aria-expanded={showAllAmenities}
              >
                +{remainingCount} more
              </button>
            </div>
          )}

          {showAllAmenities && (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <div className="flex items-start justify-start gap-2 px-2">
                  {cinema.amenities.map((a) => {
                    const [top, bottom] = splitLabelTwoLines(a.label);
                    return (
                      <div key={a.key} className="flex flex-col items-center gap-0 mr-4">
                        <div className="h-8 w-8 flex items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-400">
                          <AmenityIcon name={a.key} />
                        </div>
                        <div className="text-xs text-zinc-600 text-center leading-tight mt-1">
                          <div>{top}</div>
                          {bottom && <div>{bottom}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Dates + filters */}
        <section className="mt-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="px-3 py-3 rounded-full bg-zinc-100 text-xs font-semibold tracking-wider"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  DEC
                </div>
              </div>

              <div className="flex gap-3 items-center">
                {dates.map((d) => (
                  <div
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    role="button"
                    tabIndex={0}
                    className={`cursor-pointer text-center w-20 rounded-lg py-3 border transition-all select-none ${
                      selectedDate === d.date ? "bg-zinc-900 text-white border-zinc-900 shadow-lg" : "bg-white text-zinc-800 border-zinc-200"
                    }`}
                  >
                    <p className="text-xs text-zinc-400">DEC</p>
                    <p className="text-lg font-bold leading-tight">{d.date}</p>
                    <p className="text-xs">{d.day}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setShowFilterModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-white"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {["Hindi", "Gujarati", "Malayalam", "3D", "Morning", "After 5 PM", "New Release"].map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleQuickFilter(f)}
                  className={`px-4 py-2 rounded-full border text-sm ${quickFilterActive(f) ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-800"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Legend */}
        <section className="mt-6">
          <div className="bg-zinc-100 rounded-md p-4">
            <div className="flex items-center gap-6 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-black inline-block" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                <span>Filling fast</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span>Almost full</span>
              </div>
              <div className="ml-auto text-sm text-zinc-500">English subtitle</div>
            </div>
          </div>
        </section>

        {/* Movie list */}
        <section className="mt-10">
          <div className="space-y-12">
            {visibleMovies.map((movie) => {
              const movieSlug = (movie as any).slug ? (movie as any).slug : slugify(movie.title);
              return (
                <article key={movie.id}>
                  <div className="flex items-start gap-6">
                    {/* Poster clickable -> movie page */}
                    <div className="h-24 w-20 relative flex-shrink-0 rounded-md overflow-hidden shadow-sm border border-zinc-100">
                      <Link href={`/movie/${movieSlug}`} prefetch={false} aria-label={`Open ${movie.title} details`}>
                        <div className="w-full h-full">
                          <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
                        </div>
                      </Link>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          {/* Title clickable -> movie page */}
                          <h2 className="text-lg font-semibold text-zinc-900">
                            <Link href={`/movie/${movieSlug}`} prefetch={false}>
                              <span className="hover:underline cursor-pointer">{movie.title}</span>
                            </Link>
                          </h2>

                          <p className="text-sm text-zinc-500 mt-1">
                            {movie.certificate} &nbsp;|&nbsp; {movie.language}
                          </p>
                          <p className="text-sm text-zinc-500 mt-2">{movie.genre}</p>
                        </div>

                        <div className="text-right text-sm text-zinc-500">
                          <div className="font-medium">{movie.seatType}</div>
                          <div className="text-xs mt-1">₹{movie.price}</div>
                        </div>
                      </div>

                      <div className="mt-6 mb-3">
                        <h4 className="text-sm font-semibold text-zinc-800">{movie.language}</h4>
                      </div>

                      <div className="flex gap-4 flex-wrap">
                        {movie.showtimes.map((time, idx) => {
                          const id = `${movie.id}|${time}`;
                          const tiers = computeTiers(movie);
                          return (
                            <div
                              key={idx}
                              className="relative"
                              onMouseEnter={() => handleMouseEnterShow(id)}
                              onMouseLeave={() => handleMouseLeaveHide(id)}
                              onFocus={() => handleMouseEnterShow(id)}
                              onBlur={() => handleMouseLeaveHide(id)}
                            >
                              <button
                                onClick={() => {
                                  const sessionId = `${movie.id}-${time.replace(/ |:/g, "")}`;
                                  window.location.href = `/movies/seat-layout/${sessionId}`;
                                }}
                                className="min-w-[140px] px-6 py-4 rounded-2xl border border-zinc-200 text-sm text-zinc-800 hover:shadow hover:bg-zinc-50 transition flex flex-col items-center group"
                              >
                                <span className="font-medium">{time}</span>
                                <span className="text-xs text-zinc-500 mt-1">{movie.seatType}</span>
                              </button>

                              {hoveredShowtime === id && (
                                <ShowtimePopover
                                  tiers={tiers.map((t) => ({
                                    label: t.label,
                                    price: t.price,
                                    status: "available",
                                  }))}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <hr className="my-6 border-zinc-100" />
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      {/* Filter modal */}
      {showFilterModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-start justify-center px-4 py-10" onClick={() => setShowFilterModal(false)}>
          <div className="w-[760px] max-w-full bg-white rounded-2xl p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button aria-label="close" onClick={() => setShowFilterModal(false)} className="absolute right-6 top-6 w-10 h-10 rounded-full border flex items-center justify-center">
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-6">Filter by</h3>

            <div className="flex gap-6">
              <div className="w-36">
                {(["Language", "Showtime", "Price", "Others"] as const).map((t) => (
                  <div key={t} onClick={() => setActiveTab(t)} className={`py-3 px-3 rounded-l-lg cursor-pointer ${activeTab === t ? "bg-gradient-to-r from-violet-200 to-transparent text-zinc-900" : "text-zinc-700"}`}>
                    {t}
                  </div>
                ))}
              </div>

              <div className="flex-1 bg-zinc-100 rounded-lg p-6 min-h-[340px]">
                {activeTab === "Language" && (
                  <div className="space-y-4">
                    {languageOptions.map((lang) => (
                      <label key={lang} className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedLanguages.has(lang)} onChange={() => { toggleInSet(selectedLanguages, lang, setSelectedLanguages); setTimeout(runFilters, 0); }} className="w-5 h-5 rounded border" />
                        <span className="font-medium">{lang}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activeTab === "Showtime" && (
                  <div className="space-y-4">
                    {showtimeOptions.map((opt) => (
                      <label key={opt} className="flex items-start gap-3">
                        <input type="checkbox" checked={selectedShowtimeRanges.has(opt)} onChange={() => { toggleInSet(selectedShowtimeRanges, opt, setSelectedShowtimeRanges); setTimeout(runFilters, 0); }} className="w-5 h-5 rounded border mt-1" />
                        <div>
                          <div className="font-medium">{opt}</div>
                          <div className="text-xs text-zinc-500">
                            {opt === "Early Morning" && "12 AM To 8 AM"}
                            {opt === "Morning" && "8 AM To 12 PM"}
                            {opt === "Afternoon" && "12 PM To 4 PM"}
                            {opt === "Evening" && "4 PM To 7 PM"}
                            {opt === "Night" && "7 PM To 12 AM"}
                          </div>
                        </div>
                      </label>
                    ))}
                    <div className="text-xs text-zinc-500 mt-2">Tip: use "After 5 PM" quick button for Evening+Night together</div>
                  </div>
                )}

                {activeTab === "Price" && (
                  <div className="space-y-4">
                    {priceOptions.map((pr) => (
                      <label key={pr} className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedPriceRanges.has(pr)} onChange={() => { toggleInSet(selectedPriceRanges, pr, setSelectedPriceRanges); setTimeout(runFilters, 0); }} className="w-5 h-5 rounded border" />
                        <span className="font-medium">₹{pr.replace("-", " - ₹")}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activeTab === "Others" && (
                  <div className="space-y-4">
                    {othersOptions.map((o) => (
                      <label key={o} className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedOthers.has(o)} onChange={() => { toggleInSet(selectedOthers, o, setSelectedOthers); setTimeout(runFilters, 0); }} className="w-5 h-5 rounded border" />
                        <span className="font-medium">{o}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => { clearFilters(); }} className="text-sm underline text-zinc-600">Clear filter</button>

              <div>
                <button onClick={() => { applyFilters(); }} className="px-8 py-3 bg-zinc-900 text-white rounded-2xl shadow">View {visibleMovies.length} shows</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
