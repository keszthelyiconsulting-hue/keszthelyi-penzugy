"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HeartHandshake,
  Home,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  situation: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  situation: "",
  message: "",
  consent: false,
};

export default function EletbiztositasPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/penzugy/eletbiztositas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Az üzenet elküldése nem sikerült.");
      }

      setStatus("Köszönöm! Hamarosan felveszem veled a kapcsolatot.");
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
    <main className="min-h-screen bg-[#120E10] text-[#F8F0E7]">
      {/* FEJLÉC */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link
            href="/penzugy"
            className="inline-flex items-center gap-2 text-sm text-[#E7D4C4] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Vissza a pénzügyi megoldásokhoz
          </Link>

          <Link
            href="/"
            aria-label="Kezdőlap"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
          >
            <Home className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* HERO – NEM A KORÁBBI KÉTOSZLOPOS KÁRTYÁS ELRENDEZÉS */}
      <section className="relative overflow-hidden">
        <div className="absolute left-[-10%] top-20 h-80 w-80 rounded-full bg-[#7D263D]/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[-5%] h-96 w-96 rounded-full bg-[#B98B6A]/10 blur-3xl" />

        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-20">
          <div className="relative z-10 max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C9987B]/30 bg-[#C9987B]/10 px-4 py-2 text-sm text-[#F0D7C6]">
              <ShieldCheck className="h-4 w-4" />
              Biztosítási megoldások
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Életbiztosítás.
              <span className="mt-3 block text-[#D6A38E]">
                Védelem azoknak, akik igazán számítanak.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[#D9CED0]">
              Egy jól megválasztott életbiztosítás váratlan élethelyzetben
              pénzügyi segítséget adhat neked és a családodnak. A cél nem egy
              „dobozos” termék, hanem az élethelyzetedhez illő védelem.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#kapcsolat"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8D3C0] px-6 py-3.5 font-semibold text-[#171113] transition hover:scale-[1.02]"
              >
                Személyre szabott lehetőséget kérek
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#vedelem"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold transition hover:bg-white/5"
              >
                Mit érdemes védeni?
              </a>
            </div>
          </div>

          {/* SZIPORKA A HERO KOMPOZÍCIÓ RÉSZE */}
          <div className="relative min-h-[610px]">
            <div className="absolute inset-x-8 bottom-6 top-8 rounded-[44px] bg-gradient-to-br from-[#6D2337] via-[#351A23] to-[#151013] shadow-2xl shadow-black/40" />

            <img
              src="/sziporka-eletbiztositas.png"
              alt="Sziporka, a Keszthelyi Consulting pénzügyi asszisztense"
              className="absolute inset-0 h-full w-full object-contain object-bottom"
            />

            <div className="absolute bottom-10 left-3 right-3 rounded-[28px] border border-white/10 bg-black/45 p-5 backdrop-blur-md sm:left-10 sm:right-auto sm:max-w-[330px]">
              <div className="mb-2 flex items-center gap-2 text-sm text-[#F0D7C6]">
                <Sparkles className="h-4 w-4" />
                Sziporka segít
              </div>
              <p className="font-serif text-2xl font-semibold leading-tight">
                A védelem akkor jó, ha valóban a te életedre van szabva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 SZÉLES VÉDELMI BLOKK */}
      <section id="vedelem" className="border-y border-white/10 bg-[#F2E9DF] text-[#211719]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8A3D50]">
              Ami mögötted marad
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
              Nem csak egy biztosítási összeg.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#665A5C]">
              A megfelelő védelem célja, hogy egy nehéz élethelyzet ne váljon
              azonnal pénzügyi válsággá is.
            </p>
          </div>

          <div className="divide-y divide-[#D8C8BD] border-y border-[#D8C8BD]">
            <ProtectionRow
              number="01"
              icon={<Users className="h-6 w-6" />}
              title="A család anyagi biztonsága"
              text="Segítséget jelenthet abban, hogy a család megőrizhesse a pénzügyi stabilitását akkor is, ha a családfenntartóval történik valami."
            />
            <ProtectionRow
              number="02"
              icon={<WalletCards className="h-6 w-6" />}
              title="Jövedelem és mindennapi kötelezettségek"
              text="A rendszeres kiadások, hitelek és családi kötelezettségek nem állnak meg egy váratlan élethelyzet miatt."
            />
            <ProtectionRow
              number="03"
              icon={<HeartHandshake className="h-6 w-6" />}
              title="Személyre szabható védelem"
              text="A biztosítási összeget és a kiegészítő védelmeket a családi helyzethez, jövedelemhez és meglévő kötelezettségekhez igazítjuk."
            />
          </div>
        </div>
      </section>

      {/* VÁLTAKOZÓ INFORMÁCIÓS RÉSZ */}
      <section className="bg-[#171113]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="rounded-[36px] border border-white/10 bg-[#24191D] p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D6A38E]">
                Mekkora védelemre van szükség?
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold">
                Nem ugyanaz az összeg megfelelő mindenkinek.
              </h2>

              <div className="mt-8 space-y-5">
                <CheckLine text="Családi és eltartotti helyzet" />
                <CheckLine text="Rendszeres havi kiadások" />
                <CheckLine text="Meglévő hitelek és egyéb kötelezettségek" />
                <CheckLine text="Jövedelem és pénzügyi tartalék" />
                <CheckLine text="Már meglévő biztosítási védelem" />
              </div>
            </div>

            <div className="lg:pl-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D6A38E]">
                Átgondolt választás
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
                Előbb az élethelyzetet nézzük meg. Utána a biztosítást.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#CFC2C5]">
                A biztosítási védelem összeállításánál azt nézzük meg, milyen
                pénzügyi következménye lenne egy váratlan eseménynek, és mely
                kockázatokra érdemes ténylegesen fedezetet kialakítani.
              </p>
              <p className="mt-5 text-lg leading-8 text-[#CFC2C5]">
                Így nem abból indulunk ki, hogy „melyik csomagot válasszuk”,
                hanem abból, hogy neked és a családodnak mire van szüksége.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOLYAMAT – VÍZSZINTES, NEM 4 KÁRTYA */}
      <section className="bg-[#8A3D50] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F3D8CE]">
            Hogyan dolgozunk?
          </p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold sm:text-5xl">
            Néhány lépésben eljutunk az átlátható döntésig.
          </h2>

          <div className="mt-12 grid border-y border-white/20 md:grid-cols-3">
            <ProcessStep
              number="01"
              title="Megismerjük az élethelyzetedet"
              text="Átbeszéljük, kit szeretnél védeni, milyen kötelezettségeid vannak és mi a legfontosabb cél."
            />
            <ProcessStep
              number="02"
              title="Meghatározzuk a szükséges védelmet"
              text="Átgondoljuk a megfelelő biztosítási összeget és a szóba jöhető kiegészítő védelmeket."
            />
            <ProcessStep
              number="03"
              title="Kiválasztjuk a megfelelő megoldást"
              text="A lehetőségeket érthetően átbeszéljük, hogy tudd, mire és milyen feltételekkel nyújt védelmet a biztosítás."
              last
            />
          </div>
        </div>
      </section>

      {/* KAPCSOLAT – SZÉLES SÁV, BAL OLDALI ÖSSZEFOGLALÓ + JOBB ŰRLAP */}
      <section id="kapcsolat" className="bg-[#E8D8C8] text-[#211719]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div className="lg:pr-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8A3D50] text-white">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h2 className="mt-6 font-serif text-4xl font-semibold sm:text-5xl">
              Nézzük meg, milyen védelem illik hozzád.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#65575A]">
              Add meg az alapadataidat, és felvesszük veled a kapcsolatot.
              Nem kell előre tudnod, milyen biztosítást szeretnél.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[36px] bg-[#FBF7F2] p-7 shadow-xl shadow-[#5A2C35]/10 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">Név</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none transition focus:border-[#8A3D50]"
                  placeholder="Teljes név"
                />
              </label>

              <label>
                <span className="mb-2 block font-medium">Telefonszám</span>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none transition focus:border-[#8A3D50]"
                  placeholder="+36..."
                />
              </label>

              <label>
                <span className="mb-2 block font-medium">E-mail cím</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none transition focus:border-[#8A3D50]"
                  placeholder="nev@email.hu"
                />
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">
                  Mi a legfontosabb számodra?
                </span>
                <select
                  value={form.situation}
                  onChange={(e) =>
                    setForm({ ...form, situation: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none transition focus:border-[#8A3D50]"
                >
                  <option value="">Válassz...</option>
                  <option value="Család anyagi védelme">
                    Család anyagi védelme
                  </option>
                  <option value="Hitel és kötelezettségek védelme">
                    Hitel és kötelezettségek védelme
                  </option>
                  <option value="Saját biztosítási védelem">
                    Saját biztosítási védelem
                  </option>
                  <option value="Meglévő biztosítás felülvizsgálata">
                    Meglévő biztosítás felülvizsgálata
                  </option>
                  <option value="Még nem tudom">Még nem tudom</option>
                </select>
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block font-medium">Miben segíthetünk?</span>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="min-h-32 w-full resize-none rounded-2xl border border-[#D9C7BA] bg-white px-5 py-4 outline-none transition focus:border-[#8A3D50]"
                  placeholder="Írd le röviden, milyen védelemben gondolkodsz..."
                />
              </label>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#5E5254]">
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
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171113] px-6 py-4 font-semibold text-white transition hover:bg-[#8A3D50] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Küldés..." : "Kapcsolatfelvételt kérek"}
              {!sending && <ArrowRight className="h-4 w-4" />}
            </button>

            {status && (
              <p className="mt-4 text-center text-sm font-medium">{status}</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function ProtectionRow({
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
    <div className="grid gap-5 py-8 md:grid-cols-[70px_70px_0.8fr_1.2fr] md:items-center">
      <span className="font-serif text-lg font-semibold text-[#8A3D50]">
        {number}
      </span>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E3D0C2] text-[#7A3346]">
        {icon}
      </div>
      <h3 className="font-serif text-2xl font-semibold">{title}</h3>
      <p className="leading-7 text-[#665A5C]">{text}</p>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8A3D50]">
        <Check className="h-4 w-4" />
      </span>
      <span className="text-[#E5DADD]">{text}</span>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  text,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div
      className={`py-8 md:px-8 ${
        last ? "" : "md:border-r md:border-white/20"
      }`}
    >
      <span className="text-sm font-semibold text-[#F3D8CE]">{number}</span>
      <h3 className="mt-4 font-serif text-2xl font-semibold">{title}</h3>
      <p className="mt-4 leading-7 text-[#F0DDE1]">{text}</p>
    </div>
  );
}