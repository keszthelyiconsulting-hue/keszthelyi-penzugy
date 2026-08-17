import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      financingPurpose,
      assetValue,
      downPayment,
      term,
      monthlyBudget,
      message,
      consent,
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "A név megadása kötelező." },
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

    const purposeLabel = formatPurpose(financingPurpose);
    const assetValueLabel = formatAssetValue(assetValue);
    const downPaymentLabel = formatDownPayment(downPayment);
    const termLabel = formatTerm(term);
    const monthlyBudgetLabel = formatMonthlyBudget(monthlyBudget);

    const safeName = escapeHtml(String(name ?? "").trim());
    const safePhone = escapeHtml(String(phone ?? "").trim() || "Nincs megadva");
    const safeEmail = escapeHtml(String(email ?? "").trim() || "Nincs megadva");
    const safePurpose = escapeHtml(purposeLabel);
    const safeAssetValue = escapeHtml(assetValueLabel);
    const safeDownPayment = escapeHtml(downPaymentLabel);
    const safeTerm = escapeHtml(termLabel);
    const safeMonthlyBudget = escapeHtml(monthlyBudgetLabel);
    const safeMessage = escapeHtml(
      String(message ?? "").trim() || "Nincs megadva",
    ).replaceAll("\n", "<br />");

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@keszthelyiconsulting.com",
      replyTo: email?.trim() || undefined,
      subject: `Lakossági lízing érdeklődés – ${name}`,

      text: `
Új érdeklődés érkezett a Lakossági lízing oldalról.

Név: ${name}
Telefonszám: ${phone || "Nincs megadva"}
E-mail cím: ${email || "Nincs megadva"}

Finanszírozás tárgya:
${purposeLabel}

Tervezett érték:
${assetValueLabel}

Önerő:
${downPaymentLabel}

Tervezett futamidő:
${termLabel}

Vállalható havi teher:
${monthlyBudgetLabel}

Megjegyzés:
${message || "Nincs megadva"}

Kapcsolatfelvételi hozzájárulás:
Igen
      `.trim(),

      html: `
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 32px;
            background: #eef1ea;
            color: #20231f;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              background: #284438;
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
                color: #ddc89e;
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
              Lakossági lízing
            </div>

            <div
              style="
                margin-top: 8px;
                color: #dce4dd;
              "
            >
              Új weboldali érdeklődés
            </div>
          </div>

          <div
            style="
              margin-top: 24px;
              background: #ffffff;
              border: 1px solid #ccd7cd;
              border-radius: 24px;
              padding: 28px 32px;
            "
          >
            <h2 style="margin-top: 0; color: #20231f;">
              Kapcsolattartási adatok
            </h2>

            <p><strong>Név:</strong> ${safeName}</p>
            <p><strong>Telefonszám:</strong> ${safePhone}</p>
            <p><strong>E-mail cím:</strong> ${safeEmail}</p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #dce4dc;
                margin: 28px 0;
              "
            />

            <h2 style="color: #20231f;">
              Finanszírozási adatok
            </h2>

            <p>
              <strong>Finanszírozás tárgya:</strong><br />
              ${safePurpose}
            </p>

            <p>
              <strong>Tervezett érték:</strong><br />
              ${safeAssetValue}
            </p>

            <p>
              <strong>Önerő:</strong><br />
              ${safeDownPayment}
            </p>

            <p>
              <strong>Tervezett futamidő:</strong><br />
              ${safeTerm}
            </p>

            <p>
              <strong>Vállalható havi teher:</strong><br />
              ${safeMonthlyBudget}
            </p>

            <p>
              <strong>Megjegyzés:</strong><br />
              ${safeMessage}
            </p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #dce4dc;
                margin: 28px 0;
              "
            />

            <p
              style="
                margin-bottom: 0;
                font-size: 13px;
                color: #677268;
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
    console.error("Lakossági lízing kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      {
        error:
          "Az üzenet elküldése nem sikerült. Kérjük, próbáld újra később.",
      },
      { status: 500 },
    );
  }
}

function formatPurpose(value: string): string {
  switch (value) {
    case "szemelyauto":
      return "Személyautó";
    case "motor":
      return "Motor";
    case "lakojarmu":
      return "Lakójármű / lakókocsi";
    case "hajo":
      return "Hajó / vízi jármű";
    case "egyeb":
      return "Egyéb";
    default:
      return "Nincs megadva";
  }
}

function formatAssetValue(value: string): string {
  switch (value) {
    case "3-alatt":
      return "3 millió Ft alatt";
    case "3-6":
      return "3–6 millió Ft";
    case "6-10":
      return "6–10 millió Ft";
    case "10-20":
      return "10–20 millió Ft";
    case "20-felett":
      return "20 millió Ft felett";
    default:
      return "Nincs megadva";
  }
}

function formatDownPayment(value: string): string {
  switch (value) {
    case "10-alatt":
      return "10% alatt";
    case "10-20":
      return "10–20%";
    case "20-30":
      return "20–30%";
    case "30-felett":
      return "30% felett";
    case "meg-nem-tudom":
      return "Még nem tudom";
    default:
      return "Nincs megadva";
  }
}

function formatTerm(value: string): string {
  switch (value) {
    case "1-3":
      return "1–3 év";
    case "3-5":
      return "3–5 év";
    case "5-7":
      return "5–7 év";
    case "meg-nem-tudom":
      return "Még nem tudom";
    default:
      return "Nincs megadva";
  }
}

function formatMonthlyBudget(value: string): string {
  switch (value) {
    case "50-alatt":
      return "50 000 Ft alatt";
    case "50-100":
      return "50 000 – 100 000 Ft";
    case "100-150":
      return "100 000 – 150 000 Ft";
    case "150-250":
      return "150 000 – 250 000 Ft";
    case "250-felett":
      return "250 000 Ft felett";
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