"use client";

import Link from "next/link";
import { useState } from "react";
export default function SearchAndBanner() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  return (
    <section className="bg-black py-12">
      <div className="mx-auto max-w-7xl px-8">

        <div className="grid gap-8 lg:grid-cols-[7fr_3fr]">

          {/* OTTHON START */}

          <Link
  href="/otthonstart"
  className="h-full block overflow-hidden rounded-[32px] border border-amber-500/20"
>
          
           <img
  src="/otthonstart.jpg"
  alt="Otthon Start"
  className="h-full w-full object-cover"
/>
          </Link>

          {/* KERESŐ */}

          <div className="rounded-[32px] border border-amber-500/20 bg-zinc-950 p-8">

  <h2
    className="mb-6 text-3xl font-light text-white"
    style={{ fontFamily: "Georgia, serif" }}
  >
    Ingatlankereső
  </h2>

  <div className="grid gap-4">

    <select className="rounded-2xl border border-white/10 bg-black p-4 text-white">
  <option>Eladó vagy kiadó</option>
  <option>Eladó</option>
  <option>Kiadó</option>
</select>

<input
  type="text"
  placeholder="Város"
  className="rounded-2xl border border-white/10 bg-black p-4 text-white"
/>

<select className="rounded-2xl border border-white/10 bg-black p-4 text-white">
  <option>Ár</option>
  <option>50 M Ft alatt</option>
  <option>100 M Ft alatt</option>
  <option>200 M Ft alatt</option>
  <option>200 M Ft felett</option>
</select>

<button
  className="
  rounded-2xl
  border
  border-[#C2A56A]
  bg-transparent
  p-4
  text-[#C2A56A]
  font-medium
  transition
  hover:bg-[#C2A56A]
  hover:text-black
"
>
  Keresés
</button>

<div className="text-center pt-2">
  <button
  onClick={() => setShowAdvanced(!showAdvanced)}
  className="text-sm text-zinc-400 hover:text-[#C2A56A] transition"
>
  {showAdvanced ? "▲ Részletes keresés bezárása" : "▼ Részletes keresés"}
</button>
{showAdvanced && (
  <div className="mt-4 grid gap-4">

    <select className="rounded-2xl border border-white/10 bg-black p-4 text-white">
      <option>Ingatlan típusa</option>
      <option>Ház</option>
      <option>Lakás</option>
      <option>Telek</option>
      <option>Nyaraló</option>
      <option>Garázs</option>
      <option>Iroda</option>
      <option>Üzlethelyiség</option>
    </select>

    <input
      type="number"
      placeholder="Minimum m²"
      className="rounded-2xl border border-white/10 bg-black p-4 text-white"
    />

    <select className="rounded-2xl border border-white/10 bg-black p-4 text-white">
      <option>Szobák száma</option>
      <option>1+</option>
      <option>2+</option>
      <option>3+</option>
      <option>4+</option>
      <option>5+</option>
    </select>

    <label className="flex items-center gap-3 text-white">
      <input type="checkbox" />
      Erkély
    </label>

    <label className="flex items-center gap-3 text-white">
      <input type="checkbox" />
      Garázs
    </label>

    <label className="flex items-center gap-3 text-white">
      <input type="checkbox" />
      Kert
    </label>

  </div>
)}
</div>
  </div>

          </div>

        </div>

      </div>

    </section>
  );
}