// src/app/movies/seat-layout/page.tsx
"use client";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";

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

  const [selectedDate] = useState<number>(5);
  const [activeSlotId, setActiveSlotId] = useState<string>(
    SHOW_SLOTS[1]?.id || "show-0930"
  );
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);

  /* ===== PROFILE LOGIC (ADDED) ===== */
  const [openLogin, setOpenLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("logged_in");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("logged_in", "true");
    setIsLoggedIn(true);
    setOpenLogin(false);
    setOpenDrawer(true);
  };
  /* ================================= */

  function handleSeatClick(sectionId: string, rowLabel: string, seatId: string) {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id !== sectionId
          ? sec
          : {
              ...sec,
              rows: sec.rows.map((row) =>
                row.label !== rowLabel
                  ? row
                  : {
                      ...row,
                      seats: row.seats.map((seat) =>
                        seat.id === seatId && seat.status !== "occupied"
                          ? {
                              ...seat,
                              status:
                                seat.status === "selected"
                                  ? "available"
                                  : "selected",
                            }
                          : seat
                      ),
                    }
              ),
            }
      )
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

  const activeMovie: Movie = cinema.movies[1];
  const activeSlot =
    SHOW_SLOTS.find((s) => s.id === activeSlotId) ?? SHOW_SLOTS[0];
  const headerDateLabel = `${selectedDate} Dec`;

  return (
    <>
      {/* HEADER */}
      {/* HEADER — SAME AS MAIN HEADER */}
<header className="w-full border-b border-zinc-200 bg-white">
  <div
    className="
      relative flex w-full items-center justify-between
      px-3 py-2
      sm:px-4
      lg:px-10
    "
  >
    {/* LEFT — LOGO (CLICKABLE) */}
    <Link href="/" className="relative shrink-0">
      <Image
        src="/movies/logored.png"
        alt="Logo"
        width={110}
        height={33}
        priority
        className="
          rounded-xl
          w-[80px] h-auto
          sm:w-[95px]
          lg:w-[110px]
          cursor-pointer
        "
      />
    </Link>

    {/* CENTER — TITLE */}
    <div
      className="
        absolute left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        text-center
      "
    >
      <h1
        className="
          truncate font-semibold text-zinc-900
          text-xs
          sm:text-sm
          lg:text-sm
          max-w-[140px]
          sm:max-w-[180px]
          lg:max-w-none
        "
      >
        Review your booking
      </h1>
    </div>

    {/* RIGHT — PROFILE */}
    <button
      onClick={() =>
        isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
      }
      className="
        flex h-8 w-8 sm:h-9 sm:w-9
        items-center justify-center
        rounded-full bg-slate-900 text-white
        text-xs sm:text-sm
        font-semibold shadow-sm shrink-0
      "
    >
      U
    </button>
  </div>
</header>





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
    "border-[#fd3f01] bg-[#fd3f01] text-white shadow-md";



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
  fill="#e5e5e5"
  stroke="#000000"
  strokeWidth="3"
/>

<polygon
  points="25,17 375,17 390,40 10,40"
  fill="#d4d4d4"
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
  <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-3 py-4 
      sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-5">

    <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-zinc-600">
      {selectedSeats.length === 0 ? (
        <span>No seats selected</span>
      ) : (
        <>
          <span className="font-medium text-zinc-800">
            {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} selected:
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

    {/* BIGGER PAY BUTTON */}
    <button
  onClick={handlePay}
  disabled={selectedSeats.length === 0}
  className={[
    "w-full rounded-full px-5 py-2.5 text-sm font-semibold shadow-md transition transform",
    "sm:w-auto sm:px-6 sm:py-3 sm:text-base",
    selectedSeats.length === 0
      ? "cursor-not-allowed bg-zinc-300 text-zinc-600 scale-100"
      : "bg-[#fd3f00] text-white hover:bg-[red] hover:scale-[1.015]",
  ].join(" ")}
>
  Pay ₹{totalAmount}
</button>

  </div>
</div>

        </div>
      </main>

      {/* ===== REST OF UI UNCHANGED ===== */}
      {/* (Seats, screen, bottom bar — same as your code) */}

      <ProfileLoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={handleLoginSuccess}
      />

      <ProfileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onLoggedOut={() => {
          localStorage.removeItem("logged_in");
          setIsLoggedIn(false);
          setOpenDrawer(false);
        }}
      />
    </>
  );
}
