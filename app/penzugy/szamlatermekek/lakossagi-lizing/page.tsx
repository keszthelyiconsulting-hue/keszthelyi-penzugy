"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  CircleDollarSign,
  Clock3,
  FileText,
  Gauge,
  Percent,
} from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  financingPurpose: string;
  assetValue: string;
  downPayment: string;
  term: string;
  monthlyBudget: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  financingPurpose: "",
  assetValue: "",
  downPayment: "",
  term: "",
  monthlyBudget: "",
  message: "",
  consent: false,
};

export default function LakossagiLizingPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/lakossagi-lizing", {
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
    <main className="min-h-screen bg-gradient-to-br from-[#E9E3D5] via-[#D8DCCF] to-[#93A28F] text-[#1E211C]">
      {/* VISSZA */}
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#506357] transition hover:text-[#1E211C]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-[#AAB7A9] bg-white/45 px-5 py-3 text-sm font-semibold text-[#4D6255]">
            <Car className="h-5 w-5" />
            Lakossági lízing
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6D7F70]">
            Finanszírozás a terveidhez igazítva
          </p>

          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Ne csak azt nézzük,
            <span className="block text-[#4F6A59]">
              mit szeretnél finanszírozni.
            </span>
            <span className="block">Azt is, hogyan.</span>
          </h1>

          <p className="mt-8 max-w-[700px] text-lg leading-8 text-[#5B615A]">
            A lakossági lízingnél a finanszírozás tárgya, az önerő, a futamidő
            és a vállalható havi teher együtt számít. Segítünk átnézni, milyen
            konstrukció illeszkedhet legjobban a terveidhez és a pénzügyi
            lehetőségeidhez.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#264136] px-7 py-4 font-semibold text-white transition hover:bg-[#355749]"
            >
              Személyre szabott lehetőséget kérek
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#tervezes"
              className="inline-flex items-center rounded-full border border-[#92A390] px-7 py-4 font-semibold transition hover:bg-white/35"
            >
              Hogyan tervezzünk?
            </a>
          </div>
        </div>

        {/* SZIPORKA */}
        <div className="relative min-h-[650px] overflow-hidden rounded-[48px] bg-gradient-to-br from-[#1E3B31] via-[#14291F] to-[#08110D]">
          <div className="absolute left-10 top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute right-10 top-16 h-72 w-72 rounded-full border border-[#D3B77F]/20" />

          <Image
            src="/sziporka-lakossagi-lizing.png"
            alt="Sziporka – lakossági lízing"
            fill
            priority
            className="relative z-10 object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute bottom-8 left-8 z-20 max-w-[430px] rounded-[28px] border border-white/10 bg-[#0D1612]/90 p-7 text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D8C6A3]">
              Sziporka segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, mekkora önerővel, milyen futamidővel és milyen havi
              teherrel lehet kényelmesen tervezni.
            </p>
          </div>
        </div>
      </section>

      {/* TERVEZÉS */}
      <section
        id="tervezes"
        className="bg-gradient-to-br from-[#203A30] via-[#15281F] to-[#09110D] px-6 py-24 text-[#F4ECDE] lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#D3B987]">
                A részletek együtt számítanak
              </p>

              <h2 className="mt-4 max-w-[560px] font-serif text-5xl font-semibold leading-[1.02]">
                A jó lízing nem csak az alacsony havi díjról szól.
              </h2>

              <p className="mt-7 max-w-[590px] text-lg leading-8 text-[#D8D0C4]">
                Az önerő, a futamidő, a finanszírozott összeg és a havi
                terhelhetőség együtt adja ki, hogy melyik konstrukció lehet
                számodra valóban vállalható.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon={<CircleDollarSign className="h-6 w-6" />}
                title="Önerő"
                text="Megnézzük, mekkora saját forrással érdemes elindulni."
              />

              <InfoCard
                icon={<Clock3 className="h-6 w-6" />}
                title="Futamidő"
                text="A rövidebb és hosszabb futamidő más havi terhelést és teljes költséget jelent."
              />

              <InfoCard
                icon={<Gauge className="h-6 w-6" />}
                title="Havi teher"
                text="Nem csak azt nézzük, mi fér bele papíron, hanem azt is, mi vállalható kényelmesen."
              />

              <InfoCard
                icon={<Percent className="h-6 w-6" />}
                title="Teljes költség"
                text="A finanszírozás teljes költségét együtt érdemes átlátni."
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOGYAN VÁLASZTUNK */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[780px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#607363]">
              Személyre szabott tervezés
            </p>

            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              Először azt nézzük meg, mire és milyen kerettel tervezel.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <Step
              number="01"
              title="Mit finanszíroznál?"
              text="A finanszírozás tárgya határozza meg az első lépést."
            />

            <Step
              number="02"
              title="Mekkora az értéke?"
              text="A teljes vételárból indulunk ki, nem csak a havi részletből."
            />

            <Step
              number="03"
              title="Mennyi önerőd van?"
              text="Az önerő jelentősen befolyásolja a finanszírozás szerkezetét."
            />

            <Step
              number="04"
              title="Mekkora havi teher fér bele?"
              text="A cél egy olyan konstrukció, amely hosszabb távon is kényelmesen vállalható."
            />
          </div>
        </div>
      </section>

      {/* FONTOS BLOKK */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1500px] rounded-[36px] border border-[#B9C3B7] bg-[#F1EFE8] p-8 sm:p-10">
          <div className="flex items-start gap-5">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#355947] text-white">
              <FileText className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#617362]">
                Fontos tudni
              </p>

              <h2 className="mt-4 max-w-[920px] font-serif text-4xl font-semibold leading-tight">
                A lízing feltételei a finanszírozás tárgyától és a választott
                konstrukciótól is függhetnek.
              </h2>

              <p className="mt-5 max-w-[980px] text-lg leading-8 text-[#62665F]">
                Ezért nem egyetlen sablonmegoldásból indulunk ki. Először
                áttekintjük a célt és a pénzügyi kereteket, majd ezekhez keressük
                a szóba jöhető lehetőségeket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section id="kapcsolat" className="bg-[#D7DCCF] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#5D725F]">
              Személyre szabott lízingtervezés
            </p>

            <h2 className="mt-5 max-w-[570px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, milyen finanszírozás illik a terveidhez.
            </h2>

            <p className="mt-7 max-w-[570px] text-lg leading-8 text-[#5B615A]">
              Add meg az alapadatokat és a tervezett finanszírozás főbb
              paramétereit. Ezek alapján könnyebb lesz átnézni, milyen
              konstrukciók lehetnek számodra érdekesek.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A finanszírozási célból indulunk ki." />
              <CheckLine text="Az önerőt és a havi terhelhetőséget együtt nézzük." />
              <CheckLine text="A futamidőt a vállalható havi teherhez igazítjuk." />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[40px] bg-[#FBF8F3] p-7 shadow-xl shadow-black/5 sm:p-10"
          >
            <div>
              <label className="font-semibold">Név</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Teljes név"
                className="mt-2 w-full rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5D7460]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Telefonszám</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+36..."
                  className="mt-2 w-full rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5D7460]"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail cím</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nev@email.hu"
                  className="mt-2 w-full rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5D7460]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Mit szeretnél finanszírozni?</label>
              <select
                value={form.financingPurpose}
                onChange={(e) =>
                  setForm({ ...form, financingPurpose: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none focus:border-[#5D7460] ${
                  form.financingPurpose ? "text-[#1E211C]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="szemelyauto">Személyautó</option>
                <option value="motor">Motor</option>
                <option value="lakojarmu">Lakójármű / lakókocsi</option>
                <option value="hajo">Hajó / vízi jármű</option>
                <option value="egyeb">Egyéb</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Tervezett érték</label>
              <select
                value={form.assetValue}
                onChange={(e) => setForm({ ...form, assetValue: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none focus:border-[#5D7460] ${
                  form.assetValue ? "text-[#1E211C]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="3-alatt">3 millió Ft alatt</option>
                <option value="3-6">3–6 millió Ft</option>
                <option value="6-10">6–10 millió Ft</option>
                <option value="10-20">10–20 millió Ft</option>
                <option value="20-felett">20 millió Ft felett</option>
              </select>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Önerő</label>
                <select
                  value={form.downPayment}
                  onChange={(e) =>
                    setForm({ ...form, downPayment: e.target.value })
                  }
                  className={`mt-2 w-full rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none focus:border-[#5D7460] ${
                    form.downPayment ? "text-[#1E211C]" : "text-[#AAA096]"
                  }`}
                >
                  <option value="">Válassz...</option>
                  <option value="10-alatt">10% alatt</option>
                  <option value="10-20">10–20%</option>
                  <option value="20-30">20–30%</option>
                  <option value="30-felett">30% felett</option>
                  <option value="meg-nem-tudom">Még nem tudom</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Tervezett futamidő</label>
                <select
                  value={form.term}
                  onChange={(e) => setForm({ ...form, term: e.target.value })}
                  className={`mt-2 w-full rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none focus:border-[#5D7460] ${
                    form.term ? "text-[#1E211C]" : "text-[#AAA096]"
                  }`}
                >
                  <option value="">Válassz...</option>
                  <option value="1-3">1–3 év</option>
                  <option value="3-5">3–5 év</option>
                  <option value="5-7">5–7 év</option>
                  <option value="meg-nem-tudom">Még nem tudom</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Mekkora havi teher fér bele kényelmesen?
              </label>

              <select
                value={form.monthlyBudget}
                onChange={(e) =>
                  setForm({ ...form, monthlyBudget: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none focus:border-[#5D7460] ${
                  form.monthlyBudget ? "text-[#1E211C]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="50-alatt">50 000 Ft alatt</option>
                <option value="50-100">50 000 – 100 000 Ft</option>
                <option value="100-150">100 000 – 150 000 Ft</option>
                <option value="150-250">150 000 – 250 000 Ft</option>
                <option value="250-felett">250 000 Ft felett</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Megjegyzés</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Írd le röviden, mit szeretnél finanszírozni és mi fontos számodra..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#C6D0C4] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5D7460]"
              />
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#5B615A]">
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
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#284438] px-7 py-4 font-semibold text-white transition hover:bg-[#365A49] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Személyre szabott lehetőséget kérek"}
              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-semibold text-[#5D725F]">
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
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E2D4B8] text-[#23382D]">
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
    <div className="rounded-[32px] border border-[#BAC5B8] bg-white/35 p-8">
      <span className="text-sm font-bold tracking-[0.2em] text-[#617563]">
        {number}
      </span>

      <h3 className="mt-6 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#5B615A]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5D725F] text-white">
        <Check className="h-5 w-5" />
      </span>

      <span className="font-medium text-[#555C55]">{text}</span>
    </div>
  );
}