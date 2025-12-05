// app/activities/page.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivitiesHero from "@/components/ActivitiesHero";
import AllActivities from "@/components/AllActivities";

export default function ActivitiesPage() {
  return (
    <main className="bg-white text-black">
      {/* Header */}
      <Header />

     
      <ActivitiesHero />
      <AllActivities />

      {/* Footer */}
      <Footer />
    </main>
  );
}
