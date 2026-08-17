import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      amount,
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
        {
          error:
            "Legalább telefonszám vagy e-mail cím megadása kötelező.",
        },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          error:
            "A kapcsolatfelvételi hozzájárulás elfogadása kötelező.",
        },
        { status: 400 },
      );
    }

    const safeName = String(name ?? "").trim();
    const safePhone = String(phone ?? "").trim();
    const safeEmail = String(email ?? "").trim();
    const safeAmount = String(amount ?? "").trim();
    const safeMessage = String(message ?? "").trim();

    const subject = `Új személyi kölcsön érdeklődő – ${safeName}`;

    const text = [
      "Új személyi kölcsön kapcsolatfelvételi igény érkezett.",
      "",
      `Név: ${safeName}`,
      `Telefonszám: ${safePhone || "Nincs megadva"}`,
      `E-mail cím: ${safeEmail || "Nincs megadva"}`,
      `Igényelt összeg: ${safeAmount || "Nincs megadva"}`,
      "",
      "Üzenet:",
      safeMessage || "Nincs külön üzenet.",
      "",
      "Kapcsolatfelvételi hozzájárulás: elfogadva",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Új személyi kölcsön érdeklődő</h2>

        <p>
          Új kapcsolatfelvételi igény érkezett a
          <strong>Személyi kölcsön</strong> oldalról.
        </p>

        <table
          style="
            border-collapse: collapse;
            width: 100%;
            max-width: 650px;
            margin-top: 20px;
          "
        >
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              <strong>Név</strong>
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              ${escapeHtml(safeName)}
            </td>
          </tr>

          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              <strong>Telefonszám</strong>
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              ${escapeHtml(safePhone || "Nincs megadva")}
            </td>
          </tr>

          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              <strong>E-mail cím</strong>
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              ${escapeHtml(safeEmail || "Nincs megadva")}
            </td>
          </tr>

          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              <strong>Igényelt összeg</strong>
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              ${escapeHtml(safeAmount || "Nincs megadva")}
            </td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <strong>Üzenet:</strong>

          <div
            style="
              margin-top: 8px;
              padding: 14px;
              background: #f4efe7;
              border-radius: 10px;
            "
          >
            ${escapeHtml(safeMessage || "Nincs külön üzenet.")}
          </div>
        </div>

        <p style="margin-top: 24px; color: #666;">
          Kapcsolatfelvételi hozzájárulás: elfogadva
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
      "Személyi kölcsön kapcsolatfelvételi hiba:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "A kapcsolatfelvételi igény elküldése nem sikerült.",
      },
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