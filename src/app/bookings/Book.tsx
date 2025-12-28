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
  bookingId: string;
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

/* ================= MODAL ================= */

type BookingModalProps = {
  item: DiningBooking | null;
  onClose: () => void;
};

const BookingModal = ({ item, onClose }: BookingModalProps) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60">
      <div className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl font-bold"
        >
          ✕
        </button>

        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>

        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-zinc-600">{item.location}</p>

        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          <span className="bg-zinc-100 px-3 py-1 rounded-full">{item.date}</span>
          <span className="bg-zinc-100 px-3 py-1 rounded-full">{item.time}</span>
          <span className="bg-zinc-100 px-3 py-1 rounded-full">
            {item.guests} Guests
          </span>
        </div>

        <div className="mt-6 border-t pt-4 text-sm space-y-3">
          <div className="flex justify-between">
            <span className="text-zinc-500">Booking ID</span>
            <span className="font-semibold">{item.bookingId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-500">Status</span>
            <span className="text-red-600 font-medium">{item.status}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 text-lg font-semibold">
          <span>Total Paid</span>
          <span>{item.amount}</span>
        </div>
      </div>
    </div>
  );
};

/* ================= CARDS ================= */

const DiningCard = ({
  item,
  onView,
}: {
  item: DiningBooking;
  onView: () => void;
}) => (
  <div className="w-full max-w-xl mx-auto bg-white rounded-2xl mb-8 shadow-md border p-4 flex flex-col md:flex-row gap-4">
    <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden">
      <Image src={item.image} alt={item.name} fill className="object-cover" />
    </div>

    <div className="flex flex-col justify-between flex-1">
      <div>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-zinc-600 mt-1">{item.location}</p>

        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          <span className="bg-zinc-100 px-3 py-1 rounded-full">{item.date}</span>
          <span className="bg-zinc-100 px-3 py-1 rounded-full">{item.time}</span>
          <span className="bg-zinc-100 px-3 py-1 rounded-full">
            {item.guests} Guests
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="font-semibold">{item.amount}</p>
        <span className="text-red-600 text-sm">{item.status}</span>
        <button
          onClick={onView}
          className="px-4 py-2 rounded-full bg-black text-white text-sm"
        >
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

const MovieCard = ({ item }: { item: MovieBooking }) => (
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

/* ================= MAIN COMPONENT ================= */

const Book = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dining");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<DiningBooking | null>(null);

  /* ================= STATIC DATA ================= */

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
      bookingId: "DIN9821X",
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
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SlimHeader
        title="Review your bookings"
        subtitle="Dining, events & movie tickets"
      />

      <main className="flex-1 px-4 mt-8 max-w-3xl mx-auto">
        {activeTab === "dining" &&
          diningBookings.map((item) => (
            <DiningCard
              key={item.id}
              item={item}
              onView={() => {
                setSelectedBooking(item);
                setShowModal(true);
              }}
            />
          ))}

        {activeTab === "events" &&
          eventBookings.map((item) => (
            <EventCard key={item.id} item={item} />
          ))}

        {activeTab === "movies" &&
          movieBookings.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
      </main>

      <Footer />

      {showModal && (
        <BookingModal
          item={selectedBooking}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Book;
