"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logored.png";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">

      {/* 🔥 HEADER OUTSIDE CONTAINER SO LOGO TOUCHES LEFT SCREEN */}
      <header className="relative w-full py-6 flex items-center justify-center">
        {/* Logo — NOW TRULY LEFT EDGE */}
        <Link href="/" className="absolute left-1 sm:left-4 md:left-4">
  <Image
    src={Logo}
    alt="Hayya Logo"
    width={110}
    height={33}
    className="rounded-xl cursor-pointer"
  />
</Link>


        {/* Title Center */}
        <h1 className="text-center text-2xl sm:text-3xl font-semibold">
          How can we help you?
        </h1>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full flex-grow">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-4">

          {/* GRID: Form + Info */}
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
                      Select Category (Movies / Events / Dining / Other)
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
                    placeholder="Full name"
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
                    placeholder="you@example.com"
                    className="mt-1 block w-full border border-zinc-300 rounded-lg px-4 py-3"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-600">Mobile *</span>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="mt-1 block w-full border border-zinc-300 rounded-lg px-4 py-3"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs text-zinc-600">Describe your issue *</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue briefly..."
                    className="mt-1 block w-full border border-zinc-300 rounded-lg px-4 py-3 h-36"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-lg hover:opacity-90"
                >
                  Submit
                </button>
              </form>
            </section>

            {/* RIGHT: INFO CARD */}
            <aside className="space-y-4">
              <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 sm:p-7">
                <h3 className="text-lg font-semibold mb-2">Need quick help?</h3>
                <p className="text-sm text-zinc-600 mb-4">Contact our support team:</p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📞</span>
                    <div>
                      <div className="text-sm">Support</div>
                      <a href="tel:+911234567890" className="text-sm font-semibold">
                        +91 12345 67890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-lg">✉️</span>
                    <div>
                      <div className="text-sm">Email</div>
                      <a href="mailto:support@gethayya.com" className="text-sm font-semibold">
                        support@gethayya.com
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 text-sm text-zinc-600">
                    <strong className="text-zinc-800">Office Hours:</strong> Mon–Sat, 9 AM – 7 PM
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
