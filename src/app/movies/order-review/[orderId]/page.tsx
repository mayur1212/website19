"use client";


import Link from "next/link";

import { ChevronDown } from "lucide-react";


import React, { useMemo, useState, useEffect } from "react";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";


type FoodCategory = "veg" | "combo" | "burger" | "others";

type FoodOption = {
  id: string;
  label: string;
  price: number;
};

type FoodItem = {
  id: string;
  title: string;
  price: number;
  img?: string;
  desc?: string;
  category: FoodCategory;
  options?: FoodOption[];
};

type UserDetails = {
  name: string;
  phone: string;
  email: string;
  state: string;
};

export default function OrderReviewPage() {
  const params = useParams<{ orderId?: string }>();
  const searchParams = useSearchParams();

  // ✅ Guard clause (VERY IMPORTANT)
  if (!searchParams) {
    return null; // or loading UI
  }

  const orderId = params?.orderId ?? "unknown";

  // ✅ read values from URL (SAFE now)
  const encsessionid = searchParams.get("encsessionid") ?? "";
  const seatsParam = searchParams.get("seats") ?? "";
  const amountParam = searchParams.get("amount") ?? "0";
  const movie = searchParams.get("movie") ?? "Movie Title";
  const theatre = searchParams.get("theatre") ?? "Theatre name";
  const slot = searchParams.get("slot") ?? "04:00 PM";
  const fromdate = searchParams.get("fromdate") ?? "";


  // parse seats
  const seats = seatsParam ? seatsParam.split(",").map((s) => s.trim()) : [];

  const baseAmount = Number(amountParam) || 0;

  // If no seats selected, treat ticket amount as 0 (user hasn't chosen tickets).
  const effectiveTicketAmount = seats.length > 0 ? baseAmount : 0;

  const bookingCharge = Number((effectiveTicketAmount * 0.14).toFixed(2)) || 0;
  const initialTotal = effectiveTicketAmount + bookingCharge;



// ===== PROFILE LOGIC (SAME AS SEAT-LAYOUT) =====
const [openLogin, setOpenLogin] = useState(false);
const [openDrawer, setOpenDrawer] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("logged_in");
  if (saved === "true") setIsLoggedIn(true);
}, []);

