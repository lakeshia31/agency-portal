import React, { useEffect, useState } from "react";

function calcTimeLeft(targetISO) {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000);
  diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetISO }) {
  const [t, setT] = useState(calcTimeLeft(targetISO));
  useEffect(() => {
    const id = setInterval(() => setT(calcTimeLeft(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  const items = [
    { label: "Gün", value: t.days },
    { label: "Saat", value: t.hours },
    { label: "Dakika", value: t.minutes },
    { label: "Saniye", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-md mx-auto">
      {items.map((it) => (
        <div
          key={it.label}
          className="cd-box rounded-md py-4 md:py-5 text-center"
        >
          <div className="font-display text-2xl md:text-4xl text-[var(--gold-light)] tabular-nums">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase mt-1 text-[var(--cream-soft)]/80">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
