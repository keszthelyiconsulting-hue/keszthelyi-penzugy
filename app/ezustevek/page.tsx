import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";

export default function EzustevekPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4A3425] via-[#211813] to-[#050505] text-[#e7ddcf]">

      {/* FEJLÉC – KESZTHELYI CONSULTING */}

      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between px-8 py-4">
          <Link
            href="/penzugy"
            aria-label="Keszthelyi Consulting"
            className="flex items-center"
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

      {/* EZÜSTÉVEK OLDAL */}

      <section className="px-5 py-12 md:px-8 lg:py-16">
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[28px] border border-[#b99358]/30 bg-[#fbf8f2] shadow-2xl">

          {/* MAGAZIN FEJLÉC */}

          <div className="border-b border-[#d9c8ae] px-7 py-9 md:px-12 md:py-11">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <img
                  src="/ezustevek/ezustevek-logo.png"
                  alt="Ezüstévek"
                  className="h-auto w-[280px] max-w-full"
                />

                <h1
                  className="mt-4 text-[38px] font-normal leading-tight text-[#173b35] md:text-[50px]"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                >
                  Aktív évek. Teljes élet.
                </h1>

                <p className="mt-4 max-w-[760px] text-[18px] leading-8 text-[#413d37]">
                  Ingyenes online magazin az aktív, tartalmas és biztonságos
                  mindennapokért.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-[#d7c39f] bg-[#f4eadb] px-5 py-4 text-[#173b35]">
                <p className="text-sm uppercase tracking-[0.14em] text-[#9b7441]">
                  Online időszaki kiadvány
                </p>
                <p className="mt-1 font-semibold">
                  HU ISSN 3141-8589
                </p>
              </div>

            </div>
          </div>

          {/* AKTUÁLIS SZÁM */}

          <div className="grid gap-10 px-7 py-10 md:px-12 lg:grid-cols-[1fr_300px] lg:py-12">

            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a77b3e]">
                Ezüstévek magazin
              </p>

              <h2
                className="mt-3 text-[32px] font-normal text-[#7c1f2d]"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                }}
              >
                Aktuális szám
              </h2>

              <p className="mt-5 text-[19px] font-semibold text-[#173b35]">
                1. évfolyam • 1. szám • 2026. november
              </p>

              <p className="mt-5 max-w-[720px] text-[17px] leading-8 text-[#4a4540]">
                Az első lapszámban többek között egészségmegőrzéssel,
                laboreredményekkel, őszi életmóddal, idősotthon-választással,
                nappali ellátással és biztonsággal foglalkozunk.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/ezustevek/2026-november.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#173b35] px-6 py-3 font-semibold text-white transition hover:bg-[#225348]"
                >
                  Lapozom a magazint
                </a>

                <a
                  href="/ezustevek/2026-november.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#c8a166] bg-[#eee4d5] px-6 py-3 font-semibold text-[#453321] transition hover:bg-[#e3d2b8]"
                >
                  Megnyitás PDF-ben
                </a>
              </div>

              {/* A MAGAZINRÓL */}

              <div className="mt-10 border-t border-[#ded2c1] pt-8">
                <h2
                  className="text-[28px] font-normal text-[#7c1f2d]"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                >
                  A magazinról
                </h2>

                <p className="mt-4 max-w-[760px] text-[17px] leading-8 text-[#4a4540]">
                  Az Ezüstévek hosszú távra tervezett, havonta megjelenő
                  online kiadvány. Célja, hogy megbízható, közérthető és
                  valóban hasznos tartalmakkal segítse az olvasókat az
                  egészség, életmód, közösségi élet, szociális ellátás és
                  a mindennapi biztonság területén.
                </p>
              </div>
            </div>

            {/* AKTUÁLIS BORÍTÓ */}

            <div className="flex justify-center lg:justify-end">
              <a
                href="/ezustevek/2026-november.pdf"
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <img
                  src="/ezustevek/2026-november-borito.png"
                  alt="Ezüstévek 2026. novemberi lapszám"
                  className="h-auto w-[260px] rounded-xl border border-[#d7c39f] shadow-[0_16px_38px_rgba(0,0,0,0.20)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_46px_rgba(0,0,0,0.28)]"
                />

                <p className="mt-3 text-center text-sm text-[#766552]">
                  Kattintson a megnyitáshoz
                </p>
              </a>
            </div>

          </div>

          {/* LAPSZÁMOK */}

          <div className="border-t border-[#d9c8ae] bg-[#f5efe5] px-7 py-10 md:px-12">

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a77b3e]">
                  Archívum
                </p>

                <h2
                  className="mt-2 text-[30px] font-normal text-[#7c1f2d]"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                >
                  Lapszámok
                </h2>
              </div>

              <p className="max-w-[500px] text-[15px] leading-6 text-[#6a6258]">
                A megjelent lapszámok itt később egymás mellett lesznek
                elérhetők és megnyithatók.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-5">
              <a
                href="/ezustevek/2026-november.pdf"
                target="_blank"
                rel="noreferrer"
                className="group w-[175px] text-[#173b35]"
              >
                <div className="rounded-2xl border border-[#dacbb6] bg-white p-3 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <img
                    src="/ezustevek/2026-november-borito.png"
                    alt="Ezüstévek 2026. november"
                    className="h-auto w-full rounded-lg"
                  />

                  <div className="px-1 pb-1 pt-3">
                    <p className="text-[13px] uppercase tracking-[0.08em] text-[#a77b3e]">
                      1. szám
                    </p>

                    <strong className="mt-1 block text-[16px]">
                      2026. november
                    </strong>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* KÖNYVEK – HELY A KÉSŐBBI KIADVÁNYOKNAK */}

          <div className="border-t border-[#d9c8ae] bg-white px-7 py-10 md:px-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a77b3e]">
              Kiadói polc
            </p>

            <h2
              className="mt-2 text-[30px] font-normal text-[#173b35]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              Könyvek
            </h2>

            <p className="mt-4 max-w-[760px] text-[16px] leading-7 text-[#5a534b]">
              Itt jelennek majd meg sorban az Ezüstévekhez és a Keszthelyi
              Consulting kiadványaihoz kapcsolódó könyvek, kattintható és
              lapozható formában.
            </p>

            <Link
              href="/konyvek"
              className="mt-6 inline-flex rounded-full border border-[#c8a166] px-6 py-3 font-semibold text-[#604923] transition hover:bg-[#f1e7d7]"
            >
              Könyvek megtekintése
            </Link>
          </div>

          {/* EZÜSTÉVEK IMPRESSZUM */}

          <div className="border-t border-[#c8a166]/30 bg-[#17130f] px-7 py-9 text-[#d8cec0] md:px-12">

            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

              <div>
                <img
                  src="/ezustevek/ezustevek-logo.png"
                  alt="Ezüstévek"
                  className="h-auto w-[190px] max-w-full"
                />

                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[#c8a166]">
                  Aktív évek. Teljes élet.
                </p>

                <p className="mt-3 font-semibold text-[#efe5d6]">
                  HU ISSN 3141-8589
                </p>
              </div>

              <div className="grid gap-x-8 gap-y-2 text-[14px] leading-6 md:grid-cols-2">
                <p>
                  <strong className="text-[#efe5d6]">Kiadó:</strong>{" "}
                  Keszthelyi Andrea
                </p>

                <p>
                  <strong className="text-[#efe5d6]">Kiadó címe:</strong>{" "}
                  7967 Markóc, Fő utca 35.
                </p>

                <p>
                  <strong className="text-[#efe5d6]">
                    Kiadásért és szerkesztésért felelős:
                  </strong>{" "}
                  Keszthelyi Andrea
                </p>

                <p>
                  <strong className="text-[#efe5d6]">E-mail:</strong>{" "}
                  info@keszthelyiconsulting.com
                </p>

                <p>
                  <strong className="text-[#efe5d6]">Web:</strong>{" "}
                  keszthelyiconsulting.com
                </p>

                <p>
                  <strong className="text-[#efe5d6]">Megjelenés:</strong>{" "}
                  havonta, online
                </p>
              </div>

            </div>

            <div className="mt-7 border-t border-white/10 pt-5 text-[13px] leading-6 text-[#a99e90]">
              Az Ezüstévek egészségügyi témájú írásai tájékoztató jellegűek,
              nem helyettesítik az orvosi vizsgálatot, diagnózist vagy
              személyre szabott orvosi tanácsadást.
            </div>

          </div>

        </div>
      </section>

      {/* KESZTHELYI CONSULTING LÁBLÉC */}

      <Footer />

    </main>
  );
}
