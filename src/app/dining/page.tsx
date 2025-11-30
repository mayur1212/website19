import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiningHero from "@/components/DiscoverRestaurantsHero";
import IconicDistrictSpecials from "@/components/IconicDistrictSpecials";
import GreatDeals from "@/components/GreatDeals";

export default function DiningPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <DiningHero />
        <IconicDistrictSpecials />

       <GreatDeals />
      </main>

      <Footer />
    </div>
  );
}
