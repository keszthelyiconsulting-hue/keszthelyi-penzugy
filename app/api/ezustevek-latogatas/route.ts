
    
  
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "ezustevek_visit_counted";
const COUNTER_ID = "ezustevek";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Hiányzó Supabase környezeti változó");
  return { url: url.replace(/\\/$/, ""), key };
}

async function querySupabase(path: string, options?: RequestInit) {
  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase hiba: ${response.status}`);
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const alreadyCounted = request.cookies.get(COOKIE_NAME)?.value === "1";
    let count: number;

    if (alreadyCounted) {
      const response = await querySupabase(
        `ezustevek_visits?id=eq.${COUNTER_ID}&select=count`
      );
      const rows = (await response.json()) as { count: number }[];
      count = rows[0]?.count ?? 0;
    } else {
      const response = await querySupabase("rpc/increment_ezustevek_visits", {
        method: "POST",
        body: JSON.stringify({ counter_id: COUNTER_ID }),
      });
      count = (await response.json()) as number;
    }

    const result = NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store" } }
    );
    if (!alreadyCounted) {
      result.cookies.set(COOKIE_NAME, "1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // Egy böngészőben egy munkamenet alatt egyszer számol.
      });
    }
    return result;
  } catch (error) {
    console.error("Ezüstévek látogatottságszámláló:", error);
    return NextResponse.json(
      { error: "A számláló átmenetileg nem elérhető" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}

