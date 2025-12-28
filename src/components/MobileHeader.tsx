"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileHeader() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="md:hidden sticky top-0 z-50 bg-white border-b border-zinc-200">
      {/* NORMAL HEADER */}
      {!searchOpen && (
        <div className="flex items-center justify-between px-4 py-3">
          {/* BACK */}
          <button onClick={() => router.back()}>
            <svg
              className="h-6 w-6 text-zinc-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* SEARCH ICON */}
          <button onClick={() => setSearchOpen(true)}>
            <svg
              className="h-6 w-6 text-zinc-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
        </div>
      )}

      {/* SEARCH MODE */}
      {searchOpen && (
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-zinc-300 px-4 py-2">
            <svg
              className="h-4 w-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>

            <input
              autoFocus
              type="text"
              placeholder="Search for theatres"
              className="w-full border-none bg-transparent text-sm outline-none"
            />
          </div>

          <button
            onClick={() => setSearchOpen(false)}
            className="text-sm font-medium text-zinc-800"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
