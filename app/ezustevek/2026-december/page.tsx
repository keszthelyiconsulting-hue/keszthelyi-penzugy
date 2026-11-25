import Link from "next/link";
import DecemberReader from "../DecemberReader";

export const metadata = {
  title: "Ezüstévek – 2026. december | Lapozható magazin",
  description: "Az Ezüstévek 2026. decemberi, 42 oldalas, ünnepi magazinja és szilveszteri különkiadása. Online, ingyenesen lapozható.",
};

export default function DecemberMagazinePage() {
  return (
    <main className="min-h-screen bg-[#f7f2eb] text-[#24312e]">
      <header className="bg-[#171411] px-4 py-5 text-white">
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-4">
          <Link href="/ezustevek" className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:bg-white/10">
            ‹ Ezüstévek főoldal
          </Link>
          <div className="text-center">
            <p className="font-serif text-3xl font-bold tracking-wide">EZÜSTÉVEK</p>
            <p className="text-sm italic text-[#e4c58a]">Aktív évek. Teljes élet.</p>
          </div>
          <span className="text-sm text-[#e4c58a]">2026. december · 2. szám</span>
        </div>
      </header>
      <section className="mx-auto max-w-[1360px] px-3 py-8 sm:px-6">
        <div className="mb-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a87330]">Ingyenes online magazin</p>
          <h1 className="mt-2 font-serif text-3xl text-[#6b1428] sm:text-4xl">Ezüstévek – 2026. december</h1>
          <p className="mt-3 text-sm text-[#64594f]">42 oldal · decemberi ünnepi szám · szilveszteri különkiadással</p>
        </div>
        <DecemberReader />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link href="/ezustevek" className="font-semibold text-[#173b35] underline underline-offset-4">Összes lapszám</Link>
          <a href="/ezustevek/2026-december.pdf" target="_blank" rel="noreferrer" className="font-semibold text-[#82613c] underline underline-offset-4">
            PDF letöltése
          </a>
        </div>
      </section>
    </main>
  );
}
