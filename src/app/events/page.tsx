import React from "react";
import Header from "@/components/Header";
import EventHero from "@/components/EventHero";
import ExploreEvents from "@/components/ExploreEvents";
import ArtistsInYourDistrict from "@/components/ArtistsInYourDistrict";

import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";

export default function EventsPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />

      <EventHero />
      <ExploreEvents />
      <ArtistsInYourDistrict />
      <EventCard />
      


      <Footer />
    </div>
  );
}
