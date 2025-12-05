// src/app/theatre/[slug]/page.tsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

/* SAMPLE DATA (unchanged) */
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

/* SHOW_SLOTS */
const SHOW_SLOTS = [
  { id: "show-0825", time: "08:25 AM", label: "RECLINERS" },
  { id: "show-0930", time: "09:30 AM", label: "RECLINERS" },
  { id: "show-1030", time: "10:30 AM", label: "RECLINERS" },
  { id: "show-1345", time: "01:45 PM", label: "RECLINERS" },
  { id: "show-1530", time: "03:30 PM", label: "RECLINERS" },
  { id: "show-1800", time: "06:00 PM", label: "RECLINERS" },
  { id: "show-1900", time: "07:00 PM", label: "RECLINERS" },
  { id: "show-1945", time: "07:45 PM", label: "RECLINERS" },
];

/* Seat data helpers (from previous seat-layout) */
type SeatStatus = "available" | "occupied" | "selected";
type Seat = { id: string; number: string; status: SeatStatus };
type Row = { label: string; seats: Seat[] };
type Section = { id: string; name: string; price: number; rows: Row[] };

function makeRow(label: string, count: number, occupied: number[] = []): Row {
  const seats: Seat[] = Array.from({ length: count }, (_, i) => {
    const num = i + 1;
    return {
      id: `${label}-${num}`,
      number: String(num),
      status: occupied.includes(num) ? "occupied" : "available",
    };
  });
  return { label, seats };
}

/* small example sections — adapt as needed */
const INITIAL_SECTIONS: Section[] = [
  {
    id: "premium",
    name: "PREMIUM",
    price: 250,
    rows: [
      makeRow("M", 12, [5, 6, 7]),
      makeRow("L", 12, [6, 7, 8]),
      makeRow("K", 12, [1, 2]),
      makeRow("J", 12),
    ],
  },
  {
    id: "classic",
    name: "CLASSIC",
    price: 200,
    rows: [makeRow("D", 12), makeRow("C", 12), makeRow("B", 12), makeRow("A", 12)],
  },
];

/* Showtime popover (unchanged) */
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
              <div className={`mt-2 text-[13px] font-semibold ${t.status === "available" ? "text-emerald-500" : "text-orange-500"}`}>
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

