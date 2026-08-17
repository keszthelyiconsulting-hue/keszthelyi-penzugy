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

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "A név megadása kötelező." },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "A kapcsolatfelvételi hozzájárulás szükséges." },
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

    const goalLabel = formatGoal(goal);
    const timeLabel = formatTimeHorizon(timeHorizon);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@keszthelyiconsulting.com",
      subject: `LTP – lakáscélú megtakarítás – ${name}`,

      text: `
Új érdeklődés érkezett az LTP – lakáscélú megtakarítás oldalról.

Név: ${name}
Telefonszám: ${phone || "Nincs megadva"}
E-mail cím: ${email || "Nincs megadva"}

Lakáscél:
${goalLabel}

Tervezett időtáv:
${timeLabel}

Üzenet:
${message || "Nincs megadva"}

Kapcsolatfelvételi hozzájárulás:
${consent ? "Igen" : "Nem"}
      `.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Az érdeklődés sikeresen elküldve.",
    });
  } catch (error) {
    console.error("LTP kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      {
        error:
          "Az üzenet elküldése nem sikerült. Kérjük, próbáld újra később.",
      },
      { status: 500 },
    );
  }
}

function formatGoal(value: string): string {
  switch (value) {
    case "lakasvasarlas":
      return "Lakásvásárlás";
    case "hazvasarlas":
      return "Házvásárlás";
    case "epites":
      return "Építés";
    case "felujitas":
      return "Felújítás";
    case "kesobbi-lakascel":
      return "Későbbi lakáscél";
    case "meg-nem-tudom":
      return "Még nem tudom pontosan";
    default:
      return "Nincs megadva";
  }
}

function formatTimeHorizon(value: string): string {
  switch (value) {
    case "1-3-ev":
      return "1–3 éven belül";
    case "3-5-ev":
      return "3–5 éven belül";
    case "5-ev-felett":
      return "5 évnél később";
    case "meg-nem-tudom":
      return "Még nem tudom";
    default:
      return "Nincs megadva";
  }
}