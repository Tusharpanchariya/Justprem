import { NextResponse } from "next/server";
import { mockHarmoniums } from "@/lib/data/mockProducts";
import { applyCoupon } from "@/lib/coupons";

type CartItem = { id: string; quantity: number };
type Customer = { email: string; phone: string; name: string };

const apiBaseUrl = process.env.CASHFREE_ENVIRONMENT === "sandbox"
  ? "https://sandbox.cashfree.com/pg"
  : "https://api.cashfree.com/pg";

function credentials() {
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Cashfree is not configured.");
  return { clientId, clientSecret };
}

export async function POST(request: Request) {
  try {
    const { items, customer, couponCode } = (await request.json()) as { items?: CartItem[]; customer?: Customer; couponCode?: string };
    if (!items?.length || !customer?.email || !customer.name || !customer.phone) {
      return NextResponse.json({ error: "Complete your contact information before paying." }, { status: 400 });
    }

    const orderItems = items.map((item) => {
      const product = mockHarmoniums.find((entry) => entry.id === item.id);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || product.availability === "SOLD_OUT") {
        throw new Error("Your cart contains an unavailable item.");
      }
      return { product, quantity };
    });
    const subtotal = orderItems.reduce((total, { product, quantity }) => total + product.priceEUR * quantity, 0);
    const coupon = applyCoupon(couponCode, subtotal);
    if (couponCode && !coupon) return NextResponse.json({ error: "That coupon code is not valid." }, { status: 400 });
    const orderAmount = subtotal - (coupon?.discount || 0);
    const orderId = `jp_${crypto.randomUUID().replaceAll("-", "")}`;
    const { clientId, clientSecret } = credentials();
    const response = await fetch(`${apiBaseUrl}/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-version": "2026-01-01",
        "x-client-id": clientId,
        "x-client-secret": clientSecret,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: Number(orderAmount.toFixed(2)),
        order_currency: "EUR",
        customer_details: {
          customer_id: `customer_${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`,
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
        },
        order_note: coupon ? `JustPrem harmonium purchase (${coupon.code})` : "JustPrem harmonium purchase",
      }),
      cache: "no-store",
    });
    const data = (await response.json()) as { payment_session_id?: string; message?: string };
    if (!response.ok || !data.payment_session_id) {
      throw new Error(data.message || "Cashfree could not create the order.");
    }
    return NextResponse.json({ orderId, paymentSessionId: data.payment_session_id, coupon });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cashfree could not create the order.";
    console.error("Cashfree order error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