export default function TheatrePage() {
  const cinema = SAMPLE_DATA;
  const router = useRouter();

  const dates = [
    { day: "Thu", date: 4 },
    { day: "Fri", date: 5 },
    { day: "Sat", date: 6 },
    { day: "Sun", date: 7 },
    { day: "Mon", date: 8 },
  ];

  const [selectedDate, setSelectedDate] = useState<number>(5); // default shown in header
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);

  const [visibleMovies, setVisibleMovies] = useState<Movie[]>(cinema.movies);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"Language" | "Showtime" | "Price" | "Others">("Language");

  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());
  const [selectedShowtimeRanges, setSelectedShowtimeRanges] = useState<Set<string>>(new Set());
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Set<string>>(new Set());
  const [selectedOthers, setSelectedOthers] = useState<Set<string>>(new Set());

  // hover state for popover
  const [hoveredShowtime, setHoveredShowtime] = useState<string | null>(null);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  // active slot
  const [activeSlotId, setActiveSlotId] = useState<string>(SHOW_SLOTS[1]?.id || "show-0930");

  // seat sections state
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);

  const firstInlineAmenities = cinema.amenities.slice(0, 2);
  const remainingCount = cinema.amenities.length - firstInlineAmenities.length;

  // toggle seat selection
  function handleSeatClick(sectionId: string, rowLabel: string, seatId: string) {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          rows: sec.rows.map((row) => {
            if (row.label !== rowLabel) return row;
            return {
              ...row,
              seats: row.seats.map((seat) => {
                if (seat.id !== seatId) return seat;
                if (seat.status === "occupied") return seat;
                return { ...seat, status: seat.status === "selected" ? "available" : "selected" };
              }),
            };
          }),
        };
      })
    );
  }

  const selectedSeats = sections.flatMap((s) =>
    s.rows.flatMap((r) => r.seats.filter((seat) => seat.status === "selected").map((seat) => ({ ...seat, sectionId: s.id, sectionPrice: s.price } as any)))
  );

  const totalAmount = selectedSeats.reduce((sum, s) => sum + (s.sectionPrice ?? 0), 0);

  // timers for showtime popover (kept from previous)
  const SHOW_DELAY = 200;
  const HIDE_DELAY = 150;
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

  // NEW: navigate to internal /movies/order-review/[orderId] route
  function handlePay() {
    if (selectedSeats.length === 0) return;

    // Ideally get real orderId by POSTing to your backend here.
    // Temporary generated order id:
    const orderId = `ord-${Math.random().toString(36).slice(2, 10)}`;

    // Example query params — keep encsessionid if needed by order-review page
    const enc = "1020682-26488-ob4ywm-2j8pr99vjk";
    const type = "cinemas";
    const year = 2025;
    const month = "12";
    const day = String(selectedDate).padStart(2, "0");
    const fromdate = `${year}-${month}-${day}`;

    const seatsParam = selectedSeats.map((s: any) => s.id).join(",");
    const amountParam = totalAmount;

    const pathname = `/movies/order-review/${encodeURIComponent(orderId)}`;
    const search =
      `?encsessionid=${encodeURIComponent(enc)}` +
      `&type=${encodeURIComponent(type)}` +
      `&fromdate=${encodeURIComponent(fromdate)}` +
      `&seats=${encodeURIComponent(seatsParam)}` +
      `&amount=${encodeURIComponent(String(amountParam))}`;

    // navigate internally
    router.push(pathname + search);
  }

  // small helpers used earlier (icons, etc.)
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
      default:
        return (
          <svg viewBox="0 0 24 24" {...common}>
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
    }
  }

  return (
    <>
      <Header />

      {/* NOTE: increased max-w on main so card can be wider on desktop */}
      <main className="mx-auto flex w-full max-w-7xl justify-center px-3 pb-32 pt-6 sm:px-4">
        {/* center card with explicit max width (wider than before) */}
        <div className="relative w-full max-w-[1200px] rounded-[20px] border border-zinc-200 bg-white shadow-sm">
          {/* right side grey scroll bar line */}
          <div className="pointer-events-none absolute right-6 top-24 bottom-8 w-[4px] rounded-full bg-zinc-300/80" />

          {/* TOP DATE + TIME STRIP */}
          <div className="border-b border-zinc-200 px-4 pt-5 pb-4 sm:px-8">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
              {/* Date block */}
              <div className="flex min-w-[72px] flex-col items-center justify-center rounded-[999px] px-2 py-1 text-center">
                <span className="text-[11px] font-semibold text-zinc-700">Fri</span>
                <span className="text-xs font-medium text-zinc-800">05 Dec</span>
              </div>

              {/* Time chips */}
              <div className="flex gap-3">
                {SHOW_SLOTS.map((slot) => {
                  const isActive = slot.id === activeSlotId;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setActiveSlotId(slot.id)}
                      onMouseEnter={() => handleMouseEnterShow(slot.id)}
                      onMouseLeave={() => handleMouseLeaveHide(slot.id)}
                      className={[
                        "flex min-w-[130px] md:min-w-[150px] flex-col items-center justify-center rounded-[999px] border px-4 py-2 text-xs font-semibold tracking-wide",
                        isActive ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400",
                      ].join(" ")}
                    >
                      <span className="text-[12px]">{slot.time}</span>
                      {slot.label && <span className={isActive ? "mt-[2px] text-[10px] uppercase text-zinc-100" : "mt-[2px] text-[10px] uppercase text-zinc-500"}>{slot.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SCROLL AREA – seats */}
          <div className="relative overflow-x-auto px-6 lg:px-12 pb-32 pt-10 sm:px-8">
            {/* render sections */}
            {sections.map((section) => (
              <div key={section.id} className="mb-14">
                <div className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                  {section.name} : ₹{section.price}
                </div>

                <div className="flex flex-col items-center gap-2">
                  {section.rows.map((row) => (
                    <div key={row.label} className="flex items-center gap-4 whitespace-nowrap">
                      <span className="w-6 text-right text-xs font-medium text-zinc-600">{row.label}</span>
                      <div className="flex gap-3">
                        {row.seats.map((seat) => {
                          const base = "flex h-9 w-9 items-center justify-center rounded-[10px] border text-[11px] font-semibold transition-all";
                          let stateClasses =
                            "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900 hover:shadow-sm cursor-pointer";
                          if (seat.status === "occupied") stateClasses = "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400";
                          else if (seat.status === "selected") stateClasses = "border-[#9810fa] bg-[#9810fa] text-white shadow-md";
                          return (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(section.id, row.label, seat.id)}
                              className={`${base} ${stateClasses}`}
                              aria-pressed={seat.status === "selected"}
                              aria-disabled={seat.status === "occupied"}
                            >
                              {seat.number}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* SCREEN + LEGEND */}
            <div className="mt-2 flex flex-col items-center gap-4 pb-4">
              <div className="mt-4 flex w-full max-w-3xl justify-center">
                <div className="h-16 w-[80%] overflow-hidden">
                  <div className="mx-auto h-10 w-full rounded-[999px] bg-gradient-to-t from-[#aa73ff] to-[#cdaeff] shadow-[0_0_40px_rgba(152,16,250,0.45)]" style={{ transform: "translateY(12px) scaleX(1.1)" }} />
                </div>
              </div>

              <p className="mt-1 text-center text-[11px] font-semibold tracking-[0.25em] text-zinc-500">SCREEN THIS WAY</p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-10 text-[11px] text-zinc-600">
                <span className="flex items-center gap-2">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[7px] border border-zinc-300" />
                  <span>Available</span>
                </span>

                <span className="flex items-center gap-2">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[7px] border border-zinc-200 bg-zinc-200" />
                  <span>Occupied</span>
                </span>

                <span className="flex items-center gap-2">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[7px] bg-[#9810fa]" />
                  <span>Selected</span>
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR – selected seats summary & pay */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                {selectedSeats.length === 0 ? (
                  <span>No seats selected</span>
                ) : (
                  <>
                    <span className="font-medium text-zinc-800">
                      {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} selected:
                    </span>
                    <span className="flex flex-wrap gap-1">
                      {selectedSeats.map((s: any) => (
                        <span key={s.id} className="rounded-full bg-zinc-100 px-2 py-[2px] text-[11px] font-medium text-zinc-700">
                          {s.id}
                        </span>
                      ))}
                    </span>
                    <span className="ml-3 font-semibold">₹{totalAmount}</span>
                  </>
                )}
              </div>

              <button
                onClick={handlePay}
                disabled={selectedSeats.length === 0}
                className={[
                  "rounded-full px-6 py-2 text-sm font-semibold shadow-md transition",
                  selectedSeats.length === 0 ? "cursor-not-allowed bg-zinc-300 text-zinc-600" : "bg-[#9810fa] text-white hover:bg-[#7d0ccc]",
                ].join(" ")}
              >
                Pay ₹{totalAmount}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
