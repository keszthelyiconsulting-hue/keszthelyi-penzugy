"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Check,
  HeartPulse,
  Home,
  Hospital,
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

export default function GyermekbiztositasPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/gyermekbiztositas", {
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
    <main className="min-h-screen bg-[#0B0E0B] text-[#F7F3EA]">

      {/* FEJLÉC */}
      <header className="border-b border-white/10 bg-[#0B0E0B]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

          <Link
            href="/penzugy"
            className="inline-flex items-center gap-2 text-sm text-[#D8DED0] transition hover:text-white"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#090B09] via-[#121812] to-[#080A08]">

        <div className="absolute left-[-12%] top-24 h-96 w-96 rounded-full bg-[#66735B]/15 blur-3xl" />

        <div className="absolute right-[-10%] top-[-8%] h-[500px] w-[500px] rounded-full bg-[#819174]/15 blur-3xl" />

        <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-20">

          {/* BAL OLDAL */}
          <div className="relative z-10 max-w-xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#9BAA8A]/30 bg-[#718061]/15 px-4 py-2 text-sm text-[#DDE5D2]">
              <ShieldCheck className="h-4 w-4" />
              Gyermekbiztosítás
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">

              Gyermekeknek

              <span className="mt-3 block text-[#AFC395]">
                biztonsággal.
              </span>

            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[#D1D7CD]">
              A gyermekkor a felfedezésről, tanulásról és élményekről
              szól. Egy megfelelő gyermekbiztosítás váratlan
              élethelyzetben pénzügyi segítséget adhat a családnak,
              miközben a gyermek a szükséges támogatást és ellátást
              kaphatja meg.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#kapcsolat"
                className="inline-flex items-center gap-2 rounded-full bg-[#91A37C] px-6 py-3.5 font-semibold text-[#10140F] transition hover:scale-[1.02]"
              >
                Személyre szabott megoldást kérek
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#vedelem"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold transition hover:bg-white/5"
              >
                Milyen esetekre nyújthat védelmet?
              </a>

            </div>
          </div>


          {/* SZIPORKA */}
          <div className="relative flex min-h-[650px] items-center justify-center lg:min-h-[760px]">

            <div className="relative h-[590px] w-full max-w-[430px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#718061] via-[#354234] to-[#151B15] shadow-2xl shadow-black/40 lg:h-[650px]">

              <img
                src="/sziporka-gyermekbiztositas.png"
                alt="Sziporka"
                className="absolute inset-0 h-full w-full object-contain object-bottom"
              />

              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#111610]/95 via-[#111610]/45 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 rounded-[26px] border border-white/10 bg-[#1B231A]/85 p-5 text-white shadow-xl backdrop-blur-md">

                <div className="mb-2 flex items-center gap-2 text-sm text-[#E0E7D4]">
                  <Sparkles className="h-4 w-4" />
                  Sziporka segít
                </div>

                <p className="font-serif text-2xl font-semibold leading-tight">
                  A gyermekkor legyen a felfedezésé. A váratlan
                  helyzetek anyagi részére pedig fel lehet készülni.
                </p>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* VÉDELMI TERÜLETEK */}
      <section
        id="vedelem"
        className="bg-[#F2EFE7] text-[#20251E]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

          <div className="mb-14 max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#66775A]">
              Ami igazán számít
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              Mikor adhat segítséget?
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#60685C]">
              Egy gyermekbiztosítás célja, hogy váratlan baleset,
              betegség vagy kórházi ellátás esetén pénzügyi
              segítséget és szervezési támogatást adhasson a
              családnak.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <ProtectionCard
              icon={<HeartPulse className="h-7 w-7" />}
              title="Balesetek"
              text="Csonttörés, égési sérülés és más baleseti események esetén a biztosítás a választott védelemtől függően térítést nyújthat."
            />

            <ProtectionCard
              icon={<Hospital className="h-7 w-7" />}
              title="Kórházi és műtéti térítés"
              text="Kórházi tartózkodás vagy műtéti beavatkozás esetén a biztosítás pénzügyi segítséget adhat a család számára."
            />

            <ProtectionCard
              icon={<Stethoscope className="h-7 w-7" />}
              title="Betegségek és segítség"
              text="Bizonyos súlyosabb betegségek esetén térítés, valamint a választott biztosításhoz kapcsolódó egészségügyi és asszisztencia-szolgáltatások is elérhetők lehetnek."
            />

          </div>
        </div>
      </section>


      {/* MIÉRT ÉRDEMES ELŐRE GONDOLKODNI */}
      <section className="bg-[#121812]">

        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9CAF89]">
              Előrelátó gondoskodás
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
              A váratlan helyzetek nem kérnek időpontot.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#CBD3C5]">
              Egy kisebb baleset is járhat vizsgálatokkal,
              kezeléssel vagy néhány napos kórházi ellátással.
              Komolyabb betegség esetén pedig még fontosabb lehet,
              hogy a családnak legyen pénzügyi mozgástere.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#CBD3C5]">
              A cél nem az, hogy minden lehetséges kockázatra
              ugyanazt a csomagot válasszuk, hanem hogy a gyermek
              életkorához, a család helyzetéhez és a szülők
              elképzeléseihez megfelelő védelmet alakítsunk ki.
            </p>

          </div>


          <div className="rounded-[36px] border border-white/10 bg-[#1B231A] p-8 sm:p-10">

            <CheckLine text="Baleseti sérülésekre szóló védelem" />

            <CheckLine text="Kórházi napi térítés lehetősége" />

            <CheckLine text="Műtéti térítés lehetősége" />

            <CheckLine text="Súlyosabb betegségekre szóló védelem" />

            <CheckLine text="Kapcsolódó egészségügyi és asszisztencia-szolgáltatások" />

          </div>

        </div>
      </section>


      {/* CSALÁDRA SZABVA */}
      <section className="bg-[#728162] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#E6ECD9]">
            Gyermekről gyermekre
          </p>

          <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
            Nem minden gyermeknek ugyanarra a védelemre van
            szüksége.
          </h2>

          <div className="mt-12 grid border-y border-white/20 md:grid-cols-3">

            <ProcessStep
              number="01"
              title="Megismerjük a család helyzetét"
              text="Átbeszéljük a gyermek életkorát, a család igényeit és azt, milyen helyzetekre szeretnétek előre felkészülni."
            />

            <ProcessStep
              number="02"
              title="Kiválasztjuk a fontos védelmeket"
              text="Megnézzük, milyen baleseti, betegségi, kórházi vagy műtéti fedezetek lehetnek fontosak."
            />

            <ProcessStep
              number="03"
              title="Érthetően átbeszéljük a lehetőségeket"
              text="A cél egy átlátható, a családhoz és a gyermekhez illeszkedő biztosítási védelem."
              last
            />

          </div>
        </div>
      </section>


      {/* KAPCSOLAT */}
      <section
        id="kapcsolat"
        className="bg-[#E8E4D8] text-[#20251E]"
      >

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">

          <div className="lg:pr-8">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#728162] text-white">
              <Baby className="h-7 w-7" />
            </div>

            <h2 className="mt-6 font-serif text-4xl font-semibold sm:text-5xl">
              Nézzük meg, milyen védelem illik gyermekedhez.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#60685C]">
              Add meg az alapadataidat, és felvesszük veled a
              kapcsolatot.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="rounded-[36px] bg-[#FAF8F2] p-7 shadow-xl shadow-[#42503C]/10 sm:p-10"
          >

            <div className="grid gap-5 sm:grid-cols-2">

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">
                  Név
                </span>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#CBD0C2] bg-white px-5 py-4 outline-none transition focus:border-[#728162]"
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
                  className="w-full rounded-2xl border border-[#CBD0C2] bg-white px-5 py-4 outline-none transition focus:border-[#728162]"
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
                  className="w-full rounded-2xl border border-[#CBD0C2] bg-white px-5 py-4 outline-none transition focus:border-[#728162]"
                  placeholder="nev@email.hu"
                />
              </label>


              <label className="sm:col-span-2">

                <span className="mb-2 block font-medium">
                  Milyen védelem érdekel?
                </span>

                <select
                  value={form.situation}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      situation: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-[#CBD0C2] bg-white px-5 py-4 outline-none transition focus:border-[#728162]"
                >

                  <option value="">
                    Válassz...
                  </option>

                  <option value="Baleseti védelem">
                    Baleseti védelem
                  </option>

                  <option value="Kórházi térítés">
                    Kórházi térítés
                  </option>

                  <option value="Műtéti térítés">
                    Műtéti térítés
                  </option>

                  <option value="Betegségi védelem">
                    Betegségi védelem
                  </option>

                  <option value="Komplex gyermekbiztosítás">
                    Komplex gyermekbiztosítás
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
                  className="min-h-32 w-full resize-none rounded-2xl border border-[#CBD0C2] bg-white px-5 py-4 outline-none transition focus:border-[#728162]"
                  placeholder="Írd le röviden, milyen védelemben gondolkodsz..."
                />

              </label>

            </div>


            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#60685C]">

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
                Hozzájárulok ahhoz, hogy a megadott
                elérhetőségeimen kapcsolatfelvétel céljából
                megkeressenek.
              </span>

            </label>


            <button
              type="submit"
              disabled={sending}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#344130] px-6 py-4 font-semibold text-white transition hover:bg-[#728162] disabled:cursor-not-allowed disabled:opacity-60"
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


function ProtectionCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[30px] border border-[#DADDD2] bg-[#FAF8F2] p-8 shadow-sm">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#728162] text-white">
        {icon}
      </div>

      <h3 className="mt-6 font-serif text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-[#60685C]">
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

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#728162] text-white">
        <Check className="h-4 w-4" />
      </span>

      <span className="text-[#DDE4D8]">
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
        last
          ? ""
          : "md:border-r md:border-white/20"
      }`}
    >

      <span className="text-sm font-semibold text-[#E6ECD9]">
        {number}
      </span>

      <h3 className="mt-4 font-serif text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-[#EEF1E9]">
        {text}
      </p>

    </div>
  );
}