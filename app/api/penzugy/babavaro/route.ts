import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, amount, message, consent } = body;

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
    const safeAmount = String(amount ?? "").trim();
    const safeMessage = String(message ?? "").trim();

    const subject = `Új Babaváró érdeklődő – ${safeName}`;

    const text = [
      "Új Babaváró kapcsolatfelvételi igény érkezett.",
      "",
      `Név: ${safeName}`,
      `Telefonszám: ${safePhone || "Nincs megadva"}`,
      `E-mail cím: ${safeEmail || "Nincs megadva"}`,
      `Tervezett hitelösszeg: ${safeAmount || "Nincs megadva"}`,
      "",
      "Üzenet:",
      safeMessage || "Nincs külön üzenet.",
      "",
      "Kapcsolatfelvételi hozzájárulás: elfogadva",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Új Babaváró érdeklődő</h2>
        <p>Új kapcsolatfelvételi igény érkezett a <strong>Babaváró</strong> oldalról.</p>
        <p><strong>Név:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Telefonszám:</strong> ${escapeHtml(safePhone || "Nincs megadva")}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(safeEmail || "Nincs megadva")}</p>
        <p><strong>Tervezett hitelösszeg:</strong> ${escapeHtml(safeAmount || "Nincs megadva")}</p>
        <p><strong>Üzenet:</strong><br>${escapeHtml(safeMessage || "Nincs külön üzenet.")}</p>
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
    console.error("Babaváró kapcsolatfelvételi hiba:", error);

    return NextResponse.json(
      { error: "A kapcsolatfelvételi igény elküldése nem sikerült." },
      { status: 500 },
    );
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