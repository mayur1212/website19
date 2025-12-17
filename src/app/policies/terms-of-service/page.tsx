"use client";

import SlimHeader from "@/components/SlimHeader";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">

      {/* ✅ SLIM HEADER (IDENTICAL DIMENSIONS TO MAIN HEADER) */}
      <SlimHeader
        title="Terms & Conditions"
        subtitle="Please read carefully before using Hayya"
      />

      {/* ⭐ MAIN CONTENT */}
      <div className="px-4 sm:px-6 lg:px-10 py-10 w-full flex-grow">

        <p className="text-sm text-zinc-500 mb-10">
          Last updated on January 01, 2025
        </p>

        <div className="space-y-10 leading-relaxed text-[16px] text-zinc-700">

          {/* 1. ACCEPTANCE */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              These Terms of Service (“Terms”) govern your use of the Hayya platform,
              including our website, mobile app, and all related services (“Platform”).
              By using our Platform, you agree to be legally bound by these Terms. If you
              do not agree, you must stop using the Platform immediately.
            </p>
          </section>

          {/* 2. ELIGIBILITY */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years of age to access or use the Platform. By
              creating an account, you confirm that all the information you provide is
              accurate and that you meet these eligibility requirements.
            </p>
          </section>

          {/* 3. USER RESPONSIBILITIES */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              3. User Responsibilities
            </h2>
            <p>
              You agree to use the Platform only for lawful purposes. You must not misuse
              the Platform, attempt to hack systems, create multiple fraudulent accounts,
              or violate the rights of Hayya or other users.
            </p>
          </section>

          {/* 4. SERVICES OVERVIEW */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              4. Services Overview
            </h2>
            <p>
              Hayya provides an event discovery, bookings, and engagement platform.
              We act solely as an aggregator. All event details, pricing, and availability
              are controlled by third-party event partners, not Hayya.
            </p>
          </section>

          {/* 5. BOOKINGS & PAYMENTS */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              5. Bookings & Payments
            </h2>
            <p>
              All bookings made on the Platform are final and non-transferable. Prices may
              vary depending on availability, venue rules, and partner policies. Payments
              are processed securely through certified payment gateways.
            </p>
          </section>

          {/* 6. REFUND POLICY */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              6. Refund Policy
            </h2>
            <p>
              Unless explicitly mentioned, all bookings are non-refundable. Refunds, if
              applicable, will follow the policies of the event organizers or partners.
              Hayya does not guarantee refunds on behalf of third-party sellers.
            </p>
          </section>

          {/* 7. INTELLECTUAL PROPERTY */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              7. Intellectual Property
            </h2>
            <p>
              All logos, trademarks, graphics, text, and software on the Platform belong to
              Hayya or its licensors. Users may not copy, distribute, modify, or reverse–
              engineer any part of the Platform without written permission.
            </p>
          </section>

          {/* 8. PROHIBITED ACTIVITIES */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              8. Prohibited Activities
            </h2>
            <ul className="list-disc ml-5 space-y-2">
              <li>Using fake identities or fraudulent details</li>
              <li>Attempting to hack or disrupt the Platform</li>
              <li>Posting harmful or misleading content</li>
              <li>Interfering with event listings or partner services</li>
            </ul>
          </section>

          {/* 9. MODIFICATIONS */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              9. Modifications to Terms
            </h2>
            <p>
              Hayya may update these Terms at any time. Continued use of the Platform after
              updates means you accept the modified Terms. You are encouraged to review the
              Terms regularly.
            </p>
          </section>

          {/* 10. CONTACT */}
          <section>
            <h2 className="font-semibold text-xl mb-2">
              10. Contact Us
            </h2>
            <p>
              For questions or concerns about these Terms, please contact us at:
              <br />
              <strong>support@hayya.com</strong>
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
