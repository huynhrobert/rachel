"use client";

import { useState, useEffect } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

export function useCountdown(targetDate: Date): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    calculate(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculate(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}

function calculate(target: Date): Countdown {
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}
