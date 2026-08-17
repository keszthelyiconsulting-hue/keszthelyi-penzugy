import Link from "next/link";

export default function CategoryCards() {
  const categories = [
    {
      title: "ELADÓ INGATLANOK",
      image: "/elado.jpg",
      href: "/elado",
    },
    {
      title: "KIADÓ INGATLANOK",
      image: "/kiado.jpg",
      href: "/kiado",
    },
    {
      title: "ÖSSZES INGATLAN",
      image: "/osszes.jpg",
      href: "/ingatlanok",
    },
  ];

  return (
    <section className="bg-black py-12">
      <div className="mx-auto max-w-7xl px-8">

        <div className="grid gap-8 md:grid-cols-3">

          {categories.map((item) => (
            <Link key={item.title} href={item.href}>
              <div className="group overflow-hidden rounded-[28px] border border-amber-500/20 bg-[#0b0b0b]">

                <div className="relative h-[260px] overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                </div>

                <div className="flex items-center gap-3 bg-black px-6 py-4">

                  <div className="h-3 w-3 rounded-full bg-[#C2A56A]" />

                  <span
                    className="text-sm tracking-[0.25em] text-[#C2A56A]"
                    style={{
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {item.title}
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