"use client";

import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";

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
  const [activeTab, setActiveTab] = useState<TabType>("dining");

  /* ================= DATA ================= */

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
    {
      id: 303,
      title: "Avatar: Fire and Ash",
      format: "English, 3D",
      dateTime: "Wed, 27 Dec | 9:15 PM",
      theatre: "Cinepolis: Seawoods Grand Central",
      poster: "/movies/a3.jpg",
      bookingId: "AVT9923Q",
      seats: "H10, H11, H12, H13",
      totalAmount: "₹2400.00",
      qr: "/qr-sample.png",
    },
  ];

  /* ================= CARDS ================= */

  const DiningCard = ({ item }: { item: DiningBooking }) => (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl mb-8 shadow-md border p-4 flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-zinc-600">{item.location}</p>

          <div className="flex gap-2 mt-3 text-xs">
            <span className="bg-zinc-100 px-3 py-1 rounded-full">{item.date}</span>
            <span className="bg-zinc-100 px-3 py-1 rounded-full">{item.time}</span>
            <span className="bg-zinc-100 px-3 py-1 rounded-full">
              {item.guests} Guests
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <p className="font-semibold">{item.amount}</p>
          <p className="text-red-600 font-semibold">{item.status}</p>
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const EventCard = ({ item }: { item: EventBooking }) => (
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

      <div className="flex justify-center my-4">
        <Image src={item.qr} alt="QR" width={110} height={110} />
      </div>

      <p className="text-sm">Booking ID: <b>{item.bookingId}</b></p>
      <p className="text-sm">Seats: <b>{item.seats}</b></p>
      <p className="text-sm mt-2">Amount: <b>{item.amount}</b></p>
    </div>
  );

  const MovieCard = ({ item }: { item: MovieBooking }) => (
    <div className="w-full max-w-lg mx-auto mb-8 px-3">
      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        <div className="flex gap-4 p-5">
          <div className="relative w-28 h-36 rounded-xl overflow-hidden">
            <Image src={item.poster} alt={item.title} fill className="object-cover" />
          </div>
          <div>
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-sm text-zinc-600">{item.format}</p>
            <p className="text-sm text-zinc-600">{item.dateTime}</p>
            <p className="text-sm">{item.theatre}</p>
          </div>
        </div>

        <div className="flex flex-col items-center py-4">
          <Image src={item.qr} alt="QR" width={120} height={120} />
          <p className="mt-2 text-sm"><b>{item.seats}</b></p>
          <p className="text-sm"><b>{item.bookingId}</b></p>
        </div>

        <div className="flex justify-between px-6 py-4 font-semibold border-t">
          <span>Total Amount</span>
          <span>{item.totalAmount}</span>
        </div>
      </div>
    </div>
  );

  /* ================= RENDER ================= */

  const renderContent = () => {
    if (activeTab === "dining")
      return diningBookings.map((i) => <DiningCard key={i.id} item={i} />);
    if (activeTab === "events")
      return eventBookings.map((i) => <EventCard key={i.id} item={i} />);
    return movieBookings.map((i) => <MovieCard key={i.id} item={i} />);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-3 items-center">
          <Link href="/">
            <Image src="/logored.png" alt="Logo" width={110} height={36} />
          </Link>
          <h1 className="text-center font-semibold">Review your bookings</h1>
          <div />
        </div>
      </header>

      <div className="flex justify-center mt-6">
        <div className="bg-zinc-100 rounded-full p-2 flex gap-2">
          {(["dining", "events", "movies"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                activeTab === tab ? "bg-red-500 text-white" : ""
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 px-4 mt-8 max-w-4xl mx-auto">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default Book;
