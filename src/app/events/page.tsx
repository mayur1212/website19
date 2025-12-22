"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import EventHero from "@/components/EventHero";
import ExploreEvents from "@/components/ExploreEvents";
import ArtistsInYourDistrict from "@/components/ArtistsInYourDistrict";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";

export default function EventsPage() {
  const [quickFilter, setQuickFilter] = useState<string | null>(null);
  const [modalFilters, setModalFilters] = useState<string[]>([]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />
      <EventHero />
      <ExploreEvents />

      <div className="bg-red-50">
        <ArtistsInYourDistrict />
      </div>

      <EventCard
  quickFilter={quickFilter}
  modalFilters={modalFilters}
  onQuickSelect={setQuickFilter}
  onModalApply={(filters) => {
    setModalFilters(filters);

    // Promote SORT filter to front
    const sort = filters.find((f) =>
      ["Date", "Popularity", "Price Low to High", "Price High to Low", "Near to Far"].includes(f)
    );

    if (sort) {
      setQuickFilter(sort);
    }
  }}
/>


      <Footer />
    </div>
  );
}
