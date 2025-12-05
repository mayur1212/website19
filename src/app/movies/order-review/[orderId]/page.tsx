// src/app/movies/order-review/[orderId]/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header"; // your header
import Footer from "@/components/Footer"; // your footer (replace/remove if different)
import Image from "next/image";

type Props = {
  params: { orderId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

type FoodItem = {
  id: string;
  title: string;
  price: number;
  img?: string;
  desc?: string;
};

export default function OrderReviewPage({ params, searchParams }: Props) {
  const orderId = params?.orderId ?? "unknown";

  // read search params (safe extraction)
  const encsessionid = typeof searchParams?.encsessionid === "string" ? searchParams.encsessionid : "";
  const seatsParam = typeof searchParams?.seats === "string" ? searchParams.seats : "";
  const amountParam = typeof searchParams?.amount === "string" ? searchParams.amount : "0";
  const movie = typeof searchParams?.movie === "string" ? searchParams.movie : "Movie Title";
  const theatre = typeof searchParams?.theatre === "string" ? searchParams.theatre : "Theatre name";
  const slot = typeof searchParams?.slot === "string" ? searchParams.slot : "07:00 PM";
  const fromdate = typeof searchParams?.fromdate === "string" ? searchParams.fromdate : "";

  // parse seats
  const seats = seatsParam ? seatsParam.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const baseAmount = Number(amountParam) || 0;
  const bookingCharge = Number((baseAmount * 0.14).toFixed(2)) || 0; // example GST-ish
  const initialTotal = baseAmount + bookingCharge;

  // sample food items (replace images with real assets)
  const FOOD_ITEMS: FoodItem[] = [
    { id: "f1", title: "Popcorn Combo 1", price: 90, img: "/movies/food/popcorn1.jpg", desc: "Popcorn + Drink" },
    { id: "f2", title: "Paneer Tikka Sandwich", price: 250, img: "/movies/food/sandwich.jpg", desc: "Veg sandwich" },
    { id: "f3", title: "Popcorn Combo 2", price: 120, img: "/movies/food/popcorn2.jpg", desc: "Large popcorn + Drink" },
    { id: "f4", title: "Large Nachos", price: 320, img: "/movies/food/nachos.jpg", desc: "Nachos with cheese" },
  ];

  // local state for selected food quantities
  const [foodQty, setFoodQty] = useState<Record<string, number>>(
    FOOD_ITEMS.reduce((acc, f) => {
      acc[f.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const onAddFood = (id: string) => {
    setFoodQty((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const onRemoveFood = (id: string) => {
    setFoodQty((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  };

  const foodTotal = useMemo(() => {
    return FOOD_ITEMS.reduce((sum, f) => sum + f.price * (foodQty[f.id] || 0), 0);
  }, [foodQty]);

  const totalToBePaid = (initialTotal + foodTotal).toFixed(2);

  // build district payment URL (example)
  const districtPaymentUrl = useMemo(() => {
    const enc = encodeURIComponent(encsessionid || "");
    const base = "https://www.district.in/movies/order-review";
    // Example link structure based on user earlier: /movies/order-review/2j8pr99vjk?encsessionid=...
    return `${base}/${encodeURIComponent(orderId)}?encsessionid=${enc}&seats=${encodeURIComponent(seats.join(","))}&amount=${encodeURIComponent(totalToBePaid)}&fromdate=${encodeURIComponent(fromdate)}`;
  }, [encsessionid, orderId, seats, totalToBePaid, fromdate]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-zinc-50 py-8">
        <div className="mx-auto max-w-[1200px] px-4">
          {/* top thin countdown / notice */}
          <div className="mb-4 rounded text-sm bg-violet-50 border border-violet-100 px-4 py-2 text-violet-700 text-center">
            Complete your booking in <strong>1:20 mins</strong>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* LEFT: main order & food (8 cols) */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Movie card */}
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-zinc-100">
                    {/* placeholder poster */}
                    <Image src="/movies/dhurandhar.jpg" alt={movie} width={84} height={120} className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{movie}</h2>
                    <div className="text-sm text-zinc-500 mt-1">{`A • Hindi • 2D`}</div>
                    <div className="text-sm text-zinc-500 mt-3">{theatre}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-zinc-400">Order amount</div>
                    <div className="text-lg font-semibold">₹{baseAmount.toFixed(2)}</div>
                  </div>
                </div>

                <hr className="my-4 border-zinc-100" />

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded border border-zinc-100 bg-white p-4">
                    <div className="text-sm text-zinc-600">Show</div>
                    <div className="mt-2 text-sm font-medium">{`${fromdate || "Today, 05 Dec"} • ${slot}`}</div>
                    <div className="text-xs text-zinc-400 mt-2">{`${seats.length} ticket${seats.length !== 1 ? "s" : ""}`}</div>
                  </div>

                  <div className="rounded border border-zinc-100 bg-white p-4">
                    <div className="text-sm text-zinc-600">Seat(s)</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {seats.length === 0 ? <div className="text-sm text-zinc-500">No seats selected</div> :
                        seats.map((s) => (
                          <span key={s} className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium">
                            {s}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-zinc-500">
                  Cancellation is not available as the show has started
                </div>
              </div>

              {/* Offers placeholder */}
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Offers for you</h3>
                  <Link href="#" className="text-sm text-zinc-500">View all Offers</Link>
                </div>
                <div className="mt-4 text-sm text-zinc-500">No offers applied</div>
              </div>

              {/* Food & Beverages area */}
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Food and beverages</h3>
                  <Link href="#" className="text-sm text-zinc-500">See all</Link>
                </div>

                <div className="mt-4">
                  <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                    {FOOD_ITEMS.map((food) => (
                      <div key={food.id} className="min-w-[180px] shrink-0 rounded-lg border border-zinc-100 bg-white p-3">
                        <div className="h-28 w-full overflow-hidden rounded-md bg-zinc-50">
                          {/* fallback: if images missing, use blank */}
                          {food.img ? (
                            // next/image requires loader/public - ensure asset exists or replace with img tag if not
                            <Image src={food.img} alt={food.title} width={300} height={180} className="object-cover w-full h-full" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-zinc-400">No image</div>
                          )}
                        </div>

                        <div className="mt-3">
                          <div className="text-sm font-medium">{food.title}</div>
                          <div className="text-xs text-zinc-500">{food.desc}</div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-sm font-semibold">₹{food.price}</div>
                            <div className="flex items-center gap-2">
                              <button
                                className="rounded-md border px-2 py-1 text-xs"
                                onClick={() => onRemoveFood(food.id)}
                                aria-label={`remove ${food.title}`}
                              >
                                −
                              </button>
                              <div className="text-xs font-medium">{foodQty[food.id] || 0}</div>
                              <button
                                className="rounded-md bg-black px-2 py-1 text-xs text-white"
                                onClick={() => onAddFood(food.id)}
                                aria-label={`add ${food.title}`}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* small note */}
                  <div className="mt-3 text-xs text-zinc-500">You can add food items to your order. Click Add to include them in your bill.</div>
                </div>
              </div>
            </div>

            {/* RIGHT: payment summary (4 cols) */}
            <aside className="col-span-12 lg:col-span-4">
              <div className="sticky top-20 space-y-4">
                <div className="rounded-lg bg-white p-6 shadow">
                  <h3 className="text-sm font-semibold">Payment summary</h3>

                  <div className="mt-4 space-y-2 text-sm text-zinc-600">
                    <div className="flex justify-between">
                      <div>Order amount</div>
                      <div>₹{baseAmount.toFixed(2)}</div>
                    </div>

                    <div className="flex justify-between">
                      <div>Booking charge (incl. of GST)</div>
                      <div>₹{bookingCharge.toFixed(2)}</div>
                    </div>

                    <div className="flex justify-between border-t border-dashed border-zinc-100 pt-3 font-semibold text-zinc-900">
                      <div>To be paid</div>
                      <div>₹{initialTotal.toFixed(2)}</div>
                    </div>

                    {/* show food cost breakdown when selected */}
                    {foodTotal > 0 && (
                      <>
                        <div className="mt-3 text-xs text-zinc-500">Food total</div>
                        <div className="flex justify-between text-sm">
                          <div>Selected food</div>
                          <div>₹{foodTotal.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between border-t border-dashed border-zinc-100 pt-3 font-semibold text-zinc-900">
                          <div>Total</div>
                          <div>₹{Number(totalToBePaid).toFixed(2)}</div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-4 text-xs text-zinc-500">
                    Your details
                    <div className="mt-2 rounded border border-zinc-100 bg-white p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-zinc-100" />
                        <div>
                          <div className="text-sm font-medium">+91-XXXXXXXXXX</div>
                          <div className="text-xs text-zinc-400">Gujarat</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* proceed button */}
                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500">₹{Number(totalToBePaid).toFixed(2)}</div>
                      <div className="text-sm font-semibold">TOTAL</div>
                    </div>

                    <a
                      href={districtPaymentUrl}
                      className="rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow hover:opacity-95"
                    >
                      Proceed To Pay
                    </a>
                  </div>

                  <div className="mt-3 text-xs text-zinc-400">By proceeding you agree to the terms and conditions.</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer (you asked to add footer here) */}
      <Footer />
    </>
  );
}
