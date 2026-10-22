
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type OrderResult = {
  success: true;
  orderId: string;
  paymentReference: string;
  amount: number;
  currency: string;
  message: string;
};

export default function BookOrderPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<OrderResult | null>(null);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading || result) return;

    setError("");

    if (!privacyAccepted) {
      setError("Az adatkezelési tájékoztató elfogadása szükséges.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/konyvek/rendeles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          billingName,
          billingAddress,
          taxNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "A rendelés rögzítése nem sikerült."
        );
      }

      setResult(data as OrderResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Váratlan hiba történt."
      );
    } finally {
      setLoading(false);
    }
  }

  const fieldStyle = {
    width: "100%",
    padding: "13px 15px",
    borderRadius: 10,
    border: "1px solid #766443",
    background: "#171717",
    color: "#fff",
    fontSize: 15,
    marginTop: 7,
  };

  const labelStyle = {
    display: "block",
    marginBottom: 19,
    color: "#eee5d5",
    fontSize: 14,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#101010",
        color: "#f5f0e8",
        padding: "35px 18px 80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <nav style={{ marginBottom: 35 }}>
          <Link
            href="/konyvek"
            style={{ color: "#d7b979", textDecoration: "none" }}
          >
            ← Vissza a könyvekhez
          </Link>
        </nav>

        <p
          style={{
            color: "#d7b979",
            letterSpacing: 3,
            fontSize: 12,
            textTransform: "uppercase",
          }}
        >
          Keszthelyi Andrea könyvei
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(30px, 5vw, 48px)",
            marginBottom: 12,
          }}
        >
          Könyvmegrendelés
        </h1>

        <p style={{ color: "#c9c1b4", lineHeight: 1.7 }}>
          Rendeld meg a Hideghívásból ügyfél című e-könyvet
          közvetlenül a Keszthelyi Consulting oldalán.
        </p>

        <section
          style={{
            border: "1px solid #6e5937",
            borderRadius: 16,
            padding: 26,
            marginTop: 28,
            background: "#1b1b1b",
          }}
        >
          <p style={{ color: "#d7b979", marginBottom: 8 }}>
            MAGYAR NYELVŰ E-KÖNYV
          </p>

          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 28,
              marginTop: 0,
            }}
          >
            Hideghívásból ügyfél
          </h2>

          <p style={{ color: "#c9c1b4" }}>
            159 oldal · 31 fejezet
          </p>

          <p
            style={{
              color: "#e8c985",
              fontSize: 34,
              fontWeight: 700,
              marginBottom: 0,
            }}
          >
            4 999 Ft
          </p>
        </section>

        {result ? (
          <section
            aria-live="polite"
            style={{
              marginTop: 30,
              padding: 28,
              border: "1px solid #c9a768",
              borderRadius: 16,
              background: "#1b1b1b",
            }}
          >
            <h2 style={{ color: "#e8c985" }}>
              Rendelésedet rögzítettük!
            </h2>

            <p>
              Köszönjük a megrendelést. A fizetés banki
              átutalással történik.
            </p>

            <p>
              <strong>Fizetendő összeg:</strong>{" "}
              {result.amount.toLocaleString("hu-HU")} Ft
            </p>

            <p>
              <strong>Átutalási közlemény:</strong>
            </p>

            <div
              style={{
                padding: 15,
                background: "#29241c",
                borderRadius: 8,
                color: "#e8c985",
                fontWeight: 700,
                overflowWrap: "anywhere",
              }}
            >
              {result.paymentReference}
            </div>

            <p style={{ lineHeight: 1.7 }}>
              Az átutalásnál pontosan ezt a közleményt add meg,
              hogy azonosítani tudjuk a rendelésedet.
            </p>

            <p style={{ lineHeight: 1.7 }}>
              Az utaláshoz szükséges bankszámlaadatokat
              külön tájékoztatásban adjuk meg.
              A könyvhöz való hozzáférés a fizetés
              ellenőrzése után aktiválható.
            </p>

            <p style={{ color: "#c9c1b4", fontSize: 13 }}>
              Rendelési azonosító: {result.orderId}
            </p>

            <p style={{ color: "#e8c985" }}>
              Kérjük, őrizd meg ezt az oldalt és a rendelési
              azonosítót.
            </p>
          </section>
        ) : (
          <form
            onSubmit={submitOrder}
            style={{
              marginTop: 30,
              padding: 28,
              border: "1px solid #454039",
              borderRadius: 16,
              background: "#1b1b1b",
            }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                marginTop: 0,
              }}
            >
              Megrendelő adatai
            </h2>

            <label style={labelStyle}>
              Teljes név *
              <input
                required
                maxLength={150}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                autoComplete="name"
                style={fieldStyle}
              />
            </label>

            <label style={labelStyle}>
              E-mail-cím *
              <input
                required
                type="email"
                maxLength={254}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                autoComplete="email"
                style={fieldStyle}
              />
            </label>

            <h3 style={{ color: "#d7b979", marginTop: 30 }}>
              Számlázási adatok
            </h3>

            <label style={labelStyle}>
              Számlázási név *
              <input
                required
                maxLength={150}
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                style={fieldStyle}
              />
            </label>

            <label style={labelStyle}>
              Számlázási cím *
              <textarea
                required
                maxLength={500}
                rows={3}
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                placeholder="Irányítószám, település, utca, házszám"
                style={fieldStyle}
              />
            </label>

            <label style={labelStyle}>
              Adószám (céges vásárlás esetén)
              <input
                maxLength={30}
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                style={fieldStyle}
              />
            </label>

            <label
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                lineHeight: 1.6,
                fontSize: 14,
                marginTop: 20,
              }}
            >
              <input
                type="checkbox"
                required
                checked={privacyAccepted}
                onChange={(e) =>
                  setPrivacyAccepted(e.target.checked)
                }
                style={{ marginTop: 5 }}
              />
              <span>
                Megismertem az adatkezelési tájékoztatót,
                és tudomásul veszem, hogy az adataimat
                a rendelés teljesítéséhez kezelik.
              </span>
            </label>

            {error && (
              <p role="alert" style={{ color: "#ff9b9b" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: 25,
                padding: "17px 20px",
                background: loading ? "#8b7a5b" : "#d7b979",
                color: "#16120c",
                border: 0,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading
                ? "Rendelés rögzítése..."
                : "Megrendelem – 4 999 Ft"}
            </button>

            <p
              style={{
                fontSize: 13,
                color: "#b9b1a5",
                lineHeight: 1.6,
                marginTop: 18,
              }}
            >
              A gomb megnyomásával fizetési kötelezettséggel
              járó megrendelést adsz le. A fizetés banki
              átutalással történik, nem bankkártyával.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
