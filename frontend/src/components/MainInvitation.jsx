import React, { useEffect, useRef } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  Heart,
  ExternalLink,
  Coffee,
} from "lucide-react";
import Countdown from "./Countdown";
import RSVPForm from "./RSVPForm";
import WishesList from "./WishesList";
import {
  FloralDivider,
  CornerFloral,
  FlowerSpray,
  GeometricStar,
} from "./Ornaments";

// Hook: reveal-on-scroll using IntersectionObserver
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") || [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
      } else {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

function Ornament() {
  return (
    <div className="flex items-center justify-center my-4">
      <FloralDivider className="w-56 h-8" />
    </div>
  );
}

export default function MainInvitation({ data, wishes, loading, onWishSubmitted, guestName }) {
  const rootRef = useReveal();

  return (
    <div ref={rootRef} className="relative">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 paper-bg overflow-hidden">
        {/* corner florals */}
        <CornerFloral className="absolute top-0 left-0 w-32 md:w-44 h-32 md:h-44 opacity-90" rotate={0} />
        <CornerFloral className="absolute top-0 right-0 w-32 md:w-44 h-32 md:h-44 opacity-90" rotate={90} />
        <CornerFloral className="absolute bottom-0 left-0 w-32 md:w-44 h-32 md:h-44 opacity-90" rotate={270} />
        <CornerFloral className="absolute bottom-0 right-0 w-32 md:w-44 h-32 md:h-44 opacity-90" rotate={180} />

        {/* faded geometric star */}
        <GeometricStar className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 opacity-30" />

        <div className="text-center max-w-2xl reveal relative z-10">
          <p className="font-arabic text-[var(--gold-dark)] text-2xl md:text-3xl mb-4">
            بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-[var(--brown-soft)]/80 text-sm tracking-[0.4em] uppercase mb-6">
            Hafızlık Merasimi
          </p>
          <h1 className="font-script text-7xl md:text-8xl gold-text leading-none mb-2">
            {data.hafizName.split(" ")[0]}
          </h1>
          <h1 className="font-script text-6xl md:text-7xl gold-text leading-none mb-6">
            {data.hafizName.split(" ").slice(1).join(" ")}
          </h1>

          <Ornament />

          <p className="text-[var(--brown-soft)] font-body text-lg md:text-xl italic max-w-lg mx-auto leading-relaxed">
            “Sonra biz o kitabı kullarımızdan süzüp seçtiklerimize miras bıraktık.”
          </p>
          <p className="text-[var(--brown-soft)]/70 text-sm mt-2">
            (Fâtır Suresi, 32. Ayet-i Kerime)
          </p>

          <Ornament />

          <div className="flex flex-col items-center gap-1 mt-4">
            <div className="text-[var(--sage-dark)] uppercase text-xs tracking-[0.4em]">
              {data.eventDay}
            </div>
            <div className="font-display text-3xl md:text-4xl text-[var(--brown)]">
              {data.eventDate}
            </div>
            <div className="text-[var(--brown-soft)]/80 text-sm tracking-[0.3em] uppercase">
              {data.eventTime}
            </div>
          </div>

          <FlowerSpray className="w-64 h-20 mx-auto mt-8 opacity-90" />
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative px-6 py-16 sage-bg overflow-hidden">
        <CornerFloral className="absolute -top-4 -left-4 w-28 h-28 opacity-60" rotate={0} />
        <CornerFloral className="absolute -bottom-4 -right-4 w-28 h-28 opacity-60" rotate={180} />
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-[var(--brown-soft)] font-body italic text-lg mb-2">
            {guestName} ile birlikte bu özel güne...
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--brown)] mb-8">
            Save the Date
          </h3>
          <Countdown targetISO={data.eventDateISO} />
          <a
            href={data.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs tracking-[0.25em] uppercase mt-8"
          >
            <Calendar className="w-4 h-4" />
            Takvime Ekle
          </a>
        </div>
      </section>

      {/* GREETING */}
      <section className="px-6 py-20 paper-bg relative overflow-hidden">
        <FlowerSpray className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-14 opacity-80 rotate-180" />
        <div className="max-w-2xl mx-auto text-center reveal relative z-10">
          <p className="font-arabic text-[var(--gold-dark)] text-2xl mb-6">
            ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
          </p>
          <Ornament />
          <h2 className="font-display text-2xl md:text-3xl text-[var(--brown)] leading-snug">
            Değerli Misafirlerimiz,
          </h2>
          <p className="font-body text-[var(--brown-soft)] text-lg md:text-xl leading-relaxed mt-4">
            Hafızlığımızı taçlandırdığımız merasimimize,
            <br /> sizlerin de teşriflerini bekleriz.
          </p>
          <FlowerSpray className="w-48 h-14 mx-auto mt-6 opacity-80" />
        </div>
      </section>

      {/* HAFIZ CARD */}
      <section className="px-6 py-20 sage-bg relative overflow-hidden">
        <GeometricStar className="absolute top-8 left-8 w-20 h-20 opacity-25" />
        <GeometricStar className="absolute bottom-8 right-8 w-20 h-20 opacity-25" />
        <div className="max-w-md mx-auto reveal relative z-10">
          <div className="text-center mb-8">
            <p className="text-[var(--brown-soft)] tracking-[0.4em] uppercase text-xs mb-2">
              Hafızımız
            </p>
            <Ornament />
          </div>

          <div className="arch-frame bg-[var(--cream-soft)] px-8 py-12 text-center relative shadow-[0_8px_32px_-12px_rgba(138,111,71,0.3)]">
            <BookOpen className="w-10 h-10 text-[var(--gold-dark)] mx-auto mb-4" />
            <p className="text-[var(--sage-dark)] tracking-[0.3em] uppercase text-xs mb-2">
              Hafız
            </p>
            <h3 className="font-script text-6xl gold-text leading-none mb-3">
              {data.hafizName}
            </h3>
            <FloralDivider className="w-40 h-6 mx-auto my-2" />
            <p className="font-body italic text-[var(--brown-soft)] mt-3">
              “Kur’ân’ı hayatına nakşeden, kalbi nur ile dolan.”
            </p>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="px-6 py-20 paper-bg relative overflow-hidden">
        <CornerFloral className="absolute -top-2 -left-2 w-28 h-28 opacity-60" rotate={0} />
        <CornerFloral className="absolute -top-2 -right-2 w-28 h-28 opacity-60" rotate={90} />
        <CornerFloral className="absolute -bottom-2 -left-2 w-28 h-28 opacity-60" rotate={270} />
        <CornerFloral className="absolute -bottom-2 -right-2 w-28 h-28 opacity-60" rotate={180} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12 reveal">
            <p className="text-[var(--brown-soft)] tracking-[0.4em] uppercase text-xs mb-2">
              Merasimimiz
            </p>
            <Ornament />
            <h2 className="font-display text-3xl md:text-4xl text-[var(--brown)]">
              Program Detayları
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Main Event */}
            <div className="reveal bg-[var(--cream-soft)] border border-[var(--gold)]/30 rounded-lg p-8 text-center shadow-[0_4px_24px_-12px_rgba(138,111,71,0.25)]">
              <BookOpen className="w-8 h-8 text-[var(--gold-dark)] mx-auto mb-3" />
              <h3 className="font-display text-xl text-[var(--brown)] mb-1">
                Hafızlık Merasimi
              </h3>
              <FloralDivider className="w-40 h-5 mx-auto my-3" />
              <p className="text-[var(--sage-dark)] uppercase tracking-[0.3em] text-[11px] mb-1">
                {data.eventDay}
              </p>
              <p className="font-display text-2xl text-[var(--brown)]">
                {data.eventDate}
              </p>
              <p className="flex items-center justify-center gap-2 text-[var(--brown-soft)] mt-2">
                <Clock className="w-4 h-4" />
                {data.eventTime}
              </p>
              <p className="text-[var(--brown-soft)] font-body mt-4 leading-relaxed">
                {data.venueAddress}
              </p>
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] mt-5"
              >
                <MapPin className="w-4 h-4" />
                Konum
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Ikram */}
            <div className="reveal bg-[var(--cream-soft)] border border-[var(--gold)]/30 rounded-lg p-8 text-center shadow-[0_4px_24px_-12px_rgba(138,111,71,0.25)]">
              <Coffee className="w-8 h-8 text-[var(--gold-dark)] mx-auto mb-3" />
              <h3 className="font-display text-xl text-[var(--brown)] mb-1">
                İkram
              </h3>
              <FloralDivider className="w-40 h-5 mx-auto my-3" />
              <p className="text-[var(--sage-dark)] uppercase tracking-[0.3em] text-[11px] mb-1">
                {data.eventDay}
              </p>
              <p className="font-display text-2xl text-[var(--brown)]">
                {data.eventDate}
              </p>
              <p className="text-[var(--brown-soft)] italic mt-2">
                Programımızdan sonra
              </p>
              <p className="text-[var(--brown-soft)] font-body mt-4 leading-relaxed">
                {data.ikramNote}
                <br />
                Aynı adreste sizleri ağırlamaktan mutluluk duyacağız.
              </p>
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] mt-5"
              >
                <MapPin className="w-4 h-4" />
                Konum
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="px-6 py-20 sage-bg relative overflow-hidden">
        <CornerFloral className="absolute top-0 left-0 w-28 h-28 opacity-50" rotate={0} />
        <CornerFloral className="absolute bottom-0 right-0 w-28 h-28 opacity-50" rotate={180} />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-10 reveal">
            <p className="text-[var(--brown-soft)] tracking-[0.4em] uppercase text-xs mb-2">
              RSVP
            </p>
            <Ornament />
            <h2 className="font-display text-3xl md:text-4xl text-[var(--brown)]">
              Tebrik & Dua
            </h2>
            <p className="font-body text-[var(--brown-soft)] mt-3">
              Lütfen katılım durumunuzu bildiriniz.
            </p>
          </div>
          <div className="reveal">
            <RSVPForm onSuccess={onWishSubmitted} />
          </div>
        </div>
      </section>

      {/* WISHES */}
      <section className="px-6 py-20 paper-bg relative overflow-hidden">
        <GeometricStar className="absolute top-6 right-6 w-16 h-16 opacity-30" />
        <GeometricStar className="absolute bottom-6 left-6 w-16 h-16 opacity-30" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-8 reveal">
            <Heart className="w-6 h-6 text-[var(--gold-dark)] mx-auto mb-2" />
            <h2 className="font-display text-2xl md:text-3xl text-[var(--brown)]">
              Tebrik Mesajları
            </h2>
            <p className="text-[var(--brown-soft)]/80 text-sm mt-1">
              {wishes.length} kişi tebrik etti
            </p>
          </div>
          <div className="reveal">
            <WishesList wishes={wishes} loading={loading} />
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative px-6 py-20 bg-gradient-to-b from-[var(--sage-dark)] to-[var(--brown)] text-center text-[var(--cream-soft)] overflow-hidden">
        <CornerFloral className="absolute -top-2 -left-2 w-32 h-32 opacity-70" rotate={0} color="#d4b88a" />
        <CornerFloral className="absolute -top-2 -right-2 w-32 h-32 opacity-70" rotate={90} color="#d4b88a" />
        <div className="max-w-2xl mx-auto reveal relative z-10">
          <Ornament />
          <h2 className="font-display text-2xl md:text-3xl leading-snug text-[var(--cream-soft)]">
            Gösterdiğiniz ilgi, destek ve iyi dilekleriniz için
            <br /> içtenlikle teşekkür ederiz.
          </h2>
          <p className="font-body italic mt-4 text-[var(--cream-soft)]/90">
            Hepinize sağlık, mutluluk ve bereket dolu günler dileriz.
          </p>
          <p className="font-arabic text-[var(--gold-light)] text-2xl mt-6">
            وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </p>
          <Ornament />
          <p className="font-script text-5xl gold-text mt-2">{data.hafizName}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 bg-[var(--brown)] text-center text-[var(--cream-soft)]/70">
        <p className="text-xs tracking-[0.3em] uppercase">Made with</p>
        <Heart className="w-4 h-4 mx-auto my-1 text-[var(--gold-light)]" />
        <p className="font-script text-3xl text-[var(--gold-light)]">
          Berra Durur Davetiyesi
        </p>
        <p className="text-xs mt-2">© 2026 · Hafızlık Merasimi</p>
      </footer>
    </div>
  );
}
