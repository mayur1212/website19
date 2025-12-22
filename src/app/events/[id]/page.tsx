"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Calendar,
  MapPin,
  Tag,
  Languages,
  Clock,
  Ticket,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventGuideModal from "@/components/EventGuideModal";
import { EVENTS } from "@/components/EventCard";

export default function EventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const event = EVENTS.find((e) => e.id === Number(id));

  const [showMore, setShowMore] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  if (!event) {
    return (
      <div className="p-10 text-center text-lg text-black">
        Event not found
      </div>
    );
  }

  const FULL_TEXT = `
India's favourite festival brings together food, music, live performances, curated activities,
artistic zones, pop-up funfair experiences, workshops, flea markets, gaming arenas, and much more.
`;

  const SHORT_TEXT = FULL_TEXT.slice(0, 200);

  const openGoogleMaps = () => {
    const query = encodeURIComponent(event.location);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HEADER → desktop only */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* ================= MOBILE HERO ================= */}
      <div className="md:hidden mt-4 px-4">
        <div className="rounded-2xl overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            width={1200}
            height={700}
            className="w-full h-[260px] object-cover rounded-xl"
          />
        </div>

        <h1 className="mt-4 text-xl font-bold leading-snug">
          {event.title}
        </h1>

        {/* MOBILE META (District style) */}
        <div className="mt-4 space-y-3 text-sm text-zinc-700">
          <div className="flex items-center gap-3">
            <Calendar size={16} />
            <span>{event.dateTime}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <Tag size={16} />
            <span>{event.category}</span>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP HERO (UNCHANGED) ================= */}
      <div className="hidden md:flex max-w-[1200px] mx-auto gap-10 py-10 px-6">
        <div className="w-[70%] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={event.image}
            alt={event.title}
            width={1400}
            height={800}
            className="w-full h-[420px] object-cover"
          />
        </div>

        <div className="w-[30%] bg-white rounded-2xl shadow-md p-6 h-fit">
          <h1 className="text-2xl font-bold">{event.title}</h1>

          <div className="mt-4 space-y-3 text-[14px] text-zinc-700">
            <p>📅 {event.dateTime}</p>
            <p>📍 {event.location}</p>
            <p>🎭 Category: {event.category}</p>
          </div>

          <p className="mt-6 text-lg font-semibold">
            Starts from ₹<span className="text-black">{event.price}</span>
          </p>

          <Link
            href={`/events/${event.id}/buy`}
            className="mt-4 w-full inline-block bg-black text-white py-3 rounded-xl text-sm font-semibold text-center"
          >
            BOOK TICKETS
          </Link>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-xl font-semibold mb-2">About the Event</h2>

        <p className="text-[15px] text-zinc-700 leading-relaxed inline">
          {showMore ? FULL_TEXT : `${SHORT_TEXT}...`}
        </p>

        <button
          onClick={() => setShowMore(!showMore)}
          className="ml-2 text-blue-600 font-medium text-sm hover:underline"
        >
          {showMore ? "See less" : "See more"}
        </button>

        {/* ================= EVENT GUIDE ================= */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Event Guide</h2>
          <button
            onClick={() => setGuideOpen(true)}
            className="text-sm text-blue-600 font-medium"
          >
            See all →
          </button>
        </div>

        {/* MOBILE = District cards */}
        <div className="mt-4 space-y-3 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 text-sm">
          <div className="flex items-center gap-4 p-4 bg-zinc-100 rounded-xl">
            <Languages size={18} />
            <div>
              <p className="text-zinc-500 text-xs">Language</p>
              <p className="font-medium">English</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-zinc-100 rounded-xl">
            <Clock size={18} />
            <div>
              <p className="text-zinc-500 text-xs">Duration</p>
              <p className="font-medium">6 Hours</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-zinc-100 rounded-xl">
            <Ticket size={18} />
            <div>
              <p className="text-zinc-500 text-xs">Tickets Needed</p>
              <p className="font-medium">16 yrs+</p>
            </div>
          </div>
        </div>

        {/* ================= ARTIST ================= */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold">Artist</h2>

          <Link
            href={`/artist/${event.artist?.id ?? 0}`}
            className="mt-6 flex items-start gap-4"
          >
            <div className="h-30 w-30 md:h-32 md:w-32 rounded-xl md:rounded-full overflow-hidden shrink-0">
              <Image
                src={event.artist?.image ?? "/movies/d1.jpg"}
                alt={event.artist?.name ?? "Artist"}
                width={700}
                height={700}
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold">
                {event.artist?.name}
              </h3>
              <p className="text-zinc-600 text-sm">
                {event.artist?.role}
              </p>
              <p className="text-zinc-600 text-sm mt-1 leading-relaxed">
                {event.artist?.shortBio}
              </p>
            </div>
          </Link>
        </div>

        {/* ================= VENUE ================= */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold mb-2">Venue</h2>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="font-medium">{event.location}</p>

            <button
              onClick={openGoogleMaps}
              className="mt-3 px-4 py-2 bg-black text-white rounded-lg cursor-pointer text-sm font-semibold"
            >
              Get Directions
            </button>
          </div>
        </div>

        {/* ================= FAQ ================= */}
        <div className="mt-14 space-y-4 pb-32">
          <details className="p-4 bg-zinc-100 rounded-xl cursor-pointer">
            <summary className="font-semibold">
              Frequently Asked Questions
            </summary>
            <p className="mt-3 text-zinc-700">
              • Parking is available onsite <br />
              • Outside food not allowed <br />
              • Gates open 2 hours before
            </p>
          </details>

          <details className="p-4 bg-zinc-100 rounded-xl cursor-pointer">
            <summary className="font-semibold">Terms & Conditions</summary>
            <p className="mt-3 text-zinc-700">
              • Tickets non-refundable <br />
              • Entry closes 30 mins before <br />
              • Security check mandatory
            </p>
          </details>
        </div>
      </div>

      {/* ================= MOBILE STICKY BAR ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500">Starts from</p>
          <p className="text-lg font-bold">₹{event.price}</p>
        </div>

        <Link
          href={`/events/${event.id}/buy`}
          className="bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold"
        >
          BOOK TICKETS
        </Link>
      </div>

      {guideOpen && (
        <EventGuideModal onClose={() => setGuideOpen(false)} />
      )}

      <Footer />
    </div>
  );
}
