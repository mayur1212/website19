"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logored.png"; // ⭐ IMPORT YOUR LOGO HERE

export default function ProfileLoginModal({ open, onClose, onSuccess }: any) {
  const [number, setNumber] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* LOGIN POPUP */}
      <div className="relative z-[1000] w-[90%] max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* HEADER WITH GRADIENT + LOGO */}
        <div className="relative bg-gradient-to-br from-[#FD3F00] via-[#ff5100] to-[#dc3e0a] p-10 flex flex-col items-center justify-center">

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white text-xl"
          >
            ×
          </button>

          {/* ⭐ HAYYA LOGO ON TOP */}
          <Image
  src={Logo}
  alt="Hayya Logo"
  width={200}
  height={200}
  className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)] mix-blend-lighten"
 />

        </div>

        {/* MAIN CONTENT */}
        <div className="px-8 py-6 text-center">

          <h2 className="text-xl font-bold text-zinc-900">
            Enter your mobile number
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            If you don’t have an account yet, we’ll create one for you.
          </p>

          {/* INPUT BOX */}
          <div className="flex items-center gap-2 mt-5 border rounded-lg bg-zinc-50 px-3 py-3">

            {/* Country Code */}
            <div className="flex items-center gap-1 text-sm text-zinc-700">
              <span>🇮🇳</span>
              <span className="text-xs font-medium">+91</span>
            </div>

            <span className="w-px h-8 bg-zinc-300"></span>

            {/* INPUT */}
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter mobile number"
              className="w-full bg-transparent outline-none text-sm text-black placeholder:text-zinc-400"
              value={number}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setNumber(val);
              }}
            />
          </div>

          {/* CONTINUE BUTTON */}
          <button
            onClick={() => {
              if (number === "9152045667") {
                onClose();
                onSuccess();
              } else {
                alert("Invalid number. Use 9152045667");
              }
            }}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold text-sm hover:bg-zinc-900 transition"
          >
            Continue
          </button>

          {/* TERMS */}
          <p className="mt-4 text-xs text-zinc-500">
            By continuing, you agree to our{" "}
            <span className="underline">Terms of Service</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
