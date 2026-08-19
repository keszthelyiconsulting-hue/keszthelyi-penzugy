"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
type PropertyRow = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  city: string;
  listing_type: string;
  property_type: string;
  price: number | string | null;
  area_size: number | string | null;
  room_count: number | string | null;
  images: string[] | null;
  main_image: string | null;
};
export default function AllProperties() {
  const [properties, setProperties] = useState<PropertyRow[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("listing_type", "sale")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProperties(data || []);
  }

  return (
    <section className="bg-[#050505] px-8 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#C2A56A]
font-semibold px-4 py-2">
            Ingatlan ajánlataink
          </p>

          <h2 className="text-5xl font-light">
             Eladó ingatlanok
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {properties.map((property) => (

  <Link
    key={property.id}
    href={`/ingatlan/${property.slug}`}
    className="group overflow-hidden rounded-[28px] border border-amber-500/20 bg-[#0b0b0b] block"
  >

              <div className="relative overflow-hidden">

                <img
                  src={
                    property.images?.[0] ||
                    property.main_image ||
                    "/placeholder.jpg"
                  }
                  alt={property.title}
                  className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute left-4 top-4 rounded-full bg-amber-500 px-4 py-1 text-xs font-semibold text-black">
                  {property.listing_type === "rent"
                    ? "KIADÓ"
                    : "ELADÓ"}
                </div>

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

                <p className="mb-5 line-clamp-3 text-zinc-400">
                  {property.description}
                </p>

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

      </div>
    </section>
  );
}