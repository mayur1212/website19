"use client";

import React from "react";
import { X } from "lucide-react";

export default function EventGuideModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
      
      <div className="bg-white w-[500px] md:w-[620px] rounded-3xl shadow-xl p-8 relative animate-fadeUp mb-16">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100"
        >
          <X className="w-5 h-5 text-zinc-700" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Event Guide
        </h2>

        {/* Guide Items */}
        <div className="space-y-6">
          
          {/* Language */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
              🌐
            </div>
            <div>
              <p className="text-xs text-zinc-500">Language</p>
              <p className="text-base font-medium text-zinc-900">English</p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
              ⏱️
            </div>
            <div>
              <p className="text-xs text-zinc-500">Duration</p>
              <p className="text-base font-medium text-zinc-900">6 Hours</p>
            </div>
          </div>

          {/* Tickets */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
              🎫
            </div>
            <div>
              <p className="text-xs text-zinc-500">Tickets Needed For</p>
              <p className="text-base font-medium text-zinc-900">16 yrs & above</p>
            </div>
          </div>

          {/* Entry Allowed */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
              ℹ️
            </div>
            <div>
              <p className="text-xs text-zinc-500">Entry Allowed For</p>
              <p className="text-base font-medium text-zinc-900">16 yrs & above</p>
            </div>
          </div>

          {/* Layout */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
              🏟️
            </div>
            <div>
              <p className="text-xs text-zinc-500">Layout</p>
              <p className="text-base font-medium text-zinc-900">Indoor</p>
            </div>
          </div>

          {/* Seating */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
              💺
            </div>
            <div>
              <p className="text-xs text-zinc-500">Seating Arrangement</p>
              <p className="text-base font-medium text-zinc-900">Seated & Standing</p>
            </div>
          </div>

          {/* Kid Friendly */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
              👶
            </div>
            <div>
              <p className="text-xs text-zinc-500">Kid Friendly?</p>
              <p className="text-base font-medium text-zinc-900">No</p>
            </div>
          </div>

          {/* Pet Friendly */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
              🐶
            </div>
            <div>
              <p className="text-xs text-zinc-500">Pet Friendly?</p>
              <p className="text-base font-medium text-zinc-900">No</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeUp {
          animation: fadeUp 0.25s ease-out;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
