"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../supabase";

export default function PropertySlider() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error(error);
      return;
    }

    setProperties(data || []);
  }

  if (properties.length === 0) return null;

  return (
    <section className="overflow-hidden bg-black py-20">

      <div className="mb-10 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#C2A56A]
font-semibold px-4 py-2">
          Keszthelyi Ingatlan
        </p>

        <h2 className="text-5xl font-light text-white">
          Ingatlan ajánlatunk
        </h2>
      </div>

      <div className="flex animate-scroll gap-8 px-8">

        {[...properties, ...properties].map((property, index) => (

          <Link
            key={`${property.id}-${index}`}
            href={`/ingatlan/${property.slug}`}
            className="min-w-[340px] overflow-hidden rounded-[28px] border border-amber-500/20 bg-[#0b0b0b] text-white"
          >

            <div className="relative overflow-hidden">

  <div className="absolute left-4 top-4 z-10 rounded-full bg-amber-500 px-4 py-1 text-xs font-semibold text-black">
    {property.listing_type === "rent"
      ? "KIADÓ"
      : "ELADÓ"}
  </div>
              <img
                src={
                  property.main_image ||
                  property.images?.[0] ||
                  "/placeholder.jpg"
                }
                alt={property.title}
                className="h-[240px] w-full object-cover transition duration-700 hover:scale-110"
              />
            </div>

            <div className="p-6">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm uppercase tracking-widest text-[#C2A56A]
font-semibold px-4 py-2">
                  {property.city}
                </span>

                <span
  className="text-xl font-normal text-[#C2A56A]"
  style={{ fontFamily: "Georgia, serif" }}
>
                  <>
  {property.price
    ? Number(property.price).toLocaleString("hu-HU")
    : "Ár egyeztetés szerint"}

  {property.price && (
    <span className="ml-1 text-sm">
      {property.listing_type === "rent"
        ? "Ft / hó"
        : "Ft"}
    </span>
  )}
</>
                </span>

              </div>

              <h3 className="mb-3 text-2xl font-light">
                {property.title}
              </h3>

              <div className="flex flex-wrap gap-3 text-sm text-zinc-300">

                <span>
                  {property.property_type}
                </span>

                <span>•</span>

                <span>
                  {property.area_size} m²
                </span>

                <span>•</span>

                <span>
                  {property.room_count} szoba
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}