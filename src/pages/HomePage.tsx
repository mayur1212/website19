"use client";

import Header from "@/components/Header";

import TopHindiMovies from "@/components/TopHindiMovies";
import CrowdFavouriteActivities from "@/components/CrowdFavouriteActivities";

import HitsFromPreviousWeeks from "@/components/HitsFromPreviousWeeks";
import ArtistsInYourDistrict from "@/components/ArtistsInYourDistrict";
import IndiasTopEvents from "@/components/IndiasTopEvents";
import BestOfEnglishMovies from "@/components/BestOfEnglishMovies";
import BestInComedy from "@/components/BestInComedy";
import ExperienceIn4DX from "@/components/ExperienceIn4DX";
import BestOfNightlife from "@/components/BestOfNightlife";
import TimelessHits from "@/components/TimelessHits";
import BestMusicEvents from "@/components/BestMusicEvents";
import PremieringThisWeek from "@/components/PremieringThisWeek";
import HappeningThisWeek from "@/components/HappeningThisWeek";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />

      <TopHindiMovies />
      <CrowdFavouriteActivities />

      <HitsFromPreviousWeeks />

      <ArtistsInYourDistrict />

      <IndiasTopEvents />
      <BestOfEnglishMovies />
      <BestInComedy />
      <ExperienceIn4DX />
      <BestOfNightlife />
      <TimelessHits />
      <BestMusicEvents />
      <PremieringThisWeek />
      <HappeningThisWeek />

      <Footer />
    </div>
  );
}
