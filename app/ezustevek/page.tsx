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
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Hitelek
            </Link>

            <Link
              href="/penzugy#biztositasok"
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Biztosítások
            </Link>

            <Link
              href="/penzugy#megtakaritasok"
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Megtakarítások
            </Link>

            <Link
              href="/penzugy#szamlatermekek"
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Számlatermékek
            </Link>

            <Link
              href="/penzugy#vallalkozasok"
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Vállalkozások
            </Link>

            <Link
              href="/penzugy/kalkulatorok"
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Kalkulátorok
            </Link>

            <Link
              href="/konyvek"
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Könyvek
            </Link>

            <Link
              href="/ezustevek"
              className="text-[18px] font-semibold text-[#d4ad71]"
            >
              Ezüstévek
            </Link>

            <Link
              href="/penzugy/kapcsolat"
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Kapcsolat
            </Link>

            <Link
              href="/penzugy/adatkezeles"
              className="text-[18px] font-medium text-[#d8c3a0] transition hover:text-[#f1e6d3]"
            >
              Adatkezelés
            </Link>

          </nav>
        </div>
      </header>

      {/* EZÜSTÉVEK FEJLÉC */}

      <section className="border-b border-[#ded1c1] bg-[#fffaf4]">
        <div className="mx-auto max-w-[1180px] px-7 py-12 md:px-10">

          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#a87330]">
            Online magazin
          </p>

          <h1
            className="mt-3 text-[52px] font-semibold leading-none text-[#173b35] md:text-[64px]"
            style={{
              fontFamily:
                '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
            }}
          >
            Ezüstévek
          </h1>

          <p
            className="mt-4 text-[24px] text-[#173b35] md:text-[28px]"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Aktív évek. Teljes élet.
          </p>

          <p className="mt-4 max-w-[760px] text-[18px] leading-8 text-[#554d45]">
            Ingyenes online magazin az aktív, tartalmas és biztonságos
            mindennapokért.
          </p>

          <div className="mt-6 flex items-center gap-4 text-[14px]">
            <span className="font-semibold text-[#173b35]">
              HU ISSN 3141-8589
            </span>

            <span className="text-[#a48e77]">•</span>

            <span className="text-[#75685b]">
              Havonta megjelenő online kiadvány
            </span>
          </div>

        </div>
      </section>

      {/* AKTUÁLIS SZÁM */}

      <section className="bg-[#ead8c1]">
        <div className="mx-auto max-w-[1180px] px-7 py-12 md:px-10">

          <div className="mb-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#99672d]">
              Ezüstévek magazin
            </p>

            <h2
              className="mt-2 text-[38px] font-normal text-[#8f2630]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              Aktuális szám
            </h2>
          </div>

          <div className="flex flex-col items-start gap-7 md:flex-row md:items-end">

            <Link
              href="/ezustevek/olvaso"
              className="group block"
            >
              <Image
                src="/ezustevek/2026-november-borito.png"
                alt="Ezüstévek 2026. november"
                width={320}
                height={450}
                className="h-auto w-[240px] rounded-[14px] shadow-[0_18px_38px_rgba(0,0,0,0.20)] transition group-hover:-translate-y-1"
              />
            </Link>

            <div className="pb-1">

              <p className="text-[18px] font-bold text-[#173b35]">
                1. évfolyam • 1. szám
              </p>

              <p className="mt-1 text-[17px] font-semibold text-[#8f2630]">
                2026. november
              </p>

              <Link
                href="/ezustevek/olvaso"
                className="mt-5 inline-flex items-center text-[16px] font-semibold text-[#173b35] transition hover:text-[#8f2630]"
              >
                Megnyitás lapozható nézetben
                <span className="ml-2">→</span>
              </Link>

              <div className="mt-3">
                <a
                  href="/ezustevek/2026-november.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] text-[#75685b] underline underline-offset-4 hover:text-[#173b35]"
                >
                  PDF változat megnyitása
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* A MAGAZINRÓL */}

      <section className="bg-[#fffaf4]">
        <div className="mx-auto max-w-[1180px] px-7 py-11 md:px-10">

          <div className="grid gap-7 md:grid-cols-[240px_1fr]">

            <h2
              className="text-[31px] font-normal text-[#173b35]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              A magazinról
            </h2>

            <p className="max-w-[810px] text-[17px] leading-8 text-[#504941]">
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

      <section className="border-t border-[#dfd2c1] bg-[#f5eee4]">
        <div className="mx-auto max-w-[1180px] px-7 py-11 md:px-10">

          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a87330]">
            Archívum
          </p>

          <h2
            className="mt-2 text-[32px] font-normal text-[#173b35]"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Lapszámok
          </h2>

          <div className="mt-7 flex flex-wrap gap-5">

            <Link
              href="/ezustevek/olvaso"
              className="group block w-[175px]"
            >
              <div className="rounded-[15px] border border-[#dbcab7] bg-white p-3 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-lg">

                <Image
                  src="/ezustevek/2026-november-borito.png"
                  alt="Ezüstévek 2026. november"
                  width={220}
                  height={310}
                  className="h-auto w-full rounded-[8px]"
                />

                <div className="px-1 pb-1 pt-3">

                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a16b2d]">
                    1. szám
                  </p>

                  <p className="mt-1 text-[16px] font-bold text-[#173b35]">
                    2026. november
                  </p>

                  <p className="mt-2 text-[13px] font-medium text-[#8f2630]">
                    Olvasás →
                  </p>

                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* IMPRESSZUM */}

      <section className="bg-[#251e19] text-[#ddd0c0]">
        <div className="mx-auto max-w-[1180px] px-7 py-9 md:px-10">

          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c89b61]">
                Impresszum
              </p>

              <p className="mt-4 text-[18px] font-semibold text-white">
                Ezüstévek
              </p>

              <p className="mt-3 font-bold text-white">
                HU ISSN 3141-8589
              </p>
            </div>

            <div className="text-[14px] leading-7">
              <p>
                <strong className="text-white">Kiadó:</strong>{" "}
                Keszthelyi Andrea
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

            <div className="text-[14px] leading-7">
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

          <p className="mt-7 border-t border-white/10 pt-5 text-[13px] leading-6 text-[#b8aa99]">
            Az Ezüstévek egészségügyi témájú írásai tájékoztató jellegűek,
            nem helyettesítik az orvosi vizsgálatot, diagnózist vagy
            személyre szabott orvosi tanácsadást.
          </p>

        </div>
      </section>

      <Footer />

    </main>
  );
}
