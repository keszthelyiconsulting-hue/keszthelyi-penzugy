"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  HeartPulse,
  Home,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  need: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  need: "",
  message: "",
  consent: false,
};

export default function EgeszsegbiztositasPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/egeszsegbiztositas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Az üzenet elküldése nem sikerült.");
      }

      setStatus("Köszönöm! Hamarosan felvesszük veled a kapcsolatot.");
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
    <main className="min-h-screen bg-[#120E10] text-[#F8F0E7]">
      <header className="border-b border-[#FFFFFF]/10 bg-[#120E10]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link
            href="/penzugy"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#E7D4C4] transition hover:text-[#F8F0E7]"
          >
            <ArrowLeft className="h-4 w-4" />
            Vissza a pénzügyi megoldásokhoz
          </Link>

          <Link
            href="/"
            aria-label="Kezdőlap"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFFFFF]/15"
          >
            <Home className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex items-center px-6 py-16 lg:px-10 lg:py-24">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8A3D50]/20 bg-white/70 px-4 py-2 text-sm font-medium text-[#8A3D50]">
                <HeartPulse className="h-4 w-4" />
                Egészségbiztosítás
              </div>

              <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Egészség.
                <span className="block text-[#D6A38E]">Időben. Önért.</span>
              </h1>

              <p className="mt-7 max-w-lg text-lg leading-8 text-[#D9CED0]">
                Magánegészségügyi szolgáltatások, szervezett időpontok és
                diagnosztikai lehetőségek egy átgondolt biztosítási
                megoldásban.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#kapcsolat"
                  className="inline-flex items-center gap-2 rounded-full bg-[#8A3D50] px-6 py-3.5 font-semibold text-white transition hover:bg-[#6D2337]"
                >
                  Személyre szabott lehetőséget kérek
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#szolgaltatasok"
                  className="inline-flex items-center rounded-full border border-[#FFFFFF]/20 px-6 py-3.5 font-semibold"
                >
                  Tudnivalók
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[650px] items-center justify-center lg:min-h-[760px]">
            <div className="relative h-[590px] w-full max-w-[430px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#6D2337] via-[#351A23] to-[#151013] shadow-2xl shadow-black/35 lg:h-[650px]">
              <img
                src="/sziporka-egeszsegbiztositas.png"
                alt="Sziporka, a Keszthelyi Consulting pénzügyi asszisztense"
                className="absolute inset-0 h-full w-full object-cover object-[58%_center] scale-[0.88]"
              />

              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#171113]/95 via-[#171113]/45 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 rounded-[26px] border border-white/10 bg-[#24191D]/88 p-5 text-white shadow-xl backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2 text-sm text-[#F0D7C6]">
                  <Sparkles className="h-4 w-4" />
                  Sziporka segít
                </div>
                <p className="font-serif text-2xl font-semibold leading-tight">
                  Megnézzük, mely szolgáltatásokra van valóban szükséged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SZOLGÁLTATÁSOK */}
      <section id="szolgaltatasok" className="bg-[#8A3D50] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F3D8CE]">
            Mire adhat megoldást?
          </p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
            Amikor nem szeretnél heteket várni arra, hogy elinduljon a kivizsgálás.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[32px] bg-white/10 md:grid-cols-3">
            <Service
              icon={<CalendarClock className="h-7 w-7" />}
              title="Szervezett időpont"
              text="A szolgáltatási csomagtól függően segítséget kaphatsz a szükséges vizsgálat megszervezésében."
            />
            <Service
              icon={<Stethoscope className="h-7 w-7" />}
              title="Szakorvosi ellátás"
              text="Különböző magánorvosi szakrendelések lehetnek elérhetők a választott biztosítás feltételei szerint."
            />
            <Service
              icon={<Microscope className="h-7 w-7" />}
              title="Diagnosztika"
              text="Labor- és diagnosztikai vizsgálatok is részei lehetnek a szolgáltatási körnek."
            />
          </div>
        </div>
      </section>

      {/* KÖZÉPSŐ, VILÁGOS RÉSZ */}
      <section className="bg-[#F2E9DF]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D6A38E]">
              Személyre szabva
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-[#6F3F3A] sm:text-5xl">
              Nem mindenkinek ugyanarra az egészségügyi védelemre van szüksége.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#665A5C]">
              Más lehet fontos egy egyedülálló ügyfélnek, egy családnak vagy
              annak, aki meglévő biztosítását szeretné átnézni. Először az
              igényeket tisztázzuk, és csak utána választunk megoldást.
            </p>
          </div>

          <div className="rounded-[32px] bg-[#F2E9DF] p-8 sm:p-10">
            <CheckLine text="Milyen szakorvosi ellátások fontosak?" />
            <CheckLine text="Szükség van-e diagnosztikai szolgáltatásokra?" />
            <CheckLine text="Egyéni vagy családi megoldást keresel?" />
            <CheckLine text="Van-e már meglévő egészségbiztosításod?" />
            <CheckLine text="Milyen szolgáltatási szint illik hozzád?" last />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section id="kapcsolat" className="bg-[#E8D8C8]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div className="lg:pr-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8A3D50] text-white">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h2 className="mt-6 font-serif text-4xl font-semibold sm:text-5xl">
              Nézzük meg, milyen egészségbiztosítás illik hozzád.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#65575A]">
              Add meg az alapadataidat, és segítünk megtalálni
