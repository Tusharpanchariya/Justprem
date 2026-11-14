import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email";
import { requireCheckoutConsent } from "@/lib/checkoutConsent";

export const runtime = "nodejs";

type StoredOrder = {
  order_id: string; order_total: number; policy_version: string;
  checkout_orders: { customer_email: string; country_code: string; payment_status: string; payment_provider: string; payment_reference: string; order_snapshot: { items: Array<{ id: string; name: string; quantity: number; priceEUR: number }>; deliveryFee: number; discount: number; couponCode?: string }; customer_snapshot: { name: string; phone: string; address: string; city: string; region: string; country: string; postalCode: string } };
};

export async function POST(req: NextRequest) {
  try {
    const { consentId, paymentId, paymentMethod } = await req.json() as { consentId?: string; paymentId?: string; paymentMethod?: string };
    if (!paymentId || !consentId || !["razorpay", "paypal"].includes(paymentMethod || "")) return NextResponse.json({ error: "A verified paid order is required." }, { status: 400 });
    const consent = await requireCheckoutConsent(consentId, false) as unknown as StoredOrder;
    const order = consent.checkout_orders;
    if (order.payment_status !== "paid" || order.payment_provider !== paymentMethod || order.payment_reference !== paymentId) return NextResponse.json({ error: "The payment could not be matched to this accepted order." }, { status: 409 });
    const customer = order.customer_snapshot;
    const snapshot = order.order_snapshot;
    const delivery = await sendOrderEmail({
      email: order.customer_email, phone: customer.phone, name: customer.name, address: customer.address,
      city: customer.city, region: customer.region, country: customer.country, postalCode: customer.postalCode,
      items: snapshot.items, cartTotal: Number(consent.order_total), couponCode: snapshot.couponCode,
      discount: snapshot.discount, deliveryFee: snapshot.deliveryFee, paymentId, paymentMethod,
      policyVersion: consent.policy_version,
    });
    return NextResponse.json({ success: true, delivery });
  } catch (error) {
    console.error("Order email error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to process order email" }, { status: 500 });
  }
}
