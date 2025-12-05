"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logored.png";

import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";

// ⭐ NEW IMPORTS FOR LOCATION POPUP
import LocationModal from "@/components/LocationModal";

const NAV_ITEMS = [
  { label: "For you", href: "/" },
  { label: "Dining", href: "/dining" },
  { label: "Events", href: "/events" },
  { label: "Movies", href: "/movies" },
  { label: "Activities", href: "/Activities" },
  { label: "Play", href: "/play" },
  { label: "Stores", href: "/stores" },
];

export default function Header() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"EN" | "AR">("EN");

  // LOGIN
  const [openLogin, setOpenLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // PROFILE DRAWER
  const [openDrawer, setOpenDrawer] = useState(false);

  // ⭐ LOCATION POPUP STATE
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState<{ city: string; country: string }>({
    city: "Dubai",
    country: "UAE",
  });

  // Persist login
  useEffect(() => {
    const saved = localStorage.getItem("logged_in");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("logged_in", "true");
    setIsLoggedIn(true);
    setOpenDrawer(true);
  };

  return (
    <header className="w-full border-b border-zinc-200 bg-white">

      {/* ---------- MOBILE NAVBAR ---------- */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">

          {/* ⭐ MOBILE LOCATION BUTTON */}
          <button
            onClick={() => setOpenLocation(true)}
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-zinc-50"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-400 bg-purple-50">
              📍
            </span>

            <span className="flex flex-col text-left">
              <span className="text-sm font-semibold">{location.city}</span>
              <span className="text-xs text-zinc-500">{location.country}</span>
            </span>
          </button>

          {/* MOBILE AVATAR */}
          <button
            onClick={() => (isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-sm"
          >
            U
          </button>
        </div>
      </div>

      {/* ---------- DESKTOP NAVBAR ---------- */}
      <div className="hidden md:flex w-full items-center justify-between px-10 py-2">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={110} height={32} className="rounded-[10px]"  />
          </Link>

          <span className="h-8 w-px bg-zinc-200" />

          {/* ⭐ DESKTOP LOCATION BUTTON */}
          <button
  onClick={() => setOpenLocation(true)}
  className="
    group flex items-center gap-3 px-3 py-2 
    border border-zinc-200 bg-white rounded-2xl 
    shadow-sm hover:shadow-md transition-all
  "
>
  {/* Icon Container */}
  <span
  className="
    flex h-8 w-8 items-center justify-center
    rounded-xl bg-purple-50 border border-purple-200
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-red-600"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 7.5a3 3 0 100 6 3 3 0 000-6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 10.5c0 5.25-6 10-6 10s-6-4.75-6-10a6 6 0 1112 0z"
    />
  </svg>
</span>


  {/* Text */}
  <span className="flex flex-col leading-tight">
    <span className="text-[15px] font-semibold text-black">
      {location.city}
    </span>
    <span className="text-[12px] text-zinc-500 -mt-0.5">
      {location.country}
    </span>
  </span>

  {/* Dropdown Indicator */}
  <svg
    className="h-4 w-4 text-zinc-500 group-hover:text-black transition"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M6 8l4 4 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
</button>

        </div>

        {/* CENTER NAV */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {NAV_ITEMS.map(({ label, href }) => {
            const active = isItemActive(href);
            return (
              <Link
                key={label}
                href={href}
                className={`px-4 py-1.5 rounded-full transition ${
                  active
                    ? "bg-red-600 text-white"
                    : "text-zinc-900 hover:bg-purple-100 hover:text-rede-700"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {/* SEARCH BUTTON */}
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border shadow-sm">
            <svg className="h-5 w-5 text-purple-600" fill="none">
              <circle cx="11" cy="11" r="5.5" stroke="currentColor" />
              <path d="m15.5 15.5 3.5 3.5" stroke="currentColor" />
            </svg>
          </button>

          {/* LANGUAGE TOGGLE */}
          <div className="flex items-center rounded-full border bg-zinc-50 text-xs font-semibold">
            {(["EN", "AR"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-3 py-1.5 ${
                  language === code ? "bg-[#FD3F00] text-white rounded-full" : "text-zinc-700"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* PROFILE AVATAR */}
          <button
            onClick={() => (isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-sm"
          >
            U
          </button>
        </div>
      </div>

      {/* LOGIN MODAL */}
      <ProfileLoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* PROFILE DRAWER */}
      <ProfileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />

      {/* ⭐ LOCATION MODAL (NEW) */}
      <LocationModal
        open={openLocation}
        onClose={() => setOpenLocation(false)}
        onSelect={(loc) => setLocation({ city: loc.city, country: loc.country })}
      />
    </header>
  );
}
