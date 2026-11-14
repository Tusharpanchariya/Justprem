import { createClient } from "@supabase/supabase-js";
import { mockHarmoniums } from "@/lib/data/mockProducts";
import { calculateOrderPricing } from "@/lib/pricing";
import { buildPurchasePolicySnapshot, HARMONIUM_POLICY_VERSION } from "@/lib/harmoniumPurchasePolicies";

export type CheckoutConsentInput = {
  accepted?: boolean;
  policyVersion?: string;
  countryCode?: string;
  country?: string;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  items?: Array<{ id: string; quantity: number }>;
  couponCode?: string;
};

function database() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Checkout terms storage is not configured. Set the server-only Supabase service role key and apply the checkout terms migration.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function recordCheckoutConsent(input: CheckoutConsentInput) {
  if (input.accepted !== true) throw new Error("Please review and accept the applicable terms and conditions before proceeding.");
  if (input.policyVersion !== HARMONIUM_POLICY_VERSION) throw new Error("The purchase terms changed. Please review and accept the current terms.");
  const countryCode = input.countryCode?.trim().toUpperCase() ?? "";
  if (!/^[A-Z]{2}$/.test(countryCode)) throw new Error("Select a valid shipping country before continuing.");
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) || !input.name || !Array.isArray(input.items) || !input.items.length) throw new Error("Complete your contact, shipping and cart details before continuing.");

  const lines = input.items.map(({ id, quantity }) => {
    const product = mockHarmoniums.find((entry) => entry.id === id);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10 || product.availability === "SOLD_OUT") throw new Error("Your cart contains an invalid or unavailable product.");
    return { id: product.id, name: product.name, quantity, priceEUR: product.priceEUR };
  });
  const pricing = calculateOrderPricing(lines, input.couponCode);
  if (input.couponCode && !pricing.coupon) throw new Error("That coupon code is not valid.");
  const { data, error } = await database().rpc("create_checkout_consent", {
    p_email: input.email.trim().toLowerCase(), p_country_code: countryCode,
    p_currency: "EUR", p_order_total: pricing.total,
    p_order_snapshot: { items: lines, subtotal: pricing.subtotal, deliveryFee: pricing.deliveryFee, discount: pricing.coupon?.discount ?? 0, couponCode: pricing.coupon?.code ?? null },
    p_customer_snapshot: { name: input.name, phone: input.phone ?? "", address: input.address ?? "", city: input.city ?? "", region: input.region ?? "", country: input.country ?? "", postalCode: input.postalCode ?? "" },
    p_policy_version: HARMONIUM_POLICY_VERSION, p_policy_snapshot: buildPurchasePolicySnapshot(countryCode),
  });
  if (error) throw new Error("We could not securely save your terms acceptance. Please try again later.");
  return { consentId: data as string, ...pricing };
}

export async function requireCheckoutConsent(consentId: unknown, requireCurrentPolicy = true) {
  if (typeof consentId !== "string" || !/^[0-9a-f-]{36}$/i.test(consentId)) throw new Error("Please accept the purchase terms before starting payment.");
  const { data, error } = await database().from("checkout_policy_acceptances")
    .select("id,order_id,accepted,policy_version,country_code,order_total,currency,checkout_orders!inner(id,order_snapshot,customer_snapshot,payment_status)")
    .eq("id", consentId).eq("accepted", true).maybeSingle();
  if (error || !data || (requireCurrentPolicy && data.policy_version !== HARMONIUM_POLICY_VERSION)) throw new Error("A valid current terms acceptance is required before payment.");
  return data;
}

export async function updateCheckoutPayment(consentId: unknown, values: { provider: string; status: string; reference?: string }) {
  const consent = await requireCheckoutConsent(consentId, false);
  const orderId = (consent as { order_id: string }).order_id;
  const { error } = await database().from("checkout_orders").update({ payment_provider: values.provider, payment_status: values.status, payment_reference: values.reference ?? null }).eq("id", orderId);
  if (error) throw new Error("Could not update the payment record.");
}
