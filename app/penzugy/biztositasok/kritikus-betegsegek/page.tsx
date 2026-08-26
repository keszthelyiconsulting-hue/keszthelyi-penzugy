"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HeartPulse,
  Home,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  situation: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  situation: "",
  message: "",
  consent: false,
};

export default function KritikusBetegsegekPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/kritikus-betegsegek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Az üzenet elküldése nem sikerült.",
        );
      }

      setStatus(
        "Köszönöm! Hamarosan felveszem veled a kapcsolatot.",
      );
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
    <main className="min-h-screen bg-[#0B0F0E] text-[#FFF8EE]">
      {/* FEJLÉC */}
      <header className="border-b border-white/10 bg-[#0B0F0E]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link
            href="/penzugy"
            className="inline-flex items-center gap-2 text-sm text-[#D8E2DC] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Vissza a pénzügyi megoldásokhoz
          </Link>

          <Link
            href="/"
            aria-label="Kezdőlap"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
          >
            <Home className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#080C0B] via-[#10201E] to-[#0B0F0E]">
        <div className="absolute left-[-12%] top-20 h-96 w-96 rounded-full bg-[#1F5A54]/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#8FAE9E]/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[35%] h-96 w-96 rounded-full bg-[#C8A96B]/5 blur-3xl" />

        <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-20">
          {/* BAL OLDAL */}
          <div className="relative z-10 max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#CDB98F]/30 bg-[#CDB98F]/10 px-4 py-2 text-sm text-[#E9D7B8]">
              <ShieldCheck className="h-4 w-4" />
              Kritikus betegségek elleni védelem
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Kritikus betegségek.
              <span className="mt-3 block text-[#9FBDAE]">
                Védelem, amikor minden erődre szükséged van.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[#D3DDD7]">
              Egy súlyos betegség nemcsak az egészséget, hanem a család
              pénzügyi biztonságát is próbára teheti. A megfelelő
              biztosítási védelem anyagi segítséget adhat, hogy ilyen
              helyzetben elsősorban a felépülésre koncentrálhass.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#kapcsolat"
                className="inline-flex items-center gap-2 rounded-full bg-[#D9C49D] px-6 py-3.5 font-semibold text-[#14201D] transition hover:scale-[1.02]"
              >
                Személyre szabott védelmet kérek
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#vedelmi-szintek"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold transition hover:bg-white/5"
              >
                Megnézem a lehetőségeket
              </a>
            </div>
          </div>

          {/* SZIPORKA */}
          <div className="relative flex min-h-[650px] items-center justify-center lg:min-h-[760px]">
            <div className="relative h-[590px] w-full max-w-[430px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#1F5A54] via-[#123B38] to-[#0B0F0E] shadow-2xl shadow-black/40 lg:h-[650px]">
              <img
                src="/sziporka-kritikus-betegsegek.png"
                alt="Sziporka"
                className="absolute inset-0 h-full w-full object-contain object-bottom"
              />

              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0B0F0E]/95 via-[#0B0F0E]/45 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 rounded-[26px] border border-[#E9D7B8]/15 bg-[#10201E]/85 p-5 text-white shadow-xl backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2 text-sm text-[#E9D7B8]">
                  <Sparkles className="h-4 w-4" />
                  Sziporka segít
                </div>

                <p className="font-serif text-2xl font-semibold leading-tight">
                  Nem a betegségtől való félelmet tervezzük meg. Hanem azt,
                  hogy legyen miből talpra állni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 / 9 / 50 */}
      <section
        id="vedelmi-szintek"
        className="bg-[#F2EFE7] text-[#1A2521]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-14 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#357168]">
              Választható védelmi szintek
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              Nem mindenkinek ugyanarra a védelemre van szüksége.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#5E6B66]">
              A különböző Critical Care megoldások eltérő körű
              biztosítási védelmet tesznek lehetővé. A megfelelő
              változat kiválasztását mindig az élethelyzetedhez és az
              igényeidhez igazítjuk.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <CareCard
              number="3"
              title="Critical Care 3"
              subtitle="Célzott alapvédelem"
              text="Olyan megoldás, amely a meghatározott kritikus egészségi események egy szűkebb körére biztosíthat pénzügyi védelmet."
            />

            <CareCard
              number="9"
              title="Critical Care 9"
              subtitle="Szélesebb körű védelem"
              text="Bővebb védelmi kör azoknak, akik több meghatározott kritikus betegségre, állapotra vagy egészségi eseményre szeretnének felkészülni."
              featured
            />

            <CareCard
              number="50"
              title="Critical Care 50"
              subtitle="Átfogó védelem"
              text="A Critical Care lehetőségek közül a legszélesebb körű megoldás azok számára, akik átfogóbb kritikus betegségi védelmet keresnek."
            />
          </div>

          <p className="mt-8 max-w-4xl text-sm leading-6 text-[#68736F]">
            A biztosított események pontos köre, a szolgáltatás feltételei,
            a kizárások és a térítés mértéke minden esetben az adott
            biztosítás aktuális szerződési feltételei szerint érvényes.
          </p>
        </div>
      </section>

      {/* MIÉRT FONTOS */}
      <section className="bg-[#0E1715]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A8C2B4]">
              Anyagi háttér a felépüléshez
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              Egy diagnózis után a kiadások nem állnak meg.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#CDD8D2]">
              Egy súlyos egészségi esemény hosszabb gyógyulással,
              munkából való kieséssel, utazással, kezelésekkel vagy akár
              az otthoni élet átszervezésével is járhat.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#CDD8D2]">
              A biztosítási szolgáltatás célja, hogy egy meghatározott
              biztosítási esemény bekövetkezésekor rendelkezésre álló
              pénzügyi segítség nagyobb mozgásteret adhasson ebben az
              időszakban.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-[#152622] p-8 sm:p-10">
            <CheckLine text="Pénzügyi tartalék kiegészítése egy nehéz időszakban" />
            <CheckLine text="A munkából való kiesés hatásának enyhítése" />
            <CheckLine text="A felépüléshez kapcsolódó kiadások támogatása" />
            <CheckLine text="A családi költségvetés nagyobb biztonsága" />
            <CheckLine text="Az élethelyzethez igazítható biztosítási védelem" />
          </div>
        </div>
      </section>

      {/* SZEMÉLYRE SZABÁS */}
      <section className="bg-[#1F5A54] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#E9D7B8]">
            Nem csomagot választunk
          </p>

          <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
            Először azt nézzük meg, neked mekkora védelemre van szükséged.
          </h2>

          <div className="mt-12 grid border-y border-white/20 md:grid-cols-3">
            <ProcessStep
              number="01"
              icon={<Users className="h-5 w-5" />}
              title="Megismerjük az élethelyzetedet"
              text="Átbeszéljük a családi helyzetet, a jövedelmet, a pénzügyi kötelezettségeket és a meglévő tartalékokat."
            />

            <ProcessStep
              number="02"
              icon={<HeartPulse className="h-5 w-5" />}
              title="Meghatározzuk a szükséges védelmet"
              text="Megnézzük, milyen kritikus betegségi védelem és biztosítási összeg illeszkedhet az igényeidhez."
            />

            <ProcessStep
              number="03"
              icon={<Stethoscope className="h-5 w-5" />}
              title="Összehasonlítjuk a lehetőségeket"
              text="Érthetően átbeszéljük a szolgáltatásokat, feltételeket és kizárásokat, hogy megalapozottan dönthess."
              last
            />
          </div>
        </div>
      </section>

      {/* KIHEZ ILLESZKEDHET */}
      <section className="bg-[#E7E0D2] text-[#1A2521]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#357168]">
                Előrelátó gondoskodás
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
                Akkor érdemes gondolkodni rajta, amikor még minden rendben van.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SmallCard
                title="Családfenntartóknak"
                text="Ha a család pénzügyi biztonsága jelentős részben a te jövedelmedtől függ."
              />

              <SmallCard
                title="Aktív keresőknek"
                text="Ha egy hosszabb munkából való kiesés komoly terhet jelentene."
              />

              <SmallCard
                title="Hitel mellett"
                text="Ha rendszeres pénzügyi kötelezettségeket akkor is teljesíteni kellene, amikor a jövedelem csökken."
              />

              <SmallCard
                title="Megtakarítás mellé"
                text="Ha nem szeretnéd, hogy egy váratlan egészségi helyzet kizárólag a megtakarításaidat terhelje."
              />
            </div>
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section
        id="kapcsolat"
        className="bg-[#DDE6DF] text-[#17211E]"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div className="lg:pr-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F5A54] text-[#FFF8EE]">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <h2 className="mt-6 font-serif text-4xl font-semibold sm:text-5xl">
              Nézzük meg, milyen kritikus betegségi védelem illik hozzád.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#5E6B66]">
              Add meg az alapadataidat, és felvesszük veled a kapcsolatot.
              A lehetőségeket érthetően, az élethelyzetedhez igazítva
              beszéljük át.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[36px] bg-[#FBF9F4] p-7 shadow-xl shadow-[#173B35]/10 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">Név</span>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#CAD6CF] bg-white px-5 py-4 outline-none transition focus:border-[#1F5A54]"
                  placeholder="Teljes név"
                />
              </label>

              <label>
                <span className="mb-2 block font-medium">
                  Telefonszám
                </span>

                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#CAD6CF] bg-white px-5 py-4 outline-none transition focus:border-[#1F5A54]"
                  placeholder="+36..."
                />
              </label>

              <label>
                <span className="mb-2 block font-medium">
                  E-mail cím
                </span>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#CAD6CF] bg-white px-5 py-4 outline-none transition focus:border-[#1F5A54]"
                  placeholder="nev@email.hu"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">
                  Melyik lehetőség érdekel?
                </span>

                <select
                  value={form.situation}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      situation: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#CAD6CF] bg-white px-5 py-4 outline-none transition focus:border-[#1F5A54]"
                >
                  <option value="">Válassz...</option>

                  <option value="Critical Care 3">
                    Critical Care 3
                  </option>

                  <option value="Critical Care 9">
                    Critical Care 9
                  </option>

                  <option value="Critical Care 50">
                    Critical Care 50
                  </option>

                  <option value="Szeretném összehasonlítani">
                    Szeretném összehasonlítani
                  </option>

                  <option value="Még nem tudom">
                    Még nem tudom
                  </option>
                </select>
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">
                  Miben segíthetünk?
                </span>

                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="min-h-32 w-full resize-none rounded-2xl border border-[#CAD6CF] bg-white px-5 py-4 outline-none transition focus:border-[#1F5A54]"
                  placeholder="Írd le röviden, milyen védelemben gondolkodsz..."
                />
              </label>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#5E6B66]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) =>
                  setForm({
                    ...form,
                    consent: e.target.checked,
                  })
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
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#173B35] px-6 py-4 font-semibold text-white transition hover:bg-[#1F5A54] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending
                ? "Küldés..."
                : "Kapcsolatfelvételt kérek"}

              {!sending && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>

            {status && (
              <p className="mt-4 text-center text-sm font-medium">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function CareCard({
  number,
  title,
  subtitle,
  text,
  featured = false,
}: {
  number: string;
  title: string;
  subtitle: string;
  text: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border p-8 ${
        featured
          ? "border-[#789B8B] bg-[#173B35] text-white shadow-xl shadow-[#173B35]/15"
          : "border-[#D4DDD7] bg-[#FAF8F2]"
      }`}
    >
      <div
        className={`font-serif text-7xl font-semibold ${
          featured
            ? "text-[#E9D7B8]"
            : "text-[#1F5A54]"
        }`}
      >
        {number}
      </div>

      <p
        className={`mt-6 text-sm font-semibold uppercase tracking-[0.18em] ${
          featured
            ? "text-[#AFC8BC]"
            : "text-[#5E8578]"
        }`}
      >
        {subtitle}
      </p>

      <h3 className="mt-2 font-serif text-3xl font-semibold">
        {title}
      </h3>

      <p
        className={`mt-5 leading-7 ${
          featured
            ? "text-[#DCE7E1]"
            : "text-[#5E6B66]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function CheckLine({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 py-5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9C49D] text-[#173B35]">
        <Check className="h-4 w-4" />
      </span>

      <span className="text-[#DCE7E1]">
        {text}
      </span>
    </div>
  );
}

function ProcessStep({
  number,
  icon,
  title,
  text,
  last = false,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div
      className={`py-8 md:px-8 ${
        last
          ? ""
          : "md:border-r md:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#E9D7B8]">
          {number}
        </span>

        <span className="text-[#DCE7E1]">
          {icon}
        </span>
      </div>

      <h3 className="mt-5 font-serif text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-[#E2ECE7]">
        {text}
      </p>
    </div>
  );
}

function SmallCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[26px] border border-[#CBC4B6] bg-[#F5F1E8] p-6">
      <h3 className="font-serif text-xl font-semibold text-[#1F5A54]">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-[#5E6B66]">
        {text}
      </p>
    </div>
  );
}