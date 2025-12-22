"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full text-white ">

     
    
      
      <div className="md:hidden px-6 py-10 bg-black text-white">

    {/* LOGO */}
    <div className="flex justify-center">
      <Image
        src="/movies/logofooter2.png"
        alt="Hayya"
        width={160}
        height={80}
      />
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
      {["W", "F", "I", "X", "Y"].map((_, i) => (
        <button
          key={i}
          className="h-9 w-9 border border-gray-500 rounded-full flex items-center justify-center"
        >
          ●
        </button>
      ))}
    </div>
  </div>


      
      
{/* 💻💻 DESKTOP VERSION (md and above)                   */}
{/* ===================================================== */}
<div className="hidden md:block w-full bg-black">
  <div className="w-full px-12">

    {/* TOP ROW */}
    <div className="flex justify-between items-center py-8">

      {/* LEFT LOGO */}
      <div>
        <Image
          src="/movies/logofooter2.png"
          alt="Hayya"
          width={170}
          height={90}
          className="object-contain"
        />
      </div>

      {/* CENTER LINKS */}
      <div className="flex items-center gap-12 text-[16px] font-medium text-gray-300">
        <a href="#" className="hover:text-white transition">Terms & Conditions</a>
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Contact Us</a>
        <a href="#" className="hover:text-white transition">List your events</a>
      </div>

      {/* RIGHT QR */}
      <div className="flex flex-col items-center">
        <Image
          src="/movies/scan.jpg"
          alt="QR Code"
          width={120}
          height={120}
        />
        <p className="mt-3 text-sm text-gray-400">
          Scan to download the app
        </p>
      </div>
    </div>

    {/* DIVIDER */}
    <div className="w-full border-t border-gray-700" />

    {/* BOTTOM */}
    <div className="flex justify-between items-center mt-6 pb-8">

      <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
        By accessing this page, you confirm that you have read, understood, and agreed
        to our Terms of Service, Cookie Policy, Privacy Policy, and Content Guidelines.
        All rights reserved.
      </p>

      {/* SOCIAL ICONS */}
      <div className="flex items-center gap-4 text-gray-300">
        {["W","F","I","X","Y"].map((_, i) => (
          <button
            key={i}
            className="h-9 w-9 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition"
          >
            ●
          </button>
        ))}
      </div>

    </div>
  </div>
</div>


    </footer>
  );
}
