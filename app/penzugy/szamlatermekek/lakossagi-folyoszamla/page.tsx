"use client";


import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  PiggyBank,
  ReceiptText,
  RefreshCcw,
} from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  monthlyIncome: string;
  bankingStyle: string;
  priority: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  monthlyIncome: "",
  bankingStyle: "",
  priority: "",
  message: "",
  consent: false,
};

export default function LakossagiFolyoszamlaPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/lakossagi-folyoszamla", {
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
    <main className="min-h-screen bg-gradient-to-br from-[#F2E8DA] via-[#DDD0BF] to-[#B7A38D] text-[#1E1A17]">
      {/* VISSZA */}
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E5846] transition hover:text-[#1E1A17]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-[#BDA991] bg-white/50 px-5 py-3 text-sm font-semibold text-[#655240]">
            <ReceiptText className="h-5 w-5" />
            Mindennapi bankolás
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9D7551]">
            Lakossági folyószámla
          </p>

          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            A bankszámlád minden nap veled van.
            <span className="block text-[#8F6747]">
              Legyen olyan, ami hozzád is illik.
            </span>
          </h1>

          <p className="mt-8 max-w-[700px] text-lg leading-8 text-[#62564C]">
            Jövedelem, átutalások, készpénzfelvétel és mindennapi fizetések –
            segítünk átnézni, milyen számlamegoldás illeszkedik a bankolási
            szokásaidhoz és mennyibe kerül valójában a jelenlegi számlád.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#25201C] px-7 py-4 font-semibold text-white transition hover:bg-[#3A322C]"
            >
              Megnézem a lehetőségeimet
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#bankvaltas"
              className="inline-flex items-center rounded-full border border-[#AC957D] px-7 py-4 font-semibold transition hover:bg-white/40"
            >
              Megéri bankot váltani?
            </a>
          </div>
        </div>

        {/* SZIPORKA */}
        <div className="relative min-h-[650px] overflow-hidden rounded-[48px] bg-gradient-to-br from-[#233247] via-[#1A2432] to-[#0C1118]">
          <div className="absolute left-10 top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute right-10 top-20 h-72 w-72 rounded-full border border-[#C8A77F]/20" />

          <Image
            src="/sziporka-lakossagi-folyoszamla.png"
            alt="Sziporka – lakossági folyószámla"
            fill
            priority
            className="relative z-10 object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute bottom-8 left-8 z-20 max-w-[420px] rounded-[28px] border border-white/10 bg-[#111318]/90 p-7 text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D8C5AA]">
              Sziporka segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, mennyit fizetsz most, és van-e számodra jobb
              bankszámla.
            </p>
          </div>
        </div>
      </section>

      {/* BANKVÁLTÁS */}
      <section
        id="bankvaltas"
        className="bg-gradient-to-br from-[#2C211B] via-[#191411] to-[#070606] px-6 py-24 text-[#F2E8DA] lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#D0AD84]">
                Bankváltás
              </p>

              <h2 className="mt-4 max-w-[560px] font-serif text-5xl font-semibold leading-[1.02]">
                Megéri megnézni, mit fizetsz most.
              </h2>

              <p className="mt-7 max-w-[580px] text-lg leading-8 text-[#D8CDBF]">
                Egy bankváltással nemcsak a havi banki költségeiden
                spórolhatsz. Egyes bankok időszakosan számlanyitási vagy
                bankváltási jóváírást is kínálhatnak, így megfelelő feltételek
                teljesítése mellett akár pénzt is kaphatsz az új számla
                megnyitásáért.
              </p>

              <p className="mt-6 max-w-[580px] font-serif text-2xl font-semibold text-[#E0BE92]">
                Ne megszokásból maradj a bankodnál. Nézzük meg, van-e jobb
                lehetőséged.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon={<ReceiptText className="h-6 w-6" />}
                title="Számlavezetési díj"
                text="Megnézzük, mennyibe kerül havonta a számlád fenntartása."
              />

              <InfoCard
                icon={<RefreshCcw className="h-6 w-6" />}
                title="Átutalások"
                text="Az utalási szokásaid jelentősen befolyásolhatják a teljes havi költséget."
              />

              <InfoCard
                icon={<Banknote className="h-6 w-6" />}
                title="Készpénzfelvétel"
                text="Áttekintjük, milyen gyakran és hogyan használsz készpénzt."
              />

              <InfoCard
                icon={<PiggyBank className="h-6 w-6" />}
                title="Lehetséges megtakarítás"
                text="Összevetjük a jelenlegi költségeidet a szóba jöhető számlamegoldásokkal."
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOGYAN VÁLASZTUNK */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[780px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8F6747]">
              Nem csak a havidíjat nézzük
            </p>

            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              A jó számlacsomag a bankolási szokásaidhoz illeszkedik.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <Step
              number="01"
              title="Mire használod?"
              text="Átutalás, készpénz, rendszeres beszedések vagy főként mindennapi fizetés?"
            />

            <Step
              number="02"
              title="Mennyi érkezik rá?"
              text="A havi jóváírás összege több számlacsomagnál fontos feltétel lehet."
            />

            <Step
              number="03"
              title="Hogyan bankolsz?"
              text="Megnézzük, inkább online, mobilon vagy személyesen intézed a pénzügyeidet."
            />

            <Step
              number="04"
              title="Mi fontos neked?"
              text="Alacsony költség, egyszerű használat, gyors ügyintézés vagy más szempont?"
            />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section id="kapcsolat" className="bg-[#E6D8C7] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8F6747]">
              Személyre szabott számlaáttekintés
            </p>

            <h2 className="mt-5 max-w-[570px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, milyen folyószámla illik hozzád.
            </h2>

            <p className="mt-7 max-w-[570px] text-lg leading-8 text-[#62564C]">
              Add meg az alapadataidat és néhány információt a bankolási
              szokásaidról. Ez alapján könnyebb lesz átnézni, milyen
              számlamegoldások lehetnek számodra érdekesek.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A jelenlegi bankolási szokásaidból indulunk ki." />
              <CheckLine text="A havi költségeket együtt nézzük." />
              <CheckLine text="A bankváltás lehetőségét is megvizsgáljuk." />
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
                className="mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#9C7555]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Telefonszám</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+36..."
                  className="mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#9C7555]"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail cím</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nev@email.hu"
                  className="mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#9C7555]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Mennyi érkezik a számládra havonta?
              </label>

              <select
                value={form.monthlyIncome}
                onChange={(e) =>
                  setForm({ ...form, monthlyIncome: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#9C7555] ${
                  form.monthlyIncome ? "text-[#1E1A17]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="150-alatt">150 000 Ft alatt</option>
                <option value="150-300">150 000 – 300 000 Ft</option>
                <option value="300-500">300 000 – 500 000 Ft</option>
                <option value="500-felett">500 000 Ft felett</option>
                <option value="valtozo">Változó összeg</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Hogyan bankolsz leggyakrabban?
              </label>

              <select
                value={form.bankingStyle}
                onChange={(e) =>
                  setForm({ ...form, bankingStyle: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#9C7555] ${
                  form.bankingStyle ? "text-[#1E1A17]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="mobil">Főként mobilbankban</option>
                <option value="online">Főként internetbankban</option>
                <option value="kartya">Leginkább kártyával fizetek</option>
                <option value="keszpenz">Gyakran használok készpénzt</option>
                <option value="vegyes">Vegyesen használom</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Mi a legfontosabb számodra?
              </label>

              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#9C7555] ${
                  form.priority ? "text-[#1E1A17]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="alacsony-koltseg">Alacsony havi költség</option>
                <option value="olcso-utalas">Kedvező átutalások</option>
                <option value="keszpenzfelvetel">Készpénzfelvétel</option>
                <option value="online-ugyintezes">Egyszerű online ügyintézés</option>
                <option value="bankvaltas">Bankváltással elérhető előnyök</option>
                <option value="meg-nem-tudom">Még nem tudom</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Miben segíthetünk?</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Írd le röviden, mit szeretnél a jelenlegi bankszámládhoz képest..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#9C7555]"
              />
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#66594C]">
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
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#25201C] px-7 py-4 font-semibold text-white transition hover:bg-[#3A322C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Megnézem a lehetőségeimet"}
              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-semibold text-[#765F4B]">
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
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8D8C2] text-[#251F1A]">
        {icon}
      </div>

      <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#D8CDBF]">{text}</p>
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
    <div className="rounded-[32px] border border-[#CFBDA7] bg-white/35 p-8">
      <span className="text-sm font-bold tracking-[0.2em] text-[#8F6747]">
        {number}
      </span>

      <h3 className="mt-6 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#62564C]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8F6747] text-white">
        <Check className="h-5 w-5" />
      </span>

      <span className="font-medium text-[#5D5147]">{text}</span>
    </div>
  );
}