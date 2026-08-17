import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      topic,
      preferredContact,
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

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Kérjük, írj rövid üzenetet." },
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

    const topicLabel = formatTopic(topic);
    const contactLabel = formatContact(preferredContact);

    const safeName = escapeHtml(String(name ?? "").trim());
    const safePhone = escapeHtml(String(phone ?? "").trim() || "Nincs megadva");
    const safeEmail = escapeHtml(String(email ?? "").trim() || "Nincs megadva");
    const safeTopic = escapeHtml(topicLabel);
    const safeContact = escapeHtml(contactLabel);
    const safeMessage = escapeHtml(String(message ?? "").trim()).replaceAll(
      "\n",
      "<br />",
    );

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@keszthelyiconsulting.com",
      replyTo: email?.trim() || undefined,
      subject: `Kapcsolatfelvétel – ${name}`,

      text: `
Új kapcsolatfelvételi üzenet érkezett.

Név: ${name}
Telefonszám: ${phone || "Nincs megadva"}
E-mail cím: ${email || "Nincs megadva"}

Téma:
${topicLabel}

Preferált kapcsolatfelvétel:
${contactLabel}

Üzenet:
${message}

Kapcsolatfelvételi hozzájárulás:
Igen
      `.trim(),

      html: `
        <div
          style="
            max-width: 700px;
            margin: 0 auto;
            padding: 32px;
            background: #f1ece4;
            color: #211913;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              background: #2b2118;
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

            <div style="font-size: 26px; font-weight: bold;">
              Kapcsolatfelvétel
            </div>

            <div style="margin-top: 8px; color: #e4ded3;">
              Új weboldali üzenet
            </div>
          </div>

          <div
            style="
              margin-top: 24px;
              background: #ffffff;
              border: 1px solid #d8cdbd;
              border-radius: 24px;
              padding: 28px 32px;
            "
          >
            <p><strong>Név:</strong> ${safeName}</p>
            <p><strong>Telefonszám:</strong> ${safePhone}</p>
            <p><strong>E-mail cím:</strong> ${safeEmail}</p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #e4ddd0;
                margin: 28px 0;
              "
            />

            <p><strong>Téma:</strong> ${safeTopic}</p>
            <p><strong>Preferált kapcsolatfelvétel:</strong> ${safeContact}</p>

            <p>
              <strong>Üzenet:</strong><br />
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
        message: "Az üzenet sikeresen elküldve.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      {
        error:
          "Az üzenet elküldése nem sikerült. Kérjük, próbáld újra később.",
      },
      { status: 500 },
    );
  }
}

function formatTopic(value: string): string {
  switch (value) {
    case "hitel":
      return "Hitel / finanszírozás";
    case "otthon":
      return "Otthonteremtés";
    case "biztositas":
      return "Biztosítás";
    case "megtakaritas":
      return "Megtakarítás";
    case "bankolas":
      return "Folyószámla / hitelkártya";
    case "lizing":
      return "Lakossági lízing";
    case "vallalkozas":
      return "Vállalkozói pénzügyek";
    case "nem-tudom":
      return "Még nem tudom pontosan";
    default:
      return "Nincs megadva";
  }
}

function formatContact(value: string): string {
  switch (value) {
    case "telefon":
      return "Telefonon";
    case "email":
      return "E-mailben";
    case "mindegy":
      return "Mindegy";
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