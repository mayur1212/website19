// src/app/movies/seat-layout/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* SAMPLE DATA (unchanged) */
const SAMPLE_DATA = {
  id: 1,
  slug: "pvr-arved-transcube",
  name: "PVR Arved Transcube, Vijay Nagar, Ahmedabad",
  distance: "3.8 km away",
  address:
    "Bandhu Nagar, Vijay Nagar, Ranip, Ahmedabad, Gujarat 382480, India",
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
      showtimes: [
        "11:30 AM",
        "12:30 PM",
        "03:00 PM",
        "04:00 PM",
        "07:30 PM",
        "10:00 PM",
      ],
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

type Movie = (typeof SAMPLE_DATA.movies)[number];

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

/* Seat data helpers */
type SeatStatus = "available" | "occupied" | "selected";
type Seat = { id: string; number: string; status: SeatStatus };
type Row = { label: string; seats: Seat[] };
type Section = { id: string; name: string; price: number; rows: Row[] };

// helper: create one row
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

/* example sections */
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
      makeRow("H", 12, [10, 11]),
      makeRow("G", 12),
      makeRow("F", 12),
      makeRow("E", 12),
    ],
  },
  {
    id: "classic",
    name: "CLASSIC",
    price: 200,
    rows: [makeRow("D", 12), makeRow("C", 12), makeRow("B", 12), makeRow("A", 12)],
  },
];

