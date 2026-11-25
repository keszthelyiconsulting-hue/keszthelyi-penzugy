"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";

const COUNT = 42;
const PAGE_IMAGES = Array.from(
  { length: COUNT },
  (_, index) => `/ezustevek/2026-december-pages/${String(index + 1).padStart(2, "0")}.webp`
);
const SPREADS: number[][] = [[0]];
for (let index = 1; index < COUNT; index += 2) {
  SPREADS.push(index + 1 < COUNT ? [index, index + 1] : [index]);
}

type Direction = "next" | "prev";
type Turn = { from: number; to: number; direction: Direction };
const PDF_URL = "/ezustevek/2026-december.pdf";

function DesktopBook() {
  const [spread, setSpread] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const turnRef = useRef(false);

  const go = useCallback((direction: Direction) => {
    if (turnRef.current) return;
    const delta = direction === "next" ? 1 : -1;
    const next = spread + delta;
    if (next < 0 || next >= SPREADS.length) return;
    turnRef.current = true;
    setTurn({ from: spread, to: next, direction });
  }, [spread]);

  const finishTurn = () => {
    if (!turn) return;
    setSpread(turn.to);
    setTurn(null);
    turnRef.current = false;
  };

  useEffect(() => {
    if (!expanded) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowRight") go("next");
      if (event.key === "ArrowLeft") go("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, go]);

  const shown = SPREADS[turn?.to ?? spread];
  const label = shown.map((p) => p + 1).join("–");
  const oldPages = turn ? SPREADS[turn.from] : [];
  const turnPage = turn ? (turn.direction === "next" ? oldPages[oldPages.length - 1] : oldPages[0]) : 0;

  const controls = (dark: boolean) => (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-5 ${dark ? "text-white" : "text-[#173b35]"}`}>
      <button type="button" onClick={() => go("prev")} disabled={spread === 0 || !!turn}
        className="min-h-[44px] rounded-full border border-[#cbb598] bg-white px-5 py-2 font-semibold text-[#173b35] disabled:opacity-35">
        ‹ Előző
      </button>
      <span className="min-w-[92px] text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {label} / {COUNT}
      </span>
      <button type="button" onClick={() => go("next")} disabled={spread === SPREADS.length - 1 || !!turn}
        className="min-h-[44px] rounded-full bg-[#173b35] px-5 py-2 font-semibold text-white disabled:opacity-35">
        Következő ›
      </button>
    </div>
  );

  const book = (large: boolean) => (
    <div className={large ? "min-h-0 flex-1 overflow-auto bg-[#221e1a] p-4" : "w-full"}>
      <div className={large ? "mx-auto w-full max-w-[1250px]" : "mx-auto w-full max-w-[1250px]"}
        style={large ? { width: `${zoom * 100}%` } : undefined}>
        <div className="relative mx-auto aspect-[1.414] w-full overflow-visible rounded-md bg-[#f9f6f1] shadow-[0_18px_45px_rgba(0,0,0,0.23)]"
          style={{ perspective: "1800px" }}>
          <div className="absolute inset-y-0 left-1/2 z-10 w-[3px] -translate-x-1/2 bg-gradient-to-r from-black/5 via-black/20 to-white/60" />
          {shown.length === 1 ? (
            <img src={PAGE_IMAGES[shown[0]]} alt={`Ezüstévek – ${shown[0] + 1}. oldal`}
              className="mx-auto block h-full w-1/2 object-contain" />
          ) : (
            <div className="flex h-full w-full">
              {shown.map((index) => (
                <img key={index} src={PAGE_IMAGES[index]} alt={`Ezüstévek – ${index + 1}. oldal`}
                  className="block h-full w-1/2 object-contain" />
              ))}
            </div>
          )}
          {turn && (
            <div
              key={`${turn.from}-${turn.to}`}
              onAnimationEnd={finishTurn}
              className="pointer-events-none absolute inset-y-0 z-20 w-1/2 overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              style={{
                left: turn.direction === "next" ? "50%" : "0",
                transformOrigin: turn.direction === "next" ? "left center" : "right center",
                backfaceVisibility: "hidden",
                animation: `${turn.direction === "next" ? "ezustevek-page-next" : "ezustevek-page-prev"} 620ms ease-in-out forwards`
              }}>
              <img src={PAGE_IMAGES[turnPage]} alt="" aria-hidden="true" className="h-full w-full object-contain" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="hidden xl:block">
      {book(false)}
      <div className="mt-6">{controls(false)}</div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-sm">
        <button type="button" onClick={() => { setZoom(1); setExpanded(true); }}
          className="font-semibold text-[#173b35] underline underline-offset-4">Nagyítás / teljes képernyő</button>
        <a href={PDF_URL} target="_blank" rel="noreferrer" className="text-[#82613c] underline underline-offset-4">PDF megnyitása</a>
      </div>
      {expanded && (
        <div role="dialog" aria-modal="true" aria-label="Ezüstévek decemberi nagyított magazinolvasó"
          className="fixed inset-0 z-[9999] flex flex-col bg-[#171411] text-white">
          <div className="flex shrink-0 items-center justify-between border-b border-white/20 px-5 py-3">
            <strong>Ezüstévek – 2026. december · {label} / {COUNT}</strong>
            <button type="button" onClick={() => setExpanded(false)} className="rounded-full border border-white/30 px-5 py-2">Bezárás</button>
          </div>
          {book(true)}
          <div className="shrink-0 border-t border-white/20 p-3">
            <div className="mb-3 flex justify-center gap-3">
              <button type="button" onClick={() => setZoom((z) => Math.max(1, z - 0.25))} disabled={zoom === 1}
                className="rounded-full border border-white/30 px-4 py-1 disabled:opacity-30">−</button>
              <span className="w-16 text-center">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
                className="rounded-full border border-white/30 px-4 py-1">+</button>
            </div>
            {controls(true)}
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes ezustevek-page-next {
          0% { transform: rotateY(0deg); filter: brightness(1); }
          50% { filter: brightness(.78); }
          100% { transform: rotateY(-180deg); filter: brightness(1); opacity: 0; }
        }
        @keyframes ezustevek-page-prev {
          0% { transform: rotateY(0deg); filter: brightness(1); }
          50% { filter: brightness(.78); }
          100% { transform: rotateY(180deg); filter: brightness(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function MobileBook() {
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [direction, setDirection] = useState<Direction>("next");
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const changePage = (next: number) => {
    const nextPage = Math.max(0, Math.min(COUNT - 1, next));
    setDirection(nextPage >= page ? "next" : "prev");
    setPage(nextPage);
    setZoom(1);
  };

  useEffect(() => {
    if (!expanded) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowRight") changePage(page + 1);
      if (event.key === "ArrowLeft") changePage(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, page]);

  const startSwipe = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    swipe.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const finishSwipe = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || event.changedTouches.length !== 1 || zoom > 1) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      changePage(page + (dx < 0 ? 1 : -1));
    }
  };

  const controls = () => (
    <div className="flex items-center justify-between gap-3">
      <button type="button" onClick={() => changePage(page - 1)} disabled={page === 0}
        className="min-h-[44px] rounded-full border border-[#cbb598] bg-white px-4 py-2 font-semibold text-[#173b35] disabled:opacity-35">‹ Előző</button>
      <span className="text-sm font-semibold tabular-nums">{page + 1} / {COUNT}</span>
      <button type="button" onClick={() => changePage(page + 1)} disabled={page === COUNT - 1}
        className="min-h-[44px] rounded-full bg-[#173b35] px-4 py-2 font-semibold text-white disabled:opacity-35">Következő ›</button>
    </div>
  );

  return (
    <div className="xl:hidden">
      <div className="rounded-2xl border border-[#dfd2c2] bg-[#e9dfd3] p-2 shadow-lg sm:p-4">
        <div className="mx-auto max-w-[600px] touch-pan-y overflow-hidden" onTouchStart={startSwipe} onTouchEnd={finishSwipe}>
          <img key={page} src={PAGE_IMAGES[page]} alt={`Ezüstévek – ${page + 1}. oldal`}
            className="block h-auto w-full bg-white shadow-sm"
            style={{ animation: `${direction === "next" ? "ezustevek-enter-right" : "ezustevek-enter-left"} 270ms ease-out` }} />
        </div>
        <div className="mt-4">{controls()}</div>
        <label className="mt-4 block text-center text-sm text-[#64594f]" htmlFor="ezustevek-december-page">Ugrás egy oldalra</label>
        <input id="ezustevek-december-page" type="range" min={1} max={COUNT} value={page + 1}
          onChange={(event) => changePage(Number(event.target.value) - 1)}
          className="mt-2 w-full accent-[#173b35]" />
        <button type="button" onClick={() => { setZoom(1); setExpanded(true); }}
          className="mt-4 w-full rounded-full bg-[#173b35] px-4 py-3 font-semibold text-white">Nagyítás és olvasás</button>
        <p className="mt-3 text-center text-xs text-[#64594f]">Lapozz a nyilakkal vagy húzd oldalra a lapot.</p>
      </div>
      {expanded && (
        <div role="dialog" aria-modal="true" aria-label="Nagyított decemberi magazinolvasó"
          className="fixed inset-0 z-[9999] flex flex-col bg-[#171411] text-white">
          <div className="flex shrink-0 items-center justify-between px-4 py-3">
            <strong>Ezüstévek – december · {page + 1} / {COUNT}</strong>
            <button type="button" onClick={() => setExpanded(false)} className="rounded-full border border-white/40 px-4 py-2">Bezárás</button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto overscroll-contain bg-[#25211d]"
            onTouchStart={startSwipe} onTouchEnd={finishSwipe}>
            <img src={PAGE_IMAGES[page]} alt={`Ezüstévek – ${page + 1}. oldal nagyítva`}
              style={{ width: `${zoom * 100}%`, maxWidth: "none" }}
              className="mx-auto block h-auto bg-white" />
          </div>
          <div className="shrink-0 border-t border-white/20 px-3 py-3">
            <div className="mb-3 flex justify-center gap-4">
              <button type="button" onClick={() => setZoom((z) => Math.max(1, z - .5))} disabled={zoom === 1}
                className="min-h-[44px] rounded-full border border-white/40 px-5 disabled:opacity-30">−</button>
              <span className="self-center">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((z) => Math.min(3, z + .5))}
                className="min-h-[44px] rounded-full border border-white/40 px-5">+</button>
            </div>
            {controls()}
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes ezustevek-enter-right {
          0% { opacity: .5; transform: translateX(16px) rotateY(-8deg); }
          100% { opacity: 1; transform: translateX(0) rotateY(0); }
        }
        @keyframes ezustevek-enter-left {
          0% { opacity: .5; transform: translateX(-16px) rotateY(8deg); }
          100% { opacity: 1; transform: translateX(0) rotateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function DecemberReader() {
  return (
    <div className="w-full min-w-0">
      <DesktopBook />
      <MobileBook />
    </div>
  );
}
