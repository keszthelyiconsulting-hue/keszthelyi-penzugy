"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";

function MagazineReader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pdfRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);

  const [ready, setReady] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadPdf() {
    const pdfjsLib = (window as any).pdfjsLib;

    if (!pdfjsLib) return;

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdf = await pdfjsLib
      .getDocument("/ezustevek/2026-november.pdf")
      .promise;

    pdfRef.current = pdf;
    setPageCount(pdf.numPages);
    setReady(true);
  }

  useEffect(() => {
    if (!ready || !pdfRef.current || !canvasRef.current) return;

    let cancelled = false;

    async function renderPage() {
      setLoading(true);

      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {}
        }

        const page = await pdfRef.current.getPage(pageNumber);

        const baseViewport = page.getViewport({ scale: 1 });

        const maxWidth = 540;
        const scale = maxWidth / baseViewport.width;

        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;

        if (!canvas || cancelled) return;

        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const task = page.render({
          canvasContext: context,
          viewport,
        });

        renderTaskRef.current = task;

        await task.promise;
      } catch (error: any) {
        if (error?.name !== "RenderingCancelledException") {
          console.error(error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    renderPage();

    return () => {
      cancelled = true;
    };
  }, [ready, pageNumber]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        strategy="afterInteractive"
        onLoad={loadPdf}
      />

      <div className="w-full">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() =>
              setPageNumber((page) => Math.max(1, page - 1))
            }
            disabled={pageNumber === 1}
            className="rounded-full border border-[#c9b38f] px-5 py-2 text-[14px] font-semibold text-[#173b35] transition hover:bg-[#efe4d4] disabled:cursor-default disabled:opacity-30"
          >
            ← Előző
          </button>

          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#9d6a31]">
              Lapozható magazin
            </p>

            <p className="mt-1 text-[14px] text-[#62574b]">
              {pageNumber} / {pageCount || "–"}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setPageNumber((page) =>
                Math.min(pageCount || page, page + 1)
              )
            }
            disabled={!pageCount || pageNumber === pageCount}
            className="rounded-full bg-[#173b35] px-5 py-2 text-[14px] font-semibold text-white transition hover:bg-[#102d29] disabled:cursor-default disabled:opacity-30"
          >
            Következő →
          </button>
        </div>

        <div className="relative mx-auto flex min-h-[650px] items-center justify-center rounded-[22px] bg-[#ded5c9] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[22px] bg-[#ded5c9]/80 text-[#665b4f]">
              Magazin betöltése…
            </div>
          )}

          <canvas
            ref={canvasRef}
            className="block h-auto max-h-[76vh] max-w-full bg-white shadow-[0_8px_28px_rgba(0,0,0,0.18)]"
          />
        </div>

        <div className="mt-4 text-center">
          <a
            href="/ezustevek/2026-november.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-[#82613c] underline underline-offset-4 hover:text-[#173b35]"
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
                fontSize: "clamp(48px, 5.5vw, 72px)",
                fontStyle: "italic",
                fontWeight: 700,
                letterSpacing: "-0.055em",
              }}
            >
              <span style={{ color: "#2f7568" }}>
                Ezüst
              </span>
              <span style={{ color: "#d28a3a" }}>
                évek
              </span>
            </h1>
          </Link>
        </div>
      </header>

      {/* MAGAZIN + SZIPORKA */}

      <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 lg:py-14">

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

          {/* BAL OLDAL - LAPOZHATÓ MAGAZIN */}

          <div>
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
              className="h-auto w-full max-w-[560px] object-contain"
            />
          </div>

        </div>

        {/* ISSN */}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#74685c]">
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

            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
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
                    Lapozható formátumban
                  </p>

                </div>

              </div>
            </a>

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
