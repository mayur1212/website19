"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logored.png";

const NAV_ITEMS = [
  { label: "For you", href: "/" },
  { label: "Dining", href: "/dining" },
  { label: "Events", href: "/events" },
  { label: "Movies", href: "/movies" },
  { label: "Activities", href: "/Activities" },
  { label: "Play", href: "/play" },
  { label: "Stores", href: "/stores" },
];

// ---------------- ICON HELPER ----------------
function NavIcon({ label, active }: { label: string; active: boolean }) {
  const base = `h-5 w-5 ${active ? "text-black" : "text-zinc-800"}`;

  switch (label) {
    case "For you":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M7 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 6l.5 1 .9.5-.9.5L16 9l-.5-1-.9-.5.9-.5L16 6z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 14l1.2 2.5L19 18l-2.8 1.5L15 22l-1.2-2.5L11 18l2.8-1.5L15 14z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "Dining":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M7 3v8M9 3v8M7 7h2M17 3v9m-3-6h3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case "Events":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M5 7l9-4 3 13-4-3-3 4L5 7z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="9" r="1" fill="currentColor" />
        </svg>
      );

    case "Movies":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <rect
            x="4"
            y="6"
            width="16"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8 6v2M12 6v2M16 6v2M8 16v2M12 16v2M16 16v2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );

    case "Activities":
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <path
            d="M12 4v2.2M12 17.8V20M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M4 12h2.2M17.8 12H20M6.3 17.7l1.6-1.6M16.1 7.9l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={base} fill="none">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

// ---------------------------------- HEADER COMPONENT ----------------------------------
export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // language toggle (EN / AR)
  const [language, setLanguage] = useState<"EN" | "AR">("EN");

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="w-full border-b border-zinc-100 bg-white">
      {/* ---------------- MOBILE + TABLET ---------------- */}
      <div className="md:hidden">
        {/* TOP ROW */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* LEFT: location + language */}
          <div className="flex items-center gap-3">
            {/* location button */}
            <button className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-zinc-50">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/70 bg-purple-50">
                <svg
                  className="h-3.5 w-3.5 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="11"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>

              <span className="flex flex-col leading-tight text-left">
                <span className="text-sm font-semibold text-zinc-900">
                  Gurugram
                </span>
                <span className="text-xs text-zinc-500">Haryana</span>
              </span>
            </button>

            {/* language toggle (mobile) */}
            <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 text-[11px] font-semibold text-zinc-700 shadow-sm">
              {(["EN", "AR"] as const).map((code) => {
                const isActive = language === code;
                return (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={[
                      "px-2.5 py-1 transition-all",
                      isActive
                        ? "rounded-full bg-[#9810fa] text-white shadow-md"
                        : "text-zinc-700 hover:text-[#9810fa]",
                    ].join(" ")}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: user avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-sm">
            U
          </div>
        </div>

        {/* SEARCH + NAV (sticky) */}
        <div
          className={`sticky top-0 z-30 border-t border-b border-zinc-100 bg-white/95 backdrop-blur ${
            isScrolled ? "shadow-sm" : ""
          }`}
        >
          <div className="flex flex-col gap-3 px-4 py-3">
            {/* SEARCH BAR */}
            <button className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-left text-sm text-zinc-500 shadow-sm">
              <svg
                className="h-4 w-4 text-purple-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="m15.5 15.5 3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>Search for events, movies and restaurants</span>
            </button>

            {/* ICON NAVIGATION */}
            <nav className="mt-1 flex gap-2 overflow-x-auto pb-1 text-sm font-medium no-scrollbar">
              {NAV_ITEMS.map(({ label, href }) => {
                const active = isItemActive(href);

                return (
                  <Link
                    key={label}
                    href={href}
                    className={[
                      "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 transition-all duration-300",
                      active
                        ? "bg-purple-600 text-white shadow-md scale-105"
                        : "text-zinc-900 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm hover:scale-105",
                      label === "For you" && !active
                        ? "hover:bg-transparent hover:text-purple-700 hover:shadow-none hover:scale-100"
                        : "",
                    ].join(" ")}
                  >
                    {!isScrolled && <NavIcon label={label} active={active} />}
                    <span className="text-sm">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* ---------------- DESKTOP ---------------- */}
      <div className="hidden w-full items-center justify-between px-8 py-1.5 md:flex">
        {/* LEFT: Logo + Location */}
        <div className="flex items-center gap-7">
          <Link href="/" className="cursor-pointer">
            <Image
              src={Logo}
              alt="Logo"
              width={110}
              height={32}
              className="object-contain"
            />
          </Link>

          <span className="h-8 w-px bg-zinc-200" />

          <button className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-zinc-50">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/70 bg-purple-50">
              <svg
                className="h-3.5 w-3.5 text-purple-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="12"
                  cy="11"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-zinc-900">
                Gurugram
              </span>
              <span className="text-xs text-zinc-500">Haryana</span>
            </span>
          </button>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="hidden items-center gap-4 text-sm font-medium text-zinc-700 md:flex">
          {NAV_ITEMS.map(({ label, href }) => {
            const active = isItemActive(href);

            return (
              <Link
                key={label}
                href={href}
                className={[
                  "rounded-full px-4 py-1.5 transition-all duration-300",
                  active
                    ? "bg-purple-600 text-white shadow-md scale-105"
                    : "text-zinc-900 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm hover:scale-105",
                  label === "For you" && !active
                    ? "hover:bg-transparent hover:text-purple-700 hover:shadow-none hover:scale-100"
                    : "",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE: search + language toggle + user */}
        <div className="flex items-center gap-4">
          {/* Search icon button (BIGGER) */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-white shadow-sm transition hover:border-purple-300 hover:bg-purple-50">
            <svg
              className="h-5 w-5 text-purple-600"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m15.5 15.5 3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          {/* LANGUAGE TOGGLE EN / AR (desktop) */}
          <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-700 shadow-sm">
            {(["EN", "AR"] as const).map((code) => {
              const isActive = language === code;

              return (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={[
                    "px-3 py-1.5 transition-all",
                    isActive
                      ? "rounded-full bg-[#9810fa] text-white shadow-md"
                      : "text-zinc-700 hover:text-[#9810fa]",
                  ].join(" ")}
                >
                  {code}
                </button>
              );
            })}
          </div>

          {/* User avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-sm">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
