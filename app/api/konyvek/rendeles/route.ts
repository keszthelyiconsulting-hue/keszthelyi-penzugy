
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const BOOK_ISBN = "978-615-02-6454-7";
const BOOK_PRICE = 4999;

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
    const customerEmail = cleanText(body.customerEmail, 254)
      .toLowerCase();
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

    // Kizárólag szerveroldalon használható jogosultság.
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
      console.error("Könyvrendelés mentési hiba:", {
        code: error?.code ?? "NINCS_HIBAKOD",
        message: error?.message ?? "Nem érkezett adat",
        details: error?.details ?? null,
        hint: error?.hint ?? null,
      });

      return NextResponse.json(
        { error: "A rendelést nem sikerült rögzíteni." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId: data.id,
        paymentReference: data.payment_reference,
        amount: data.price_huf,
        currency: "HUF",
        message:
          "A rendelést rögzítettük. A könyv olvasási hozzáférése csak az átutalás ellenőrzése után aktiválható.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Könyvrendelés váratlan szerverhiba:", {
      message:
        err instanceof Error
          ? err.message
          : "Ismeretlen hiba",
    });

    return NextResponse.json(
      { error: "A rendelési kérés feldolgozása nem sikerült." },
      { status: 500 }
    );
  }
}
