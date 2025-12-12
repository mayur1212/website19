"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logored.png";

const COUNTRIES = [
  { name: "UAE (Dubai)", code: "+971", flag: "🇦🇪", maxLength: 9 },
  { name: "Qatar", code: "+974", flag: "🇶🇦", maxLength: 8 },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", maxLength: 9 },
  { name: "Bahrain", code: "+973", flag: "🇧🇭", maxLength: 8 },
];

export default function ProfileLoginModal({ open, onClose, onSuccess }: any) {
  const [number, setNumber] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(COUNTRIES[0]);

  if (!open) return null;

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    const full = `${selected.code} ${number}`;
    localStorage.setItem("hayya_user_number", full);
    localStorage.setItem("logged_in", "true");

    setTimeout(() => {
      onSuccess?.();
      onClose?.();
    }, 50);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* WHOLE MODAL WRAPPER */}
      <div className="
        relative z-[1000] w-[90%] max-w-md 
        bg-white rounded-3xl shadow-2xl 
        overflow-visible
      ">
        
        {/* Combined Header (Rounded Top) */}
        <div className="
          w-full h-[180px]
          bg-gradient-to-br from-[#FD3F00] via-[#ff5100] to-[#dc3e0a]
          rounded-t-3xl 
          flex items-center justify-center relative
        ">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white text-xl"
          >
            ×
          </button>

          <Image
            src={Logo}
            width={200}
            height={200}
            alt="Hayya"
            className="mix-blend-lighten drop-shadow-xl"
          />
        </div>

        {/* CONTENT */}
        <div className="px-8 pt-6 pb-8 text-center">

          <h2 className="text-xl font-bold text-zinc-900">
            Enter your mobile number
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            If you don’t have an account yet, we’ll create one for you.
          </p>

          {/* INPUT BLOCK (District-style spacing) */}
          <div className="mt-6 relative">

            {/* Full Input Field */}
            <div className="
              w-full flex items-center gap-2
              border rounded-lg px-4 py-3 bg-zinc-50
            ">
              
              {/* COUNTRY SELECT (Dropdown attaches here) */}
              <div className="relative">
                <div
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="flex items-center gap-2 cursor-pointer text-black text-sm"
                >
                  <span>{selected.flag}</span>
                  <span>{selected.code}</span>
                  <span className="text-xs">▼</span>
                </div>

                {/* DROPDOWN EXACT DISTRICT STYLE */}
                {countryOpen && (
                  <div className="
                    absolute left-0 mt-2 w-[230px]
                    bg-white rounded-xl border shadow-xl
                    max-h-72 overflow-y-auto
                    z-[999999]
                  ">
                    

                    {/* COUNTRY OPTIONS */}
                    {filtered.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setSelected(c);
                          setNumber("");
                          setCountryOpen(false);
                        }}
                        className="
                          flex justify-between items-center
                          px-4 py-3 hover:bg-zinc-100 cursor-pointer text-black
                        "
                      >
                        <div className="flex items-center gap-3">
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </div>
                        <span>{c.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <span className="w-px h-6 bg-zinc-300"></span>

              {/* INPUT */}
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Enter mobile number"
                className="w-full bg-transparent outline-none text-sm text-black"
                value={number}
                onChange={(e) =>
                  setNumber(e.target.value.replace(/\D/g, "").slice(0, selected.maxLength))
                }
              />
            </div>
          </div>

          {/* CONTINUE BUTTON */}
          <button
            onClick={handleContinue}
            className="w-full mt-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-zinc-900"
          >
            Continue
          </button>

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
