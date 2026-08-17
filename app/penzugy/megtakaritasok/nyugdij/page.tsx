"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function NyugdijPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    situation: "",
    message: "",
    consent: false,
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/nyugdij", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Az üzenet elküldése nem sikerült.");
      }

      setStatus("Köszönjük! Hamarosan felvesszük veled a kapcsolatot.");

      setFormData({
        name: "",
        phone: "",
        email: "",
        situation: "",
        message: "",
        consent: false,
      });
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

  function scrollToForm() {
    document
      .getElementById("kapcsolat")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#F3EEE6] text-[#20201E]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#E8E0D3]">
       <a
  href="/penzugy"
  className="absolute left-6 top-6 z-30 inline-flex items-center gap-2 text-sm font-semibold text-[#6E6253] transition hover:text-[#20201E]"
>
  ← Vissza a pénzügyekhez
</a>
        <div className="mx-auto grid min-h-[760px] max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
          {/* BAL OLDAL */}
          <div className="relative z-10 flex items-center px-6 py-20 sm:px-10 lg:px-14 xl:px-16">
            <div className="max-w-[650px]">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#C8BBA8] bg-white/55 px-5 py-3 text-sm font-semibold tracking-wide text-[#575044]">
                <Clock3 className="h-4 w-4" />
                Hosszú távú pénzügyi tervezés
              </div>

              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#776B5B]">
                Nyugdíjtervezés
              </p>

              <h1 className="mt-6 max-w-[760px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-[#171A1A] lg:text-6xl">
  A jövőd nem a
  <br />
  <span className="text-[#7C6A4C]">nyugdíjkorhatárnál</span>
  <br />
  kezdődik.
</h1>

              <p className="mt-8 max-w-[590px] text-lg leading-8 text-[#5F594F]">
                A nyugdíjas évekre való felkészülés nem egyetlen termék
                kiválasztásáról szól. Megnézzük, milyen céljaid vannak, mennyi
                idő áll rendelkezésedre, és milyen megtakarítás illeszkedhet
                hozzád.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-3 rounded-full bg-[#242522] px-7 py-4 font-semibold text-white transition hover:bg-[#3A3B37]"
                >
                  Személyre szabott lehetőséget kérek
                  <ArrowRight className="h-5 w-5" />
                </button>

                <a
                  href="#tervezes"
                  className="inline-flex items-center rounded-full border border-[#AFA391] px-7 py-4 font-semibold text-[#393832] transition hover:bg-white/50"
                >
                  Hogyan tervezzünk?
                </a>
              </div>

              <div className="mt-12 grid max-w-[610px] gap-4 sm:grid-cols-3">
                <HeroPoint number="01" text="Célok" />
                <HeroPoint number="02" text="Időtáv" />
                <HeroPoint number="03" text="Megoldás" />
              </div>
            </div>
          </div>

          {/* PÉTER */}
          <div className="relative min-h-[620px] lg:min-h-full">
            <div className="absolute inset-x-8 bottom-0 top-10 rounded-t-[80px] bg-[#D7CCBC] lg:left-4 lg:right-0 lg:top-14" />

            <div className="absolute left-8 top-20 h-40 w-40 rounded-full border border-[#B9AD9B]/60" />
            <div className="absolute right-10 top-12 h-64 w-64 rounded-full border border-[#B9AD9B]/40" />

            <Image
              src="/peter-nyugdij.png"
              alt="Péter – nyugdíjtervezés"
              fill
              priority
              className="relative z-10 object-contain object-[center_30%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute bottom-12 left-8 z-20 max-w-[330px] rounded-[28px] border border-white/40 bg-[#242522]/90 p-6 text-white shadow-2xl backdrop-blur-md lg:left-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DDD2C2]">
                Péter segít
              </p>

              <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
                Nézzük meg, milyen jövőt szeretnél felépíteni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TERVEZÉS */}
      <section id="tervezes" className="bg-[#242522] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-14">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#CBBFAE]">
                Nem csak megtakarítás
              </p>

              <h2 className="max-w-[430px] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#F7F1E7] lg:text-5xl">
                Először azt nézzük meg,
                <br />
                hová szeretnél eljutni.
              </h2>

              <p className="mt-7 max-w-[500px] text-lg leading-8 text-[#C9C6BF]">
                Más megoldás lehet megfelelő annak, aki most kezdi a
                felkészülést, és más annak, akinek már van megtakarítása.
                A kiindulópont mindig a saját élethelyzeted.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <PlanningCard
                icon={<Clock3 className="h-6 w-6" />}
                title="Mennyi időd van?"
                text="Megnézzük, mennyi idő áll rendelkezésedre a tervezett nyugdíjas évekig."
              />

              <PlanningCard
                icon={<PiggyBank className="h-6 w-6" />}
                title="Mennyit szeretnél félretenni?"
                text="Olyan vállalható összeget keresünk, amely hosszú távon is illeszkedik a lehetőségeidhez."
              />
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <PlanningCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Mi a célod?"
              text="Nem ugyanazt jelenti a biztonsági tartalék, a jövedelemkiegészítés vagy egy nagyobb nyugdíjcél."
            />

            <PlanningCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Mi van már most?"
              text="A meglévő megtakarításokat is figyelembe vesszük, mielőtt új megoldásról döntünk."
            />
          </div>
        </div>
      </section>

      {/* LÉPÉSEK */}
      <section className="bg-[#F3EEE6]">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-14">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#776B5B]">
              Egyszerűen, átláthatóan
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Három lépés a tudatosabb nyugdíjtervezéshez.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Step
              number="01"
              title="Megismerjük a helyzeted"
              text="Átbeszéljük a céljaidat, az időtávot és azt, hogy jelenleg milyen megtakarításaid vannak."
            />

            <Step
              number="02"
              title="Átnézzük a lehetőségeket"
              text="A számodra szóba jöhető megoldásokat közérthetően összehasonlítjuk."
            />

            <Step
              number="03"
              title="Te döntesz"
              text="A végső döntést azután hozod meg, hogy pontosan látod a lehetőségeket és a feltételeket."
            />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section id="kapcsolat" className="bg-[#D8CCBB]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-14">
          <div className="lg:pr-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#6E6253]">
              Személyes tervezés
            </p>

            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Kezdjük azzal, hogy megnézzük, hol tartasz most.
            </h2>

            <p className="mt-7 text-lg leading-8 text-[#5F594F]">
              Add meg az alapadataidat, és felvesszük veled a kapcsolatot a
              nyugdíjcéljaid és a szóba jöhető megtakarítási lehetőségek
              átbeszéléséhez.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="Személyre szabott áttekintés" />
              <CheckLine text="Érthető összehasonlítás" />
              <CheckLine text="Hosszú távon vállalható megoldás" />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[36px] bg-[#FBF8F3] p-7 shadow-xl sm:p-10"
          >
            <div>
              <label className="mb-2 block font-medium">Név</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Teljes név"
                className="w-full rounded-2xl border border-[#D9CFC1] bg-white px-5 py-4 outline-none transition placeholder:text-[#A59D92] focus:border-[#6E6253]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">Telefonszám</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+36..."
                  className="w-full rounded-2xl border border-[#D9CFC1] bg-white px-5 py-4 outline-none transition placeholder:text-[#A59D92] focus:border-[#6E6253]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">E-mail cím</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="nev@email.hu"
                  className="w-full rounded-2xl border border-[#D9CFC1] bg-white px-5 py-4 outline-none transition placeholder:text-[#A59D92] focus:border-[#6E6253]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block font-medium">
                Hol tartasz most a nyugdíjtervezésben?
              </label>

              <select
                value={formData.situation}
                onChange={(e) =>
                  setFormData({ ...formData, situation: e.target.value })
                }
                className={`w-full rounded-2xl border border-[#D9CFC1] bg-white px-5 py-4 outline-none transition focus:border-[#6E6253] ${
                  formData.situation
                    ? "text-[#20201E]"
                    : "text-[#A59D92]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="Most kezdenék megtakarítani">
                  Most kezdenék megtakarítani
                </option>
                <option value="Már van nyugdíjcélú megtakarításom">
                  Már van nyugdíjcélú megtakarításom
                </option>
                <option value="A meglévő megtakarításomat szeretném átnézni">
                  A meglévő megtakarításomat szeretném átnézni
                </option>
                <option value="Több lehetőséget szeretnék összehasonlítani">
                  Több lehetőséget szeretnék összehasonlítani
                </option>
                <option value="Még csak tájékozódom">
                  Még csak tájékozódom
                </option>
              </select>
            </div>

            <div className="mt-6">
              <label className="mb-2 block font-medium">
                Mit szeretnél elérni?
              </label>

              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Írd le röviden, mi a legfontosabb számodra..."
                className="w-full resize-none rounded-2xl border border-[#D9CFC1] bg-white px-5 py-4 outline-none transition placeholder:text-[#A59D92] focus:border-[#6E6253]"
              />
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#5F594F]">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
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
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#242522] px-7 py-4 font-semibold text-white transition hover:bg-[#3A3B37] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Kapcsolatfelvételt kérek"}

              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-medium text-[#5F594F]">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function HeroPoint({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="border-t border-[#B8AD9D] pt-4">
      <span className="text-xs font-semibold tracking-[0.2em] text-[#8A7E6C]">
        {number}
      </span>
      <p className="mt-1 font-serif text-lg font-semibold">{text}</p>
    </div>
  );
}

function PlanningCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#2D2E2A] p-8 sm:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5DAC9] text-[#242522]">
        {icon}
      </div>

      <h3 className="mt-7 font-serif text-2xl font-semibold">{title}</h3>

      <p className="mt-4 leading-7 text-[#C9C6BF]">{text}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[30px] border border-[#D4C9BA] bg-[#FBF8F3] p-8">
      <span className="text-sm font-semibold tracking-[0.2em] text-[#776B5B]">
        {number}
      </span>

      <h3 className="mt-6 font-serif text-2xl font-semibold">{title}</h3>

      <p className="mt-4 leading-7 text-[#665F55]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-[#BCAE9A] pb-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#242522] text-white">
        <Check className="h-4 w-4" />
      </span>

      <span className="font-medium text-[#48443D]">{text}</span>
    </div>
  );
}