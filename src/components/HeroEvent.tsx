"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroEvent({
  title,
  dateTime,
  location,
  price,
  image,
}: {
  title: string;
  dateTime: string;
  location: string;
  price: number;
  image: string;
}) {
  return (
    <section className="w-full relative bg-gradient-to-b from-zinc-100 to-white py-10">
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-zinc-700 mb-1">{dateTime}</p>

          <h1 className="text-4xl font-bold text-black mb-2">{title}</h1>

          <p className="text-lg text-zinc-700 mb-4">{location}</p>

          <p className="text-lg font-semibold text-black mb-6">
            ₹{price} onwards
          </p>

          <button className="px-6 py-3 bg-black text-white rounded-xl text-lg font-medium hover:bg-zinc-900 transition">
            Book tickets
          </button>
        </motion.div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          className="relative w-full h-[380px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-3xl object-cover shadow-xl"
          />
        </motion.div>
      </div>

      {/* Pagination dots / keep same spacing as your slider */}
      <div className="w-full text-center mt-6">
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-black" />
          <div className="w-2 h-2 rounded-full bg-zinc-400" />
          <div className="w-2 h-2 rounded-full bg-zinc-400" />
        </div>
      </div>
    </section>
  );
}
