"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";

const PAGE_IMAGES = Array.from(
  { length: 34 },
  (_, index) => `/ezustevek/pages/${String(index + 1).padStart(2, "0")}.webp`
);

function MagazineReader() {
  const bookRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<any>(null);

  const [flipReady, setFlipReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [bookKey, setBookKey] = useState(0);

  useEffect(() => {
    if (!flipReady || !bookRef.current) return;

    const St = (window as any).St;
    if (!St?.PageFlip) return;

    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.destroy();
      } catch {}
    }

    const isSmall = window.innerWidth < 900;
    const pageWidth = fullscreen ? 520 : isSmall ? 320 : 420;
    const pageHeight = Math.round(pageWidth * 1.414);

    const pageFlip = new St.PageFlip(bookRef.current, {
      width: pageWidth,
      height: pageHeight,

      size: "stretch",

      minWidth: 260,
      maxWidth: fullscreen ? 620 : 470,

      minHeight: 368,
      maxHeight: fullscreen ? 877 : 665,

      showCover: true,
      usePortrait: false,
      autoSize: true,
      drawShadow: true,
      maxShadowOpacity: 0.35,
      flippingTime: 900,
      mobileScrollSupport: false,
      startPage: Math.max(0, Math.min(currentPage, PAGE_IMAGES.length - 1)),
    });

    pageFlip.loadFromImages(PAGE_IMAGES);

    pageFlip.on("flip", (event: any) => {
      setCurrentPage(event.data);
    });

    pageFlipRef.current = pageFlip;

    return () => {
      try {
        pageFlip.destroy();
      } catch {}
    };
  }, [flipReady, fullscreen, bookKey]);

  useEffect(() => {
    const onResize = () => {
      setBookKey((value) => value + 1);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const previousPage = () => {
    pageFlipRef.current?.flipPrev();
  };

  const nextPage = () => {
    pageFlipRef.current?.flipNext();
  };

  const reader = (
    <div
      className={
        fullscreen
          ? "relative flex h-full w-full flex-col bg-[#171411]"
          : "relative w-full"
      }
    >
      {fullscreen && (
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3">
          <div className="text-white">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d4ad71]">
              Ezüstévek
            </p>
            <p className="mt-1 text-[14px] text-white/70">
              2026. november
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="rounded-full border border-white/20 px-5 py-2 text-[14px] font-semibold text-white transition hover:bg-white/10"
          >
            Bezárás
          </button>
        </div>
      )}

      <div
        className={
          fullscreen
            ? "relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-16 py-5"
            : "relative flex min-h-[620px] items-center justify-center overflow-hidden rounded-[24px] bg-[#e4dbcf] px-14 py-5 shadow-[0_22px_60px_rgba(0,0,0,0.18)]"
        }
      >
        {/* BAL LAPOZÓ NYÍL */}
        {currentPage > 0 && (
          <button
            type="button"
            onClick={previousPage}
            aria-label="Előző oldal"
            className={
              fullscreen
                ? "absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-[34px] leading-none text-white shadow-lg transition hover:bg-black/55"
                : "absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c7b18e] bg-[#fffaf2]/95 text-[32px] leading-none text-[#173b35] shadow-lg transition hover:scale-105"
            }
          >
            ‹
          </button>
        )}

        {/* MAGAZIN */}
        <div
          ref={bookRef}
          className="mx-auto"
          aria-label="Ezüstévek lapozható magazin"
        />

        {/* JOBB LAPOZÓ NYÍL */}
        {currentPage < PAGE_IMAGES.length - 1 && (
          <button
            type="button"
            onClick={nextPage}
            aria-label="Következő oldal"
            className={
              fullscreen
                ? "absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-[34px] leading-none text-white shadow-lg transition hover:bg-black/55"
                : "absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#173b35] text-[32px] leading-none text-white shadow-lg transition hover:scale-105 hover:bg-[#102e2a]"
            }
          >
            ›
          </button>
        )}
      </div>

      <div
        className={
          fullscreen
            ? "flex shrink-0 flex-wrap items-center justify-center gap-4 border-t border-white/10 px-5 py-3 text-[13px] text-white/75"
            : "mt-4 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#75695e]"
        }
      >
        <span>
          {currentPage + 1} / {PAGE_IMAGES.length}
        </span>

        <span>•</span>

        <span>Az oldal széle egérrel is húzható</span>

        {!fullscreen && (
          <>
            <span>•</span>

            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="font-semibold text-[#173b35] underline underline-offset-4 hover:text-[#a16b2d]"
            >
              Nagyítás / teljes képernyő
            </button>
          </>
        )}

        <span>•</span>

        <a
          href="/ezustevek/2026-november.pdf"
          target="_blank"
          rel="noreferrer"
          className={
            fullscreen
              ? "underline underline-offset-4 hover:text-white"
              : "text-[#82613c] underline underline-offset-4 hover:text-[#173b35]"
          }
        >
          PDF
        </a>
      </div>
    </div>
  );

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.min.js"
        strategy="afterInteractive"
        onLoad={() => setFlipReady(true)}
      />

      {reader}

      {fullscreen && (
        <div className="fixed inset-0 z-[9999]">
          {reader}
        </div>
      )}
    </>
  );
}

