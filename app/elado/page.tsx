import Link from "next/link";
import { supabase } from "../supabase";

export default async function EladoPage() {
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("listing_type", "sale")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-8 py-20">

        <h1 className="mb-12 text-center text-5xl font-light">
          Eladó ingatlanok
        </h1>

        <div className="grid gap-8 md:grid-cols-3">

          {properties?.map((property) => (
            <Link
              key={property.id}
              href={`/ingatlan/${property.slug}`}
              className="group overflow-hidden rounded-[28px] border border-amber-500/20 bg-[#0b0b0b]"
            >
              <div className="relative overflow-hidden">

                <div className="absolute left-4 top-4 z-10 rounded-full bg-amber-500 px-4 py-1 text-xs font-semibold text-black">
                  ELADÓ
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

                  <span className="text-sm uppercase tracking-widest text-[#C2A56A]">
                    {property.city}
                  </span>

                  <span
                    className="text-xl text-[#C2A56A]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {Number(property.price).toLocaleString("hu-HU")} Ft
                  </span>

                </div>

                <h3 className="mb-3 text-2xl font-light">
                  {property.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-zinc-400">
                  {property.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-zinc-400">

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
    </main>
  );
}