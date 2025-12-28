"use client";

import React from "react";

export default function DiscoverRestaurantsHero() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f3e9ff] via-[#f6efff] to-[#fbf8ff] py-20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4">
        {/* Glass Card */}
        <div className="relative w-full rounded-[44px] border border-white/60 bg-gradient-to-b from-white/70 via-white/60 to-white/40 px-6 py-14 text-center backdrop-blur-xl shadow-[0_40px_100px_rgba(140,94,255,0.25)] sm:px-12 sm:py-20">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-r from-purple-200/40 via-transparent to-purple-200/40" />

          {/* Heading */}
          <h2 className="relative mx-auto max-w-3xl text-2xl font-semibold leading-snug text-zinc-900 sm:text-3xl md:text-[34px] md:leading-[44px]">
            Discover restaurants, explore menus, book tables – all in one place
          </h2>

          {/* Search */}
          <div className="relative mt-12 flex justify-center">
            <div className="flex w-full max-w-2xl items-center gap-3 rounded-full border border-purple-100 bg-white px-5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-purple-500"
                  fill="none"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m15.5 15.5 3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search for a restaurant name"
                className="w-full border-none bg-transparent text-sm outline-none placeholder:text-zinc-400 sm:text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
