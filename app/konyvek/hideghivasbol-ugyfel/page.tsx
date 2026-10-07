import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookReader from "../../components/BookReader";
import { bookDetails } from "../../components/bookDetails";
import styles from "./book.module.css";

const canonical = `https://www.keszthelyiconsulting.com${bookDetails.href}`;
const description = "Keszthelyi Andrea gyakorlati e-könyve a hideghívásról, kifogáskezelésről és ügyfélszerzésről. Ismerje meg a könyvet, és lapozzon bele a 12 oldalas olvasómintába.";

export const metadata: Metadata = {
  title: "Hideghívásból ügyfél – Keszthelyi Andrea e-könyve",
  description,
  alternates: { canonical },
  openGraph: {
    title: "Hideghívásból ügyfél – Keszthelyi Andrea",
    description,
    url: canonical,
    type: "book",
    locale: "hu_HU",
    images: [{ url: "https://www.keszthelyiconsulting.com/konyv/borito.webp", width: 1049, height: 1489, alt: "Hideghívásból ügyfél – könyvborító" }],
  },
  twitter: { card: "summary_large_image", title: "Hideghívásból ügyfél", description, images: ["https://www.keszthelyiconsulting.com/konyv/borito.webp"] },
};

function Purchase({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? styles.purchaseInline : styles.purchaseCard}>
      <div><span className={styles.eyebrow}>Magyar nyelvű e-könyv</span><p className={styles.price}>{bookDetails.price}</p></div>
      <div className={styles.purchaseAction}>
        {bookDetails.available ? (
          <a className={styles.primaryButton} href={bookDetails.googlePlayUrl} target="_blank" rel="noopener noreferrer">Megvásárolom a Google Playen <span aria-hidden="true">↗</span></a>
        ) : (
          <><span className={styles.comingSoon}>Hamarosan megvásárolható</span><p>A Google Play Könyvekben lesz elérhető.</p></>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: bookDetails.title,
    author: { "@type": "Person", name: bookDetails.author },
    isbn: "9786150264547",
    bookFormat: "https://schema.org/EBook",
    inLanguage: "hu",
    numberOfPages: 159,
    description,
    url: canonical,
    image: "https://www.keszthelyiconsulting.com/konyv/borito.webp",
    ...(bookDetails.available ? { offers: { "@type": "Offer", price: "4999", priceCurrency: "HUF", availability: "https://schema.org/InStock", url: bookDetails.googlePlayUrl } } : {}),
  };
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className={styles.header}>
        <Link href="/" aria-label="Keszthelyi Consulting – kezdőlap"><Image src="/keszthelyi-consulting-logo-light.png" alt="Keszthelyi Consulting" width={1254} height={1254} sizes="120px" priority className={styles.logo} /></Link>
        <nav aria-label="Könyvoldal"><a href="#olvasominta">Beleolvasás</a><Link href="/penzugy/kapcsolat">Kapcsolat</Link><Link href="/konyvek" className={styles.homeLink}>← Könyvek</Link></nav>
      </header>

      <section className={styles.hero} aria-labelledby="book-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Keszthelyi Andrea · Gyakorlati útmutató</p>
          <h1 id="book-title">Hideghívásból <span>ügyfél</span></h1>
          <p className={styles.tagline}>Az első mondattól<br />a következő találkozóig.</p>
          <p className={styles.intro}>Mit mondjon az első néhány másodpercben? Hogyan reagáljon egy „nem érdekel” válaszra? Ez a könyv konkrét mondatokkal és gyakorlati példákkal segít magabiztosabban beszélgetést kezdeményezni.</p>
          <div className={styles.facts}><span>159 oldal</span><span>31 fejezet</span><span>Magyar nyelven</span></div>
          <div className={styles.heroActions}><a href="#olvasominta" className={styles.primaryButton}>Beleolvasok <span aria-hidden="true">↓</span></a><a href="#a-konyvrol" className={styles.textLink}>Mit találok a könyvben? →</a></div>
          <Purchase compact />
        </div>
        <figure className={styles.coverWrap}>
          <div className={styles.coverGlow} aria-hidden="true" />
          <Image src="/konyv/borito.webp" alt="Hideghívásból ügyfél – Keszthelyi Andrea könyvének borítója" width={1049} height={1489} sizes="(max-width: 760px) 72vw, 390px" priority className={styles.cover} />
          <figcaption>„Minden ügyfélkapcsolat egy beszélgetéssel kezdődik.”</figcaption>
        </figure>
      </section>

      <section id="a-konyvrol" className={styles.about} aria-labelledby="about-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>A könyvről</p><h2 id="about-title">Több jó beszélgetés.<br /><span>Több lehetőség.</span></h2><p>Értékesítőknek, pénzügyi és biztosítási szakembereknek, ingatlanközvetítőknek és vállalkozóknak, akik tudatosabban szeretnének ügyfélkapcsolatokat építeni.</p></div>
        <div className={styles.benefits}>
          <article><span className={styles.chapterNumber}>01</span><h3>Jobb nyitómondatok</h3><p>Az első megszólalás, a bizalomépítés és az érdeklődést felkeltő kérdések. Mintamondatok különböző szakmai helyzetekre.</p></article>
          <article><span className={styles.chapterNumber}>02</span><h3>Magabiztos kifogáskezelés</h3><p>Gyakori elutasítások, lehetséges válaszok és visszahívási helyzetek. Hogyan vigye tovább a beszélgetést?</p></article>
          <article><span className={styles.chapterNumber}>03</span><h3>Tudatos napi rutin</h3><p>Felkészülés, utánkövetés, ügyfélkapcsolatok és egy 30 napos kihívás, amely segít a gyakorlatban is elindulni.</p></article>
        </div>
      </section>

      <section id="olvasominta" className={styles.sampleSection} aria-labelledby="sample-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>Ingyenes olvasóminta · 12 oldal</p><h2 id="sample-title">Lapozzon bele,<br /><span>mielőtt dönt.</span></h2><p>A tartalomjegyzék, a bemutatkozás, a bevezető és „A tökéletes első mondat” fejezet már itt elolvasható.</p></div>
        <BookReader />
      </section>

      <section className={styles.author} aria-labelledby="author-title">
        <div><p className={styles.eyebrow}>A szerző</p><h2 id="author-title">Keszthelyi Andrea</h2><p>Vezető pénzügyi és biztosítási szakértő, több mint 25 év szakmai tapasztalattal. A könyvben a mindennapi ügyfélkapcsolatokból, telefonos beszélgetésekből és értékesítési helyzetekből szerzett tapasztalatait osztja meg.</p><p>Érthető, a gyakorlatban használható eszközök ahhoz, hogy a telefon felvétele magabiztosabb lépés legyen.</p></div>
        <blockquote>„Minden ügyfélkapcsolat egy beszélgetéssel kezdődik.”<cite>Keszthelyi Andrea</cite></blockquote>
      </section>

      <section id="vasarlas" className={styles.buySection} aria-labelledby="buy-title">
        <div><p className={styles.eyebrow}>Hideghívásból ügyfél</p><h2 id="buy-title">A következő lépés<br /><span>egy beszélgetés.</span></h2><p>E-könyv · 159 oldal · ISBN {bookDetails.isbn}</p></div>
        <Purchase />
      </section>
    </main>
  );
}
