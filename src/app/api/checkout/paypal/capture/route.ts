import { NextResponse } from "next/server";
import { updateCheckoutPayment } from "@/lib/checkoutConsent";

type PayPalCapture = {
  id?: string;
  status?: string;
};

type PayPalOrder = {
  status?: string;
  details?: Array<{ description?: string }>;
  purchase_units?: Array<{
    custom_id?: string;
    payments?: {
      captures?: PayPalCapture[];
    };
  }>;
};

const paypalApiBaseUrl =
  process.env.PAYPAL_ENVIRONMENT === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to capture the PayPal payment.";
}

async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal is not configured.");
  }

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

export async function POST(request: Request) {
  try {
    const { orderId } = (await request.json()) as { orderId?: string };
    if (!orderId || !/^[A-Z0-9]{10,30}$/i.test(orderId)) {
      return NextResponse.json({ error: "Invalid PayPal order." }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${paypalApiBaseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": crypto.randomUUID(),
      },
      cache: "no-store",
    });
    const order = (await response.json()) as PayPalOrder;
    const capture = order.purchase_units?.[0]?.payments?.captures?.[0];
    const consentId = order.purchase_units?.[0]?.custom_id;

    if (!response.ok || order.status !== "COMPLETED" || capture?.status !== "COMPLETED" || !capture.id) {
      throw new Error(order.details?.[0]?.description || "PayPal could not confirm the payment.");
    }

    await updateCheckoutPayment(consentId, { provider: "paypal", status: "paid", reference: capture.id });
    return NextResponse.json({ paymentId: capture.id, consentId });
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
