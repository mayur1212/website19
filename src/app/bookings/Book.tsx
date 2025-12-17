"use client";

import React, { useState } from "react";
import Image from "next/image";
import SlimHeader from "@/components/SlimHeader";
import Footer from "@/components/Footer";

/* ================= TAB TYPE ================= */

type TabType = "dining" | "events" | "movies";

/* ================= TYPES ================= */

type DiningBooking = {
  id: number;
  name: string;
  image: string;
  date: string;
  time: string;
  guests: number;
  amount: string;
  location: string;
  status: string;
};

type EventBooking = {
  id: number;
  title: string;
  poster: string;
  venue: string;
  dateTime: string;
  qr: string;
  bookingId: string;
  amount: string;
  seats: string;
};

type MovieBooking = {
  id: number;
  title: string;
  format: string;
  dateTime: string;
  theatre: string;
  poster: string;
  bookingId: string;
  seats: string;
  totalAmount: string;
  qr: string;
};

/* ================= COMPONENT ================= */

const Book = () => {
  const [activeTab, setActiveTab] = useState("dining");

  /* -------------------------------------------------------
   * STATIC DATA
   * ----------------------------------------------------- */

  const diningBookings: DiningBooking[] = [
    {
      id: 1,
      name: "The Studs Sports Bar",
      image: "/movies/a2.jpg",
      date: "Fri, 18 Feb",
      time: "8:30 PM",
      guests: 2,
      amount: "₹1,499",
      location: "Dubai Marina Mall",
      status: "Cancelled",
    },
  ];

  const eventBookings: EventBooking[] = [
    {
      id: 201,
      title: "Hamleys Wonderland",
      poster: "/movies/a5.jpg",
      venue: "JLN Stadium",
      dateTime: "Sat, 09 Mar • 7:00 PM",
      qr: "/qr-sample.png",
      bookingId: "EVT9812X",
      amount: "₹899",
      seats: "A12, A13",
    },
  ];

  const movieBookings: MovieBooking[] = [
    {
      id: 301,
      title: "Dhurandhar (A)",
      format: "Hindi, 2D",
      dateTime: "Fri, 05 Dec | 11:00 PM",
      theatre: "PVR: Lodha Xperia, Palava",
      poster: "/movies/a1.jpg",
      bookingId: "TEATBEQ",
      seats: "RE-K6, K7, K8, K9, K10, K11",
      totalAmount: "₹5332.86",
      qr: "/qr-sample.png",
    },
    {
      id: 302,
      title: "Kis Kisko Pyaar Karoon 2",
      format: "Hindi, 2D",
      dateTime: "Sun, 12 Dec | 6:45 PM",
      theatre: "INOX: R City Mall, Ghatkopar",
      poster: "/movies/a4.jpg",
      bookingId: "MOV8821K",
      seats: "C4, C5, C6",
      totalAmount: "₹1280.00",
      qr: "/qr-sample.png",
    },
  ];

  /* -------------------------------------------------------
   * CARD COMPONENTS
   * ----------------------------------------------------- */

  const DiningCard = ({ item }: { item: DiningBooking }) => (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl mb-8 shadow-md border p-4 flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-zinc-600 mt-1">{item.location}</p>

          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <span className="bg-zinc-100 px-3 py-1 rounded-full">
              {item.date}
            </span>
            <span className="bg-zinc-100 px-3 py-1 rounded-full">
              {item.time}
            </span>
            <span className="bg-zinc-100 px-3 py-1 rounded-full">
              {item.guests} Guests
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="font-semibold">{item.amount}</p>
          <span className="text-red-600 text-sm">{item.status}</span>
          <button className="px-4 py-2 rounded-full bg-black text-white text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const EventCard = ({ item }: any) => (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl mb-8 shadow-md border p-5">
      <div className="flex gap-4">
        <div className="relative w-28 h-36 rounded-xl overflow-hidden">
          <Image src={item.poster} alt={item.title} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-zinc-600">{item.dateTime}</p>
          <p className="text-sm text-zinc-600">{item.venue}</p>
        </div>
      </div>

      <div className="flex justify-center py-4">
        <Image src={item.qr} alt="QR" width={110} height={110} />
      </div>

      <p className="text-sm">
        Booking ID: <b>{item.bookingId}</b>
      </p>
      <p className="text-sm">
        Seats: <b>{item.seats}</b>
      </p>
      <p className="mt-2">
        Amount: <b>{item.amount}</b>
      </p>
    </div>
  );

  const MovieCard = ({ item }: any) => (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
          <p className="text-sm text-zinc-600">{item.format}</p>
          <p className="text-sm text-zinc-600">{item.dateTime}</p>
          <p className="text-sm text-zinc-600">{item.theatre}</p>
        </div>

        <div className="flex justify-center py-4">
          <Image src={item.qr} alt="QR" width={120} height={120} />
        </div>

        <div className="px-5 pb-5 text-sm">
          Seats: <b>{item.seats}</b>
          <br />
          Booking ID: <b>{item.bookingId}</b>
        </div>

        <div className="border-t px-5 py-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>{item.totalAmount}</span>
        </div>
      </div>
    </div>
  );

  /* -------------------------------------------------------
   * CONTENT SWITCH
   * ----------------------------------------------------- */

  const renderContent = () => {
    if (activeTab === "dining")
      return diningBookings.map((item) => (
        <DiningCard key={item.id} item={item} />
      ));

    if (activeTab === "events")
      return eventBookings.map((item) => (
        <EventCard key={item.id} item={item} />
      ));

    if (activeTab === "movies")
      return movieBookings.map((item) => (
        <MovieCard key={item.id} item={item} />
      ));
  };

  /* -------------------------------------------------------
   * FINAL UI
   * ----------------------------------------------------- */

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">

      {/* ✅ SLIM HEADER (IDENTICAL DIMENSIONS TO MAIN HEADER) */}
      <SlimHeader
        title="Review your bookings"
        subtitle="Dining, events & movie tickets"
      />

      {/* TABS */}
      <div className="flex justify-center mt-6 px-4">
        <div className="flex gap-3 bg-zinc-100 rounded-full px-2 py-2">
          {["dining", "events", "movies"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                activeTab === tab
                  ? "bg-red-500 text-white shadow"
                  : "text-zinc-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <main className="flex-1 px-4 mt-8">
        <div className="max-w-3xl mx-auto">{renderContent()}</div>
      </main>

      <Footer />
    </div>
  );
};

export default Book;
