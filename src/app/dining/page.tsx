"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiningHero from "@/components/DiscoverRestaurantsHero";
import IconicDistrictSpecials from "@/components/IconicDistrictSpecials";
import GreatDeals from "@/components/GreatDeals";
import SearchPopup from "@/components/SearchPopup";

export default function DiningPage() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />

      {/* 👇 CLICK ANYWHERE IN MAIN TO OPEN SEARCH */}
      <main
        className="flex-1"
        onClick={() => setOpenSearch(true)}
      >
        <DiningHero />
        <IconicDistrictSpecials />
        <GreatDeals />
      </main>

      <Footer />

      {/* 🔍 SEARCH POPUP */}
      {openSearch && (
        <SearchPopup
          onClose={() => setOpenSearch(false)}
          activeTab="Dining"
        />
      )}
    </div>
  );
}