export default function EzustevekPage() {
  return (
    <main className="min-h-screen bg-[#f7f2eb] text-[#24312e]">

      {/* EZÜSTÉVEK FEJLÉC */}
      <header className="bg-black">
        <div className="mx-auto flex max-w-[1380px] items-center px-5 py-3 md:px-8">
          <div
            className="leading-none"
            style={{
              fontFamily:
                '"Palatino Linotype", Palatino, "Book Antiqua", Garamond, Georgia, serif',
              fontSize: "clamp(48px, 5.5vw, 72px)",
              fontStyle: "italic",
              fontWeight: 700,
              letterSpacing: "-0.055em",
            }}
          >
            <span style={{ color: "#2f7568" }}>Ezüst</span>
            <span style={{ color: "#d28a3a" }}>évek</span>
          </div>
        </div>
      </header>

      {/* LAPOZHATÓ MAGAZIN + SZIPORKA */}
      <section className="mx-auto max-w-[1380px] px-5 py-9 md:px-8 lg:py-12">
        <div className="grid items-start gap-9 lg:grid-cols-[1.45fr_0.55fr] lg:gap-10">

          <div className="min-w-0">
            <MagazineReader />
          </div>

          <div className="flex justify-center lg:sticky lg:top-6">
            <Image
              src="/ezustevek/Őszi olvasás az Ezüstévekkel.png"
              alt="Sziporka az Ezüstévek magazint olvassa"
              width={820}
              height={1100}
              priority
              className="h-auto w-full max-w-[405px] object-contain"
            />
          </div>

        </div>

        {/* ISSN */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#74685c]">
          <span className="font-semibold text-[#173b35]">
            HU ISSN 3141-8589
          </span>
          <span>•</span>
          <span>2026. november</span>
          <span>•</span>
          <span>1. évfolyam • 1. szám</span>
        </div>

        {/* LAPSZÁMOK */}
        <div className="mt-14 border-t border-[#dfd3c5] pt-10">
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
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="group block w-[175px] text-left"
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
                    Lapozható magazin
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* IMPRESSZUM */}
        <div className="mt-14 border-t border-[#dfd3c5] pt-9">
          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a87330]">
                Impresszum
              </p>

              <p className="mt-4 text-[18px] font-semibold text-[#173b35]">
                Ezüstévek
              </p>

              <p className="mt-3 font-bold text-[#173b35]">
                HU ISSN 3141-8589
              </p>
            </div>

            <div className="text-[14px] leading-7 text-[#5d544b]">
              <p>
                <strong className="text-[#173b35]">Kiadó:</strong>{" "}
                Keszthelyi Andrea
              </p>

              <p className="mt-2">
                <strong className="text-[#173b35]">
                  Kiadásért és szerkesztésért felelős:
                </strong>{" "}
                Keszthelyi Andrea
              </p>

              <p className="mt-2">
                <strong className="text-[#173b35]">Web:</strong>{" "}
                keszthelyiconsulting.com
              </p>
            </div>

            <div className="text-[14px] leading-7 text-[#5d544b]">
              <p>
                <strong className="text-[#173b35]">Kiadó címe:</strong>{" "}
                7967 Markóc, Fő utca 35.
              </p>

              <p className="mt-2">
                <strong className="text-[#173b35]">E-mail:</strong>{" "}
                info@keszthelyiconsulting.com
              </p>

              <p className="mt-2">
                <strong className="text-[#173b35]">Megjelenés:</strong>{" "}
                havonta, online
              </p>
            </div>

          </div>

          <p className="mt-7 border-t border-[#dfd3c5] pt-5 text-[13px] leading-6 text-[#766b5f]">
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
