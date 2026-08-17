"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  PiggyBank,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";

export default function HosszuTavuMegtakaritasPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [timeHorizon, setTimeHorizon] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consent) {
      setStatus("A kapcsolatfelvételi hozzájárulás elfogadása szükséges.");
      return;
    }

    try {
      setSending(true);
      setStatus("");

      const response = await fetch(
        "/api/penzugy/hosszu-tavu-megtakaritas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            goal,
            timeHorizon,
            message,
            consent,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Az elküldés nem sikerült.");
      }

      setStatus("Köszönjük! Hamarosan felvesszük veled a kapcsolatot.");

      setName("");
      setPhone("");
      setEmail("");
      setGoal("");
      setTimeHorizon("");
      setMessage("");
      setConsent(false);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Az elküldés nem sikerült.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F2EADB] text-[#1E211D]">
      {/* VISSZA */}
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#75664F] transition hover:text-[#1E211D]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-20">
        {/* BAL OLDAL */}
        <div className="flex flex-col justify-center py-8 lg:py-14">
          <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-[#CFC1AA] bg-[#F8F3EA] px-5 py-3">
            <TrendingUp className="h-5 w-5 text-[#8C7049]" />
            <span className="font-semibold text-[#514735]">
              Hosszú távú pénzügyi tervezés
            </span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9A7950]">
            Hosszú távú megtakarítás
          </p>

          <h1 className="mt-6 max-w-[780px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            A nagyobb célokhoz
            <span className="block text-[#9A7950]">
              nem mindig több pénz kell.
            </span>
            <span className="block">Néha több idő.</span>
          </h1>

          <p className="mt-8 max-w-[720px] text-lg leading-8 text-[#665A47]">
            Egy jól felépített hosszú távú megtakarítás abban segíthet,
            hogy a későbbi terveidhez ne egyszerre kelljen előteremteni
            a szükséges összeget. Megnézzük, mi a célod, mennyi idő áll
            rendelkezésedre, és milyen rendszeres megtakarítás illik a
            lehetőségeidhez.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#20221E] px-7 py-4 font-semibold text-white transition hover:bg-[#33362F]"
            >
              Személyre szabott lehetőséget kérek
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#tervezes"
              className="inline-flex items-center rounded-full border border-[#BFAF95] px-7 py-4 font-semibold transition hover:bg-[#E8DDCB]"
            >
              Hogyan tervezzünk?
            </a>
          </div>
        </div>

        {/* PÉTER */}
        <div className="relative min-h-[650px] overflow-hidden rounded-[48px] bg-[#D8CBB7]">
          <div className="absolute left-10 top-10 h-44 w-44 rounded-full border border-[#B6A58C]/60" />
          <div className="absolute right-8 top-20 h-72 w-72 rounded-full border border-[#B6A58C]/50" />

          <Image
            src="/peter-hosszu-tavu-megtakaritas.png"
            alt="Péter – hosszú távú megtakarítás"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div className="absolute bottom-8 left-8 right-8 z-20 max-w-[390px] rounded-[28px] bg-[#22241F]/95 p-7 text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#DDD1BE]">
              Péter segít
            </p>

            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, hogyan lehet a terveidből lépésről lépésre
              pénzügyi cél.
            </p>
          </div>
        </div>
      </section>

      {/* TERVEZÉS */}
      <section
        id="tervezes"
        className="bg-[#20221E] px-6 py-24 text-[#F4EBDD] lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#CDB995]">
                Nem csak félretett pénz
              </p>

              <h2 className="mt-4 max-w-[550px] font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl">
                Először azt nézzük meg, mire szeretnél készülni.
              </h2>

              <p className="mt-7 max-w-[570px] text-lg leading-8 text-[#D7CDBD]">
                A hosszú távú megtakarításnak akkor van igazán értelme,
                ha konkrét célhoz és időtávhoz kapcsolódik. Nem ugyanaz
                a megoldás illik egy néhány éves tervhez, mint egy
                tíz–tizenöt év múlva esedékes nagyobb célhoz.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon={<Target className="h-6 w-6" />}
                title="Mi a célod?"
                text="Otthon, nagyobb kiadás, családi terv, tartalék vagy egyszerűen nagyobb pénzügyi szabadság."
              />

              <InfoCard
                icon={<Clock3 className="h-6 w-6" />}
                title="Mennyi időd van?"
                text="Az időtáv meghatározza, hogyan érdemes felépíteni a megtakarításodat."
              />

              <InfoCard
                icon={<PiggyBank className="h-6 w-6" />}
                title="Mennyit tennél félre?"
                text="Olyan rendszeres összeget keresünk, amely hosszú távon is vállalható marad."
              />

              <InfoCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Mi van már most?"
                text="A meglévő megtakarításaidat és pénzügyi lehetőségeidet is figyelembe vesszük."
              />
            </div>
          </div>
        </div>
      </section>

      {/* IDŐ + RENDSZERESSÉG */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[40px] border border-[#D4C5AE] bg-[#F8F2E8] p-9 sm:p-12">
              <CalendarDays className="h-10 w-10 text-[#94734B]" />

              <h3 className="mt-7 font-serif text-4xl font-semibold">
                Az idő dolgozhat érted.
              </h3>

              <p className="mt-5 text-lg leading-8 text-[#675B48]">
                Minél korábban kezdődik egy hosszabb távú terv,
                annál több lehetőség van arra, hogy kisebb,
                rendszeres lépésekből épüljön fel a kívánt összeg.
              </p>
            </div>

            <div className="rounded-[40px] bg-[#A38359] p-9 text-white sm:p-12">
              <TrendingUp className="h-10 w-10" />

              <h3 className="mt-7 font-serif text-4xl font-semibold">
                A rendszeresség fontosabb lehet, mint az első összeg.
              </h3>

              <p className="mt-5 text-lg leading-8 text-[#F4EBDD]">
                Nem feltétlenül nagy összeggel kell kezdeni.
                Olyan megtakarítási tervet érdemes kialakítani,
                amely a mindennapi pénzügyeid mellett is hosszú
                távon tartható.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LÉPÉSEK */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1500px] rounded-[48px] bg-[#E2D6C4] p-8 sm:p-12 lg:p-16">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8C7049]">
            Egyszerűen átlátható
          </p>

          <h2 className="mt-4 max-w-[750px] font-serif text-4xl font-semibold sm:text-5xl">
            Négy kérdésből már kirajzolódhat az irány.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Step
              number="01"
              title="Cél"
              text="Meghatározzuk, mire szeretnél megtakarítani."
            />

            <Step
              number="02"
              title="Időtáv"
              text="Megnézzük, mikorra szeretnéd elérni."
            />

            <Step
              number="03"
              title="Összeg"
              text="Kiszámoljuk, mi lehet számodra vállalható."
            />

            <Step
              number="04"
              title="Megoldás"
              text="A célodhoz illő lehetőségek közül választunk."
            />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section
        id="kapcsolat"
        className="bg-[#EEE3D2] px-6 py-24 lg:px-10"
      >
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#92724B]">
              Személyre szabott tervezés
            </p>

            <h2 className="mt-5 font-serif text-5xl font-semibold leading-tight">
              Kezdjük azzal, amit már most tudsz.
            </h2>

            <p className="mt-6 max-w-[550px] text-lg leading-8 text-[#665A47]">
              Add meg az alapadataidat és azt, milyen célra szeretnél
              hosszabb távon félretenni. A részleteket utána együtt
              pontosítjuk.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A saját céljaidból indulunk ki." />
              <CheckLine text="Figyelembe vesszük a rendelkezésre álló időt." />
              <CheckLine text="A vállalható megtakarítási összeggel tervezünk." />
              <CheckLine text="A meglévő megtakarításaidat sem hagyjuk figyelmen kívül." />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[42px] bg-[#FBF8F2] p-7 shadow-xl shadow-[#806C4A]/10 sm:p-10"
          >
            <div>
              <label className="font-semibold">Név</label>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Teljes név"
                className="mt-2 w-full rounded-2xl border border-[#D7C8B3] bg-white px-5 py-4 outline-none transition placeholder:text-[#AAA093] focus:border-[#9A7950]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Telefonszám</label>

                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+36..."
                  className="mt-2 w-full rounded-2xl border border-[#D7C8B3] bg-white px-5 py-4 outline-none transition placeholder:text-[#AAA093] focus:border-[#9A7950]"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail cím</label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nev@email.hu"
                  className="mt-2 w-full rounded-2xl border border-[#D7C8B3] bg-white px-5 py-4 outline-none transition placeholder:text-[#AAA093] focus:border-[#9A7950]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Mire szeretnél hosszabb távon félretenni?
              </label>

              <select
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className={`mt-2 w-full rounded-2xl border border-[#D7C8B3] bg-white px-5 py-4 outline-none transition focus:border-[#9A7950] ${
                  goal ? "text-[#1E211D]" : "text-[#AAA093]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="otthon">Otthon / ingatlan</option>
                <option value="nagyobb-kiadas">Nagyobb jövőbeni kiadás</option>
                <option value="csaladi-cel">Családi cél</option>
                <option value="tartalek">Hosszabb távú tartalék</option>
                <option value="penzugyi-szabadsag">
                  Nagyobb pénzügyi szabadság
                </option>
                <option value="meg-nem-tudom">Még nem tudom pontosan</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Milyen időtávban gondolkodsz?
              </label>

              <select
                value={timeHorizon}
                onChange={(event) => setTimeHorizon(event.target.value)}
                className={`mt-2 w-full rounded-2xl border border-[#D7C8B3] bg-white px-5 py-4 outline-none transition focus:border-[#9A7950] ${
                  timeHorizon ? "text-[#1E211D]" : "text-[#AAA093]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="3-5-ev">3–5 év</option>
                <option value="5-10-ev">5–10 év</option>
                <option value="10-ev-felett">10 évnél hosszabb idő</option>
                <option value="meg-nem-tudom">Még nem tudom</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">
                Miben segíthetünk?
              </label>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                placeholder="Írd le röviden, milyen célban gondolkodsz..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#D7C8B3] bg-white px-5 py-4 outline-none transition placeholder:text-[#AAA093] focus:border-[#9A7950]"
              />
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm leading-6 text-[#625846]">
                Hozzájárulok ahhoz, hogy a megadott elérhetőségeimen
                kapcsolatfelvétel céljából megkeressenek.
              </span>
            </label>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#20221E] px-7 py-4 font-semibold text-white transition hover:bg-[#343730] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending
                ? "Küldés..."
                : "Személyre szabott lehetőséget kérek"}

              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-semibold text-[#75664F]">
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
    <div className="min-h-[290px] rounded-[32px] border border-white/10 bg-[#2B2D28] p-8">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEE4D3] text-[#20221E]">
        {icon}
      </span>

      <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-lg leading-8 text-[#D8CEBE]">{text}</p>
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
    <div className="rounded-[30px] bg-[#F7F0E5] p-7">
      <span className="text-sm font-bold tracking-[0.18em] text-[#9A7950]">
        {number}
      </span>

      <h3 className="mt-5 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 leading-7 text-[#665A47]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9A7950] text-white">
        <Check className="h-5 w-5" />
      </span>

      <span className="font-medium text-[#554B3C]">{text}</span>
    </div>
  );
}