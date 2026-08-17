"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  keyPersonRole: string;
  goal: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  keyPersonRole: "",
  goal: "",
  message: "",
  consent: false,
};

export default function KulcsemberVedelemPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/kulcsember-vedelem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <main className="min-h-screen bg-gradient-to-br from-[#2E211A] via-[#171311] to-[#050505] text-[#F2E8DA]">
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0BA9A] transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-[#6E5845] bg-white/5 px-5 py-3 text-sm font-semibold text-[#E4D2B9] backdrop-blur">
            <BriefcaseBusiness className="h-5 w-5" />
            Vállalati kockázatvédelem
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C8A77E]">
            Kulcsember-védelem
          </p>

          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            A vállalkozás valódi értékét
            <span className="block text-[#D1B18A]">
              az emberek adják.
            </span>
          </h1>

          <p className="mt-8 max-w-[700px] text-lg leading-8 text-[#D5C9BB]">
            Egy meghatározó vezető, szakember vagy tulajdonos kiesése komoly
            pénzügyi és működési kockázatot jelenthet. A kulcsember-védelem
            célja, hogy a vállalkozásnak legyen pénzügyi mozgástere egy váratlan
            helyzetben.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#E3C49A] px-7 py-4 font-semibold text-[#1A1714] transition hover:bg-[#F0D5AF]"
            >
              Személyre szabott áttekintést kérek
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#miert"
              className="inline-flex items-center rounded-full border border-[#735D49] px-7 py-4 font-semibold text-[#F2E8DA] transition hover:bg-white/5"
            >
              Miért fontos?
            </a>
          </div>
        </div>

        <div className="relative min-h-[680px] overflow-hidden rounded-[48px] border border-white/10 bg-gradient-to-br from-[#3A2C24] via-[#221B17] to-[#0C0A09]">
          <div className="absolute left-10 top-10 h-44 w-44 rounded-full border border-[#A98B68]/30" />
          <div className="absolute right-10 top-16 h-72 w-72 rounded-full border border-[#A98B68]/20" />

          <Image
            src="/sziporka-peter-kulcsember-vedelem.png"
            alt="Sziporka és Péter – kulcsember-védelem"
            fill
            priority
            className="relative z-10 object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute bottom-8 left-8 z-20 max-w-[420px] rounded-[28px] border border-white/10 bg-[#12100F]/90 p-7 shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D2B893]">
              Sziporka és Péter segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, milyen pénzügyi kockázatot jelentene a kulcsember
              kiesése a vállalkozásodban.
            </p>
          </div>
        </div>
      </section>

      <section id="miert" className="bg-[#F0E5D5] px-6 py-24 text-[#201A16] lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#98734F]">
                Vállalati biztonság
              </p>

              <h2 className="mt-4 max-w-[520px] font-serif text-5xl font-semibold leading-[1.02]">
                Nem csak egy ember hiányáról van szó.
              </h2>

              <p className="mt-7 max-w-[560px] text-lg leading-8 text-[#665A4E]">
                Egy kulcsember kiesése bevételkiesést, ügyfélvesztést,
                helyettesítési költséget vagy akár működési fennakadást is
                okozhat. Először azt nézzük meg, hol van valóban kockázat.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <RiskCard
                icon={<CircleDollarSign className="h-6 w-6" />}
                title="Bevételkiesés"
                text="Mekkora pénzügyi hatása lehet annak, ha a kulcsember átmenetileg vagy tartósan kiesik?"
              />
              <RiskCard
                icon={<UsersRound className="h-6 w-6" />}
                title="Ügyfélkapcsolatok"
                text="Milyen ügyfél- és partnerkapcsolatok kötődnek személyesen hozzá?"
              />
              <RiskCard
                icon={<BriefcaseBusiness className="h-6 w-6" />}
                title="Helyettesítés"
                text="Mennyi idő és költség lehet megfelelő szakembert találni és betanítani?"
              />
              <RiskCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Pénzügyi mozgástér"
                text="Mekkora összeg adhatna időt a vállalkozásnak a helyzet rendezésére?"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[760px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C6A47B]">
              Átgondoltan
            </p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              Előbb felmérjük a kockázatot. Utána választunk védelmet.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Step
              number="01"
              title="Ki a kulcsember?"
              text="Meghatározzuk, kinek a kiesése jelentene érdemi működési vagy pénzügyi veszteséget."
            />
            <Step
              number="02"
              title="Mekkora a kockázat?"
              text="Áttekintjük a várható bevételkiesést, helyettesítési időt és egyéb vállalati költségeket."
            />
            <Step
              number="03"
              title="Mekkora védelem kell?"
              text="A vállalkozás működéséhez és pénzügyi helyzetéhez igazítjuk a lehetséges védelmi szintet."
            />
          </div>
        </div>
      </section>

      <section id="kapcsolat" className="bg-[#1B1714] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#C7A67D]">
              Személyre szabott vállalati áttekintés
            </p>

            <h2 className="mt-5 max-w-[560px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, hol van valódi kockázat a vállalkozásodban.
            </h2>

            <p className="mt-7 max-w-[560px] text-lg leading-8 text-[#D5C9BB]">
              Add meg az alapadatokat, és átbeszéljük, milyen szerepkör,
              pénzügyi kitettség és védelmi igény lehet releváns.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A vállalkozás működéséből indulunk ki." />
              <CheckLine text="A kulcsember szerepét és valódi értékét vizsgáljuk." />
              <CheckLine text="A pénzügyi kockázat alapján tervezünk." />
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
                placeholder="Teljes név"
                required
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
              <label className="font-semibold">Ki a kulcsember?</label>
              <select
                value={form.keyPersonRole}
                onChange={(e) =>
                  setForm({ ...form, keyPersonRole: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#A77E57] ${
                  form.keyPersonRole ? "text-[#211B17]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="tulajdonos">Tulajdonos</option>
                <option value="ugyvezeto">Ügyvezető / vezető</option>
                <option value="ertekesito">Kiemelt értékesítő</option>
                <option value="szakember">Nélkülözhetetlen szakember</option>
                <option value="tobb-kulcsember">Több kulcsember is van</option>
                <option value="meg-nem-tudom">Még nem tudom pontosan</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Mi a legfontosabb cél?</label>
              <select
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#A77E57] ${
                  form.goal ? "text-[#211B17]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="mukodes-fenntartasa">A működés fenntartása</option>
                <option value="bevetelkieses">Bevételkiesés kezelése</option>
                <option value="helyettesites">Helyettesítés finanszírozása</option>
                <option value="hitel-vagy-kotelezettseg">
                  Hitel vagy vállalati kötelezettség védelme
                </option>
                <option value="altalanos-kockazatfelmeres">
                  Általános kockázatfelmérés
                </option>
                <option value="meg-nem-tudom">Még nem tudom</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Miben segíthetünk?</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Írd le röviden a vállalkozás helyzetét vagy a felmerült kérdést..."
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

function RiskCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="min-h-[280px] rounded-[32px] border border-[#D8C7B2] bg-[#F9F3EA] p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#29231F] text-[#E4C49B]">
        {icon}
      </div>
      <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>
      <p className="mt-4 text-lg leading-8 text-[#675B4F]">{text}</p>
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