import { Resend } from "resend";
import path from "path";
import { createInvoicePdf } from "@/lib/invoice";

export interface OrderItem { id: string; name: string; quantity: number; priceEUR: number; image?: string }
export interface OrderDetails { email: string; phone: string; name: string; address: string; city: string; region: string; country: string; postalCode: string; items: OrderItem[]; cartTotal: number; paymentId: string; paymentMethod: string; couponCode?: string; discount?: number }

const resend = new Resend(process.env.RESEND_API_KEY || "re_temp_key_for_build_evaluation");

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}
function money(amount: number) { return `EUR ${amount.toFixed(2)}`; }
function invoiceNumber(paymentId: string) { return `JP-${paymentId.replace(/[^a-z0-9]/gi, "").slice(-16).toUpperCase() || "ORDER"}`; }

function createCustomerEmail(details: OrderDetails) {
  const safe = (value: string) => escapeHtml(value);
  const isPending = details.paymentMethod === "wise";
  const items = details.items.map((item) => `<tr><td style="padding:14px 0;border-bottom:1px solid #e7e0d5;color:#0e1b10;font-size:14px"><strong>${safe(item.name)}</strong><br><span style="color:#6d716d;font-size:12px">Quantity: ${item.quantity}</span></td><td style="padding:14px 0;border-bottom:1px solid #e7e0d5;text-align:right;color:#0e1b10;font-size:14px">${money(item.priceEUR * item.quantity)}</td></tr>`).join("");
  const address = [details.name, details.address, [details.city, details.region, details.postalCode].filter(Boolean).join(", "), details.country, details.phone].filter(Boolean).map(safe).join("<br>");
  const status = isPending ? "Payment details enclosed" : "Payment received";
  const discountRow = details.discount ? `<tr><td style="padding-top:12px;color:#0e1b10;font-size:14px">Discount (${safe(details.couponCode || "COUPON")})</td><td style="padding-top:12px;text-align:right;color:#0e1b10;font-size:14px">-${money(details.discount)}</td></tr>` : "";
  const wiseBlock = isPending ? `<tr><td style="padding:22px 28px;background:#f4f0e8;border:1px solid #ddd3c4"><p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#0e1b10;text-transform:uppercase;letter-spacing:.08em">Wise bank transfer</p><p style="margin:0;color:#39423a;font-size:13px;line-height:1.65">Please transfer <strong>${money(details.cartTotal)}</strong> and use <strong>${safe(details.paymentId)}</strong> as the payment reference.<br><strong>Account:</strong> vitthal prem travels llp<br><strong>IBAN:</strong> BE75 9059 5938 2951 &nbsp; <strong>Swift/BIC:</strong> TRWIBEB1XXX</p></td></tr>` : "";
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f0f1f5;font-family:Arial,Helvetica,sans-serif;color:#0e1b10"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:32px 16px"><table role="presentation" width="600" align="center" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#fff"><tr><td style="padding:24px 24px 0"><img src="cid:justprem-harmonium" alt="JustPrem Harmoniums" width="552" style="display:block;width:100%;height:auto" /></td></tr><tr><td style="padding:24px 28px 12px"><p style="margin:0 0 14px;font-family:Georgia,serif;font-size:23px;font-weight:bold;color:#0e1b10">A new instrument, a new journey.</p><p style="margin:0;color:#39423a;font-size:15px;line-height:1.65">Thank you for choosing us as your companion on the path of sound and devotion. ${isPending ? "Your order is reserved while we await your transfer." : "Your harmonium is now being prepared for its journey."}</p></td></tr><tr><td style="padding:16px 28px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #bfc3c8;border-bottom:1px solid #bfc3c8"><tr><td style="padding:14px 0;font-size:12px;color:#5c615d;text-transform:uppercase;letter-spacing:.08em">Order reference</td><td style="padding:14px 0;text-align:right;font-family:monospace;font-size:12px;color:#0e1b10">${safe(details.paymentId)}</td></tr><tr><td style="padding:0 0 14px;font-size:12px;color:#5c615d;text-transform:uppercase;letter-spacing:.08em">Status</td><td style="padding:0 0 14px;text-align:right;font-size:12px;font-weight:bold;color:#0e1b10">${status}</td></tr></table></td></tr><tr><td style="padding:8px 28px 22px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td colspan="2" style="padding-bottom:8px;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase">Order summary</td></tr>${items}${discountRow}<tr><td style="padding-top:16px;font-size:15px;font-weight:bold">${isPending ? "Total due" : "Total paid"}</td><td style="padding-top:16px;text-align:right;font-size:16px;font-weight:bold">${money(details.cartTotal)}</td></tr></table></td></tr><tr><td style="padding:0 28px 24px"><p style="margin:0 0 7px;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase">Shipping address</p><p style="margin:0;color:#39423a;font-size:13px;line-height:1.6">${address}</p></td></tr>${wiseBlock}<tr><td style="padding:24px 28px 30px;text-align:center"><p style="margin:0;color:#5c615d;font-size:12px;line-height:1.6">Your formal invoice is attached to this email. For any questions, reply to this message or contact <a href="mailto:connect@justprem.shop" style="color:#0e1b10">connect@justprem.shop</a>.</p></td></tr></table></td></tr></table></body></html>`;
}

/** Sends the branded invoice email to the customer and a complete copy to the shop. */
export async function sendOrderEmail(details: OrderDetails) {
  const invoice = createInvoicePdf(details);
  const bannerPath = path.join(process.cwd(), "invoice_details", "images", "cfc52b1889e0ebfd5174a6aeb75381c0.png");
  const senderEmail = process.env.SMTP_FROM_EMAIL || "orders@justprem.shop";
  const adminEmail = process.env.SMTP_ADMIN_EMAIL || "connect@justprem.shop";
  const customerEmail = createCustomerEmail(details);
  const attachments = [{ filename: invoice.filename, content: invoice.content, contentType: "application/pdf" }, { filename: "justprem-harmonium.png", path: bannerPath, contentId: "justprem-harmonium" }];
  const subject = `${details.paymentMethod === "wise" ? "Order reserved" : "Order confirmed"} — JustPrem Harmoniums`;
  const customerResponse = await resend.emails.send({ from: `JustPrem Harmoniums <${senderEmail}>`, to: details.email, replyTo: adminEmail, subject, html: customerEmail, text: `Thank you for your order. Reference: ${details.paymentId}. Your invoice is attached.`, attachments });
  if (customerResponse.error) throw new Error(customerResponse.error.message || "The order email could not be sent.");
  const adminResponse = await resend.emails.send({ from: `JustPrem Orders <${senderEmail}>`, to: adminEmail, replyTo: details.email, subject: `New order ${invoiceNumber(details.paymentId)} — ${money(details.cartTotal)}`, html: customerEmail, text: `New order from ${details.name} (${details.email}). Reference: ${details.paymentId}.`, attachments: [invoice] });
  if (adminResponse.error) console.error("Admin order copy could not be sent:", adminResponse.error);
  return { customerEmailId: customerResponse.data?.id, adminEmailId: adminResponse.data?.id };
}
