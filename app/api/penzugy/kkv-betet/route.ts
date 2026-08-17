import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      companyName,
      amount,
      term,
      liquidityNeed,
      currentBank,
      goal,
      message,
      consent,
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "A kapcsolattartó nevének megadása kötelező." },
        { status: 400 },
      );
    }

    if (!companyName?.trim()) {
      return NextResponse.json(
        { error: "A vállalkozás nevének megadása kötelező." },
        { status: 400 },
      );
    }

    if (!phone?.trim() && !email?.trim()) {
      return NextResponse.json(
        { error: "Legalább telefonszám vagy e-mail cím megadása kötelező." },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "A kapcsolatfelvételi hozzájárulás elfogadása kötelező." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const amountLabel = formatAmount(amount);
    const termLabel = formatTerm(term);
    const liquidityLabel = formatLiquidity(liquidityNeed);
    const goalLabel = formatGoal(goal);

    const safeName = escapeHtml(String(name ?? "").trim());
    const safePhone = escapeHtml(String(phone ?? "").trim() || "Nincs megadva");
    const safeEmail = escapeHtml(String(email ?? "").trim() || "Nincs megadva");
    const safeCompanyName = escapeHtml(String(companyName ?? "").trim());
    const safeAmount = escapeHtml(amountLabel);
    const safeTerm = escapeHtml(termLabel);
    const safeLiquidity = escapeHtml(liquidityLabel);
    const safeBank = escapeHtml(
      String(currentBank ?? "").trim() || "Nincs megadva",
    );
    const safeGoal = escapeHtml(goalLabel);
    const safeMessage = escapeHtml(
      String(message ?? "").trim() || "Nincs megadva",
    ).replaceAll("\n", "<br />");

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@keszthelyiconsulting.com",
      replyTo: email?.trim() || undefined,
      subject: `KKV betét érdeklődés – ${companyName}`,

      text: `
Új érdeklődés érkezett a KKV betét oldalról.

Kapcsolattartó: ${name}
Telefonszám: ${phone || "Nincs megadva"}
E-mail cím: ${email || "Nincs megadva"}

Vállalkozás neve:
${companyName}

Elhelyezhető összeg:
${amountLabel}

Tervezett időtáv:
${termLabel}

Likviditási igény:
${liquidityLabel}

Jelenlegi számlavezető bank:
${currentBank || "Nincs megadva"}

A pénz későbbi célja:
${goalLabel}

Megjegyzés:
${message || "Nincs megadva"}

Kapcsolatfelvételi hozzájárulás:
Igen
      `.trim(),

      html: `
        <div
          style="
            max-width: 700px;
            margin: 0 auto;
            padding: 32px;
            background: #f0ece3;
            color: #211f1b;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              background: #4b3d28;
              color: #ffffff;
              padding: 28px 32px;
              border-radius: 24px;
            "
          >
            <div
              style="
                font-size: 12px;
                letter-spacing: 3px;
                text-transform: uppercase;
                color: #d9bb7a;
                margin-bottom: 10px;
              "
            >
              Keszthelyi Consulting
            </div>

            <div
              style="
                font-size: 26px;
                font-weight: bold;
              "
            >
              KKV betét
            </div>

            <div
              style="
                margin-top: 8px;
                color: #e4ded3;
              "
            >
              Új weboldali érdeklődés
            </div>
          </div>

          <div
            style="
              margin-top: 24px;
              background: #ffffff;
              border: 1px solid #d7cebd;
              border-radius: 24px;
              padding: 28px 32px;
            "
          >
            <h2 style="margin-top: 0; color: #211f1b;">
              Kapcsolattartási adatok
            </h2>

            <p><strong>Kapcsolattartó:</strong> ${safeName}</p>
            <p><strong>Telefonszám:</strong> ${safePhone}</p>
            <p><strong>E-mail cím:</strong> ${safeEmail}</p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #e4ddd0;
                margin: 28px 0;
              "
            />

            <h2 style="color: #211f1b;">
              Vállalkozás és betéti igény
            </h2>

            <p><strong>Vállalkozás neve:</strong> ${safeCompanyName}</p>
            <p><strong>Elhelyezhető összeg:</strong> ${safeAmount}</p>
            <p><strong>Tervezett időtáv:</strong> ${safeTerm}</p>
            <p><strong>Likviditási igény:</strong> ${safeLiquidity}</p>
            <p><strong>Jelenlegi számlavezető bank:</strong> ${safeBank}</p>
            <p><strong>A pénz későbbi célja:</strong> ${safeGoal}</p>

            <p>
              <strong>Megjegyzés:</strong><br />
              ${safeMessage}
            </p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #e4ddd0;
                margin: 28px 0;
              "
            />

            <p
              style="
                margin-bottom: 0;
                font-size: 13px;
                color: #70695d;
              "
            >
              Kapcsolatfelvételi hozzájárulás:
              <strong> Igen</strong>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Az érdeklődés sikeresen elküldve.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("KKV betét kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      {
        error:
          "Az üzenet elküldése nem sikerült. Kérjük, próbáld újra később.",
      },
      { status: 500 },
    );
  }
}

function formatAmount(value: string): string {
  switch (value) {
    case "5-alatt":
      return "5 millió Ft alatt";
    case "5-20":
      return "5–20 millió Ft";
    case "20-50":
      return "20–50 millió Ft";
    case "50-100":
      return "50–100 millió Ft";
    case "100-felett":
      return "100 millió Ft felett";
    default:
      return "Nincs megadva";
  }
}

function formatTerm(value: string): string {
  switch (value) {
    case "1-honap-alatt":
      return "1 hónap alatt";
    case "1-3-honap":
      return "1–3 hónap";
    case "3-6-honap":
      return "3–6 hónap";
    case "6-12-honap":
      return "6–12 hónap";
    case "12-felett":
      return "12 hónap felett";
    case "meg-nem-tudom":
      return "Még nem tudom";
    default:
      return "Nincs megadva";
  }
}

function formatLiquidity(value: string): string {
  switch (value) {
    case "barmikor-kellhet":
      return "Bármikor szükség lehet rá";
    case "reszben-kellhet":
      return "Egy részére szükség lehet";
    case "lekotheto":
      return "A teljes összeg leköthető";
    case "meg-nem-tudom":
      return "Még nem tudom";
    default:
      return "Nincs megadva";
  }
}

function formatGoal(value: string): string {
  switch (value) {
    case "mukodesi-tartalek":
      return "Működési tartalék";
    case "kesobbi-beruhazas":
      return "Későbbi beruházás";
    case "ado-vagy-kifizetes":
      return "Adó / nagyobb kifizetés";
    case "atmenetileg-szabad":
      return "Átmenetileg szabad pénz";
    case "egyeb":
      return "Egyéb";
    default:
      return "Nincs megadva";
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}