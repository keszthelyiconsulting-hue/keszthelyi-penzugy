import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      company,
      phone,
      email,
      keyPersonRole,
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
    const safeCompany = String(company ?? "").trim();
    const safePhone = String(phone ?? "").trim();
    const safeEmail = String(email ?? "").trim();
    const safeKeyPersonRole = formatKeyPersonRole(
      String(keyPersonRole ?? "").trim(),
    );
    const safeGoal = formatGoal(String(goal ?? "").trim());
    const safeMessage = String(message ?? "").trim();

    const subject = `Új Kulcsember-védelem érdeklődő – ${safeName}`;

    const text = [
      "Új Kulcsember-védelem kapcsolatfelvételi igény érkezett.",
      "",
      `Név: ${safeName}`,
      `Vállalkozás: ${safeCompany || "Nincs megadva"}`,
      `Telefonszám: ${safePhone || "Nincs megadva"}`,
      `E-mail cím: ${safeEmail || "Nincs megadva"}`,
      `Kulcsember szerepe: ${safeKeyPersonRole}`,
      `Legfontosabb cél: ${safeGoal}`,
      "",
      "Üzenet:",
      safeMessage || "Nincs külön üzenet.",
      "",
      "Kapcsolatfelvételi hozzájárulás: elfogadva",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Új Kulcsember-védelem érdeklődő</h2>
        <p>
          Új kapcsolatfelvételi igény érkezett a
          <strong>Kulcsember-védelem</strong> oldalról.
        </p>
        <p><strong>Név:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Vállalkozás:</strong> ${escapeHtml(
          safeCompany || "Nincs megadva",
        )}</p>
        <p><strong>Telefonszám:</strong> ${escapeHtml(
          safePhone || "Nincs megadva",
        )}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(
          safeEmail || "Nincs megadva",
        )}</p>
        <p><strong>Kulcsember szerepe:</strong> ${escapeHtml(
          safeKeyPersonRole,
        )}</p>
        <p><strong>Legfontosabb cél:</strong> ${escapeHtml(safeGoal)}</p>
        <p>
          <strong>Üzenet:</strong><br>
          ${escapeHtml(safeMessage || "Nincs külön üzenet.")}
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
    console.error("Kulcsember-védelem kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      { error: "A kapcsolatfelvételi igény elküldése nem sikerült." },
      { status: 500 },
    );
  }
}

function formatKeyPersonRole(value: string): string {
  switch (value) {
    case "tulajdonos":
      return "Tulajdonos";
    case "ugyvezeto":
      return "Ügyvezető / vezető";
    case "ertekesito":
      return "Kiemelt értékesítő";
    case "szakember":
      return "Nélkülözhetetlen szakember";
    case "tobb-kulcsember":
      return "Több kulcsember is van";
    case "meg-nem-tudom":
      return "Még nem tudom pontosan";
    default:
      return "Nincs megadva";
  }
}

function formatGoal(value: string): string {
  switch (value) {
    case "mukodes-fenntartasa":
      return "A működés fenntartása";
    case "bevetelkieses":
      return "Bevételkiesés kezelése";
    case "helyettesites":
      return "Helyettesítés finanszírozása";
    case "hitel-vagy-kotelezettseg":
      return "Hitel vagy vállalati kötelezettség védelme";
    case "altalanos-kockazatfelmeres":
      return "Általános kockázatfelmérés";
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