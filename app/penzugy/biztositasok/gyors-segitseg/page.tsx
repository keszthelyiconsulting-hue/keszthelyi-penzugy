"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
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

export default function GyorsSegitsegPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/gyors-segitseg", {
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

      setStatus("Köszönöm! Hamarosan felveszem veled a kapcsolatot.");
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
    <main className="min-h-screen bg-[#081014] text-[#F4F7F8]">
      {/* FEJLÉC */}
      <header className="border-b border-white/10 bg-[#081014]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link
            href="/penzugy"
            className="inline-flex items-center gap-2 text-sm text-[#D3E4E8] transition hover:text-white"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071014] via-[#0A1B21] to-[#061014]">
        <div className="absolute left-[-12%] top-20 h-96 w-96 rounded-full bg-[#0E6A77]/15 blur-3xl" />
        <div className="absolute right-[-10%] top-[-8%] h-[500px] w-[500px] rounded-full bg-[#1AA7B8]/10 blur-3xl" />

        <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-20">
          {/* BAL OLDAL */}
          <div className="relative z-10 max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#31A9B8]/30 bg-[#0E6A77]/15 px-4 py-2 text-sm text-[#CDEBF0]">
              <ShieldCheck className="h-4 w-4" />
              Gyors segítség
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Gyors segítség.
              <span className="mt-3 block text-[#49C6D6]">
                Amikor nem szeretnél hónapokat várni.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[#D2E0E4]">
              Nagyértékű diagnosztikai vizsgálatok megszervezése és
              költségtérítése, valamint egynapos műtéti térítés egy olyan
              megoldásban, amely váratlan egészségügyi helyzetekben adhat
              gyorsabb pénzügyi segítséget.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#kapcsolat"
                className="inline-flex items-center gap-2 rounded-full bg-[#29A5B5] px-6 py-3.5 font-semibold text-[#061014] transition hover:scale-[1.02]"
              >
                Személyre szabott megoldást kérek
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#szolgaltatasok"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold transition hover:bg-white/5"
              >
                Mit tartalmazhat?
              </a>
            </div>
          </div>

          {/* SZIPORKA */}
          <div className="relative flex min-h-[650px] items-center justify-center lg:min-h-[760px]">
            <div className="relative h-[590px] w-full max-w-[430px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0E6471] via-[#123C47] to-[#0A171B] shadow-2xl shadow-black/40 lg:h-[650px]">
              <img
                src="/sziporka-gyors-segitseg.png"
                alt="Sziporka"
                className="absolute inset-0 h-full w-full object-contain object-bottom"
              />

              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#071014]/95 via-[#071014]/45 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 rounded-[26px] border border-white/10 bg-[#0B1B20]/85 p-5 text-white shadow-xl backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2 text-sm text-[#CFEFF3]">
                  <Sparkles className="h-4 w-4" />
                  Sziporka segít
                </div>

                <p className="font-serif text-2xl font-semibold leading-tight">
                  Ha vizsgálatra vagy beavatkozásra van szükség, nem mindegy,
                  mennyi idő alatt jutsz el odáig.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SZOLGÁLTATÁSOK */}
      <section
        id="szolgaltatasok"
        className="bg-[#EDF3F4] text-[#142126]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-14 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#247C89]">
              Mire adhat segítséget?
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              Két terület, ahol az idő különösen sokat számít.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#5C6E73]">
              A védelem célja, hogy bizonyos diagnosztikai vizsgálatok és
              egynapos műtétek esetén pénzügyi támogatást adjon, a mindenkori
              biztosítási feltételek szerint.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ServiceCard
              icon={<ScanLine className="h-7 w-7" />}
              title="Nagyértékű diagnosztika"
              text="Szakorvosi indokoltság mellett bizonyos nagyértékű diagnosztikai vizsgálatok – például MRI, CT, PET-CT, ultrahang vagy röntgen – megszervezésére és költségtérítésére is lehetőség nyílhat."
            />

            <ServiceCard
              icon={<Stethoscope className="h-7 w-7" />}
              title="Egynapos műtéti térítés"
              text="Egynapos sebészeti beavatkozás esetén a biztosítás a feltételek szerint térítést nyújthat. A kizárások közé tartozhatnak például a tisztán esztétikai célú beavatkozások."
            />
          </div>
        </div>
      </section>

      {/* MIÉRT FONTOS */}
      <section className="bg-[#0B161A]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#55C7D5]">
              Amikor gyorsan kell dönteni
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              Az idő sokszor legalább annyira fontos, mint maga a vizsgálat.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#C9D7DB]">
              Egy komolyabb diagnosztikai vizsgálat vagy egynapos beavatkozás
              váratlanul is szükségessé válhat. Ilyenkor a cél az, hogy a
              szükséges vizsgálatok vagy beavatkozások anyagi oldala kevésbé
              terhelje meg a családi költségvetést.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#C9D7DB]">
              A pontos szolgáltatási kör, a limitek és a kizárások mindig a
              választott biztosítás aktuális feltételeitől függenek.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-[#10252B] p-8 sm:p-10">
            <CheckLine text="Nagyértékű képalkotó diagnosztika lehetősége" />
            <CheckLine text="Vizsgálatszervezési támogatás" />
            <CheckLine text="Egynapos műtéti térítés lehetősége" />
            <CheckLine text="A feltételek szerinti térítési limitek" />
            <CheckLine text="A kizárások és feltételek előzetes áttekintése" />
          </div>
        </div>
      </section>

      {/* FOLYAMAT */}
      <section className="bg-[#0E6A77] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D1F0F4]">
            Egyszerűen, érthetően
          </p>

          <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
            Megnézzük, mire van valóban szükséged.
          </h2>

          <div className="mt-12 grid border-y border-white/20 md:grid-cols-3">
            <ProcessStep
              number="01"
              title="Átbeszéljük a helyzetedet"
              text="Megnézzük, milyen egészségügyi és pénzügyi szempontok fontosak számodra."
            />

            <ProcessStep
              number="02"
              title="Megnézzük a szóba jöhető védelmet"
              text="Áttekintjük a diagnosztikai és egynapos műtéti térítési lehetőségeket."
            />

            <ProcessStep
              number="03"
              title="Érthetően átbeszéljük a feltételeket"
              text="A szolgáltatásokat, limiteket és kizárásokat is tisztázzuk, hogy tudd, mire számíthatsz."
              last
            />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section
        id="kapcsolat"
        className="bg-[#DFECEE] text-[#142126]"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div className="lg:pr-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0E6A77] text-white">
              <Activity className="h-7 w-7" />
            </div>

            <h2 className="mt-6 font-serif text-4xl font-semibold sm:text-5xl">
              Nézzük meg, milyen gyors segítség illik hozzád.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#5C6E73]">
              Add meg az alapadataidat, és felvesszük veled a kapcsolatot.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[36px] bg-[#F7FBFB] p-7 shadow-xl shadow-[#0E6A77]/10 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">Név</span>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#C4D8DC] bg-white px-5 py-4 outline-none transition focus:border-[#0E6A77]"
                  placeholder="Teljes név"
                />
              </label>

              <label>
                <span className="mb-2 block font-medium">Telefonszám</span>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#C4D8DC] bg-white px-5 py-4 outline-none transition focus:border-[#0E6A77]"
                  placeholder="+36..."
                />
              </label>

              <label>
                <span className="mb-2 block font-medium">E-mail cím</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#C4D8DC] bg-white px-5 py-4 outline-none transition focus:border-[#0E6A77]"
                  placeholder="nev@email.hu"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">
                  Melyik terület érdekel?
                </span>

                <select
                  value={form.situation}
                  onChange={(e) =>
                    setForm({ ...form, situation: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#C4D8DC] bg-white px-5 py-4 outline-none transition focus:border-[#0E6A77]"
                >
                  <option value="">Válassz...</option>
                  <option value="Nagyértékű diagnosztika">
                    Nagyértékű diagnosztika
                  </option>
                  <option value="Egynapos műtéti térítés">
                    Egynapos műtéti térítés
                  </option>
                  <option value="Mindkettő">Mindkettő</option>
                  <option value="Még nem tudom">Még nem tudom</option>
                </select>
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">
                  Miben segíthetünk?
                </span>

                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="min-h-32 w-full resize-none rounded-2xl border border-[#C4D8DC] bg-white px-5 py-4 outline-none transition focus:border-[#0E6A77]"
                  placeholder="Írd le röviden, milyen segítséget keresel..."
                />
              </label>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#5C6E73]">
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
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0B252C] px-6 py-4 font-semibold text-white transition hover:bg-[#0E6A77] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Kapcsolatfelvételt kérek"}
              {!sending && <ArrowRight className="h-4 w-4" />}
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

function ServiceCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[30px] border border-[#D4E2E4] bg-white p-8 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0E6A77] text-white">
        {icon}
      </div>

      <h3 className="mt-6 font-serif text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-[#5C6E73]">
        {text}
      </p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 py-5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0E6A77] text-white">
        <Check className="h-4 w-4" />
      </span>

      <span className="text-[#D8E7E9]">
        {text}
      </span>
    </div>
  );
}

function ProcessStep({
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
      className={`py-8 md:px-8 ${
        last ? "" : "md:border-r md:border-white/20"
      }`}
    >
      <span className="text-sm font-semibold text-[#D1F0F4]">
        {number}
      </span>

      <h3 className="mt-4 font-serif text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-[#E7F3F5]">
        {text}
      </p>
    </div>
  );
}