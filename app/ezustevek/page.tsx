export default function EzustevekPage() {
  return (
    <main
      style={{
        background: "linear-gradient(180deg, #f5efe6 0%, #efe4d5 100%)",
        minHeight: "100vh",
        color: "#1d2f2b",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "44px 24px 70px",
        }}
      >
        <div
          style={{
            background: "#fffaf4",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 18px 48px rgba(0,0,0,0.10)",
            border: "1px solid #eadcc8",
          }}
        >
          {/* FEJLÉC BLOKK */}
          <div
            style={{
              padding: "54px 48px 42px",
              borderBottom: "1px solid #e8d8c3",
              background: "#fbf6ef",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "28px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ maxWidth: "760px" }}>
                <p
                  style={{
                    margin: "0 0 14px",
                    fontSize: "15px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#b07d33",
                    fontWeight: 700,
                  }}
                >
                  Online magazin
                </p>

                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "68px",
                    lineHeight: 0.95,
                    marginBottom: "18px",
                    color: "#173b35",
                  }}
                >
                  <span style={{ fontStyle: "italic" }}>Ezüst</span>
                  <span style={{ color: "#d98a2b", fontStyle: "italic" }}>
                    évek
                  </span>
                </div>

                <h1
                  style={{
                    margin: "0 0 18px",
                    fontFamily: "Georgia, serif",
                    fontSize: "54px",
                    lineHeight: 1.05,
                    color: "#173b35",
                    fontWeight: 500,
                  }}
                >
                  Aktív évek. Teljes élet.
                </h1>

                <p
                  style={{
                    margin: 0,
                    fontSize: "21px",
                    lineHeight: 1.7,
                    maxWidth: "840px",
                    color: "#344844",
                  }}
                >
                  Ingyenes online magazin az aktív, tartalmas és biztonságos
                  mindennapokért.
                </p>
              </div>

              <div
                style={{
                  minWidth: "260px",
                  background: "#f2e6d4",
                  border: "1px solid #dcc3a0",
                  borderRadius: "18px",
                  padding: "18px 22px",
                  alignSelf: "center",
                }}
              >
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#9b6d2b",
                  }}
                >
                  Online időszaki kiadvány
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#173b35",
                  }}
                >
                  HU ISSN 3141-8589
                </p>
              </div>
            </div>
          </div>

          {/* AKTUÁLIS SZÁM */}
          <div
            style={{
              padding: "42px 48px",
              background: "#fffaf4",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.12fr) minmax(280px, 0.88fr)",
                gap: "34px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "#f3e6d7",
                  border: "1px solid #e2c8ab",
                  borderRadius: "24px",
                  padding: "34px 32px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: "15px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#a4732e",
                    fontWeight: 700,
                  }}
                >
                  Ezüstévek magazin
                </p>

                <h2
                  style={{
                    margin: "0 0 18px",
                    fontFamily: "Georgia, serif",
                    fontSize: "54px",
                    lineHeight: 1.05,
                    color: "#8f2530",
                    fontWeight: 500,
                  }}
                >
                  Aktuális szám
                </h2>

                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "#173b35",
                  }}
                >
                  1. évfolyam • 1. szám • 2026. november
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    lineHeight: 1.8,
                    color: "#30423f",
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
                    marginTop: "28px",
                  }}
                >
                  <a
                    href="/ezustevek/2026-november.pdf"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: "#173b35",
                      color: "#ffffff",
                      textDecoration: "none",
                      padding: "13px 24px",
                      borderRadius: "999px",
                      fontWeight: 700,
                      fontSize: "15px",
                      display: "inline-block",
                    }}
                  >
                    Lapozom a magazint
                  </a>

                  <a
                    href="/ezustevek/2026-november.pdf"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: "#fff7ee",
                      color: "#173b35",
                      textDecoration: "none",
                      padding: "13px 24px",
                      borderRadius: "999px",
                      fontWeight: 700,
                      fontSize: "15px",
                      display: "inline-block",
                      border: "1px solid #d8bea1",
                    }}
                  >
                    Megnyitás PDF-ben
                  </a>
                </div>
              </div>

              <div>
                <a
                  href="/ezustevek/2026-november.pdf"
                  target="_blank"
                  rel="noreferrer"
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
                      maxWidth: "340px",
                      display: "block",
                      margin: "0 auto",
                      borderRadius: "16px",
                      boxShadow: "0 18px 36px rgba(0,0,0,0.18)",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* MAGAZINRÓL */}
          <div
            style={{
              padding: "0 48px 8px",
              background: "#fffaf4",
            }}
          >
            <div
              style={{
                paddingTop: "34px",
                borderTop: "1px solid #e7d9c8",
              }}
            >
              <h2
                style={{
                  margin: "0 0 14px",
                  fontFamily: "Georgia, serif",
                  fontSize: "34px",
                  color: "#173b35",
                  fontWeight: 500,
                }}
              >
                A magazinról
              </h2>

              <p
                style={{
                  margin: 0,
                  maxWidth: "920px",
                  fontSize: "18px",
                  lineHeight: 1.85,
                  color: "#334744",
                }}
              >
                Az Ezüstévek hosszú távra tervezett, havonta megjelenő online
                kiadvány. Célja, hogy megbízható, közérthető és valóban hasznos
                tartalmakkal segítse az olvasókat az egészség, életmód,
                közösségi élet, szociális ellátás és a mindennapi biztonság
                területén.
              </p>
            </div>
          </div>

          {/* LAPSZÁMOK */}
          <div
            style={{
              padding: "34px 48px 44px",
              background: "#fffaf4",
            }}
          >
            <div
              style={{
                paddingTop: "8px",
                borderTop: "1px solid #e7d9c8",
              }}
            >
              <h2
                style={{
                  margin: "0 0 24px",
                  fontFamily: "Georgia, serif",
                  fontSize: "34px",
                  color: "#173b35",
                  fontWeight: 500,
                }}
              >
                Lapszámok
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 220px))",
                  gap: "24px",
                  justifyContent: "start",
                }}
              >
                <a
                  href="/ezustevek/2026-november.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e4d6c6",
                      borderRadius: "18px",
                      padding: "16px",
                      boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
                    }}
                  >
                    <img
                      src="/ezustevek/2026-november-borito.png"
                      alt="Ezüstévek 2026. november"
                      style={{
                        width: "100%",
                        maxWidth: "180px",
                        height: "auto",
                        borderRadius: "10px",
                        margin: "0 auto 14px",
                        display: "block",
                      }}
                    />

                    <p
                      style={{
                        margin: "0 0 6px",
                        fontSize: "13px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#9a6b2d",
                        fontWeight: 700,
                      }}
                    >
                      1. szám
                    </p>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#173b35",
                      }}
                    >
                      2026. november
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* SZÖVEGES IMPRESSZUM / LÁBLÉC */}
          <div
            style={{
              background: "#1b120d",
              color: "#f5ede3",
              padding: "34px 48px 30px",
              borderTop: "1px solid #2a1d15",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "28px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 14px",
                    fontSize: "14px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#d2a562",
                    fontWeight: 700,
                  }}
                >
                  Impresszum
                </p>

                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  Ezüstévek
                </p>

                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "15px",
                    color: "#f2d9b8",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Aktív évek. Teljes élet.
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  HU ISSN 3141-8589
                </p>
              </div>

              <div>
                <p style={{ margin: "0 0 10px", lineHeight: 1.8 }}>
                  <strong>Kiadó:</strong> Keszthelyi Andrea
                </p>
                <p style={{ margin: "0 0 10px", lineHeight: 1.8 }}>
                  <strong>Kiadásért és szerkesztésért felelős:</strong>{" "}
                  Keszthelyi Andrea
                </p>
                <p style={{ margin: 0, lineHeight: 1.8 }}>
                  <strong>Web:</strong> keszthelyiconsulting.com
                </p>
              </div>

              <div>
                <p style={{ margin: "0 0 10px", lineHeight: 1.8 }}>
                  <strong>Kiadó címe:</strong> 7967 Markóc, Fő utca 35.
                </p>
                <p style={{ margin: "0 0 10px", lineHeight: 1.8 }}>
                  <strong>E-mail:</strong> info@keszthelyiconsulting.com
                </p>
                <p style={{ margin: 0, lineHeight: 1.8 }}>
                  <strong>Megjelenés:</strong> havonta, online
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: "24px",
                paddingTop: "18px",
                borderTop: "1px solid rgba(255,255,255,0.10)",
                fontSize: "14px",
                lineHeight: 1.8,
                color: "#dbc8b1",
              }}
            >
              Az Ezüstévek egészségügyi témájú írásai tájékoztató jellegűek,
              nem helyettesítik az orvosi vizsgálatot, diagnózist vagy
              személyre szabott orvosi tanácsadást.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
