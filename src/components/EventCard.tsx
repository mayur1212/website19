"use client";

import Image from "next/image";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const FILTER_CHIPS = [
  "Today",
  "Tomorrow",
  "This Weekend",
  "Under 10 km",
  "Comedy",
  "Music",
];

const EVENTS = [
  {
    id: 1,
    image: "/movies/event2.jpg",
    dateTime: "Sat, 06 Dec – Sun, 07 Dec, 1:00 PM",
    title: "The Grub Fest Delhi 2025",
    location: "Jawaharlal Nehru Stadium, New Delhi",
    price: "₹799 onwards",
  },
  {
    id: 2,
    image: "/movies/event2.jpg",
    dateTime: "Sun, 11 Jan, 5:00 PM",
    title: "Do Bhai India Tour | Delhi Showcase",
    location: "Dirty Good, Delhi/NCR",
    price: "₹749 onwards",
  },
  {
    id: 3,
    image: "/movies/event2.jpg",
    dateTime: "Sat, 29 Nov, 5:00 PM",
    title: "Zamna India 3.0 | Gurugram",
    location: "Leisure Valley Park, Gurugram",
    price: "₹5000 onwards",
  },
  {
    id: 4,
    image: "/movies/event2.jpg",
    dateTime: "Sun, 22 Mar, 7:00 PM",
    title: "Jubin Nautiyal Live | Delhi",
    location: "NSIC Exhibition Ground Gate 6, Delhi",
    price: "₹999 onwards",
  },
  {
    id: 5,
    image: "/movies/event2.jpg",
    dateTime: "Fri, 10 Jan, 7:30 PM",
    title: "A.R. Rahman – Harmony of Hearts",
    location: "Indira Gandhi Indoor Stadium, Delhi",
    price: "₹1499 onwards",
  },
  {
    id: 6,
    image: "/movies/event2.jpg",
    dateTime: "Sat, 15 Feb, 8:00 PM",
    title: "Zakir Khan – Live in Delhi",
    location: "Kamani Auditorium, Delhi",
    price: "₹499 onwards",
  },
  {
    id: 7,
    image: "/movies/event2.jpg",
    dateTime: "Sun, 12 Feb, 6:00 PM",
    title: "Anubhav Singh Bassi – Bas Kar Bassi",
    location: "Siri Fort Auditorium, Delhi",
    price: "₹699 onwards",
  },
  {
    id: 8,
    image: "/movies/event2.jpg",
    dateTime: "Sat, 27 Jan, 6:30 PM",
    title: "Local Train – India Tour",
    location: "JLN Stadium, Delhi",
    price: "₹899 onwards",
  },
  {
    id: 9,
    image: "/movies/event2.jpg",
    dateTime: "Sat, 10 Feb, 5:00 PM",
    title: "King – New Life India Tour",
    location: "Delhi/NCR",
    price: "₹1299 onwards",
  },
  {
    id: 10,
    image: "/movies/event2.jpg",
    dateTime: "Fri, 20 Jan, 12:00 PM",
    title: "Delhi Fashion Week 2025",
    location: "Pragati Maidan, New Delhi",
    price: "₹1599 onwards",
  },
  {
    id: 11,
    image: "/movies/event2.jpg",
    dateTime: "Tue, 05 Feb, 10:00 AM",
    title: "India Auto Expo 2025",
    location: "India Expo Mart, Greater Noida",
    price: "₹300 onwards",
  },
  {
    id: 12,
    image: "/movies/event2.jpg",
    dateTime: "Tue, 16 Jan, 10:30 AM",
    title: "Gaming & Tech Expo 2025",
    location: "Pragati Maidan, Delhi",
    price: "₹499 onwards",
  },
  {
    id: 13,
    image: "/movies/event2.jpg",
    dateTime: "Sun, 18 Feb, 11:00 AM",
    title: "Kids Carnival 2025",
    location: "Gurugram Sector 29",
    price: "₹199 onwards",
  },
  {
    id: 14,
    image: "/movies/event2.jpg",
    dateTime: "Fri, 05 Apr, 7:00 PM",
    title: "Hip Hop Delhi Championship",
    location: "Talkatora Indoor Stadium",
    price: "₹399 onwards",
  },
  {
    id: 15,
    image: "/movies/event2.jpg",
    dateTime: "Mon, 12 Feb, 6:00 PM",
    title: "Ballet Night – Russian Troupe",
    location: "Kamani Auditorium, Delhi",
    price: "₹699 onwards",
  },
  {
    id: 16,
    image: "/movies/event2.jpg",
    dateTime: "Sun, 02 Mar, 4:00 PM",
    title: "India Magic Festival",
    location: "Siri Fort Auditorium, Delhi",
    price: "₹399 onwards",
  },
  {
    id: 17,
    image: "/movies/event2.jpg",
    dateTime: "Daily, 6:00 PM",
    title: "Chokhi Dhani | Sonipat",
    location: "Sonipat, Haryana",
    price: "₹700 onwards",
  },
  {
    id: 18,
    image: "/movies/event2.jpg",
    dateTime: "Fri, 08 Mar – Sun, 10 Mar",
    title: "Delhi Street Food Festival",
    location: "Janakpuri District Centre",
    price: "₹299 onwards",
  },
  {
    id: 19,
    image: "/movies/event2.jpg",
    dateTime: "Sun, 10 Mar, 7:00 AM",
    title: "Sunrise Yoga Experience",
    location: "Lodhi Garden, Delhi",
    price: "₹199 onwards",
  },
  {
    id: 20,
    image: "/movies/event2.jpg",
    dateTime: "Wed, 12 Feb – Sun, 16 Feb",
    title: "World Book Fair 2025",
    location: "Pragati Maidan, Delhi",
    price: "₹50 onwards",
  },
];


export default function EventCard() {
  return (
    <section className="w-full py-10">
      {/* Outer width matches screenshot */}
      <div className="w-[80%] mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-black">
          All events
        </h2>

        {/* Filters row */}
        
          <div
  className="
    mb-8 flex items-center gap-3
    overflow-x-auto whitespace-nowrap no-scrollbar
    lg:flex-wrap lg:overflow-visible lg:whitespace-normal
  "
>

          {/* Filters pill */}
          <button className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Other filter chips */}
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-400"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Cards list */}
        

          <div
  className="
    flex flex-col gap-7
    overflow-visible
    md:grid md:grid-cols-4 md:gap-8
  "
>
  {EVENTS.map((event) => (
    <div
      key={event.id}
      className="
        flex flex-col
        bg-white rounded-[26px]
        shadow-[0_6px_24px_rgba(0,0,0,0.12)]
        overflow-hidden
        w-full
      "
    >
      <div className="relative w-full h-[360px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="px-4 py-4 space-y-1 bg-white">
        <p className="text-[11px] text-zinc-500">{event.dateTime}</p>
        <h3 className="text-[15px] font-semibold text-zinc-900 leading-snug">
          {event.title}
        </h3>
        <p className="text-[12px] text-zinc-500 truncate">
          {event.location}
        </p>
        <p className="text-[13px] font-semibold text-zinc-900 mt-1">
          {event.price}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
