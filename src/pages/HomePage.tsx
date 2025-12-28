"use client";

import Header from "@/components/Header";
import DistrictPassBanner from "@/components/DistrictPassBanner";

import TopHindiMovies from "@/components/TopHindiMovies";
import CrowdFavouriteActivities from "@/components/CrowdFavouriteActivities";

import HitsFromPreviousWeeks from "@/components/HitsFromPreviousWeeks";
import ArtistsInYourDistrict from "@/components/ArtistsInYourDistrict";
import IndiasTopEvents from "@/components/IndiasTopEvents";
import BestOfEnglishMovies from "@/components/BestOfEnglishMovies";
import BestInComedy from "@/components/BestInComedy";

import PremieringThisWeek from "@/components/PremieringThisWeek";
import HappeningThisWeek from "@/components/HappeningThisWeek";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <DistrictPassBanner />


      <TopHindiMovies />
      <CrowdFavouriteActivities />

      <HitsFromPreviousWeeks />

      <ArtistsInYourDistrict />

      <IndiasTopEvents />
      <BestOfEnglishMovies />
      <BestInComedy />
      
      <PremieringThisWeek />
      <HappeningThisWeek />

      <Footer />
    </div>
  );
}
