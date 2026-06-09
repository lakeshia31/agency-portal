import React from "react";
import { Mail, ChevronDown } from "lucide-react";

export default function CoverScreen({ guestName, onOpen, hafizName, eventDate, venueShort }) {
  return (
    <div className="fixed inset-0 z-50 cover-bg flex items-center justify-center px-6 overflow-hidden">
      {/* Floating petals */}
      <div className="particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 7) % 100}%`,
              animationDuration: `${10 + (i % 6) * 2}s`,
              animationDelay: `${(i % 5) * 1.5}s`,
              fontSize: `${0.9 + (i % 4) * 0.3}rem`,
            }}
          >
            ❀
          </span>
        ))}
      </div>

      {/* Decorative top ornament */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[var(--gold-light)] text-3xl tracking-[0.5em] opacity-80">
        ❧
      </div>

      <div className="relative text-center max-w-md w-full animate-fade-in">
        <p className="font-arabic text-[var(--gold-light)] text-2xl mb-2 tracking-wide">
          بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-[var(--gold-light)] text-sm tracking-[0.4em] uppercase mb-8 font-medium">
          The Invitation
        </p>

        <h2 className="font-display text-[var(--gold-light)] text-2xl md:text-3xl tracking-wide mb-3">
          {hafizName}
        </h2>
        <div className="flex items-center justify-center gap-3 text-[var(--cream-soft)] mb-6">
          <span className="h-px w-12 bg-[var(--gold)]/70" />
          <span className="font-script text-4xl text-[var(--gold-light)]">Hafızlık</span>
          <span className="h-px w-12 bg-[var(--gold)]/70" />
        </div>

        <p className="text-[#f5efe6] text-lg font-body mb-1 font-medium">
          {eventDate}
        </p>
        <p className="text-[var(--gold-light)] text-sm tracking-[0.25em] uppercase mb-10 font-medium">
          {venueShort}
        </p>

        {/* Guest greeting card */}
        <div className="bg-[#1c1812]/60 border border-[var(--gold)]/70 rounded-md px-6 py-5 mb-8 backdrop-blur-md">
          <p className="text-[var(--gold-light)] text-xs tracking-[0.3em] uppercase mb-2 font-medium">
            Kıymetli Misafirimiz
          </p>
          <p className="font-display text-[#f5efe6] text-xl">{guestName}</p>
        </div>

        <button
          onClick={onOpen}
          className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm uppercase font-medium music-btn-pulse"
        >
          <Mail className="w-4 h-4" />
          Davetiyeyi Aç
        </button>

        <div className="mt-10 text-[var(--gold-light)]/70 animate-float">
          <ChevronDown className="w-6 h-6 mx-auto" />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--gold-light)] text-3xl tracking-[0.5em] opacity-80">
        ❧
      </div>
    </div>
  );
}
