"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-12 pb-6">

      {/* ===================================================== */}
      {/* 📱📱 MOBILE + TABLET VERSION (below md)                */}
      {/* ===================================================== */}
      <div className="md:hidden px-6">
        {/* LOGO */}
        <div className="flex justify-center">
          <Image src="/movies/logored.png" alt="Hayya" width={160} height={80} />
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-4 mt-6 text-center text-[15px]">
          <a href="#" className="hover:text-gray-300 transition">Terms &amp; Conditions</a>
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Contact Us</a>
          <a href="#" className="hover:text-gray-300 transition">List your events</a>
        </div>

        {/* DOWNLOAD SECTION */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-300">Download the app</p>

          <div className="flex gap-4">
            <Image
              src="/movies/appstore.jpg"
              alt="App Store"
              width={140}
              height={45}
            />
            <Image
              src="/movies/google stor.jpg"
              alt="Play Store"
              width={140}
              height={45}
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full border-t border-gray-700 mt-10" />

        {/* INFO TEXT */}
        <p className="text-xs text-gray-400 mt-5 text-center">
          By accessing this page, you confirm that you have read, understood,
          and agreed to our Terms of Service, Cookie Policy, Privacy Policy,
          and Content Guidelines. All rights reserved.
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex justify-center mt-6 gap-5 text-gray-300">
          {/* WhatsApp */}
          <button className="h-9 w-9 border border-gray-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 2a9 ..." />
            </svg>
          </button>

          {/* Facebook */}
          <button className="h-9 w-9 border border-gray-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M13 3h4 ..." />
            </svg>
          </button>

          {/* Instagram */}
          <button className="h-9 w-9 border border-gray-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth="1.6">
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
          </button>

          {/* X */}
          <button className="h-9 w-9 border border-gray-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M17.5 3 ..." />
            </svg>
          </button>

          {/* YouTube */}
          <button className="h-9 w-9 border border-gray-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M21.6 7.2 ..." />
            </svg>
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* 💻💻 DESKTOP VERSION (md and above)                   */}
      {/* ===================================================== */}
      {/* ===================================================== */}
{/* 💻💻 DESKTOP VERSION (md and above)                   */}
{/* ===================================================== */}
<div className="hidden md:block">
  <div className="max-w-7xl mx-auto px-8">

    {/* TOP ROW */}
    <div className="flex justify-between items-center py-8">

      {/* LEFT LOGO */}
      <div>
        <Image
          src="/movies/hayyalogo.png"
          alt="Hayya"
          width={170}
          height={90}
          className="object-contain"
        />
      </div>

      {/* CENTER LINKS */}
      <div className="flex items-center gap-12 text-[16px] font-medium">
        <a href="#" className="hover:text-gray-300 transition">Terms &amp; Conditions</a>
        <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
        <a href="#" className="hover:text-gray-300 transition">Contact Us</a>
        <a href="#" className="hover:text-gray-300 transition">List your events</a>
      </div>

      {/* RIGHT QR CODE */}
      <div className="flex flex-col items-center">
        <Image
          src="/movies/scan.jpg"
          alt="QR Code"
          width={120}
          height={120}
          className="rounded-md"
        />
        <p className="mt-3 text-sm text-gray-300">
          Scan to download the app
        </p>
      </div>
    </div>

    {/* DIVIDER */}
    <div className="w-full border-t border-gray-700" />

    {/* BOTTOM SECTION */}
    <div className="flex justify-between items-center mt-6">

      {/* LEFT TEXT */}
      <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
        By accessing this page, you confirm that you have read, understood, and agreed
        to our Terms of Service, Cookie Policy, Privacy Policy, and Content Guidelines.
        All rights reserved.
      </p>

      {/* SOCIAL ICONS */}
      <div className="flex items-center gap-4 text-gray-300">

        {/* WhatsApp */}
        <button className="h-9 w-9 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2a9 ..." />
          </svg>
        </button>

        {/* Facebook */}
        <button className="h-9 w-9 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M13 3h4 ..." />
          </svg>
        </button>

        {/* Instagram */}
        <button className="h-9 w-9 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth="1.5">
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
        </button>

        {/* X (Twitter) */}
        <button className="h-9 w-9 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M17.5 3 ..." />
          </svg>
        </button>

        {/* YouTube */}
        <button className="h-9 w-9 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M21.6 7.2 ..." />
          </svg>
        </button>

      </div>
    </div>
  </div>
</div>

    </footer>
  );
}
