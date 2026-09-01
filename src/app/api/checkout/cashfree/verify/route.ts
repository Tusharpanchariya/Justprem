import { NextResponse } from "next/server";

const apiBaseUrl = process.env.CASHFREE_ENVIRONMENT === "sandbox"
  ? "https://sandbox.cashfree.com/pg"
  : "https://api.cashfree.com/pg";

export async function GET(request: Request) {
  try {
    const orderId = new URL(request.url).searchParams.get("orderId");
    const clientId = process.env.CASHFREE_CLIENT_ID;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
    if (!orderId || !clientId || !clientSecret) return NextResponse.json({ error: "Cashfree is not configured." }, { status: 400 });

    const response = await fetch(`${apiBaseUrl}/orders/${encodeURIComponent(orderId)}`, {
      headers: { Accept: "application/json", "x-api-version": "2026-01-01", "x-client-id": clientId, "x-client-secret": clientSecret },
      cache: "no-store",
    });
    const data = (await response.json()) as { order_status?: string; cf_order_id?: string; message?: string };
    if (!response.ok) throw new Error(data.message || "Cashfree could not verify the order.");
    if (data.order_status !== "PAID" || !data.cf_order_id) return NextResponse.json({ error: "Payment was not completed." }, { status: 409 });
    return NextResponse.json({ paymentId: data.cf_order_id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cashfree could not verify the order.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
