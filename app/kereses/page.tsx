import { supabase } from "../supabase";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    listingType?: string;
    city?: string;
    propertyType?: string;
    minSize?: string;
    maxSize?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}) {
  let query = supabase.from("properties").select("*");

  if (searchParams.listingType) {
    query = query.eq("listing_type", searchParams.listingType);
  }

  if (searchParams.city) {
    query = query.ilike("city", `%${searchParams.city}%`);
  }

  if (searchParams.propertyType) {
    query = query.eq("property_type", searchParams.propertyType);
  }

  if (searchParams.minSize) {
    query = query.gte("area_size", Number(searchParams.minSize));
  }

  if (searchParams.maxSize) {
    query = query.lte("area_size", Number(searchParams.maxSize));
  }

  if (searchParams.minPrice) {
    query = query.gte("price", Number(searchParams.minPrice));
  }

  if (searchParams.maxPrice) {
    query = query.lte("price", Number(searchParams.maxPrice));
  }

  const { data: properties } = await query;

  return (
    <main className="min-h-screen bg-black px-8 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-12 text-5xl font-light">
          Keresési eredmények
        </h1>

        {properties?.length === 0 && (
          <div className="rounded-3xl border border-amber-500/20 bg-zinc-950 p-10 text-center text-zinc-400">
            Nincs találat a megadott feltételekre.
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-3">

          {properties?.map((property) => (
            <a
              key={property.id}
              href={`/ingatlan/${property.slug}`}
              className="overflow-hidden rounded-3xl border border-amber-500/20 bg-zinc-950 transition hover:border-[#C2A56A]"
            >
              <img
                src={
                  property.main_image ||
                  property.images?.[0] ||
                  "/placeholder.jpg"
                }
                alt={property.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

                <div className="mb-4 flex items-center justify-between">

                  <span className="font-semibold">
                    {property.city}
                  </span>

                  <span className="text-[#C2A56A]">
                    {property.price
                      ? Number(property.price).toLocaleString("hu-HU")
                      : "Ár egyeztetés szerint"}

                    {property.price &&
                      (property.listing_type === "rent"
                        ? " Ft / hó"
                        : " Ft")}
                  </span>

                </div>

                <h2 className="mb-3 text-2xl">
                  {property.title}
                </h2>

                <div className="mb-2 text-sm text-zinc-400">
                  {property.property_type}
                </div>

                {property.area_size && (
                  <div className="text-sm text-zinc-500">
                    {property.area_size} m²
                  </div>
                )}

              </div>

            </a>
          ))}

        </div>

      </div>
    </main>
  );
}