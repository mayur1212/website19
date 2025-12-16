"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logored.png";
import Footer from "@/components/Footer";
import Link from "next/link";

const Book = () => {
  const [activeTab, setActiveTab] = useState("dining");
  const router = useRouter();

  // -------------------------------------------------------
  // STATIC DATA
  // -------------------------------------------------------

  const diningBookings = [
    {
      id: 1,
      name: "The Studs Sports Bar",
      image: "/movies/a2.jpg",
      date: "Fri, 18 Feb",
      time: "8:30 PM",
      guests: 2,
      amount: "₹1,499",
      location: "Dubai Marina Mall",
      status:"Cancelled"
    },
  ];

  const eventBookings = [
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

  const movieBookings = [
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
  }
  ];

  // -------------------------------------------------------
  // CARD COMPONENTS (responsive)
  // -------------------------------------------------------

  const DiningCard = ({ item }: any) => (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl mb-8 shadow-md border p-4 flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-zinc-600 mt-1">{item.location}</p>
          

          <div className="flex flex-wrap items-center gap-2 mt-3 text-sm font-medium">
            <span className="bg-zinc-100 px-3 py-1 rounded-full text-xs">{item.date}</span>
            <span className="bg-zinc-100 px-3 py-1 rounded-full text-xs">{item.time}</span>
            <span className="bg-zinc-100 px-3 py-1 rounded-full text-xs">{item.guests} Guests</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 gap-4">
          <p className="font-semibold text-black">{item.amount}</p>
          <p className="font-semibold rounded-2xl w-23 h-6 text-red-600">{item.status}</p>

          <button className="px-4 py-2 rounded-full bg-black text-white text-sm whitespace-nowrap">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const EventCard = ({ item }: any) => (
    <div className="w-full max-w-xl mx-auto  bg-white rounded-2xl mb-8 shadow-md border p-5 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="relative w-28 h-36 md:w-30 md:h-30 rounded-xl overflow-hidden">
          <Image src={item.poster} alt={item.title} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-zinc-600 mt-1">{item.dateTime}</p>
          <p className="text-sm text-zinc-600 mt-1">{item.venue}</p>
          
        </div>
      </div>

      <div className="w-full flex justify-center py-2">
        <Image src={item.qr} alt="QR" width={110} height={110} />
      </div>

      <p className="text-sm text-zinc-600">
        Booking ID: <span className="font-semibold text-black">{item.bookingId}</span>
      </p>
      <p className="text-sm text-zinc-600">
        Seats: <span className="font-semibold text-black">{item.seats}</span>
      </p>

      <p className="text-sm mt-2">
        Amount: <span className="font-semibold">{item.amount}</span>
      </p>
    </div>

  );

  const MovieCard = ({ item }: any) => (
    <div className="w-full max-w-lg mx-auto mb-8 px-3">
      <div className=" rounded-3xl p-4 md:p-6 ">
        <div className="bg-white rounded-3xl shadow-xl border relative overflow-hidden">

          {/* CUT-OUTS */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#F5F5F7] rounded-full"></div>
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#F5F5F7] rounded-full"></div>

          {/* HEADER */}
          <div className="flex items-center justify-between px-5 pt-5">
            <h3 className="text-lg font-semibold">Your Ticket</h3>
            <span className="text-xs tracking-wider text-zinc-500 font-semibold">M-TICKET</span>
          </div>

          {/* MOVIE DETAILS */}
          <div className="flex flex-col md:flex-row gap-4 px-5 mt-4 items-start">
            <div className="relative w-full md:w-28 h-40 md:h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0">
              <Image src={item.poster} alt={item.title} fill className="object-cover" />
              
            </div>

            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold leading-tight">{item.title}</h2>
              <p className="text-sm text-zinc-600 mt-1">{item.format}</p>
              <p className="text-sm text-zinc-600">{item.dateTime}</p>
              <p className="text-sm text-zinc-700 mt-1">{item.theatre}</p>
            </div>
          </div>

          {/* SUPPORT BAR */}
          <div className="bg-zinc-100 text-center py-3 mt-5 text-sm text-zinc-600">
            Tap for support, details & more actions
          </div>

          {/* QR + DETAILS */}
          <div className="flex flex-col items-center py-5 px-5">
            <Image src={item.qr} alt="QR Code" width={120} height={120} />

            <p className="mt-3 text-sm text-zinc-500">Seats</p>
            <p className="font-semibold text-black text-center">{item.seats}</p>

            <p className="text-sm text-zinc-500 mt-2">
              Booking ID: <span className="font-semibold text-black">{item.bookingId}</span>
            </p>
          </div>

          <div className="text-xs text-center py-3 bg-zinc-50 text-zinc-600 border-t">
            Cancellation unavailable · Cut-off time has passed
          </div>

          <div className="flex justify-between px-6 py-4 text-lg font-semibold border-t">
            <span>Total Amount</span>
            <span>{item.totalAmount}</span>
          </div>
        </div>

       
      </div>
    </div>
  );

  // -------------------------------------------------------
  // CONTENT SWITCH
  // -------------------------------------------------------

  const renderContent = () => {
    if (activeTab === "dining")
      return (
        <div className="w-full px-4 mt-8 ">
          <div className="max-w-3xl mx-auto">
            {diningBookings.map((item) => (
              <DiningCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      );

    if (activeTab === "events")
      return (
        <div className="w-full px-4 mt-8">
          <div className="max-w-3xl mx-auto">
            {eventBookings.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      );

    if (activeTab === "movies")
      return (
        <div className="w-full px-4 mt-8">
          <div className="max-w-3xl mx-auto">
            {movieBookings.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      );
  };

  // -------------------------------------------------------
  // FINAL UI
  // -------------------------------------------------------

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between">

      {/* TOP HEADER: grid ensures title stays centered on all widths */}
      <header className="w-full border-b">
        <div className="max-w-8xl mx-auto px-4 py-3 grid grid-cols-3 items-center">
          {/* left: logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image src={Logo} alt="Hayya Logo" width={110} height={33} className="rounded-xl" />
            </Link>
          </div>

          {/* center: title (middle column) */}
          <div className="flex justify-center">
            <h1 className="text-base md:text-xl font-semibold text-center">Review your bookings</h1>
          </div>

          {/* right: placeholder/profile (keeps center perfectly centered) */}
          <div className="flex justify-end">
            <div className="h-8 w-8 rounded-full bg-black/0" aria-hidden />
          </div>
        </div>
      </header>

      {/* TABS */}
      <div className="flex justify-center h-14 mt-6 px-4">
        <div className="flex gap-3 bg-zinc-100 rounded-full px-2 py-2">
          <button
            onClick={() => setActiveTab("dining")}
            className={`px-4 py-1.5 rounded-full text-sm font-bold ${
              activeTab === "dining" ? "bg-red-500 text-white shadow" : "text-zinc-700"
            }`}
          >
            Dining
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-1.5 rounded-full text-sm font-bold ${
              activeTab === "events" ? "bg-red-500 text-white shadow" : "text-zinc-700"
            }`}
          >
            Events
          </button>

          <button
            onClick={() => setActiveTab("movies")}
            className={`px-4 py-1.5 rounded-full text-sm font-bold  ${
              activeTab === "movies" ? "bg-red-500 text-white shadow" : "text-zinc-700"
            }`}
          >
            Movies
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <main className="flex-1">{renderContent()}</main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Book;
