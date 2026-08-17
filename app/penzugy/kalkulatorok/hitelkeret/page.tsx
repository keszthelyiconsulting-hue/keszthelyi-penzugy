"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CircleAlert,
  CircleCheck,
  WalletCards,
} from "lucide-react";

function formatFt(value: number) {
  return new Intl.NumberFormat("hu-HU").format(Math.max(0, Math.round(value))) + " Ft";
}

export default function HitelkeretPage() {
  const [income, setIncome] = useState("");
  const [existingPayments, setExistingPayments] = useState("");
  const [result, setResult] = useState<null | {
    legalLimit: number;
    availablePayment: number;
    jtmPercent: number;
    planningPayment: number;
  }>(null);

  const incomeNumber = useMemo(() => Number(income) || 0, [income]);
  const existingNumber = useMemo(
    () => Number(existingPayments) || 0,
    [existingPayments],
  );

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (incomeNumber <= 0 || existingNumber < 0) return;

    // 2026. január 1-től a fedezetlen forinthitelek főszabály szerinti
    // JTM-limitje 800 000 Ft alatti nettó jövedelemnél 50%, efelett 60%.
    const jtmPercent = incomeNumber < 800000 ? 0.5 : 0.6;
    const legalLimit = incomeNumber * jtmPercent;
    const availablePayment = Math.max(0, legalLimit - existingNumber);

    // A weboldalon nem a jogszabályi maximumot ajánljuk vállalható célként.
    // Egy óvatosabb, 35%-os tervezési szintet is megmutatunk.
    const planningPayment = Math.max(
      0,
      incomeNumber * 0.35 - existingNumber,
    );

    setResult({
      legalLimit,
      availablePayment,
      jtmPercent: jtmPercent * 100,
      planningPayment,
    });
  }

  const contactHref =
    result && incomeNumber > 0
      ? `/penzugy/kapcsolat?tema=hitel&nettoJovedelem=${incomeNumber}&meglevoTorleszto=${existingNumber}&elozetesHaviKeret=${Math.round(result.availablePayment)}`
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
              <WalletCards className="h-7 w-7" />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#c8a166]">
              Előzetes hitelkeret
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Mekkora hitel férhet bele?
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#bdb4a8]">
              Először azt nézzük meg, hogy a jövedelmedből a meglévő
              törlesztések mellett körülbelül mekkora havi hitelteher számára
              maradhat hely.
            </p>

            <div className="mt-8 rounded-[24px] border border-[#c8a166]/20 bg-[#1b1713] p-6">
              <div className="flex gap-3">
                <CircleAlert className="mt-1 h-5 w-5 shrink-0 text-[#d7b171]" />
                <p className="text-sm leading-6 text-[#c8bfb3]">
                  Ez nem banki hitelbírálat és nem konkrét hitelajánlat. A
                  bankok saját hitelbírálati szabályai ennél szigorúbbak is
                  lehetnek.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f7f2ea] p-8 text-[#211913] sm:p-10 lg:p-12">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c8a166]/20 text-[#805f32]">
                <Calculator className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6b42]">
                  Gyors számítás
                </p>
                <h2 className="font-serif text-3xl font-semibold">
                  Add meg az alapadatokat
                </h2>
              </div>
            </div>

            <form onSubmit={calculate} className="mt-8">
              <label className="font-semibold">Igazolt havi nettó jövedelem</label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="1"
                  step="1000"
                  value={income}
                  onChange={(event) => {
                    setIncome(event.target.value);
                    setResult(null);
                  }}
                  required
                  placeholder="pl. 450000"
                  className="w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 pr-14 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#887b6d]">
                  Ft
                </span>
              </div>

              <label className="mt-6 block font-semibold">
                Meglévő hitelek havi törlesztése összesen
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={existingPayments}
                  onChange={(event) => {
                    setExistingPayments(event.target.value);
                    setResult(null);
                  }}
                  required
                  placeholder="Ha nincs, írj 0-t"
                  className="w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 pr-14 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#887b6d]">
                  Ft
                </span>
              </div>

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
                      Van még tér új havi törlesztésre
                    </h3>
                  </div>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <ResultBox
                    label="Óvatosabb tervezési keret"
                    value={formatFt(result.planningPayment)}
                    description="Egy 35%-os belső tervezési szint alapján."
                  />
                  <ResultBox
                    label="JTM szerinti felső havi tér"
                    value={formatFt(result.availablePayment)}
                    description={`A ${result.jtmPercent.toFixed(0)}%-os főszabály szerinti korlátból kiindulva.`}
                  />
                </div>

                {result.availablePayment <= 0 && (
                  <p className="mt-5 rounded-2xl bg-[#efe2d2] p-4 text-sm leading-6 text-[#654c30]">
                    A megadott meglévő törlesztések már elérik vagy meghaladják
                    az itt alkalmazott JTM-határt. Ettől még egyedi vizsgálat
                    indokolt lehet, de ebből a kalkulációból nem érdemes új
                    hitelösszeget becsülni.
                  </p>
                )}

                <div className="mt-7 rounded-[24px] bg-[#2b2118] p-6 text-white">
                  <p className="font-serif text-2xl font-semibold">
                    És ez mekkora hitelösszeget jelenthet?
                  </p>
                  <p className="mt-3 leading-7 text-white/70">
                    Ezt szándékosan nem számítjuk át egyetlen „ígért”
                    hitelösszegre. A futamidő, a hitel típusa, a kamat és a
                    banki hitelbírálat mind befolyásolja a tényleges
                    lehetőséget.
                  </p>

                  <Link
                    href={contactHref}
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#c8a166] px-6 py-3.5 font-bold text-[#17110b] transition hover:bg-[#d8b77e]"
                  >
                    Megnézem a konkrét lehetőségeimet
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <p className="mx-auto mt-8 max-w-[1000px] text-center text-xs leading-6 text-white/45">
          A számítás tájékoztató jellegű. Nem minősül hitelbírálatnak,
          hitelígérvénynek vagy ajánlatnak. A ténylegesen figyelembe vehető
          jövedelem, kötelezettségek és hitelfeltételek pénzügyi intézményenként
          eltérhetnek.
        </p>
      </div>
    </main>
  );
}

function ResultBox({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#d8cdbd] bg-white p-5">
      <p className="text-sm font-semibold text-[#766a5d]">{label}</p>
      <p className="mt-2 font-serif text-3xl font-semibold text-[#2b2118]">
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 text-[#8b8176]">{description}</p>
    </div>
  );
}