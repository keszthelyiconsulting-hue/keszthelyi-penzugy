"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../supabase";

export default function Hero() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    const titleRow = data?.find(
      (item: any) =>
        item.section === "hero" &&
        item.title === "title"
    );

    const subtitleRow = data?.find(
      (item: any) =>
        item.section === "hero" &&
        item.title === "subtitle"
    );

    setHeroTitle(titleRow?.content || "");
    setHeroSubtitle(subtitleRow?.content || "");
  };

  return (
    <section
      className="relative min-h-[75vh] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/35"></div>

      <header className="relative z-20 flex items-center justify-between px-12 py-8 border-b border-white/10">

        <nav className="hidden lg:flex items-center gap-10 text-sm tracking-[2px] text-white uppercase">
          <Link
            href="/"
            className="hover:text-[#C2A56A] font-semibold transition"
          >
            Kezdőlap
          </Link>

          <Link
            href="/ingatlanok"
            className="hover:text-[#C2A56A] font-semibold transition"
          >
            Ingatlanok
          </Link>

          <Link
            href="/szolgaltatasok"
            className="hover:text-[#C2A56A] font-semibold transition"
          >
            Szolgáltatások
          </Link>
        </nav>

        <div className="absolute top-1 left-1/2 z-20 flex -translate-x-1/2">
          <img
            src="/logo-dark.png"
            alt="Keszthelyi Ingatlan"
            className="w-[400px] opacity-95 drop-shadow-[0_0_35px_rgba(212,175,55,0.35)]"
          />
        </div>

        <div className="flex items-center gap-10">
          <nav className="hidden lg:flex items-center gap-10 text-sm tracking-[2px] text-white uppercase">
            <Link
              href="/rolunk"
              className="hover:text-[#C2A56A] font-semibold transition"
            >
              Rólunk
            </Link>

            <Link
              href="/kapcsolat"
              className="hover:text-[#C2A56A] font-semibold transition"
            >
              Kapcsolat
            </Link>
          </nav>

          <Link
            href="tel:+36303590002"
            className="rounded-full border border-amber-500 px-6 py-3 text-[#C2A56A] font-semibold transition hover:bg-amber-500 hover:text-black"
          >
            +36 30 359 0002
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-4">

        <h1
          className="
            text-white
            text-3xl
            md:text-4xl
            lg:text-5xl
            leading-tight
            tracking-wide
          "
          style={{
            fontFamily: "Georgia, serif",
          }}
        >
          {heroTitle}
        </h1>

        <p className="mt-8 text-xl text-gray-300 max-w-3xl leading-relaxed">
          {heroSubtitle}
        </p>

      </div>
    </section>
  );
}