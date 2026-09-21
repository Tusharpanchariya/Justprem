import { Resend } from "resend";
import path from "path";
import { readFile } from "fs/promises";

type ClassApplication = { name: string; email: string; courseName: string; bookingDate: string };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character);
}

function formattedDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

export async function sendClassApplicationEmail(application: ClassApplication) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return;
  const resend = new Resend(apiKey);
  const from = (process.env.RESEND_FROM_EMAIL || process.env.SMTP_FROM_EMAIL || "orders@justprem.shop").trim();
  const admin = (process.env.RESEND_ADMIN_EMAIL || process.env.SMTP_ADMIN_EMAIL || "connect@justprem.shop").trim();
  const name = escapeHtml(application.name);
  const course = escapeHtml(application.courseName);
  const date = escapeHtml(formattedDate(application.bookingDate));
  const bannerPath = path.join(process.cwd(), "invoice_details", "images", "cfc52b1889e0ebfd5174a6aeb75381c0.png");
  const banner = await readFile(bannerPath);
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f0f1f5;font-family:Arial,Helvetica,sans-serif;color:#0e1b10"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:32px 16px"><table role="presentation" width="600" align="center" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff"><tr><td style="padding:24px 24px 0"><img src="cid:justprem-harmonium" alt="JustPrem Harmoniums" width="552" style="display:block;width:100%;height:auto" /></td></tr><tr><td style="padding:28px 32px 8px"><p style="margin:0 0 10px;color:#ad684d;font-size:11px;letter-spacing:1.7px;text-transform:uppercase">Path of Bhakti Yoga</p><h1 style="margin:0;font-family:Georgia,serif;font-size:32px;line-height:1.1;color:#0e1b10">Your application<br />has been received.</h1><p style="margin:20px 0 0;color:#39423a;font-size:15px;line-height:1.65">Dear ${name}, thank you for taking this step on the path of sacred sound. We are grateful to receive your application.</p></td></tr><tr><td style="padding:24px 32px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #d9d3c9;background:#f7f4ee"><tr><td style="padding:18px 20px"><p style="margin:0 0 5px;color:#6d716d;font-size:10px;letter-spacing:1.2px;text-transform:uppercase">Your chosen path</p><p style="margin:0;font-family:Georgia,serif;font-size:21px;line-height:1.25;color:#0e1b10">${course}</p></td></tr><tr><td style="padding:0 20px 18px"><p style="margin:0 0 5px;color:#6d716d;font-size:10px;letter-spacing:1.2px;text-transform:uppercase">Requested starting date</p><p style="margin:0;color:#0e1b10;font-size:15px;font-weight:bold">${date}</p></td></tr></table></td></tr><tr><td style="padding:0 32px 28px"><p style="margin:0;color:#39423a;font-size:14px;line-height:1.65">Your date is being held for you. We will contact you soon with the next steps and all the details you need.</p></td></tr><tr><td style="padding:22px 32px 30px;background:#567262;text-align:center"><p style="margin:0;font-family:Georgia,serif;font-size:20px;color:#f7f4ee">Slow. Steady. Sacred.</p><p style="margin:8px 0 0;font-size:12px;line-height:1.55;color:#e7dfd2">Questions? Reply to this email or contact <a href="mailto:connect@justprem.in" style="color:#f1cc9b">connect@justprem.in</a>.</p></td></tr></table></td></tr></table></body></html>`;
  const attachments = [{ filename: "justprem-harmonium.png", content: banner, contentType: "image/png", contentId: "justprem-harmonium" }];
  const customer = await resend.emails.send({ from: `JustPrem Classes <${from}>`, to: application.email, replyTo: admin, subject: "Your Path of Bhakti Yoga application — JustPrem", html, text: `Dear ${application.name}, thank you for applying for ${application.courseName}. Your requested starting date is ${formattedDate(application.bookingDate)}. We will be in touch shortly with the next steps.`, attachments });
  if (customer.error) console.error("Class booking confirmation email error:", customer.error);
  const adminCopy = await resend.emails.send({ from: `JustPrem Classes <${from}>`, to: admin, replyTo: application.email, subject: `New class application — ${application.courseName}`, html: `<p><strong>New class application</strong></p><p><strong>Name:</strong> ${name}<br><strong>Email:</strong> ${escapeHtml(application.email)}<br><strong>Path:</strong> ${course}<br><strong>Date:</strong> ${date}</p>`, text: `${application.name} (${application.email}) booked ${application.bookingDate} for ${application.courseName}.` });
  if (adminCopy.error) console.error("Class booking admin email error:", adminCopy.error);
}
