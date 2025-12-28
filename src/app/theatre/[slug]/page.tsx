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
      showtimes: [
        "02:45 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:15 PM",
        "09:15 PM",
        "10:15 PM",
        "11:15 PM",
        "11:50 PM",
      ],
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

/* Showtime popover (with V arrow), responsive width */
function ShowtimePopover({
  tiers,
}: {
  tiers: { label: string; price: number; status: "available" | "almost" }[];
}) {
  return (
    <div
      className="
        absolute bottom-full left-1/2 z-40 mb-3
        -translate-x-1/2 transform
        w-[260px] sm:w-[360px]
        pointer-events-auto
      "
      aria-hidden
    >
      <div className="relative rounded-xl bg-white px-4 py-3 shadow-md border border-[rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-3 gap-3 text-center">
          {tiers.map((t) => (
            <div key={t.label} className="px-1 py-1">
              <div className="text-xs font-medium text-zinc-700">{t.label.toUpperCase()}</div>
              <div className="text-lg font-semibold mt-1">₹{t.price}</div>
              <div className={`mt-1 text-[13px] font-semibold ${t.status === "available" ? "text-emerald-600" : "text-orange-500"}`}>
                {t.status === "available" ? "AVAILABLE" : "ALMOST FULL"}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 right-0 -bottom-[10px] flex justify-center pointer-events-none">
          <svg width="56" height="18" viewBox="0 0 56 18" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <polygon points="0,0 56,0 28,18" fill="rgba(0,0,0,0.04)" />
            <polygon points="6,0 50,0 28,14" fill="#ffffff" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* helper */
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

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const dateOptions = React.useMemo(() => {
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    return Array.from({ length: 4 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        key: d.toISOString().slice(0, 10),
        date: d,
        dayNum: d.getDate().toString(),
        dayLabel: dayNames[d.getDay()],
        month: monthNames[d.getMonth()],
      };
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);

  const [visibleMovies, setVisibleMovies] = useState<Movie[]>(cinema.movies);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"Language" | "Showtime" | "Price" | "Others">("Language");

  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());
  const [selectedShowtimeRanges, setSelectedShowtimeRanges] = useState<Set<string>>(new Set());
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Set<string>>(new Set());
  const [selectedOthers, setSelectedOthers] = useState<Set<string>>(new Set());

  // hover timers and hovered id
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

  // Centralized filtering using explicit sets to avoid async state race conditions
  function filterWithSets(langs: Set<string>, showtimes: Set<string>, prices: Set<string>, others: Set<string>) {
    const result = cinema.movies.filter((movie) => {
      if (langs.size > 0 && !langs.has(movie.language)) return false;

      if (showtimes.size > 0) {
        const anyMatch = movie.showtimes.some((t) => showtimes.has(getShowtimeCategory(t)));
        if (!anyMatch) return false;
      }

      if (prices.size > 0) {
        const matchesPrice = Array.from(prices).some((pr) => {
          const [aStr, bStr] = pr.split("-").map((x) => x.trim());
          const a = parseInt(aStr, 10);
          const b = parseInt(bStr, 10);
          return movie.price >= a && movie.price <= b;
        });
        if (!matchesPrice) return false;
      }

      if (others.size > 0) {
        if (others.has("Premium Seats")) {
          const isPremium = movie.seatType && movie.seatType.toLowerCase().includes("recliner");
          if (!isPremium) return false;
        }
        if (others.has("3D") && !(movie as any).is3D) return false;
        if (others.has("New Release") && !(movie as any).isNewRelease) return false;
      }

      return true;
    });

    setVisibleMovies(result);
    return result;
  }

  function runFilters() {
    return filterWithSets(selectedLanguages, selectedShowtimeRanges, selectedPriceRanges, selectedOthers);
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

  // Quick filters logic (immediate filtering)
  function toggleQuickFilter(f: string) {
    const languageQuick = ["Hindi", "Gujarati", "Malayalam"];

    if (languageQuick.includes(f)) {
      const newLangs = new Set(selectedLanguages);
      if (newLangs.has(f)) newLangs.delete(f);
      else newLangs.add(f);
      setSelectedLanguages(newLangs);
      filterWithSets(newLangs, selectedShowtimeRanges, selectedPriceRanges, selectedOthers);
      return;
    }

    if (f === "Morning") {
      const newShow = new Set(selectedShowtimeRanges);
      if (newShow.has("Morning")) newShow.delete("Morning");
      else newShow.add("Morning");
      setSelectedShowtimeRanges(newShow);
      filterWithSets(selectedLanguages, newShow, selectedPriceRanges, selectedOthers);
      return;
    }

    if (f === "After 5 PM") {
      const newShow = new Set(selectedShowtimeRanges);
      const hasEvening = newShow.has("Evening");
      const hasNight = newShow.has("Night");
      if (hasEvening && hasNight) {
        newShow.delete("Evening");
        newShow.delete("Night");
      } else {
        newShow.add("Evening");
        newShow.add("Night");
      }
      setSelectedShowtimeRanges(newShow);
      filterWithSets(selectedLanguages, newShow, selectedPriceRanges, selectedOthers);
      return;
    }

    if (f === "3D" || f === "New Release") {
      const newOthers = new Set(selectedOthers);
      if (newOthers.has(f)) newOthers.delete(f);
      else newOthers.add(f);
      setSelectedOthers(newOthers);
      filterWithSets(selectedLanguages, selectedShowtimeRanges, selectedPriceRanges, newOthers);
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

  // Hover show/hide with small delays to reduce flicker
  const SHOW_DELAY = 180;
  const HIDE_DELAY = 120;

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

  // Build chips
  const QUICK_LANGUAGE_IDS = ["Hindi", "Gujarati", "Malayalam"];
  const QUICK_SHOW_IDS = ["Morning", "Evening", "Night"];
  const QUICK_OTHERS_IDS = ["3D", "New Release"];

  const quickChips: { key: string; group: "QUICK"; id: string; label: string }[] = [];
  QUICK_LANGUAGE_IDS.forEach((lang) => {
    if (selectedLanguages.has(lang)) quickChips.push({ key: `Q-LANG-${lang}`, group: "QUICK", id: lang, label: lang });
  });
  if (selectedShowtimeRanges.has("Morning")) quickChips.push({ key: `Q-SHOW-MORNING`, group: "QUICK", id: "Morning", label: "Morning" });
  if (selectedShowtimeRanges.has("Evening") && selectedShowtimeRanges.has("Night")) {
    quickChips.push({ key: `Q-SHOW-AFTER5`, group: "QUICK", id: "AFTER5", label: "After 5 PM" });
  }
  if (selectedOthers.has("3D")) quickChips.push({ key: `Q-OTHERS-3D`, group: "QUICK", id: "3D", label: "3D" });
  if (selectedOthers.has("New Release")) quickChips.push({ key: `Q-OTHERS-NEW`, group: "QUICK", id: "New Release", label: "New Release" });

  const modalChips: { key: string; group: "LANG" | "SHOW" | "PRICE" | "OTHERS"; id: string; label: string }[] = [];
  selectedLanguages.forEach((lang) => {
    if (QUICK_LANGUAGE_IDS.includes(lang)) return;
    modalChips.push({ key: `LANG-${lang}`, group: "LANG", id: lang, label: lang });
  });
  selectedShowtimeRanges.forEach((sr) => {
    if (QUICK_SHOW_IDS.includes(sr)) return;
    modalChips.push({ key: `SHOW-${sr}`, group: "SHOW", id: sr, label: sr });
  });
  selectedPriceRanges.forEach((pr) => {
    modalChips.push({ key: `PRICE-${pr}`, group: "PRICE", id: pr, label: `₹${pr.replace("-", " - ₹")}` });
  });
  selectedOthers.forEach((o) => {
    if (QUICK_OTHERS_IDS.includes(o)) return;
    modalChips.push({ key: `OTHERS-${o}`, group: "OTHERS", id: o, label: o });
  });

  const combinedChips = [...quickChips, ...modalChips];

  function handleRemoveChip(group: "LANG" | "SHOW" | "PRICE" | "OTHERS" | "QUICK", id: string) {
    if (group === "QUICK") {
      if (id === "AFTER5") {
        const s = new Set(selectedShowtimeRanges);
        s.delete("Evening");
        s.delete("Night");
        setSelectedShowtimeRanges(s);
        filterWithSets(selectedLanguages, s, selectedPriceRanges, selectedOthers);
        return;
      } else if (QUICK_LANGUAGE_IDS.includes(id)) {
        const s = new Set(selectedLanguages);
        s.delete(id);
        setSelectedLanguages(s);
        filterWithSets(s, selectedShowtimeRanges, selectedPriceRanges, selectedOthers);
        return;
      } else if (id === "3D" || id === "New Release") {
        const s = new Set(selectedOthers);
        s.delete(id);
        setSelectedOthers(s);
        filterWithSets(selectedLanguages, selectedShowtimeRanges, selectedPriceRanges, s);
        return;
      } else if (id === "Morning") {
        const s = new Set(selectedShowtimeRanges);
        s.delete("Morning");
        setSelectedShowtimeRanges(s);
        filterWithSets(selectedLanguages, s, selectedPriceRanges, selectedOthers);
        return;
      }
    } else if (group === "LANG") {
      const s = new Set(selectedLanguages);
      s.delete(id);
      setSelectedLanguages(s);
      filterWithSets(s, selectedShowtimeRanges, selectedPriceRanges, selectedOthers);
      return;
    } else if (group === "SHOW") {
      const s = new Set(selectedShowtimeRanges);
      s.delete(id);
      setSelectedShowtimeRanges(s);
      filterWithSets(selectedLanguages, s, selectedPriceRanges, selectedOthers);
      return;
    } else if (group === "PRICE") {
      const s = new Set(selectedPriceRanges);
      s.delete(id);
      setSelectedPriceRanges(s);
      filterWithSets(selectedLanguages, selectedShowtimeRanges, s, selectedOthers);
      return;
    } else if (group === "OTHERS") {
      const s = new Set(selectedOthers);
      s.delete(id);
      setSelectedOthers(s);
      filterWithSets(selectedLanguages, selectedShowtimeRanges, selectedPriceRanges, s);
      return;
    }

    setTimeout(runFilters, 0);
  }

  const activeQuickSet = new Set<string>();
  quickChips.forEach((c) => {
    if (c.id === "AFTER5") activeQuickSet.add("After 5 PM");
    else activeQuickSet.add(c.id);
  });

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-6">
        {/* header */}
       <section
  className="
    flex items-start justify-between gap-4
    sm:flex-row sm:items-start sm:gap-6
  "
>
  {/* LEFT CONTENT */}
  <div className="flex-1 min-w-0">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-lg sm:text-2xl font-semibold text-zinc-900 leading-snug sm:leading-tight">
          {cinema.name}
        </h1>

        <p className="text-sm text-zinc-500 mt-1">
          {cinema.distance}
        </p>

        <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
          {cinema.address}
        </p>
      </div>

      {/* ❤️ stays right ONLY on desktop (UNCHANGED) */}
      <div className="hidden sm:flex ml-4 items-start gap-3">
        <button
          aria-label="favourite"
          className="p-2 rounded-full border border-zinc-200 hover:bg-zinc-50"
        >
          <Heart className="w-5 h-5 text-zinc-700" />
        </button>
      </div>
    </div>
  </div>

  {/* RIGHT LOGO */}
  <div className="flex-shrink-0">
    <div className="relative h-14 w-14 sm:h-20 sm:w-20">
      <Image
        src={cinema.logo}
        alt="logo"
        fill
        className="object-contain rounded-full"
      />
    </div>
  </div>
</section>



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
        <section className="mt-6 border-b border-zinc-200 pb-4">
  {/* DATE STRIP */}
  <div className="flex items-center gap-2">
  {/* LEFT MONTH PILL */}
  <div className="flex h-[48px] w-[36px] flex-col items-center justify-center rounded-lg bg-zinc-100 text-[10px] font-semibold tracking-[0.14em] text-zinc-500">
    <span className="uppercase">
      {dateOptions[selectedDateIndex]?.month || ""}
    </span>
  </div>

  {/* DATES */}
  <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
    {dateOptions.map((d, idx) => {
      const active = idx === selectedDateIndex;

      return (
        <React.Fragment key={d.key}>
          {/* DATE BUTTON */}
          <button
            onClick={() => {
              setSelectedDateIndex(idx);
              setSelectedDate(d.date.getDate());
            }}
            className={`
              flex h-[48px] w-[48px] flex-shrink-0
              flex-col items-center justify-center
              rounded-lg
              ${active ? "bg-black" : "bg-transparent"}
            `}
          >
            {/* DAY NUMBER */}
            <span
              className={`text-[15px] font-semibold leading-tight ${
                active ? "text-white" : "text-zinc-900"
              }`}
            >
              {d.dayNum}
            </span>

            {/* DAY LABEL (NO EXTRA GAP) */}
            <span
              className={`text-[10px] leading-tight ${
                active ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              {d.dayLabel}
            </span>
          </button>

          {/* DIVIDER */}
          {idx < dateOptions.length - 1 && (
            <span className="h-7 w-px flex-shrink-0 bg-zinc-200" />
          )}
        </React.Fragment>
      );
    })}
  </div>
</div>


  {/* FILTER BAR */}
  <div className="mt-4">
    <div className="flex w-full items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-nowrap">
      <button
        onClick={() => setShowFilterModal(true)}
        className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>

      {combinedChips.map((chip) => (
        <button
          key={chip.key}
          onClick={() => handleRemoveChip(chip.group as any, chip.id)}
          className="flex-shrink-0 rounded-full border border-[#7c3aed] bg-[#eae5ff] px-4 py-2 text-sm font-medium text-[#4b1fa8]"
        >
          {chip.label}
        </button>
      ))}

      <div className="flex-shrink-0 h-6 w-px bg-zinc-200" />

      {["Hindi", "Gujarati", "Malayalam", "3D", "Morning", "After 5 PM", "New Release"].map(
        (f, idx) => {
          if (activeQuickSet.has(f)) return null;

          return (
            <button
              key={idx}
              onClick={() => toggleQuickFilter(f)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium border ${
                quickFilterActive(f)
                  ? "bg-black text-white border-black"
                  : "bg-white text-zinc-800 border-zinc-300"
              }`}
            >
              {f}
            </button>
          );
        }
      )}
    </div>
  </div>

  {/* LEGEND */}
  <div className="mt-4 flex gap-6 rounded-md bg-zinc-100 px-4 py-2 text-xs text-zinc-600">
    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-black" />
      Available
    </span>
    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-yellow-400" />
      Filling fast
    </span>
    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-rose-500" />
      Almost full
    </span>
  </div>
</section>




        

        {/* Movie list */}
        <section className="mt-10">
  <div className="space-y-10">
    {visibleMovies.map((movie) => {
      const movieSlug =
        (movie as any).slug || slugify(movie.title);

      return (
        <article key={movie.id}>
          {/* TOP ROW */}
          <div className="flex items-start gap-4 sm:gap-6">
            {/* POSTER */}
            <div className="shrink-0">
              <div className="h-24 w-20 sm:h-28 sm:w-24 relative rounded-lg overflow-hidden border">
                <Link href={`/movie/${movieSlug}`}>
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
            </div>

            {/* DETAILS */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-zinc-900 leading-snug">
                {movie.title}
              </h2>

              <p className="text-sm text-zinc-500 mt-0.5">
                {movie.certificate} | {movie.language}
              </p>

              <p className="text-sm text-zinc-500 mt-1">
                {movie.genre}
              </p>
            </div>
          </div>

          {/* LANGUAGE LABEL (MOBILE STYLE) */}
          <div className="mt-4 text-sm font-medium text-zinc-900">
            {movie.language}
          </div>

          {/* SHOWTIMES */}
          <div className="mt-3">
  <div
    className="
      grid grid-cols-3        /* ✅ MOBILE: 3 per row */
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-6
      gap-3
    "
  >
    {movie.showtimes.map((time, idx) => {
      const id = `${movie.id}|${time}`;

      return (
        <div
          key={idx}
          className="relative"
          onMouseEnter={() => handleMouseEnterShow(id)}
          onMouseLeave={() => handleMouseLeaveHide(id)}
        >
          <button
            onClick={() => {
              const sessionId = `${movie.id}-${time.replace(/ |:/g, "")}`;
              window.location.href = `/movies/seat-layout/${sessionId}`;
            }}
            className="
              w-full
              h-12 sm:h-14
              rounded-xl
              border border-zinc-300
              text-sm font-medium
              text-zinc-900
              bg-white
              hover:border-zinc-900
              flex items-center justify-center
            "
          >
            {time}
          </button>

          {/* POPOVER – DESKTOP ONLY */}
          {hoveredShowtime === id && (
            <div className="hidden md:block">
              <ShowtimePopover
                tiers={computeTiers(movie).map((t) => ({
                  label: t.label,
                  price: t.price,
                  status: "available",
                }))}
              />
            </div>
          )}
        </div>
      );
    })}
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

      {/* Filter modal (unchanged behaviour) */}
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
                        <input
                          type="checkbox"
                          checked={selectedLanguages.has(lang)}
                          onChange={() => {
                            const newSet = new Set(selectedLanguages);
                            if (newSet.has(lang)) newSet.delete(lang);
                            else newSet.add(lang);
                            setSelectedLanguages(newSet);
                            filterWithSets(newSet, selectedShowtimeRanges, selectedPriceRanges, selectedOthers);
                          }}
                          className="w-5 h-5 rounded border"
                        />
                        <span className="font-medium">{lang}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activeTab === "Showtime" && (
                  <div className="space-y-4">
                    {showtimeOptions.map((opt) => (
                      <label key={opt} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedShowtimeRanges.has(opt)}
                          onChange={() => {
                            const newSet = new Set(selectedShowtimeRanges);
                            if (newSet.has(opt)) newSet.delete(opt);
                            else newSet.add(opt);
                            setSelectedShowtimeRanges(newSet);
                            filterWithSets(selectedLanguages, newSet, selectedPriceRanges, selectedOthers);
                          }}
                          className="mt-1 h-5 w-5 rounded border"
                        />
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
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.has(pr)}
                          onChange={() => {
                            const newSet = new Set(selectedPriceRanges);
                            if (newSet.has(pr)) newSet.delete(pr);
                            else newSet.add(pr);
                            setSelectedPriceRanges(newSet);
                            filterWithSets(selectedLanguages, selectedShowtimeRanges, newSet, selectedOthers);
                          }}
                          className="w-5 h-5 rounded border"
                        />
                        <span className="font-medium">₹{pr.replace("-", " - ₹")}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activeTab === "Others" && (
                  <div className="space-y-4">
                    {othersOptions.map((o) => (
                      <label key={o} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedOthers.has(o)}
                          onChange={() => {
                            const newSet = new Set(selectedOthers);
                            if (newSet.has(o)) newSet.delete(o);
                            else newSet.add(o);
                            setSelectedOthers(newSet);
                            filterWithSets(selectedLanguages, selectedShowtimeRanges, selectedPriceRanges, newSet);
                          }}
                          className="w-5 h-5 rounded border"
                        />
                        <span className="font-medium">{o}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => clearFilters()} className="text-sm underline text-zinc-600">Clear filter</button>

              <div>
                <button onClick={() => applyFilters()} className="px-8 py-3 bg-zinc-900 text-white rounded-2xl shadow">View {visibleMovies.length} shows</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
