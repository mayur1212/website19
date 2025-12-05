"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import EventHero from "@/components/EventHero";
import ExploreEvents from "@/components/ExploreEvents";
import ArtistsInYourDistrict from "@/components/ArtistsInYourDistrict";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import EventFilterModal from "@/components/EventFilterModal";

export default function EventsPage() {
  const [quickFilter, setQuickFilter] = useState<string | null>(null);
  const [modalFilters, setModalFilters] = useState<string[]>([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />

      <EventHero />
      <ExploreEvents />
      <div className="bg-red-50">
        <ArtistsInYourDistrict />
      </div>
      

      {/* EVENT CARD SECTION */}
      <EventCard
        quickFilter={quickFilter}
        modalFilters={modalFilters}
        onOpenModal={() => setOpenFilterModal(true)}
        onQuickSelect={(chip) =>
          setQuickFilter(chip === quickFilter ? null : chip)
        }
      />

      {/* FILTER MODAL */}
      <EventFilterModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        selectedFilters={modalFilters}
        onApply={(filters) => setModalFilters(filters)} // ★ FIXED
      />

      <Footer />
    </div>
  );
}
