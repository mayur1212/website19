"use client";

import Image from "next/image";
import Link from "next/link";
import HayyaLogo from "@/assets/logored.png";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">

      {/* TOP HEADER */}
      <div className="w-full flex items-center justify-between px-4 py-4 border-b shadow-sm sticky top-0 bg-white z-50">
        <Link href="/" className="text-2xl text-zinc-700">←</Link>

        {/* HAYYA LOGO CENTERED */}
        <Image
  src={HayyaLogo}
  alt="Hayya Logo"
  className="h-15 w-auto mx-auto rounded-xl shadow-sm"
/>


        {/* Placeholder to keep logo centered */}
        <span className="w-6"></span>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="px-5 sm:px-10 py-6 max-w-4xl mx-auto w-full">

        <h1 className="text-2xl font-bold text-black mb-3">
          Terms & Conditions
        </h1>

        <p className="text-sm text-zinc-500 mb-6">
          Last updated on January 01, 2025
        </p>

        <div className="space-y-6 leading-relaxed text-[15px] text-zinc-700">

          <section>
            <h2 className="font-semibold text-lg mb-1">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our platform, you confirm that you have read, understood, 
              and agreed to these Terms. If you do not agree, you must discontinue use immediately.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our services. If under 18, usage is allowed 
              only under supervision of a legal guardian who agrees to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">3. User Responsibilities</h2>
            <p>
              You agree to use the platform only for lawful purposes. You are responsible for 
              maintaining confidentiality of your account and all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">4. Booking & Payments</h2>
            <p>
              All bookings are non-transferable and subject to availability. Pricing and offers 
              may change without notice. By booking, you authorize us to charge the applicable amount.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">5. Cancellation & Refunds</h2>
            <p>
              Unless stated otherwise, all bookings are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">6. Modifications</h2>
            <p>
              We may update these Terms at any time. Continued use of the platform signifies 
              acceptance of the updated Terms.
            </p>
          </section>

        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}
