export default function EzustevekPage() {
  return (
    <main
      style={{
        background: "#f5f1ea",
        minHeight: "100vh",
        color: "#1f2d2a",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "50px 24px 70px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "42px",
            boxShadow: "0 14px 36px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ marginBottom: "36px" }}>
            <p
              style={{
                margin: 0,
                color: "#9a6b2f",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Ezüstévek
            </p>

            <h1
              style={{
                margin: "6px 0 10px",
                fontSize: "52px",
                lineHeight: 1.05,
                color: "#173b35",
              }}
            >
              Aktív évek. Teljes élet.
            </h1>

            <p
              style={{
                fontSize: "21px",
                lineHeight: 1.6,
                maxWidth: "800px",
                margin: 0,
              }}
            >
              Ingyenes online magazin az aktív, tartalmas és biztonságos
              mindennapokért.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "36px",
              alignItems: "start",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#7c1f2d",
                  marginTop: 0,
                  fontSize: "30px",
                }}
              >
                Aktuális szám
              </h2>

              <p
                style={{
                  fontSize: "19px",
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                1. évfolyam • 1. szám • 2026. november
              </p>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.7,
                }}
              >
                Az első lapszámban többek között egészségmegőrzéssel,
                laboreredményekkel, őszi életmóddal, idősotthon-választással,
                nappali ellátással és biztonsággal foglalkozunk.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginTop: "24px",
                }}
              >
                <a
                  href="/ezustevek/2026-november.pdf"
                  target="_blank"
                  style={{
                    background: "#173b35",
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "12px 22px",
                    borderRadius: "999px",
                    fontWeight: 600,
                  }}
                >
                  Lapozom a magazint
                </a>

                <a
                  href="/ezustevek/2026-november.pdf"
                  target="_blank"
                  style={{
                    background: "#efe7dc",
                    color: "#173b35",
                    textDecoration: "none",
                    padding: "12px 22px",
                    borderRadius: "999px",
                    fontWeight: 600,
                  }}
                >
                  Megnyitás PDF-ben
                </a>
              </div>

              <div
                style={{
                  marginTop: "34px",
                  paddingTop: "26px",
                  borderTop: "1px solid #ddd2c2",
                }}
              >
                <h2
                  style={{
                    color: "#7c1f2d",
                    fontSize: "28px",
                    marginBottom: "12px",
                  }}
                >
                  A magazinról
                </h2>

                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Az Ezüstévek hosszú távra tervezett, havonta megjelenő online
                  kiadvány. Célja, hogy megbízható, közérthető és valóban
                  hasznos tartalmakkal segítse az olvasókat az egészség,
                  életmód, közösségi élet, szociális ellátás és a mindennapi
                  biztonság területén.
                </p>
              </div>
            </div>

            <div>
              <a
                href="/ezustevek/2026-november.pdf"
                target="_blank"
                style={{
                  display: "block",
                  textDecoration: "none",
                }}
              >
                <img
                  src="/ezustevek/2026-november-borito.png"
                  alt="Ezüstévek 2026. novemberi lapszám"
                  style={{
                    width: "100%",
                    maxWidth: "380px",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "12px",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.16)",
                  }}
                />
              </a>
            </div>
          </div>

          <div
            style={{
              marginTop: "48px",
              paddingTop: "34px",
              borderTop: "1px solid #d8c8b1",
            }}
          >
            <h2
              style={{
                color: "#7c1f2d",
                fontSize: "30px",
                marginBottom: "24px",
              }}
            >
              Lapszámok
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "24px",
              }}
            >
              <a
                href="/ezustevek/2026-november.pdf"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    background: "#faf7f2",
                    border: "1px solid #e5dbcf",
                    borderRadius: "16px",
                    padding: "16px",
                  }}
                >
                  <img
                    src="/ezustevek/2026-november-borito.png"
                    alt="Ezüstévek 2026. november"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      marginBottom: "12px",
                    }}
                  />

                  <strong>2026. november</strong>
                </div>
              </a>
            </div>
          </div>

          <footer
            style={{
              marginTop: "50px",
              paddingTop: "26px",
              borderTop: "1px solid #d8c8b1",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#4d4a45",
            }}
          >
            <p style={{ margin: "0 0 6px" }}>
              <strong>Kiadó:</strong> Keszthelyi Andrea
            </p>
            <p style={{ margin: "0 0 6px" }}>
              <strong>Kiadó címe:</strong> 7967 Markóc, Fő utca 35.
            </p>
            <p style={{ margin: "0 0 6px" }}>
              <strong>Kiadásért és szerkesztésért felelős:</strong> Keszthelyi
              Andrea
            </p>
            <p style={{ margin: "0 0 6px" }}>
              <strong>E-mail:</strong> info@keszthelyiconsulting.com
            </p>
            <p style={{ margin: "0 0 6px" }}>
              <strong>Web:</strong> keszthelyiconsulting.com
            </p>
            <p style={{ margin: "0 0 14px" }}>
              <strong>ISSN:</strong> megállapítása folyamatban
            </p>

            <p style={{ margin: 0 }}>
              Az Ezüstévek egészségügyi témájú írásai tájékoztató jellegűek,
              nem helyettesítik az orvosi vizsgálatot, diagnózist vagy személyre
              szabott orvosi tanácsadást.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
