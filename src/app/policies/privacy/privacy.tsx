"use client";

import SlimHeader from "@/components/SlimHeader";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">

      {/* ✅ SLIM HEADER (SAME DIMENSIONS AS MAIN HEADER) */}
      <SlimHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your data"
      />

      {/* ⭐ MAIN CONTENT */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 flex-grow">

        <p className="text-[15px] text-zinc-500 mb-10">
          Last updated on January 01, 2025
        </p>

        <div className="space-y-10 leading-relaxed text-[16px] text-zinc-700">

          {/* 1. INTRODUCTION */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Introduction
            </h2>
            <p>
              Your privacy is extremely important to us. This Privacy Policy explains how
              Hayya collects, uses, stores, and protects your personal information when you
              use our website, mobile app, and services (collectively referred to as the
              “Platform”).
            </p>
          </section>

          {/* 2. INFORMATION WE COLLECT */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information to provide better services and ensure a secure,
              personalized experience.
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email, phone number, gender,
                date of birth.
              </li>
              <li>
                <strong>Booking Details:</strong> Event selections, payments, preferences.
              </li>
              <li>
                <strong>Usage Data:</strong> Logs, interactions, device information, crash
                reports.
              </li>
              <li>
                <strong>Location Data:</strong> If you grant permission, we may access your
                live or approximate location.
              </li>
              <li>
                <strong>Cookies & Tracking:</strong> To improve UI, personalization, and
                security.
              </li>
            </ul>
          </section>

          {/* 3. HOW WE USE INFORMATION */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>To create and manage your account.</li>
              <li>To process bookings and payments.</li>
              <li>To personalize your event recommendations.</li>
              <li>To send alerts, confirmations, and updates.</li>
              <li>To improve platform stability and user experience.</li>
              <li>To detect fraud, prevent misuse, and maintain security.</li>
            </ul>
          </section>

          {/* 4. SHARING POLICY */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Sharing of Information
            </h2>
            <p>
              Your information is <strong>never sold</strong> to third parties.
              We only share data with:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li>
                <strong>Event Partners:</strong> For confirming bookings.
              </li>
              <li>
                <strong>Payment Gateways:</strong> To process secure payments.
              </li>
              <li>
                <strong>Legal Authorities:</strong> Only if required by law.
              </li>
            </ul>

            <p className="mt-3">
              All partners are required to follow strict confidentiality and security
              standards.
            </p>
          </section>

          {/* 5. DATA SECURITY */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Data Protection & Security
            </h2>
            <p>
              We use industry-standard encryption, secure servers, and access controls to
              protect your data. While we follow best practices, no online system is 100%
              secure.
            </p>
          </section>

          {/* 6. YOUR RIGHTS */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Your Rights
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Right to access your data.</li>
              <li>Right to request corrections.</li>
              <li>Right to request deletion (where applicable).</li>
              <li>Right to withdraw consent for location/cookies.</li>
            </ul>
          </section>

          {/* 7. POLICY UPDATES */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Changes to This Policy
            </h2>
            <p>
              We may revise this Privacy Policy periodically. Continued use of the Platform
              indicates acceptance of the updated policy.
            </p>
          </section>

          {/* 8. CONTACT */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-2">
              8. Contact Us
            </h2>
            <p>
              For privacy-related queries, reach us at:
              <br />
              <strong>support@hayya.com</strong>
            </p>
          </section>
        </div>
      </div>

      {/* ⭐ FOOTER */}
      <Footer />
    </div>
  );
}
