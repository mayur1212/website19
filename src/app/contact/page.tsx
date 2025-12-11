"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logored.png"; // ← your hayya logo path

export default function ContactPage() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="max-h-screen bg-white text-black px-6 md:px-20 py-10">

      {/* LOGO */}
      <div className="flex justify-center mb-6">
        <Image
          src={Logo}
          alt="Hayya Logo"
          width={120}
          height={40}
          className="rounded-xl"
        />
      </div>

      {/* PAGE TITLE */}
      <h1 className="text-center text-3xl font-semibold mb-10">
        How can we help you?
      </h1>

      {/* FORM + INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* LEFT SIDE FORM */}
        <div className="flex flex-col gap-5">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-zinc-300 rounded-lg px-4 py-3 text-black"
          >
            <option value="">Movies / Events / Dining / Other</option>
            <option value="movies">Movies</option>
            <option value="events">Events</option>
            <option value="dining">Dining</option>
            <option value="other">Other</option>
          </select>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name *"
            className="border border-zinc-300 rounded-lg px-4 py-3 text-black"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address *"
            className="border border-zinc-300 rounded-lg px-4 py-3 text-black"
          />

          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile number *"
            className="border border-zinc-300 rounded-lg px-4 py-3 text-black"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Briefly describe your issue here *"
            className="border border-zinc-300 rounded-lg px-4 py-3 text-black h-36"
          />

          <button className="bg-zinc-200 text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-300 transition">
            Submit
          </button>
        </div>

        {/* RIGHT SIDE INFO */}
        <div className="text-zinc-700 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold mb-3">Issue with your booking?</h2>
          <p>
            Open the Hayya app → Go to your profile → Tap ‘Chat with us’
            under the Support section to connect with our customer support team
            for faster assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
