"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ⭐ Your global header + footer (NO SLIM HEADER HERE)
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { EVENTS } from "@/components/EventCard";

export default function EventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Next.js param fix
  const { id } = React.use(params);
  const event = EVENTS.find((e) => e.id === Number(id));

  const [showMore, setShowMore] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  if (!event) {
    return (
      <div className="p-10 text-center text-lg text-black">Event not found</div>
    );
  }

  const FULL_TEXT = `
India's favourite festival brings together food, music, live performances, curated activities,
artistic zones, pop-up funfair experiences, workshops, flea markets, gaming arenas, and much more.

Across the venue, you will find immersive art installations, storytelling corners, meet & greets,
and creative showcases from emerging artists.
`;

  const SHORT_TEXT = FULL_TEXT.slice(0, 200);

  const openGoogleMaps = () => {
    const query = encodeURIComponent(event?.location || "");
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ⭐ NORMAL HEADER (your approved one) */}
      <Header />

      {/* ===================================================== */}
      {/* ⭐ MOBILE HERO */}
      {/* ===================================================== */}
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

        <h1 className="mt-4 text-xl font-bold leading-snug">{event.title}</h1>

        <div className="mt-3 text-[14px] space-y-1 text-zinc-700">
          <p>📅 {event.dateTime}</p>
          <p>📍 {event.location}</p>
          <p>🎭 Category: {event.category}</p>
        </div>

        <p className="mt-4 text-lg font-semibold">
          Starts from <span className="text-black">{event.price}</span>
        </p>

        <Link
          href={`/events/${event.id}/buy`}
          className="block mt-4 w-full bg-black text-white py-3 rounded-xl text-sm font-semibold text-center"
        >
          BOOK TICKETS
        </Link>
      </div>

      {/* ===================================================== */}
      {/* ⭐ DESKTOP HERO */}
      {/* ===================================================== */}
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
            Starts from <span className="text-black">{event.price}</span>
          </p>

          <Link
            href={`/events/${event.id}/buy`}
            className="mt-4 w-full inline-block bg-black text-white py-3 rounded-xl text-sm font-semibold text-center"
          >
            BOOK TICKETS
          </Link>
        </div>
      </div>

      {/* ===================================================== */}
      {/* ⭐ ABOUT SECTION */}
      {/* ===================================================== */}
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

        {/* EVENT GUIDE */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Event Guide</h2>
          <button className="text-sm text-blue-600 font-medium">
            See all →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 text-[14px]">
          <div className="p-4 bg-zinc-100 rounded-xl text-black">
            Language: English
          </div>
          <div className="p-4 bg-zinc-100 rounded-xl text-black">
            Duration: 6 Hours
          </div>
          <div className="p-4 bg-zinc-100 rounded-xl text-black">
            Tickets Needed: 16 yrs+
          </div>
        </div>

        {/* ARTIST */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold">Artist</h2>

          <Link
            href={`/artist/${event.artist?.id ?? 0}`}
            className="flex flex-col sm:flex-row items-center gap-6 mt-6 cursor-pointer"
          >
            <div className="h-32 w-32 rounded-full overflow-hidden">
              <Image
                src={event.artist?.image ?? "/movies/d1.jpg"}
                alt={event.artist?.name ?? "Artist"}
                width={500}
                height={500}
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold">{event.artist?.name}</h3>
              <p className="text-zinc-600 text-sm">{event.artist?.role}</p>
              <p className="text-zinc-600 text-sm max-w-md mt-1 leading-relaxed">
                {event.artist?.shortBio}
              </p>
            </div>
          </Link>
        </div>

        {/* VENUE */}
        <div className="mt-14">
          <h2 className="text-xl font-semibold mb-2">Venue</h2>

          <div className="bg-white p-4 rounded-xl shadow text-black">
            <p className="font-medium">{event.location}</p>

            <button
              onClick={openGoogleMaps}
              className="mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold"
            >
              Get Directions
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-14 space-y-4 pb-20">
          <details className="p-4 bg-zinc-100 rounded-xl cursor-pointer">
            <summary className="font-semibold">Frequently Asked Questions</summary>
            <p className="mt-3 text-zinc-700 leading-relaxed">
              • Parking is available onsite. <br />
              • Outside food is not allowed. <br />
              • Gates open 2 hours before the event.
            </p>
          </details>

          <details className="p-4 bg-zinc-100 rounded-xl cursor-pointer">
            <summary className="font-semibold">Terms & Conditions</summary>
            <p className="mt-3 text-zinc-700 leading-relaxed">
              • Tickets are non-refundable. <br />
              • Entry closes 30 minutes before showtime. <br />
              • Security check is mandatory.
            </p>
          </details>
        </div>
      </div>

      {/* NORMAL FOOTER */}
      <Footer />
    </div>
  );
}
