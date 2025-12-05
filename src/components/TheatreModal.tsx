"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type TheatreModalProps = {
  open: boolean;
  onClose: () => void;
  theatre: {
    name: string;
    meta: string;
    logoText: string;
    logo?: string;        // ⭐ ADDED – uses theatre logo image
  } | null;
};

export default function TheatreModal({
  open,
  onClose,
  theatre,
}: TheatreModalProps) {
  if (!open || !theatre) return null;

  // Create slug from theatre name
  const slug = theatre.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {/* MODAL BOX */}
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-zinc-600 hover:text-black transition"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-5">
          {/* Logo Box */}
          <div className="h-16 w-16 flex items-center justify-center rounded-full border bg-white shadow-sm overflow-hidden">
            {theatre.logo ? (
              <Image
                src={theatre.logo}
                alt={theatre.name}
                width={60}
                height={60}
                className="object-contain"
              />
            ) : (
              <span className="font-extrabold text-lg uppercase">
                {theatre.logoText}
              </span>
            )}
          </div>

          {/* Name + Meta */}
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              {theatre.name}
            </h2>
            <p className="text-sm text-zinc-600">{theatre.meta}</p>
          </div>
        </div>

        {/* ADDRESS */}
        <p className="mt-4 text-sm text-zinc-700 leading-relaxed">
          No.127, Andheri - Kurla Rd, Opp Acme Plaza, Dr. Charatsingh Colony,
          Andheri East, Mumbai 400059
        </p>

        {/* AMENITIES GRID */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
          <Amenity icon="🚗" label="Parking" />
          <Amenity icon="🎟️" label="Mobile Ticket" />
          <Amenity icon="🍿" label="Food & Beverages" />
          <Amenity icon="💺" label="Recliners" />
          <Amenity icon="💳" label="Digital Payments" />
          <Amenity icon="♿" label="Wheelchair Friendly" />
        </div>

        {/* CTA BUTTON */}
        <Link
          href={`/theatre/${slug}`}
          onClick={onClose}
          className="mt-6 block w-full rounded-xl bg-zinc-900 py-3 text-center text-white font-medium hover:bg-zinc-800 transition"
        >
          View all movies playing here
        </Link>
      </div>
    </div>
  );
}

/* SMALL COMPONENT FOR AMENITIES */
function Amenity({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-zinc-700">
      <span className="text-lg">{icon}</span>
      {label}
    </div>
  );
}
