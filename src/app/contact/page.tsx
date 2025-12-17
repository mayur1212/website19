"use client";

import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* 🔥 HEADER */}
      <header className="relative w-full py-6 flex items-center justify-center">
        <Image
          src="/movies/logored.png"
          alt="Hayya Logo"
          width={120}
          height={40}
          className="rounded-xl cursor-pointer"
          priority
        />
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="w-full flex-grow">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            {/* LEFT: FORM */}
            <section className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 sm:p-7">
              <form className="flex flex-col gap-4">
                <label className="block">
                  <span className="text-xs text-zinc-600">Category</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full border border-zinc-300 rounded-lg px-4 py-3"
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="movies">Movies</option>
                    <option value="events">Events</option>
                    <option value="dining">Dining</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-600">Full name *</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-zinc-300 rounded-lg px-4 py-3"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-600">Email *</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-zinc-300 rounded-lg px-4 py-3"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-600">Mobile *</span>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="mt-1 block w-full border border-zinc-300 rounded-lg px-4 py-3"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-600">
                    Describe your issue *
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 block w-full border border-zinc-300 rounded-lg px-4 py-3 h-36"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg"
                >
                  Submit
                </button>
              </form>
            </section>

            {/* RIGHT: INFO */}
            <aside>
              <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 sm:p-7">
                <h3 className="text-lg font-semibold mb-2">
                  Need quick help?
                </h3>
                <p className="text-sm text-zinc-600 mb-4">
                  Contact our support team
                </p>

                <p className="text-sm">
                  📞 +91 12345 67890
                </p>
                <p className="text-sm">
                  ✉️ support@gethayya.com
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* ⭐ FOOTER */}
      <Footer />
    </div>
  );
}
