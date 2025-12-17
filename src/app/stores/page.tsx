"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DistrictCategorySection from "@/components/DistrictCategorySection"; // Import the component

export default function StoresPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />

      {/* Add the DistrictCategorySection here */}
      <DistrictCategorySection />

      <Footer />
    </div>
  );
}
