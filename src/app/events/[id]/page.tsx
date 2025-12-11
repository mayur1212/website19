"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { EVENTS } from "@/components/EventCard";
import EventGuideModal from "@/components/EventGuideModal";

export default function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const event = EVENTS.find((e) => e.id === Number(id));

  const [guideOpen, setGuideOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const FULL_TEXT = `
India's favourite festival brings together food, music, live performances, curated activities, artistic zones,
pop-up funfair experiences, workshops, flea markets, gaming arenas, and much more. 

Across the venue, you will find immersive art installations, interactive storytelling corners, 
and community zones designed to bring people together. The event also features exclusive 
meet-and-greet experiences, collaboration spaces, and creative showcases from top emerging artists.

Overall, the festival is created to give audiences a vibrant, unforgettable experience that blends 
culture, entertainment, learning, and creativity under one roof!
`;

  const SHORT_TEXT = FULL_TEXT.slice(0, 200);

  const openGoogleMaps = () => {
    const query = encodeURIComponent(event?.location || "");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  if (!event)
    return <p className="p-10 text-center text-xl text-black">Event not found</p>;

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* ===================================================== */}
      {/* ⭐ MOBILE HERO (District Style) */}
      {/* ===================================================== */}
      <div className="md:hidden w-full mt-4">
        <Image
          src={event.image}
          alt={event.title}
          width={1000}
          height={600}
          className="w-full h-[260px] object-cover rounded-xl"
        />

        <div className="px-5 mt-4">
          <h1 className="text-xl font-bold leading-snug">{event.title}</h1>

          <div className="mt-3 text-[14px] space-y-1 text-zinc-700">
            <p>📅 {event.dateTime}</p>
            <p>📍 {event.location}</p>
            <p>🎭 Category: {event.category}</p>
          </div>

          <p className="mt-4 text-lg font-semibold">
            Starts from <span className="text-black">{event.price}</span>
          </p>

          <button className="mt-4 w-full bg-black text-white py-3 rounded-xl text-sm font-semibold">
            BOOK TICKETS
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* ⭐ DESKTOP HERO (unchanged) */}
      {/* ===================================================== */}
      <div className="w-[86%] mx-auto pt-10 gap-10 hidden md:flex">
        <div className="w-[70%] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={event.image}
            alt={event.title}
            width={1200}
            height={700}
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

          <button className="mt-4 w-full bg-black text-white py-3 rounded-xl text-sm font-semibold">
            BOOK TICKETS
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* ⭐ ABOUT SECTION */}
      {/* ===================================================== */}
      <div className="w-[90%] md:w-[86%] mx-auto mt-10">
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
      </div>

      {/* EVENT GUIDE HEADER */}
      <div className="w-[90%] md:w-[86%] mx-auto mt-10 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Event Guide</h2>
        <button
          onClick={() => setGuideOpen(true)}
          className="text-sm text-blue-600 font-medium"
        >
          See all →
        </button>
      </div>

      {/* EVENT GUIDE CARDS */}
      <div className="w-[90%] md:w-[86%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 text-[14px]">
        <div className="p-4 bg-zinc-100 rounded-xl text-black">Language: English</div>
        <div className="p-4 bg-zinc-100 rounded-xl text-black">Duration: 6 Hours</div>
        <div className="p-4 bg-zinc-100 rounded-xl text-black">
          Tickets Needed: 16 yrs+
        </div>
      </div>

      {/* ARTIST SECTION */}
      <div className="w-[90%] md:w-[86%] mx-auto mt-14">
        <h2 className="text-xl font-semibold">Artist</h2>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
          <div className="h-32 w-32 rounded-full overflow-hidden">
            <Image
              src="/movies/a1.jpg"
              alt="Artist"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-zinc-600 text-sm">Singer, Performer</p>
            <p className="text-zinc-600 text-sm max-w-md mt-1 leading-relaxed">
              A renowned performer known for creating immersive musical
              experiences and energetic live shows.
            </p>
          </div>
        </div>
      </div>

      {/* VENUE SECTION */}
      <div className="w-[90%] md:w-[86%] mx-auto mt-14">
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

      {/* FAQ & TERMS */}
      <div className="w-[90%] md:w-[86%] mx-auto mt-14 space-y-4 pb-20">
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

      {guideOpen && <EventGuideModal onClose={() => setGuideOpen(false)} />}
      <Footer />
    </div>
  );
}
