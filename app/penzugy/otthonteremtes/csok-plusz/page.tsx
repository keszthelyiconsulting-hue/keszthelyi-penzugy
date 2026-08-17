"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Clock3,
  FileText,
  HeartHandshake,
  Home,
  Landmark,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

export default function CsokPluszPage() {
  const [consent, setConsent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) return;

    setSubmitMessage("");
    setSubmitError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      amount: String(formData.get("amount") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      consent,
    };

    if (!payload.name) {
      setSubmitError(true);
      setSubmitMessage("Kérlek, add meg a neved.");
      return;
    }

    if (!payload.phone && !payload.email) {
      setSubmitError(true);
      setSubmitMessage("Kérlek, adj meg telefonszámot vagy e-mail címet.");
      return;
    }

    if (!consent) {
      setSubmitError(true);
      setSubmitMessage("A kapcsolatfelvételi hozzájárulás elfogadása szükséges.");
      return;
    }

    try {
      setIsSending(true);

      const response = await fetch("/api/penzugy/csok-plusz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result?.error || "A kapcsolatfelvételi igény elküldése nem sikerült.",
        );
      }

      form.reset();
      setConsent(false);
      setSubmitError(false);
      setSubmitMessage(
        "Köszönjük! A kapcsolatfelvételi igényed megérkezett. Hamarosan felvesszük veled a kapcsolatot.",
      );
    } catch (error) {
      setSubmitError(true);
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "A kapcsolatfelvételi igény elküldése nem sikerült.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#171717]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#75566f] via-[#493748] to-[#171518] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#d6c5aa] blur-3xl" />
          <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-[#b59b78] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/penzugy"
              className="inline-flex items-center gap-2 text-sm text-[#e4d7c4] transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Vissza a pénzügyi megoldásokhoz
            </Link>

            <Link
              href="/"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
              aria-label="Főoldal"
            >
              <Home className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid items-center gap-12 pb-16 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-16">
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d6c5aa]/30 bg-[#d6c5aa]/10 px-4 py-2 text-sm font-medium text-[#eadfce]">
                <WalletCards className="h-4 w-4" />
                Finanszírozási lehetőségek
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
                CSOK Plusz
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl">
                Kedvezményes, legfeljebb 3%-os kamatozású otthonteremtési hitel gyermeket vállaló házaspároknak.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#kapcsolat"
                  className="inline-flex items-center gap-2 rounded-full bg-[#dfd0b8] px-6 py-3.5 font-semibold text-[#171717] transition hover:bg-[#eadfce]"
                >
                  Személyre szabott lehetőséget kérek
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#tudnivalok"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
                >
                  Tudnivalók
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur sm:p-8">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfd0b8] text-[#171717]">
                  <Banknote className="h-7 w-7" />
                </div>

                <h2 className="text-2xl font-semibold">
                  Otthonteremtés és gyermekvállalás egy konstrukcióban.
                </h2>

                <p className="mt-4 leading-7 text-neutral-300">
                  A CSOK Plusz lehetőségeit a meglévő és vállalt gyermekek száma, az ingatlancél, a jövedelmi helyzet és a banki hitelbírálat együtt határozza meg.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "15, 30 vagy akár 50 millió Ft támogatott hitel",
                    "Legfeljebb 3%-os kamat",
                    "Vásárlásra, építésre vagy bővítésre is használható",
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#dfd0b8]" />
                      <span className="text-neutral-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MIRE HASZNÁLHATÓ */}
      <section id="tudnivalok" className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8a7356]">
              Gyermeket tervező házaspároknak
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Mire használható a CSOK Plusz?
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A CSOK Plusz első közös otthon megszerzéséhez, nagyobb otthonba költözéshez, építéshez vagy a meglévő ingatlan bővítéséhez is felhasználható a program feltételei szerint.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={<Home className="h-6 w-6" />}
              title="Első közös otthon"
              text="Első közös lakás vagy családi ház megszerzéséhez is igénybe vehető."
            />

            <InfoCard
              icon={<Banknote className="h-6 w-6" />}
              title="Nagyobb otthon"
              text="Meglévő otthonból nagyobb, komfortosabb ingatlanba költözéshez is használható."
            />

            <InfoCard
              icon={<Landmark className="h-6 w-6" />}
              title="Építés"
              text="Új lakóingatlan építésének finanszírozására is alkalmas lehet."
            />

            <InfoCard
              icon={<HeartHandshake className="h-6 w-6" />}
              title="Bővítés"
              text="Meglévő vagy megvásárolt lakóingatlan bővítésére is felhasználható."
            />
          </div>
        </div>
      </section>

      {/* ELŐNYÖK */}
      <section className="bg-[#e9dfd1] px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#806b50]">
              Család és otthon
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Miért különleges a CSOK Plusz?
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A konstrukció támogatott kamattal segíti a gyermeket vállaló házaspárok otthonteremtését. A pontos hitelösszeg a meglévő és vállalt gyermekek számától, valamint a banki hitelbírálattól függ.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Benefit
              icon={<ShieldCheck />}
              title="Legfeljebb 3% kamat"
              text="Az államilag támogatott hitel kamata legfeljebb 3%."
            />

            <Benefit
              icon={<Clock3 />}
              title="Akár 50 millió Ft"
              text="A gyermekek számától függően 15, 30 vagy akár 50 millió forint hitel is elérhető lehet."
            />

            <Benefit
              icon={<BadgeCheck />}
              title="Többféle ingatlancél"
              text="Vásárlásra, építésre és bővítésre is igénybe vehető a program szabályai szerint."
            />

            <Benefit
              icon={<Sparkles />}
              title="Gyermeket tervező házaspároknak"
              text="A jövedelem, a családi helyzet, a gyermekvállalás és az ingatlan együtt határozza meg a lehetőségeket."
            />
          </div>
        </div>
      </section>

      {/* BANKOK ÖSSZEHASONLÍTÁSA */}
      <section className="bg-gradient-to-b from-[#75566f] via-[#493748] to-[#171518] px-6 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8c6aa] text-[#171717]">
                <Landmark className="h-7 w-7" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                CSOK Plusz.
                <span className="block text-[#e5d7c3]">
                  Családra és otthonra tervezve.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-200">
                A program alapfeltételei egységesek, de a bankok hitelbírálata, jövedelem-elfogadása és ügyintézési feltételei eltérhetnek.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#2f2930] p-7 sm:p-9">
              <div className="space-y-7">
                <ComparisonRow
                  number="01"
                  title="Megismerjük az igényt"
                  text="Megnézzük a házasságot, a meglévő és vállalt gyermekeket, valamint az ingatlancélt."
                />

                <ComparisonRow
                  number="02"
                  title="Átnézzük a lehetőségeket"
                  text="Áttekintjük a jövedelmet, a meglévő kötelezettségeket és a választott ingatlan fő adatait."
                />

                <ComparisonRow
                  number="03"
                  title="Összevetjük az ajánlatokat"
                  text="Összevetjük a banki lehetőségeket, a várható törlesztést, a költségeket és a teljes konstrukciót."
                />

                <ComparisonRow
                  number="04"
                  title="Végigkísérünk az ügyintézésen"
                  text="Segítünk a szükséges dokumentumok, értékbecslés és banki ügyintézés lépéseiben."
                  last
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FŐ FELTÉTELEK */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8a7356]">
              Amit érdemes tudni
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              A CSOK Plusz jogosultsága mindig egyedi
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A házasság, a gyermekvállalás, a meglévő gyermekek száma, az ingatlancél, a jövedelem és a banki hitelbírálat együtt határozza meg a lehetőséget.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <ConditionCard
              number="01"
              title="Házasság és gyermekvállalás"
              text="A CSOK Pluszt gyermeket vállaló házaspárok igényelhetik, a program aktuális életkori és gyermekvállalási szabályai szerint."
            />

            <ConditionCard
              number="02"
              title="Jövedelem és hitelképesség"
              text="A bank vizsgálja a jövedelmet, a meglévő kötelezettségeket és a vállalható havi törlesztést."
            />

            <ConditionCard
              number="03"
              title="Ingatlan és banki feltételek"
              text="A választott ingatlannak és a finanszírozásnak is meg kell felelnie a program és a választott bank feltételeinek."
            />
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-[28px] border border-[#d6c8b6] bg-white/70 p-6 sm:p-8">
            <div className="flex gap-4">
              <FileText className="mt-1 h-6 w-6 shrink-0 text-[#897154]" />

              <p className="leading-7 text-neutral-600">
                Az oldalon szereplő információk tájékoztató jellegűek. A pontos jogosultságot és hitelösszeget az aktuális jogszabályi, családi, ingatlan- és banki feltételek alapján lehet meghatározni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SZIPORKA / KAPCSOLAT */}
      <section
        id="kapcsolat"
        className="relative overflow-hidden bg-[#d9c7aa] px-6 py-20 lg:px-8 lg:py-28"
      >
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-white/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[36px] bg-[#171717] shadow-2xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Sziporka */}
              <div className="relative min-h-[560px] overflow-hidden bg-gradient-to-br from-[#80667b] via-[#4d3b4a] to-[#171518]">
                <img
                  src="/sziporka-csok-plusz.png"
                  alt="Sziporka, a Keszthelyi Consulting pénzügyi asszisztense"
                  className="absolute inset-0 h-full w-full object-contain object-bottom"
                />

                <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#171518]/95 via-[#382d38]/60 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" />
                    Sziporka segít
                  </div>

                  <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Nézzük meg, milyen CSOK Plusz lehetőség illik a családotok terveihez.
                  </h2>

                  <p className="mt-4 max-w-md leading-7 text-white/85">
                    Néhány alapadat alapján át tudjuk nézni a jogosultságot és a szóba jöhető finanszírozási lehetőségeket.
                  </p>
                </div>
              </div>

              {/* Űrlap */}
              <div className="bg-[#f8f4ed] p-8 sm:p-10 lg:p-12">
                <h3 className="text-2xl font-semibold">
                  Kapcsolatfelvétel
                </h3>

                <p className="mt-2 text-neutral-600">
                  Add meg az alapadatokat, és felvesszük veled a kapcsolatot.
                </p>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Név
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Teljes név"
                      className="w-full rounded-2xl border border-[#d9cdbd] bg-white px-4 py-3.5 outline-none transition focus:border-[#8e7658] focus:ring-2 focus:ring-[#8e7658]/10"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-neutral-700"
                      >
                        Telefonszám
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+36..."
                        className="w-full rounded-2xl border border-[#d9cdbd] bg-white px-4 py-3.5 outline-none transition focus:border-[#8e7658] focus:ring-2 focus:ring-[#8e7658]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-neutral-700"
                      >
                        E-mail cím
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nev@email.hu"
                        className="w-full rounded-2xl border border-[#d9cdbd] bg-white px-4 py-3.5 outline-none transition focus:border-[#8e7658] focus:ring-2 focus:ring-[#8e7658]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="amount"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Körülbelül mekkora összegre lenne szükséged?
                    </label>

                    <input
                      id="amount"
                      name="amount"
                      type="text"
                      placeholder="Pl. 3 000 000 Ft"
                      className="w-full rounded-2xl border border-[#d9cdbd] bg-white px-4 py-3.5 outline-none transition focus:border-[#8e7658] focus:ring-2 focus:ring-[#8e7658]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Miben segíthetünk?
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Írd le röviden a finanszírozási célodat..."
                      className="w-full resize-none rounded-2xl border border-[#d9cdbd] bg-white px-4 py-3.5 outline-none transition focus:border-[#8e7658] focus:ring-2 focus:ring-[#8e7658]/10"
                    />
                  </div>

                  <label className="flex items-start gap-3 text-sm leading-6 text-neutral-600">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      required
                      className="mt-1 h-4 w-4 rounded border-neutral-300"
                    />

                    <span>
                      Hozzájárulok ahhoz, hogy a megadott elérhetőségeimen a
                      kapcsolatfelvétel céljából megkeressenek.
                    </span>
                  </label>

                  {submitMessage && (
                    <div
                      role={submitError ? "alert" : "status"}
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        submitError
                          ? "border border-red-200 bg-red-50 text-red-700"
                          : "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-4 font-semibold text-white transition hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSending ? "Küldés..." : "Kapcsolatfelvételt kérek"}
                    {!isSending && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="bg-[#101010] px-6 py-8 text-neutral-500 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-xs leading-6">
          A tájékoztatás nem minősül konkrét hitelajánlatnak. A finanszírozás
          feltételei minden esetben a választott pénzügyi intézmény aktuális
          szabályaitól és az egyedi hitelbírálattól függenek.
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
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-[#ddcfbd] bg-white/70 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b1b1b] text-[#e5d5be]">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}

function Benefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] bg-[#f8f4ee] p-7 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a1a1a] text-[#e0ceb2]">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}

function ConditionCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-[#d9cdbd] bg-[#eee5d9] p-7">
      <div className="text-sm font-bold tracking-[0.18em] text-[#887054]">
        {number}
      </div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}

function ComparisonRow({
  number,
  title,
  text,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[48px_1fr] gap-4 ${
        !last ? "border-b border-white/10 pb-7" : ""
      }`}
    >
      <div className="text-sm font-semibold text-[#d7c5aa]">{number}</div>

      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>

        <p className="mt-2 leading-7 text-neutral-400">{text}</p>
      </div>
    </div>
  );
}