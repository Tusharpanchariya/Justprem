import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email";
import { applyCoupon } from "@/lib/coupons";
import { mockHarmoniums } from "@/lib/data/mockProducts";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      email, 
      phone, 
      name, 
      address, 
      city, 
      region,
      country,
      postalCode, 
      items, 
      cartTotal, 
      couponCode,
      paymentId, 
      paymentMethod 
    } = body;

    // Validate inputs
    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      !Array.isArray(items) ||
      items.length === 0 ||
      typeof cartTotal !== "number" ||
      !Number.isFinite(cartTotal) ||
      cartTotal < 0 ||
      typeof paymentId !== "string" ||
      typeof paymentMethod !== "string"
    ) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400 });
    }

    const invoiceItems = items.map((item: { id?: string; quantity?: number }) => {
      const product = mockHarmoniums.find((entry) => entry.id === item.id);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        throw new Error("Your cart contains an invalid item.");
      }
      return { id: product.id, name: product.name, quantity, priceEUR: product.priceEUR, image: product.image };
    });
    const subtotal = invoiceItems.reduce((total, item) => total + item.priceEUR * item.quantity, 0);
    const coupon = applyCoupon(typeof couponCode === "string" ? couponCode : undefined, subtotal);
    if (couponCode && !coupon) return NextResponse.json({ error: "That coupon code is not valid." }, { status: 400 });

    // Call the email sending helper
    const delivery = await sendOrderEmail({
      email,
      phone: phone || "",
      name,
      address: address || "",
      city: city || "",
      region: region || "",
      country: country || "",
      postalCode: postalCode || "",
      items: invoiceItems,
      cartTotal: subtotal - (coupon?.discount || 0),
      couponCode: coupon?.code,
      discount: coupon?.discount || 0,
      paymentId,
      paymentMethod
    });

    return NextResponse.json({ success: true, delivery });
  } catch (error: unknown) {
    console.error("Order email error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to process order email" }, { status: 500 });
  }
}
