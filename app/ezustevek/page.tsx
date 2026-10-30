"use client";

import Link from "next/link";
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
    const element = bookRef.current;
    const pageWidth = window.innerWidth < 900 ? 320 : 520;
    const flip = new St.PageFlip(element, {
      width: pageWidth,
      height: Math.round(pageWidth * 1.414),
      size: "stretch",
      minWidth: 260,
      maxWidth: 590,
      minHeight: 368,
      maxHeight: 835,
      showCover: true,
      usePortrait: false,
      autoSize: true,
      drawShadow: true,
      maxShadowOpacity: 0.35,
      flippingTime: 900,
      mobileScrollSupport: false,
      startPage: currentPage,
    });
    flip.loadFromImages(PAGE_IMAGES);
    flip.on("flip", (event: any) => setCurrentPage(event.data));
    pageFlipRef.current = flip;
    return () => {
      if (pageFlipRef.current === flip) pageFlipRef.current = null;
      try { flip.destroy(); } catch {}
    };
  }, [flipReady, bookKey]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setBookKey((key) => key + 1), 200);
    };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(timeout); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
      if (event.key === "ArrowRight") setCurrentPage((page) => Math.min(PAGE_IMAGES.length - 1, page + 1));
      if (event.key === "ArrowLeft") setCurrentPage((page) => Math.max(0, page - 1));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen]);

  const closeFullscreen = () => {
    setFullscreen(false);
    try { pageFlipRef.current?.flip(currentPage); } catch {}
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.min.js"
        strategy="afterInteractive"
        onReady={() => setFlipReady(true)}
      />
      <div className="relative w-full">
        <div className="relative flex min-h-[650px] items-center justify-center overflow-hidden rounded-[24px] bg-[#e4dbcf] px-14 py-5 shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
          {currentPage > 0 && (
            <button type="button" onClick={() => pageFlipRef.current?.flipPrev()} aria-label="Előző oldal" className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c7b18e] bg-[#fffaf2]/95 text-[32px] leading-none text-[#173b35] shadow-lg">‹</button>
          )}
          <div ref={bookRef} className="mx-auto" aria-label="Ezüstévek lapozható magazin" />
          {currentPage < PAGE_IMAGES.length - 1 && (
            <button type="button" onClick={() => pageFlipRef.current?.flipNext()} aria-label="Következő oldal" className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#173b35] text-[32px] leading-none text-white shadow-lg">›</button>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#75695e]">
          <span>{currentPage + 1} / {PAGE_IMAGES.length}</span>
          <span>•</span>
          <span>Az oldal széle egérrel is húzható</span>
          <span>•</span>
          <button type="button" onClick={() => setFullscreen(true)} className="font-semibold text-[#173b35] underline underline-offset-4 hover:text-[#a16b2d]">Nagyítás / teljes képernyő</button>
          <span>•</span>
          <a href="/ezustevek/2026-november.pdf" target="_blank" rel="noreferrer" className="text-[#82613c] underline underline-offset-4 hover:text-[#173b35]">PDF</a>
        </div>
      </div>
      {fullscreen && (
        <div role="dialog" aria-modal="true" aria-label="Ezüstévek nagyított olvasó" className="fixed inset-0 z-[9999] flex flex-col bg-[#171411]">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3 text-white">
            <div><p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d4ad71]">Ezüstévek</p><p className="mt-1 text-[14px] text-white/70">2026. november</p></div>
            <button type="button" onClick={closeFullscreen} className="rounded-full border border-white/20 px-5 py-2 text-[14px] font-semibold text-white hover:bg-white/10">Bezárás</button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 py-3">
            {currentPage > 0 && <button type="button" onClick={() => setCurrentPage((page) => Math.max(0, page - 1))} aria-label="Előző oldal" className="absolute left-2 top-1/2 z-30 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[36px] text-white">‹</button>}
            <img src={PAGE_IMAGES[currentPage]} alt={`Ezüstévek – ${currentPage + 1}. oldal`} className="block max-h-full max-w-full object-contain shadow-2xl" style={{height: "100%", width: "auto"}} />
            {currentPage < PAGE_IMAGES.length - 1 && <button type="button" onClick={() => setCurrentPage((page) => Math.min(PAGE_IMAGES.length - 1, page + 1))} aria-label="Következő oldal" className="absolute right-2 top-1/2 z-30 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[36px] text-white">›</button>}
          </div>
          <div className="flex shrink-0 items-center justify-center gap-5 border-t border-white/10 px-4 py-3 text-[13px] text-white/75">
            <span>{currentPage + 1} / {PAGE_IMAGES.length}</span>
            <span>•</span><span>Lapozás: nyilak vagy ← → billentyűk</span>
            <span>•</span><a href="/ezustevek/2026-november.pdf" target="_blank" rel="noreferrer" className="underline">PDF</a>
          </div>
        </div>
      )}
    </>
  );
}

export default function EzustevekPage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

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

         

          <div aria-hidden="true" />
        </div>
      </header>

      {/* LAPOZHATÓ MAGAZIN + SZIPORKA */}
      <section className="mx-auto max-w-[1380px] px-5 py-9 md:px-8 lg:py-12">
        {/* SZIPORKA FENT, A MAGAZINNAK TELJES SZÉLESSÉG */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <p className="text-center text-[14px] font-semibold uppercase tracking-[0.15em] text-[#a87330]">Lapozz bele az Ezüstévekbe!</p>
          <div className="flex justify-center">
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
        </div>

        <div className="w-full min-w-0">
          <MagazineReader />
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
