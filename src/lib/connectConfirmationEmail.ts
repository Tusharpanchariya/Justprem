import { Resend } from "resend";

type ConnectInquiry = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] || character);
}

export async function sendConnectConfirmationEmail(inquiry: ConnectInquiry) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.log("RESEND_API_KEY is not set. Skipping confirmation email sending.");
    return;
  }

  const resend = new Resend(apiKey);
  const from = (process.env.RESEND_FROM_EMAIL || process.env.SMTP_FROM_EMAIL || "orders@justprem.shop").trim();
  const adminEmail = (process.env.RESEND_ADMIN_EMAIL || process.env.SMTP_ADMIN_EMAIL || "justprem108@gmail.com").trim();

  const firstName = escapeHtml(inquiry.firstName);
  const lastName = escapeHtml(inquiry.lastName);
  const userEmail = escapeHtml(inquiry.email);
  const userMessage = escapeHtml(inquiry.message);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Thanks for connecting with JustPrem</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #ede9e3; font-family: Georgia, 'Times New Roman', serif; color: #1c2e1e;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #ede9e3; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <!-- Header Banner -->
                <tr>
                  <td style="background-color: #1c2e1e; padding: 32px 24px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px; letter-spacing: 4px; color: #ffffff; text-transform: uppercase; font-weight: normal;">
                      JustPrem
                    </h1>
                    <p style="margin: 6px 0 0; color: #d6864d; font-size: 13px; letter-spacing: 1px; font-style: italic;">
                      Love is the path
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 36px;">
                    <h2 style="margin: 0 0 20px; font-size: 24px; color: #1c2e1e; font-weight: normal;">
                      Dear ${firstName},
                    </h2>
                    <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #2d3e2e;">
                      Thank you for connecting with us! We have received your message and are deeply grateful for your reach out.
                    </p>
                    <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #2d3e2e;">
                      Whether you are curious about our retreats, pilgrimages, sacred sound offerings, or simply sharing from the heart — we will connect with you soon.
                    </p>
                    
                    <!-- Message Recap Box -->
                    <div style="background-color: #f7f5ef; border-left: 3px solid #d6864d; padding: 16px 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
                      <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; tracking-wider: 1px; color: #8a7a6a; font-family: sans-serif; font-weight: bold;">
                        Your Message
                      </p>
                      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #3d3d3d; font-style: italic;">
                        &ldquo;${userMessage}&rdquo;
                      </p>
                    </div>

                    <p style="margin: 32px 0 0; font-size: 15px; font-style: italic; color: #1c2e1e;">
                      With love and in devotion,<br />
                      <strong>The Just Prem Family</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #121315; padding: 24px; text-align: center; color: #999999; font-size: 12px; font-family: sans-serif;">
                    <p style="margin: 0 0 6px; color: #cccccc;">
                      JustPrem &bull; Rishikesh, India
                    </p>
                    <p style="margin: 0;">
                      a brand/trading name operated by VITTHAL PREM TRAVELS LLP
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // Send Customer Confirmation Email
  try {
    const customerResult = await resend.emails.send({
      from: `JustPrem <${from}>`,
      to: inquiry.email,
      replyTo: adminEmail,
      subject: "Thanks for connecting with us — JustPrem",
      html: htmlContent,
      text: `Dear ${inquiry.firstName},\n\nThank you for connecting with us! We have received your message and will connect with you soon.\n\nWith love and in devotion,\nThe Just Prem Family`,
    });

    if (customerResult.error) {
      console.error("Connect form user confirmation email error:", customerResult.error);
    }
  } catch (err) {
    console.error("Error sending user confirmation email:", err);
  }

  // Send Admin Alert Email
  try {
    await resend.emails.send({
      from: `JustPrem Connect <${from}>`,
      to: adminEmail,
      replyTo: inquiry.email,
      subject: `New Connect Inquiry from ${inquiry.firstName} ${inquiry.lastName}`,
      html: `
        <p><strong>New Connect Form Submission:</strong></p>
        <p><strong>Name:</strong> ${firstName} ${lastName}<br>
        <strong>Email:</strong> ${userEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${userMessage}</p>
      `,
      text: `New Connect Form Submission:\nName: ${inquiry.firstName} ${inquiry.lastName}\nEmail: ${inquiry.email}\nMessage:\n${inquiry.message}`,
    });
  } catch (err) {
    console.error("Error sending admin notification email:", err);
  }
}
