import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { mockHarmoniums } from "@/lib/data/mockProducts";

type CartRequestItem = {
  id: string;
  quantity: number;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to create the Razorpay order.";
}

function getRazorpayClient() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.includes("placeholder") || keySecret.includes("placeholder")) {
    throw new Error("Razorpay is not configured. Add valid Razorpay API keys to the server environment.");
  }

  if (!/^rzp_(test|live)_/.test(keyId)) {
    throw new Error("The Razorpay key ID must be a Razorpay key beginning with rzp_test_ or rzp_live_.");
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

function getValidatedItems(items: CartRequestItem[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  return items.map((item) => {
    const product = mockHarmoniums.find((harmonium) => harmonium.id === item.id);
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("Your cart contains an invalid item.");
    }

    if (product.availability === "SOLD_OUT") {
      throw new Error(`${product.name} is sold out.`);
    }

    return { product, quantity };
  });
}

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items?: CartRequestItem[] };
    const validatedItems = getValidatedItems(items ?? []);
    const amount = validatedItems.reduce(
      (total, { product, quantity }) => total + product.priceEUR * quantity,
      0,
    );
    const currency = (process.env.RAZORPAY_CURRENCY || "EUR").toUpperCase();

    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new Error("RAZORPAY_CURRENCY must be a three-letter currency code.");
    }

    const order = await getRazorpayClient().orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `jp_${crypto.randomUUID().replaceAll("-", "").slice(0, 32)}`,
      notes: { item_count: String(validatedItems.length) },
    });

    return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
