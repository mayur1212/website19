"use client";

import Image from "next/image";

export default function GrabDeals() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 md:py-20">
      {/* MAIN TITLE */}
      <div className="mb-12 text-center sm:mb-14 md:mb-16">
        <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl md:text-[42px]">
          Grab great deals and unlock extra savings
        </h2>

        {/* underline */}
        <div className="mt-3 flex justify-center">
          <div className="h-[4px] w-[180px] bg-purple-400 sm:w-[220px]" />
        </div>
      </div>

      {/* CARDS ROW */}
      <div className="flex flex-col items-center justify-center gap-14 px-4 sm:px-6 md:flex-row md:gap-28 md:px-0">

        {/* ===== LEFT CARD ===== */}
        <div className="flex max-w-full flex-col-reverse items-center gap-6 text-center sm:flex-row sm:text-left md:max-w-[560px]">
          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Up to 50% OFF
            </h3>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg">
              Get more for less <br />
              on your dining bill
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative rotate-[2deg] shadow-[8px_8px_0px_#000]">
            <div className="bg-purple-200 p-3">
              <Image
                src="/movies/e2.jpg"
                width={200}
                height={250}
                alt="Up to 50% off"
                className="w-[180px] object-cover sm:w-[200px]"
              />
            </div>
          </div>
        </div>

        {/* ===== RIGHT CARD ===== */}
        <div className="flex max-w-full flex-col-reverse items-center gap-6 text-center sm:flex-row sm:text-left md:max-w-[480px]">
          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Buffets
            </h3>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg">
              Indulge in incredible <br />
              buffets – Book now, eat <br />
              more, pay less!
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative -rotate-[3deg] shadow-[8px_8px_0px_#000]">
            <div className="bg-purple-200 p-3">
              <Image
                src="/movies/e1.jpg"
                width={200}
                height={250}
                alt="Buffets"
                className="w-[180px] object-cover sm:w-[200px]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
