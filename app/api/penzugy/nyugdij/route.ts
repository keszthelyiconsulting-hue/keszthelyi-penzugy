import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, situation, message, consent } = body;

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
    const safeSituation = String(situation ?? "").trim();
    const safeMessage = String(message ?? "").trim();

    const subject = `Új Nyugdíjtervezés érdeklődő – ${safeName}`;

    const text = [
      "Új nyugdíjtervezési kapcsolatfelvételi igény érkezett.",
      "",
      `Név: ${safeName}`,
      `Telefonszám: ${safePhone || "Nincs megadva"}`,
      `E-mail cím: ${safeEmail || "Nincs megadva"}`,
      `Hol tart most a nyugdíjtervezésben: ${safeSituation || "Nincs megadva"}`,
      "",
      "Mit szeretne elérni:",
      safeMessage || "Nincs külön üzenet.",
      "",
      "Kapcsolatfelvételi hozzájárulás: elfogadva",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Új Nyugdíjtervezés érdeklődő</h2>
        <p>Új kapcsolatfelvételi igény érkezett a <strong>Nyugdíjtervezés</strong> oldalról.</p>
        <p><strong>Név:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Telefonszám:</strong> ${escapeHtml(safePhone || "Nincs megadva")}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(safeEmail || "Nincs megadva")}</p>
        <p><strong>Hol tart most a nyugdíjtervezésben:</strong> ${escapeHtml(safeSituation || "Nincs megadva")}</p>
        <p><strong>Mit szeretne elérni:</strong><br>${escapeHtml(safeMessage || "Nincs külön üzenet.")}</p>
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
    console.error("Nyugdíjtervezés kapcsolatfelvételi hiba:", error);

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