export default function TheatrePage() {
  const cinema = SAMPLE_DATA;
  const router = useRouter();

  const [selectedDate] = useState<number>(5); // just used for label / fromdate
  const [activeSlotId, setActiveSlotId] = useState<string>(
    SHOW_SLOTS[1]?.id || "show-0930"
  );
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);

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
                return {
                  ...seat,
                  status: seat.status === "selected" ? "available" : "selected",
                };
              }),
            };
          }),
        };
      })
    );
  }

  const selectedSeats = sections.flatMap((s) =>
    s.rows.flatMap((r) =>
      r.seats
        .filter((seat) => seat.status === "selected")
        .map(
          (seat) =>
            ({
              ...seat,
              sectionId: s.id,
              sectionPrice: s.price,
            } as any)
        )
    )
  );

  const totalAmount = selectedSeats.reduce(
    (sum, s) => sum + (s.sectionPrice ?? 0),
    0
  );

  // navigate to internal order-review route
  function handlePay() {
    if (selectedSeats.length === 0) return;

    const orderId = `ord-${Math.random().toString(36).slice(2, 10)}`;
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

    router.push(pathname + search);
  }

  // --- HEADER DATA (for the Zomato-style header) ---
  const activeMovie: Movie = cinema.movies[1]; // "Tere Ishk Mein"
  const activeSlot = SHOW_SLOTS.find((s) => s.id === activeSlotId) ?? SHOW_SLOTS[0];
  const headerDateLabel = `${selectedDate} Dec`;

  return (
    <>
      {/* Zomato-style movie header */}
      <header className="w-full border-b border-zinc-200 bg-white">
  <div className="relative flex w-full items-center px-3 py-2 sm:px-4 sm:py-3">
    {/* LEFT — Logo */}
    <div className="shrink-0">
      <Image
        src="/movies/logored.png"
        alt="dist"
        width={150}
        height={42}
        className="h-6 w-auto object-contain sm:h-8"
      />
    </div>

    {/* CENTER — FULL WIDTH TITLE (responsive) */}
    <div
      className="
        absolute inset-x-14 top-1/2 -translate-y-1/2 text-center
        sm:inset-x-20
        md:inset-x-0
      "
    >
      <h1 className="truncate text-xs font-semibold text-[#050814] sm:text-sm md:text-base">
        {activeMovie.title}
      </h1>
      <p className="mt-[2px] line-clamp-1 text-[9px] text-zinc-500 sm:text-[10px] md:text-xs">
        {headerDateLabel}, {activeSlot.time}{" "}
        <span className="text-zinc-400">at</span> {cinema.name}
      </p>
    </div>

    {/* RIGHT — User Avatar */}
    <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#101218] text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-[11px] md:h-9 md:w-9">
      U
    </div>
  </div>
</header>



      {/* main – mobile full width, card rounded from sm+ */}
      <main className="mx-auto flex w-full max-w-7xl justify-center px-0 pb-24 pt-4 sm:px-4 sm:pb-32 sm:pt-6">
        {/* center card */}
        <div className="relative w-full max-w-[1200px] bg-white sm:rounded-[20px] sm:border sm:border-zinc-200 sm:shadow-sm">
          {/* right side grey scroll bar line – desktop only */}
          <div className="pointer-events-none absolute right-6 top-24 bottom-8 hidden w-[4px] rounded-full bg-zinc-300/80 md:block" />

          {/* TOP DATE + TIME STRIP */}
          <div className="border-b border-zinc-200 px-3 pt-4 pb-3 sm:px-8 sm:pt-5 sm:pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 overflow-x-auto no-scrollbar">
              {/* Date block */}
              <div className="flex min-w-[72px] flex-col items-center justify-center rounded-[999px] px-2 py-1 text-center">
                <span className="text-[11px] font-semibold text-zinc-700">
                  Fri
                </span>
                <span className="text-xs font-medium text-zinc-800">
                  {headerDateLabel}
                </span>
              </div>

              {/* Time chips */}
              <div className="flex-1">
                <div className="flex gap-2 sm:gap-3 pr-2">
                  {SHOW_SLOTS.map((slot) => {
                    const isActive = slot.id === activeSlotId;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setActiveSlotId(slot.id)}
                        className={[
                          "flex min-w-[120px] md:min-w-[150px] flex-col items-center justify-center rounded-[999px] border px-3 py-2 text-[11px] sm:text-xs font-semibold tracking-wide",
                          isActive
                            ? "border-zinc-900 bg-zinc-900 text-white"
                            : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400",
                        ].join(" ")}
                      >
                        <span className="text-[11px] sm:text-[12px]">
                          {slot.time}
                        </span>
                        {slot.label && (
                          <span
                            className={
                              isActive
                                ? "mt-[2px] text-[9px] sm:text-[10px] uppercase text-zinc-100"
                                : "mt-[2px] text-[9px] sm:text-[10px] uppercase text-zinc-500"
                            }
                          >
                            {slot.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* SCROLL AREA – seats */}
          <div className="relative px-3 pt-6 pb-24 sm:px-6 sm:pt-8 lg:px-12 lg:pb-32">
            {/* Center whole seat layout */}
            <div className="flex justify-center">
              <div className="inline-block w-full max-w-[900px] lg:w-auto lg:mx-auto">
                {/* render sections */}
                {sections.map((section) => (
                  <div key={section.id} className="mb-10 md:mb-14 lg:mb-16">
                    <div className="mb-4 md:mb-6 text-center text-[11px] md:text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                      {section.name} : ₹{section.price}
                    </div>

                    {/* alphabets column + seats */}
                    <div className="flex items-start gap-3 md:gap-4">
                      {/* LEFT: alphabets */}
                      <div className="flex flex-col gap-1.5 md:gap-2 lg:gap-3 bg-white">
                        {section.rows.map((row) => (
                          <div
                            key={row.label}
                            className="flex items-center justify-end h-7 sm:h-8 lg:h-10 w-6 md:w-7 lg:w-8 text-right text-[10px] md:text-xs lg:text-sm font-medium text-black"
                          >
                            {row.label}
                          </div>
                        ))}
                      </div>

                      {/* RIGHT: seats */}
                      <div className="overflow-x-auto no-scrollbar">
                        <div className="flex flex-col items-start gap-1.5 md:gap-2 lg:gap-3 min-w-max">
                          {section.rows.map((row) => (
                            <div
                              key={row.label}
                              className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 whitespace-nowrap"
                            >
                              {row.seats.map((seat) => {
                                const base =
                                  "flex items-center justify-center rounded-[8px] sm:rounded-[10px] border font-semibold transition-all";
                                let stateClasses =
                                  "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900 hover:shadow-sm cursor-pointer";
                                if (seat.status === "occupied")
                                  stateClasses =
                                    "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400";
                                else if (seat.status === "selected")
                                  stateClasses =
                                    "border-[#9810fa] bg-[#9810fa] text-white shadow-md";

                                return (
                                  <button
                                    key={seat.id}
                                    onClick={() =>
                                      handleSeatClick(
                                        section.id,
                                        row.label,
                                        seat.id
                                      )
                                    }
                                    className={`${base} ${stateClasses} h-7 w-7 text-[10px] sm:h-8 sm:w-8 sm:text-[11px] lg:h-10 lg:w-10 lg:text-[13px]`}
                                    aria-pressed={seat.status === "selected"}
                                    aria-disabled={seat.status === "occupied"}
                                  >
                                    {seat.number}
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SCREEN + LEGEND */}
            <div className="mt-2 flex w-full justify-center">
  <div className="w-[80%] sm:w-[70%] flex justify-center">
    <svg
      viewBox="0 0 400 70"
      className="w-full max-w-[400px] h-[40px] sm:h-[50px] mx-auto"
    >
      {/* Outer trapezoid */}
      <polygon
        points="15,15 385,15 400,45 0,45"
        fill="#c4b5fd"
        stroke="#a855f7"
        strokeWidth="4"
        opacity="0.85"
      />

      {/* Inner top surface */}
      <polygon
        points="25,17 375,17 390,40 10,40"
        fill="#a78bfa"
        opacity="0.9"
      />

      {/* Thin white-ish bottom line */}
      <path
        d="M 8 42 L 392 42"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.7"
      />
    </svg>
  </div>
</div>


          </div>

          {/* BOTTOM BAR – selected seats summary & pay */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-zinc-600">
                {selectedSeats.length === 0 ? (
                  <span>No seats selected</span>
                ) : (
                  <>
                    <span className="font-medium text-zinc-800">
                      {selectedSeats.length} seat
                      {selectedSeats.length > 1 ? "s" : ""} selected:
                    </span>
                    <span className="flex flex-wrap gap-1">
                      {selectedSeats.map((s: any) => (
                        <span
                          key={s.id}
                          className="rounded-full bg-zinc-100 px-2 py-[2px] text-[10px] sm:text-[11px] font-medium text-zinc-700"
                        >
                          {s.id}
                        </span>
                      ))}
                    </span>
                    <span className="sm:ml-3 font-semibold">
                      ₹{totalAmount}
                    </span>
                  </>
                )}
              </div>

              <button
                onClick={handlePay}
                disabled={selectedSeats.length === 0}
                className={[
                  "w-full rounded-full px-5 py-2 text-sm font-semibold shadow-md transition sm:w-auto",
                  selectedSeats.length === 0
                    ? "cursor-not-allowed bg-zinc-300 text-zinc-600"
                    : "bg-[#9810fa] text-white hover:bg-[#7d0ccc]",
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
