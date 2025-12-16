"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, X, ChevronRight, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/logored.png";
import ProfileLoginModal from "@/components/ProfileLogin";
import ProfileDrawer from "@/components/ProfileDrawer";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 30); // 06:30
const [timeOver, setTimeOver] = useState(false);

useEffect(() => {
  if (timeLeft <= 0) {
    setTimeOver(true);
    return;
  }

  const interval = setInterval(() => {
    setTimeLeft((t) => t - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timeLeft]);


  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));

    if (localStorage.getItem("logged_in") === "true") {
      setIsLoggedIn(true);
    }
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
    
    <div className="min-h-screen bg-white text-black">
      {/* ================= HEADER ================= */}
      <header className="w-full border-b bg-white px-6 py-3 flex items-center justify-between">
        <Image
          src={Logo}
          alt="Hayya"
          width={110}
          height={36}
          className="cursor-pointer rounded-2xl"
          onClick={() => router.push("/")}
        />

        <h2 className="text-xl font-semibold">
          Review your booking
        </h2>
        

        <button
          onClick={() =>
            isLoggedIn ? setOpenDrawer(true) : setOpenLogin(true)
          }
          className="h-9 w-9 rounded-full bg-black text-white text-sm font-semibold"
        >
          U
        </button>
      </header>

      <ProfileLoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />
      <ProfileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onLoggedOut={() => setIsLoggedIn(false)}
      />

      {/* ================= CONTENT ================= */}
      <div className="bg-purple-50 text-purple-700 text-sm py-2 text-center">
  ⏱ Complete your booking in{" "}
  <span className="font-semibold">
    {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
    {String(timeLeft % 60).padStart(2, "0")}
  </span>{" "}
  mins
</div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* ================= EMPTY CART (DISTRICT STYLE) ================= */}
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

        {/* ================= CART CONTENT ================= */}
        {cart && (
          <div className="space-y-6">
            {/* TICKET CARD */}
            <div className="border rounded-xl p-5 flex justify-between items-start">
              <div>
                <h3 className="font-semibold">
                  {cart.eventTitle}
                </h3>

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

            {/* OFFERS */}
            <div className="border rounded-xl divide-y">
              <button
                onClick={() =>
                  router.push(
                    "/events/buy/checkout/promo/discount"
                  )
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
                  router.push(
                    "/events/buy/checkout/promo/payment"
                  )
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

            <button className="w-full bg-black text-white py-4 rounded-xl font-semibold">
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
              <span className="font-medium">
                {cart?.section}
              </span>{" "}
              tickets from your cart?
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
