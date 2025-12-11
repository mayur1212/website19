"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logored.png";

import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";
import LocationModal from "@/components/LocationModal";

import {
  Utensils,
  Ticket,
  Clapperboard,
  Dumbbell,
  Gamepad2,
  Store,
  Sparkles,
} from "lucide-react";

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

  const [showIcons, setShowIcons] = useState(true);
  const [language, setLanguage] = useState<"EN" | "AR">("EN");

  // ❌ hydration mismatch टाळण्यासाठी: initializer मध्ये window/localStorage वापरू नको
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState<{ city: string; country: string }>({
    city: "Dubai",
    country: "UAE",
  });

  // ✅ client वर mount झाल्यावरच localStorage check कर
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("logged_in") === "true";
        setIsLoggedIn(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  // Scroll behavior for icon hide/show – हे useEffect मध्ये असल्यामुळे safe आहे
  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") return;
      setShowIcons(window.scrollY < 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isItemActive = (href: string) => {
    if (!pathname) return false;

    if (href === "/") return pathname === "/";

    // Movies tab `/movies` + `/movie/[slug]` दोन्हीवर active ठेव
    if (href === "/movies") {
      return pathname.startsWith("/movies") || pathname.startsWith("/movie/");
    }

    return pathname.startsWith(href);
  };

  const handleLoginSuccess = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("logged_in", "true");
    }
    setIsLoggedIn(true);
    setOpenDrawer(true);
  };

  const getIcon = (label: string) => {
    switch (label) {
      case "For you":
        return <Sparkles size={18} />;
      case "Dining":
        return <Utensils size={18} />;
      case "Events":
        return <Ticket size={18} />;
      case "Movies":
        return <Clapperboard size={18} />;
      case "Activities":
        return <Dumbbell size={18} />;
      case "Play":
        return <Gamepad2 size={18} />;
      case "Stores":
        return <Store size={18} />;
      default:
        return null;
    }
  };

  return (
    <header className="w-full border-b border-zinc-200 bg-white">
      {/* MOBILE NAVBAR */}
      <div className="md:hidden w-full bg-white border-b border-zinc-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setOpenLocation(true)}
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-zinc-100"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7a4 4 0 100 8 4 4 0 000-8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3a9 9 0 019 9c0 6-9 12-9 12S3 18 3 12a9 9 0 019-9z"
                />
              </svg>
            </span>

            <span className="flex flex-col text-left leading-tight">
              <span className="text-sm font-semibold text-black">
                {location.city}
              </span>
              <span className="text-[11px] text-zinc-500">
                {location.country}
              </span>
            </span>
          </button>

          <button
            onClick={() =>
              isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-sm"
          >
            U
          </button>
        </div>

        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-300">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-zinc-600"
            >
              <circle cx="11" cy="11" r="7" fill="none" strokeWidth="2" />
              <path d="M16 16l4 4" strokeWidth="2" />
            </svg>
            <input
              className="flex-1 bg-transparent text-sm focus:outline-none text-black"
              placeholder="Search for events, movies and restaurants"
            />
          </div>
        </div>

        <div className="flex overflow-x-auto no-scrollbar px-2 pb-2 gap-3">
          {NAV_ITEMS.map(({ label, href }) => {
            const active = isItemActive(href);

            return (
              <Link
                key={label}
                href={href}
                className={`
                  flex flex-col items-center justify-center
                  min-w-[70px] px-3 py-1.5 rounded-2xl text-sm transition
                  ${
                    active
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-100 text-zinc-700"
                  }
                `}
              >
                <div
                  className={`
                    transition-all duration-200 
                    ${
                      showIcons
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75 h-0 overflow-hidden"
                    }
                  `}
                >
                  {getIcon(label)}
                </div>

                <span
                  className={`${showIcons ? "mt-1" : ""} whitespace-nowrap`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex w-full items-center justify-between px-10 py-2">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={110}
              height={33}
              className="rounded-xl"
            />
          </Link>

          <span className="h-8 w-px bg-zinc-200" />

          <button
            onClick={() => setOpenLocation(true)}
            className="group flex items-center gap-3 px-3 py-2 border border-zinc-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            <span className="flex h-8 w-8 items-center justify-center overflow-visible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-600"
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

            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-semibold text-black">
                {location.city}
              </span>
              <span className="text-[12px] text-zinc-500 mt-0.5">
                {location.country}
              </span>
            </span>

            <svg className="h-4 w-4 text-zinc-500 group-hover:text-black transition">
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

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
                    : "text-zinc-900 hover:bg-purple-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border shadow-sm">
            <svg className="h-5 w-5 text-purple-600" fill="none">
              <circle cx="11" cy="11" r="5.5" stroke="currentColor" />
              <path d="m15.5 15.5 3.5 3.5" stroke="currentColor" />
            </svg>
          </button>

          <div className="flex items-center rounded-full border bg-zinc-50 text-xs font-semibold">
            {(["EN", "AR"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-3 py-1.5 ${
                  language === code
                    ? "bg-[#FD3F00] text-white rounded-full"
                    : "text-zinc-700"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-sm"
          >
            U
          </button>
        </div>
      </div>

      <ProfileLoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={handleLoginSuccess}
      />

      <ProfileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onLoggedOut={() => {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("logged_in");
          }
          setIsLoggedIn(false);
          setOpenDrawer(false);
        }}
      />

      <LocationModal
        open={openLocation}
        onClose={() => setOpenLocation(false)}
        onSelect={(loc) =>
          setLocation({ city: loc.city, country: loc.country })
        }
      />
    </header>
  );
}
