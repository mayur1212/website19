"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex justify-between items-start flex-wrap gap-10">
          {/* Logo */}
          <div>
            <Image
              src="/assets/logored.png" // change if your path is different
              alt="District by Zomato"
              width={160}
              height={80}
            />
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 text-[15px]">
            <a href="#" className="hover:text-gray-300 transition">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col gap-4 text-[15px]">
            <a href="#" className="hover:text-gray-300 transition">
              Contact Us
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              List your events
            </a>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <Image
              src="/assets/qr.png" // put your QR image here
              alt="QR Code"
              width={130}
              height={130}
              className="rounded-md"
            />
            <p className="mt-3 text-sm text-gray-300">
              Scan to download the app
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-700 mt-10" />

        {/* Bottom Section */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-3xl text-xs text-gray-400">
            By accessing this page, you confirm that you have read, understood,
            and agreed to our Terms of Service, Cookie Policy, Privacy Policy,
            and Content Guidelines. All rights reserved.
          </p>

          {/* Social icons (simple SVGs) */}
          <div className="flex items-center gap-5 text-gray-300">
            {/* WhatsApp */}
            <button className="h-8 w-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M12 2a9 9 0 0 0-7.74 13.5L3 22l6.7-1.76A9 9 0 1 0 12 2zm0 2a7 7 0 1 1-3.38 13.16l-.23-.12-3.1.82.83-3.02-.15-.25A7 7 0 0 1 12 4zm3.6 8.27c-.2-.1-1.18-.58-1.36-.65-.18-.06-.31-.1-.44.1-.13.19-.5.64-.62.78-.11.12-.23.14-.43.05-.2-.1-.86-.32-1.63-1.02-.6-.53-1-1.18-1.12-1.38-.12-.2-.01-.31.08-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.04-.25-.02-.35-.06-.1-.53-1.27-.72-1.75-.19-.46-.38-.4-.53-.41l-.46-.01c-.16 0-.4.06-.61.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.94 2.35.12.16 1.6 2.45 3.88 3.44 1.32.57 1.84.62 2.5.52.4-.06 1.18-.48 1.35-.94.17-.46.17-.86.12-.94-.05-.08-.18-.13-.38-.23z" />
              </svg>
            </button>

            {/* Facebook */}
            <button className="h-8 w-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M13 3h4a1 1 0 0 1 1 1v3h-3a1 1 0 0 0-1 1v3h4l-1 4h-3v6h-4v-6H8v-4h3V8a5 5 0 0 1 5-5z" />
              </svg>
            </button>

            {/* Instagram */}
            <button className="h-8 w-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17" cy="7" r="0.8" fill="currentColor" />
              </svg>
            </button>

            {/* X / Twitter */}
            <button className="h-8 w-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M17.5 3H20l-5 6.1L20.5 21H16l-3.5-6L8 21H4.5L10 14.4 3.8 3H8l3.2 5.7L17.5 3z" />
              </svg>
            </button>

            {/* YouTube */}
            <button className="h-8 w-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M21.6 7.2a2.4 2.4 0 0 0-1.7-1.7C18.1 5 12 5 12 5s-6.1 0-7.9.5a2.4 2.4 0 0 0-1.7 1.7C2 9 2 12 2 12s0 3 .4 4.8c.2.8.9 1.5 1.7 1.7C5.9 19 12 19 12 19s6.1 0 7.9-.5c.8-.2 1.5-.9 1.7-1.7.4-1.8.4-4.8.4-4.8s0-3-.4-4.8zM10 15.3V8.7L15 12l-5 3.3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
