"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../supabase";

export default function FeaturedProperties() {
  const [saleProperties, setSaleProperties] = useState<any[]>([]);
const [rentProperties, setRentProperties] = useState<any[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const saleProperties = data?.filter((p) => p.listing_type === "sale") || [];
    const rentProperties = data?.filter((p) => p.listing_type === "rent") || [];

    setSaleProperties(saleProperties);
    setRentProperties(rentProperties);
  }

  if (saleProperties.length === 0 && rentProperties.length === 0) return null;

  return (
    <section className="bg-black px-8 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#C2A56A]
font-semibold px-4 py-2">
            Keszthelyi Ingatlan
          </p>

          <h2 className="text-5xl font-light">
  Kiemelt eladó ingatlanok
</h2>
  
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {saleProperties.map((property) => (
            

            <Link
              key={property.id}
              href={`/ingatlan/${property.slug}`}
              className="group overflow-hidden rounded-[28px] border border-amber-500/20 bg-[#0b0b0b]"
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
                  className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-sm uppercase tracking-widest text-#C2A56A
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

                <h3 className="mb-3 text-3xl font-light">
                  {property.title}
                </h3>

                <p className="mb-6 text-#C2A56A line-clamp-3">
                  {property.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-#C2A56A">

                  <span>{property.property_type}</span>

                  <span>•</span>

                  <span>{property.area_size} m²</span>

                  <span>•</span>

                  <span>{property.room_count} szoba</span>

                </div>

              </div>

            </Link>

          ))}

        </div>
               <h2 className="mt-20 text-5xl font-light text-center">
          Kiadó ingatlanok
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">

          {rentProperties.map((property) => ( 
            
            

            <Link
              key={property.id}
              href={`/ingatlan/${property.slug}`}
              className="group overflow-hidden rounded-[28px] border border-amber-500/20 bg-[#0b0b0b]"
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
                  className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-sm uppercase tracking-widest text-#C2A56A
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

                <h3 className="mb-3 text-3xl font-light">
                  {property.title}
                </h3>

                <p className="mb-6 text-#C2A56A line-clamp-3">
                  {property.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-#C2A56A">

                  <span>{property.property_type}</span>

                  <span>•</span>

                  <span>{property.area_size} m²</span>

                  <span>•</span>

                  <span>{property.room_count} szoba</span>

                </div>

              </div>

            </Link>

          ))}
        </div>

      </div>

    </section>
  );
}