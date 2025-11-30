"use client";

import React, { useState } from "react";

type SeatStatus = "available" | "occupied" | "selected";

type Seat = {
  id: string;
  number: string;
  status: SeatStatus;
};

type Row = {
  label: string;
  seats: Seat[];
};

type Section = {
  id: string;
  name: string;
  price: number;
  rows: Row[];
};

// ----- HELPER: create one row -----
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

// ----- SAMPLE SEAT DATA -----
const SECTIONS: Section[] = [
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
    price: 250,
    rows: [makeRow("D", 12), makeRow("C", 12), makeRow("B", 12), makeRow("A", 12)],
  },
];

export default function SeatLayoutPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const [sections, setSections] = useState<Section[]>(SECTIONS);

  const handleSeatClick = (rowLabel: string, seatId: string) => {
    setSections(prev =>
      prev.map(section => ({
        ...section,
        rows: section.rows.map(row => {
          if (row.label !== rowLabel) return row;
          return {
            ...row,
            seats: row.seats.map(seat => {
              if (seat.id !== seatId) return seat;
              if (seat.status === "occupied") return seat;
              return {
                ...seat,
                status: seat.status === "selected" ? "available" : "selected",
              };
            }),
          };
        }),
      }))
    );
  };

  const selectedSeats: Seat[] = sections.flatMap(s =>
    s.rows.flatMap(r => r.seats.filter(seat => seat.status === "selected"))
  );

  return (
    <div className="min-h-screen w-full bg-[#f7f6ff]">
      {/* TOP BAR – date + time chip */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-4">
          <div className="flex flex-col text-xs text-zinc-500">
            <span className="font-medium">Fri</span>
            <span className="mt-0.5 text-sm font-semibold">28 Nov</span>
          </div>

          <button className="flex flex-col items-center justify-center rounded-[18px] border border-zinc-300 px-6 py-2 text-xs font-medium shadow-sm">
            <span className="text-sm font-semibold text-zinc-900">07:35 PM</span>
            <span className="mt-1 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-[2px] text-[10px] font-semibold uppercase tracking-wide text-zinc-700">
              Laser
            </span>
          </button>

          <div className="ml-auto text-[11px] text-zinc-400">
            Session ID:{" "}
            <span className="font-mono text-zinc-600">{params.sessionId}</span>
          </div>
        </div>
      </header>

      {/* MAIN CARD */}
      <main className="mx-auto flex w-full max-w-6xl justify-center px-3 pb-24 pt-6 sm:px-4">
        <div className="relative w-full rounded-[20px] border border-zinc-200 bg-white shadow-sm">
          {/* right side grey scroll bar line like screenshot */}
          <div className="pointer-events-none absolute right-4 top-8 bottom-8 w-[3px] rounded-full bg-zinc-300/80" />

          {/* SCROLL AREA */}
          <div className="relative overflow-x-auto px-4 pb-24 pt-10 sm:px-8">
            {/* SECTIONS */}
            {sections.map(section => (
              <div key={section.id} className="mb-14">
                {/* SECTION TITLE */}
                <div className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                  {section.name} : ₹{section.price}
                </div>

                {/* ROWS */}
                <div className="flex flex-col items-center gap-2">
                  {section.rows.map(row => (
                    <div
                      key={row.label}
                      className="flex items-center gap-4 whitespace-nowrap"
                    >
                      {/* Row label (A,B,C,...) */}
                      <span className="w-6 text-right text-xs font-medium text-zinc-600">
                        {row.label}
                      </span>

                      {/* Seats */}
                      <div className="flex gap-2">
                        {row.seats.map(seat => {
                          const base =
                            "flex h-8 w-8 items-center justify-center rounded-[9px] border text-[11px] font-semibold transition-all";
                          let stateClasses =
                            "border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900 hover:shadow-sm";

                          if (seat.status === "occupied") {
                            stateClasses =
                              "border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed";
                          } else if (seat.status === "selected") {
                            stateClasses =
                              "border-[#9810fa] bg-[#9810fa] text-white shadow-md";
                          }

                          return (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(row.label, seat.id)}
                              className={`${base} ${stateClasses}`}
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

            {/* SCREEN + LEGEND (center bottom like screenshot) */}
            <div className="mt-2 flex flex-col items-center gap-4 pb-4">
              {/* Curved purple screen */}
              <div className="mt-4 flex w-full max-w-lg justify-center">
                <div className="h-16 w-[80%] overflow-hidden">
                  <div
                    className="mx-auto h-10 w-full rounded-[999px] bg-gradient-to-t from-[#aa73ff] to-[#cdaeff] shadow-[0_0_40px_rgba(152,16,250,0.45)]"
                    style={{
                      transform: "translateY(12px) scaleX(1.1)",
                    }}
                  />
                </div>
              </div>

              <p className="mt-1 text-center text-[11px] font-semibold tracking-[0.25em] text-zinc-500">
                SCREEN THIS WAY
              </p>

              {/* Legend */}
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

          {/* BOTTOM BAR – selected seats summary */}
          <div className="fixed inset-x-0 bottom-0 border-t border-zinc-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                {selectedSeats.length === 0 ? (
                  <span>No seats selected</span>
                ) : (
                  <>
                    <span className="font-medium text-zinc-800">
                      {selectedSeats.length} seat
                      {selectedSeats.length > 1 ? "s" : ""} selected:
                    </span>
                    <span className="flex flex-wrap gap-1">
                      {selectedSeats.map(s => (
                        <span
                          key={s.id}
                          className="rounded-full bg-zinc-100 px-2 py-[2px] text-[11px] font-medium text-zinc-700"
                        >
                          {s.id}
                        </span>
                      ))}
                    </span>
                  </>
                )}
              </div>

              <button
                disabled={selectedSeats.length === 0}
                className={[
                  "rounded-full px-6 py-2 text-sm font-semibold shadow-md transition",
                  selectedSeats.length === 0
                    ? "cursor-not-allowed bg-zinc-300 text-zinc-600"
                    : "bg-[#9810fa] text-white hover:bg-[#7d0ccc]",
                ].join(" ")}
              >
                Pay ₹{selectedSeats.length * 250}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
