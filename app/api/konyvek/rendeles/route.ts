
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "../../../../lib/email";

export const runtime = "nodejs";

const BOOK_ISBN = "978-615-02-6454-7";
const BOOK_TITLE = "Hideghívásból ügyfél";
const BOOK_PRICE = 4999;

const OWNER_EMAIL = "info@keszthelyiconsulting.com";
const BENEFICIARY = "Keszthelyi Andrea";
const BANK_ACCOUNT = "11600006-00000000-93954691";

type OrderInput = {
  customerName?: unknown;
  customerEmail?: unknown;
  billingName?: unknown;
  billingAddress?: unknown;
  taxNumber?: unknown;
};

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "JSON formátum szükséges." },
        { status: 415 }
      );
    }

    const body = (await request.json()) as OrderInput;

    const customerName = cleanText(body.customerName, 150);
    const customerEmail = cleanText(body.customerEmail, 254).toLowerCase();
    const billingName = cleanText(body.billingName, 150);
    const billingAddress = cleanText(body.billingAddress, 500);
    const taxNumber = cleanText(body.taxNumber, 30);

    if (
      !customerName ||
      !billingName ||
      !billingAddress ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
    ) {
      return NextResponse.json(
        { error: "Kérjük, töltse ki helyesen a kötelező mezőket." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Hiányzó Supabase szerveroldali beállítás.");

      return NextResponse.json(
        { error: "A rendelés jelenleg nem elérhető." },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase
      .from("book_orders")
      .insert({
        book_isbn: BOOK_ISBN,
        customer_name: customerName,
        customer_email: customerEmail,
        billing_name: billingName,
        billing_address: billingAddress,
        tax_number: taxNumber || null,
        price_huf: BOOK_PRICE,
        status: "pending",
      })
      .select("id, payment_reference, price_huf")
      .single();

    if (error || !data) {
      console.error("Könyvrendelés mentési hiba:", error?.code);

      return NextResponse.json(
        { error: "A rendelést nem sikerült rögzíteni." },
        { status: 500 }
      );
    }

    const paymentReference = data.payment_reference;

    const customerMessage = [
      `Kedves ${customerName}!`,
      "",
      `Köszönjük, hogy megrendelte a(z) ${BOOK_TITLE} című e-könyvet!`,
      "",
      "RENDELÉSI ADATOK",
      `Könyv: ${BOOK_TITLE}`,
      `Fizetendő: ${data.price_huf} Ft`,
      `Rendelési azonosító: ${paymentReference}`,
      "",
      "BANKI ÁTUTALÁS",
      `Kedvezményezett: ${BENEFICIARY}`,
      `Bankszámlaszám: ${BANK_ACCOUNT}`,
      `Összeg: ${data.price_huf} Ft`,
      `Közlemény: ${paymentReference}`,
      "",
      "Kérjük, az átutalás közleményébe pontosan",
      "a fenti rendelési azonosítót írja.",
      "",
      "A könyv online olvasási hozzáférését",
      "a befizetés ellenőrzése után aktiváljuk.",
      "A befizetés nem aktiválja automatikusan a hozzáférést.",
      "",
      "Üdvözlettel:",
      "Keszthelyi Consulting",
    ].join("\n");

    const ownerMessage = [
      "ÚJ E-KÖNYV RENDELÉS",
      "",
      `Könyv: ${BOOK_TITLE}`,
      `Rendelési azonosító: ${paymentReference}`,
      `Rendelés UUID: ${data.id}`,
      `Összeg: ${data.price_huf} Ft`,
      "Állapot: Fizetésre vár",
      "",
      "VÁSÁRLÓ",
      `Név: ${customerName}`,
      `E-mail: ${customerEmail}`,
      "",
      "SZÁMLÁZÁSI ADATOK",
      `Számlázási név: ${billingName}`,
      `Számlázási cím: ${billingAddress}`,
      `Adószám: ${taxNumber || "Nincs megadva"}`,
      "",
      `Átutalási közlemény: ${paymentReference}`,
      "",
      "A könyvhozzáférést csak a befizetés",
      "ellenőrzése után aktiváld.",
    ].join("\n");

    // A rendelés már az adatbázisban van.
    // Levélküldési hiba miatt nem kérünk új rendelést.
    const emailResults = await Promise.allSettled([
      sendEmail({
        to: customerEmail,
        subject: `Rendelés visszaigazolása – ${BOOK_TITLE}`,
        text: customerMessage,
      }),
      sendEmail({
        to: OWNER_EMAIL,
        subject: `Új könyvrendelés – ${paymentReference}`,
        text: ownerMessage,
        replyTo: customerEmail,
      }),
    ]);

    const emailSent = emailResults.every(
      (result) => result.status === "fulfilled"
    );

    emailResults.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(
          `Könyvrendelési e-mail hiba (${index === 0 ? "vásárló" : "üzemeltető"}):`,
          result.reason
        );
      }
    });

    return NextResponse.json(
      {
        success: true,
        orderId: data.id,
        paymentReference,
        amount: data.price_huf,
        currency: "HUF",
        emailSent,
        message:
          "A rendelést rögzítettük. A könyv olvasási hozzáférése csak az átutalás ellenőrzése után aktiválható.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Könyvrendelési API-hiba:", error);

    return NextResponse.json(
      { error: "A rendelési kérés feldolgozása sikertelen." },
      { status: 500 }
    );
  }
}
