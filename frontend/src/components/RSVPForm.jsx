import React, { useState } from "react";
import { Send, Heart, CheckCircle2, XCircle, Users } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "../hooks/use-toast";
import { createWish } from "../api";

export default function RSVPForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [statusValue, setStatusValue] = useState("katilacagim");
  const [people, setPeople] = useState("1");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Lütfen alanları doldurun",
        description: "İsim ve mesaj alanları boş bırakılamaz.",
      });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        status: statusValue,
        people: statusValue === "katilacagim" ? Number(people) : 1,
        message: message.trim(),
      };
      await createWish(payload);
      toast({
        title: "Teşekkürler 💐",
        description: "Tebrik ve duanız bize ulaştı.",
      });
      setName("");
      setMessage("");
      setPeople("1");
      setStatusValue("katilacagim");
      if (onSuccess) await onSuccess();
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Bir hata oluştu. Tekrar deneyiniz.";
      toast({
        title: "Gönderilemedi",
        description:
          typeof detail === "string"
            ? detail
            : "Lütfen biraz sonra tekrar deneyiniz.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
      <div>
        <label className="block text-xs tracking-[0.2em] uppercase text-[var(--brown-soft)] mb-2">
          Misafir Adı
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="İsminizi giriniz"
          className="bg-[var(--cream-soft)] border-[var(--gold)]/40 focus-visible:ring-[var(--gold)] h-11 font-body text-base"
        />
      </div>

      <div>
        <label className="block text-xs tracking-[0.2em] uppercase text-[var(--brown-soft)] mb-2">
          Katılım Onayı
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setStatusValue("katilacagim")}
            className={`flex items-center justify-center gap-2 py-3 rounded-md border transition-all ${
              statusValue === "katilacagim"
                ? "bg-[var(--sage)] text-[var(--cream-soft)] border-[var(--sage)]"
                : "bg-[var(--cream-soft)] text-[var(--brown-soft)] border-[var(--gold)]/40 hover:border-[var(--sage)]"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm">Katılacağım</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusValue("katilamayacagim")}
            className={`flex items-center justify-center gap-2 py-3 rounded-md border transition-all ${
              statusValue === "katilamayacagim"
                ? "bg-[var(--brown-soft)] text-[var(--cream-soft)] border-[var(--brown-soft)]"
                : "bg-[var(--cream-soft)] text-[var(--brown-soft)] border-[var(--gold)]/40 hover:border-[var(--brown-soft)]"
            }`}
          >
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Katılamayacağım</span>
          </button>
        </div>
      </div>

      {statusValue === "katilacagim" && (
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-[var(--brown-soft)] mb-2">
            Kişi Sayısı
          </label>
          <Select value={people} onValueChange={setPeople}>
            <SelectTrigger className="bg-[var(--cream-soft)] border-[var(--gold)]/40 h-11">
              <Users className="w-4 h-4 mr-2 text-[var(--gold-dark)]" />
              <SelectValue placeholder="Kişi sayısı seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} Kişi
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <label className="block text-xs tracking-[0.2em] uppercase text-[var(--brown-soft)] mb-2">
          Tebrik & Dua
        </label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Tebrik ve duanızı yazınız..."
          className="bg-[var(--cream-soft)] border-[var(--gold)]/40 focus-visible:ring-[var(--gold)] font-body text-base resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="btn-gold w-full h-12 rounded-md text-sm uppercase tracking-[0.2em] hover:bg-transparent"
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Heart className="w-4 h-4 animate-pulse" />
            Gönderiliyor...
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Send className="w-4 h-4" />
            Gönder
          </span>
        )}
      </Button>
    </form>
  );
}
