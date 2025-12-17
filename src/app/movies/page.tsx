import Header from "@/components/Header";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import RegionStories from "@/components/RegionStories";
import OnlyInTheatres from "@/components/OnlyInTheatres";
import InfoAccordion from "@/components/InfoAccordion";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-white text-black">
      {/* Header – FULL WIDTH */}
      <Header />

      {/* Banner – FULL WIDTH */}
      <FeaturedCarousel />

      {/* 85% CONTENT WRAPPER */}
      <div className="w-[85%] mx-auto">
        <RegionStories />
        <OnlyInTheatres />
      </div>

      {/* Accordion – 85% but with gray background */}
      <InfoAccordion />

      {/* Footer – FULL WIDTH */}
      <Footer />
    </main>
  );
}

