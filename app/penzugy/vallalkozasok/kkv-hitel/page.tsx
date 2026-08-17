"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Clock3,
  FileText,
  Landmark,
  LineChart,
  ShieldCheck,
} from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  companyType: string;
  operatingHistory: string;
  annualRevenue: string;
  loanPurpose: string;
  requestedAmount: string;
  term: string;
  collateral: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  companyName: "",
  companyType: "",
  operatingHistory: "",
  annualRevenue: "",
  loanPurpose: "",
  requestedAmount: "",
  term: "",
  collateral: "",
  message: "",
  consent: false,
};

export default function KkvHitelPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/kkv-hitel", {
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
    <main className="min-h-screen bg-gradient-to-br from-[#EEE9DE] via-[#D8DED7] to-[#91A59B] text-[#1F211F]">
      {/* VISSZA */}
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4E625A] transition hover:text-[#1F211F]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-[#A9B8B0] bg-white/45 px-5 py-3 text-sm font-semibold text-[#465B53]">
            <Building2 className="h-5 w-5" />
            KKV finanszírozás
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#667B71]">
            KKV hitel
          </p>

          <h1 className="mt-5 max-w-[780px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Forrás a vállalkozás
            <span className="block text-[#4D6B5D]">következő lépéséhez.</span>
          </h1>

          <p className="mt-8 max-w-[720px] text-lg leading-8 text-[#5A615D]">
            Beruházás, forgóeszköz, készlet, gép- vagy eszközbeszerzés,
            ingatlan, fejlesztés, likviditás vagy meglévő finanszírozás
            rendezése – a célhoz és a vállalkozás működéséhez illeszkedő
            finanszírozási lehetőségeket nézzük át.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#264238] px-7 py-4 font-semibold text-white transition hover:bg-[#365A4D]"
            >
              Finanszírozási lehetőséget kérek
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#tervezes"
              className="inline-flex items-center rounded-full border border-[#94A79E] px-7 py-4 font-semibold transition hover:bg-white/35"
            >
              Mit nézünk meg?
            </a>
          </div>
        </div>

        {/* PÉTER */}
        <div className="relative min-h-[650px] overflow-hidden rounded-[48px] bg-gradient-to-br from-[#1D3A31] via-[#14281F] to-[#08110D]">
          <div className="absolute left-10 top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute right-10 top-16 h-72 w-72 rounded-full border border-[#D6BD8E]/20" />

          <Image
            src="/peter-kkv-hitel.png"
            alt="Péter – KKV hitel"
            fill
            priority
            className="relative z-10 object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute bottom-8 left-8 z-20 max-w-[450px] rounded-[28px] border border-white/10 bg-[#0C1511]/90 p-7 text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#DCC7A1]">
              Péter segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, milyen finanszírozási szerkezet illeszkedik a
              vállalkozásod működéséhez és céljaihoz.
            </p>
          </div>
        </div>
      </section>

      {/* TERVEZÉS */}
      <section
        id="tervezes"
        className="bg-gradient-to-br from-[#203B32] via-[#14271F] to-[#09110D] px-6 py-24 text-[#F3EBDD] lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#D5BA8A]">
                Nem csak a kamat számít
              </p>

              <h2 className="mt-4 max-w-[580px] font-serif text-5xl font-semibold leading-[1.02]">
                A jó vállalati finanszírozás a működéshez illeszkedik.
              </h2>

              <p className="mt-7 max-w-[610px] text-lg leading-8 text-[#D8D0C4]">
                A hitelcél, az árbevétel, a működési múlt, az igényelt összeg,
                a futamidő és az esetleges fedezet együtt határozza meg, milyen
                konstrukciók jöhetnek szóba.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon={<Landmark className="h-6 w-6" />}
                title="Hitelcél"
                text="Beruházás, fejlesztés, forgóeszköz, likviditás vagy más vállalati cél."
              />

              <InfoCard
                icon={<LineChart className="h-6 w-6" />}
                title="Árbevétel és működés"
                text="A vállalkozás pénzügyi múltja és jelenlegi működése fontos kiindulópont."
              />

              <InfoCard
                icon={<Clock3 className="h-6 w-6" />}
                title="Futamidő"
                text="A finanszírozási célt és a vállalható havi terhelést együtt érdemes nézni."
              />

              <InfoCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Fedezet"
                text="Megnézzük, szükséges-e és milyen típusú fedezet jöhet szóba."
              />
            </div>
          </div>
        </div>
      </section>

      {/* HITELCÉLOK */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[800px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#61766A]">
              Tipikus finanszírozási célok
            </p>

            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              Más célhoz más finanszírozási szerkezet lehet ideális.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <Step
              number="01"
              title="Beruházás"
              text="Telephely, ingatlan, gép, eszköz vagy technológiai fejlesztés."
            />

            <Step
              number="02"
              title="Forgóeszköz"
              text="Készlet, működési költségek vagy szezonális finanszírozási igény."
            />

            <Step
              number="03"
              title="Likviditás"
              text="Átmeneti finanszírozási igény vagy rövidebb távú pénzügyi mozgástér."
            />

            <Step
              number="04"
              title="Hitelkiváltás"
              text="Meglévő vállalati finanszírozás újragondolása vagy rendezése."
            />
          </div>
        </div>
      </section>

      {/* FONTOS BLOKK */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1500px] rounded-[36px] border border-[#BCC7BF] bg-[#F3F0E8] p-8 sm:p-10">
          <div className="flex items-start gap-5">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#355A49] text-white">
              <FileText className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#65796D]">
                Előkészítés
              </p>

              <h2 className="mt-4 max-w-[920px] font-serif text-4xl font-semibold leading-tight">
                Egy jól előkészített finanszírozási igény gyorsabban és
                átláthatóbban kezelhető.
              </h2>

              <p className="mt-5 max-w-[980px] text-lg leading-8 text-[#626762]">
                Az első egyeztetésnél a vállalkozás alapadatai, a cél, az
                igényelt összeg és a pénzügyi keretek áttekintése segít abban,
                hogy a releváns finanszírozási lehetőségekre koncentráljunk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section id="kapcsolat" className="bg-[#D7DDD6] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#5E7566]">
              KKV finanszírozási igényfelmérés
            </p>

            <h2 className="mt-5 max-w-[600px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, milyen finanszírozás illik a vállalkozásodhoz.
            </h2>

            <p className="mt-7 max-w-[580px] text-lg leading-8 text-[#5B625D]">
              Add meg a vállalkozás főbb adatait és a finanszírozási igényt.
              Ezek alapján könnyebb lesz meghatározni, milyen irányban érdemes
              továbbmenni.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A hitelcélból és a vállalkozás működéséből indulunk ki." />
              <CheckLine text="Az igényelt összeget és futamidőt együtt nézzük." />
              <CheckLine text="A fedezeti lehetőségeket is figyelembe vesszük." />
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
                className="mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5F7768]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Telefonszám</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+36..."
                  className="mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5F7768]"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail cím</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nev@email.hu"
                  className="mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5F7768]"
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
                className="mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5F7768]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Vállalkozás típusa</label>
                <select
                  value={form.companyType}
                  onChange={(e) =>
                    setForm({ ...form, companyType: e.target.value })
                  }
                  className={`mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none focus:border-[#5F7768] ${
                    form.companyType ? "text-[#1F211F]" : "text-[#AAA096]"
                  }`}
                >
                  <option value="">Válassz...</option>
                  <option value="egyeni-vallalkozo">Egyéni vállalkozó</option>
                  <option value="bt">Bt.</option>
                  <option value="kft">Kft.</option>
                  <option value="zrt">Zrt.</option>
                  <option value="egyeb">Egyéb</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Működési múlt</label>
                <select
                  value={form.operatingHistory}
                  onChange={(e) =>
                    setForm({ ...form, operatingHistory: e.target.value })
                  }
                  className={`mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none focus:border-[#5F7768] ${
                    form.operatingHistory ? "text-[#1F211F]" : "text-[#AAA096]"
                  }`}
                >
                  <option value="">Válassz...</option>
                  <option value="1-alatt">1 év alatt</option>
                  <option value="1-2">1–2 év</option>
                  <option value="2-5">2–5 év</option>
                  <option value="5-felett">5 év felett</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Éves árbevétel</label>
              <select
                value={form.annualRevenue}
                onChange={(e) =>
                  setForm({ ...form, annualRevenue: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none focus:border-[#5F7768] ${
                  form.annualRevenue ? "text-[#1F211F]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="20-alatt">20 millió Ft alatt</option>
                <option value="20-50">20–50 millió Ft</option>
                <option value="50-100">50–100 millió Ft</option>
                <option value="100-300">100–300 millió Ft</option>
                <option value="300-felett">300 millió Ft felett</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Hitelcél</label>
              <select
                value={form.loanPurpose}
                onChange={(e) =>
                  setForm({ ...form, loanPurpose: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none focus:border-[#5F7768] ${
                  form.loanPurpose ? "text-[#1F211F]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="beruhazas">Beruházás / fejlesztés</option>
                <option value="forgoeszkoz">Forgóeszköz / készlet</option>
                <option value="gep-eszkoz">Gép- vagy eszközbeszerzés</option>
                <option value="ingatlan">Ingatlan / telephely</option>
                <option value="likviditas">Likviditási cél</option>
                <option value="hitelkivaltas">Hitelkiváltás</option>
                <option value="egyeb">Egyéb</option>
              </select>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Igényelt összeg</label>
                <select
                  value={form.requestedAmount}
                  onChange={(e) =>
                    setForm({ ...form, requestedAmount: e.target.value })
                  }
                  className={`mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none focus:border-[#5F7768] ${
                    form.requestedAmount ? "text-[#1F211F]" : "text-[#AAA096]"
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

              <div>
                <label className="font-semibold">Tervezett futamidő</label>
                <select
                  value={form.term}
                  onChange={(e) => setForm({ ...form, term: e.target.value })}
                  className={`mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none focus:border-[#5F7768] ${
                    form.term ? "text-[#1F211F]" : "text-[#AAA096]"
                  }`}
                >
                  <option value="">Válassz...</option>
                  <option value="1-alatt">1 év alatt</option>
                  <option value="1-3">1–3 év</option>
                  <option value="3-5">3–5 év</option>
                  <option value="5-felett">5 év felett</option>
                  <option value="meg-nem-tudom">Még nem tudom</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Van bevonható fedezet?</label>
              <select
                value={form.collateral}
                onChange={(e) =>
                  setForm({ ...form, collateral: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none focus:border-[#5F7768] ${
                  form.collateral ? "text-[#1F211F]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="igen-ingatlan">Igen, ingatlan</option>
                <option value="igen-egyeb">Igen, egyéb fedezet</option>
                <option value="nincs">Nincs</option>
                <option value="meg-nem-tudom">Még nem tudom</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Megjegyzés</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Írd le röviden a finanszírozási célt és az egyéb fontos információkat..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#C7D1C9] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5F7768]"
              />
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#5B625D]">
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
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#28473A] px-7 py-4 font-semibold text-white transition hover:bg-[#365B4B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Finanszírozási lehetőséget kérek"}
              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-semibold text-[#5F7567]">
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
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E4D7BE] text-[#23382F]">
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
    <div className="rounded-[32px] border border-[#BCC8C0] bg-white/35 p-8">
      <span className="text-sm font-bold tracking-[0.2em] text-[#61776A]">
        {number}
      </span>

      <h3 className="mt-6 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#5B625D]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5E7567] text-white">
        <Check className="h-5 w-5" />
      </span>

      <span className="font-medium text-[#565D58]">{text}</span>
    </div>
  );
}