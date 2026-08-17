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
      companyType,
      operatingHistory,
      annualRevenue,
      loanPurpose,
      requestedAmount,
      term,
      collateral,
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

    const companyTypeLabel = formatCompanyType(companyType);
    const historyLabel = formatOperatingHistory(operatingHistory);
    const revenueLabel = formatRevenue(annualRevenue);
    const purposeLabel = formatLoanPurpose(loanPurpose);
    const amountLabel = formatRequestedAmount(requestedAmount);
    const termLabel = formatTerm(term);
    const collateralLabel = formatCollateral(collateral);

    const safeName = escapeHtml(String(name ?? "").trim());
    const safePhone = escapeHtml(String(phone ?? "").trim() || "Nincs megadva");
    const safeEmail = escapeHtml(String(email ?? "").trim() || "Nincs megadva");
    const safeCompanyName = escapeHtml(String(companyName ?? "").trim());
    const safeCompanyType = escapeHtml(companyTypeLabel);
    const safeHistory = escapeHtml(historyLabel);
    const safeRevenue = escapeHtml(revenueLabel);
    const safePurpose = escapeHtml(purposeLabel);
    const safeAmount = escapeHtml(amountLabel);
    const safeTerm = escapeHtml(termLabel);
    const safeCollateral = escapeHtml(collateralLabel);
    const safeMessage = escapeHtml(
      String(message ?? "").trim() || "Nincs megadva",
    ).replaceAll("\n", "<br />");

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@keszthelyiconsulting.com",
      replyTo: email?.trim() || undefined,
      subject: `KKV hitel érdeklődés – ${companyName}`,

      text: `
Új érdeklődés érkezett a KKV hitel oldalról.

Kapcsolattartó: ${name}
Telefonszám: ${phone || "Nincs megadva"}
E-mail cím: ${email || "Nincs megadva"}

Vállalkozás neve:
${companyName}

Vállalkozás típusa:
${companyTypeLabel}

Működési múlt:
${historyLabel}

Éves árbevétel:
${revenueLabel}

Hitelcél:
${purposeLabel}

Igényelt összeg:
${amountLabel}

Tervezett futamidő:
${termLabel}

Fedezet:
${collateralLabel}

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
            background: #edf1ed;
            color: #20231f;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              background: #28473a;
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
                color: #dcc6a0;
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
              KKV hitel
            </div>

            <div
              style="
                margin-top: 8px;
                color: #dce5df;
              "
            >
              Új weboldali érdeklődés
            </div>
          </div>

          <div
            style="
              margin-top: 24px;
              background: #ffffff;
              border: 1px solid #ccd8cf;
              border-radius: 24px;
              padding: 28px 32px;
            "
          >
            <h2 style="margin-top: 0; color: #20231f;">
              Kapcsolattartási adatok
            </h2>

            <p><strong>Kapcsolattartó:</strong> ${safeName}</p>
            <p><strong>Telefonszám:</strong> ${safePhone}</p>
            <p><strong>E-mail cím:</strong> ${safeEmail}</p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #dde5df;
                margin: 28px 0;
              "
            />

            <h2 style="color: #20231f;">
              Vállalkozás és finanszírozás
            </h2>

            <p><strong>Vállalkozás neve:</strong> ${safeCompanyName}</p>
            <p><strong>Vállalkozás típusa:</strong> ${safeCompanyType}</p>
            <p><strong>Működési múlt:</strong> ${safeHistory}</p>
            <p><strong>Éves árbevétel:</strong> ${safeRevenue}</p>
            <p><strong>Hitelcél:</strong> ${safePurpose}</p>
            <p><strong>Igényelt összeg:</strong> ${safeAmount}</p>
            <p><strong>Tervezett futamidő:</strong> ${safeTerm}</p>
            <p><strong>Fedezet:</strong> ${safeCollateral}</p>

            <p>
              <strong>Megjegyzés:</strong><br />
              ${safeMessage}
            </p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #dde5df;
                margin: 28px 0;
              "
            />

            <p
              style="
                margin-bottom: 0;
                font-size: 13px;
                color: #68736b;
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
    console.error("KKV hitel kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      {
        error:
          "Az üzenet elküldése nem sikerült. Kérjük, próbáld újra később.",
      },
      { status: 500 },
    );
  }
}

function formatCompanyType(value: string): string {
  switch (value) {
    case "egyeni-vallalkozo":
      return "Egyéni vállalkozó";
    case "bt":
      return "Bt.";
    case "kft":
      return "Kft.";
    case "zrt":
      return "Zrt.";
    case "egyeb":
      return "Egyéb";
    default:
      return "Nincs megadva";
  }
}

function formatOperatingHistory(value: string): string {
  switch (value) {
    case "1-alatt":
      return "1 év alatt";
    case "1-2":
      return "1–2 év";
    case "2-5":
      return "2–5 év";
    case "5-felett":
      return "5 év felett";
    default:
      return "Nincs megadva";
  }
}

function formatRevenue(value: string): string {
  switch (value) {
    case "20-alatt":
      return "20 millió Ft alatt";
    case "20-50":
      return "20–50 millió Ft";
    case "50-100":
      return "50–100 millió Ft";
    case "100-300":
      return "100–300 millió Ft";
    case "300-felett":
      return "300 millió Ft felett";
    default:
      return "Nincs megadva";
  }
}

function formatLoanPurpose(value: string): string {
  switch (value) {
    case "beruhazas":
      return "Beruházás / fejlesztés";
    case "forgoeszkoz":
      return "Forgóeszköz / készlet";
    case "gep-eszkoz":
      return "Gép- vagy eszközbeszerzés";
    case "ingatlan":
      return "Ingatlan / telephely";
    case "likviditas":
      return "Likviditási cél";
    case "hitelkivaltas":
      return "Hitelkiváltás";
    case "egyeb":
      return "Egyéb";
    default:
      return "Nincs megadva";
  }
}

function formatRequestedAmount(value: string): string {
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
    case "1-alatt":
      return "1 év alatt";
    case "1-3":
      return "1–3 év";
    case "3-5":
      return "3–5 év";
    case "5-felett":
      return "5 év felett";
    case "meg-nem-tudom":
      return "Még nem tudom";
    default:
      return "Nincs megadva";
  }
}

function formatCollateral(value: string): string {
  switch (value) {
    case "igen-ingatlan":
      return "Igen, ingatlan";
    case "igen-egyeb":
      return "Igen, egyéb fedezet";
    case "nincs":
      return "Nincs";
    case "meg-nem-tudom":
      return "Még nem tudom";
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