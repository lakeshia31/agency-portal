import React from "react";

// Elegant SVG decorative elements

export function FloralDivider({ className = "" }) {
  return (
    <svg
      viewBox="0 0 320 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gold-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b89968" stopOpacity="0" />
          <stop offset="50%" stopColor="#b89968" stopOpacity="1" />
          <stop offset="100%" stopColor="#b89968" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 20 L120 20" stroke="url(#gold-g)" strokeWidth="1" />
      <path d="M200 20 L320 20" stroke="url(#gold-g)" strokeWidth="1" />
      <g transform="translate(160 20)" stroke="#b89968" strokeWidth="1" fill="none">
        <circle r="3" fill="#b89968" />
        <path d="M-30 0 Q-22 -10 -12 -4 Q-6 0 -12 4 Q-22 10 -30 0 Z" />
        <path d="M30 0 Q22 -10 12 -4 Q6 0 12 4 Q22 10 30 0 Z" />
        <path d="M-38 0 Q-44 -4 -38 -8" />
        <path d="M38 0 Q44 -4 38 -8" />
        <path d="M-38 0 Q-44 4 -38 8" />
        <path d="M38 0 Q44 4 38 8" />
      </g>
    </svg>
  );
}

export function CornerFloral({ className = "", rotate = 0, color = "#b89968" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="0.9" fill="none" opacity="0.7">
        {/* main vine */}
        <path d="M5 5 Q40 15 55 50 Q70 85 110 110" />
        {/* leaves */}
        <path d="M20 12 Q26 6 34 10 Q30 18 22 18 Q18 16 20 12 Z" fill={color} fillOpacity="0.18" />
        <path d="M40 25 Q48 22 54 28 Q50 36 42 34 Q38 30 40 25 Z" fill={color} fillOpacity="0.18" />
        <path d="M58 55 Q66 52 72 58 Q68 66 60 64 Q56 60 58 55 Z" fill={color} fillOpacity="0.18" />
        <path d="M78 80 Q86 77 92 83 Q88 91 80 89 Q76 85 78 80 Z" fill={color} fillOpacity="0.18" />
        {/* flowers (small circles) */}
        <circle cx="35" cy="28" r="2" fill={color} />
        <circle cx="55" cy="48" r="2.5" fill={color} />
        <circle cx="78" cy="72" r="2" fill={color} />
        {/* swirls */}
        <path d="M12 30 Q4 36 12 44 Q18 40 14 34" />
        <path d="M88 100 Q98 96 100 88 Q92 86 86 94" />
      </g>
    </svg>
  );
}

export function ArabesquePattern({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="ar-p" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M20 0 L40 20 L20 40 L0 20 Z"
            fill="none"
            stroke="#b89968"
            strokeWidth="0.6"
            opacity="0.35"
          />
          <circle cx="20" cy="20" r="2" fill="#b89968" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#ar-p)" />
    </svg>
  );
}

export function FlowerSpray({ className = "" }) {
  return (
    <svg
      viewBox="0 0 180 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" stroke="#6b7c5f" strokeWidth="1.2" opacity="0.55">
        <path d="M10 80 Q60 50 90 50 Q120 50 170 80" />
        <path d="M20 78 Q40 65 50 70" />
        <path d="M150 78 Q130 65 120 70" />
        <path d="M70 55 Q72 45 80 42" />
        <path d="M110 55 Q108 45 100 42" />
      </g>
      {/* leaves */}
      <g fill="#6b7c5f" opacity="0.55">
        <ellipse cx="30" cy="70" rx="8" ry="3" transform="rotate(-20 30 70)" />
        <ellipse cx="150" cy="70" rx="8" ry="3" transform="rotate(20 150 70)" />
        <ellipse cx="60" cy="60" rx="7" ry="2.6" transform="rotate(-30 60 60)" />
        <ellipse cx="120" cy="60" rx="7" ry="2.6" transform="rotate(30 120 60)" />
      </g>
      {/* flowers */}
      <g>
        <circle cx="90" cy="40" r="6" fill="#d4b88a" />
        <circle cx="90" cy="40" r="2.5" fill="#8a6f47" />
        <circle cx="80" cy="46" r="4" fill="#e8cfa3" />
        <circle cx="100" cy="46" r="4" fill="#e8cfa3" />
        <circle cx="55" cy="60" r="3.5" fill="#d4b88a" />
        <circle cx="125" cy="60" r="3.5" fill="#d4b88a" />
      </g>
    </svg>
  );
}

export function GeometricStar({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#b89968" strokeWidth="0.8" fill="none">
        <polygon points="50,10 61,38 90,38 67,55 76,82 50,66 24,82 33,55 10,38 39,38" />
        <polygon points="50,20 58,40 80,40 62,53 69,75 50,62 31,75 38,53 20,40 42,40" opacity="0.6" />
        <circle cx="50" cy="50" r="6" fill="#b89968" fillOpacity="0.3" />
      </g>
    </svg>
  );
}
