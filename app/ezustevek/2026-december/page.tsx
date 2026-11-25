"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PDF_URL = "/ezustevek/2026-december.pdf";
const TOTAL_PAGES = 42;

export default function EzustevekDecember2026Page() {
  const [page, setPage] = useState(1);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(PDF_URL, { method: "HEAD", cache: "no-store", signal: controller.signal })
      .then((response) => {
        const type = response.headers.get("content-type")?.toLowerCase() ?? "";
        setAvailable(response.ok && type.includes("pdf"));
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setAvailable(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowRight") setPage((old) => Math.min(TOTAL_PAGES, old + 1));
      if (event.key === "ArrowLeft") setPage((old) => Math.max(1, old - 1));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = priorOverflow;
    };
  }, [expanded]);

  const changePage = (value: number) => {
    if (!Number.isFinite(value)) return;
    setPage(Math.max(1, Math.min(TOTAL_PAGES, Math.round(value))));
  };

  const pdfSource = `${PDF_URL}#page=${page}&view=FitH&toolbar=1&navpanes=0`;

  const controls = (dark: boolean) => (
    <div className={`flex flex-wrap items-center justify-between gap-3 ${dark ? "text-white" : "text-[#24312e]"}`}>
      <button
        type="button"
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
        className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-semibold disabled:opacity-35 ${dark ? "border-white/40" : "border-[#c5b29e] bg-white"}`}
      >
        ‹ Előző oldal
      </button>
      <label className="flex items-center gap-2 text-sm font-medium">
        <span>Oldal:</span>
        <input
          type="number"
          min={1}
          max={TOTAL_PAGES}
          value={page}
          onChange={(event) => changePage(Number(event.target.value))}
          aria-label="Ugrás az adott oldalra"
          className="w-[66px] rounded-md border border-[#c5b29e] bg-white px-2 py-2 text-center font-semibold text-[#173b35]"
        />
        <span>/ {TOTAL_PAGES}</span>
      </label>
      <button
        type="button"
        onClick={() => changePage(page + 1)}
        disabled={page === TOTAL_PAGES}
        className="min-h-[44px] rounded-full bg-[#173b35] px-4 py-2 text-sm font-semibold text-white disabled:opacity-35"
      >
        Következő oldal ›
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f4ef] text-[#24312e]">
      <header className="border-b border-[#e2d6c9] bg-[#171411] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-7">
          <Link href="/ezustevek" className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10">
            ‹ Ezüstévek – lapszámok
          </Link>
          <div className="text-center">
            <p className="font-serif text-2xl font-semibold tracking-wide">EZÜSTÉVEK</p>
            <p className="text-sm italic text-[#e6c895]">Aktív évek. Teljes élet.</p>
          </div>
          <span className="hidden text-sm text-[#e6c895] sm:block">2026. december · 2. szám</span>
        </div>
      </header>

      <section className="mx-auto max-w-[1200px] px-3 py-7 sm:px-7">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a5d23]">Ingyenes online magazin</p>
          <h1 className="mt-2 font-serif text-3xl text-[#6b1428] sm:text-4xl">
            Ezüstévek – 2026. december
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#64594f]">
            42 oldal · ünnepi decemberi szám · szilveszteri–újévi különkiadással
          </p>
        </div>

        {available === null ? (
          <p className="rounded-xl bg-white p-6 text-center text-[#64594f]" role="status">
            A magazinolvasó betöltése…
          </p>
        ) : available === false ? (
          <div className="mx-auto max-w-[670px] rounded-2xl border border-[#dfd2c2] bg-white p-7 text-center shadow-sm" role="status">
            <p className="text-lg font-semibold text-[#6b1428]">A decemberi lapszám feltöltése még folyamatban van.</p>
            <p className="mt-3 text-sm leading-6 text-[#64594f]">
              A 2026. novemberi szám továbbra is olvasható az Ezüstévek oldalán.
            </p>
            <Link href="/ezustevek" className="mt-5 inline-flex rounded-full bg-[#173b35] px-6 py-3 font-semibold text-white">
              Vissza a magazinhoz
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-xl border border-[#dfd2c2] bg-white p-3 shadow-sm sm:p-4">
              {controls(false)}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#e7ded3] pt-3">
                <p className="text-xs leading-5 text-[#74685c]">
                  Lapozz a gombokkal, vagy add meg az oldalszámot. A PDF saját eszköztárával nagyíthatsz.
                </p>
                <button type="button" onClick={() => setExpanded(true)}
                  className="rounded-full bg-[#6b1428] px-4 py-2 text-sm font-semibold text-white">
                  Nagyított olvasás
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#d8caba] bg-[#e9dfd3] shadow-[0_20px_55px_rgba(0,0,0,0.12)]">
              <iframe
                key={`reader-${page}`}
                src={pdfSource}
                title={`Ezüstévek 2026. december – ${page}. oldal`}
                className="block h-[68vh] min-h-[540px] w-full sm:h-[82vh]"
              />
            </div>
            <div className="mt-4">{controls(false)}</div>
            <p className="mt-5 text-center text-sm leading-6 text-[#64594f]">
              Telefonon szükség esetén a{" "}
              <a href={PDF_URL} target="_blank" rel="noreferrer" className="font-semibold text-[#6b1428] underline underline-offset-4">
                teljes magazint külön olvasóablakban
              </a>{" "}
              is megnyithatod.
            </p>
          </>
        )}
      </section>

      {available && expanded && (
        <div role="dialog" aria-modal="true" aria-label="Nagyított magazinolvasó"
          className="fixed inset-0 z-[9999] flex flex-col bg-[#171411] text-white">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/20 px-3 py-2 sm:px-5">
            <p className="text-sm font-semibold">Ezüstévek · 2026. december · {page} / {TOTAL_PAGES}. oldal</p>
            <button type="button" onClick={() => setExpanded(false)} className="min-h-[44px] rounded-full border border-white/40 px-4 py-2 font-semibold">
              Bezárás
            </button>
          </div>
          <iframe
            key={`expanded-${page}`}
            src={pdfSource}
            title={`Ezüstévek nagyított olvasó – ${page}. oldal`}
            className="min-h-0 w-full flex-1 bg-white"
          />
          <div className="shrink-0 border-t border-white/20 px-3 py-3 sm:px-5">
            {controls(true)}
          </div>
        </div>
      )}
    </main>
  );
}
