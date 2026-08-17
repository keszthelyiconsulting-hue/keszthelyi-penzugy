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

export default function FalusiCsokPage() {
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

      const response = await fetch("/api/penzugy/falusi-csok", {
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#6F7650] via-[#4B4F37] to-[#171713] text-white">
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
                Falusi CSOK
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl">
                Vissza nem térítendő otthonteremtési támogatás preferált kistelepüléseken, vásárlásra, építésre, bővítésre vagy korszerűsítésre.
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
                  Otthonteremtés vidéken, vissza nem térítendő támogatással.
                </h2>

                <p className="mt-4 leading-7 text-neutral-300">
                  A Falusi CSOKnél az életkor, a munkaviszony vagy vállalkozói jogviszony, a jövedelem, a magyarországi munkavégzés vállalása és a banki hitelbírálat együtt határozza meg a lehetőséget.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Akár 15 millió Ft vissza nem térítendő támogatás",
                    "Preferált kistelepüléseken vehető igénybe",
                    "Vásárlásra, építésre, bővítésre vagy korszerűsítésre",
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
              Vidéki otthonteremtéshez
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Mit érdemes tudni a Falusi CSOKről?
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A Falusi CSOK célja, hogy a dolgozó vagy vállalkozó fiatalok kedvező, kamatmentes forráshoz jussanak életkezdésükhöz. A pontos lehetőséget a jogosultság mellett a banki hitelbírálat is meghatározza.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={<Home className="h-6 w-6" />}
              title="Használt ingatlan vásárlása"
              text="Használt lakóingatlan vásárlására, ha azzal egyidejűleg korszerűsítés vagy bővítés is történik."
            />

            <InfoCard
              icon={<Banknote className="h-6 w-6" />}
              title="Új családi ház"
              text="Új egylakásos családi ház építésére vagy vásárlására is igénybe vehető a program feltételei szerint."
            />

            <InfoCard
              icon={<Landmark className="h-6 w-6" />}
              title="Korszerűsítés"
              text="Meglévő lakóingatlan korszerűsítésére is kérhető támogatás a meghatározott munkálatokra."
            />

            <InfoCard
              icon={<HeartHandshake className="h-6 w-6" />}
              title="Bővítés"
              text="Meglévő vagy megvásárolt lakóingatlan hasznos alapterületének bővítésére is felhasználható."
            />
          </div>
        </div>
      </section>

      {/* ELŐNYÖK */}
      <section className="bg-[#e9dfd1] px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#806b50]">
              Családok vidéki otthonához
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Miért különleges a Falusi CSOK?
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A Falusi CSOK vissza nem térítendő támogatás, amely a preferált kistelepüléseken élő vagy oda költöző családok otthonteremtését segíti. Bizonyos esetekben CSOK Plusszal és Otthon Starttal is kombinálható.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Benefit
              icon={<ShieldCheck />}
              title="1 gyermek"
              text="Használt lakás vásárlása és egyidejű korszerűsítése vagy bővítése esetén akár 1 millió Ft támogatás."
            />

            <Benefit
              icon={<Clock3 />}
              title="2 gyermek"
              text="Használt lakás vásárlása és egyidejű korszerűsítése vagy bővítése esetén akár 4 millió Ft támogatás."
            />

            <Benefit
              icon={<BadgeCheck />}
              title="3 vagy több gyermek"
              text="Használt lakás vásárlása és egyidejű korszerűsítése vagy bővítése esetén akár 15 millió Ft támogatás."
            />

            <Benefit
              icon={<Sparkles />}
              title="Vidéki otthonteremtéshez"
              text="Csak korszerűsítés vagy bővítés esetén a támogatási összegek jellemzően a vásárlással egybekötött összegek felét érik el."
            />
          </div>
        </div>
      </section>

      {/* BANKOK ÖSSZEHASONLÍTÁSA */}
      <section className="bg-gradient-to-b from-[#6F7650] via-[#4B4F37] to-[#171713] px-6 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8c6aa] text-[#171717]">
                <Landmark className="h-7 w-7" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Falusi CSOK.
                <span className="block text-[#e5d7c3]">
                  Vidéki otthon, többféle támogatási lehetőséggel.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-200">
                A támogatás feltételei egységesek, de az ingatlancél, a gyermekek száma és az egyéb igénybe vett támogatások miatt érdemes előre megtervezni a teljes finanszírozást.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#2D2F24] p-7 sm:p-9">
              <div className="space-y-7">
                <ComparisonRow
                  number="01"
                  title="Megismerjük az igényt"
                  text="Megnézzük, hogy a kiválasztott település preferált kistelepülés-e, és milyen ingatlancélban gondolkodtok."
                />

                <ComparisonRow
                  number="02"
                  title="Átnézzük a lehetőségeket"
                  text="Áttekintjük a gyermekek számát, a személyes jogosultsági feltételeket és az ingatlan fő adatait."
                />

                <ComparisonRow
                  number="03"
                  title="Összevetjük az ajánlatokat"
                  text="Megnézzük, milyen támogatási kombinációk és kiegészítő finanszírozási lehetőségek jöhetnek szóba."
                />

                <ComparisonRow
                  number="04"
                  title="Végigkísérünk az ügyintézésen"
                  text="Segítünk a szükséges dokumentumok, költségvetés, értékbecslés és ügyintézés lépéseiben."
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
              A Falusi CSOK jogosultsága mindig egyedi
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A település, a gyermekek száma, az ingatlan típusa, a lakáscél és a személyes feltételek együtt határozzák meg a támogatás pontos lehetőségét.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <ConditionCard
              number="01"
              title="Preferált kistelepülés"
              text="A támogatás csak a jogszabályban meghatározott preferált kistelepüléseken vehető igénybe."
            />

            <ConditionCard
              number="02"
              title="Gyermekek száma"
              text="A támogatás összege a meglévő és bizonyos esetekben vállalt gyermekek számától függ."
            />

            <ConditionCard
              number="03"
              title="Ingatlancél és műszaki feltételek"
              text="A vásárlásnak, építésnek, bővítésnek vagy korszerűsítésnek meg kell felelnie a program műszaki és dokumentációs feltételeinek."
            />
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-[28px] border border-[#d6c8b6] bg-white/70 p-6 sm:p-8">
            <div className="flex gap-4">
              <FileText className="mt-1 h-6 w-6 shrink-0 text-[#897154]" />

              <p className="leading-7 text-neutral-600">
                Az oldalon szereplő információk tájékoztató jellegűek. A pontos támogatási összeg és jogosultság az aktuális jogszabályi, családi, települési és ingatlanfeltételek alapján határozható meg.
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
              <div className="relative min-h-[560px] overflow-hidden bg-gradient-to-br from-[#7D835E] via-[#50543D] to-[#171713]">
                <img
                  src="/sziporka-falusi-csok.png"
                  alt="Sziporka, a Keszthelyi Consulting pénzügyi asszisztense"
                  className="absolute inset-0 h-full w-full origin-bottom scale-[1.10] object-contain object-bottom"
                />

                <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#171713]/95 via-[#3E432F]/60 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" />
                    Sziporka segít
                  </div>

                  <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Nézzük meg, elérhető-e számodra a Falusi CSOK.
                  </h2>

                  <p className="mt-4 max-w-md leading-7 text-white/85">
                    Néhány alapadat alapján át tudjuk nézni a jogosultságot és a szóba jöhető támogatási lehetőségeket.
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