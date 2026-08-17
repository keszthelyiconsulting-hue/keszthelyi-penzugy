"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  HeartHandshake,
  ShieldCheck,
  UsersRound,
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

export default function CsoportosBiztositasPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/csoportos-biztositas", {
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
    <main className="min-h-screen bg-[#F1E9DD] text-[#1F1B18]">
      {/* VISSZA */}
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#765F4B] transition hover:text-[#1F1B18]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-[#CBB9A2] bg-white/50 px-5 py-3 text-sm font-semibold text-[#6E5948]">
            <UsersRound className="h-5 w-5" />
            Munkáltatói gondoskodás
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#A27B59]">
            Csoportos biztosítás
          </p>

          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Egy erős csapat mögött
            <span className="block text-[#A27B59]">
              jó, ha van védelem is.
            </span>
          </h1>

          <p className="mt-8 max-w-[700px] text-lg leading-8 text-[#66584D]">
            A csoportos biztosítás a munkáltató számára egyszerre lehet
            gondoskodás, megtartó erő és a munkavállalói juttatási rendszer
            értékes része. A megoldást a vállalkozás méretéhez, céljaihoz és
            dolgozói köréhez igazítjuk.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#24201C] px-7 py-4 font-semibold text-white transition hover:bg-[#3B342E]"
            >
              Vállalati lehetőséget kérek
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#elonyok"
              className="inline-flex items-center rounded-full border border-[#BBA68E] px-7 py-4 font-semibold transition hover:bg-white/40"
            >
              Mit adhat a csapatnak?
            </a>
          </div>
        </div>

        {/* KÖZÖS KÉP */}
        <div className="relative min-h-[650px] overflow-hidden rounded-[48px] bg-gradient-to-br from-[#D7C6B2] via-[#C7B39D] to-[#A88F78]">
          <Image
            src="/sziporka-peter-csoportos-biztositas.png"
            alt="Sziporka és Péter – csoportos biztosítás"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 z-20 max-w-[430px] rounded-[28px] border border-white/20 bg-[#181512]/85 p-7 text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E6D1B8]">
              Sziporka és Péter segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, milyen védelem illik a vállalkozásodhoz és a
              munkatársaidhoz.
            </p>
          </div>
        </div>
      </section>

      {/* ELŐNYÖK */}
      <section
        id="elonyok"
        className="bg-gradient-to-br from-[#2F241D] via-[#1B1714] to-[#080706] px-6 py-24 text-[#F3E8DB] lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#D0AD84]">
                Több mint juttatás
              </p>

              <h2 className="mt-4 max-w-[540px] font-serif text-5xl font-semibold leading-[1.02]">
                A munkavállalói biztonság üzleti érték is lehet.
              </h2>

              <p className="mt-7 max-w-[560px] text-lg leading-8 text-[#D9CDBF]">
                Egy jól kialakított csoportos biztosítás egyszerre támogathatja
                a dolgozókat, erősítheti a munkáltatói gondoskodást és
                kiegészítheti a vállalati juttatási rendszert.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <BenefitCard
                icon={<HeartHandshake className="h-6 w-6" />}
                title="Gondoskodás"
                text="A munkatársak számára kézzelfogható, értékes vállalati támogatást jelenthet."
              />

              <BenefitCard
                icon={<UsersRound className="h-6 w-6" />}
                title="Megtartó erő"
                text="A jól felépített juttatási csomag hozzájárulhat a munkáltatói értékajánlathoz."
              />

              <BenefitCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Biztonság"
                text="Váratlan élethelyzetekben pénzügyi segítséget adhat a munkavállalóknak."
              />

              <BenefitCard
                icon={<BriefcaseBusiness className="h-6 w-6" />}
                title="Vállalatra szabva"
                text="A létszámhoz, a dolgozói körhöz és a vállalati célokhoz igazítjuk a megoldást."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOLYAMAT */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[760px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#A27B59]">
              Átlátható folyamat
            </p>

            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              Először a csapatot és a célt nézzük meg.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Step
              number="01"
              title="Kikre szóljon?"
              text="Áttekintjük a létszámot és azt, mely munkavállalói körre szeretnéd kialakítani a biztosítást."
            />

            <Step
              number="02"
              title="Mit szeretnél adni?"
              text="Meghatározzuk, milyen védelmi vagy juttatási cél a legfontosabb a vállalkozás számára."
            />

            <Step
              number="03"
              title="Milyen konstrukció illik?"
              text="A vállalati igényekhez és lehetőségekhez igazítjuk a szóba jöhető megoldást."
            />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section id="kapcsolat" className="bg-[#E2D3C1] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#926E4F]">
              Személyre szabott vállalati áttekintés
            </p>

            <h2 className="mt-5 max-w-[560px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, milyen csoportos védelem illik a csapatodhoz.
            </h2>

            <p className="mt-7 max-w-[560px] text-lg leading-8 text-[#65584C]">
              Add meg az alapadatokat, és átbeszéljük a vállalkozás létszámát,
              célját és a munkavállalóknak szánt juttatás jellegét.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A vállalkozás méretéhez igazodunk." />
              <CheckLine text="A munkavállalói körből indulunk ki." />
              <CheckLine text="A kívánt védelem és juttatási cél alapján tervezünk." />
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

            <div className="mt-6">
              <label className="font-semibold">Vállalkozás neve</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Cégnév / vállalkozás neve"
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
              <label className="font-semibold">Mekkora a vállalkozás?</label>
              <select
                value={form.companySize}
                onChange={(e) =>
                  setForm({ ...form, companySize: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#9C7555] ${
                  form.companySize ? "text-[#1F1B18]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="2-10">2–10 fő</option>
                <option value="11-25">11–25 fő</option>
                <option value="26-50">26–50 fő</option>
                <option value="51-100">51–100 fő</option>
                <option value="100-felett">100 fő felett</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Mi a legfontosabb cél?</label>
              <select
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#D8C8B5] bg-white px-5 py-4 outline-none focus:border-[#9C7555] ${
                  form.goal ? "text-[#1F1B18]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="munkavallaloi-vedelem">
                  Munkavállalói védelem
                </option>
                <option value="juttatasi-csomag">
                  Juttatási csomag bővítése
                </option>
                <option value="megtartas">
                  Munkatársak megtartásának támogatása
                </option>
                <option value="vezeto-vagy-kiemelt-csoport">
                  Vezetői / kiemelt munkavállalói kör
                </option>
                <option value="altalanos-tajekozodas">
                  Általános tájékozódás
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
                placeholder="Írd le röviden, milyen munkavállalói megoldásban gondolkodsz..."
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
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#24201C] px-7 py-4 font-semibold text-white transition hover:bg-[#3B342E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Vállalati lehetőséget kérek"}
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

function BenefitCard({
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
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAD9C4] text-[#241F1B]">
        {icon}
      </div>

      <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#D9CDBF]">{text}</p>
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
    <div className="rounded-[32px] border border-[#D7C6B2] bg-[#F8F1E7] p-8">
      <span className="text-sm font-bold tracking-[0.2em] text-[#A27B59]">
        {number}
      </span>

      <h3 className="mt-6 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#66584D]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A27B59] text-white">
        <Check className="h-5 w-5" />
      </span>

      <span className="font-medium text-[#5D5147]">{text}</span>
    </div>
  );
}