"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllSportsVenues from "@/components/AllSportsVenues";
import ExploreSports from "@/components/ExploreSports";

export default function PlayPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />

      
      <ExploreSports />  
      <AllSportsVenues />

      <Footer />
    </div>
  );
}
