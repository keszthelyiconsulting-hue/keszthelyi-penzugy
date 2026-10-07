export type BookDetails = {
  title: string;
  author: string;
  subtitle: string;
  summary: string;
  category: string;
  cover: string;
  pages: number;
  chapters: number;
  href: string;
  price: string;
  isbn: string;
  googlePlayUrl: string;
  available: boolean;
};

export const bookDetails: BookDetails = {
  title: "Hideghívásból ügyfél",
  author: "Keszthelyi Andrea",
  subtitle:
    "Kapcsolatépítés és ügyfélszerzés a pénzügyi, biztosítási és az ingatlanpiacon.",
  summary:
    "Gyakorlati útmutató ahhoz, hogy magabiztosabban indítson telefonos beszélgetést, kezelje a kifogásokat és építsen ügyfélkapcsolatokat. Konkrét mondatokkal és szakmai példákkal.",
  category: "Üzlet és kapcsolatépítés",
  cover: "/konyv/borito.webp",
  pages: 159,
  chapters: 31,
  href: "/konyvek/hideghivasbol-ugyfel",
  price: "4 999 Ft",
  isbn: "978-615-02-6454-7",
  googlePlayUrl:
    "https://play.google.com/store/books/details?id=X7gWEgAAQBAJ&hl=hu&gl=HU",
  // Enable only after the Hungarian storefront offers a verified purchase.
  available: process.env.NEXT_PUBLIC_BOOK_GOOGLE_PLAY_AVAILABLE === "true",
};

// Each new title has its own presentation, sample and purchase status.
export const bookCatalog: readonly BookDetails[] = [bookDetails];

export const samplePages = [
  { src: "/konyv/borito.webp", label: "Borító" },
  { src: "/konyv/minta-02.webp", label: "Kiadási adatok" },
  { src: "/konyv/minta-03.webp", label: "Tartalomjegyzék – 1." },
  { src: "/konyv/minta-04.webp", label: "Tartalomjegyzék – 2." },
  { src: "/konyv/minta-05.webp", label: "A szerzőről" },
  { src: "/konyv/minta-06.webp", label: "Mi a hideghívás? – 1." },
  { src: "/konyv/minta-07.webp", label: "Mi a hideghívás? – 2." },
  { src: "/konyv/minta-08.webp", label: "Előszó" },
  { src: "/konyv/minta-09.webp", label: "A tökéletes első mondat – 1." },
  { src: "/konyv/minta-10.webp", label: "A tökéletes első mondat – 2." },
  { src: "/konyv/minta-11.webp", label: "A tökéletes első mondat – 3." },
  { src: "/konyv/minta-12.webp", label: "Hátoldal" },
] as const;
