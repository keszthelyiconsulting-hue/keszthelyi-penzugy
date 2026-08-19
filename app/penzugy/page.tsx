"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const movingTopics = [
  "Személyi kölcsön",
  "Folyószámla",
  "Hitelkártya",
  "Lakáshitel",
  "Lakossági Lízing",
  "Hitelkiváltás",
  "Otthon Start",
  "CSOK Plusz",
  "Babaváró",
  "Munkáshitel",
  "Életbiztosítás",
  "Egészségbiztosítás",
  "Megtakarítás",
  "Nyugdíj",
  "Vállalkozások",
  "KKV Hitel",
  "KKV Betét",
];



type ProductCard = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image: string;
};

const loans: ProductCard[] = [
  {
    title: "Személyi kölcsön",
    subtitle: "Szabadon felhasználható, gyors finanszírozás.",
    description:
      "Több bank ajánlatának összehasonlítása, az Ön jövedelméhez és céljához igazítva.",
    href: "/penzugy/hitelek/szemelyi-kolcson",
    image: "/finance-card-szemelyi-kolcson.png",
  },
  {
    title: "Lakáshitel",
    subtitle: "Otthonteremtés átgondolt finanszírozással.",
    description:
      "Lakásvásárláshoz, építéshez vagy felújításhoz illeszkedő hitellehetőségek.",
    href: "/penzugy/hitelek/lakashitel",
    image: "/finance-card-lakashitel.png",
  },
  {
    title: "Hitelkiváltás",
    subtitle: "Átláthatóbb törlesztés, rendezettebb pénzügyek.",
    description:
      "Meglévő hitelek kiváltása kedvezőbb vagy egyszerűbb konstrukcióval.",
    href: "/penzugy/hitelek/hitelkivaltas",
    image: "/finance-card-hitelkivaltas.png",
  },
  {
    title: "Otthon Start",
    subtitle: "Első otthon kedvezőbb feltételekkel.",
    description:
      "Az Otthon Start lehetőségeinek áttekintése jogosultság és finanszírozási cél alapján.",
    href: "/penzugy/otthonteremtes/otthon-start",
    image: "/finance-card-otthon-start.png",
  },
  {
    title: "CSOK Plusz",
    subtitle: "Családtervezéshez kapcsolódó finanszírozás.",
    description:
      "A CSOK Plusz feltételeinek és kapcsolódó hitellehetőségeinek áttekintése.",
    href: "/penzugy/otthonteremtes/csok-plusz",
    image: "/finance-card-csok-plusz.png",
  },
  {
    title: "Babaváró",
    subtitle: "Rugalmas segítség családalapításhoz.",
    description:
      "A Babaváró hitel feltételeinek és felhasználási lehetőségeinek áttekintése.",
    href: "/penzugy/otthonteremtes/babavaro",
    image: "/finance-card-babavaro.png",
  },
  {
    title: "Munkáshitel",
    subtitle: "Lehetőség fiatal dolgozóknak.",
    description:
      "A Munkáshitel feltételeinek, jogosultságának és felhasználási lehetőségeinek áttekintése.",
    href: "/penzugy/hitelek/munkashitel",
    image: "/finance-card-munkashitel.png",
  },
  {
    title: "Falusi CSOK",
    subtitle: "Otthonteremtés preferált kistelepülésen.",
    description:
      "Falusi CSOK lehetőségek vásárláshoz, korszerűsítéshez és bővítéshez.",
    href: "/penzugy/otthonteremtes/falusi-csok",
    image: "/finance-card-falusi-csok.png",
  },
];

const insurances: ProductCard[] = [
  {
    title: "Életbiztosítás",
    subtitle: "Anyagi védelem váratlan élethelyzetekre.",
    description:
      "Egyéni és családi életbiztosítási lehetőségek az élethelyzethez igazítva.",
    href: "/penzugy/biztositasok/eletbiztositas",
    image: "/finance-card-eletbiztositas.png",
  },
  {
    title: "Egészségbiztosítás",
    subtitle: "Gyorsabb hozzáférés magánegészségügyi ellátáshoz.",
    description:
      "Egészségbiztosítási lehetőségek magánellátással és kiegészítő szolgáltatásokkal.",
    href: "/penzugy/biztositasok/egeszsegbiztositas",
    image: "/finance-card-egeszsegbiztositas.png",
  },
  {
    title: "Hitel-fedezeti védelem",
    subtitle: "A hitel mögött is legyen biztonság.",
    description:
      "Váratlan helyzetekben segítséget adhat a hitelterhek kezeléséhez.",
    href: "/penzugy/biztositasok/hitelfedezeti-vedelem",
    image: "/finance-card-hitel-fedezeti-vedelem.png",
  },

];

