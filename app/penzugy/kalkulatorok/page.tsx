"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator, CircleDollarSign, RefreshCcw, ShieldCheck, Sparkles, WalletCards } from "lucide-react";

const calculators = [
  {
    title: "Mekkora hitel férhet bele?",
    subtitle: "Előzetes hitelkeret",
    description: "A nettó jövedelem és a meglévő havi törlesztések alapján kapsz egy tájékoztató képet arról, mekkora havi teher lehet vállalható.",
    href: "/penzugy/kalkulatorok/hitelkeret",
    icon: WalletCards,
  },
  {
    title: "Mennyi lehet a havi törlesztőm?",
    subtitle: "Tájékoztató törlesztési sáv",
    description: "Add meg a kívánt összeget és futamidőt. Banki rangsor helyett egy előzetes havi törlesztési sávot mutatunk.",
    href: "/penzugy/kalkulatorok/havi-torleszto",
    icon: CircleDollarSign,
  },
  {
    title: "Érdemes lehet kiváltanom a hitelemet?",
    subtitle: "Hitelkiváltási előszűrés",
    description: "A jelenlegi tartozás, havi törlesztés és hátralévő futamidő alapján segítünk eldönteni, érdemes-e részletes összehasonlítást kérned.",
    href: "/penzugy/kalkulatorok/hitelkivaltas",
    icon: RefreshCcw,
  },
];

export default function KalkulatorokPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4A3425] via-[#211813] to-[#050505] text-[#efe5d6]">
      <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-8 lg:px-10">
        <Link href="/penzugy" className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8a166] transition hover:text-[#ead2aa]">
          <ArrowLeft className="h-4 w-4" /> Vissza a pénzügyi megoldásokhoz
        </Link>

        <section className="relative mt-10 overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-[#191919] via-[#121212] to-[#090909] px-7 py-14 sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#c8a166]/10 blur-3xl" />
          <div className="relative max-w-[1000px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c8a166]/30 bg-[#c8a166]/10 px-4 py-2 text-sm font-semibold text-[#d9b97f]">
              <Sparkles className="h-4 w-4" /> Előzetes pénzügyi számítások
            </div>
            <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Számoljunk,<span className="block text-[#c8a166]">mielőtt döntést hozol.</span>
            </h1>
            <p className="mt-7 max-w-[850px] text-lg leading-8 text-[#cfc7bc]">
              Ezek a kalkulátorok nem banki ajánlatot és nem banki rangsort adnak. Abban segítenek, hogy előzetesen lásd a lehetőségeidet, mielőtt személyre szabott összehasonlítást kérsz.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c8a166]">Kalkulátorok</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold">Mivel szeretnél számolni?</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {calculators.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="group flex min-h-[350px] flex-col rounded-[30px] border border-white/10 bg-[#121212] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#c8a166]/55 hover:bg-[#171513]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c8a166]/25 bg-[#c8a166]/10 text-[#d7b171]"><Icon className="h-7 w-7" /></div>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#c8a166]">{item.subtitle}</p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-5 flex-1 leading-7 text-[#aaa39a]">{item.description}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-semibold text-[#d7b171]">Kalkuláció indítása <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[30px] border border-[#c8a166]/20 bg-[#17130f] p-8 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c8a166]/12 text-[#d7b171]"><Calculator className="h-6 w-6" /></div>
            <h2 className="mt-6 font-serif text-3xl font-semibold">Miért csak előzetes számítás?</h2>
            <p className="mt-4 leading-7 text-[#bdb4a8]">Egy valódi hitel- vagy pénzügyi ajánlatot több tényező is befolyásolhat. Ezért itt nem nevezünk meg „nyertes” bankot, és nem teszünk úgy, mintha néhány adatból már végleges ajánlatot lehetne adni.</p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#121212] p-8 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c8a166]/12 text-[#d7b171]"><ShieldCheck className="h-6 w-6" /></div>
            <h2 className="mt-6 font-serif text-3xl font-semibold">A következő lépés már személyre szabott.</h2>
            <p className="mt-4 leading-7 text-[#bdb4a8]">Ha a számítás alapján érdemes továbbmenni, kérhetsz részletes összehasonlítást. A kalkulátorban megadott adatokat később továbbíthatjuk a kapcsolatfelvételhez, hogy ne kelljen mindent újra megadnod.</p>
            <Link href="/penzugy/kapcsolat" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#c8a166] px-7 py-4 font-bold text-[#17110b] transition hover:bg-[#d8b77e]">
              Személyes segítséget kérek <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        <p className="mx-auto mt-10 max-w-[1000px] text-center text-xs leading-6 text-white/45">
          A kalkulátorok eredménye tájékoztató jellegű, nem minősül hitelbírálatnak, ajánlatnak vagy pénzügyi kötelezettségvállalásnak. A tényleges lehetőségek az egyedi körülmények és az aktuális feltételek alapján eltérhetnek.
        </p>
      </div>
    </main>
  );
}