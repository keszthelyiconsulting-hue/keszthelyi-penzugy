"use client";

import Link from "next/link";

const items = [
  ["1. Az adatkezelő adatai", <>
    <p><b>Adatkezelő:</b> Keszthelyi Andrea</p><p><b>Székhely / levelezési cím:</b> 7967 Markóc, Fő utca 35.</p>
    <p><b>Adószám:</b> 69877614-1-22</p><p><b>Nyilvántartási szám:</b> 53815310</p>
    <p><b>E-mail:</b> info@keszthelyiconsulting.com</p><p><b>Telefon:</b> +36 30 359 0002</p>
  </>],
  ["2. A tájékoztató célja", <p>Jelen tájékoztató bemutatja, milyen személyes adatokat, milyen célból és jogalapon kezelünk a Keszthelyi Consulting pénzügyi weboldalának használata, kapcsolatfelvétel, ajánlatkérés és az érdeklődők kiszolgálása során.</p>],
  ["3. Kapcsolatfelvétel és Sziporka asszisztens", <>
    <p>A weboldalon Sziporka digitális asszisztens segíti az érdeklődőt a megfelelő szolgáltatási terület kiválasztásában és a kapcsolatfelvétel elindításában.</p>
    <p><b>Kezelt adatok:</b> név, telefonszám, e-mail-cím, az érdeklődés tárgya, valamint az érintett által önként megadott további információk.</p>
    <p><b>Cél:</b> a megkeresés fogadása, megválaszolása, visszahívás és pénzügyi egyeztetés előkészítése.</p>
    <p><b>Jogalap:</b> hozzájárulás, illetve szerződéskötést megelőző intézkedés, ha azt az érintett kéri.</p>
    <p><b>Megőrzés:</b> eredménytelen érdeklődés esetén legfeljebb 1 év; létrejövő ügyfélkapcsolat esetén az adott szolgáltatásra irányadó jogszabályi és szerződéses megőrzési idő.</p>
  </>],
  ["4. Pénzügyi szolgáltatásokkal kapcsolatos megkeresések", <>
    <p>Hitel, biztosítás, megtakarítás vagy vállalati pénzügyi megoldás iránti érdeklődés esetén a weboldalon a kapcsolatfelvételhez és az igény előzetes megismeréséhez szükséges adatokat kérjük.</p>
    <p>Részletes pénzügyi, jövedelmi, egészségügyi vagy más különösen érzékeny adatot a nyilvános weboldalon csak megfelelő jogalap, cél és biztonságos adatkezelési folyamat mellett kérünk.</p>
  </>],
  ["5. E-mailes és telefonos kapcsolattartás", <>
    <p><b>Kezelt adatok:</b> név, e-mail-cím, telefonszám, üzenet tartalma és a kapcsolattartáshoz szükséges információk.</p>
    <p><b>Cél:</b> megkeresés megválaszolása, időpont-egyeztetés, ajánlat előkészítése és kapcsolattartás.</p>
    <p><b>Jogalap:</b> hozzájárulás vagy szerződéskötést megelőző intézkedés; fennálló ügyfélkapcsolatban szerződés teljesítése vagy jogi kötelezettség is lehet.</p>
  </>],
  ["6. Sütik és technikai adatok", <>
    <p>A weboldal működéséhez feltétlenül szükséges technikai adatok és sütik kezelhetők a biztonságos és megfelelő működés érdekében.</p>
    <p>Ha később analitikai vagy marketing célú sütik, illetve külső követőkódok kerülnek az oldalra, azok – ahol szükséges – csak előzetes hozzájárulás után működnek, és külön süti-tájékoztató készül.</p>
  </>],
  ["7. Adatfeldolgozók és adattovábbítás", <>
    <p>A weboldal működtetéséhez tárhely-, e-mail-, informatikai vagy adatbázis-szolgáltatók vehetők igénybe, amelyek csak a szükséges mértékben és megfelelő adatbiztonsági feltételekkel férhetnek hozzá személyes adatokhoz.</p>
    <p>Pénzügyi szolgáltatás közvetítése során az érintett megfelelő tájékoztatása mellett a szükséges adatok bank, biztosító vagy más pénzügyi szolgáltató részére továbbíthatók, ha ez az igény teljesítéséhez szükséges és megfelelő jogalappal rendelkezik.</p>
  </>],
  ["8. Adatbiztonság", <p>Az adatkezelő megfelelő technikai és szervezési intézkedéseket alkalmaz a személyes adatok jogosulatlan hozzáféréstől, megváltoztatástól, nyilvánosságra hozataltól, törléstől, sérüléstől vagy elvesztéstől való védelmére.</p>],
  ["9. Az érintett jogai", <>
    <p>Az érintett a GDPR feltételei szerint kérheti személyes adataihoz való hozzáférését, helyesbítését, törlését, az adatkezelés korlátozását és – alkalmazandó esetben – adathordozhatóságát; tiltakozhat a jogos érdeken alapuló adatkezelés ellen, továbbá hozzájárulását bármikor visszavonhatja.</p>
    <p>A kérelmek az <b>info@keszthelyiconsulting.com</b> címen vagy postán a <b>7967 Markóc, Fő utca 35.</b> címen nyújthatók be.</p>
  </>],
  ["10. Panasz és jogorvoslat", <>
    <p>Az érintett adatvédelmi jogainak sérelme esetén panasszal fordulhat a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH), illetve bírósági jogorvoslatot vehet igénybe.</p>
    <p><b>NAIH:</b> 1055 Budapest, Falk Miksa utca 9–11. · Levelezés: 1363 Budapest, Pf. 9. · ugyfelszolgalat@naih.hu · +36 (1) 391-1400</p>
  </>],
  ["11. Hatály és módosítás", <>
    <p>Az adatkezelő a tájékoztatót a weboldal működésének, a szolgáltatásoknak vagy a vonatkozó szabályoknak a változása esetén módosíthatja. A mindenkor hatályos változat ezen a weboldalon érhető el.</p>
    <p><b>Hatályos:</b> 2026. augusztus 11-től.</p>
  </>],
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#d7cdbf]">
      <header className="border-b border-[#c9a66b]/20 bg-black/80 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between">
          <Link href="/penzugy" className="text-[13px] uppercase tracking-[0.16em] text-[#d7b171] hover:text-[#f1e6d3]">← Vissza a pénzügyi oldalra</Link>
          <span className="text-[12px] uppercase tracking-[0.2em] text-[#9f9487]">Keszthelyi Consulting</span>
        </div>
      </header>
      <section className="border-b border-[#c9a66b]/15 px-6 py-16 md:px-10">
        <div className="mx-auto max-w-[980px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d2aa6d]">Keszthelyi Consulting</p>
          <h1 className="mt-4 text-[40px] text-[#f0e6d8] md:text-[52px]" style={{fontFamily:'Georgia, "Times New Roman", serif'}}>Adatkezelési tájékoztató</h1>
          <p className="mt-5 max-w-[760px] text-[16px] leading-7 text-[#cfc4b5]">Fontos számunkra személyes adatainak biztonsága. Az alábbi tájékoztató összefoglalja a weboldalhoz és az azon keresztül történő kapcsolatfelvételhez kapcsolódó adatkezelést.</p>
        </div>
      </section>
      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto grid max-w-[980px] gap-5">
          {items.map(([title, body]) => (
            <article key={String(title)} className="rounded-[22px] border border-[#c9a66b]/20 bg-[#0b0b0b] p-6 md:p-8">
              <h2 className="text-[23px] text-[#efe5d6]" style={{fontFamily:'Georgia, "Times New Roman", serif'}}>{title}</h2>
              <div className="mt-4 space-y-3 text-[15px] leading-7 [&_b]:font-semibold [&_b]:text-[#efe5d6]">{body}</div>
            </article>
          ))}
        </div>
      </section>
      <footer className="border-t border-[#c9a66b]/15 px-6 py-10 text-center text-[13px] text-[#9f9487]">© 2026 Keszthelyi Consulting · Adatkezelési tájékoztató</footer>
    </main>
  );
}