const savings: ProductCard[] = [
  {
    title: "Nyugdíj",
    subtitle: "Több szabadság a későbbi évekre.",
    description:
      "Nyugdíjcélú megtakarítási lehetőségek hosszú távú pénzügyi tervezéshez.",
    href: "/penzugy/megtakaritasok/nyugdij",
    image: "/finance-card-nyugdij.png",
  },
  {
    title: "Gyermekcélú megtakarítás",
    subtitle: "Indulótőke a jövőhöz.",
    description:
      "Hosszabb távú megtakarítás tanulásra, életkezdésre vagy első otthonra.",
    href: "/penzugy/megtakaritasok/gyermekcelu-megtakaritas",
    image: "/finance-card-gyermek-megtakaritas.png",
  },
  {
    title: "Hosszú távú megtakarítás",
    subtitle: "Tartalék a fontos célokra.",
    description:
      "Rendszeres vagy egyszeri megtakarítási lehetőségek személyes célokhoz igazítva.",
    href: "/penzugy/megtakaritasok/hosszu-tavu-megtakaritas",
    image: "/finance-card-hosszu-tavu-megtakaritas.png",
  },
  {
    title: "LTP",
    subtitle: "Lakáscélú megtakarítás tervezhetően.",
    description:
      "Lakástakarékpénztári lehetőségek lakáscélokhoz, felújításhoz vagy későbbi otthonteremtéshez.",
    href: "/penzugy/megtakaritasok/ltp",
    image: "/finance-card-ltp.png",
  },
];


const bankingProducts: ProductCard[] = [
  {
    title: "Lakossági folyószámla",
    subtitle: "A mindennapi pénzügyeidhez.",
    description:
      "Bankszámla a bankolási szokásaidhoz igazítva – akár alacsonyabb költségekkel. Egy jól megválasztott bankváltással olykor többet spórolhatsz, és akár pénzt is kaphatsz.",
    href: "/penzugy/szamlatermekek/lakossagi-folyoszamla",
    image: "/finance-card-lakossagi-folyoszamla.png",
  },
  {
    title: "Hitelkártya",
    subtitle: "Rugalmas pénzügyi tartalék.",
    description:
      "Hitelkártyák összehasonlítása a költségek, kedvezmények és felhasználási szokások alapján.",
    href: "/penzugy/szamlatermekek/hitelkartya",
    image: "/finance-card-hitelkartya.png",
  },
  {
    title: "Lakossági lízing",
    subtitle: "Finanszírozás a terveidhez igazítva.",
    description:
      "Lakossági lízing lehetőségek az önerő, a futamidő és a vállalható havi teher figyelembevételével.",
    href: "/penzugy/szamlatermekek/lakossagi-lizing",
    image: "/finance-card-lakossagi-lizing.png",
  },
];



