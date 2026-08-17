import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      goal,
      timeHorizon,
      message,
      consent,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "A név megadása kötelező." },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          error:
            "A kapcsolatfelvételi hozzájárulás elfogadása szükséges.",
        },
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

    const goalLabel = formatGoalLabel(goal);
    const timeHorizonLabel = formatTimeHorizonLabel(timeHorizon);

    const safeName = escapeHtml(name || "");
    const safePhone = escapeHtml(phone || "Nincs megadva");
    const safeEmail = escapeHtml(email || "Nincs megadva");
    const safeGoal = escapeHtml(goalLabel);
    const safeTimeHorizon = escapeHtml(timeHorizonLabel);
    const safeMessage = escapeHtml(message || "Nincs megadva").replaceAll(
      "\n",
      "<br />",
    );

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@keszthelyiconsulting.com",
      subject: `Hosszú távú megtakarítás – ${name}`,

      text: `
Új érdeklődés érkezett a Hosszú távú megtakarítás oldalról.

Név: ${name}
Telefonszám: ${phone || "Nincs megadva"}
E-mail cím: ${email || "Nincs megadva"}

Megtakarítási cél:
${goalLabel}

Tervezett időtáv:
${timeHorizonLabel}

Üzenet:
${message || "Nincs megadva"}

Kapcsolatfelvételi hozzájárulás:
${consent ? "Igen" : "Nem"}
      `.trim(),

      html: `
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 32px;
            background: #f8f3ea;
            color: #1e211d;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              background: #20221e;
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
                color: #d8c9b2;
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
              Hosszú távú megtakarítás
            </div>

            <div
              style="
                margin-top: 8px;
                color: #ddd3c4;
              "
            >
              Új weboldali érdeklődés
            </div>
          </div>

          <div
            style="
              margin-top: 24px;
              background: #ffffff;
              border: 1px solid #ded1bd;
              border-radius: 24px;
              padding: 28px 32px;
            "
          >
            <h2
              style="
                margin-top: 0;
                color: #1e211d;
              "
            >
              Kapcsolattartási adatok
            </h2>

            <p><strong>Név:</strong> ${safeName}</p>
            <p><strong>Telefonszám:</strong> ${safePhone}</p>
            <p><strong>E-mail cím:</strong> ${safeEmail}</p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #e4d9c8;
                margin: 28px 0;
              "
            />

            <h2 style="color: #1e211d;">
              Megtakarítási igény
            </h2>

            <p>
              <strong>Cél:</strong><br />
              ${safeGoal}
            </p>

            <p>
              <strong>Időtáv:</strong><br />
              ${safeTimeHorizon}
            </p>

            <p>
              <strong>Üzenet:</strong><br />
              ${safeMessage}
            </p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #e4d9c8;
                margin: 28px 0;
              "
            />

            <p
              style="
                margin-bottom: 0;
                font-size: 13px;
                color: #756b5c;
              "
            >
              Kapcsolatfelvételi hozzájárulás:
              <strong>${consent ? " Igen" : " Nem"}</strong>
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
    console.error(
      "Hosszú távú megtakarítás kapcsolatfelvételi hiba:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Az üzenet elküldése nem sikerült. Kérjük, próbáld újra később.",
      },
      { status: 500 },
    );
  }
}

function formatGoalLabel(value: string): string {
  switch (value) {
    case "otthon":
      return "Otthon / ingatlan";

    case "nagyobb-kiadas":
      return "Nagyobb jövőbeni kiadás";

    case "csaladi-cel":
      return "Családi cél";

    case "tartalek":
      return "Hosszabb távú tartalék";

    case "penzugyi-szabadsag":
      return "Nagyobb pénzügyi szabadság";

    case "meg-nem-tudom":
      return "Még nem tudom pontosan";

    default:
      return "Nincs megadva";
  }
}

function formatTimeHorizonLabel(value: string): string {
  switch (value) {
    case "3-5-ev":
      return "3–5 év";

    case "5-10-ev":
      return "5–10 év";

    case "10-ev-felett":
      return "10 évnél hosszabb idő";

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