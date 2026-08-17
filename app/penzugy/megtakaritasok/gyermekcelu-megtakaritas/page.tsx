"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  BookOpen,
  GraduationCap,
  Heart,
  Home,
  PiggyBank,
  Sparkles,
} from "lucide-react";

export default function GyermekceluMegtakaritasPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    childAge: "",
    goal: "",
    message: "",
    consent: false,
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSending(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch(
        "/api/penzugy/gyermekcelu-megtakaritas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Az üzenet küldése nem sikerült.");
      }

      setSuccess(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        childAge: "",
        goal: "",
        message: "",
        consent: false,
      });
    } catch {
      setError(
        "Az üzenetet most nem sikerült elküldeni. Kérlek, próbáld újra."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F3EBDD] text-[#20211E]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* egyszerű vissza gomb – nincs buborék */}
        <Link
          href="/penzugy"
          aria-label="Vissza a pénzügyi megoldásokhoz"
          className="absolute left-6 top-6 z-30 flex items-center gap-2 text-sm font-semibold text-[#665A4C] transition hover:text-[#20211E] lg:left-10 lg:top-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Vissza
        </Link>

        <div className="mx-auto grid min-h-[760px] max-w-[1500px] items-stretch gap-10 px-6 pb-10 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-0 lg:pt-16">
          {/* BAL OLDAL */}
          <div className="flex items-center">
            <div className="max-w-[720px]">
              <div className="mb-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#A16C57]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4D2BD]">
                  <PiggyBank className="h-5 w-5" />
                </span>

                Gyermekcélú megtakarítás
              </div>

              <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-[#20211E] sm:text-6xl lg:text-[78px]">
                Adj neki lehetőséget,
                <span className="block text-[#967A55]">
                  amikor igazán szüksége lesz rá.
                </span>
              </h1>

              <p className="mt-8 max-w-[650px] text-lg leading-8 text-[#665A4C] sm:text-xl">
                A gyermek jövőjére időben elkezdett megtakarítás később valódi
                segítséget jelenthet a tanulmányokhoz, az első otthonhoz vagy
                az önálló élet megkezdéséhez.
              </p>

              <div className="mt-10 mb-12 flex flex-wrap gap-4">
                <a
                  href="#kapcsolat"
                  className="inline-flex items-center gap-3 rounded-full bg-[#20211E] px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Személyre szabott lehetőséget kérek
                  <ArrowRight className="h-5 w-5" />
                </a>

                <a
                  href="#hogyan"
                  className="inline-flex items-center gap-3 rounded-full border border-[#BFB09B] px-7 py-4 font-semibold text-[#20211E] transition hover:bg-white/40"
                >
                  Hogyan tervezzünk?
                </a>
              </div>
            </div>
          </div>

          {/* PÉTER */}
          <div className="relative min-h-[650px] lg:min-h-full">
            <div className="absolute inset-x-8 bottom-0 top-6 rounded-t-[90px] bg-[#DDD0BC] lg:left-4 lg:right-0 lg:top-8" />

            <div className="absolute left-10 top-20 h-40 w-40 rounded-full border border-[#B8A58C]/50" />
            <div className="absolute right-8 top-10 h-64 w-64 rounded-full border border-[#B8A58C]/35" />

            <Image
              src="/peter-gyermekcelu-megtakaritas.png"
              alt="Péter – gyermekcélú megtakarítás"
              fill
              priority
              className="relative z-10 object-contain object-bottom"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute bottom-10 left-5 z-20 max-w-[350px] rounded-[28px] border border-white/30 bg-[#20211E]/90 p-6 text-white shadow-2xl backdrop-blur-md lg:left-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E3D6C3]">
                Péter segít
              </p>

              <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
                Nézzük meg, hogyan építhetsz biztosabb indulást gyermeked
                jövőjéhez.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CÉLOK */}
      <section id="hogyan" className="bg-[#20211E] text-[#F5EDDF]">
        <div className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#D6BDA1]">
                Nem csak megtakarítás
              </p>

              <h2 className="mt-4 max-w-[520px] font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl">
                Egy mai döntés később valódi lehetőséget adhat.
              </h2>

              <p className="mt-7 max-w-[520px] text-lg leading-8 text-[#D8CDBC]">
                Nem ugyanaz a célja minden családnak. Először azt nézzük meg,
                mire szeretnél előre készülni, mennyi idő áll rendelkezésre,
                és milyen rendszeres megtakarítás illik a lehetőségeidhez.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <GoalCard
                icon={<GraduationCap className="h-6 w-6" />}
                title="Tanulmányok"
                text="Továbbtanulás, képzések vagy más, a gyermek fejlődését segítő célok."
              />

              <GoalCard
                icon={<Home className="h-6 w-6" />}
                title="Első otthon"
                text="Segítség az önálló élet egyik legnagyobb lépéséhez."
              />

              <GoalCard
                icon={<Sparkles className="h-6 w-6" />}
                title="Életkezdés"
                text="Egy induló pénzügyi háttér, amikor gyermeked saját útra lép."
              />

              <GoalCard
                icon={<Heart className="h-6 w-6" />}
                title="Saját cél"
                text="A megtakarítás célját a család terveihez és lehetőségeihez igazítjuk."
              />
            </div>
          </div>
        </div>
      </section>

      {/* TERVEZÉS */}
      <section className="bg-[#E7D9C5]">
        <div className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10">
          <div className="mb-14 max-w-[760px]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A6B56]">
              Lépésről lépésre
            </p>

            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#20211E]">
              Először a jövőt tervezzük meg. Utána választunk megoldást.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <StepCard
              number="01"
              icon={<Baby className="h-6 w-6" />}
              title="Hány éves a gyermek?"
              text="Az időtáv alapvetően meghatározza, hogyan érdemes felépíteni a megtakarítást."
            />

            <StepCard
              number="02"
              icon={<BookOpen className="h-6 w-6" />}
              title="Mire szeretnél készülni?"
              text="Tanulmányokra, lakhatásra, életkezdésre vagy több célra egyszerre."
            />

            <StepCard
              number="03"
              icon={<PiggyBank className="h-6 w-6" />}
              title="Mennyit tudsz félretenni?"
              text="Olyan vállalható összeget keresünk, amely hosszú távon is illeszkedik a családi költségvetéshez."
            />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT */}
      <section id="kapcsolat" className="bg-[#F3EBDD]">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A6B56]">
              Személyre szabva
            </p>

            <h2 className="mt-4 max-w-[500px] font-serif text-5xl font-semibold leading-tight">
              Nézzük meg, mi illik a családod terveihez.
            </h2>

            <p className="mt-6 max-w-[500px] text-lg leading-8 text-[#665A4C]">
              Add meg az alapadatokat, és átbeszéljük, milyen lehetőségek
              jöhetnek szóba a gyermek életkorához, a kitűzött célhoz és a
              rendelkezésre álló időhöz igazodva.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[36px] bg-[#FBF8F2] p-7 shadow-xl shadow-[#665A4C]/10 sm:p-10"
          >
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block font-medium">Név</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Teljes név"
                  className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 text-[#20211E] outline-none placeholder:text-[#A7A0A5] focus:border-[#9A6B56]"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">Telefonszám</label>
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+36..."
                    className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 text-[#20211E] outline-none placeholder:text-[#A7A0A5] focus:border-[#9A6B56]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">E-mail cím</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nev@email.hu"
                    className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 text-[#20211E] outline-none placeholder:text-[#A7A0A5] focus:border-[#9A6B56]"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">
                    Gyermek életkora
                  </label>

                  <input
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="Pl. 6 éves"
                    className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 text-[#20211E] outline-none placeholder:text-[#A7A0A5] focus:border-[#9A6B56]"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Mi a legfontosabb cél?
                  </label>

                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none focus:border-[#9A6B56] ${
                      formData.goal
                        ? "text-[#20211E]"
                        : "text-[#A7A0A5]"
                    }`}
                  >
                    <option value="">Válassz...</option>
                    <option value="tanulmanyok">Tanulmányok</option>
                    <option value="elso-otthon">Első otthon</option>
                    <option value="eletkezdes">Életkezdés</option>
                    <option value="tobb-cel">Több cél egyszerre</option>
                    <option value="meg-nem-tudom">Még nem tudom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Miben segíthetünk?
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Írd le röviden, mire szeretnél előre készülni..."
                  className="w-full resize-none rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 text-[#20211E] outline-none placeholder:text-[#A7A0A5] focus:border-[#9A6B56]"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#665A4C]">
                <input
                  required
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
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
                className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-[#20211E] px-7 py-4 font-semibold text-white transition hover:bg-[#353630] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Küldés..." : "Személyre szabott lehetőséget kérek"}

                {!sending && <ArrowRight className="h-5 w-5" />}
              </button>

              {success && (
                <p className="rounded-2xl bg-[#E4DCCB] px-5 py-4 font-medium text-[#384135]">
                  Köszönjük! Az üzenetet sikeresen elküldted.
                </p>
              )}

              {error && (
                <p className="rounded-2xl bg-[#F4DEDA] px-5 py-4 font-medium text-[#7B3F38]">
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function GoalCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="min-h-[270px] rounded-[30px] border border-white/10 bg-[#2B2C28] p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEE3D1] text-[#20211E]">
        {icon}
      </div>

      <h3 className="mt-8 font-serif text-3xl font-semibold">{title}</h3>

      <p className="mt-4 text-base leading-7 text-[#D8CDBC]">{text}</p>
    </div>
  );
}

function StepCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="relative min-h-[300px] rounded-[32px] bg-[#F7F0E5] p-8">
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#20211E] text-white">
          {icon}
        </div>

        <span className="font-serif text-4xl text-[#C5B49D]">{number}</span>
      </div>

      <h3 className="mt-10 font-serif text-3xl font-semibold text-[#20211E]">
        {title}
      </h3>

      <p className="mt-4 text-base leading-7 text-[#665A4C]">{text}</p>
    </div>
  );
}