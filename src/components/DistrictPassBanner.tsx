"use client";

import Image from "next/image";

export default function DistrictPassBanner() {
  return (
    <section className="w-full px-4 md:px-6 lg:px-16 py-12">
      <div
        className="
          relative mx-auto w-full max-w-7xl
          rounded-[32px]
          overflow-hidden
          bg-gradient-to-br from-[#4b3fbf] via-[#2b235f] to-[#14102e]
          text-white
          shadow-[0_40px_120px_rgba(76,61,255,0.35)]
        "
      >
        {/* subtle grid / glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div
          className="
            relative z-10
            flex flex-col gap-8
            md:flex-row md:items-center md:justify-between
            p-6 md:p-10 lg:p-12
          "
        >
          {/* LEFT — BRAND */}
          <div className="flex-shrink-0">
            <p className="uppercase tracking-widest text-sm text-white/70">
              district
            </p>
            <h2 className="mt-1 text-4xl md:text-5xl font-black leading-none">
              PASS
            </h2>
          </div>

          {/* CENTER — BENEFITS */}
          <div className="flex-1 space-y-5 md:px-10">
            <Benefit icon="🎟️">
              Get <span className="font-semibold">3 free tickets</span> on your
              movie bookings
            </Benefit>

            <Benefit icon="🍽️">
              <span className="font-semibold">2 dining vouchers</span> worth ₹250
              each
            </Benefit>

            <Benefit icon="🍿">
              Flat <span className="font-semibold">20% OFF</span> on movie snacks
            </Benefit>
          </div>

          {/* RIGHT — QR GLASS CARD */}
          <div
            className="
              flex-shrink-0
              w-full md:w-[220px]
              rounded-2xl
              border border-white/20
              bg-white/10 backdrop-blur-xl
              p-4
              flex md:flex-col items-center gap-4
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
          >
            <p className="text-xs tracking-wide font-semibold text-white/80 text-center">
              SCAN THE QR CODE
            </p>

            <div className="relative h-28 w-28 rounded-xl bg-white p-2 shadow-md">
              <Image
                src="/movies/scan.jpg"
                alt="QR Code"
                fill
                className="object-contain"
              />
            </div>

            <button
              className="
                w-full rounded-full
                bg-white text-black
                py-2.5 text-xs font-semibold
                hover:bg-zinc-200 active:scale-95
                transition-all
              "
            >
              DOWNLOAD THE APP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENT ================= */

function Benefit({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-xl leading-none">{icon}</span>
      <p className="text-sm md:text-base text-white/90">{children}</p>
    </div>
  );
}
