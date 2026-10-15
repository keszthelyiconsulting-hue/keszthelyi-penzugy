import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";

export default function EzustevekPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e9] text-[#24312e]">
      {/* KESZTHELYI CONSULTING FEJLÉC */}

      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between px-8 py-4">
          <Link
            href="/penzugy"
            aria-label="Keszthelyi Consulting"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/keszthelyi-consulting-logo-light.png"
              alt="Keszthelyi Consulting"
              width={420}
              height={170}
              priority
              className="h-auto w-[230px] object-contain"
            />
          </Link>

          <nav className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-3 pl-6 lg:flex">
            <Link
              href="/penzugy#hitelek"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Hitelek
            </Link>

            <Link
              href="/penzugy#biztositasok"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Biztosítások
            </Link>

            <Link
              href="/penzugy#megtakaritasok"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Megtakarítások
            </Link>

            <Link
              href="/penzugy#szamlatermekek"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Számlatermékek
            </Link>

            <Link
              href="/penzugy#vallalkozasok"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Vállalkozások
            </Link>

            <Link
              href="/penzugy/kalkulatorok"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Kalkulátorok
            </Link>

            <Link
              href="/konyvek"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Könyvek
            </Link>

            <Link
              href="/ezustevek"
              className="text-[18px] font-semibold tracking-[0.02em] text-[#d4ad71]"
            >
              Ezüstévek
            </Link>

            <Link
              href="/penzugy/kapcsolat"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Kapcsolat
            </Link>

            <Link
              href="/penzugy/adatkezeles"
              className="text-[18px] font-medium tracking-[0.02em] text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Adatkezelés
            </Link>
          </nav>
        </div>
      </header>

      {/* EZÜSTÉVEK FEJRÉSZ */}

      <section className="border-b border-[#e4d7c7] bg-[#fffaf4]">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 md:px-10 md:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#aa7330]">
              Online magazin
            </p>

            <Image
              src="/ezustevek/ezustevek-logo.png"
              alt="Ezüstévek"
              width={520}
              height={160}
              priority
              className="h-auto w-[340px] max-w-full object-contain md:w-[390px]"
            />

            <h1
              className="mt-5 text-[34px] font-normal leading-tight text-[#173b35] md:text-[46px]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              Aktív évek. Teljes élet.
            </h1>

            <p className="mt-5 max-w-[760px] text-[19px] leading-8 text-[#554d45]">
              Ingyenes online magazin az aktív, tartalmas és biztonságos
              mindennapokért.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ezustevek/olvaso"
                className="rounded-full bg-[#173b35] px-7 py-3.5 font-semibold text-white transition hover:bg-[#245247]"
              >
                Lapozom a magazint
              </Link>

              <a
                href="/ezustevek/2026-november.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#b98952] bg-[#fff8ef] px-7 py-3.5 font-semibold text-[#47321f] transition hover:bg-white"
              >
                Megnyitás PDF-ben
              </a>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#dfcfbc] bg-[#f6ede0] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.08)] md:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#9d652a]">
              Aktuális szám
            </p>

            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
              <Link href="/ezustevek/olvaso" className="group block shrink-0">
                <Image
                  src="/ezustevek/2026-november-borito.png"
                  alt="Ezüstévek 2026. november"
                  width={320}
                  height={450}
                  className="h-auto w-[190px] rounded-[14px] shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition duration-300 group-hover:-translate-y-1"
                />
              </Link>

              <div>
                <p className="text-[22px] font-bold text-[#173b35]">
                  1. évfolyam • 1. szám
                </p>

                <p className="mt-1 text-[18px] font-semibold text-[#8f2630]">
                  2026. november
                </p>

                <p className="mt-4 text-[16px] leading-7 text-[#4f463e]">
                  Az első lapszámban többek között egészségmegőrzéssel,
                  laboreredményekkel, őszi életmóddal,
                  idősotthon-választással, nappali ellátással és
                  biztonsággal foglalkozunk.
                </p>

                <p className="mt-5 text-[14px] text-[#7a6d62]">
                  A „Lapozom a magazint” gomb már az e-book nézetet nyitja meg.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A MAGAZINRÓL */}

      <section className="bg-[#fffdf9]">
        <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-[260px_1fr]">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#aa7330]">
                Rólunk
              </p>

              <h2
                className="mt-2 text-[34px] font-normal text-[#173b35]"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                }}
              >
                A magazinról
              </h2>
            </div>

            <p className="max-w-[820px] text-[18px] leading-8 text-[#504941]">
              Az Ezüstévek hosszú távra tervezett, havonta megjelenő online
              kiadvány. Célja, hogy megbízható, közérthető és valóban hasznos
              tartalmakkal segítse az olvasókat az egészség, életmód,
              közösségi élet, szociális ellátás és a mindennapi biztonság
              területén.
            </p>
          </div>
        </div>
      </section>

      {/* LAPSZÁMOK */}

      <section className="border-t border-[#e2d5c5] bg-[#f5eee4]">
        <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#aa7330]">
            Archívum
          </p>

          <h2
            className="mt-2 text-[36px] font-normal text-[#173b35]"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Lapszámok
          </h2>

          <p className="mt-3 max-w-[700px] text-[16px] leading-7 text-[#655d54]">
            A megjelent lapszámok itt sorban elérhetők és lapozhatók.
          </p>

          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/ezustevek/olvaso" className="group block w-[190px]">
              <div className="rounded-[16px] border border-[#dbcab6] bg-white p-3 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <Image
                  src="/ezustevek/2026-november-borito.png"
                  alt="Ezüstévek 2026. november"
                  width={220}
                  height={310}
                  className="h-auto w-full rounded-[9px]"
                />

                <div className="px-1 pb-2 pt-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a36d30]">
                    1. szám
                  </p>

                  <p className="mt-1 text-[17px] font-bold text-[#173b35]">
                    2026. november
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* IMPRESSZUM */}

      <section className="bg-[#26201b] text-[#ded2c3]">
        <div className="mx-auto max-w-[1200px] px-6 py-11 md:px-10">
          <div className="grid gap-9 md:grid-cols-3">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#caa066]">
                Impresszum
              </p>

              <p className="mt-4 text-[15px] uppercase tracking-[0.18em] text-[#d5af78]">
                Ezüstévek magazin
              </p>

              <p className="mt-3 text-[18px] font-bold text-white">
                HU ISSN 3141-8589
              </p>
            </div>

            <div className="text-[15px] leading-7">
              <p>
                <strong className="text-white">Kiadó:</strong> Keszthelyi Andrea
              </p>

              <p className="mt-2">
                <strong className="text-white">
                  Kiadásért és szerkesztésért felelős:
                </strong>{" "}
                Keszthelyi Andrea
              </p>

              <p className="mt-2">
                <strong className="text-white">Web:</strong>{" "}
                keszthelyiconsulting.com
              </p>
            </div>

            <div className="text-[15px] leading-7">
              <p>
                <strong className="text-white">Kiadó címe:</strong>{" "}
                7967 Markóc, Fő utca 35.
              </p>

              <p className="mt-2">
                <strong className="text-white">E-mail:</strong>{" "}
                info@keszthelyiconsulting.com
              </p>

              <p className="mt-2">
                <strong className="text-white">Megjelenés:</strong>{" "}
                havonta, online
              </p>
            </div>
          </div>

          <p className="mt-8 border-t border-white/10 pt-5 text-[13px] leading-6 text-[#b8aa9a]">
            Az Ezüstévek egészségügyi témájú írásai tájékoztató jellegűek,
            nem helyettesítik az orvosi vizsgálatot, diagnózist vagy személyre
            szabott orvosi tanácsadást.
          </p>
        </div>
      </section>

      {/* KÖZÖS KESZTHELYI CONSULTING LÁBLÉC */}

      <Footer />
    </main>
  );
}