az igényeidhez illő egészségbiztosítási megoldást.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[36px] bg-[#FBF7F2] p-7 shadow-xl shadow-[#8A3D50]/10 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">Név</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none focus:border-[#8A3D50]"
                  placeholder="Teljes név"
                />
              </label>

              <label>
                <span className="mb-2 block font-medium">Telefonszám</span>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none focus:border-[#8A3D50]"
                  placeholder="+36..."
                />
              </label>

              <label>
                <span className="mb-2 block font-medium">E-mail cím</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none focus:border-[#8A3D50]"
                  placeholder="nev@email.hu"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">
                  Mi a legfontosabb számodra?
                </span>
                <select
                  value={form.need}
                  onChange={(e) => setForm({ ...form, need: e.target.value })}
                 className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 text-[#98A2B3] outline-none focus:border-[#8A3D50]"
                >
                  <option value="">Válassz...</option>
                  <option>Gyors szakorvosi ellátás</option>
                  <option>Diagnosztikai vizsgálatok</option>
                  <option>Megelőző szűrések</option>
                  <option>Családi egészségbiztosítás</option>
                  <option>Meglévő biztosítás felülvizsgálata</option>
                  <option>Még nem tudom</option>
                </select>
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">Miben segíthetünk?</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="min-h-32 w-full resize-none rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none focus:border-[#8A3D50]"
                  placeholder="Írd le röviden, mire keresel megoldást..."
                />
              </label>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#65575A]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
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
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8A3D50] px-6 py-4 font-semibold text-white transition hover:bg-[#6D2337] disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Kapcsolatfelvételt kérek"}
              {!sending && <ArrowRight className="h-4 w-4" />}
            </button>

            {status && (
              <p className="mt-4 text-center text-sm font-medium">{status}</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function Service({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#8A3D50] p-8 sm:p-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#F0D7C6]">
        {icon}
      </div>
      <h3 className="mt-6 font-serif text-2xl font-semibold">{title}</h3>
      <p className="mt-4 leading-7 text-[#F0DDE1]">{text}</p>
    </div>
  );
}

function CheckLine({
  text,
  last = false,
}: {
  text: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 py-5 ${
        last ? "" : "border-b border-[#D8C8BD]"
      }`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8A3D50] text-white">
        <Check className="h-4 w-4" />
      </span>
      <span className="font-medium text-[#665A5C]">{text}</span>
    </div>
  );
}