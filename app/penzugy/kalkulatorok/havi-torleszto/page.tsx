"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CircleAlert,
  CircleCheck,
} from "lucide-react";

function formatFt(value: number) {
  return new Intl.NumberFormat("hu-HU").format(Math.round(value)) + " Ft";
}

function payment(amount: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (r === 0) return amount / months;
  return (amount * r) / (1 - Math.pow(1 + r, -months));
}

export default function HaviTorlesztoPage() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("60");
  const [result, setResult] = useState<null | {
    low: number;
    high: number;
    lowTotal: number;
    highTotal: number;
  }>(null);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const principal = Number(amount);
    const term = Number(months);

    if (principal <= 0 || term <= 0) return;

    // Tájékoztató számítási sáv – nem banki ajánlat.
    // A két technikai kamatfeltételezés kizárólag a sáv szemléltetését szolgálja.
    const lowerRate = 10;
    const upperRate = 18;

    const low = payment(principal, lowerRate, term);
    const high = payment(principal, upperRate, term);

    setResult({
      low,
      high,
      lowTotal: low * term,
      highTotal: high * term,
    });
  }

  const contactHref = result
    ? `/penzugy/kapcsolat?tema=hitel&hitelosszeg=${Number(amount)}&futamido=${Number(months)}&becsultTorlesztoMin=${Math.round(result.low)}&becsultTorlesztoMax=${Math.round(result.high)}`
    : "/penzugy/kapcsolat";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4A3425] via-[#211813] to-[#050505] text-[#efe5d6]">
      <div className="mx-auto max-w-[1350px] px-6 pb-24 pt-8 lg:px-10">
        <Link
          href="/penzugy/kalkulatorok"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8a166] transition hover:text-[#ead2aa]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a kalkulátorokhoz
        </Link>

        <section className="mt-10 grid overflow-hidden rounded-[38px] border border-white/10 bg-[#101010] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c8a166]/25 bg-[#c8a166]/10 text-[#d7b171]">
              <Calculator className="h-7 w-7" />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#c8a166]">
              Tájékoztató törlesztési sáv
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Mennyi lehet a havi törlesztőm?
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#bdb4a8]">
              Add meg, mekkora összeget szeretnél és milyen futamidőben
              gondolkodsz. Nem egy konkrét bank ajánlatát mutatjuk meg, hanem
              egy előzetes törlesztési sávot.
            </p>

            <div className="mt-8 rounded-[24px] border border-[#c8a166]/20 bg-[#1b1713] p-6">
              <div className="flex gap-3">
                <CircleAlert className="mt-1 h-5 w-5 shrink-0 text-[#d7b171]" />
                <p className="text-sm leading-6 text-[#c8bfb3]">
                  A tényleges törlesztőrészletet a hitel típusa, a jövedelem,
                  a banki minősítés, az aktuális kamat és egyéb feltételek is
                  befolyásolják. Ezért az eredmény nem ajánlat.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f7f2ea] p-8 text-[#211913] sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6b42]">
              Gyors számítás
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Add meg a tervezett hitelt
            </h2>

            <form onSubmit={calculate} className="mt-8">
              <label className="font-semibold">Tervezett hitelösszeg</label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="100000"
                  step="100000"
                  required
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setResult(null);
                  }}
                  placeholder="pl. 3 000 000"
                  className="w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 pr-14 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#887b6d]">
                  Ft
                </span>
              </div>

              <label className="mt-6 block font-semibold">Futamidő</label>
              <select
                value={months}
                onChange={(e) => {
                  setMonths(e.target.value);
                  setResult(null);
                }}
                className="mt-2 w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 outline-none focus:border-[#a68150]"
              >
                <option value="36">36 hónap</option>
                <option value="48">48 hónap</option>
                <option value="60">60 hónap</option>
                <option value="72">72 hónap</option>
                <option value="84">84 hónap</option>
                <option value="96">96 hónap</option>
              </select>

              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#2b2118] px-7 py-4 font-semibold text-white transition hover:bg-[#493623]"
              >
                Kiszámolom
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {result && (
              <div className="mt-9 border-t border-[#d8cdbd] pt-8">
                <div className="flex items-start gap-3">
                  <CircleCheck className="mt-1 h-6 w-6 shrink-0 text-[#8a6b42]" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8a6b42]">
                      Előzetes eredmény
                    </p>
                    <h3 className="mt-2 font-serif text-3xl font-semibold">
                      Becsült havi törlesztési sáv
                    </h3>
                  </div>
                </div>

                <div className="mt-7 rounded-[26px] border border-[#d8cdbd] bg-white p-7">
                  <p className="text-sm font-semibold text-[#766a5d]">
                    Várható nagyságrend
                  </p>
                  <p className="mt-3 font-serif text-4xl font-semibold text-[#2b2118]">
                    {formatFt(result.low)} – {formatFt(result.high)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#8b8176]">
                    havonta, a kalkulátor tájékoztató feltételezései alapján.
                  </p>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <ResultBox
                    label="Becsült teljes visszafizetés alsó értéke"
                    value={formatFt(result.lowTotal)}
                  />
                  <ResultBox
                    label="Becsült teljes visszafizetés felső értéke"
                    value={formatFt(result.highTotal)}
                  />
                </div>

                <div className="mt-7 rounded-[24px] bg-[#2b2118] p-6 text-white">
                  <p className="font-serif text-2xl font-semibold">
                    Melyik konkrét ajánlat illik hozzád?
                  </p>
                  <p className="mt-3 leading-7 text-white/70">
                    Itt már nem találgatunk. A részletes összehasonlításnál a
                    jövedelmedet, a meglévő kötelezettségeidet és az aktuális
                    lehetőségeket is figyelembe vesszük.
                  </p>

                  <Link
                    href={contactHref}
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#c8a166] px-6 py-3.5 font-bold text-[#17110b] transition hover:bg-[#d8b77e]"
                  >
                    Kérem a személyre szabott összehasonlítást
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <p className="mx-auto mt-8 max-w-[1000px] text-center text-xs leading-6 text-white/45">
          A kalkuláció kizárólag tájékoztató becslés. Nem banki ajánlat,
          hitelbírálat vagy szerződéses feltétel. A tényleges kamat,
          törlesztőrészlet és teljes visszafizetés az egyedi hitelbírálat és az
          aktuális kondíciók alapján eltérhet.
        </p>
      </div>
    </main>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-[#d8cdbd] bg-white p-5">
      <p className="text-sm font-semibold leading-5 text-[#766a5d]">{label}</p>
      <p className="mt-2 font-serif text-2xl font-semibold text-[#2b2118]">
        {value}
      </p>
    </div>
  );
}