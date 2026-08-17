"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  goal: string;
  timeHorizon: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  goal: "",
  timeHorizon: "",
  message: "",
  consent: false,
};

export default function LtpPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/ltp", {
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
    <main className="min-h-screen bg-[#F3EBDD] text-[#1D211E]">
      {/* VISSZA */}
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#74654F] transition hover:text-[#1D211E]"
        >
          <span aria-hidden="true">←</span>
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-24">
        {/* BAL OLDAL */}
        <div className="flex flex-col justify-center">
          <div className="mb-8 inline-flex w-fit items-center rounded-full border border-[#CFC0AA] bg-white/40 px-5 py-3 font-semibold text-[#665A49]">
            Lakáscélú megtakarítás
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9B7B4F]">
            LTP
          </p>

          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
            Az otthonodhoz vezető út
            <span className="block text-[#9B7B4F]">
              a tervezéssel kezdődik.
            </span>
          </h1>

          <p className="mt-8 max-w-[680px] font-serif text-xl leading-9 text-[#665A49]">
            Lakásvásárlás, felújítás vagy egy későbbi otthon megteremtése:
            megnézzük, milyen lakáscélod van, mennyi idő áll rendelkezésedre,
            és hogyan építhető fel hozzá tudatosan a megtakarítás.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="rounded-full bg-[#20231F] px-8 py-4 font-serif text-lg font-semibold text-white transition hover:bg-[#343831]"
            >
              Személyre szabott lehetőséget kérek →
            </a>

            <a
              href="#tervezes"
              className="rounded-full border border-[#BFAE94] px-8 py-4 font-serif text-lg font-semibold transition hover:bg-white/40"
            >
              Hogyan tervezzünk?
            </a>
          </div>
        </div>

        {/* PÉTER */}
        <div className="relative min-h-[650px] lg:min-h-[720px]">
          <div className="absolute inset-x-8 bottom-0 top-6 rounded-t-[90px] bg-[#D8CDBD] lg:left-8 lg:right-0" />

          <div className="absolute left-12 top-16 h-40 w-40 rounded-full border border-[#B7A98F]/60" />
          <div className="absolute right-8 top-8 h-64 w-64 rounded-full border border-[#B7A98F]/40" />

          <Image
            src="/peter-ltp.png"
            alt="Péter – lakáscélú megtakarítás"
            fill
            priority
            className="relative z-10 object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div className="absolute bottom-10 left-6 z-20 max-w-[350px] rounded-[28px] bg-[#252722]/95 p-6 text-white shadow-2xl lg:left-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D9CCB8]">
              Péter segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, hogyan kerülhet közelebb a saját otthonod.
            </p>
          </div>
        </div>
      </section>

      {/* TERVEZÉS */}
      <section
        id="tervezes"
        className="bg-[#20231F] px-6 py-20 text-[#F4EBDD] lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D6B889]">
                Nem csak megtakarítás
              </p>

              <h2 className="mt-4 max-w-[520px] font-serif text-5xl font-semibold leading-[1.02]">
                Először azt nézzük meg, milyen otthont tervezel.
              </h2>

              <p className="mt-7 max-w-[560px] font-serif text-xl leading-9 text-[#D9D0C1]">
                Más lehet megfelelő annak, aki néhány éven belül vásárolna,
                és más annak, aki felújításra vagy egy későbbi lakáscélra
                készül. A kiindulópont mindig a saját terved és
                élethelyzeted.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon="⌂"
                title="Mi a lakáscélod?"
                text="Vásárlás, építés, felújítás vagy egy későbbi otthon megteremtése."
              />

              <InfoCard
                icon="◷"
                title="Mennyi időd van?"
                text="Megnézzük, mikorra szeretnéd elérni a kitűzött lakáscélt."
              />

              <InfoCard
                icon="↗"
                title="Mennyit tennél félre?"
                text="Olyan vállalható összeget keresünk, amely hosszabb távon is tartható."
              />

              <InfoCard
                icon="✓"
                title="Mi van már most?"
                text="A meglévő megtakarításokat és lehetőségeket is figyelembe vesszük."
              />
            </div>
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section
        id="kapcsolat"
        className="px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9B7B4F]">
              Személyre szabva
            </p>

            <h2 className="mt-5 max-w-[580px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, hogyan illeszthető a megtakarítás a lakáscélodhoz.
            </h2>

            <p className="mt-7 max-w-[580px] font-serif text-xl leading-9 text-[#665A49]">
              Add meg az alapadataidat és azt, mire szeretnél készülni.
              A lehetőségeket a célodhoz, az időtávhoz és a vállalható
              megtakarításhoz igazítjuk.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[38px] bg-[#FBF8F2] p-7 shadow-xl shadow-black/5 sm:p-10"
          >
            <label className="block font-serif text-lg font-semibold">
              Név
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Teljes név"
              required
              className="mt-3 w-full rounded-2xl border border-[#D8CCBA] bg-white px-5 py-4 outline-none placeholder:text-[#A9A0A4] focus:border-[#9B7B4F]"
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block font-serif text-lg font-semibold">
                  Telefonszám
                </label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="+36..."
                  className="mt-3 w-full rounded-2xl border border-[#D8CCBA] bg-white px-5 py-4 outline-none placeholder:text-[#A9A0A4] focus:border-[#9B7B4F]"
                />
              </div>

              <div>
                <label className="block font-serif text-lg font-semibold">
                  E-mail cím
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="nev@email.hu"
                  className="mt-3 w-full rounded-2xl border border-[#D8CCBA] bg-white px-5 py-4 outline-none placeholder:text-[#A9A0A4] focus:border-[#9B7B4F]"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block font-serif text-lg font-semibold">
                  Mi a lakáscélod?
                </label>

                <select
                  value={form.goal}
                  onChange={(e) =>
                    setForm({ ...form, goal: e.target.value })
                  }
                  className="mt-3 w-full rounded-2xl border border-[#D8CCBA] bg-white px-5 py-4 text-[#1D211E] outline-none focus:border-[#9B7B4F]"
                >
                  <option value="">Válassz...</option>
                  <option value="lakasvasarlas">Lakásvásárlás</option>
                  <option value="hazvasarlas">Házvásárlás</option>
                  <option value="epites">Építés</option>
                  <option value="felujitas">Felújítás</option>
                  <option value="kesobbi-lakascel">
                    Későbbi lakáscél
                  </option>
                  <option value="meg-nem-tudom">
                    Még nem tudom pontosan
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-serif text-lg font-semibold">
                  Mikorra tervezed?
                </label>

                <select
                  value={form.timeHorizon}
                  onChange={(e) =>
                    setForm({ ...form, timeHorizon: e.target.value })
                  }
                  className="mt-3 w-full rounded-2xl border border-[#D8CCBA] bg-white px-5 py-4 text-[#1D211E] outline-none focus:border-[#9B7B4F]"
                >
                  <option value="">Válassz...</option>
                  <option value="1-3-ev">1–3 éven belül</option>
                  <option value="3-5-ev">3–5 éven belül</option>
                  <option value="5-ev-felett">5 évnél később</option>
                  <option value="meg-nem-tudom">
                    Még nem tudom
                  </option>
                </select>
              </div>
            </div>

            <label className="mt-6 block font-serif text-lg font-semibold">
              Miben segíthetünk?
            </label>

            <textarea
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              placeholder="Írd le röviden, milyen lakáscélra szeretnél felkészülni..."
              rows={5}
              className="mt-3 w-full resize-none rounded-2xl border border-[#D8CCBA] bg-white px-5 py-4 outline-none placeholder:text-[#A9A0A4] focus:border-[#9B7B4F]"
            />

            <label className="mt-6 flex cursor-pointer items-start gap-3 font-serif text-base leading-6 text-[#665A49]">
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
              className="mt-8 w-full rounded-full bg-[#20231F] px-8 py-4 font-serif text-lg font-semibold text-white transition hover:bg-[#343831] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Személyre szabott lehetőséget kérek"}
            </button>

            {status && (
              <p className="mt-5 text-center font-serif text-base">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="min-h-[300px] rounded-[30px] border border-white/10 bg-[#292C27] p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1E7D5] text-2xl text-[#20231F]">
        {icon}
      </div>

      <h3 className="mt-8 font-serif text-3xl font-semibold">
        {title}
      </h3>

      <p className="mt-5 font-serif text-lg leading-8 text-[#D9D0C1]">
        {text}
      </p>
    </div>
  );
}