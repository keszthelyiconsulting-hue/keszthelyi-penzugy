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
  Share2,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

export default function OtthonStartPage() {
  const [consent, setConsent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState(false);
const handleShare = async () => {
  const shareData = {
    title: "Otthon Start – Keszthelyi Consulting",
    text: "Otthon Start lakáshitel – részletek és igénylési lehetőség.",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("A linket a vágólapra másoltuk.");
    }
  } catch {
    // A megosztási ablak bezárása esetén nincs teendő.
  }
};
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

      const response = await fetch("/api/penzugy/otthon-start", {
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#B66E55] via-[#6E3D37] to-[#171414] text-white">
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
                Otthon Start
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl">
                Első saját otthon megszerzéséhez fix 3%-os kamattal, akár 50 millió forintos hitelösszeggel és legfeljebb 25 éves futamidővel.
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
                  Fix 3%. Első otthon. Hosszú távra tervezhetően.
                </h2>

                <p className="mt-4 leading-7 text-neutral-300">
                  Az Otthon Start kedvező kamatot adhat, de a jogosultság, a megfelelő ingatlan és a banki hitelbírálat együtt határozza meg, hogy a program valóban elérhető-e számodra.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Fix 3%-os kamat a futamidő végéig",
                    "Legfeljebb 50 millió Ft hitelösszeg",
                    "Legfeljebb 25 éves futamidő",
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
              Első saját otthon
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Kinek szól az Otthon Start?
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A program elsőlakás-vásárlóknak szól. A jogosultság mellett a bank a jövedelmet, a hitelképességet és a kiválasztott ingatlant is vizsgálja.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={<Home className="h-6 w-6" />}
              title="Első lakás"
              text="Azoknak, akik első saját otthonukat szeretnék megvásárolni a program feltételei szerint."
            />

            <InfoCard
              icon={<Banknote className="h-6 w-6" />}
              title="Fix 3% kamat"
              text="A kamat a futamidő végéig fix 3%, így a konstrukció hosszabb távon is jól tervezhető."
            />

            <InfoCard
              icon={<Landmark className="h-6 w-6" />}
              title="Akár 50 millió Ft"
              text="A programban legfeljebb 50 millió forint hitel igényelhető, banki hitelbírálat mellett."
            />

            <InfoCard
              icon={<HeartHandshake className="h-6 w-6" />}
              title="Akár 10% önerő"
              text="A program szabályai szerint akár 10% önerő mellett is megvalósulhat a vásárlás, ha a banki feltételek is teljesülnek."
            />
          </div>
        </div>
      </section>

      {/* ELŐNYÖK */}
      <section className="bg-[#e9dfd1] px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#806b50]">
              Kedvezményes otthonteremtés
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Miért különleges ez a konstrukció?
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A fix 3%-os kamat és a hosszú futamidő jelentősen javíthatja az első otthon finanszírozhatóságát. A tényleges lehetőséget azonban mindig a személyes pénzügyi helyzet és a választott ingatlan alapján kell meghatározni.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Benefit
              icon={<ShieldCheck />}
              title="Fix kamat"
              text="A 3%-os kamat a futamidő végéig fix, ami kiszámíthatóbb törlesztést tesz lehetővé."
            />

            <Benefit
              icon={<Clock3 />}
              title="Hosszú futamidő"
              text="A futamidő legfeljebb 25 év lehet, így a havi teher hosszabb időre tervezhető."
            />

            <Benefit
              icon={<BadgeCheck />}
              title="Nincs családi feltétel"
              text="A programhoz nincs házasságkötési vagy gyermekvállalási kötelezettség, és nincs felső korhatár."
            />

            <Benefit
              icon={<Sparkles />}
              title="Első saját otthon"
              text="A program keretei azonosak, de a banki hitelbírálat, jövedelem-elfogadás és kiegészítő feltételek eltérhetnek."
            />
          </div>
        </div>
      </section>

      {/* BANKOK ÖSSZEHASONLÍTÁSA */}
      <section className="bg-gradient-to-b from-[#A8614D] via-[#965846] to-[#312d28] px-6 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d8c6aa] text-[#171717]">
                <Landmark className="h-7 w-7" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Otthon Start.
                <span className="block text-[#e5d7c3]">
                  Egy nagy lépés az első otthon felé.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-200">
                A program szabályai adottak, de az egyes bankok hitelbírálata és ügyfélminősítése eltérhet. Ezért érdemes több bank lehetőségét is áttekinteni.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#312d28] p-7 sm:p-9">
              <div className="space-y-7">
                <ComparisonRow
                  number="01"
                  title="Megismerjük az igényt"
                  text="Megnézzük, hogy az elsőlakás-vásárlói feltételek és a személyes körülményeid alapján szóba jöhet-e a program."
                />

                <ComparisonRow
                  number="02"
                  title="Átnézzük a lehetőségeket"
                  text="Áttekintjük a jövedelmet, a szükséges önerőt, a meglévő kötelezettségeket és a kiválasztott ingatlan fő adatait."
                />

                <ComparisonRow
                  number="03"
                  title="Összevetjük az ajánlatokat"
                  text="Összevetjük a banki lehetőségeket, a várható havi törlesztést és a kapcsolódó költségeket."
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
              Az Otthon Start jogosultsága mindig egyedi
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              A program alapfeltételei mellett a banki hitelképesség, a jövedelem és a megvásárolni kívánt ingatlan is meghatározza a tényleges lehetőséget.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <ConditionCard
              number="01"
              title="Elsőlakás-feltétel"
              text="A program elsőlakás-vásárlók számára érhető el a jogszabályban meghatározott tulajdoni feltételek szerint."
            />

            <ConditionCard
              number="02"
              title="TB-jogviszony és jövedelem"
              text="Legalább kétéves magyarországi TB-jogviszony szükséges, és a bank a jövedelmet, valamint a meglévő havi kötelezettségeket is vizsgálja."
            />

            <ConditionCard
              number="03"
              title="Ingatlan és banki feltételek"
              text="A megvásárolni kívánt ingatlannak és a finanszírozásnak is meg kell felelnie a program, illetve a választott bank feltételeinek."
            />
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-[28px] border border-[#d6c8b6] bg-white/70 p-6 sm:p-8">
            <div className="flex gap-4">
              <FileText className="mt-1 h-6 w-6 shrink-0 text-[#897154]" />

              <p className="leading-7 text-neutral-600">
                Az oldalon szereplő információk tájékoztató jellegűek. A pontos jogosultságot, hitelösszeget és havi törlesztést az aktuális jogszabályi, banki és személyes feltételek alapján lehet meghatározni.
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
              <div className="relative min-h-[560px] overflow-hidden bg-gradient-to-br from-[#a87866] via-[#5c403b] to-[#171414]">
                <img
                  src="/sziporka-szemelyi-kolcson.png"
                  alt="Sziporka, a Keszthelyi Consulting pénzügyi asszisztense"
                  className="absolute inset-0 h-full w-full object-contain object-bottom"
                />

                <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#171414]/95 via-[#3d2d2b]/60 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" />
                    Sziporka segít
                  </div>

                  <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Nézzük meg, elérhető-e számodra az Otthon Start.
                  </h2>

                  <p className="mt-4 max-w-md leading-7 text-white/85">
                    Néhány alapadat alapján el tudjuk indítani a jogosultság és a finanszírozási lehetőségek áttekintését.
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
   <button
  type="button"
  onClick={handleShare}
  aria-label="Oldal megosztása"
  title="Megosztás"
  className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-black text-amber-200 shadow-xl transition hover:scale-105 hover:bg-amber-950"
>
  <Share2 className="h-6 w-6" />
</button>
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