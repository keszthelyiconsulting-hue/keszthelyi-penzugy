import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      childAge,
      goal,
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

    const safeName = String(name ?? "").trim();
    const safePhone = String(phone ?? "").trim();
    const safeEmail = String(email ?? "").trim();
    const safeChildAge = String(childAge ?? "").trim();
    const safeGoal = String(goal ?? "").trim();
    const safeMessage = String(message ?? "").trim();

    const goalLabel = formatGoalLabel(safeGoal);

    const subject = `Új Gyermekcélú megtakarítás érdeklődő – ${safeName}`;

    const text = [
      "Új gyermekcélú megtakarítás kapcsolatfelvételi igény érkezett.",
      "",
      `Név: ${safeName}`,
      `Telefonszám: ${safePhone || "Nincs megadva"}`,
      `E-mail cím: ${safeEmail || "Nincs megadva"}`,
      `Gyermek életkora: ${safeChildAge || "Nincs megadva"}`,
      `Legfontosabb cél: ${goalLabel}`,
      "",
      "Üzenet:",
      safeMessage || "Nincs külön üzenet.",
      "",
      "Kapcsolatfelvételi hozzájárulás: elfogadva",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Új Gyermekcélú megtakarítás érdeklődő</h2>

        <p>
          Új kapcsolatfelvételi igény érkezett a
          <strong>Gyermekcélú megtakarítás</strong> oldalról.
        </p>

        <p><strong>Név:</strong> ${escapeHtml(safeName)}</p>

        <p>
          <strong>Telefonszám:</strong>
          ${escapeHtml(safePhone || "Nincs megadva")}
        </p>

        <p>
          <strong>E-mail:</strong>
          ${escapeHtml(safeEmail || "Nincs megadva")}
        </p>

        <p>
          <strong>Gyermek életkora:</strong>
          ${escapeHtml(safeChildAge || "Nincs megadva")}
        </p>

        <p>
          <strong>Legfontosabb cél:</strong>
          ${escapeHtml(goalLabel)}
        </p>

        <p>
          <strong>Üzenet:</strong><br>
          ${escapeHtml(safeMessage || "Nincs külön üzenet.")}
        </p>

        <p>
          <strong>Kapcsolatfelvételi hozzájárulás:</strong> elfogadva
        </p>
      </div>
    `;

    await sendEmail({
      to: "info@keszthelyiconsulting.com",
      subject,
      text,
      html,
      replyTo: safeEmail || undefined,
    });

    return NextResponse.json({
      success: true,
      message: "A kapcsolatfelvételi igény sikeresen elküldve.",
    });
  } catch (error) {
    console.error(
      "Gyermekcélú megtakarítás kapcsolatfelvételi hiba:",
      error,
    );

    return NextResponse.json(
      { error: "A kapcsolatfelvételi igény elküldése nem sikerült." },
      { status: 500 },
    );
  }
}

function formatGoalLabel(value: string): string {
  switch (value) {
    case "tanulmanyok":
      return "Tanulmányok";
    case "elso-otthon":
      return "Első otthon";
    case "eletkezdes":
      return "Életkezdés";
    case "tobb-cel":
      return "Több cél egyszerre";
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