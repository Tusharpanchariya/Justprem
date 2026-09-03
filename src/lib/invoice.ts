import type { OrderDetails } from "@/lib/email";

const pageWidth = 595;
const pageHeight = 842;

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/[^\x20-\x7E]/g, "?");
}

function wrapText(value: string, limit: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of value.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function invoiceNumber(paymentId: string) {
  const reference = paymentId.replace(/[^a-z0-9]/gi, "").slice(-16).toUpperCase();
  return `JP-${reference || "ORDER"}`;
}

/** Creates a single-page, print-ready PDF invoice without a browser or external PDF service. */
export function createInvoicePdf(details: OrderDetails) {
  const number = invoiceNumber(details.paymentId);
  const paymentPending = details.paymentMethod === "wise";
  const issuedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date());
  const commands: string[] = ["0.055 0.106 0.063 rg 0 744 595 98 re f", "0.94 0.91 0.85 rg 42 704 511 1 re f"];
  const text = (value: string, x: number, y: number, size = 10, bold = false, color = "0.12 0.11 0.09") => commands.push(`${color} rg BT /${bold ? "F2" : "F1"} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`);
  const rule = (y: number, x = 42, width = 511, color = "0.86 0.83 0.77") => commands.push(`${color} RG ${x} ${y} m ${x + width} ${y} l S`);

  text("JUSTPREM HARMONIUMS", 42, 800, 21, true, "0.98 0.96 0.91");
  text("UNFOLDING THE PATH OF BHAKTI", 42, 782, 8, false, "0.85 0.71 0.53");
  text("INVOICE", 42, 735, 18, true);
  text(`Invoice no. ${number}`, 42, 715, 9);
  text(`Issued ${issuedOn}`, 416, 735, 9);
  text(paymentPending ? "PAYMENT PENDING" : "PAID", 455, 715, 9, true, paymentPending ? "0.55 0.27 0.10" : "0.08 0.35 0.20");

  text("BILL TO", 42, 675, 9, true, "0.36 0.25 0.15");
  const addressLines = [details.name, ...wrapText(details.address, 48), [details.city, details.region, details.postalCode].filter(Boolean).join(", "), details.country, details.email, details.phone].filter(Boolean);
  addressLines.slice(0, 6).forEach((line, index) => text(line, 42, 657 - index * 14, 9));
  text("ORDER DETAILS", 318, 675, 9, true, "0.36 0.25 0.15");
  text("Payment method", 318, 657, 9);
  text(details.paymentMethod.toUpperCase(), 430, 657, 9, true);
  text("Order reference", 318, 641, 9);
  wrapText(details.paymentId, 26).slice(0, 2).forEach((line, index) => text(line, 430, 641 - index * 14, 8));

  let y = 555;
  rule(y + 18);
  text("ITEM", 42, y, 9, true, "0.36 0.25 0.15"); text("QTY", 385, y, 9, true, "0.36 0.25 0.15"); text("AMOUNT", 475, y, 9, true, "0.36 0.25 0.15"); rule(y - 8); y -= 28;
  for (const item of details.items.slice(0, 8)) {
    const itemLines = wrapText(item.name, 50);
    itemLines.slice(0, 2).forEach((line, index) => text(line, 42, y - index * 13, 10, index === 0));
    text(String(item.quantity), 390, y, 10); text(`EUR ${(item.priceEUR * item.quantity).toFixed(2)}`, 469, y, 10);
    y -= Math.max(28, itemLines.slice(0, 2).length * 13 + 15); rule(y + 8);
  }
  if (details.discount) {
    y -= 4;
    text(`Discount (${details.couponCode || "COUPON"})`, 363, y, 10);
    text(`-EUR ${details.discount.toFixed(2)}`, 457, y, 10, false, "0.08 0.35 0.20");
    y -= 20;
  }
  y -= 12;
  text(paymentPending ? "TOTAL DUE" : "TOTAL PAID", 363, y, 11, true); text(`EUR ${details.cartTotal.toFixed(2)}`, 457, y, 13, true, "0.36 0.25 0.15"); rule(y - 13, 350, 203, "0.36 0.25 0.15");
  text(paymentPending ? "Your order will be prepared once the transfer has cleared." : "Thank you for choosing JustPrem Harmoniums.", 42, Math.max(94, y - 56), 9, false, "0.35 0.32 0.28");
  text("Questions? connect@justprem.shop", 42, Math.max(76, y - 74), 9, false, "0.35 0.32 0.28");

  const stream = commands.join("\n");
  const objects = ["<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>", `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf, "utf8")); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return { filename: `justprem-invoice-${number.toLowerCase()}.pdf`, content: Buffer.from(pdf, "utf8") };
}