const handleLoginSuccess = () => {
  localStorage.setItem("logged_in", "true");
  setIsLoggedIn(true);
  setOpenLogin(false);
  setOpenDrawer(true);
};
// =============================================



  // Food items list (with categories + options for ALL items)
  const FOOD_ITEMS: FoodItem[] = [
    {
      id: "f1",
      title: "Popcorn Grand",
      price: 26,
      img: "/movies/POPCORN-COMBO-1-CHEESE.jpg",
      desc: "Choose your favourite popcorn flavour.",
      category: "combo",
      options: [
        { id: "f1-salt", label: "Salt Popcorn Grand", price: 26 },
        { id: "f1-caramel", label: "Caramel Popcorn Grand", price: 28 },
        { id: "f1-cheese", label: "Cheese Popcorn Grand", price: 28 },
        { id: "f1-mix", label: "Mix Popcorn Grand", price: 28 },
      ],
    },
    {
      id: "f2",
      title: "Paneer Tikka Sandwich",
      price: 250,
      img: "/movies/POPCORN-COMBO-2-SALTED-2.jpg",
      desc: "Paneer tikka sandwich 190 g | 529 kcal (approx.)",
      category: "veg",
      options: [
        {
          id: "f2-regular",
          label: "Regular Paneer Tikka Sandwich",
          price: 250,
        },
        {
          id: "f2-cheese",
          label: "Paneer Tikka Sandwich with Cheese",
          price: 280,
        },
        {
          id: "f2-meal",
          label: "Sandwich + Soft Drink Combo",
          price: 320,
        },
      ],
    },
    {
      id: "f3",
      title: "Popcorn Combo 2",
      price: 120,
      img: "/movies/POPCORN-COMBO-1-CHEESE.jpg",
      desc: "Large popcorn + soft drink 450 ml",
      category: "combo",
      options: [
        {
          id: "f3-regular",
          label: "Regular Combo (Popcorn + 300 ml Drink)",
          price: 120,
        },
        {
          id: "f3-large",
          label: "Large Combo (Popcorn + 450 ml Drink)",
          price: 150,
        },
        {
          id: "f3-extra",
          label: "Large Combo + Extra Butter",
          price: 170,
        },
      ],
    },
    {
      id: "f4",
      title: "Large Nachos",
      price: 320,
      img: "/movies/POPCORN-COMBO-2-SALTED-2.jpg",
      desc: "Large nachos with cheese & salsa",
      category: "veg",
      options: [
        { id: "f4-classic", label: "Classic Nachos", price: 320 },
        { id: "f4-cheese", label: "Extra Cheese Nachos", price: 350 },
        {
          id: "f4-loaded",
          label: "Loaded Nachos (Cheese + Jalapeno)",
          price: 380,
        },
      ],
    },
  ];

  // ---------------------------------------------------------------------------
  // FOOD STATE & LOGIC (updated)
  // ---------------------------------------------------------------------------

  // counts for each item
  const [foodQty, setFoodQty] = useState<Record<string, number>>(
    FOOD_ITEMS.reduce((acc, f) => {
      acc[f.id] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  // chosen unit price for items (if user chose a variant/option)
  const [foodUnitPrice, setFoodUnitPrice] = useState<Record<string, number>>(
    {}
  );

  // Add function: supports optional unitPrice (used when adding option-selected item)
  const onAdd = (id: string, qty: number = 1, unitPrice?: number) => {
    setFoodQty((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));

    if (unitPrice !== undefined) {
      setFoodUnitPrice((p) => ({ ...p, [id]: unitPrice }));
    } else {
      // ensure a fallback base price is set if not already
      setFoodUnitPrice((p) => {
        if (p[id] !== undefined) return p;
        const item = FOOD_ITEMS.find((f) => f.id === id);
        return item ? { ...p, [id]: item.price } : p;
      });
    }
  };

  const onRemove = (id: string) => {
    setFoodQty((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) };
      return next;
    });

    // if qty becomes 0 (previous qty <= 1) remove unit price to avoid stale price
    setFoodUnitPrice((p) => {
      if ((foodQty[id] || 0) <= 1) {
        const copy = { ...p };
        delete copy[id];
        return copy;
      }
      return p;
    });
  };

  // compute food total using unit price map (or fallback to base price)
  const foodTotal = useMemo(() => {
    return FOOD_ITEMS.reduce((sum, f) => {
      const qty = foodQty[f.id] || 0;
      if (qty <= 0) return sum;
      const unit = foodUnitPrice[f.id] ?? f.price;
      return sum + unit * qty;
    }, 0);
  }, [foodQty, foodUnitPrice]);

  // selected items list (for display in Food total area)
  const selectedFoodItems = useMemo(
    () =>
      FOOD_ITEMS.map((f) => {
        const qty = foodQty[f.id] || 0;
        if (qty <= 0) return null;
        const unit = foodUnitPrice[f.id] ?? f.price;
        return {
          id: f.id,
          title: f.title,
          qty,
          unit,
          subtotal: Number((unit * qty).toFixed(2)),
          img: f.img ?? null,
        };
      }).filter(Boolean) as {
        id: string;
        title: string;
        qty: number;
        unit: number;
        subtotal: number;
        img: string | null;
      }[],
    [FOOD_ITEMS, foodQty, foodUnitPrice]
  );

  // ---------------------------------------------------------------------------

  // final numeric total
  const numericTotalToBePaid = Number((initialTotal + foodTotal).toFixed(2));

  // string for display / url
  const totalToBePaid = numericTotalToBePaid.toFixed(2);

  // Only build a real payment URL when there's something to pay.
  const districtPaymentUrl = useMemo(() => {
    if (numericTotalToBePaid <= 0) return "#";
    return `https://www.district.in/movies/order-review/${encodeURIComponent(
      orderId
    )}?encsessionid=${encodeURIComponent(
      encsessionid
    )}&seats=${encodeURIComponent(
      seats.join(",")
    )}&amount=${encodeURIComponent(
      totalToBePaid
    )}&fromdate=${encodeURIComponent(fromdate)}`;
  }, [encsessionid, orderId, seats, totalToBePaid, fromdate, numericTotalToBePaid]);

  // Countdown Timer (3 min)
  const [secondsLeft, setSecondsLeft] = useState(3 * 60);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(1, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const isExpired = secondsLeft <= 0;

  // TERMS MODAL STATE
  const [showTerms, setShowTerms] = useState(false);
  // OFFERS DRAWER STATE
  const [showOffers, setShowOffers] = useState(false);
  // FOOD DRAWER STATE
  const [showFoodDrawer, setShowFoodDrawer] = useState(false);
  // NEW: which item (id) should be pre-opened inside the FoodDrawer (if any)
  const [foodDrawerInitialItemId, setFoodDrawerInitialItemId] = useState<string | null>(null);
  // EDIT DETAILS MODAL STATE
  const [showEditDetails, setShowEditDetails] = useState(false);

  // user details state
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    phone: "+91-8291400315",
    email: "",
    state: "Gujarat",
  });

  const payDisabled = isExpired || numericTotalToBePaid <= 0;

  // CHECKOUT MODAL STATE
