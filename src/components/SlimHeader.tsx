"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logored.png";
import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";

type SlimHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function SlimHeader({ title, subtitle }: SlimHeaderProps) {
  /* ---------------- LOGIN STATE (SAME AS HEADER) ---------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("logged_in") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("logged_in", "true");
    setIsLoggedIn(true);
    setOpenLogin(false);
    setOpenDrawer(true);
  };

  return (
    <>
      {/* ================= HEADER (DESKTOP + MOBILE SAME HEIGHT) ================= */}
      <header className="w-full border-b border-zinc-200 bg-white">

        {/* 📱 MOBILE (MATCHES HEADER HEIGHT & PADDING) */}
        <div className="md:hidden w-full flex items-center justify-between px-4 py-3">
          {/* LEFT — LOGO */}
          <Link href="/">
            <Image
              src={Logo}
              alt="Hayya"
              width={90}
              height={28}
              className="rounded-xl"
            />
          </Link>

          {/* CENTER — TITLE */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center leading-tight">
            <h1 className="text-sm font-semibold text-black">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-zinc-500">
                {subtitle}
              </p>
            )}
          </div>

          {/* RIGHT — PROFILE */}
          <button
            onClick={() =>
              isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-sm"
          >
            U
          </button>
        </div>

        {/* 🖥 DESKTOP (EXACT SAME AS HEADER) */}
        <div className="hidden md:flex w-full items-center justify-between px-10 py-2">
          {/* LEFT */}
          <Link href="/">
            <Image
              src={Logo}
              alt="Hayya"
              width={110}
              height={33}
              className="rounded-xl"
            />
          </Link>

          {/* CENTER */}
          <div className="text-center leading-tight">
            <h1 className="text-[15px] font-semibold text-black">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[12px] text-zinc-500">
                {subtitle}
              </p>
            )}
          </div>

          {/* RIGHT */}
          <button
            onClick={() =>
              isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-sm"
          >
            U
          </button>
        </div>
      </header>

      {/* ================= MODALS (UNCHANGED) ================= */}
      <ProfileLoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={handleLoginSuccess}
      />

      <ProfileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onLoggedOut={() => {
          localStorage.removeItem("logged_in");
          setIsLoggedIn(false);
          setOpenDrawer(false);
        }}
      />
    </>
  );
}
