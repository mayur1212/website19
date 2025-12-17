"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Privacy() {
  const router = useRouter();

  const goHome = () => {
    sessionStorage.setItem("openProfileOnce", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* ⭐ FIXED HEADER */}
      <div
        className="
          w-full flex items-center justify-center
          px-4 py-4 bg-white
          border-b shadow-sm
          sticky top-0 z-[999]
          relative
        "
      >
        {/* ⭐ LOGO LEFT */}
        <Image
          src="/movies/logored.png"   // ✅ PUBLIC PATH
          alt="Hayya Logo"
          width={170}
          height={90}
          onClick={goHome}
          className="
            h-14 w-auto rounded-xl cursor-pointer
            absolute left-4 sm:left-6 md:left-10
          "
          priority
        />

        {/* ⭐ TITLE CENTER */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Privacy Policy
        </h1>
      </div>

      {/* ⭐ CONTENT */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 flex-grow">
        <p className="text-[15px] text-zinc-500 mb-10">
          Last updated on January 01, 2025
        </p>

        <div className="space-y-10 leading-relaxed text-[16px] text-zinc-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Your privacy is extremely important to us. This Privacy Policy explains how
              Hayya collects, uses, stores, and protects your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Personal information</li>
              <li>Booking details</li>
              <li>Usage data</li>
              <li>Location data (if permitted)</li>
              <li>Cookies & tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. How We Use Information</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Account management</li>
              <li>Bookings & payments</li>
              <li>Notifications</li>
              <li>Security & fraud prevention</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Contact</h2>
            <p>
              Email us at <strong>support@hayya.com</strong>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
