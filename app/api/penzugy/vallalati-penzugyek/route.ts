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
      companySize,
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
    const safeCompanySize = formatCompanySize(
      String(companySize ?? "").trim(),
    );
    const safeGoal = formatGoal(String(goal ?? "").trim());
    const safeMessage = String(message ?? "").trim();

    const subject = `Új Vállalati pénzügyek érdeklődő – ${safeName}`;

    const text = [
      "Új Vállalati pénzügyek kapcsolatfelvételi igény érkezett.",
      "",
      `Név: ${safeName}`,
      `Vállalkozás: ${safeCompany || "Nincs megadva"}`,
      `Telefonszám: ${safePhone || "Nincs megadva"}`,
      `E-mail cím: ${safeEmail || "Nincs megadva"}`,
      `Vállalkozás mérete: ${safeCompanySize}`,
      `Legfontosabb terület: ${safeGoal}`,
      "",
      "Üzenet:",
      safeMessage || "Nincs külön üzenet.",
      "",
      "Kapcsolatfelvételi hozzájárulás: elfogadva",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Új Vállalati pénzügyek érdeklődő</h2>

        <p>
          Új kapcsolatfelvételi igény érkezett a
          <strong>Vállalati pénzügyek</strong> oldalról.
        </p>

        <p><strong>Név:</strong> ${escapeHtml(safeName)}</p>

        <p>
          <strong>Vállalkozás:</strong>
          ${escapeHtml(safeCompany || "Nincs megadva")}
        </p>

        <p>
          <strong>Telefonszám:</strong>
          ${escapeHtml(safePhone || "Nincs megadva")}
        </p>

        <p>
          <strong>E-mail:</strong>
          ${escapeHtml(safeEmail || "Nincs megadva")}
        </p>

        <p>
          <strong>Vállalkozás mérete:</strong>
          ${escapeHtml(safeCompanySize)}
        </p>

        <p>
          <strong>Legfontosabb terület:</strong>
          ${escapeHtml(safeGoal)}
        </p>

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
    console.error("Vállalati pénzügyek kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      { error: "A kapcsolatfelvételi igény elküldése nem sikerült." },
      { status: 500 },
    );
  }
}

function formatCompanySize(value: string): string {
  switch (value) {
    case "egyeni":
      return "Egyéni vállalkozás";
    case "2-10":
      return "2–10 fő";
    case "11-25":
      return "11–25 fő";
    case "26-50":
      return "26–50 fő";
    case "51-100":
      return "51–100 fő";
    case "100-felett":
      return "100 fő felett";
    default:
      return "Nincs megadva";
  }
}

function formatGoal(value: string): string {
  switch (value) {
    case "likviditas":
      return "Likviditás";
    case "fejlesztes":
      return "Fejlesztés / beruházás";
    case "finanszirozas":
      return "Finanszírozás";
    case "tartalek":
      return "Pénzügyi tartalék";
    case "koltsegstruktura":
      return "Költségstruktúra áttekintése";
    case "altalanos-attekintes":
      return "Általános pénzügyi áttekintés";
    case "meg-nem-tudom":
      return "Még nem tudom pontosan";
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