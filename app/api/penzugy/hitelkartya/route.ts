import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      monthlySpend,
      repaymentStyle,
      priority,
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

    const spendLabel = formatSpend(monthlySpend);
    const repaymentLabel = formatRepayment(repaymentStyle);
    const priorityLabel = formatPriority(priority);

    const safeName = escapeHtml(String(name ?? "").trim());
    const safePhone = escapeHtml(String(phone ?? "").trim() || "Nincs megadva");
    const safeEmail = escapeHtml(String(email ?? "").trim() || "Nincs megadva");
    const safeSpend = escapeHtml(spendLabel);
    const safeRepayment = escapeHtml(repaymentLabel);
    const safePriority = escapeHtml(priorityLabel);
    const safeMessage = escapeHtml(
      String(message ?? "").trim() || "Nincs megadva",
    ).replaceAll("\n", "<br />");

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@keszthelyiconsulting.com",
      replyTo: email?.trim() || undefined,
      subject: `Hitelkártya érdeklődés – ${name}`,

      text: `
Új érdeklődés érkezett a Hitelkártya oldalról.

Név: ${name}
Telefonszám: ${phone || "Nincs megadva"}
E-mail cím: ${email || "Nincs megadva"}

Havi kártyás költés:
${spendLabel}

Tervezett visszafizetés:
${repaymentLabel}

Legfontosabb szempont:
${priorityLabel}

Üzenet:
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
            background: #edf0ef;
            color: #211b17;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              background: #21343c;
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
                color: #dbc6a5;
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
              Hitelkártya
            </div>

            <div
              style="
                margin-top: 8px;
                color: #d9e0e1;
              "
            >
              Új weboldali érdeklődés
            </div>
          </div>

          <div
            style="
              margin-top: 24px;
              background: #ffffff;
              border: 1px solid #ccd6d8;
              border-radius: 24px;
              padding: 28px 32px;
            "
          >
            <h2 style="margin-top: 0; color: #211b17;">
              Kapcsolattartási adatok
            </h2>

            <p><strong>Név:</strong> ${safeName}</p>
            <p><strong>Telefonszám:</strong> ${safePhone}</p>
            <p><strong>E-mail cím:</strong> ${safeEmail}</p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #dde3e4;
                margin: 28px 0;
              "
            />

            <h2 style="color: #211b17;">
              Hitelkártya-használat
            </h2>

            <p>
              <strong>Havi kártyás költés:</strong><br />
              ${safeSpend}
            </p>

            <p>
              <strong>Tervezett visszafizetés:</strong><br />
              ${safeRepayment}
            </p>

            <p>
              <strong>Legfontosabb szempont:</strong><br />
              ${safePriority}
            </p>

            <p>
              <strong>Üzenet:</strong><br />
              ${safeMessage}
            </p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #dde3e4;
                margin: 28px 0;
              "
            />

            <p
              style="
                margin-bottom: 0;
                font-size: 13px;
                color: #6a7172;
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
    console.error("Hitelkártya kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      {
        error:
          "Az üzenet elküldése nem sikerült. Kérjük, próbáld újra később.",
      },
      { status: 500 },
    );
  }
}

function formatSpend(value: string): string {
  switch (value) {
    case "50-alatt":
      return "50 000 Ft alatt";
    case "50-150":
      return "50 000 – 150 000 Ft";
    case "150-300":
      return "150 000 – 300 000 Ft";
    case "300-felett":
      return "300 000 Ft felett";
    default:
      return "Nincs megadva";
  }
}

function formatRepayment(value: string): string {
  switch (value) {
    case "teljes":
      return "Minden hónapban teljesen visszafizetem";
    case "reszben":
      return "Várhatóan részletekben fizetem vissza";
    case "valtozo":
      return "Hónapról hónapra változó";
    case "meg-nem-tudom":
      return "Még nem tudom";
    default:
      return "Nincs megadva";
  }
}

function formatPriority(value: string): string {
  switch (value) {
    case "kamatmentes":
      return "Hosszabb kamatmentes időszak";
    case "visszaterites":
      return "Visszatérítés / kedvezmények";
    case "alacsony-dij":
      return "Alacsony éves díj";
    case "magasabb-keret":
      return "Magasabb hitelkeret";
    case "egyszeru-hasznalat":
      return "Egyszerű használat";
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