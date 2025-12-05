import Header from "@/components/Header";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import RegionStories from "@/components/RegionStories";
import OnlyInTheatres from "@/components/OnlyInTheatres";
import InfoAccordion from "@/components/InfoAccordion";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-white text-black">

      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <div className="max-w-[1350px] mx-auto px-1 md:px-6">

        {/* Hero / Banner Carousel */}
        <div className="mt-6">
          <FeaturedCarousel />
        </div>

        {/* Stories Across Regions Section */}
        <div className="mt-12">
          <RegionStories />
        </div>

        {/* Only in Theatres */}
        <OnlyInTheatres />

      </div>

      {/* ⭐ FULL WIDTH ACCORDION SECTION */}
      <div className="mt-12 w-full">
        <InfoAccordion />
      </div>

      {/* Footer */}
      <Footer />

    </main>
  );
}
