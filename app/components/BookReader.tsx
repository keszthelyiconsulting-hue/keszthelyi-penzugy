"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { samplePages } from "./bookDetails";
import styles from "../konyvek/hideghivasbol-ugyfel/book.module.css";

export default function BookReader() {
  const [page, setPage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const reader = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const current = samplePages[page];

  function turn(delta: number) {
    setPage((value) => Math.max(0, Math.min(samplePages.length - 1, value + delta)));
  }

  useEffect(() => {
    if (viewport.current) {
      viewport.current.scrollTop = 0;
      viewport.current.scrollLeft = 0;
    }
  }, [page]);

  useEffect(() => {
    function updateFullscreen() { setFullscreen(document.fullscreenElement === reader.current); }
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => document.removeEventListener("fullscreenchange", updateFullscreen);
  }, []);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (reader.current?.requestFullscreen) await reader.current.requestFullscreen();
      else setZoomed((value) => !value);
    } catch { setZoomed((value) => !value); }
  }

  return (
    <div ref={reader} className={`${styles.reader} ${fullscreen ? styles.fullscreen : ""}`}>
      <div className={styles.readerToolbar}>
        <label className={styles.pagePicker}>Ugrás a részlethez
          <select value={page} onChange={(event) => setPage(Number(event.target.value))}>
            {samplePages.map((item, index) => <option key={item.src} value={index}>{index + 1}. {item.label}</option>)}
          </select>
        </label>
        <div className={styles.readerTools}>
          <button type="button" onClick={() => setZoomed((value) => !value)} aria-pressed={zoomed}>{zoomed ? "Kicsinyítés" : "Nagyítás"}</button>
          <button type="button" onClick={toggleFullscreen}>{fullscreen ? "Kilépés" : "Teljes képernyő"}</button>
        </div>
      </div>
      <div className={styles.readerStage}>
        <button type="button" className={styles.sideArrow} onClick={() => turn(-1)} disabled={page === 0} aria-label="Előző oldal">←</button>
        <div ref={viewport} className={`${styles.pageViewport} ${zoomed ? styles.zoomed : ""}`} tabIndex={0} role="group" aria-label="Lapozható olvasóminta. Lapozás a bal és jobb nyíllal."
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); turn(event.key === "ArrowRight" ? 1 : -1); }
            if (event.key === "Home") { event.preventDefault(); setPage(0); }
            if (event.key === "End") { event.preventDefault(); setPage(samplePages.length - 1); }
          }}
          onTouchStart={(event) => { touchStart.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }; }}
          onTouchEnd={(event) => {
            if (!touchStart.current || zoomed) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            touchStart.current = null;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) turn(dx < 0 ? 1 : -1);
          }}>
          <Image key={current.src} src={current.src} alt={current.label} width={1049} height={1489} sizes="(max-width: 600px) 100vw, 760px" unoptimized draggable={false} className={styles.sampleImage} />
        </div>
        <button type="button" className={styles.sideArrow} onClick={() => turn(1)} disabled={page === samplePages.length - 1} aria-label="Következő oldal">→</button>
      </div>
      <div className={styles.readerBottom}>
        <button type="button" onClick={() => turn(-1)} disabled={page === 0}>← Előző</button>
        <p aria-live="polite"><strong>{page + 1} / {samplePages.length}</strong><span>{current.label}</span></p>
        <button type="button" onClick={() => turn(1)} disabled={page === samplePages.length - 1}>Következő →</button>
      </div>
      <p className={styles.readerHint}>Olvasóminta: a könyv első 11 oldala és a hátoldala. Telefonon húzással is lapozhat.</p>
    </div>
  );
}
