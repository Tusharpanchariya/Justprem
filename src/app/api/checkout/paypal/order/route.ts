import { NextResponse } from "next/server";
import { mockHarmoniums } from "@/lib/data/mockProducts";
import { applyCoupon } from "@/lib/coupons";

type CartRequestItem = {
  id: string;
  quantity: number;
};

type PayPalOrder = {
  id?: string;
  status?: string;
  details?: Array<{ description?: string }>;
};

const paypalApiBaseUrl =
  process.env.PAYPAL_ENVIRONMENT === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to process the PayPal request.";
}

function getPayPalCredentials() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal is not configured. Add the PayPal client ID and client secret to the server environment.");
  }

  return { clientId, clientSecret };
}

async function getPayPalAccessToken() {
  const { clientId, clientSecret } = getPayPalCredentials();
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${paypalApiBaseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("PayPal authentication failed. Check the PayPal environment and credentials.");
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("PayPal did not return an access token.");
  }

  return data.access_token;
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
    const { items, couponCode } = (await request.json()) as { items?: CartRequestItem[]; couponCode?: string };
    const validatedItems = getValidatedItems(items ?? []);
    const subtotal = validatedItems.reduce(
      (sum, { product, quantity }) => sum + product.priceEUR * quantity,
      0,
    );
    const coupon = applyCoupon(couponCode, subtotal);
    if (couponCode && !coupon) return NextResponse.json({ error: "That coupon code is not valid." }, { status: 400 });
    const total = subtotal - (coupon?.discount || 0);
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${paypalApiBaseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": crypto.randomUUID(),
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "EUR",
                  value: subtotal.toFixed(2),
                },
                discount: coupon ? { currency_code: "EUR", value: coupon.discount.toFixed(2) } : undefined,
              },
            },
            items: validatedItems.map(({ product, quantity }) => ({
              name: product.name,
              sku: product.id,
              quantity: String(quantity),
              unit_amount: {
                currency_code: "EUR",
                value: product.priceEUR.toFixed(2),
              },
            })),
          },
        ],
      }),
      cache: "no-store",
    });

    const order = (await response.json()) as PayPalOrder;
    if (!response.ok || !order.id) {
      throw new Error(order.details?.[0]?.description || "PayPal could not create the order.");
    }

    return NextResponse.json({ id: order.id, coupon });
  } catch (error) {
    console.error("PayPal order creation error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
