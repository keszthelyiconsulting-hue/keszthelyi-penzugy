export default function EzustevekPage() {
  return (
    <main style={{ background: "#f7f2e8", minHeight: "100vh", color: "#2e2a26" }}>
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "60px 24px 80px",
        }}
      >
        <div
          style={{
            background: "#fffaf2",
            borderRadius: "24px",
            padding: "48px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              color: "#9a6b2f",
              fontSize: "18px",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            Ezüstévek
          </p>

          <h1
            style={{
              fontSize: "56px",
              lineHeight: 1.05,
              margin: "0 0 12px",
              color: "#7c1f2d",
            }}
          >
            Aktív évek. Teljes élet.
          </h1>

          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.6,
              maxWidth: "760px",
              marginBottom: "34px",
            }}
          >
            Ingyenes online magazin az aktív, tartalmas és biztonságos mindennapokért.
            Egészség, életmód, prevenció, közösség, szociális ellátás és hasznos,
            közérthető információk egy helyen.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginTop: "38px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "28px",
                border: "1px solid #eadfce",
              }}
            >
              <h2 style={{ marginTop: 0, color: "#7c1f2d" }}>Aktuális szám</h2>
              <p style={{ fontSize: "18px", lineHeight: 1.6 }}>
                1. évfolyam • 1. szám • 2026. november
              </p>
              <p style={{ lineHeight: 1.6 }}>
                Az első lapszámban többek között egészségmegőrzéssel, laboreredményekkel,
                őszi életmóddal, idősotthon-választással, nappali ellátással és
                biztonsággal foglalkozunk.
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "28px",
                border: "1px solid #eadfce",
              }}
            >
              <h2 style={{ marginTop: 0, color: "#7c1f2d" }}>A magazinról</h2>
              <p style={{ lineHeight: 1.6 }}>
                Az Ezüstévek hosszú távra tervezett, havonta megjelenő online kiadvány.
                Célja, hogy megbízható, közérthető és valóban hasznos tartalmakkal
                segítse az olvasókat a mindennapokban.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "42px",
              paddingTop: "32px",
              borderTop: "1px solid #d8c8b1",
            }}
          >
            <h2 style={{ color: "#7c1f2d" }}>Impresszum</h2>

            <p><strong>Kiadó:</strong> Keszthelyi Andrea</p>
            <p><strong>Kiadó címe:</strong> 7967 Markóc, Fő utca 35.</p>
            <p><strong>Kiadásért felelős:</strong> Keszthelyi Andrea</p>
            <p><strong>Szerkesztésért felelős:</strong> Keszthelyi Andrea</p>
            <p><strong>E-mail:</strong> info@keszthelyiconsulting.com</p>
            <p><strong>Web:</strong> keszthelyiconsulting.com</p>
            <p><strong>ISSN:</strong> megállapítása folyamatban</p>
          </div>

          <div
            style={{
              marginTop: "32px",
              padding: "20px",
              background: "#f3eadc",
              borderRadius: "14px",
              fontSize: "15px",
              lineHeight: 1.6,
            }}
          >
            Az Ezüstévek egészségügyi témájú írásai tájékoztató jellegűek,
            nem helyettesítik az orvosi vizsgálatot, diagnózist vagy személyre
            szabott orvosi tanácsadást.
          </div>
        </div>
      </section>
    </main>
  );
}
