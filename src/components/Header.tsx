"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/hayyalogo.png";
<<<<<<< HEAD

=======
>>>>>>> origin/shub-dev-v2

import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";
import LocationModal from "@/components/LocationModal";
import SearchPopup from "@/components/SearchPopup";

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

export default function Header({
  hideTabs = false,
  centerContent,
  variant = "default",
}: {
  hideTabs?: boolean;
  centerContent?: React.ReactNode;
  variant?: "default" | "slim";
}) {
  const pathname = usePathname();

  /* ✅ ONLY ADDITION FOR MOBILE NAV */
  const navRef = useRef<HTMLDivElement | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [language, setLanguage] = useState<"EN" | "AR">("EN");

  const [openLogin, setOpenLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState<{ city: string; country: string }>({
    city: "Dubai",
    country: "UAE",
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("All");

  const openSearchWithCorrectTab = () => {
    if (pathname?.includes("/events")) setDefaultTab("Events");
    else if (pathname?.includes("/dining")) setDefaultTab("Dining");
    else if (pathname?.includes("/movies")) setDefaultTab("Movies");
    else if (pathname?.toLowerCase()?.includes("/activities"))
      setDefaultTab("Activities");
    else setDefaultTab("All");

    setIsSearchOpen(true);
  };

  /* LOGIN PERSIST */
  useEffect(() => {
    const saved = localStorage.getItem("logged_in");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  /* ICON HIDE ON SCROLL */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowIcons(window.scrollY < 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ✅ SAVE MOBILE NAV SCROLL */
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const handleScroll = () => {
      sessionStorage.setItem(
        "mobile_nav_scroll",
        el.scrollLeft.toString()
      );
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  /* ✅ RESTORE MOBILE NAV SCROLL ON PAGE CHANGE */
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const saved = sessionStorage.getItem("mobile_nav_scroll");
    if (saved !== null) {
      el.scrollLeft = Number(saved);
    }
  }, [pathname]);

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("logged_in", "true");
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
    
      <header className="w-full bg-white border-b border-zinc-200 md:sticky md:top-0 md:z-50">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden w-full bg-white border-b border-zinc-200">
        {/* TOP */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setOpenLocation(true)}
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-zinc-100"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100">
              📍
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

        {/* SEARCH */}
        <div className="px-4 pb-2">
          <div
            onClick={openSearchWithCorrectTab}
            className="flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-xl border border-zinc-300"
          >
            <span className="text-sm text-zinc-500">
              Search for events, movies and restaurants
            </span>
          </div>
        </div>

        {/* NAV ICON TABS (UI SAME, ONLY ref added) */}
        <div
          ref={navRef}
          className="flex overflow-x-auto no-scrollbar px-2 pb-2 gap-3"
        >
          {NAV_ITEMS.map(({ label, href }) => {
            const active = isItemActive(href);

            return (
              <Link
                key={label}
                href={href}
                scroll={false}
                className={`flex flex-col items-center justify-center min-w-[70px] px-3 py-1.5 rounded-2xl text-sm transition ${
                  active
                    ? "bg-purple-600 text-white"
                    : "bg-zinc-100 text-zinc-700"
                }`}
              >
                <div
                  className={`transition-all duration-200 ${
                    showIcons
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75 h-0 overflow-hidden"
                  }`}
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

      {/* ================= DESKTOP (100% UNCHANGED) ================= */}
      {/* 👉 तुझा desktop JSX जसाच्या तसा आहे – काहीही change नाही */}

      <div className="hidden md:flex w-full items-center justify-between px-10 py-2">
        
        

        {/* LEFT */}
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={110} height={33} className="rounded-xl" />
          </Link>

          <span className="h-8 w-px bg-zinc-200" />

          {/* Desktop Location */}
          <button
  onClick={() => setOpenLocation(true)}
  className="group flex items-center gap-3 px-3 py-2 bg-white"
>
  {/* Location Icon */}
  <span className="flex h-8 w-8 items-center justify-center overflow-visible">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-9 w-9 text-[#6444e4]"
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
    <span className="text-[12px] text-zinc-500 mt-0.5">
      {location.country}
    </span>
  </span>
</button>

        </div>

        {/* CENTER NAV */}
        {/* CENTER (NAV OR EVENT DETAILS) */}
<div className="hidden md:flex flex-1 justify-center">
  {centerContent ? (
    <div className="text-center leading-tight">
      {centerContent}
    </div>
  ) : (
    <nav className="flex items-center gap-4 text-sm">
      {NAV_ITEMS.map(({ label, href }) => {
        const active = isItemActive(href);

        return (
          <Link
  key={label}
  href={href}
  className={`
    px-4 py-1.5 rounded-full text-sm font-medium transition
    ${
      active
        ? "bg-[#eae5ff] text-[#41327f] font-semibold"
        : "text-zinc-900 hover:bg-[#f1ecff]"
    }
  `}
>
  {label}
</Link>

        );
      })}
    </nav>
  )}
</div>


        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH BUTTON — DESKTOP */}
          <button
  onClick={openSearchWithCorrectTab}
  className="h-10 w-10 flex items-center justify-center rounded-full bg-white"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 text-[#6b4ce5]"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke="currentColor"
  >
    <circle cx="11" cy="11" r="5.5" />
    <path d="m15.5 15.5 3.5 3.5" />
  </svg>
</button>


          
          <div className="flex items-center rounded-full border bg-zinc-50 text-xs font-semibold">
            {(["EN", "AR"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-3 py-1.5 ${
                  language === code ? "bg-[#1d1841] text-white rounded-full" : "text-zinc-700"
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
  className="
    flex h-9 w-9 items-center justify-center
    rounded-full
    bg-[#0f172a]   /* deep black/navy like screenshot */
    text-white
    text-sm font-semibold leading-none
    shadow-sm
  "
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

      {isSearchOpen && (
        <SearchPopup
          onClose={() => setIsSearchOpen(false)}
          activeTab={defaultTab as any}
        />
      )}
    </header>
  );
}

