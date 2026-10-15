"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";

function MagazineReader() {
  const bookRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<any>(null);

  const [pdfReady, setPdfReady] = useState(false);
  const [flipReady, setFlipReady] = useState(false);

  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState(
    "A magazin előkészítése…"
  );

  useEffect(() => {
    if (!pdfReady) return;

    let cancelled = false;

    async function buildPages() {
      try {
        const pdfjsLib = (window as any).pdfjsLib;

        if (!pdfjsLib) return;

        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const pdf = await pdfjsLib
          .getDocument("/ezustevek/2026-november.pdf")
          .promise;

        const generatedPages: string[] = [];

        for (
          let pageNumber = 1;
          pageNumber <= pdf.numPages;
          pageNumber++
        ) {
          if (cancelled) return;

          setLoadingText(
            `A magazin előkészítése… ${pageNumber}/${pdf.numPages}`
          );

          const page = await pdf.getPage(pageNumber);

          /*
            Nagyobb renderelési méret:
            ettől lesz sokkal tisztább a szöveg.
          */
          const viewport = page.getViewport({
            scale: 2.5,
          });

          const canvas = document.createElement("canvas");

          const context = canvas.getContext("2d", {
            alpha: false,
          });

          if (!context) continue;

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);

          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";

          await page.render({
            canvasContext: context,
            viewport,
            background: "#ffffff",
          }).promise;

          /*
            PNG, nem JPEG.
            A betűk és vékony vonalak így sokkal élesebbek.
          */
          generatedPages.push(
            canvas.toDataURL("image/png")
          );
        }

        if (!cancelled) {
          setPages(generatedPages);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setLoadingText(
            "A magazin betöltése nem sikerült."
          );
        }
      }
    }

    buildPages();

    return () => {
      cancelled = true;
    };
  }, [pdfReady]);

  useEffect(() => {
    if (
      !flipReady ||
      pages.length === 0 ||
      !bookRef.current
    ) {
      return;
    }

    const St = (window as any).St;

    if (!St?.PageFlip) return;

    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.destroy();
      } catch {}
    }

    const pageFlip = new St.PageFlip(
      bookRef.current,
      {
        /*
          Egyetlen oldal mérete.
          Asztali nézetben ebből kettő lesz egymás mellett.
        */
        width: 335,
        height: 474,

        size: "stretch",

        minWidth: 260,
        maxWidth: 390,

        minHeight: 368,
        maxHeight: 552,

        /*
          FONTOS:
          false = asztali nézetben kétoldalas magazin.
        */
        usePortrait: false,

        /*
          Borító külön jelenik meg.
        */
        showCover: true,

        autoSize: true,

        drawShadow: true,

        maxShadowOpacity: 0.45,

        flippingTime: 950,

        mobileScrollSupport: false,

        startPage: 0,
      }
    );

    pageFlip.loadFromImages(pages);

    pageFlip.on("flip", (event: any) => {
      setCurrentPage(event.data);
    });

    pageFlipRef.current = pageFlip;

    return () => {
      try {
        pageFlip.destroy();
      } catch {}
    };
  }, [flipReady, pages]);

  function previousPage() {
    pageFlipRef.current?.flipPrev();
  }

  function nextPage() {
    pageFlipRef.current?.flipNext();
  }

  const firstPage = currentPage <= 0;

  const lastPage =
    pages.length > 0 &&
    currentPage >= pages.length - 1;

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        strategy="afterInteractive"
        onLoad={() => setPdfReady(true)}
      />

      <Script
        src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.min.js"
        strategy="afterInteractive"
        onLoad={() => setFlipReady(true)}
      />

      <div className="w-full">

        {/* LAPOZHATÓ MAGAZIN */}

        <div className="relative mx-auto flex min-h-[610px] items-center justify-center overflow-visible rounded-[24px] bg-[#e5ddd2] px-9 py-6 shadow-[0_24px_65px_rgba(0,0,0,0.18)]">

          {loading && (
            <div className="absolute inset-0 z-40 flex items-center justify-center rounded-[24px] bg-[#e5ddd2] px-8 text-center text-[15px] font-medium text-[#665b4f]">
              {loadingText}
            </div>
          )}

          {/* BAL NYÍL */}

          {!firstPage && !loading && (
            <button
              type="button"
              onClick={previousPage}
              aria-label="Előző oldal"
              className="
                absolute
                left-2
                top-1/2
                z-30
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#c4ae8b]
                bg-[#fffaf2]/95
                text-[30px]
                font-light
                leading-none
                text-[#173b35]
                shadow-md
                transition
                hover:scale-110
                hover:bg-white
              "
            >
              ‹
            </button>
          )}

          {/* JOBB NYÍL */}

          {!lastPage && !loading && (
            <button
              type="button"
              onClick={nextPage}
              aria-label="Következő oldal"
              className="
                absolute
                right-2
                top-1/2
                z-30
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#c4ae8b]
                bg-[#173b35]
                text-[30px]
                font-light
                leading-none
                text-white
                shadow-md
                transition
                hover:scale-110
                hover:bg-[#102e2a]
              "
            >
              ›
            </button>
          )}

          {/* MAGAZIN */}

          <div
            ref={bookRef}
            className="mx-auto"
          />

        </div>

        {/* ALSÓ INFORMÁCIÓ */}

        <div className="mt-4 flex flex-col items-center gap-1">

          <p className="text-[13px] font-semibold text-[#8d6739]">
            Lapozható magazin
          </p>

          <p className="text-[12px] text-[#766b5f]">
            {pages.length
              ? `${currentPage + 1} / ${pages.length}`
              : ""}
          </p>

          <p className="mt-1 text-[12px] text-[#8c8176]">
            A lap szélét megfogva is lapozható.
          </p>

          <a
            href="/ezustevek/2026-november.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-[12px] text-[#82613c] underline underline-offset-4 hover:text-[#173b35]"
          >
            PDF megnyitása külön lapon
          </a>

        </div>

      </div>
    </>
  );
}

export default function EzustevekPage() {
  return (
    <main className="min-h-screen bg-[#f7f2eb] text-[#24312e]">

      {/* EZÜSTÉVEK FEJLÉC */}

      <header className="bg-black">
        <div className="mx-auto flex max-w-[1280px] items-center px-5 py-3 md:px-8">

          <Link
            href="/ezustevek"
            aria-label="Ezüstévek"
            className="inline-block"
          >
            <h1
              className="leading-none"
              style={{
                fontFamily:
                  '"Palatino Linotype", Palatino, "Book Antiqua", Garamond, Georgia, serif',
                fontSize:
                  "clamp(48px, 5.5vw, 72px)",
                fontStyle: "italic",
                fontWeight: 700,
                letterSpacing: "-0.055em",
              }}
            >
              <span
                style={{
                  color: "#2f7568",
                }}
              >
                Ezüst
              </span>

              <span
                style={{
                  color: "#d28a3a",
                }}
              >
                évek
              </span>
            </h1>
          </Link>

        </div>
      </header>

      {/* MAGAZIN + SZIPORKA */}

      <section className="mx-auto max-w-[1380px] px-5 py-10 md:px-8 lg:py-14">

        <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">

          {/* BAL OLDAL - LAPOZHATÓ MAGAZIN */}

          <div className="min-w-0">
            <MagazineReader />
          </div>

          {/* JOBB OLDAL - SZIPORKA */}

          <div className="flex justify-center lg:sticky lg:top-8">

            <Image
              src="/ezustevek/Őszi olvasás az Ezüstévekkel.png"
              alt="Sziporka az Ezüstévek magazint olvassa"
              width={820}
              height={1100}
              priority
              className="h-auto w-full max-w-[430px] object-contain"
            />

          </div>

        </div>

        {/* ISSN */}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#74685c]">

          <span className="font-semibold text-[#173b35]">
            HU ISSN 3141-8589
          </span>

          <span>•</span>

          <span>
            2026. november
          </span>

          <span>•</span>

          <span>
            1. évfolyam • 1. szám
          </span>

        </div>

        {/* LAPSZÁMOK */}

        <div className="mt-14 border-t border-[#dfd3c5] pt-10">

          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a87330]">
            Archívum
          </p>

          <h2
            className="mt-2 text-[32px] font-normal text-[#173b35]"
            style={{
              fontFamily:
                'Georgia, "Times New Roman", serif',
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
                <strong className="text-[#173b35]">
                  Kiadó:
                </strong>{" "}
                Keszthelyi Andrea
              </p>

              <p className="mt-2">
                <strong className="text-[#173b35]">
                  Kiadásért és szerkesztésért felelős:
                </strong>{" "}
                Keszthelyi Andrea
              </p>

              <p className="mt-2">
                <strong className="text-[#173b35]">
                  Web:
                </strong>{" "}
                keszthelyiconsulting.com
              </p>

            </div>

            <div className="text-[14px] leading-7 text-[#5d544b]">

              <p>
                <strong className="text-[#173b35]">
                  Kiadó címe:
                </strong>{" "}
                7967 Markóc, Fő utca 35.
              </p>

              <p className="mt-2">
                <strong className="text-[#173b35]">
                  E-mail:
                </strong>{" "}
                info@keszthelyiconsulting.com
              </p>

              <p className="mt-2">
                <strong className="text-[#173b35]">
                  Megjelenés:
                </strong>{" "}
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
