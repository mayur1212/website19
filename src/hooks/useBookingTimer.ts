"use client";

import { useEffect, useState } from "react";

const BOOKING_DURATION = 6 * 60 + 30; // 06:30 in seconds

export function startBookingTimer() {
  localStorage.setItem(
    "bookingTimerStart",
    Date.now().toString()
  );
}

export function useBookingTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(BOOKING_DURATION);

  useEffect(() => {
    const start = localStorage.getItem("bookingTimerStart");

    if (!start) {
      setTimeLeft(0);
      return;
    }

    const startTime = Number(start);

    const update = () => {
      const elapsed = Math.floor(
        (Date.now() - startTime) / 1000
      );

      const remaining = BOOKING_DURATION - elapsed;

      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
