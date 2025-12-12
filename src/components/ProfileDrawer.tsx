"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

/* ---------------------------------------
   LOGOUT CONFIRM MODAL
--------------------------------------- */
function LogoutModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative z-[2001] bg-white w-[90%] max-w-sm rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold text-zinc-800 text-center">
          Are you sure you want to logout?
        </h2>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-sm font-medium text-black"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------
   PROFILE DRAWER
--------------------------------------- */
export default function ProfileDrawer({
  open,
  onClose,
  onLoggedOut,
}: {
  open: boolean;
  onClose: () => void;
  onLoggedOut: () => void;
}) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userNumber, setUserNumber] = useState<string>("");

  // 🔥 Load phone number from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("hayya_user_number");
    if (saved) setUserNumber(saved);
  }, []);

  if (!open) return null;

  const handleLogout = () => {
    localStorage.removeItem("hayya_user_number");
    localStorage.removeItem("logged_in");
    sessionStorage.clear();

    setLogoutOpen(false);
    onClose();
    onLoggedOut();
  };

  return (
    <div className="fixed inset-0 z-[999] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-[1000] w-full max-w-sm h-full bg-[#f3f3f3] shadow-2xl overflow-y-auto animate-slideLeft">

        {/* Top bar */}
        <div className="flex items-center gap-4 px-6 py-4 bg-white border-b">
          <button onClick={onClose} className="text-2xl font-light text-zinc-700">
            ←
          </button>
          <h2 className="text-lg font-semibold text-zinc-800">Profile</h2>
        </div>

        {/* User info */}
        <div className="p-4">
          <div className="rounded-xl bg-white p-4 shadow-sm flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-purple-200 flex items-center justify-center text-2xl font-bold text-purple-700">
              U
            </div>

            <div>
              <p className="text-base font-semibold text-zinc-900">User</p>
              <p className="text-sm text-zinc-500">
                {userNumber || "Not logged in"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu options */}
        <div className="px-4 flex flex-col gap-3">

          <div className="rounded-xl bg-white p-4 shadow-sm hover:bg-zinc-50 cursor-pointer">
            <Link href="/bookings" className="flex justify-between items-center w-full">
              <span className="text-zinc-800 font-medium">View all bookings</span>
              <span className="text-xl text-zinc-500">›</span>
            </Link>
          </div>

          <p className="text-xs text-zinc-500 mt-2 ml-1">Support</p>

          <div className="rounded-xl bg-white p-4 shadow-sm hover:bg-zinc-50 cursor-pointer">
            <Link href="/contact" className="flex justify-between w-full">
              <span className="text-zinc-800 font-medium">Contact Us</span>
              <span className="text-xl text-zinc-500">›</span>
            </Link>
          </div>

          <p className="text-xs text-zinc-500 mt-2 ml-1">More</p>

          <div className="rounded-xl bg-white p-4 shadow-sm hover:bg-zinc-50 cursor-pointer">
            <Link href="/policies/terms-of-service" className="flex justify-between items-center w-full">
              <span className="text-zinc-800 font-medium">Terms & Conditions</span>
              <span className="text-xl text-zinc-500">›</span>
            </Link>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm hover:bg-zinc-50 cursor-pointer">
            <Link href="/policies/privacy" className="flex justify-between items-center w-full">
              <span className="text-zinc-800 font-medium">Policies & Privacy</span>
              <span className="text-xl text-zinc-500">›</span>
            </Link>
          </div>

          {/* Logout */}
          <div
            onClick={() => setLogoutOpen(true)}
            className="rounded-xl bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer hover:bg-zinc-50"
          >
            <span className="text-red-600 font-medium">Logout</span>
            <span className="text-xl text-zinc-500">›</span>
          </div>

          <div className="h-6" />
        </div>
      </div>

      {/* Logout modal */}
      <LogoutModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
