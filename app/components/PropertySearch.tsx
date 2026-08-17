"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PropertySearch() {
  const router = useRouter();

  const [listingType, setListingType] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
const [showAdvanced, setShowAdvanced] = useState(false);
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (listingType) params.set("listingType", listingType);
    if (city) params.set("city", city);
    if (propertyType) params.set("propertyType", propertyType);

    if (minSize) params.set("minSize", minSize);
    if (maxSize) params.set("maxSize", maxSize);

    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/kereses?${params.toString()}`);
  };

  return (
    <div className="rounded-[32px] border border-amber-500/20 bg-zinc-950 p-8">
      <h2
        className="mb-6 text-3xl font-light text-white"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Ingatlankereső
      </h2>

      <div className="grid gap-4">

        <select
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black p-4 text-white"
        >
          <option value="">Eladó vagy kiadó</option>
          <option value="sale">Eladó</option>
          <option value="rent">Kiadó</option>
        </select>

        <input
          type="text"
          placeholder="Város"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black p-4 text-white"
        />

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="rounded-2xl border border-white/10 bg-black p-4 text-white"
        >
          <option value="">Ingatlan típusa</option>
          <option value="lakas">Lakás</option>
          <option value="haz">Ház</option>
          <option value="telek">Telek</option>
          <option value="nyaralo">Nyaraló</option>
          <option value="iroda">Iroda</option>
          <option value="uzlethelyiseg">Üzlethelyiség</option>
        </select>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min. m²"
            value={minSize}
            onChange={(e) => setMinSize(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white"
          />

          <input
            type="number"
            placeholder="Max. m²"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min. ár"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white"
          />

          <input
            type="number"
            placeholder="Max. ár"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black p-4 text-white"
          />
        </div>

        <button
          onClick={handleSearch}
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

        <button
  onClick={() => setShowAdvanced(!showAdvanced)}
  className="
    text-sm
    text-zinc-400
    hover:text-[#C2A56A]
    transition
  "
>
  {showAdvanced
    ? "▲ Részletes keresés bezárása"
    : "▼ Részletes keresés"}
</button>
{showAdvanced && (
  <div className="mt-4 grid gap-4 border-t border-white/10 pt-4">

    <div className="grid grid-cols-2 gap-3">
      <input
        type="number"
        placeholder="Min. szobaszám"
        className="rounded-2xl border border-white/10 bg-black p-4 text-white"
      />

      <input
        type="number"
        placeholder="Max. szobaszám"
        className="rounded-2xl border border-white/10 bg-black p-4 text-white"
      />
    </div>

    <div className="grid grid-cols-2 gap-3">
      <input
        type="number"
        placeholder="Min. telekméret"
        className="rounded-2xl border border-white/10 bg-black p-4 text-white"
      />

      <input
        type="number"
        placeholder="Max. telekméret"
        className="rounded-2xl border border-white/10 bg-black p-4 text-white"
      />
    </div>

    <select className="rounded-2xl border border-white/10 bg-black p-4 text-white">
      <option value="">Állapot</option>
      <option value="uj">Új építésű</option>
      <option value="felujitott">Felújított</option>
      <option value="jo">Jó állapotú</option>
      <option value="felujitando">Felújítandó</option>
    </select>

  </div>
)}
      </div>
    </div>
  );
}