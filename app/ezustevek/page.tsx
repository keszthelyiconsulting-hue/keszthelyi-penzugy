"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";

const PAGE_IMAGES = Array.from(
  { length: 34 },
  (_, index) => `/ezustevek/pages/${String(index + 1).padStart(2, "0")}.webp`
);


/**
 * Reliable desktop spread reader. Uses the existing WebP pages directly,
 * so a blocked external page-flip script cannot make the book disappear.
 */
function MagazineReader() {
  const [spread, setSpread] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);

  const pages = spread === 0 ? [0] :
    [spread, spread + 1].filter((index) => index < PAGE_IMAGES.length);
  const label = spread === 0 ? "1" :
    String(spread + 1) + (pages.length > 1 ? "–" + (spread + 2) : "");

  const previous = () => {
    setSpread((s) => s <= 1 ? 0 : s - 2);
    setZoom(1);
  };
  const next = () => {
    setSpread((s) => Math.min(PAGE_IMAGES.length - 1, s === 0 ? 1 : s + 2));
    setZoom(1);
  };

  useEffect(() => {
    if (!expanded) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  const spreadImages = (large: boolean) => (
    <div className={large ? "mx-auto flex items-start justify-center" : "mx-auto flex w-full max-w-[1100px] items-center justify-center"}
      style={large ? { width: (zoom * 100) + "%", minWidth: "100%" } : undefined}>
      {pages.map((index) => (
        <img
          key={index}
          src={PAGE_IMAGES[index]}
          alt={`Ezüstévek – ${index + 1}. oldal`}
          className={pages.length === 1 ? "block h-auto w-full max-w-[520px] bg-white shadow-md" : "block h-auto w-1/2 bg-white shadow-md"}
          decoding="async"
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="w-full">
        <div className="relative flex min-h-[650px] items-center justify-center overflow-hidden rounded-[24px] bg-[#e4dbcf] px-14 py-5 shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
          {spreadImages(false)}
          <button type="button" onClick={previous} disabled={spread === 0}
            aria-label="Előző oldalak"
            className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#c7b18e] bg-[#fffaf2] text-[30px] text-[#173b35] shadow-lg disabled:opacity-30">‹</button>
          <button type="button" onClick={next} disabled={spread >= PAGE_IMAGES.length - 1}
            aria-label="Következő oldalak"
            className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#173b35] text-[30px] text-white shadow-lg disabled:opacity-30">›</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#75695e]">
          <span aria-live="polite">{label} / {PAGE_IMAGES.length}</span>
          <span>•</span>
          <button type="button" onClick={() => { setZoom(1); setExpanded(true); }}
            className="font-semibold text-[#173b35] underline underline-offset-4">Nagyítás / teljes képernyő</button>
          <span>•</span>
          <a href="/ezustevek/2026-november.pdf" target="_blank" rel="noreferrer"
            className="text-[#82613c] underline underline-offset-4">PDF (opcionális)</a>
        </div>
      </div>
      {expanded && (
        <div role="dialog" aria-modal="true" aria-label="Ezüstévek nagyított olvasó"
          className="fixed inset-0 z-[9999] flex flex-col bg-[#171411] text-white">
          <div className="flex shrink-0 items-center justify-between border-b border-white/20 px-5 py-3">
            <p>Ezüstévek – 2026. november · {label} / {PAGE_IMAGES.length}</p>
            <button type="button" onClick={() => setExpanded(false)}
              className="rounded-full border border-white/30 px-5 py-2 font-semibold">Bezárás</button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            {spreadImages(true)}
          </div>
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/20 px-4 py-3">
            <button type="button" onClick={previous} disabled={spread === 0}
              className="rounded-full border border-white/30 px-4 py-2 disabled:opacity-30">‹ Előző</button>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setZoom((z) => Math.max(1,z-0.5))} disabled={zoom===1}
                aria-label="Kicsinyítés" className="rounded-full border border-white/30 px-4 py-2 disabled:opacity-30">−</button>
              <span>{Math.round(zoom*100)}%</span>
              <button type="button" onClick={() => setZoom((z) => Math.min(3,z+0.5))} disabled={zoom===3}
                aria-label="Nagyítás" className="rounded-full border border-white/30 px-4 py-2 disabled:opacity-30">+</button>
            </div>
            <button type="button" onClick={next} disabled={spread >= PAGE_IMAGES.length - 1}
              className="rounded-full bg-[#d5a54e] px-4 py-2 font-semibold text-[#171411] disabled:opacity-30">Következő ›</button>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Mobile reader intentionally does not depend on the external page-flip library.
 * Only the current WebP page is loaded; readers can swipe, jump pages and zoom
 * without downloading the magazine PDF.
 */
function MobileMagazineReader() {
  const [page, setPage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const changePage = (next: number) => {
    setPage(Math.max(0, Math.min(PAGE_IMAGES.length - 1, next)));
    setZoom(1);
    setImageError(false);
  };

  useEffect(() => {
    if (!zoomOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomOpen(false);
      if (event.key === "ArrowLeft") changePage(page - 1);
      if (event.key === "ArrowRight") changePage(page + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [zoomOpen, page]);

  const startSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    touchStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const endSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      changePage(page + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <div className="xl:hidden">
      <div className="overflow-hidden rounded-[18px] border border-[#d9c9b7] bg-[#e4dbcf] p-2 shadow-[0_12px_36px_rgba(0,0,0,0.13)] sm:p-4">
        <div
          className="relative mx-auto w-full max-w-[600px] touch-pan-y"
          onTouchStart={startSwipe}
          onTouchEnd={endSwipe}
        >
          {imageError ? (
            <div role="alert" className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-5 text-center text-[#173b35]">
              <p>Az oldal képe nem töltődött be.</p>
              <button type="button" onClick={() => { setImageError(false); changePage(page); }} className="rounded-full bg-[#173b35] px-5 py-2 text-white">Újrapróbálás</button>
            </div>
          ) : (
            <img
              key={page}
              src={PAGE_IMAGES[page]}
              alt={"Ezüstévek – " + (page + 1) + ". oldal"}
              onError={() => setImageError(true)}
              className="block h-auto w-full rounded-[5px] bg-white shadow-sm"
              decoding="async"
            />
          )}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => changePage(page - 1)}
            disabled={page === 0}
            aria-label="Előző oldal"
            className="min-h-[44px] rounded-full border border-[#a8977e] bg-white px-4 py-2 font-semibold text-[#173b35] disabled:cursor-not-allowed disabled:opacity-40"
          >‹ Előző</button>
          <span aria-live="polite" className="shrink-0 text-[14px] font-bold tabular-nums text-[#173b35]">{page + 1} / {PAGE_IMAGES.length}</span>
          <button
            type="button"
            onClick={() => changePage(page + 1)}
            disabled={page === PAGE_IMAGES.length - 1}
            aria-label="Következő oldal"
            className="min-h-[44px] rounded-full bg-[#173b35] px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >Következő ›</button>
        </div>
        <label htmlFor="ezustevek-mobile-page" className="mt-4 block text-center text-[13px] text-[#64594f]">Ugrás egy másik oldalra</label>
        <input
          id="ezustevek-mobile-page"
          type="range"
          min={1}
          max={PAGE_IMAGES.length}
          value={page + 1}
          onChange={(event) => changePage(Number(event.target.value) - 1)}
          className="mt-2 w-full accent-[#173b35]"
          aria-label="Magazin oldalszáma"
        />
        <button
          type="button"
          onClick={() => { setZoom(1); setZoomOpen(true); }}
          className="mt-4 min-h-[46px] w-full rounded-full bg-[#173b35] px-5 py-3 text-[15px] font-bold text-white"
        >Nagyítás és olvasás</button>
        <p className="mt-3 text-center text-[13px] leading-5 text-[#64594f]">
          Lapozz a nyilakkal vagy húzd oldalra az oldalt. Az olvasáshoz nagyíts rá.
        </p>
      </div>

      {zoomOpen && (
        <div role="dialog" aria-modal="true" aria-label="Ezüstévek nagyított mobilos olvasó" className="fixed inset-0 z-[9999] flex flex-col bg-[#171411] text-white">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/20 px-3 py-3">
            <div>
              <p className="font-semibold">Ezüstévek – 2026. november</p>
              <p className="text-[12px] text-white/70">{page + 1} / {PAGE_IMAGES.length}. oldal</p>
            </div>
            <button type="button" onClick={() => setZoomOpen(false)} className="min-h-[44px] rounded-full border border-white/30 px-4 py-2 font-semibold">Bezárás</button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto overscroll-contain bg-[#25211d]">
            <div className="mx-auto" style={{ width: (zoom * 100) + "%" }}>
              <img
                src={PAGE_IMAGES[page]}
                alt={"Ezüstévek – " + (page + 1) + ". oldal nagyítva"}
                className="block h-auto w-full bg-white"
                decoding="async"
              />
            </div>
          </div>
          <div className="shrink-0 border-t border-white/20 bg-[#171411] px-3 py-3">
            <div className="flex items-center justify-center gap-3">
              <button type="button" onClick={() => setZoom(Math.max(1, zoom - 0.5))} disabled={zoom === 1} aria-label="Kicsinyítés" className="min-h-[44px] min-w-[48px] rounded-full border border-white/30 text-[23px] disabled:opacity-40">−</button>
              <span className="w-[60px] text-center text-[14px] tabular-nums">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom(Math.min(3, zoom + 0.5))} disabled={zoom === 3} aria-label="Nagyítás" className="min-h-[44px] min-w-[48px] rounded-full border border-white/30 text-[23px] disabled:opacity-40">+</button>
            </div>
            <div className="mt-3 flex justify-between gap-3">
              <button type="button" onClick={() => changePage(page - 1)} disabled={page === 0} className="min-h-[44px] flex-1 rounded-full border border-white/30 px-3 py-2 disabled:opacity-40">‹ Előző</button>
              <button type="button" onClick={() => changePage(page + 1)} disabled={page === PAGE_IMAGES.length - 1} className="min-h-[44px] flex-1 rounded-full bg-[#d5a54e] px-3 py-2 font-semibold text-[#171411] disabled:opacity-40">Következő ›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EzustevekPage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/ezustevek-latogatas", { method: "POST", cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Nem érhető el a számláló");
        return response.json();
      })
      .then((data: { count?: number }) => {
        if (typeof data.count === "number") setVisitCount(data.count);
      })
      .catch(() => {});
  }, []);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.keszthelyiconsulting.com/ezustevek";

  const shareTitle = "Ezüstévek – 2026. november";
  const shareText = "Lapozd bele az Ezüstévek 2026. novemberi számába!";

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("Link kimásolva ✓");
      window.setTimeout(() => setShareStatus(""), 1800);
    } catch {
      window.prompt("Másold ki ezt a linket:", shareUrl);
    }
  };

  const nativeShare = async () => {
    const nav = navigator as Navigator & {
      share?: (data?: ShareData) => Promise<void>;
    };

    if (typeof nav.share !== "function") {
      await copyShareLink();
      setShareOpen(false);
      return;
    }

    try {
      await nav.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
      setShareOpen(false);
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        await copyShareLink();
      }
    }
  };

  const facebookUrl =
    "https://www.facebook.com/sharer/sharer.php?u=" +
    encodeURIComponent(shareUrl);

  const whatsappUrl =
    "https://wa.me/?text=" +
    encodeURIComponent(`${shareText} ${shareUrl}`);

  const emailUrl =
    "mailto:?subject=" +
    encodeURIComponent(shareTitle) +
    "&body=" +
    encodeURIComponent(`${shareText}\n\n${shareUrl}`);

  return (
    <main className="min-h-screen bg-[#f7f2eb] text-[#24312e]">

      {/* EZÜSTÉVEK FEJLÉC */}
      <header className="bg-black">
        <div className="mx-auto grid max-w-[1380px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-2.5 md:px-8">
          <div className="justify-self-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[14px] font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <span aria-hidden="true">←</span>
              <span>Főmenü</span>
            </Link>
          </div>

          {/* SZÖVEGES EZÜSTÉVEK LOGÓ – NEM KÉP */}
          <div className="justify-self-center text-center" aria-label="Ezüstévek – Aktív évek. Teljes élet.">
            <div
              className="whitespace-nowrap text-[clamp(29px,4.2vw,58px)] font-bold italic leading-[1.05] tracking-[-0.055em]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              <span className="text-[#b9d0b4]">Ezüst</span><span className="text-[#d5a54e]">évek</span>
              <span className="ml-1 inline-block align-top text-[0.45em] not-italic text-[#d5a54e]">❧</span>
            </div>
            <p className="mt-1 text-[clamp(9px,1vw,13px)] font-medium italic tracking-[0.08em] text-[#e3c48b]">
              Aktív évek. Teljes élet.
            </p>
          </div>

          <div aria-hidden="true" />
        </div>
      </header>

      {/* LAPOZHATÓ MAGAZIN + SZIPORKA */}
      <section className="mx-auto max-w-[1380px] px-5 py-9 md:px-8 lg:py-12">
        {/* SZIPORKA BAL OLDALT, BEMUTATKOZÁS JOBB OLDALT */}
        <div className="mb-8">
          <p className="mb-6 text-center text-[14px] font-semibold uppercase tracking-[0.15em] text-[#a87330]">Lapozz bele az Ezüstévekbe!</p>
          <div className="grid items-center gap-7 md:grid-cols-[minmax(0,250px)_minmax(0,1fr)] md:gap-10 lg:gap-14">
            <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-[210px]">
              <Image
                src="/ezustevek/Őszi olvasás az Ezüstévekkel.png"
                alt="Sziporka az Ezüstévek magazint olvassa"
                width={820}
                height={1100}
                priority
                className="h-auto w-full object-contain"
              />

              {/* MEGOSZTÁS – SZIPORKA KÉPÉBE ÁGYAZVA */}
              <div className="absolute bottom-4 right-4 z-20">
                {shareOpen && (
                  <div className="absolute bottom-[58px] right-0 w-[225px] overflow-hidden rounded-[18px] border border-[#d7c19b] bg-[#fffaf3]/98 p-2 shadow-[0_14px_38px_rgba(0,0,0,0.28)] backdrop-blur">
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setShareOpen(false)}
                      className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-semibold text-[#173b35] transition hover:bg-[#efe6d8]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-[18px] font-bold text-white">f</span>
                      Facebook
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setShareOpen(false)}
                      className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-semibold text-[#173b35] transition hover:bg-[#efe6d8]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-[16px] font-bold text-white">W</span>
                      WhatsApp
                    </a>

                    <a
                      href={emailUrl}
                      onClick={() => setShareOpen(false)}
                      className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-semibold text-[#173b35] transition hover:bg-[#efe6d8]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8a6a3f] text-[15px] text-white">✉</span>
                      E-mail
                    </a>

                    <button
                      type="button"
                      onClick={async () => {
                        await copyShareLink();
                        setShareOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left text-[14px] font-semibold text-[#173b35] transition hover:bg-[#efe6d8]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173b35] text-[15px] text-white">⧉</span>
                      Link másolása
                    </button>

                    <button
                      type="button"
                      onClick={nativeShare}
                      className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left text-[14px] font-semibold text-[#173b35] transition hover:bg-[#efe6d8]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c8b18e] bg-white text-[18px] text-[#173b35]">↗</span>
                      További lehetőségek
                    </button>
                  </div>
                )}

                {shareStatus && (
                  <div className="absolute bottom-[58px] right-0 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-[12px] font-medium text-white shadow-lg">
                    {shareStatus}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShareOpen((open) => !open)}
                  aria-label="Megosztási lehetőségek"
                  aria-expanded={shareOpen}
                  className="flex items-center gap-2 rounded-full border border-[#d4ad71] bg-[#173b35]/95 px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_8px_22px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:scale-[1.03] hover:bg-[#102e2a]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.6 10.6 15.4 6.4" />
                    <path d="m8.6 13.4 6.8 4.2" />
                  </svg>

                  <span>Megosztás</span>
                </button>
              </div>
            </div>
            </div>
            <div className="max-w-[760px] text-center md:text-left">
              <h2 className="text-[25px] font-normal leading-tight text-[#173b35] md:text-[32px]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                Az élet minden korban tartogat újdonságokat!
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#4d5a51]">
                Az <strong className="text-[#173b35]">Ezüstévek</strong> ingyenes, online lapozható életmódmagazin, elsősorban az 50 év feletti korosztálynak, de mindenkinek, aki kíváncsi a világra.
              </p>
              <p className="mt-3 text-[15px] leading-7 text-[#4d5a51]">
                Egészség, otthon, pénzügyek, kultúra, érdekes történetek és hasznos tanácsok – mindaz, ami tartalmasabbá teheti a mindennapokat.
              </p>
              <p className="mt-4 text-[17px] font-semibold italic text-[#a87330]">Aktív évek. Teljes élet.</p>
              <p className="mt-2 text-[14px] text-[#64594f]">Olvasd ingyenesen, és oszd meg másokkal is!</p>
            </div>
          </div>
        </div>

        <div className="w-full min-w-0">
          <MobileMagazineReader />
          <div className="hidden xl:block"><MagazineReader /></div>
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

        {/* LÁTOGATOTTSÁG AZ ISSN ALATT */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[14px] text-[#173b35]" aria-live="polite">
          <span aria-hidden="true">◉</span>
          <span>Az Ezüstévek oldalának megnyitásai:</span>
          <strong className="tabular-nums">{visitCount === null ? "—" : visitCount.toLocaleString("hu-HU")}</strong>
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


        {/* OLVASÓI TÁMOGATÁS */}
        <div
          id="tamogatas"
          className="mt-14 overflow-hidden rounded-[28px] border border-[#d9c9b7] bg-[#fffaf3] shadow-[0_18px_45px_rgba(61,45,30,0.08)]"
        >
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#173b35] px-7 py-8 text-white md:px-10 md:py-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#e2bc7e]">
                Olvasói támogatás
              </p>

              <h2
                className="mt-3 text-[32px] font-normal leading-tight md:text-[38px]"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                }}
              >
                Támogasd az Ezüstéveket
              </h2>

              <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-white/85">
                Az Ezüstévek minden lapszáma ingyenesen olvasható. Ha
                értékesnek találod a magazint, önkéntes olvasói támogatásoddal
                hozzájárulhatsz ahhoz, hogy újabb tartalmas, igényes lapszámok
                készülhessenek.
              </p>

              <p className="mt-4 max-w-[560px] text-[14px] leading-6 text-white/70">
                A támogatás összege szabadon választható, és természetesen nem
                feltétele az olvasásnak.
              </p>
            </div>

            <div className="flex flex-col justify-center px-7 py-8 md:px-10 md:py-10">
              <p className="text-[18px] font-semibold text-[#173b35]">
                Banki átutalással azonnal támogathatod
              </p>

              <p className="mt-3 text-[14px] leading-7 text-[#64594f]">
                A támogatás összege szabadon választható. Az átutaláshoz az
                alábbi adatokat használd:
              </p>

              <div className="mt-5 overflow-hidden rounded-[20px] border border-[#d7c19b] bg-white">
                <div className="border-b border-[#eadfce] px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a87330]">
                    Kedvezményezett
                  </p>
                  <p className="mt-1 text-[17px] font-bold text-[#173b35]">
                    Keszthelyi Andrea
                  </p>
                </div>

                <div className="border-b border-[#eadfce] px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a87330]">
                    Bank
                  </p>
                  <p className="mt-1 text-[16px] font-semibold text-[#173b35]">
                    Erste Bank
                  </p>
                </div>

                <div className="border-b border-[#eadfce] px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a87330]">
                    Bankszámlaszám
                  </p>
                  <p className="mt-1 break-all font-mono text-[16px] font-bold tracking-[0.03em] text-[#173b35] md:text-[17px]">
                    11600006-00000000-93954691
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a87330]">
                    Közlemény
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-[#173b35]">
                    Ezüstévek olvasói támogatás
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* HIRDETÉSI LEHETŐSÉGEK */}
        <div id="hirdetes" className="mt-14 border-t border-[#dfd3c5] pt-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a87330]">
            Hirdetési lehetőségek
          </p>

          <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2
                className="text-[32px] font-normal text-[#173b35]"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                }}
              >
                Hirdess az Ezüstévekben
              </h2>

              <p className="mt-4 max-w-[820px] text-[15px] leading-7 text-[#64594f]">
                Az Ezüstévek célzottan szól azokhoz az olvasókhoz, akik számára
                fontos az egészség, a biztonság, az aktív élet, az otthon, az
                utazás, a pénzügyi tudatosság és a minőségi szolgáltatások.
                Lapszámonként korlátozott számú hirdetési helyet biztosítunk,
                hogy a magazin megőrizze igényes, tartalomközpontú jellegét.
              </p>
            </div>

            <a
              href="mailto:info@keszthelyiconsulting.com?subject=Hirdetés%20az%20Ezüstévekben"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#173b35] px-6 py-3 text-[14px] font-bold text-white transition hover:bg-[#102e2a]"
            >
              Hirdetni szeretnék
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "1/4 oldal",
                size: "kb. 90 × 130 mm",
                price: "15 000 Ft",
                place: "Belső oldalak",
              },
              {
                title: "1/2 oldal",
                size: "kb. 190 × 130 mm",
                price: "25 000 Ft",
                place: "Belső oldalak",
              },
              {
                title: "Teljes oldal",
                size: "kb. 190 × 270 mm",
                price: "45 000 Ft",
                place: "Belső oldalak",
              },
              {
                title: "Kiemelt teljes oldal",
                size: "kb. 190 × 270 mm",
                price: "55 000 Ft",
                place: "Az első harmadban",
              },
              {
                title: "Belső hátsó borító",
                size: "teljes oldal",
                price: "65 000 Ft",
                place: "Prémium hely",
              },
              {
                title: "Külső hátlap",
                size: "teljes oldal",
                price: "80 000 Ft",
                place: "Prémium hely",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[20px] border border-[#dccdbd] bg-white p-6 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a87330]">
                  {item.place}
                </p>

                <h3 className="mt-2 text-[20px] font-bold text-[#173b35]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[14px] text-[#71665c]">{item.size}</p>

                <p className="mt-5 text-[24px] font-bold text-[#8f2630]">
                  {item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-5 rounded-[22px] border border-[#dbcab7] bg-[#efe6d8]/65 p-6 md:grid-cols-2 md:p-7">
            <div>
              <p className="text-[16px] font-bold text-[#173b35]">
                Hirdetési helyek a lapszámban
              </p>

              <p className="mt-3 text-[14px] leading-7 text-[#64594f]">
                Egy hirdetési helyet az első harmadban, egyet a középső
                részben, kettőt az utolsó harmadban biztosítunk. Emellett külön
                foglalható a belső hátsó borító és a külső hátlap. A pontos
                oldalszámot mindig a lapszám tartalmi töréspontjaihoz igazítjuk.
              </p>
            </div>

            <div>
              <p className="text-[16px] font-bold text-[#173b35]">
                Hirdetési anyag
              </p>

              <p className="mt-3 text-[14px] leading-7 text-[#64594f]">
                Jó minőségű JPG, PNG vagy PDF formátumot kérünk. Teljes oldalas
                hirdetésnél javasolt legalább
                <strong className="text-[#173b35]"> 2000 × 2800 px</strong>
                felbontás. A végleges elhelyezést a szerkesztőség a lapszám
                tartalmi szerkezetéhez igazíthatja.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[18px] border border-[#d7c19b] bg-[#fffaf3] px-6 py-5 text-[14px] leading-7 text-[#64594f]">
            <strong className="text-[#173b35]">Több megjelenés esetén:</strong>{" "}
            3 alkalomra 10%, 6 alkalomra 15%, 12 alkalomra 20% kedvezményt
            biztosítunk.
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
