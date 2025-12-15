"use client";

import Image from "next/image";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ⭐ ARTIST DATA
const ARTIST_DATA: any = {
  1: {
    name: "A. R. Rahman",
    image: "/movies/a1.jpg",
    bio: `A. R. Rahman is one of the most influential and celebrated music composers of modern Indian cinema. 
Often referred to as the “Mozart of Madras”, Rahman has revolutionized film music with his soulful 
melodies, groundbreaking electronic arrangements, and seamless fusion of Indian classical, global 
folk, and contemporary Western styles.

Rahman made his iconic debut with *Roja* in 1992, earning instant acclaim for his refreshing soundscape.
His global breakthrough came with the Oscar-winning score for *Slumdog Millionaire*, earning him two 
Academy Awards, a Golden Globe, and a BAFTA. Over the years, Rahman has composed for films across 
Tamil, Hindi, English, and international cinema, collaborating with global icons like Mick Jagger, 
Hans Zimmer, U2, and more.

Known for his humility, spiritual depth, and innovative artistry, Rahman continues to inspire 
millions worldwide, shaping the sound of Indian music on a global stage.`,
    events: [
      {
        id: 201,
        title: "AR Rahman Live in Concert – Dubai",
        location: "Coca Cola Arena",
        date: "Sat, 18 Jan • 8:00 PM",
        image: "/movies/event1.jpg",
        price: "₹3,499 onwards",
      },
    ],
  },

  2: {
    name: "Sunidhi Chauhan",
    image: "/movies/a2.jpg",
    bio: `Sunidhi Chauhan is one of India's most dynamic and versatile playback singers, known for her 
power-packed vocals, energetic stage presence, and ability to excel across a wide range of genres. 
She began her musical journey at the age of four and rose to national fame as a teenager after winning 
a major singing reality show.

With blockbuster hits like “Sheila Ki Jawani”, “Beedi”, “Kamli”, “Ishq Sufiyana”, and “Udi”, Sunidhi 
has established herself as the voice of Bollywood’s most iconic dance tracks while also delivering 
soulful romantic ballads.

A true live performer, Sunidhi's concerts are known for high-energy musical arrangements, seamless 
genre transitions, and her distinctive vocal firepower that keeps audiences spellbound.`,
    events: [
      {
        id: 202,
        title: "Sunidhi Chauhan Live – Delhi",
        location: "JLN Stadium",
        date: "Sat, 09 Mar • 7:00 PM",
        image: "/movies/event2.jpg",
        price: "₹899 onwards",
      },


    ],
  },

  3: {
    name: "Masoom Sharma",
    image: "/movies/a3.jpg",
    bio: "Masoom Sharma is a renowned Haryanvi singer known for energetic folk performances.",
    events: [
 {
        id: 202,
        title: "Sunidhi Chauhan Live – Delhi",
        location: "JLN Stadium",
        date: "Sat, 09 Mar • 7:00 PM",
        image: "/movies/event2.jpg",
        price: "₹899 onwards",
      },
    ],
  },

  4: {
    name: "Satinder Sartaaj",
    image: "/movies/a4.jpg",
    bio: `Dr. Satinder Sartaaj is an internationally acclaimed Punjabi singer, poet, Sufi scholar, and actor. 
Renowned for his soulful voice and spiritually enriching lyrics, Sartaaj has captivated audiences 
worldwide with his deep connection to Sufi thought, Punjabi folklore, and poetic expression.`,
    events: [
      {
        id: 101,
        title: "Heritage India Tour – Delhi",
        location: "JLN Stadium",
        date: "Sat, 14 Feb • 7:00 PM",
        image: "/movies/event2.jpg",
        price: "₹499 onwards",
      },
    ],
  },

  5: {
    name: "Jubin Nautiyal",
    image: "/movies/a5.jpg",
    bio: "Jubin Nautiyal is one of India's leading playback singers, known for soulful hits.",
    events: [],
  },

  6: {
    name: "Aditya Rikhari",
    image: "/movies/a6.jpg",
    bio: "Aditya Rikhari is a rising indie-pop performer known for his heartfelt romantic tracks.",
    events: [],
  },

  7: {
    name: "Badshah",
    image: "/movies/a7.jpg",
    bio: "Badshah is a leading Indian rapper, singer, and songwriter with global recognition.",
    events: [],
  },

  8: {
    name: "Diljit Dosanjh",
    image: "/movies/a8.jpg",
    bio: "Diljit Dosanjh is a Punjabi singer, actor, and global performer.",
    events: [],
  },
};

export default function ArtistPage(props: { params: Promise<{ id: string }> }) {
  const { id } = React.use(props.params);
  const artist = ARTIST_DATA[id];

  const [expanded, setExpanded] = React.useState(false);

  if (!artist)
    return (
      <div className="text-center p-10 text-xl text-gray-600">
        Artist not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ========================== HERO ========================== */}
<section className="px-6 lg:px-20 py-10 w-full max-w-screen-xl mx-auto 
                    flex flex-col lg:flex-row gap-10">

  {/* Artist Image */}
<div 
  className="
    relative w-full lg:w-1/2 
    h-[260px] sm:h-[320px] lg:h-[500px] 
    rounded-3xl overflow-hidden shadow-lg
    lg:-translate-x-21   /* ⭐ move left on desktop */
  "
>
  <Image
    src={artist.image}
    alt={artist.name}
    fill
    className="object-cover"
  />
</div>


  {/* Artist Info */}
  <div className="flex flex-col lg:-translate-x-21 justify-center lg:w-1/2">
    <h1 className="text-3xl font-bold text-black">{artist.name}</h1>

    {/* Desktop Bio */}
    <p className="hidden lg:block text-gray-700 mt-4 leading-relaxed">
      {artist.bio.replace(/\n+/g, " ")}
    </p>

    {/* Mobile Bio */}
    <p className="lg:hidden text-gray-700 mt-4 leading-relaxed">
      {expanded
        ? artist.bio.replace(/\n+/g, " ")
        : artist.bio.replace(/\n+/g, " ").substring(0, 180) +
          (artist.bio.length > 180 ? "..." : "")}
    </p>

    {artist.bio.length > 180 && (
      <button
        onClick={() => setExpanded(!expanded)}
        className="lg:hidden mt-2 text-purple-700 font-semibold text-sm"
      >
        {expanded ? "See less" : "See more"}
      </button>
    )}
  </div>
</section>


      {/* ========================== EVENTS ========================== */}
      <section className="px-6 lg:px-20 pb-20">
        <h2 className="text-xl text-black font-bold mb-6">All Events</h2>

        {artist.events.length === 0 ? (
          <p className="text-gray-500">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artist.events.map((ev: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl bg-white shadow hover:shadow-xl transition p-3 border"
              >
                <div className="relative h-[260px] rounded-xl overflow-hidden">
                  <Image src={ev.image} alt={ev.title} fill className="object-cover" />
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-500">{ev.date}</p>

                  <h3 className="text-lg font-semibold text-black mt-1">
                    {ev.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">{ev.location}</p>

                  <p className="text-sm font-semibold text-black mt-2">
                    {ev.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />  
    </div>
  );
}