const businesses: ProductCard[] = [
  {
    title: "Kulcsember-védelem",
    subtitle: "A vállalkozás értéke sokszor emberekben van.",
    description:
      "Megoldások a kulcsemberek kieséséből eredő pénzügyi kockázatok mérséklésére.",
    href: "/penzugy/vallalkozasok/kulcsember-vedelem",
    image: "/finance-card-kulcsember-vedelem.png",
  },
  {
    title: "Csoportos biztosítás",
    subtitle: "Plusz érték a munkatársaknak.",
    description:
      "Munkavállalói csoportos biztosítási megoldások a vállalkozás céljaihoz igazítva.",
    href: "/penzugy/vallalkozasok/csoportos-biztositas",
    image: "/finance-card-csoportos-biztositas.png",
  },
  {
    title: "Vállalati pénzügyek",
    subtitle: "Stabilabb háttér a növekedéshez.",
    description:
      "Pénzügyi és biztosítási megoldások vállalkozások működéséhez és fejlődéséhez.",
    href: "/penzugy/vallalkozasok/vallalati-penzugyek",
    image: "/finance-card-vallalati-penzugyek.png",
  },
  {
    title: "KKV hitel",
    subtitle: "Forrás a vállalkozás következő lépéséhez.",
    description:
      "Beruházáshoz, fejlesztéshez, forgóeszközhöz vagy likviditási célhoz illeszkedő vállalkozói finanszírozási lehetőségek.",
    href: "/penzugy/vallalkozasok/kkv-hitel",
    image: "/finance-card-kkv-hitel.png",
  },
  {
    title: "KKV betét",
    subtitle: "A szabad vállalati pénz is dolgozhat.",
    description:
      "Vállalati betéti lehetőségek az elhelyezhető összeg, a tervezett időtáv és a szükséges likviditás figyelembevételével.",
    href: "/penzugy/vallalkozasok/kkv-betet",
    image: "/finance-card-kkv-betet.png",
  },
];

