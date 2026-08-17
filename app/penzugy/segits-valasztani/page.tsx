"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  Home,
  PiggyBank,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

const choices = [
  {
    title: "Otthont szeretnék vásárolni vagy felújítani",
    text: "Lakáshitel, Otthon Start, CSOK Plusz, Falusi CSOK és más otthonteremtési lehetőségek.",
    href: "/penzugy#hitelek",
    icon: Home,
  },
  {
    title: "Pénzre van szükségem",
    text: "Megnézzük, milyen finanszírozási forma illik a célodhoz és a lehetőségeidhez.",
    href: "/penzugy/hitelek/szemelyi-kolcson",
    icon: Banknote,
  },
  {
    title: "Csökkenteném a meglévő hiteleim terheit",
    text: "Átnézzük, érdemes-e kiváltani vagy rendezni a jelenlegi hiteleidet.",
    href: "/penzugy/hitelek/hitelkivaltas",
    icon: RefreshCcw,
  },
  {
    title: "A családom anyagi biztonságáról gondoskodnék",
    text: "Élet- és hitelfedezeti védelem váratlan élethelyzetekre.",
    href: "/penzugy#biztositasok",
    icon: ShieldCheck,
  },
  {
    title: "Egészségügyi védelmet keresek",
    text: "Egészségbiztosítási lehetőségek és magánegészségügyi szolgáltatások.",
    href: "/penzugy/biztositasok/egeszsegbiztositas",
    icon: HeartPulse,
  },
  {
    title: "Félretennék a jövőre",
    text: "Nyugdíj, gyermekcélú vagy más hosszabb távú megtakarítási megoldások.",
    href: "/penzugy#megtakaritasok",
    icon: PiggyBank,
  },
  {
    title: "Autót vagy más eszközt finanszíroznék",
    text: "Megnézzük a szóba jöhető lakossági lízing- és finanszírozási lehetőségeket.",
    href: "/penzugy/szamlatermekek/lakossagi-lizing",
    icon: CarFront,
  },
  {
    title: "A mindennapi bankolásomon változtatnék",
    text: "Folyószámla és hitelkártya: költségek, használati szokások és bankváltási lehetőségek.",
    href: "/penzugy#szamlatermekek",
    icon: WalletCards,
  },
  {
    title: "A vállalkozásomhoz keresek megoldást",
    text: "KKV hitel, KKV betét, vállalati pénzügyek és biztosítási megoldások.",
    href: "/penzugy#vallalkozasok",
    icon: BriefcaseBusiness,
  },
];

export default function SegitsValasztaniPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#f3ede4]">
      <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-8 lg:px-10">
        <Link
          href="/penzugy"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8a166] transition hover:text-[#ead2aa]"
        >
          <ArrowLeft className="h-4 w-4" />
          Vissza a pénzügyi megoldásokhoz
        </Link>

        <section className="relative mt-10 overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-[#191919] via-[#121212] to-[#090909]">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#c8a166]/10 blur-3xl" />

          <div className="relative grid min-h-[620px] items-center gap-6 px-7 py-12 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-14 lg:py-10">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c8a166]/30 bg-[#c8a166]/10 px-4 py-2 text-sm font-semibold text-[#d9b97f]">
                <Sparkles className="h-4 w-4" />
                Sziporka és Péter segít
              </div>

              <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
                Segítünk
                <span className="block text-[#c8a166]">választani.</span>
              </h1>

              <p className="mt-7 max-w-[720px] text-xl font-medium leading-8 text-[#eee5d8]">
                Nem kell tudnod, melyik pénzügyi termékre van szükséged.
              </p>

              <p className="mt-4 max-w-[720px] text-lg leading-8 text-[#cfc7bc]">
                Mondd el, mit szeretnél elérni, és segítünk megtalálni a célodhoz
                illő lehetőségeket. Induljunk abból, ami most számodra fontos.
              </p>

              <a
                href="#celok"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#c8a166] px-7 py-4 font-bold text-[#15110c] transition hover:bg-[#d8b77e]"
              >
                Mutassátok a lehetőségeket
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="relative min-h-[470px] lg:min-h-[600px]">
              <Image
                src="/sziporka-peter-segits-valasztani.png"
                alt="Sziporka és Péter segít a pénzügyi választásban"
                fill
                priority
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>
        </section>

        <section id="celok" className="mt-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c8a166]">
            Miben segíthetek?
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold">
            Válaszd ki a célodat
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {choices.map((choice) => {
              const Icon = choice.icon;

              return (
                <Link
                  key={choice.title}
                  href={choice.href}
                  className="group flex min-h-[245px] flex-col rounded-[28px] border border-white/10 bg-[#151515] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c8a166]/50 hover:bg-[#191817]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c8a166]/12 text-[#d3ad70]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight">
                    {choice.title}
                  </h3>

                  <p className="mt-3 flex-1 leading-7 text-[#aaa39a]">
                    {choice.text}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#d3ad70]">
                    Mutasd a lehetőségeket
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-[32px] border border-[#c8a166]/25 bg-gradient-to-r from-[#211b14] to-[#15120f] p-8 sm:p-10">
          <div className="max-w-[950px]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#c8a166]">
              Ha még ezek közül sem tudsz választani
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
              Nézzük át együtt a pénzügyi helyzetedet.
            </h2>
            <p className="mt-4 max-w-[820px] text-lg leading-8 text-[#c9c0b5]">
              Nem kell kész megoldással érkezned. Elég, ha elmondod, mi a célod,
              min szeretnél változtatni, vagy mi okoz bizonytalanságot. Innen
              már együtt meg tudjuk keresni a megfelelő irányt.
            </p>

            <Link
              href="/penzugy/kapcsolat"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#c8a166] px-7 py-4 font-bold text-[#15110c] transition hover:bg-[#d8b77e]"
            >
              Személyes segítséget kérek
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}