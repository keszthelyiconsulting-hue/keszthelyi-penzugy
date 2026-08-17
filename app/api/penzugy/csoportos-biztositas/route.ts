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

    const subject = `Új Csoportos biztosítás érdeklődő – ${safeName}`;

    const text = [
      "Új Csoportos biztosítás kapcsolatfelvételi igény érkezett.",
      "",
      `Név: ${safeName}`,
      `Vállalkozás: ${safeCompany || "Nincs megadva"}`,
      `Telefonszám: ${safePhone || "Nincs megadva"}`,
      `E-mail cím: ${safeEmail || "Nincs megadva"}`,
      `Vállalkozás létszáma: ${safeCompanySize}`,
      `Legfontosabb cél: ${safeGoal}`,
      "",
      "Üzenet:",
      safeMessage || "Nincs külön üzenet.",
      "",
      "Kapcsolatfelvételi hozzájárulás: elfogadva",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Új Csoportos biztosítás érdeklődő</h2>

        <p>
          Új kapcsolatfelvételi igény érkezett a
          <strong>Csoportos biztosítás</strong> oldalról.
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
        <p><strong>Vállalkozás létszáma:</strong> ${escapeHtml(
          safeCompanySize,
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
    console.error("Csoportos biztosítás kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      { error: "A kapcsolatfelvételi igény elküldése nem sikerült." },
      { status: 500 },
    );
  }
}

function formatCompanySize(value: string): string {
  switch (value) {
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
    case "munkavallaloi-vedelem":
      return "Munkavállalói védelem";
    case "juttatasi-csomag":
      return "Juttatási csomag bővítése";
    case "megtartas":
      return "Munkatársak megtartásának támogatása";
    case "vezeto-vagy-kiemelt-csoport":
      return "Vezetői / kiemelt munkavállalói kör";
    case "altalanos-tajekozodas":
      return "Általános tájékozódás";
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