function MovingTopics() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let x = 0;
    let previous = performance.now();

    const move = (time: number) => {
      const delta = time - previous;
      previous = time;
      x += delta * 0.018;

      const half = track.scrollWidth / 2;
      if (half > 0 && x >= half) x = 0;

      track.style.transform = `translate3d(-${x}px,0,0)`;
      frame = requestAnimationFrame(move);
    };

    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, []);

  const doubled = [...movingTopics, ...movingTopics];

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max items-center whitespace-nowrap will-change-transform"
      >
        {doubled.map((topic, index) => (
          <div key={`${topic}-${index}`} className="flex items-center">
            <span className="px-7 text-[16px] font-medium text-[#eee4d5]">
              {topic}
            </span>
            <span className="text-[#c8a166]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlipCard({ card }: { card: ProductCard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article
      className="h-[225px] [perspective:1200px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((value) => !value)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[26px] border border-white/10 bg-[#101010] [backface-visibility:hidden]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${card.image}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d4ad71]">
              {card.title}
            </p>
            <h3
              className="mt-3 text-[18px] font-normal leading-[1.16] text-[#efe5d6]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {card.subtitle}
            </h3>
            <p className="mt-4 text-[12px] text-white/45">Fordítsa meg →</p>
          </div>
        </div>

        <div className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col rounded-[26px] border border-[#c8a166]/25 bg-[#121212] p-6 [backface-visibility:hidden]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d4ad71]">
            {card.title}
          </p>
          <p className="mt-6 text-[15px] leading-6 text-[#d8cec0]">
            {card.description}
          </p>
          <Link
            href={card.href}
            onClick={(event) => event.stopPropagation()}
            className="mt-auto inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-[#dfbb80]"
          >
            Részletek <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}


function HelpIcon({ type }: { type: "home" | "shield" | "savings" | "business" | "question" }) {
  const common = "h-7 w-7";

  if (type === "home") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 9.5V21h13V9.5M9.5 21v-6h5v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M12 3 19 6v5c0 4.7-2.7 8-7 10-4.3-2-7-5.3-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "savings") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <ellipse cx="12" cy="6" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4M6 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "business") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 7V5h6v2M3 12h18M10 12v2h4v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.2c-.9.4-1.2 1-1.2 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function ProductSection({
  id,
  eyebrow,
  title,
  cards,
}: {
  id: string;
  eyebrow: string;
  title: string;
  cards: ProductCard[];
}) {
  return (
    <section id={id} className="border-t border-white/6 px-7 py-16 lg:px-10">
      <div className="mx-auto max-w-[1540px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#cba366]">
          {eyebrow}
        </p>
        <h2
          className="mt-3 text-[27px] font-normal text-[#efe5d6] md:text-[32px]"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {title}
        </h2>

        <div
  className={`mt-8 grid gap-4 sm:grid-cols-2 ${
    id === "biztositasok" ? "lg:grid-cols-3" : "lg:grid-cols-4"
  }`}
>
          {cards.map((card) => (
            <FlipCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PenzugyHomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4A3425] via-[#211813] to-[#050505] text-[#e7ddcf]">
      {/* FEJLÉC */}
      <header className="border-b border-white/8 bg-black">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between px-8 py-4">
          <Link href="/penzugy" aria-label="Keszthelyi Consulting" className="flex items-center">
            <Image
              src="/keszthelyi-consulting-logo-light.png"
              alt="Keszthelyi Consulting"
              width={420}
              height={170}
              priority
              className="h-auto w-[230px] object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <Link href="#hitelek" className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]">
              Hitelek
            </Link>
            <Link href="#biztositasok" className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]">
              Biztosítások
            </Link>
            <Link href="#megtakaritasok" className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]">
              Megtakarítások
            </Link>
            <Link href="#szamlatermekek" className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]">
              Számlatermékek
            </Link>
            <Link href="#vallalkozasok" className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]">
              Vállalkozások
            </Link>
            <Link href="/penzugy/kalkulatorok" className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]">
              Kalkulátorok
            </Link>
            <Link href="/penzugy/kapcsolat" className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]">
              Kapcsolat
            </Link>
            <Link href="/penzugy/adatkezeles" className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]">
              Adatkezelés
            </Link>
          </nav>
        </div>
      </header>

      {/* NAGY KÉPES HERO */}
      <section className="relative h-[520px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/finance-hero-main.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 via-45% to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1540px] items-center px-8">
          <div className="max-w-[650px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#cda669]">
              Pénzügyi megoldások, amik előre visznek
            </p>
            <h1
              className="mt-4 text-[48px] font-normal leading-[1.02] md:text-[60px]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Okos döntések.
              <span className="block text-[#d0a563]">Biztos jövő.</span>
            </h1>
            <p className="mt-5 max-w-[580px] text-[18px] leading-8 text-white/72">
              Hitel, biztosítás, megtakarítás és vállalati pénzügyek – egy
              helyen, az Ön céljaira szabva.
            </p>
          </div>
        </div>
      </section>

      {/* LAZA MOZGÓ SOR */}
      <section className="border-y border-white/6 bg-black py-4">
        <MovingTopics />
      </section>

      {/* SZIPORKA + BIZALOMÉPÍTŐ RÉSZ */}
      <section className="px-7 py-12 lg:px-10">
        <div className="mx-auto grid max-w-[1540px] gap-6 lg:grid-cols-2">

          {/* BAL FÉL – SZIPORKA */}
          <div className="grid min-h-[520px] overflow-hidden rounded-[28px] border border-[#b99358]/30 bg-[#080808] lg:grid-cols-[0.46fr_0.54fr]">
            <div className="relative min-h-[500px]">
              <div
                className="absolute inset-0 bg-bottom bg-no-repeat"
                style={{
                  backgroundImage: 'url("/sziporka-penzugy.png")',
                  backgroundSize: "auto 100%",
                  backgroundPosition: "center bottom",
                }}
              />
            </div>

            <div className="flex flex-col justify-center px-5 py-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#d2aa6d]">
                Sziporka vagyok, a Keszthelyi Consulting asszisztense.
              </p>

              <h2
                className="mt-2 text-[28px] font-normal leading-[1.08] text-[#efe5d6]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Miben segíthetek?
              </h2>

              <div className="mt-6 grid gap-2.5">
                <Link href="#hitelek" className="group flex min-h-[58px] items-center gap-3 rounded-[14px] border border-[#b99358]/40 bg-black/35 px-4 py-2.5 transition hover:border-[#d7b171]/80 hover:bg-[#16110b]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cda669]/30 text-[#d6ae70]"><HelpIcon type="home" /></span>
                  <span className="flex-1 text-[13px] font-medium text-[#eee4d5]">Hitelt keresek</span>
                  <span className="text-[17px] text-[#d6ae70]">→</span>
                </Link>

                <Link href="#biztositasok" className="group flex min-h-[58px] items-center gap-3 rounded-[14px] border border-[#b99358]/40 bg-black/35 px-4 py-2.5 transition hover:border-[#d7b171]/80 hover:bg-[#16110b]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cda669]/30 text-[#d6ae70]"><HelpIcon type="shield" /></span>
                  <span className="flex-1 text-[13px] font-medium text-[#eee4d5]">Biztosítást szeretnék</span>
                  <span className="text-[17px] text-[#d6ae70]">→</span>
                </Link>

                <Link href="#megtakaritasok" className="group flex min-h-[58px] items-center gap-3 rounded-[14px] border border-[#b99358]/40 bg-black/35 px-4 py-2.5 transition hover:border-[#d7b171]/80 hover:bg-[#16110b]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cda669]/30 text-[#d6ae70]"><HelpIcon type="savings" /></span>
                  <span className="flex-1 text-[13px] font-medium text-[#eee4d5]">Megtakarítanék</span>
                  <span className="text-[17px] text-[#d6ae70]">→</span>
                </Link>

                <Link href="#vallalkozasok" className="group flex min-h-[58px] items-center gap-3 rounded-[14px] border border-[#b99358]/40 bg-black/35 px-4 py-2.5 transition hover:border-[#d7b171]/80 hover:bg-[#16110b]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cda669]/30 text-[#d6ae70]"><HelpIcon type="business" /></span>
                  <span className="flex-1 text-[13px] font-medium text-[#eee4d5]">Vállalkozásomhoz keresek megoldást</span>
                  <span className="text-[17px] text-[#d6ae70]">→</span>
                </Link>

                <Link href="/penzugy/segits-valasztani" className="group flex min-h-[58px] items-center gap-3 rounded-[14px] border border-[#b99358]/40 bg-black/35 px-4 py-2.5 transition hover:border-[#d7b171]/80 hover:bg-[#16110b]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cda669]/30 text-[#d6ae70]"><HelpIcon type="question" /></span>
                  <span className="flex-1 text-[13px] font-medium text-[#eee4d5]">Még nem tudom pontosan</span>
                  <span className="text-[17px] text-[#d6ae70]">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* JOBB FÉL */}
          <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-[#b99358]/30 bg-[#111]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("/finance-independent-advice.png")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/72 to-black/20" />

<div className="relative flex h-full flex-col justify-start p-8 pt-12 md:p-10 md:pt-14">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#d2aa6d]">
                Független pénzügyi tanácsadás
              </p>

              <h2
                className="mt-3 max-w-[560px] text-[30px] font-normal leading-[1.1] text-[#efe5d6] md:text-[34px]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Miért érdemes független pénzügyi tanácsadóval dolgozni?
              </h2>

              <div className="mt-7 grid gap-4">
                <div>
                  <p className="text-[16px] font-semibold text-[#d7b171]">Több bank ajánlata</p>
                  <p className="mt-1 text-[14px] leading-6 text-[#d1c6b8]">Nem egyetlen pénzintézet lehetőségeiből választunk.</p>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#d7b171]">Személyre szabott megoldás</p>
                  <p className="mt-1 text-[14px] leading-6 text-[#d1c6b8]">Az élethelyzetéhez és céljaihoz keressük a megfelelő konstrukciót.</p>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#d7b171]">Egy kapcsolattartó</p>
                  <p className="mt-1 text-[14px] leading-6 text-[#d1c6b8]">A lehetőségek áttekintésétől az ügyintézésig.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TERMÉKCSOPORTOK */}
      <ProductSection
        id="hitelek"
        eyebrow="HITELEK"
        title="Finanszírozási lehetőségek"
        cards={loans}
      />

      <ProductSection
        id="biztositasok"
        eyebrow="BIZTOSÍTÁSOK"
        title="Védelem az élet különböző területeire"
        cards={insurances}
      />

      <ProductSection
        id="megtakaritasok"
        eyebrow="MEGTAKARÍTÁS"
        title="Tervek a jövőre"
        cards={savings}
      />

      <ProductSection
        id="szamlatermekek"
        eyebrow="SZÁMLÁK ÉS BANKI TERMÉKEK"
        title="Mindennapi bankolás tudatosabban"
        cards={bankingProducts}
      />

      <ProductSection
        id="vallalkozasok"
        eyebrow="VÁLLALKOZÁSOK"
        title="Megoldások vállalkozások számára"
        cards={businesses}
      />
    </main>
  );
}