import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; email?: string; orderReference?: string; statement?: string; company?: string };
    if (body.company) return NextResponse.json({ success: true });
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const orderReference = body.orderReference?.trim() ?? "";
    const statement = body.statement?.trim() ?? "";
    if (name.length < 2 || name.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || orderReference.length < 3 || orderReference.length > 100 || !/withdraw/i.test(statement) || statement.length > 2000) {
      return NextResponse.json({ error: "Enter your name, valid email, order reference and a clear statement that you wish to withdraw." }, { status: 400 });
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    if (!url || !key || !resendKey) return NextResponse.json({ error: "The online withdrawal service is not configured yet. Please contact connect@justprem.shop." }, { status: 503 });
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await db.from("checkout_withdrawal_requests").insert({ customer_name: name, customer_email: email, order_reference: orderReference, statement }).select("id,submitted_at").single();
    if (error || !data) throw new Error("Your withdrawal notice could not be securely recorded. Please try again.");
    const receivedAt = new Date(data.submitted_at).toISOString();
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM_EMAIL || "orders@justprem.shop";
    const receipt = await resend.emails.send({
      from: `JustPrem Harmoniums <${from}>`, to: email, replyTo: "connect@justprem.shop",
      subject: "Receipt of your withdrawal statement — JustPrem",
      text: `We acknowledge receipt of your online withdrawal statement.\n\nName: ${name}\nOrder reference: ${orderReference}\nStatement: ${statement}\nReceived (UTC): ${receivedAt}\nReference: ${data.id}\n\nThis receipt confirms submission and does not limit any mandatory consumer rights. For assistance, contact connect@justprem.shop.`,
    });
    if (receipt.error) console.error("Withdrawal acknowledgement email failed:", receipt.error.message);
    const adminTo = process.env.RESEND_ADMIN_EMAIL || "connect@justprem.shop";
    const admin = await resend.emails.send({ from: `JustPrem Withdrawal Notice <${from}>`, to: adminTo, replyTo: email, subject: `Withdrawal notice received — ${orderReference}`, text: `Reference: ${data.id}\nName: ${name}\nEmail: ${email}\nOrder: ${orderReference}\nReceived (UTC): ${receivedAt}\n\n${statement}` });
    if (admin.error) console.error("Withdrawal notice admin notification failed:", admin.error.message);
    return NextResponse.json({ success: true, reference: data.id, receivedAt, acknowledgementSent: !receipt.error });
  } catch (error) {
    console.error("Online withdrawal notice failed:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to submit your withdrawal notice." }, { status: 500 });
  }
}