const [showCheckout, setShowCheckout] = useState(false);


  return (
    <>
      {/* HEADER */}
      <header className="w-full border-b border-zinc-200 bg-white">
  <div
    className="
      relative flex w-full items-center justify-between
      px-3 py-2
      sm:px-4
      lg:px-10
    "
  >
    {/* ================= LEFT — LOGO (DESKTOP ONLY) ================= */}
    <Link href="/" className="relative shrink-0 hidden md:block">
      <Image
        src="/movies/hayyalogo.png"
        alt="Logo"
        width={110}
        height={33}
        priority
        className="
          rounded-xl
          w-[80px] h-auto
          sm:w-[95px]
          lg:w-[110px]
          cursor-pointer
        "
      />
    </Link>

    {/* ================= MOBILE BACK BUTTON ================= */}
    <button
      onClick={() => window.history.back()}
      className="flex md:hidden h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-zinc-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    {/* ================= CENTER — TITLE (ALL DEVICES) ================= */}
    <div
      className="
        absolute left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        text-center
      "
    >
      <h1
        className="
          truncate font-semibold text-zinc-900
          text-sm
          max-w-[200px]
          sm:max-w-[240px]
          lg:max-w-none
        "
      >
        Review your booking
      </h1>
    </div>

    {/* ================= RIGHT — PROFILE (DESKTOP ONLY) ================= */}
    <button
      onClick={() =>
        isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
      }
      className="
        hidden md:flex
        h-8 w-8 sm:h-9 sm:w-9
        items-center justify-center
        rounded-full bg-slate-900 text-white
        text-xs sm:text-sm
        font-semibold shadow-sm shrink-0
      "
    >
      U
    </button>
  </div>
</header>



      {/* TOP TIMER STRIP */}
      <div className="w-full bg-[#f3e9ff] border-b border-[#e0cfff] text-[13px] sm:text-sm text-center py-2">
        {!isExpired ? (
          <span>
            Complete your booking in{" "}
            <span className="font-semibold">{formattedTime} mins</span>
          </span>
        ) : (
          <span className="text-red-600 font-medium">
            Time expired — your booking session ended.
          </span>
        )}
      </div>

      {/* MAIN */}
      <main className="min-h-screen bg-zinc-50 py-8">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT COLUMN */}
            <section className="col-span-12 lg:col-span-8 space-y-6">
              {/* Movie Card */}
              <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-100">
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-md overflow-hidden bg-zinc-100">
                    <Image
                      src="/movies/d4.jpg"
                      alt={movie}
                      width={84}
                      height={120}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{movie}</h2>
                    <div className="text-xs sm:text-sm text-zinc-500 mt-1">
                      UA16+ • Hindi • 2D
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-500 mt-3">
                      {theatre}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-zinc-400">Order amount</div>
                    <div className="text-lg font-semibold">
                      ₹{effectiveTicketAmount.toFixed(2)}
                    </div>
                  </div>
                </div>

                <hr className="my-4 border-zinc-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Show */}
                  <div className="border border-zinc-200 p-4 rounded-lg bg-white">
                    <div className="text-xs text-zinc-500 uppercase tracking-wide">
                      Show
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      {(fromdate || "Today") + " • " + slot}
                    </div>
                    <div className="mt-2 text-xs text-zinc-400">
                      {seats.length} ticket(s)
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="border border-zinc-200 p-4 rounded-lg bg-white">
                    <div className="text-xs text-zinc-500 uppercase tracking-wide">
                      Seat(s)
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {seats.map((s) => (
                        <span
                          key={s}
                          className="bg-zinc-100 px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 text-[10px]">
                    i
                  </span>
                  <span>
                    Cancellation is not available within 4 hrs of showtime
                  </span>
                </div>
              </div>

              {/* Offers */}
              <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm sm:text-base">
                    Offers for you
                  </h3>
                  <button
                    onClick={() => setShowOffers(true)}
                    className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-700"
                  >
                    See all
                  </button>
                </div>
                <div className="mt-4 text-sm text-zinc-500">No offers applied</div>
              </div>

              {/* Food Section */}
             <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-100">
  <div className="flex items-center justify-between">
    <h3 className="font-semibold text-sm sm:text-base">
      Food and beverages
    </h3>
    <button
      onClick={() => {
        setFoodDrawerInitialItemId(null); // open drawer with no preselected item
        setShowFoodDrawer(true);
      }}
      className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-700"
    >
      See all
    </button>
  </div>

  <div className="mt-4 flex gap-4 overflow-x-auto no-scrollbar py-2">
    {FOOD_ITEMS.map((food) => (
      <div
        key={food.id}
        className="min-w-[180px] rounded-lg border border-zinc-200 p-3 bg-white"
      >
        <div className="h-28 w-full rounded-md overflow-hidden bg-zinc-50">
          {food.img ? (
            <Image
              src={food.img}
              alt={food.title}
              width={300}
              height={180}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400 text-xs">
              No image
            </div>
          )}
        </div>

        <div className="mt-3">
          <div className="font-medium text-sm">{food.title}</div>
          <div className="text-xs text-zinc-500">{food.desc}</div>

          {/* ONLY PRICE AND ADD BUTTON */}
          <div className="flex items-center justify-between mt-2">
            <div className="font-semibold text-sm">₹{food.price}</div>

            <button
              className="bg-black text-white rounded-md px-3 py-1 text-xs"
              onClick={() => {
                if (food.options && food.options.length > 0) {
                  setFoodDrawerInitialItemId(food.id);
                  setShowFoodDrawer(true);
                } else {
                  onAdd(food.id, 1, food.price);
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-3 text-xs text-zinc-500">
    You can add food items to your order.
  </div>
</div>

            </section>

            {/* RIGHT SUMMARY COLUMN */}
            <aside className="col-span-12 lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                {/* COMBINED PAYMENT + FOOD card */}
                <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-100">
                  <h3 className="font-semibold text-sm">Payment summary</h3>

                  <div className="mt-4 space-y-3 text-sm text-zinc-600">
                    {/* Tickets rows */}
                    <div className="flex justify-between">
                      <span>Order amount</span>
                      <span>₹{effectiveTicketAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Booking charge (incl. GST)</span>
                      <span>₹{bookingCharge.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between border-t border-dashed pt-3 font-semibold text-zinc-900">
                      <span>Ticket subtotal</span>
                      <span>₹{initialTotal.toFixed(2)}</span>
                    </div>

                    {/* Food section inside same card */}
                    <div className="pt-3">
                      <div className="font-semibold text-sm ">Selected food</div>

                      {selectedFoodItems.length > 0 ? (
                        <div className="mt-2 space-y-2 max-h-36 overflow-y-auto pr-2">
                          {selectedFoodItems.map((it) => (
                            <div key={it.id} className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-black truncate">{it.title}</div>
                                <div className="text-xs text-zinc-500">
                                  {it.qty} × ₹{it.unit.toFixed(2)}
                                </div>
                              </div>
                              <div className="ml-3 font-semibold">₹{it.subtotal.toFixed(2)}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-2 text-xs text-zinc-400">No items selected</div>
                      )}

                      {/* Food total row */}
                      <div className="flex justify-between border-t border-dashed pt-3 font-semibold text-zinc-900">
                        <span>Food total</span>
                        <span>₹{foodTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Grand total row */}
                    <div className="flex justify-between border-t border-dashed pt-3 font-semibold text-zinc-900">
                      <span>Total</span>
                      <span>₹{numericTotalToBePaid.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Your details block (kept inside same card) */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>Your details</span>
                      <button
                        type="button"
                        onClick={() => setShowEditDetails(true)}
                        className="text-[11px] font-medium text-zinc-800 underline underline-offset-2 hover:text-black"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="mt-2 border border-zinc-200 p-3 rounded-lg bg-white text-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400">
                          <span className="text-lg">👤</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{userDetails.phone}</div>
                          <div className="text-xs text-zinc-400">
                            {userDetails.state || "Select state"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PAY BAR */}
                <div className="rounded-xl bg-white p-5 shadow-sm border border-zinc-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500">
                        ₹{numericTotalToBePaid.toFixed(2)}
                      </div>
                      <div className="text-sm font-semibold">TOTAL</div>
                    </div>

                    <button
  disabled={payDisabled}
  onClick={() => setShowCheckout(true)}
  className={`rounded-full px-6 py-3 text-sm font-semibold text-white shadow ${
    payDisabled
      ? "bg-zinc-400 cursor-not-allowed"
      : "bg-black hover:opacity-95"
  }`}
>
  {isExpired
    ? "Session expired"
    : numericTotalToBePaid <= 0
    ? "No items selected"
    : "Proceed To Pay"}
</button>

                  </div>

                  <div className="mt-3 text-[11px] text-zinc-400">
                    By proceeding you agree to the terms & conditions.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <ProfileLoginModal
  open={openLogin}
  onClose={() => setOpenLogin(false)}
  onSuccess={handleLoginSuccess}
/>

<ProfileDrawer
  open={openDrawer}
  onClose={() => setOpenDrawer(false)}
  onLoggedOut={() => {
    localStorage.removeItem("logged_in");
    setIsLoggedIn(false);
    setOpenDrawer(false);
  }}
/>


        {/* TERMS MODAL */}
        {showTerms && <TermsAndConditionsModal onClose={() => setShowTerms(false)} />}

        {/* OFFERS DRAWER */}
        {showOffers && <OffersDrawer onClose={() => setShowOffers(false)} />}

        {/* FOOD DRAWER */}
        {showFoodDrawer && (
          <FoodDrawer
            onClose={() => {
              setShowFoodDrawer(false);
              setFoodDrawerInitialItemId(null);
            }}
            items={FOOD_ITEMS}
            foodQty={foodQty}
            onAdd={onAdd}
            onRemove={onRemove}
            initialItemId={foodDrawerInitialItemId}
          />
        )}

        {/* EDIT DETAILS MODAL */}
        {showEditDetails && (
          <EditDetailsModal
            initialDetails={userDetails}
            onClose={() => setShowEditDetails(false)}
            onSave={(details) => {
              setUserDetails(details);
              setShowEditDetails(false);
            }}
          />
        )}

        {showCheckout && (
  <CheckoutModal
    amount={numericTotalToBePaid}
    onClose={() => setShowCheckout(false)}
  />
)}

      </main>



      
    </>
  );
}

/* ===================== TERMS MODAL COMPONENT ===================== */
function TermsAndConditionsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* MODAL WRAPPER */}
      <div
        className="
        relative z-10 w-full
        max-w-[95%] sm:max-w-2xl lg:max-w-4xl
        mx-2 sm:mx-4
        rounded-2xl sm:rounded-3xl
        bg-white shadow-2xl
      "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
            Terms and conditions
          </h2>

          <button
            onClick={onClose}
            className="
              h-8 w-8 sm:h-9 sm:w-9
              flex items-center justify-center
              rounded-full border border-zinc-200 
              hover:bg-zinc-100
              text-lg sm:text-xl leading-none
            "
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <hr className="border-zinc-100" />

        {/* Scrollable content */}
        <div
          className="
            px-4 sm:px-8
            py-4 sm:py-6
            max-h-[65vh] sm:max-h-[70vh] lg:max-h-[72vh]
            overflow-y-auto 
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300
          "
        >
          <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-600 list-disc pl-4">
            <li>
              For your own safety, wearing face masks is compulsory for entering
              the cinema premises.
            </li>
            <li>
              In case a ticket is lost or misplaced, duplicate tickets cannot be
              issued.
            </li>
            <li>Tickets once purchased cannot be cancelled, exchanged or refunded.</li>
            <li>
              Decision(s) taken by Miraj Cinema shall be final and binding, Rights of admission reserved.
            </li>
            <li>
              If there is any show disruption or cancellation due to technical reasons, your money will be refunded online by the platform only, not at the theater.
            </li>
            <li>
              Only messages from the platform’s server are accepted; printouts and forwarded messages are not valid for movie tickets.
            </li>
            <li>Ticket is compulsory for children of 3 years &amp; above.</li>
            <li>Outside Food and Beverage is not allowed inside the cinema premises.</li>
            <li>Ticket required for child 3 years and above.</li>
            <li>
              Tickets for A rated movies should not be purchased for people under 18 years of age. There won&apos;t be a refund for tickets booked in such cases.
            </li>
            <li>Ticket once purchased cannot be exchanged or adjusted/transferred for any other show.</li>
            <li>Handbags, Laptops, Tabs, cameras, and all other electronic items are not allowed inside cinema premises.</li>
            <li>
              Smoking is strictly not permitted inside the cinema premises. Cigarettes, lighters, matchsticks, Gutkha, Pan masala etc. will not be allowed.
            </li>
            <li>People under the influence of Alcohol and drugs will not be allowed inside the cinema premises.</li>
            <li>Cinema reserves the Right of Admission.</li>
            <li>
              Items like laptops, cameras, knives, lighter, matchbox, cigarettes, firearms, and all types of inflammable objects are strictly prohibited.
            </li>
            <li>Items like eatables and helmets are not allowed inside the theatres and are strictly prohibited.</li>
            <li>For 3D movies, ticket price includes charges towards the usage of 3D glasses.</li>
            <li>In case the ticket is lost or misplaced, duplicate ticket will not be issued.</li>
            <li>Decision(s) taken by Miraj management is final &amp; abiding.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-8 pb-4 sm:pb-6 pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="
              text-xs sm:text-sm 
              px-3 sm:px-4 py-2
              rounded-full border border-zinc-200 
              hover:bg-zinc-100
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================== EDIT DETAILS MODAL ===================== */
function EditDetailsModal({
  initialDetails,
  onClose,
  onSave,
}: {
  initialDetails: UserDetails;
  onClose: () => void;
  onSave: (details: UserDetails) => void;
}) {
  const [form, setForm] = useState<UserDetails>(initialDetails);

  const handleChange = (field: keyof UserDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-4 rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold">Edit billing details</h2>
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-100 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4 sm:space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm sm:text-base outline-none focus:border-black"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <div className="flex gap-2 sm:gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-3 sm:px-4 py-3 text-sm bg-zinc-50">
                <span className="text-xl">🇮🇳</span>
                <span className="text-sm sm:text-base font-medium">+91</span>
              </div>
              <input
                type="text"
                value={form.phone.replace("+91-", "")}
                disabled
                className="flex-1 rounded-2xl border border-zinc-200 px-4 py-3 text-sm sm:text-base bg-zinc-50 text-zinc-500 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500">
              <span className="text-lg">ⓘ</span>
              <span>The phone number associated with your account cannot be modified</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm sm:text-base outline-none focus:border-black"
            />
          </div>

          {/* State */}
          <div>
            <select
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm sm:text-base outline-none focus:border-black bg-white"
            >
              <option value="">Select state</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Rajasthan">Rajasthan</option>
            </select>
          </div>

          <button type="submit" className="mt-2 w-full rounded-full bg-black text-white text-sm sm:text-base font-semibold py-3 sm:py-3.5">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

/* ===================== OFFERS DRAWER (same as before) ===================== */
function OffersDrawer({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const offers = [
    {
      id: "1",
      title: "Get free coke voucher",
      subtitle: "Add at least 2 tickets to avail this offer",
      code: "MOVIE_UNLIMITED_FNB",
      footer: "Not applicable",
      footerMuted: true,
    },
    {
      id: "2",
      title: "Get 25% off up to ₹100",
      subtitle:
        "Valid on IDFC FIRST Millennia, FIRST EARN, WOW! Black, FIRST Classic, FIRST SWYP and FIRST Power Plus Credit Cards",
      code: "IDFCCCFM",
      footer: "Apply",
      footerMuted: false,
    },
    {
      id: "3",
      title: "Get 1 + 1 on movie tickets",
      subtitle: "Add at least 2 tickets to avail this promo discount.",
      code: "IDFCDCWEALTH",
      footer: "Apply",
      footerMuted: false,
    },
    {
      id: "4",
      title: "Flat ₹50 off on food",
      subtitle: "Minimum food & beverages order of ₹250 required.",
      code: "FOOD50",
      footer: "Apply",
      footerMuted: false,
    },
    {
      id: "5",
      title: "Get 10% off on total amount",
      subtitle: "Valid on payments made via select debit cards.",
      code: "DEBIT10",
      footer: "Apply",
      footerMuted: false,
    },
    {
      id: "6",
      title: "Cashback up to ₹75",
      subtitle: "Pay using UPI and get assured cashback up to ₹75.",
      code: "UPICASH75",
      footer: "Apply",
      footerMuted: false,
    },
    {
      id: "7",
      title: "Exclusive IDFC Mayura offer",
      subtitle: "Special discount on movie tickets with IDFC Mayura cards.",
      code: "IDFCMAYURA",
      footer: "Apply",
      footerMuted: false,
    },
    {
      id: "8",
      title: "No convenience fee on this booking",
      subtitle: "Use this offer to waive off booking charges once.",
      code: "NOCONVENIENCE",
      footer: "Apply",
      footerMuted: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

      <div
        className={`relative z-10 h-full w-full max-w-[480px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-zinc-100">
          <button
            onClick={handleClose}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-100 text-lg leading-none"
            aria-label="Back"
          >
            ←
          </button>
          <h2 className="text-base sm:text-lg font-semibold">Offers</h2>
        </div>

        <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-zinc-100">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Have a coupon? Type here"
              className="flex-1 rounded-full border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-400"
            />
            <button className="rounded-full px-5 py-2 text-sm font-semibold bg-zinc-200 text-zinc-500 cursor-default">
              Apply
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          <div className="text-sm font-medium mb-1">Best offers for you</div>

          {offers.map((offer) => (
            <div key={offer.id} className="rounded-xl border border-zinc-100 bg-white shadow-sm">
              <div className="px-4 sm:px-5 pt-4 pb-3 flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center text-xs">🎟️</div>

                <div className="flex-1">
                  <div className="text-sm font-semibold">{offer.title}</div>
                  <div className="text-xs text-red-500 mt-1">{offer.subtitle}</div>

                  <div className="inline-flex mt-3 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium tracking-wide uppercase">
                    {offer.code}
                  </div>
                </div>

                <button className="text-[11px] text-zinc-500">Learn more ▾</button>
              </div>

              <div className="border-t border-zinc-100 px-4 sm:px-5 py-3 text-center text-xs font-medium">
                <span className={offer.footerMuted ? "text-zinc-300" : "text-zinc-900"}>{offer.footer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== FOOD DRAWER COMPONENT (INLINE OPTIONS) ===================== */
function FoodDrawer({
  onClose,
  items,
  foodQty,
  onAdd,
  onRemove,
  initialItemId,
}: {
  onClose: () => void;
  items: FoodItem[];
  foodQty: Record<string, number>;
  onAdd: (id: string, qty?: number, unitPrice?: number) => void;
  onRemove: (id: string) => void;
  initialItemId?: string | null;
}) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All items");

  // inline dropdown state
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [optionQty, setOptionQty] = useState(1);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // When drawer becomes visible, if parent passed an initialItemId then open that item's options
  useEffect(() => {
    if (!visible) return;
    if (!initialItemId) return;

    const item = items.find((it) => it.id === initialItemId);
    if (!item) return;

    if (!item.options || item.options.length === 0) {
      // no options -> directly add and close
      onAdd(item.id, 1, item.price);
      setVisible(false);
      setTimeout(() => onClose(), 300);
      return;
    }

    // open inline options for that item
    setExpandedItemId(item.id);
    setSelectedOptionId(item.options[0].id);
    setOptionQty(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const tabs = ["All items", "Veg only", "Combo", "Burger", "Others"];

  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      q.length === 0 ||
      item.title.toLowerCase().includes(q) ||
      (item.desc ?? "").toLowerCase().includes(q);

    let matchesTab = true;
    switch (activeTab) {
      case "Veg only":
        matchesTab = item.category === "veg";
        break;
      case "Combo":
        matchesTab = item.category === "combo";
        break;
      case "Burger":
        matchesTab = item.category === "burger";
        break;
      case "Others":
        matchesTab = item.category === "others";
        break;
      default:
        matchesTab = true; // All items
    }

    return matchesSearch && matchesTab;
  });

  const closeOptions = () => {
    setExpandedItemId(null);
    setSelectedOptionId(null);
    setOptionQty(1);
  };

  const openOptions = (item: FoodItem) => {
    if (!item.options || item.options.length === 0) {
      // normal item, no options
      onAdd(item.id, 1, item.price);
      return;
    }

    // toggle: if already open, close it
    if (expandedItemId === item.id) {
      closeOptions();
      return;
    }

    setExpandedItemId(item.id);
    setSelectedOptionId(item.options[0].id);
    setOptionQty(1);
  };

  const currentItem =
    items.find((i) => i.id === expandedItemId && i.options && i.options.length) ||
    null;
  const selectedOption =
    currentItem?.options?.find((o) => o.id === selectedOptionId) ?? null;

  const handleAddOptionItem = () => {
    if (!currentItem || !selectedOption) return;
    // pass unit price so the total uses the selected option's price
    onAdd(currentItem.id, optionQty, selectedOption.price);
    closeOptions();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      {/* overlay click to close */}
      <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

      {/* RIGHT SIDE PANEL */}
      <div
        className={`relative z-10 h-full w-full max-w-[520px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-zinc-100">
          <button
            onClick={handleClose}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-100 text-lg leading-none"
            aria-label="Back"
          >
            ←
          </button>
          <h2 className="text-base sm:text-lg font-semibold">Pre-book your food</h2>
        </div>

        {/* SEARCH + FILTER TABS */}
        <div className="px-4 sm:px-6 pt-3 pb-3 border-b border-zinc-100">
          <div className="w-full rounded-2xl bg-zinc-100/80 px-4 py-2 flex items-center text-sm text-zinc-500">
            <span className="mr-3 text-lg">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar text-xs sm:text-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full border whitespace-nowrap ${
                  activeTab === tab ? "bg-black text-white border-black" : "bg-white text-zinc-600 border-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* FOOD LIST */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {filteredItems.map((item) => {
            const qty = foodQty[item.id] || 0;
            const isExpanded = expandedItemId === item.id;

            return (
              <div key={item.id} className="rounded-2xl border border-zinc-100 bg-white shadow-sm px-4 sm:px-5 py-4">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-zinc-50 flex-shrink-0">
                    {item.img ? (
                      <Image src={item.img} alt={item.title} width={120} height={120} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">No image</div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <div className="text-sm sm:text-base font-medium">{item.title}</div>
                    <div className="text-[11px] text-emerald-600">Top Seller</div>
                    <div className="text-sm sm:text-base font-semibold">₹{item.price}</div>
                    <div className="text-[11px] sm:text-xs text-zinc-500 line-clamp-2">{item.desc}</div>
                  </div>

                  <div className="flex items-center">
                    {qty === 0 ? (
                      <button onClick={() => openOptions(item)} className="px-5 py-2 rounded-full border border-zinc-300 text-sm font-semibold">
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 border border-zinc-300 rounded-full px-3 py-1">
                        <button onClick={() => onRemove(item.id)} className="text-lg leading-none px-1">−</button>
                        <span className="text-sm font-medium w-4 text-center">{qty}</span>
                        <button onClick={() => openOptions(item)} className="text-sm font-semibold">+</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* INLINE OPTIONS DROPDOWN */}
                {item.options && isExpanded && (
                  <div className="mt-4 rounded-2xl bg-white text-black px-4 py-4 border border-zinc-200 shadow-md">
                    <div className="flex items_center justify-between mb-3">
                      <div className="text-sm font-semibold">{item.title}</div>
                      <button onClick={closeOptions} className="h-7 w-7 flex items-center justify-center rounded-full border border-zinc-300 text-sm">×</button>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span>Size Option</span>
                      <span className="text-xs text-zinc-500">(Select 1 Size)</span>
                      <span className="ml-2 text-[10px] px-2 py-[2px] rounded-full border border-zinc-800 text-zinc-800">Required</span>
                    </div>

                    <div className="mt-3 space-y-3">
                      {item.options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedOptionId(opt.id)}
                          className="w-full flex items-center justify-between text-left text-sm"
                        >
                          <span>{opt.label}</span>
                          <span className="flex items-center gap-3">
                            <span className="font-semibold">₹ {opt.price}</span>
                            <span className={`h-4 w-4 rounded-full border ${selectedOptionId === opt.id ? "border-black bg-black" : "border-zinc-400 bg-transparent"}`} />
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      {/* Qty selector */}
                      <div className="flex items-center rounded-full bg-zinc-100 text-black px-4 py-2 border border-zinc-200">
                        <button onClick={() => setOptionQty((q) => (q > 1 ? q - 1 : 1))} className="px-2 text-lg">−</button>
                        <span className="mx-2 min-w-[16px] text-center text-sm font-semibold">{optionQty}</span>
                        <button onClick={() => setOptionQty((q) => q + 1)} className="px-2 text-lg">+</button>
                      </div>

                      {/* Add button */}
                      <button
                        onClick={handleAddOptionItem}
                        disabled={!selectedOption}
                        className={`flex-1 rounded-full py-3 text-sm font-semibold text-center ${selectedOption ? "bg-black text-white" : "bg-zinc-200 text-zinc-500 cursor-not-allowed"}`}
                      >
                        {selectedOption ? `Add Item ₹ ${(selectedOption.price * optionQty).toFixed(2)}` : "Choose an option"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-xs sm:text-sm text-zinc-500 text-center mt-4">No items found for “{search}”.</div>
          )}
          
        </div>
      </div>
    </div>
  );
}




/* ===================== CHECKOUT MODAL ===================== */

function CheckoutModal({
  amount,
  onClose,
}: {
  amount: number;
  onClose: () => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const toggle = (key: string) =>
    setOpenSection((prev) => (prev === key ? null : key));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MODAL */}
      
        <div className="relative w-full max-w-xl h-[640px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col">

        {/* HEADER */}
        
          <div className="flex items-center justify-between px-7 py-5 border-b shrink-0">

        
          <h2 className="text-xl font-semibold text-zinc-900">Checkout</h2>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-zinc-300 hover:bg-zinc-100 transition
 flex items-center justify-center text-lg"
          >
            ✕
          </button>
        </div>

        {/* BODY (fixed scroll area) */}
      
          <div className="flex-1 overflow-y-auto px-6">

          {/* WALLET */}
          <Section
            title="Wallets"
            open={openSection === "wallet"}
            onClick={() => toggle("wallet")}
          >
            <ScrollableArea>
              <div className="grid grid-cols-2 gap-4">
                {["Mobikwik", "Paytm"].map((w) => (
                  <Tile key={w} label={w} sub="LINK" />
                ))}
              </div>
            </ScrollableArea>
          </Section>

          {/* CARDS */}
          <Section
            title="Add credit or debit cards"
            open={openSection === "card"}
            onClick={() => toggle("card")}
          >
            <ScrollableArea>
              <div className="border border-zinc-200 rounded-xl p-4 space-y-3">
                <Input placeholder="Name on Card" />
                <Input placeholder="Card Number" />
                <div className="flex gap-3">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" />
                </div>
                <Input placeholder="Nickname for card" />
                <button className="w-full bg-red-500 text-white rounded-lg py-2 text-sm font-medium">
                  Checkout
                </button>
              </div>
            </ScrollableArea>
          </Section>

          {/* NETBANKING */}
          <Section
            title="Netbanking"
            open={openSection === "netbanking"}
            onClick={() => toggle("netbanking")}
          >
            <ScrollableArea>
              <div className="grid grid-cols-4 gap-4">
                {["HDFC", "Kotak", "ICICI", "SBI", "Axis"].map((b) => (
                  <Tile key={b} label={b} />
                ))}
              </div>
            </ScrollableArea>
          </Section>

          {/* UPI */}
          <Section
            title="Add new UPI ID"
            open={openSection === "upi"}
            onClick={() => toggle("upi")}
          >
            <ScrollableArea>
              <div className="border border-zinc-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <Input placeholder="example@upi" />
                  <button className="bg-red-500 text-white px-4 rounded-lg text-sm">
                    Checkout
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  The UPI ID is in the format of name/phone@bankname
                </p>
              </div>
            </ScrollableArea>
          </Section>

          {/* PAY LATER */}
          <Section
            title="Pay Later"
            open={openSection === "later"}
            onClick={() => toggle("later")}
          >
            <ScrollableArea>
              <p className="text-sm text-zinc-500">
                Pay using Simpl, LazyPay, ZestMoney
              </p>
            </ScrollableArea>
          </Section>
        </div>

        {/* FOOTER (always fixed) */}
        <div className="border-t px-6 py-5 shrink-0 bg-white rounded-b-3xl">

          <button
            disabled
            className="w-full bg-zinc-300 text-white py-3 rounded-xl text-sm font-semibold"
          >
            PAY ₹{amount.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================== HELPERS ===================== */

function Section({
  title,
  open,
  onClick,
  children,
}: {
  title: string;
  open: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-5 text-[15px] font-medium text-zinc-800"

      >
        {title}
        <ChevronDown
  size={18}
  className={`text-zinc-400 transition-transform duration-200 ${
    open ? "rotate-180" : ""
  }`}
/>


      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function ScrollableArea({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-[260px] overflow-y-auto pr-1">
      {children}
    </div>
  );
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
    />
  );
}

function Tile({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="border border-zinc-200 rounded-xl p-4 text-center cursor-pointer hover:border-black transition">
      <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-zinc-100" />
      <div className="text-sm font-medium">{label}</div>
      {sub && <div className="text-xs text-red-500 mt-1">{sub}</div>}
    </div>
  );
}







