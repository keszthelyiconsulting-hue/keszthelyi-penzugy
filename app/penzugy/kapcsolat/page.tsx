"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Mail,
  MessageSquareText,
  PhoneCall,
  Sparkles,
  UserRound,
} from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  preferredContact: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  topic: "",
  preferredContact: "",
  message: "",
  consent: false,
};

export default function KapcsolatPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/kapcsolat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Az üzenet elküldése nem sikerült.");
      }

      setStatus("Köszönjük! Hamarosan felvesszük veled a kapcsolatot.");
      setForm(initialForm);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Az üzenet elküldése nem sikerült.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4A3425] via-[#211813] to-[#050505] text-[#efe5d6]">
      <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8a166] transition hover:text-[#ead2aa]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>

        <section className="relative mt-10 overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-[#191919] via-[#121212] to-[#090909]">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#c8a166]/10 blur-3xl" />

          <div className="relative grid min-h-[590px] items-center gap-8 px-7 py-12 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-14 lg:py-10">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c8a166]/30 bg-[#c8a166]/10 px-4 py-2 text-sm font-semibold text-[#d9b97f]">
                <Sparkles className="h-4 w-4" />
                Kapcsolat
              </div>

              <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
                Beszéljük át,
                <span className="block text-[#c8a166]">
                  mire van szükséged.
                </span>
              </h1>

              <p className="mt-7 max-w-[720px] text-lg leading-8 text-[#cfc7bc]">
                Írd meg röviden, miben szeretnél segítséget kérni, és felvesszük
                veled a kapcsolatot. Nem kell kész pénzügyi megoldással
                érkezned — elég, ha elmondod a célodat.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <ContactCard
                  icon={<Mail className="h-5 w-5" />}
                  title="E-mail"
                  text="info@keszthelyiconsulting.com"
                />
                <ContactCard
                  icon={<PhoneCall className="h-5 w-5" />}
                  title="Visszahívás"
                  text="Add meg a telefonszámod, és visszahívunk."
                />
                <ContactCard
                  icon={<Clock3 className="h-5 w-5" />}
                  title="Időpont"
                  text="Jelöld meg, hogyan szeretnél egyeztetni."
                />
                <ContactCard
                  icon={<UserRound className="h-5 w-5" />}
                  title="Személyes segítség"
                  text="Lakossági és vállalkozói pénzügyekben is."
                />
              </div>
            </div>

            <div className="relative min-h-[470px] lg:min-h-[580px]">
              <Image
                src="/sziporka-peter-segits-valasztani.png"
                alt="Sziporka és Péter"
                fill
                priority
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[34px] border border-[#c8a166]/20 bg-[#121212] p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#c8a166]">
              Hogyan segíthetünk?
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold">
              Egy rövid üzenet is elég az induláshoz.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#bfb6aa]">
              Ha már tudod, milyen terméket keresel, írd meg. Ha még nem tudod
              pontosan, az sem gond — mondd el, mit szeretnél elérni.
            </p>

            <div className="mt-8 space-y-4">
              <InfoLine text="Lakossági hitelek és otthonteremtés" />
              <InfoLine text="Biztosítások és családi védelem" />
              <InfoLine text="Megtakarítások és nyugdíjtervezés" />
              <InfoLine text="Folyószámla, hitelkártya és lízing" />
              <InfoLine text="KKV hitel, KKV betét és vállalati pénzügyek" />
            </div>

            <Link
              href="/penzugy/segits-valasztani"
              className="mt-9 inline-flex items-center gap-3 font-semibold text-[#d7b171]"
            >
              Még nem tudom pontosan, mire van szükségem
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[40px] bg-[#f7f2ea] p-7 text-[#211913] shadow-2xl shadow-black/20 sm:p-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c8a166]/20 text-[#805f32]">
                <MessageSquareText className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a6b42]">
                  Kapcsolatfelvétel
                </p>
                <h2 className="font-serif text-3xl font-semibold">
                  Írj nekünk
                </h2>
              </div>
            </div>

            <div className="mt-8">
              <label className="font-semibold">Név</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Teljes név"
                className="mt-2 w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Telefonszám</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+36..."
                  className="mt-2 w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail cím</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nev@email.hu"
                  className="mt-2 w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Miben kérsz segítséget?</label>
              <select
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 outline-none focus:border-[#a68150] ${
                  form.topic ? "text-[#211913]" : "text-[#aaa096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="hitel">Hitel / finanszírozás</option>
                <option value="otthon">Otthonteremtés</option>
                <option value="biztositas">Biztosítás</option>
                <option value="megtakaritas">Megtakarítás</option>
                <option value="bankolas">Folyószámla / hitelkártya</option>
                <option value="lizing">Lakossági lízing</option>
                <option value="vallalkozas">Vállalkozói pénzügyek</option>
                <option value="nem-tudom">Még nem tudom pontosan</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Hogyan szeretnéd, hogy keressünk?
              </label>
              <select
                value={form.preferredContact}
                onChange={(e) =>
                  setForm({ ...form, preferredContact: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 outline-none focus:border-[#a68150] ${
                  form.preferredContact ? "text-[#211913]" : "text-[#aaa096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="telefon">Telefonon</option>
                <option value="email">E-mailben</option>
                <option value="mindegy">Mindegy</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Üzenet</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                required
                placeholder="Írd le röviden, miben szeretnél segítséget kérni..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
              />
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#665d53]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) =>
                  setForm({ ...form, consent: e.target.checked })
                }
                className="mt-1 h-4 w-4"
              />
              <span>
                Hozzájárulok ahhoz, hogy a megadott elérhetőségeimen
                kapcsolatfelvétel céljából megkeressenek.
              </span>
            </label>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#2b2118] px-7 py-4 font-semibold text-white transition hover:bg-[#493623] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Üzenetet küldök"}
              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-semibold text-[#8a6b42]">
                {status}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-3 text-[#d7b171]">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#aaa39a]">{text}</p>
    </div>
  );
}

function InfoLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-[#d8cec0]">
      <span className="h-2 w-2 rounded-full bg-[#c8a166]" />
      <span>{text}</span>
    </div>
  );
}