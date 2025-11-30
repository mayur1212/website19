"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ShowTime = {
  time: string;
  tag?: string;
  sessionId: string; // seat-layout page ke liye
};

type Theatre = {
  id: number;
  name: string;
  distance: string;
  meta: string;
  logoText: string; // simple circle logo text
  times: ShowTime[];
};

const DATES = [
  { id: 1, dayNum: "28", dayLabel: "Fri", month: "NOV", isToday: true },
  { id: 2, dayNum: "29", dayLabel: "Sat" },
  { id: 3, dayNum: "30", dayLabel: "Sun" },
  { id: 4, dayNum: "1", dayLabel: "Mon", month: "DEC" },
  { id: 5, dayNum: "2", dayLabel: "Tue" },
  { id: 6, dayNum: "3", dayLabel: "Wed" },
  { id: 7, dayNum: "4", dayLabel: "Thu" },
];

const THEATRES: Theatre[] = [
  {
    id: 1,
    name: "Cinepolis Grand View High Street, Gurugram",
    distance: "1.6 km away",
    meta: "Non-cancellable",
    logoText: "cinepolis",
    times: [
      { time: "05:15 PM", sessionId: "cinepolis-1715" },
      { time: "07:25 PM", sessionId: "cinepolis-1925" },
      { time: "08:45 PM", sessionId: "cinepolis-2045" },
      { time: "11:00 PM", sessionId: "cinepolis-2300" },
    ],
  },
  {
    id: 2,
    name: "INOX World Mark, Sector 65, Gurugram",
    distance: "4.4 km away",
    meta: "Allows cancellation",
    logoText: "INOX",
    times: [
      { time: "04:20 PM", sessionId: "inox-1620" },
      { time: "06:15 PM", tag: "LASER", sessionId: "inox-1815" },
      { time: "07:50 PM", sessionId: "inox-1950" },
      { time: "09:45 PM", tag: "LASER", sessionId: "inox-2145" },
      { time: "11:20 PM", sessionId: "inox-2320" },
    ],
  },
];

export default function MoviePage({
  params,
}: {
  params: { slug: string };
}) {
  const [selectedDateId, setSelectedDateId] = useState(1);
  const [selectedLang, setSelectedLang] = useState<"Hindi" | "English">(
    "Hindi"
  );

  // future me slug se API call kar sakte ho
  // const { slug } = params;

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 lg:px-0">
        {/* TOP HERO: Poster + title + meta */}
        <section className="flex flex-col gap-6 border-b border-zinc-200 pb-6 md:flex-row md:items-center">
          {/* Poster */}
          <div className="flex items-center gap-4">
            <div className="relative h-[140px] w-[100px] overflow-hidden rounded-2xl bg-zinc-200 md:h-[160px] md:w-[115px]">
              <Image
                src="/movies/tere-ishk-mein.jpg"
                alt="Tere Ishk Mein"
                fill
                className="object-cover"
              />
              {/* play icon */}
              <button className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg">
                  ▶
                </span>
              </button>
            </div>

            {/* Title + meta */}
            <div className="flex flex-1 flex-col gap-2">
              <h1 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
                Tere Ishk Mein
              </h1>
              <p className="text-xs font-medium text-zinc-500 md:text-sm">
                UA16+ • Hindi +1 more • 2 hr 49 min
              </p>

              <button className="mt-2 inline-flex w-max items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:border-zinc-300">
                View details
              </button>
            </div>
          </div>
        </section>

        {/* DATE STRIP */}
        <section className="mt-4 border-b border-zinc-200 pb-4">
          <div className="flex items-stretch gap-4">
            {/* Month vertical pill */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-zinc-100 px-3 text-xs font-semibold text-zinc-500">
              <span className="uppercase">
                {DATES.find((d) => d.id === selectedDateId)?.month || "NOV"}
              </span>
            </div>

            <div className="flex flex-1 gap-2 overflow-x-auto pb-1 no-scrollbar">
              {DATES.map((d) => {
                const active = d.id === selectedDateId;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDateId(d.id)}
                    className={[
                      "flex w-[64px] flex-col items-center justify-center rounded-2xl border px-2 py-2 text-xs font-medium transition-all",
                      active
                        ? "border-black bg-black text-white"
                        : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400",
                    ].join(" ")}
                  >
                    <span className="text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                      {d.month || ""}
                    </span>
                    <span className="text-base font-semibold">{d.dayNum}</span>
                    <span className="text-[11px]">{d.dayLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FILTER PILLS ROW */}
          <div className="mt-4 flex flex-wrap gap-3">
            {/* Filters pill */}
            <button className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800">
              {/* proper filter icon */}
              <span className="text-lg leading-none">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 5h16M7 5a2 2 0 1 0 4 0M4 12h16M13 12a2 2 0 1 0 4 0M4 19h16M6 19a2 2 0 1 0 4 0" />
                </svg>
              </span>
              <span>Filters</span>
              <span className="text-xs">▼</span>
            </button>

            {/* Language pill */}
            <div className="inline-flex rounded-full border border-zinc-300 bg-white text-sm font-medium">
              <button
                onClick={() => setSelectedLang("Hindi")}
                className={[
                  "rounded-full px-4 py-2",
                  selectedLang === "Hindi"
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-800",
                ].join(" ")}
              >
                Hindi
              </button>
              <button
                onClick={() => setSelectedLang("English")}
                className={[
                  "rounded-full px-4 py-2",
                  selectedLang === "English"
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-800",
                ].join(" ")}
              >
                English
              </button>
            </div>

            <button className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800">
              After 5 PM
            </button>
            <button className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800">
              Recliners
            </button>
            <button className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800">
              Wheelchair Friendly
            </button>
            <button className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800">
              Premium Seats
            </button>
          </div>

          {/* LEGEND BAR */}
          <div className="mt-4 flex gap-6 rounded-md bg-zinc-100 px-4 py-2 text-xs text-zinc-600">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-zinc-900" />
              Available
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              Filling fast
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Almost full
            </span>
          </div>
        </section>

        {/* THEATRES + SHOWTIMES */}
        <section className="mt-4 space-y-6">
          {THEATRES.map((theatre) => (
            <div
              key={theatre.id}
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                {/* LEFT: logo + name */}
                <div className="flex flex-1 items-start gap-4">
                  {/* simple circle logo */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-[10px] font-bold uppercase text-zinc-700">
                    {theatre.logoText}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-[15px] font-semibold text-zinc-900 md:text-base">
                      {theatre.name}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {theatre.distance} • {theatre.meta}
                    </p>
                  </div>
                </div>

                {/* Favourite heart */}
                <button className="mt-1 h-8 w-8 text-zinc-600">♡</button>
              </div>

              {/* showtimes → link to seat-layout page */}
              <div className="mt-4 flex flex-wrap gap-3">
                {theatre.times.map((slot, idx) => (
                  <Link
                    key={idx}
                    href={`/movies/seat-layout/${slot.sessionId}`}
                    className="flex min-w-[110px] flex-col items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:border-zinc-900"
                  >
                    <span>{slot.time}</span>
                    {slot.tag && (
                      <span className="mt-1 text-[10px] uppercase tracking-wide text-zinc-500">
                        {slot.tag}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
