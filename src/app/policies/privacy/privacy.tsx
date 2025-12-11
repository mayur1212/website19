"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HayyaLogo from "@/assets/logored.png";

const Privacy = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">

      {/* LOGO — Centered, Big, Rounded */}
      <div className="flex justify-center pt-6">
        <Image
          src={HayyaLogo}
          alt="Hayya Logo"
          className="h-16 w-auto rounded-2xl shadow-sm"
        />
      </div>

      {/* TITLE BAR BELOW LOGO */}
      <div className="w-full flex items-center justify-between px-4 mt-4">
        <button
          onClick={() => router.back()}
          className="text-2xl text-zinc-700"
        >
          ←
        </button>

        <h1 className="text-[26px] font-bold text-center flex-1 -ml-6">
          Privacy Policy
        </h1>

        {/* placeholder to keep title centered */}
        <span className="w-6"></span>
      </div>

      {/* DIVIDER */}
      <div className="border-b mt-3"></div>

      {/* CONTENT AREA */}
      <div className="w-full px-6 md:px-12 py-8 max-w-4xl mx-auto">

        <p className="text-[15px] text-zinc-500 mb-8">
          Last updated on January 01, 2025
        </p>

        {/* SECTION BLOCK */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700">
            We value your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, store, and safeguard your
            information when you access or use our services, including our website,
            mobile app, and related platforms (“Services”).
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700">
            We may collect the following types of information:
          </p>

          <ul className="list-disc pl-6 text-[16px] text-zinc-700 leading-relaxed mt-2">
            <li><strong>Personal information:</strong> name, mobile number, email, profile details.</li>
            <li><strong>Booking information:</strong> dining, event, movie, or activity details.</li>
            <li><strong>Device & usage data:</strong> IP address, browser info, system logs.</li>
            <li><strong>Location data:</strong> only with permission, used for nearby suggestions.</li>
            <li><strong>Cookies & tracking:</strong> to personalize experience and improve performance.</li>
          </ul>
        </section>

        {/* How We Use Your Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700">
            Your information may be used for:
          </p>

          <ul className="list-disc pl-6 text-[16px] text-zinc-700 leading-relaxed mt-2">
            <li>Creating and managing your account.</li>
            <li>Processing bookings, payments, and confirmations.</li>
            <li>Sending notifications, updates, and recommendations.</li>
            <li>Improving app experience and personalization.</li>
            <li>Customer support and issue resolution.</li>
            <li>Security and fraud detection.</li>
          </ul>
        </section>

        {/* Sharing Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Sharing of Information</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700 mb-3">
            We do not sell your personal data. We may share information only with:
          </p>

          <ul className="list-disc pl-6 text-[16px] text-zinc-700 leading-relaxed">
            <li>Restaurant, movie, and event partners.</li>
            <li>Payment processors.</li>
            <li>Analytics & performance tools.</li>
            <li>Government authorities when legally required.</li>
          </ul>
        </section>

        {/* Security */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Data Security</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700">
            We use industry-standard security measures to protect your information.
            However, no method is 100% secure — please keep your account details confidential.
          </p>
        </section>

        {/* Rights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700 mb-2">
            Depending on local laws, you may request to:
          </p>

          <ul className="list-disc pl-6 text-[16px] text-zinc-700 leading-relaxed">
            <li>Access the information we store.</li>
            <li>Update or correct your personal details.</li>
            <li>Delete your data or account.</li>
            <li>Withdraw permission for optional features.</li>
          </ul>
        </section>

        {/* Children */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Children’s Privacy</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700">
            Our services are not intended for children under 13.
            We do not knowingly collect data from minors.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700">
            This Privacy Policy may be updated occasionally.
            Revised versions will be posted on this page.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-[16px] leading-relaxed text-zinc-700">
            For questions or concerns regarding this policy, contact us:
          </p>

          <p className="font-medium mt-2 text-black text-[16px]">
            support@yourwebsite.com
          </p>
        </section>

      </div>
    </div>
  );
};

export default Privacy;
