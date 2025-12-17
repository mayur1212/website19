"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "@/assets/logored.png";
import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";

export default function PaymentOffersPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("logged_in") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ================= NAVBAR ================= */}
      <header className="w-full border-b bg-white px-6 py-3 flex items-center justify-between">
        <Image
          src={Logo}
          alt="Hayya"
          width={110}
          height={36}
          className="cursor-pointer rounded-2xl"
          onClick={() => (window.location.href = "/")}
        />

        <h2 className="text-sm font-semibold">All Payment Offers</h2>

        <button
          onClick={() =>
            isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
          }
          className="h-9 w-9 rounded-full bg-black text-white text-sm font-semibold"
        >
          U
        </button>
      </header>

      {/* ================= TIMER STRIP ================= */}
      <div className="bg-purple-50 text-purple-700 text-sm py-2 text-center">
        ⏱ Complete your booking in <span className="font-semibold">06:27</span> mins
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <Image
          src="/offers/empty-offer.png"
          alt="No offers"
          width={120}
          height={120}
        />

        <h3 className="mt-6 text-lg font-semibold">
          No payment offers available
        </h3>

        <p className="text-sm text-gray-500 mt-1 text-center max-w-xs">
          We’re adding new bank & wallet offers soon.
        </p>
      </div>

      {/* ================= AUTH MODALS ================= */}
      <ProfileLoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />

      <ProfileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onLoggedOut={() => setIsLoggedIn(false)}
      />
    </div>
  );
}
