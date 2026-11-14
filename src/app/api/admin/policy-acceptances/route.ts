import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!process.env.CHECKOUT_ADMIN_TOKEN || !token || token.length !== process.env.CHECKOUT_ADMIN_TOKEN.length || token !== process.env.CHECKOUT_ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Checkout records are not configured." }, { status: 503 });
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.from("checkout_policy_acceptances").select("id,accepted_at,policy_version,policy_snapshot,country_code,currency,order_total,checkout_orders!inner(id,customer_email,payment_status,payment_provider,payment_reference,order_snapshot)").order("accepted_at", { ascending: false }).limit(500);
  if (error) return NextResponse.json({ error: "Could not load acceptance records." }, { status: 500 });
  return NextResponse.json({ records: data });
}
