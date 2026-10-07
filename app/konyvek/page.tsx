import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bookCatalog } from "../components/bookDetails";
import styles from "./books.module.css";

const canonical = "https://www.keszthelyiconsulting.com/konyvek";
const description = "Keszthelyi Andrea könyvei egy helyen. Bemutatók, lapozható olvasóminták és vásárlási lehetőségek a Keszthelyi Consulting oldalán.";

export const metadata: Metadata = {
  title: "Könyvek – Keszthelyi Andrea | Keszthelyi Consulting",
  description,
  alternates: { canonical },
  openGraph: { title: "Keszthelyi Andrea könyvei", description, url: canonical, type: "website", locale: "hu_HU" },
};

export default function BooksPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Keszthelyi Andrea könyvei",
    url: canonical,
    inLanguage: "hu",
    description,
    mainEntity: { "@type": "ItemList", itemListElement: bookCatalog.map((book, index) => ({ "@type": "ListItem", position: index + 1, name: book.title, url: `https://www.keszthelyiconsulting.com${book.href}` })) },
  };
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className={styles.header}>
        <Link href="/" aria-label="Keszthelyi Consulting – kezdőlap"><Image src="/keszthelyi-consulting-logo-light.png" alt="Keszthelyi Consulting" width={1254} height={1254} sizes="120px" priority className={styles.logo} /></Link>
        <nav aria-label="Könyvek menü"><Link href="/">← Kezdőlap</Link><Link href="/penzugy/kapcsolat">Kapcsolat</Link></nav>
      </header>

      <section className={styles.intro} aria-labelledby="books-title">
        <p className={styles.eyebrow}>Keszthelyi Andrea könyvei</p>
        <h1 id="books-title">Könyvek</h1>
        <p className={styles.tagline}>Tudás, amit magával vihet.</p>
        <p className={styles.description}>Ismerje meg a könyveimet, és lapozzon bele az ingyenes olvasómintákba. A bemutatók és a vásárlási lehetőségek itt, egy helyen találhatók.</p>
      </section>

      <section className={styles.catalog} aria-label="Könyvválaszték">
        <div className={styles.grid}>
          {bookCatalog.map((book) => (
            <article key={book.isbn} className={styles.bookCard}>
              <Link href={book.href} className={styles.coverLink} aria-label={`${book.title} – bemutató és olvasóminta`}><Image src={book.cover} alt={`${book.title} – ${book.author} könyvének borítója`} width={1049} height={1489} sizes="(max-width: 600px) 210px, 260px" priority className={styles.cover} /></Link>
              <div className={styles.bookInfo}>
                <p className={styles.eyebrow}>{book.category}</p>
                <p className={styles.author}>{book.author}</p>
                <h2><Link href={book.href}>{book.title}</Link></h2>
                <p className={styles.summary}>{book.summary}</p>
                <p className={styles.facts}>Magyar nyelvű e-könyv · {book.pages} oldal · {book.chapters} fejezet</p>
                <div className={styles.priceRow}><span className={styles.price}>{book.price}</span><span className={styles.status}>{book.available ? "Megvásárolható" : "Vásárlás hamarosan"}</span></div>
                <div className={styles.actions}>
                  <Link href={book.href} className={styles.primaryButton}>Bemutató és beleolvasás <span aria-hidden="true">→</span></Link>
                  {book.available && <a href={book.googlePlayUrl} target="_blank" rel="noopener noreferrer" className={styles.purchaseLink}>Megvásárolom a Google Playen ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.moreBooks}>Az új könyvek bemutatói is erre az oldalra kerülnek majd.</p>
      </section>
    </main>
  );
}
