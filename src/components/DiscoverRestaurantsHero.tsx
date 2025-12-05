"use client";

import React from "react";

export default function DiscoverRestaurantsHero() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f3e9ff] to-[#f7f2ff] py-16">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-4">
        {/* Card */}
        <div className="w-full rounded-[40px] border border-white/60 bg-gradient-to-b from-[#f3e9ff] via-[#f7efff] to-[#fbf8ff] px-6 py-12 text-center shadow-[0_30px_80px_rgba(140,94,255,0.25)] sm:px-10 sm:py-16">
          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-2xl font-semibold leading-snug text-zinc-900 sm:text-3xl md:text-[32px] md:leading-[42px]">
            Discover restaurants, explore menus, book tables – all in one place
          </h2>

          {/* Search bar */}
          <div className="mt-10 flex justify-center">
            <div className="flex w-full max-w-2xl items-center gap-3 rounded-full border border-purple-100 bg-white px-5 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
              {/* search icon */}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50">
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
