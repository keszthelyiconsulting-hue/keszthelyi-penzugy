import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      monthlyIncome,
      bankingStyle,
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

    const incomeLabel = formatIncome(monthlyIncome);
    const bankingStyleLabel = formatBankingStyle(bankingStyle);
    const priorityLabel = formatPriority(priority);

    const safeName = escapeHtml(String(name ?? "").trim());
    const safePhone = escapeHtml(String(phone ?? "").trim() || "Nincs megadva");
    const safeEmail = escapeHtml(String(email ?? "").trim() || "Nincs megadva");
    const safeIncome = escapeHtml(incomeLabel);
    const safeBankingStyle = escapeHtml(bankingStyleLabel);
    const safePriority = escapeHtml(priorityLabel);
    const safeMessage = escapeHtml(
      String(message ?? "").trim() || "Nincs megadva",
    ).replaceAll("\n", "<br />");

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@keszthelyiconsulting.com",
      replyTo: email?.trim() || undefined,
      subject: `Lakossági folyószámla – ${name}`,

      text: `
Új érdeklődés érkezett a Lakossági folyószámla oldalról.

Név: ${name}
Telefonszám: ${phone || "Nincs megadva"}
E-mail cím: ${email || "Nincs megadva"}

Havi jóváírás:
${incomeLabel}

Bankolási szokás:
${bankingStyleLabel}

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
            background: #f5eee5;
            color: #211b17;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              background: #202833;
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
                color: #d8c4a9;
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
              Lakossági folyószámla
            </div>

            <div
              style="
                margin-top: 8px;
                color: #ded4c8;
              "
            >
              Új weboldali érdeklődés
            </div>
          </div>

          <div
            style="
              margin-top: 24px;
              background: #ffffff;
              border: 1px solid #decfbd;
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
                border-top: 1px solid #e5d9ca;
                margin: 28px 0;
              "
            />

            <h2 style="color: #211b17;">
              Bankolási szokások
            </h2>

            <p>
              <strong>Havi jóváírás:</strong><br />
              ${safeIncome}
            </p>

            <p>
              <strong>Bankolási szokás:</strong><br />
              ${safeBankingStyle}
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
                border-top: 1px solid #e5d9ca;
                margin: 28px 0;
              "
            />

            <p
              style="
                margin-bottom: 0;
                font-size: 13px;
                color: #75685b;
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
    console.error("Lakossági folyószámla kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      {
        error:
          "Az üzenet elküldése nem sikerült. Kérjük, próbáld újra később.",
      },
      { status: 500 },
    );
  }
}

function formatIncome(value: string): string {
  switch (value) {
    case "150-alatt":
      return "150 000 Ft alatt";
    case "150-300":
      return "150 000 – 300 000 Ft";
    case "300-500":
      return "300 000 – 500 000 Ft";
    case "500-felett":
      return "500 000 Ft felett";
    case "valtozo":
      return "Változó összeg";
    default:
      return "Nincs megadva";
  }
}

function formatBankingStyle(value: string): string {
  switch (value) {
    case "mobil":
      return "Főként mobilbankban";
    case "online":
      return "Főként internetbankban";
    case "kartya":
      return "Leginkább kártyával fizetek";
    case "keszpenz":
      return "Gyakran használok készpénzt";
    case "vegyes":
      return "Vegyesen használom";
    default:
      return "Nincs megadva";
  }
}

function formatPriority(value: string): string {
  switch (value) {
    case "alacsony-koltseg":
      return "Alacsony havi költség";
    case "olcso-utalas":
      return "Kedvező átutalások";
    case "keszpenzfelvetel":
      return "Készpénzfelvétel";
    case "online-ugyintezes":
      return "Egyszerű online ügyintézés";
    case "bankvaltas":
      return "Bankváltással elérhető előnyök";
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