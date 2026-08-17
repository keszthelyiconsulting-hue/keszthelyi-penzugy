"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CircleAlert,
  CircleCheck,
  RefreshCcw,
} from "lucide-react";

function formatFt(value: number) {
  return new Intl.NumberFormat("hu-HU").format(Math.max(0, Math.round(value))) + " Ft";
}

export default function HitelkivaltasKalkulatorPage() {
  const [balance, setBalance] = useState("");
  const [monthly, setMonthly] = useState("");
  const [months, setMonths] = useState("");
  const [closingCost, setClosingCost] = useState("0");
  const [result, setResult] = useState<null | {
    remainingPayments: number;
    estimatedCostAboveBalance: number;
    ratio: number;
    signal: "strong" | "review" | "limited";
  }>(null);

  const balanceNumber = useMemo(() => Number(balance) || 0, [balance]);
  const monthlyNumber = useMemo(() => Number(monthly) || 0, [monthly]);
  const monthsNumber = useMemo(() => Number(months) || 0, [months]);
  const closingCostNumber = useMemo(() => Number(closingCost) || 0, [closingCost]);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (balanceNumber <= 0 || monthlyNumber <= 0 || monthsNumber <= 0) return;

    const remainingPayments = monthlyNumber * monthsNumber + closingCostNumber;
    const estimatedCostAboveBalance = Math.max(0, remainingPayments - balanceNumber);
    const ratio = remainingPayments / balanceNumber;

    // Ez csak előszűrés: nem állítjuk, hogy biztosan megtakarítás érhető el.
    // A jelzés azt mutatja, mennyire indokolt részletes ajánlat-összehasonlítást kérni.
    let signal: "strong" | "review" | "limited" = "limited";
    if (monthsNumber >= 24 && ratio >= 1.12) signal = "strong";
    else if (monthsNumber >= 12 && ratio >= 1.05) signal = "review";

    setResult({
      remainingPayments,
      estimatedCostAboveBalance,
      ratio,
      signal,
    });
  }

  const contactHref = result
    ? `/penzugy/kapcsolat?tema=hitel&cel=hitelkivaltas&fennalloTartozas=${balanceNumber}&haviTorleszto=${monthlyNumber}&hatralevoHonap=${monthsNumber}&lezarasiKoltseg=${closingCostNumber}`
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
              <RefreshCcw className="h-7 w-7" />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#c8a166]">
              Hitelkiváltási előszűrés
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Érdemes lehet kiváltanom a hitelemet?
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#bdb4a8]">
              Nézzük meg, mennyi fizetnivaló lehet még hátra a jelenlegi
              hiteledből. Ezután eldönthetjük, van-e értelme részletesen
              összehasonlítani a kiváltási lehetőségeket.
            </p>

            <div className="mt-8 rounded-[24px] border border-[#c8a166]/20 bg-[#1b1713] p-6">
              <div className="flex gap-3">
                <CircleAlert className="mt-1 h-5 w-5 shrink-0 text-[#d7b171]" />
                <p className="text-sm leading-6 text-[#c8bfb3]">
                  A kalkulátor nem ígér megtakarítást. A valódi döntéshez az
                  új hitel kamatát, THM-jét, futamidejét, teljes
                  visszafizetését és minden kapcsolódó költségét is ismerni
                  kell.
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
                  Gyors előszűrés
                </p>
                <h2 className="font-serif text-3xl font-semibold">
                  Add meg a jelenlegi hiteled adatait
                </h2>
              </div>
            </div>

            <form onSubmit={calculate} className="mt-8">
              <MoneyInput
                label="Jelenlegi fennálló tartozás"
                value={balance}
                onChange={(value) => {
                  setBalance(value);
                  setResult(null);
                }}
                placeholder="pl. 3 000 000"
              />

              <div className="mt-6">
                <MoneyInput
                  label="Jelenlegi havi törlesztőrészlet"
                  value={monthly}
                  onChange={(value) => {
                    setMonthly(value);
                    setResult(null);
                  }}
                  placeholder="pl. 85000"
                />
              </div>

              <label className="mt-6 block font-semibold">
                Hátralévő futamidő
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={months}
                  onChange={(e) => {
                    setMonths(e.target.value);
                    setResult(null);
                  }}
                  placeholder="pl. 48"
                  className="w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 pr-20 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#887b6d]">
                  hónap
                </span>
              </div>

              <div className="mt-6">
                <MoneyInput
                  label="Ismert lezárási / előtörlesztési költség"
                  value={closingCost}
                  onChange={(value) => {
                    setClosingCost(value);
                    setResult(null);
                  }}
                  placeholder="Ha nem ismert, maradhat 0"
                  min={0}
                />
                <p className="mt-2 text-xs leading-5 text-[#887b6d]">
                  Ha nem tudod az összeget, hagyd 0 Ft-on. A részletes
                  összehasonlításnál ezt később pontosítani kell.
                </p>
              </div>

              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#2b2118] px-7 py-4 font-semibold text-white transition hover:bg-[#493623]"
              >
                Megnézem
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
                      {result.signal === "strong"
                        ? "Érdemes részletesen megnézni a hitelkiváltást."
                        : result.signal === "review"
                          ? "Érdemes lehet összehasonlítást kérni."
                          : "A döntéshez részletesebb adatok kellenek."}
                    </h3>
                  </div>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <ResultBox
                    label="Hátralévő törlesztések egyszerű összege"
                    value={formatFt(monthlyNumber * monthsNumber)}
                  />
                  <ResultBox
                    label="Megadott lezárási költséggel együtt"
                    value={formatFt(result.remainingPayments)}
                  />
                </div>

                <div className="mt-4 rounded-[22px] border border-[#d8cdbd] bg-white p-5">
                  <p className="text-sm font-semibold text-[#766a5d]">
                    A fennálló tőkén felüli becsült hátralévő összeg
                  </p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-[#2b2118]">
                    {formatFt(result.estimatedCostAboveBalance)}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#8b8176]">
                    Ez nem azonos a hitelkiváltással elérhető megtakarítással.
                    Csak a megadott jelenlegi adatokból számított különbség.
                  </p>
                </div>

                <div className="mt-7 rounded-[24px] bg-[#2b2118] p-6 text-white">
                  <p className="font-serif text-2xl font-semibold">
                    A valódi kérdés: tudunk-e ennél kedvezőbb teljes
                    konstrukciót találni?
                  </p>
                  <p className="mt-3 leading-7 text-white/70">
                    Ehhez már konkrét ajánlatokat kell összehasonlítani úgy,
                    hogy ne csak a havi törlesztőt, hanem a futamidőt és a
                    teljes költséget is figyelembe vegyük.
                  </p>

                  <Link
                    href={contactHref}
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#c8a166] px-6 py-3.5 font-bold text-[#17110b] transition hover:bg-[#d8b77e]"
                  >
                    Kérem a hitelkiváltási összehasonlítást
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <p className="mx-auto mt-8 max-w-[1000px] text-center text-xs leading-6 text-white/45">
          Az eredmény kizárólag előzetes tájékoztatás. Nem minősül
          hitelajánlatnak, megtakarítási ígéretnek vagy hitelbírálatnak. A
          hitelkiváltás tényleges előnye csak a jelenlegi szerződés és az új
          ajánlatok teljes költségének összehasonlításával állapítható meg.
        </p>
      </div>
    </main>
  );
}

function MoneyInput({
  label,
  value,
  onChange,
  placeholder,
  min = 1,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  min?: number;
}) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <div className="relative mt-2">
        <input
          type="number"
          min={min}
          step="1000"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-[#d6c9b7] bg-white px-5 py-4 pr-14 outline-none placeholder:text-[#aaa096] focus:border-[#a68150]"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#887b6d]">
          Ft
        </span>
      </div>
    </div>
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