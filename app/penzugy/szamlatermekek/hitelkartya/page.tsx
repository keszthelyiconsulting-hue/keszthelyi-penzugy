"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  CalendarDays,
  Check,
  CircleDollarSign,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  monthlySpend: string;
  repaymentStyle: string;
  priority: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  monthlySpend: "",
  repaymentStyle: "",
  priority: "",
  message: "",
  consent: false,
};

export default function HitelkartyaPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/hitelkartya", {
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
    <main className="min-h-screen bg-gradient-to-br from-[#EDE5D8] via-[#D7D0C6] to-[#9DB0B8] text-[#1D1A18]">
      <div className="mx-auto max-w-[1500px] px-6 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#465B63] transition hover:text-[#1D1A18]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>
      </div>

      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-[#AEBEC4] bg-white/45 px-5 py-3 text-sm font-semibold text-[#3A5159]">
            <CreditCard className="h-5 w-5" />
            Tudatos hitelkártya-használat
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#6C7F86]">
            Hitelkártya
          </p>

          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Rugalmas pénzügyi tartalék.
            <span className="block text-[#3F5E69]">
              Ha tudatosan használod.
            </span>
          </h1>

          <p className="mt-8 max-w-[700px] text-lg leading-8 text-[#5B5A56]">
            A hitelkártya akkor lehet igazán hasznos, ha pontosan érted a
            kamatmentes időszakot, a visszafizetés szabályait és a kapcsolódó
            költségeket. Segítünk olyan kártyát választani, amely illeszkedik a
            vásárlási szokásaidhoz és a pénzügyi lehetőségeidhez.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#kapcsolat"
              className="inline-flex items-center gap-3 rounded-full bg-[#23343B] px-7 py-4 font-semibold text-white transition hover:bg-[#314A54]"
            >
              Személyre szabott ajánlást kérek
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#tudatos-hasznalat"
              className="inline-flex items-center rounded-full border border-[#8EA4AC] px-7 py-4 font-semibold transition hover:bg-white/35"
            >
              Mire figyelj?
            </a>
          </div>
        </div>

        <div className="relative min-h-[650px] overflow-hidden rounded-[48px] bg-gradient-to-br from-[#183341] via-[#10252F] to-[#071116]">
          <div className="absolute left-10 top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute right-10 top-16 h-72 w-72 rounded-full border border-[#D2B98F]/20" />

          <Image
            src="/sziporka-hitelkartya.png"
            alt="Sziporka – hitelkártya"
            fill
            priority
            className="relative z-10 object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute bottom-8 left-8 z-20 max-w-[430px] rounded-[28px] border border-white/10 bg-[#0E1518]/90 p-7 text-white shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D9C5A6]">
              Sziporka segít
            </p>
            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Nézzük meg, hogyan használhatod úgy a hitelkártyát, hogy valóban
              előnyt jelentsen.
            </p>
          </div>
        </div>
      </section>

      <section
        id="tudatos-hasznalat"
        className="bg-gradient-to-br from-[#203641] via-[#13252D] to-[#081014] px-6 py-24 text-[#F3EBDD] lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#D2B48A]">
                A részletek számítanak
              </p>
              <h2 className="mt-4 max-w-[560px] font-serif text-5xl font-semibold leading-[1.02]">
                Nem minden hitelkártya egyforma.
              </h2>
              <p className="mt-7 max-w-[590px] text-lg leading-8 text-[#D5CCC0]">
                A kamatmentes időszak csak akkor jelent valódi előnyt, ha a
                feltételeknek megfelelően használod a kártyát. Ezért nem csak a
                hitelkeretet nézzük, hanem a teljes költséget, a visszafizetést
                és a kedvezményeket is.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon={<CalendarDays className="h-6 w-6" />}
                title="Kamatmentes időszak"
                text="Megnézzük, milyen feltételekkel és mely tranzakciókra érvényes a kamatmentesség."
              />
              <InfoCard
                icon={<CircleDollarSign className="h-6 w-6" />}
                title="Visszafizetés"
                text="Fontos különbség van a minimum fizetendő összeg és a teljes tartozás rendezése között."
              />
              <InfoCard
                icon={<BadgePercent className="h-6 w-6" />}
                title="Kedvezmények"
                text="Egyes kártyákhoz vásárlási kedvezmények vagy visszatérítések kapcsolódhatnak."
              />
              <InfoCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Költségek"
                text="Az éves díjat, készpénzfelvételt és egyéb kapcsolódó díjakat is figyelembe vesszük."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="max-w-[780px]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#59717A]">
              A megfelelő kártya
            </p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight">
              Először azt nézzük meg, mire használnád.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            <Step
              number="01"
              title="Mennyit költesz?"
              text="A havi kártyás vásárlási szokásaidból indulunk ki."
            />
            <Step
              number="02"
              title="Hogyan fizetnéd vissza?"
              text="A teljes havi visszafizetés és a részleges törlesztés között nagy különbség lehet."
            />
            <Step
              number="03"
              title="Milyen előnyt keresel?"
              text="Kedvezmény, visszatérítés, hosszabb kamatmentes időszak vagy egyszerűbb használat?"
            />
            <Step
              number="04"
              title="Mennyibe kerül?"
              text="A teljes éves költséget együtt nézzük, nem csak egyetlen díjat."
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1500px] rounded-[36px] border border-[#C8B89F] bg-[#F4ECE0] p-8 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#8B6D4F]">
            Mikor nem jó választás?
          </p>
          <h2 className="mt-4 max-w-[900px] font-serif text-4xl font-semibold leading-tight">
            Ha rendszeresen csak a minimum összeget tudnád visszafizetni, a
            hitelkártya könnyen drága finanszírozássá válhat.
          </h2>
          <p className="mt-5 max-w-[980px] text-lg leading-8 text-[#665B50]">
            Ilyenkor érdemes más megoldást is megvizsgálni. A cél nem az, hogy
            mindenáron hitelkártyát válassz, hanem hogy olyan pénzügyi eszközt
            találjunk, amely valóban illik a helyzetedhez.
          </p>
        </div>
      </section>

      <section id="kapcsolat" className="bg-[#D9D1C5] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#536D76]">
              Személyre szabott hitelkártya-ajánlás
            </p>
            <h2 className="mt-5 max-w-[570px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, melyik hitelkártya illik hozzád.
            </h2>
            <p className="mt-7 max-w-[570px] text-lg leading-8 text-[#5D5A55]">
              Add meg az alapadataidat és néhány információt a vásárlási és
              visszafizetési szokásaidról. Ez alapján könnyebb lesz kiválasztani
              a számodra releváns lehetőségeket.
            </p>

            <div className="mt-10 space-y-5">
              <CheckLine text="A használati szokásaidból indulunk ki." />
              <CheckLine text="A teljes költséget és a feltételeket együtt nézzük." />
              <CheckLine text="A tudatos visszafizetés kiemelt szempont." />
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
                className="mt-2 w-full rounded-2xl border border-[#C8D0D2] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5E7881]"
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-semibold">Telefonszám</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+36..."
                  className="mt-2 w-full rounded-2xl border border-[#C8D0D2] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5E7881]"
                />
              </div>

              <div>
                <label className="font-semibold">E-mail cím</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nev@email.hu"
                  className="mt-2 w-full rounded-2xl border border-[#C8D0D2] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5E7881]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Mennyit költesz havonta kártyával?</label>
              <select
                value={form.monthlySpend}
                onChange={(e) =>
                  setForm({ ...form, monthlySpend: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#C8D0D2] bg-white px-5 py-4 outline-none focus:border-[#5E7881] ${
                  form.monthlySpend ? "text-[#1D1A18]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="50-alatt">50 000 Ft alatt</option>
                <option value="50-150">50 000 – 150 000 Ft</option>
                <option value="150-300">150 000 – 300 000 Ft</option>
                <option value="300-felett">300 000 Ft felett</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Hogyan tervezed visszafizetni?</label>
              <select
                value={form.repaymentStyle}
                onChange={(e) =>
                  setForm({ ...form, repaymentStyle: e.target.value })
                }
                className={`mt-2 w-full rounded-2xl border border-[#C8D0D2] bg-white px-5 py-4 outline-none focus:border-[#5E7881] ${
                  form.repaymentStyle ? "text-[#1D1A18]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="teljes">Minden hónapban teljesen visszafizetem</option>
                <option value="reszben">Várhatóan részletekben fizetem vissza</option>
                <option value="valtozo">Hónapról hónapra változó</option>
                <option value="meg-nem-tudom">Még nem tudom</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Mi a legfontosabb számodra?</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className={`mt-2 w-full rounded-2xl border border-[#C8D0D2] bg-white px-5 py-4 outline-none focus:border-[#5E7881] ${
                  form.priority ? "text-[#1D1A18]" : "text-[#AAA096]"
                }`}
              >
                <option value="">Válassz...</option>
                <option value="kamatmentes">Hosszabb kamatmentes időszak</option>
                <option value="visszaterites">Visszatérítés / kedvezmények</option>
                <option value="alacsony-dij">Alacsony éves díj</option>
                <option value="magasabb-keret">Magasabb hitelkeret</option>
                <option value="egyszeru-hasznalat">Egyszerű használat</option>
                <option value="meg-nem-tudom">Még nem tudom</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="font-semibold">Miben segíthetünk?</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="Írd le röviden, mire szeretnéd használni a hitelkártyát..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#C8D0D2] bg-white px-5 py-4 outline-none placeholder:text-[#AAA096] focus:border-[#5E7881]"
              />
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#5D5A55]">
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
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#23343B] px-7 py-4 font-semibold text-white transition hover:bg-[#314A54] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Személyre szabott ajánlást kérek"}
              {!sending && <ArrowRight className="h-5 w-5" />}
            </button>

            {status && (
              <p className="mt-5 text-center text-sm font-semibold text-[#536D76]">
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
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5D5BC] text-[#213039]">
        {icon}
      </div>
      <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>
      <p className="mt-4 text-lg leading-8 text-[#D5CCC0]">{text}</p>
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
    <div className="rounded-[32px] border border-[#B7C5C9] bg-white/35 p-8">
      <span className="text-sm font-bold tracking-[0.2em] text-[#58727B]">
        {number}
      </span>
      <h3 className="mt-6 font-serif text-3xl font-semibold">{title}</h3>
      <p className="mt-4 text-lg leading-8 text-[#5D5A55]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#58727B] text-white">
        <Check className="h-5 w-5" />
      </span>
      <span className="font-medium text-[#55514D]">{text}</span>
    </div>
  );
}