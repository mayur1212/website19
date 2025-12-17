"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function TermsPage() {
  const router = useRouter();

  const goHome = () => {
    sessionStorage.setItem("openProfileOnce", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* ⭐ HEADER */}
      <div
        className="
          w-full flex items-center justify-center
          px-4 py-4 bg-white
          border-b shadow-sm
          sticky top-0 z-[999]
          relative
        "
      >
        {/* ⭐ LOGO (LEFT) */}
        <Image
          src="/movies/logored.png"   // ✅ PUBLIC PATH
          alt="Hayya Logo"
          width={170}
          height={90}
          onClick={goHome}
          className="
            h-14 w-auto rounded-xl cursor-pointer
            absolute left-4 sm:left-6 md:left-10
          "
          priority
        />

        {/* ⭐ CENTER TITLE */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Terms & Conditions
        </h1>
      </div>

      {/* ⭐ MAIN CONTENT */}
      <div className="px-4 sm:px-6 lg:px-10 py-10 w-full flex-grow">
        <p className="text-sm text-zinc-500 mb-10">
          Last updated on January 01, 2025
        </p>

        <div className="space-y-10 leading-relaxed text-[16px] text-zinc-700">
          <section>
            <h2 className="font-semibold text-xl mb-2">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service (“Terms”) govern your use of the Hayya platform,
              including our website, mobile app, and all related services (“Platform”).
              By using our Platform, you agree to be legally bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">2. Eligibility</h2>
            <p>
              You must be at least 18 years of age to access or use the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">3. User Responsibilities</h2>
            <p>
              You agree to use the Platform only for lawful purposes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">4. Services Overview</h2>
            <p>
              Hayya provides an event discovery and booking platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">5. Bookings & Payments</h2>
            <p>
              All bookings are final and non-transferable.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">6. Refund Policy</h2>
            <p>
              Unless explicitly mentioned, all bookings are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">7. Intellectual Property</h2>
            <p>
              All platform content belongs to Hayya.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">8. Prohibited Activities</h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Fraudulent activity</li>
              <li>Platform misuse</li>
              <li>Unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">9. Modifications</h2>
            <p>
              Terms may change at any time.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-2">10. Contact</h2>
            <p>
              Contact us at <strong>support@hayya.com</strong>
            </p>
          </section>
        </div>

        <div className="h-16" />
      </div>

      {/* ⭐ FOOTER */}
      <Footer />
    </div>
  );
}
