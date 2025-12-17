"use client";

import { useEffect, useState } from "react";
import { Trash2, X, ChevronRight, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ---------------- STEP ---------------- */
  const [step, setStep] = useState<1 | 2>(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [nationality, setNationality] = useState<
    "indian" | "international"
  >("indian");

  /* ---------------- TIMER ---------------- */
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 30); // 06:30

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const confirmDelete = () => {
    localStorage.removeItem("cart");
    setCart(null);
    setShowConfirm(false);
  };

  const bookingFee =
    cart && Math.round(cart.price * cart.qty * 0.094);

  const total =
    cart && cart.price * cart.qty + bookingFee;

  return (
    <div className="min-h-screen bg-white text-black pb-28">

      {/* ✅ SLIM SHARED HEADER */}
      <Header
        centerContent={
          <>
            <h1 className="text-[15px] font-semibold text-black">
              Review your booking
            </h1>
            <p className="text-[12px] text-zinc-500">
              Confirm details before payment
            </p>
          </>
        }
      />

      {/* ================= TIMER BAR ================= */}
      <div className="bg-purple-50 text-purple-700 text-sm py-2 text-center">
        ⏱ Complete your booking in{" "}
        <span className="font-semibold">
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </span>{" "}
        mins
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* ================= EMPTY CART ================= */}
        {!cart && (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold mb-2">
              Your cart is empty
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Looks like you haven’t added any tickets yet
            </p>

            <button
              onClick={() => router.push("/events")}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold"
            >
              Browse events
            </button>
          </div>
        )}

        {/* ================= STEP 1 : ORDER SUMMARY ================= */}
        {cart && step === 1 && (
          <div className="space-y-6">

            <div className="border rounded-2xl p-6">
              <p className="text-xs text-zinc-400 mb-1">Step 1</p>
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>

            {/* TICKET CARD */}
            <div className="border rounded-xl p-5 flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{cart.eventTitle}</h3>
                <p className="text-sm text-gray-500">
                  Phase | {cart.section}
                </p>
                <p className="text-sm text-gray-500">
                  {cart.qty} ticket{cart.qty > 1 && "s"}
                </p>
                <p className="font-semibold mt-2">
                  ₹{cart.price * cart.qty}
                </p>
              </div>

              <Trash2
                className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer"
                onClick={() => setShowConfirm(true)}
              />
            </div>

            {/* ✅ OFFERS (NAVIGATION RESTORED) */}
            <div className="border rounded-xl divide-y">
              <button
                onClick={() =>
                  router.push("/events/buy/checkout/promo/discount")
                }
                className="w-full flex items-center justify-between p-4"
              >
                <span className="font-medium">
                  View all event offers
                </span>
                <ChevronRight />
              </button>

              <button
                onClick={() =>
                  router.push("/events/buy/checkout/promo/payment")
                }
                className="w-full flex items-center justify-between p-4"
              >
                <span className="font-medium">
                  View all payment offers
                </span>
                <ChevronRight />
              </button>
            </div>

            {/* PAYMENT DETAILS */}
            <div className="border rounded-xl p-5 space-y-2">
              <div className="flex justify-between">
                <span>Order Amount</span>
                <span>₹{cart.price * cart.qty}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Booking Fee</span>
                <span>₹{bookingFee}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Grand Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold"
            >
              CONTINUE
            </button>
          </div>
        )}

        {/* ================= STEP 2 : BILLING DETAILS ================= */}
        {cart && step === 2 && (
          <div className="border rounded-2xl p-6 space-y-6">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400">Step 2</p>
                <h2 className="text-lg font-semibold">Billing Details</h2>
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-green-500 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>

            <hr />

            <p className="text-sm font-medium text-zinc-600">
              These details will be shown on your invoice *
            </p>

            <input
              placeholder="Name*"
              className="w-full border rounded-xl px-4 py-3 text-sm"
            />

            <input
              disabled
              value="+91 9152045667"
              className="w-full border rounded-xl px-4 py-3 text-sm bg-zinc-50"
            />

            {/* NATIONALITY */}
            <div>
              <p className="text-sm font-medium mb-2">
                Select nationality
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setNationality("indian")}
                  className={`border rounded-xl px-4 py-3 flex justify-between ${
                    nationality === "indian"
                      ? "border-black"
                      : "border-zinc-200"
                  }`}
                >
                  Indian resident
                  <input
                    type="radio"
                    checked={nationality === "indian"}
                    readOnly
                  />
                </button>

                <button
                  onClick={() => setNationality("international")}
                  className={`border rounded-xl px-4 py-3 flex justify-between ${
                    nationality === "international"
                      ? "border-black"
                      : "border-zinc-200"
                  }`}
                >
                  International visitor
                  <input
                    type="radio"
                    checked={nationality === "international"}
                    readOnly
                  />
                </button>
              </div>
            </div>

            <select className="w-full border rounded-xl px-4 py-3 text-sm">
              <option>Select State</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
              <option>Karnataka</option>
            </select>

            <input
              placeholder="Email*"
              className="w-full border rounded-xl px-4 py-3 text-sm"
            />

            <p className="text-xs text-zinc-500">
              We’ll email your ticket confirmation and invoices
            </p>

            <hr />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) =>
                  setAcceptedTerms(e.target.checked)
                }
              />
              I have read and accepted the{" "}
              <span className="text-purple-600 cursor-pointer">
                terms and conditions
              </span>
            </label>

            <button
              disabled={!acceptedTerms}
              className={`w-full py-4 rounded-xl font-semibold text-white ${
                acceptedTerms
                  ? "bg-black"
                  : "bg-zinc-300 cursor-not-allowed"
              }`}
            >
              CONTINUE
            </button>
          </div>
        )}
      </div>

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[360px] p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400"
              onClick={() => setShowConfirm(false)}
            >
              <X />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="text-red-600" />
              </div>
              <h3 className="font-semibold text-lg">
                Remove cart item
              </h3>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-medium">{cart?.section}</span> tickets?
            </p>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-black text-white py-2 rounded-lg"
              >
                YES
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-100 py-2 rounded-lg"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
