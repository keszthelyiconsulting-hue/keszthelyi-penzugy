"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  Coins,
  Landmark,
  PiggyBank,
  ShieldCheck,
 } from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  amount: string;
  term: string;
  liquidityNeed: string;
  currentBank: string;
  goal: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  companyName: "",
  amount: "",
  term: "",
  liquidityNeed: "",
  currentBank: "",
  goal: "",
  message: "",
  consent: false,
};

export default function KkvBetetPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/kkv-betet", {
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

      setStatus("Köszönjük! Hamarosan felvesszük veled a kapcsolatot.");
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
    <main className="min-h-screen bg-gradient-to-br from-[#EFE9DD] via-[#DDD8CB] to-[#A89A78] text-[#211F1B]">
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#665E4D] transition hover:text-[#211F1B]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-[#C1B28D] bg-white/45 px-5 py-3 text-sm font-semibold text-[#6B5F47]">
            <Building2 className="h-5 w-5" />
            Vállalkozói megtakarítás
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8B7752]">
            KKV betét
          </p>

          <h1 className="mt-5 max-w-[800px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            A szabad pénz
            <span className="block text-[#8A6F3F]">
              ne álljon tétlenül.
            </span>
          </h1>

          <p className="mt-8 max-w-[720px] text-lg leading-8 text-[#625D55]">
            Ha a vállalkozásnak átmenetileg szabad pénzeszköze van, érdemes
            megnézni, milyen lekötési és vállalati betéti lehetőségek illenek a
            működéshez. A cél az, hogy a pénz dolgozzon, miközben a szükséges
            likviditás is megmarad.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#4B3D28] px-7 py-4 font-semibold text-white transition hover:bg-[#655238]"
            >
              Betéti lehetőséget kérek
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#tervezes"
              className="inline-flex items-center rounded-full border border-[#BBAA84] px-7 py-4 font-semibold transition hover:bg-white/35"
            >
              Mit érdemes átgondolni?
            </a>
          </div>
        </div>

        <div className="relative min-h-[650px] overflow-hidden rounded-[48px] bg-gradient-to-br from-[#3D3224] via-[#231D15] to-[#0D0B08]">
          <div className="absolute left-10 top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute right-10 top-16 h-72 w-72 rounded-full border border-[#D6B66E]/20" />

          <Image
            src="/peter-kkv-betet.png"
            alt="Péter – KKV betét"
            fill
            priority
            className="relative z-10 object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute bottom-8 left-8 z-20 max-w-[450px] rounded-[28px] border border-white/10 bg-[#11100D]/90 p-7 text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D9BC7A]">
              Péter segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, mekkora összeg, milyen időtáv és milyen likviditási
              igény mellett érdemes gondolkodni.
            </p>
          </div>
        </div>
      </section>

      <section
        id="tervezes"
        className="bg-gradient-to-br from-[#3F3425] via-[#241E16] to-[#0E0B08] px-6 py-24 text-[#F4EDDF] lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#D4B36F]">
                Likviditás és hozam együtt
              </p>

              <h2 className="mt-4 max-w-[580px] font-serif text-5xl font-semibold leading-[1.02]">
                Nem mindegy, mikor lesz újra szükség a pénzre.
              </h2>

              <p className="mt-7 max-w-[610px] text-lg leading-8 text-[#D8D0C4]">
                Egy rövidebb időre nélkülözhető összeghez más megoldás lehet
                megfelelő, mint a hosszabb távon szabad forráshoz. Ezért a
                futamidő mellett a vállalkozás várható pénzigényét is nézzük.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon={<Coins className="h-6 w-6" />}
                title="Elhelyezhető összeg"
                text="Az első lépés annak meghatározása, mekkora összeg nélkülözhető biztonságosan."
              />

              <InfoCard
                icon={<CalendarClock className="h-6 w-6" />}
                title="Időtáv"
                text="Rövidebb vagy hosszabb lekötésnél eltérő lehetőségek jöhetnek szóba."
              />

              <InfoCard
                icon={<PiggyBank className="h-6 w-6" />}
                title="Likviditási igény"
                text="Fontos, hogy a napi működéshez szükséges pénz ne kerüljön túl hosszú időre lekötésre."
              />

              <InfoCard
                icon={<Landmark className="h-6 w-6" />}
                title="Banki lehetőségek"
                text="A vállalati betéti lehetőségeket a feltételek és a vállalkozás igényei alapján nézzük át."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[820px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#887552]">
              Tudatos pénzelhelyezés
            </p>

            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              Először a vállalkozás pénzügyi ritmusát nézzük meg.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <Step
              number="01"
              title="Mennyi pénz szabad?"
              text="Csak az az összeg kerüljön lekötésre, amelyre a működéshez nincs rövid távon szükség."
            />

            <Step
              number="02"
              title="Mikor kellhet újra?"
              text="A várható kiadások és beruházások alapján választunk időtávot."
            />

            <Step
              number="03"
              title="Milyen rugalmasság kell?"
              text="Nem minden vállalkozás számára ugyanaz a lekötési forma ideális."
            />

            <Step
              number="04"
              title="Milyen céllal teszed félre?"
              text="Tartalék, későbbi beruházás vagy egyszerűen átmenetileg szabad pénz?"
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1500px] rounded-[36px] border border-[#CABB9A] bg-[#F4EFE4] p-8 sm:p-10">
          <div className="flex items-start gap-5">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6E5938] text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8A754F]">
                A biztonság az első
              </p>

              <h2 className="mt-4 max-w-[920px] font-serif text-4xl font-semibold leading-tight">
                A vállalkozás működési tartalékát nem érdemes teljesen lekötni.
              </h2>

              <p className="mt-5 max-w-[980px] text-lg leading-8 text-[#665F55]">
                A megfelelő megoldásnál nemcsak a várható hozamot, hanem a
                hozzáférhetőséget, a futamidőt és a vállalkozás pénzforgalmát is
                figyelembe kell venni.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="kapcsolat" className="bg-[#DDD5C6] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#806D4C]">
              KKV betéti igényfelmérés
            </p>

            <h2 className="mt-5 max-w-[600px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, hogyan dolgozhat a szabad vállalati pénz.
            </h2>

            <p className="mt-7 max-w-[580px] text-lg leading-8 text-[#625D55]">
              Add meg a vállalkozás főbb adatait, az elhelyezhető összeget és a
              tervezett időtávot. Ezek alapján könnyebb lesz áttekinteni a
              szóba jöhető lehetőségeket.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A likviditási igényt először tisztázzuk." />
              <CheckLine text="A futamidőt a vállalkozás terveihez igazítjuk." />
              <CheckLine text="Nem egyetlen banki lehetőségből indulunk ki." />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[40px] bg-[#FBF8F3] p-7 shadow-xl shadow-black/5 sm:p-10"
          >
            <div>
              <label className="font-semibold">Kapcsolattartó neve</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Teljes név"
                className="mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#8A7652]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Telefonszám</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+36..."
                  className="mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#8A7652]"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail cím</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nev@email.hu"
                  className="mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#8A7652]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Vállalkozás neve</label>
              <input
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                required
                placeholder="Cégnév / vállalkozás neve"
                className="mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#8A7652]"
              />
            </div>

            <div className="mt-6">
              <label className="font-semibold">Elhelyezhető összeg</label>
              <select
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none focus:border-[#8A7652] ${
                  form.amount ? "text-[#211F1B]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="5-alatt">5 millió Ft alatt</option>
                <option value="5-20">5–20 millió Ft</option>
                <option value="20-50">20–50 millió Ft</option>
                <option value="50-100">50–100 millió Ft</option>
                <option value="100-felett">100 millió Ft felett</option>
              </select>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Tervezett időtáv</label>
                <select
                  value={form.term}
                  onChange={(e) => setForm({ ...form, term: e.target.value })}
                  className={`mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none focus:border-[#8A7652] ${
                    form.term ? "text-[#211F1B]" : "text-[#AAA096]"
                  }`}
                >
                  <option value="">Válassz...</option>
                  <option value="1-honap-alatt">1 hónap alatt</option>
                  <option value="1-3-honap">1–3 hónap</option>
                  <option value="3-6-honap">3–6 hónap</option>
                  <option value="6-12-honap">6–12 hónap</option>
                  <option value="12-felett">12 hónap felett</option>
                  <option value="meg-nem-tudom">Még nem tudom</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Likviditási igény</label>
                <select
                  value={form.liquidityNeed}
                  onChange={(e) =>
                    setForm({ ...form, liquidityNeed: e.target.value })
                  }
                  className={`mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none focus:border-[#8A7652] ${
                    form.liquidityNeed ? "text-[#211F1B]" : "text-[#AAA096]"
                  }`}
                >
                  <option value="">Válassz...</option>
                  <option value="barmikor-kellhet">Bármikor szükség lehet rá</option>
                  <option value="reszben-kellhet">Egy részére szükség lehet</option>
                  <option value="lekotheto">A teljes összeg leköthető</option>
                  <option value="meg-nem-tudom">Még nem tudom</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Jelenlegi számlavezető bank</label>
              <input
                value={form.currentBank}
                onChange={(e) =>
                  setForm({ ...form, currentBank: e.target.value })
                }
                placeholder="Bank neve – ha szeretnéd megadni"
                className="mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#8A7652]"
              />
            </div>

            <div className="mt-6">
              <label className="font-semibold">Mi a pénz célja később?</label>
              <select
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none focus:border-[#8A7652] ${
                  form.goal ? "text-[#211F1B]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="mukodesi-tartalek">Működési tartalék</option>
                <option value="kesobbi-beruhazas">Későbbi beruházás</option>
                <option value="ado-vagy-kifizetes">Adó / nagyobb kifizetés</option>
                <option value="atmenetileg-szabad">Átmenetileg szabad pénz</option>
                <option value="egyeb">Egyéb</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Megjegyzés</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Írd le röviden, milyen időtávban és milyen céllal gondolkodsz..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#D0C5AE] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#8A7652]"
              />
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#625D55]">
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
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#4B3D28] px-7 py-4 font-semibold text-white transition hover:bg-[#655238] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Betéti lehetőséget kérek"}
              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-semibold text-[#806D4C]">
                {status}
              </p>
            )}
          </form>
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
    <div className="min-h-[280px] rounded-[32px] border border-white/10 bg-white/[0.05] p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E4D5B8] text-[#4A3B27]">
        {icon}
      </div>

      <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#D8D0C4]">{text}</p>
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
    <div className="rounded-[32px] border border-[#C9BDA5] bg-white/35 p-8">
      <span className="text-sm font-bold tracking-[0.2em] text-[#8A7652]">
        {number}
      </span>

      <h3 className="mt-6 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#625D55]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#806D4C] text-white">
        <Check className="h-5 w-5" />
      </span>

      <span className="font-medium text-[#5C574F]">{text}</span>
    </div>
  );
}