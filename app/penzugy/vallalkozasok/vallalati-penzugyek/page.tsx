"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Landmark,
  PiggyBank,
  TrendingUp,
  WalletCards,
} from "lucide-react";

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  companySize: string;
  goal: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  companySize: "",
  goal: "",
  message: "",
  consent: false,
};

export default function VallalatiPenzugyekPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/vallalati-penzugyek", {
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
    <main className="min-h-screen bg-gradient-to-br from-[#2F231C] via-[#191513] to-[#070606] text-[#F2E7D8]">
      {/* VISSZA */}
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#D1B99C] transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-[#6E5948] bg-white/5 px-5 py-3 text-sm font-semibold text-[#E4D0B5] backdrop-blur">
            <BriefcaseBusiness className="h-5 w-5" />
            Vállalati pénzügyi tervezés
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#CBA77D]">
            Vállalati pénzügyek
          </p>

          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            A stabil vállalkozás
            <span className="block text-[#D0AF88]">
              tudatos pénzügyi
            </span>
            <span className="block">döntésekre épül.</span>
          </h1>

          <p className="mt-8 max-w-[700px] text-lg leading-8 text-[#D6CABC]">
            A vállalkozás pénzügyei nem csupán a bevételekről és kiadásokról
            szólnak. Megnézzük a jelenlegi helyzetet, a célokat és azokat a
            pénzügyi lehetőségeket, amelyek támogathatják a vállalkozás
            biztonságos működését és fejlődését.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#E4C59F] px-7 py-4 font-semibold text-[#1A1714] transition hover:bg-[#F1D7B3]"
            >
              Személyre szabott áttekintést kérek
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#attekintes"
              className="inline-flex items-center rounded-full border border-[#735E4B] px-7 py-4 font-semibold transition hover:bg-white/5"
            >
              Mit nézünk meg?
            </a>
          </div>
        </div>

        {/* SZIPORKA + PÉTER */}
        <div className="relative min-h-[650px] overflow-hidden rounded-[48px] border border-white/10 bg-[#171310]">
          <Image
            src="/sziporka-peter-vallalati-penzugyek.png"
            alt="Sziporka és Péter – vállalati pénzügyek"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

          <div className="absolute bottom-8 left-8 z-20 max-w-[430px] rounded-[28px] border border-white/10 bg-[#11100E]/88 p-7 shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D2B993]">
              Sziporka és Péter segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, hol lehet több stabilitás, jobb tervezhetőség és
              nagyobb pénzügyi mozgástér a vállalkozásodban.
            </p>
          </div>
        </div>
      </section>

      {/* ÁTTEKINTÉS */}
      <section
        id="attekintes"
        className="bg-[#EFE4D4] px-6 py-24 text-[#211B17] lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9B7553]">
                Pénzügyi áttekintés
              </p>

              <h2 className="mt-4 max-w-[540px] font-serif text-5xl font-semibold leading-[1.02]">
                Először azt nézzük meg, hol tart most a vállalkozás.
              </h2>

              <p className="mt-7 max-w-[560px] text-lg leading-8 text-[#66594D]">
                Más pénzügyi megoldás illik egy növekedés előtt álló céghez,
                és más ahhoz, amelynek elsődleges célja a stabil működés vagy a
                likviditás megerősítése. A kiindulópont mindig a jelenlegi
                helyzet.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FinanceCard
                icon={<WalletCards className="h-6 w-6" />}
                title="Likviditás"
                text="Mekkora pénzügyi mozgástér szükséges a vállalkozás biztonságos működéséhez?"
              />

              <FinanceCard
                icon={<TrendingUp className="h-6 w-6" />}
                title="Fejlesztési célok"
                text="Beruházás, bővítés vagy új üzleti lehetőség előtt megvizsgáljuk a pénzügyi hátteret."
              />

              <FinanceCard
                icon={<Landmark className="h-6 w-6" />}
                title="Finanszírozás"
                text="Áttekintjük, milyen finanszírozási irány illeszkedhet a vállalkozás terveihez."
              />

              <FinanceCard
                icon={<PiggyBank className="h-6 w-6" />}
                title="Pénzügyi tartalék"
                text="A váratlan helyzetekre és a hosszabb távú célokra is érdemes előre felkészülni."
              />
            </div>
          </div>
        </div>
      </section>

      {/* STRATÉGIA */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[780px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C9A67E]">
              Stratégia és stabilitás
            </p>

            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              A pénzügyi döntések akkor erősek, ha egymásra épülnek.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Step
              number="01"
              title="Helyzetkép"
              text="Áttekintjük a vállalkozás pénzügyi helyzetét, működését és a fontosabb kockázati pontokat."
            />

            <Step
              number="02"
              title="Célok"
              text="Meghatározzuk, hogy stabilitás, fejlesztés, finanszírozás vagy tartalékképzés a fő irány."
            />

            <Step
              number="03"
              title="Pénzügyi irány"
              text="A vállalkozás lehetőségeihez igazítjuk a szóba jöhető megoldásokat és a következő lépéseket."
            />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section id="kapcsolat" className="bg-[#1A1613] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C7A47C]">
              Személyre szabott vállalati áttekintés
            </p>

            <h2 className="mt-5 max-w-[570px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, mire van most leginkább szüksége a vállalkozásodnak.
            </h2>

            <p className="mt-7 max-w-[570px] text-lg leading-8 text-[#D5C9BB]">
              Add meg az alapadatokat, és átbeszéljük, mely pénzügyi területek
              érdemelnek figyelmet a jelenlegi működéshez és a következő
              időszak céljaihoz igazodva.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A vállalkozás jelenlegi helyzetéből indulunk ki." />
              <CheckLine text="A működési és fejlesztési célokat együtt nézzük." />
              <CheckLine text="A pénzügyi mozgástérhez igazítjuk a lehetőségeket." />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[40px] bg-[#F8F2E9] p-7 text-[#211B17] shadow-2xl sm:p-10"
          >
            <div>
              <label className="font-semibold">Név</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Teljes név"
                className="mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#A77E57]"
              />
            </div>

            <div className="mt-6">
              <label className="font-semibold">Vállalkozás neve</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Cégnév / vállalkozás neve"
                className="mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#A77E57]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Telefonszám</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+36..."
                  className="mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#A77E57]"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail cím</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nev@email.hu"
                  className="mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#A77E57]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Mekkora a vállalkozás?</label>
              <select
                value={form.companySize}
                onChange={(e) =>
                  setForm({ ...form, companySize: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#A77E57] ${
                  form.companySize ? "text-[#211B17]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="egyeni">Egyéni vállalkozás</option>
                <option value="2-10">2–10 fő</option>
                <option value="11-25">11–25 fő</option>
                <option value="26-50">26–50 fő</option>
                <option value="51-100">51–100 fő</option>
                <option value="100-felett">100 fő felett</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Melyik terület a legfontosabb most?
              </label>

              <select
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#A77E57] ${
                  form.goal ? "text-[#211B17]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="likviditas">Likviditás</option>
                <option value="fejlesztes">Fejlesztés / beruházás</option>
                <option value="finanszirozas">Finanszírozás</option>
                <option value="tartalek">Pénzügyi tartalék</option>
                <option value="koltsegstruktura">Költségstruktúra áttekintése</option>
                <option value="altalanos-attekintes">Általános pénzügyi áttekintés</option>
                <option value="meg-nem-tudom">Még nem tudom pontosan</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Miben segíthetünk?</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Írd le röviden, milyen vállalati pénzügyi kérdésben szeretnél segítséget..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#A77E57]"
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
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#211B17] px-7 py-4 font-semibold text-white transition hover:bg-[#3A3029] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Vállalati áttekintést kérek"}
              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-semibold text-[#725D49]">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function FinanceCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="min-h-[280px] rounded-[32px] border border-[#D7C6B2] bg-[#F8F1E7] p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#29231F] text-[#E4C49B]">
        {icon}
      </div>

      <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#66594D]">{text}</p>
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
    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
      <span className="text-sm font-bold tracking-[0.2em] text-[#D0AE83]">
        {number}
      </span>

      <h3 className="mt-6 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#D5C9BB]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D1B18A] text-[#1B1714]">
        <Check className="h-5 w-5" />
      </span>

      <span className="font-medium text-[#D5C9BB]">{text}</span>
    </div>
  );
}