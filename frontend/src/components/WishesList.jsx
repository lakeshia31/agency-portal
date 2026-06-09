import React from "react";
import { CheckCircle2, XCircle, Users } from "lucide-react";
import { formatTimeAgo } from "../api";

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--sage)] to-[var(--gold-dark)] text-[var(--cream-soft)] flex items-center justify-center font-display text-sm shrink-0">
      {initials}
    </div>
  );
}

export default function WishesList({ wishes, loading }) {
  if (loading) {
    return (
      <p className="text-center text-[var(--brown-soft)]/70 italic font-body">
        Yükleniyor...
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-4 max-h-[420px] overflow-y-auto pr-2">
      {wishes.length === 0 && (
        <p className="text-center text-[var(--brown-soft)]/70 italic font-body">
          Henüz tebrik mesajı yok. İlk siz olun.
        </p>
      )}
      {wishes.map((w) => {
        const { date, time, ago } = formatTimeAgo(w.created_at);
        return (
          <div key={w.id} className="comment-card rounded-lg p-4 flex gap-3">
            <Avatar name={w.name} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-display text-[var(--brown)] truncate">
                  {w.name}
                </span>
                {w.status === "katilacagim" ? (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--sage)]/15 text-[var(--sage-dark)] border border-[var(--sage)]/30">
                    <CheckCircle2 className="w-3 h-3" />
                    Katılacağım
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--brown-soft)]/10 text-[var(--brown-soft)] border border-[var(--brown-soft)]/30">
                    <XCircle className="w-3 h-3" />
                    Katılamayacağım
                  </span>
                )}
                {w.status === "katilacagim" && w.people > 1 && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold-dark)] border border-[var(--gold)]/40">
                    <Users className="w-3 h-3" />
                    {w.people} Kişi
                  </span>
                )}
              </div>
              <p className="font-body text-[var(--brown-soft)] text-base leading-snug whitespace-pre-wrap break-words">
                {w.message}
              </p>
              <div className="text-[10px] tracking-wider uppercase text-[var(--brown-soft)]/60 mt-2">
                {date} • {time} · {ago}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
