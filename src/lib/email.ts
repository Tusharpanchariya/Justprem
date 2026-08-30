import { Resend } from "resend";

// Define TypeScript interfaces for our email function
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  priceEUR: number;
  image?: string;
}

export interface OrderDetails {
  email: string;
  phone: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  items: OrderItem[];
  cartTotal: number;
  paymentId: string;
  paymentMethod: string;
}

const resend = new Resend(process.env.RESEND_API_KEY || "re_temp_key_for_build_evaluation");

/**
 * Sends an order confirmation email to the client and a copy to the shop admin.
 */
export async function sendOrderEmail(details: OrderDetails) {
  const itemsListHtml = details.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eeeeee; font-family: sans-serif; font-size: 14px; color: #2c1810;">
          <strong>${item.name}</strong> x ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eeeeee; font-family: sans-serif; font-size: 14px; color: #2c1810; text-align: right;">
          €${(item.priceEUR * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - Just Prem</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #faf6f0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #faf6f0;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #e2dcd5; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(44, 24, 16, 0.03);">
              
              <!-- Header -->
              <tr>
                <td align="center" style="background-color: #2c1810; padding: 40px 0;">
                  <h1 style="margin: 0; font-family: Georgia, serif; color: #faf6f0; font-size: 28px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: normal;">JUST PREM</h1>
                  <p style="margin: 5px 0 0 0; font-family: sans-serif; color: #dcb386; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;">Instruments of Devotion</p>
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 20px 0; font-family: Georgia, serif; font-size: 20px; color: #2c1810; font-weight: normal;">Thank you for your order, ${details.name}.</h2>
                  <p style="margin: 0 0 30px 0; font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #4a3e3d;">
                    We are preparing your instrument for its journey. You will find your order details below. We will notify you as soon as your harmonium has been tuned, packaged, and shipped.
                  </p>
                  
                  <!-- Order Details Table -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; border: 1px solid #e2dcd5; border-collapse: collapse;">
                    <thead>
                      <tr style="background-color: #f7f2eb;">
                        <th style="padding: 12px; border-bottom: 1px solid #e2dcd5; font-family: sans-serif; font-size: 12px; font-weight: bold; color: #2c1810; text-transform: uppercase; text-align: left; letter-spacing: 0.05em;">Product</th>
                        <th style="padding: 12px; border-bottom: 1px solid #e2dcd5; font-family: sans-serif; font-size: 12px; font-weight: bold; color: #2c1810; text-transform: uppercase; text-align: right; letter-spacing: 0.05em;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsListHtml}
                      <tr>
                        <td style="padding: 12px; font-family: sans-serif; font-size: 14px; font-weight: bold; color: #2c1810;">Total Paid</td>
                        <td style="padding: 12px; font-family: sans-serif; font-size: 16px; font-weight: bold; color: #b38856; text-align: right;">€${details.cartTotal.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <!-- Shipping Information -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 35px; border-top: 1px solid #e2dcd5; padding-top: 25px;">
                    <tr>
                      <td width="50%" valign="top" style="padding-right: 10px;">
                        <h3 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 12px; color: #2c1810; text-transform: uppercase; letter-spacing: 0.05em;">Shipping Address</h3>
                        <p style="margin: 0; font-family: sans-serif; font-size: 13px; line-height: 1.5; color: #4a3e3d;">
                          ${details.name}<br>
                          ${details.address}<br>
                          ${details.city}, ${details.postalCode}<br>
                          Phone: ${details.phone}
                        </p>
                      </td>
                      <td width="50%" valign="top" style="padding-left: 10px;">
                        <h3 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 12px; color: #2c1810; text-transform: uppercase; letter-spacing: 0.05em;">Payment Details</h3>
                        <p style="margin: 0; font-family: sans-serif; font-size: 13px; line-height: 1.5; color: #4a3e3d;">
                          Method: ${details.paymentMethod.toUpperCase()}<br>
                          Transaction ID:<br>
                          <span style="font-family: monospace; font-size: 11px; background-color: #f7f2eb; padding: 2px 4px; border-radius: 2px;">${details.paymentId}</span>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  ${details.paymentMethod === "wise" ? `
                  <!-- Wise Payment Instructions -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 10px; margin-bottom: 30px; border: 1px solid #e2dcd5; background-color: #f7f2eb; border-radius: 4px; padding: 20px; box-sizing: border-box;">
                    <tr>
                      <td>
                        <h4 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 13px; color: #2c1810; text-transform: uppercase; letter-spacing: 0.05em;">Wise Bank Transfer Details</h4>
                        <p style="margin: 0 0 12px 0; font-family: sans-serif; font-size: 13px; line-height: 1.5; color: #4a3e3d;">
                          Please transfer the exact order amount of <strong>€${details.cartTotal.toFixed(2)}</strong>. Include the Order ID reference <strong style="font-family: monospace; font-size: 14px; background-color: #ffffff; padding: 2px 6px; border-radius: 2px;">${details.paymentId}</strong> in your transfer description.
                        </p>
                        <p style="margin: 0; font-family: sans-serif; font-size: 12px; line-height: 1.6; color: #4a3e3d;">
                          <strong>Account Name:</strong> vitthal prem travels llp<br>
                          <strong>IBAN:</strong> BE75 9059 5938 2951<br>
                          <strong>Swift/BIC:</strong> TRWIBEB1XXX<br>
                          <strong>Bank Address:</strong> Wise, Rue du Trône 100, Brussels, 1050, Belgium
                        </p>
                      </td>
                    </tr>
                  </table>
                  ` : ""}
                  
                  <!-- Footer Note -->
                  <p style="margin: 0; font-family: sans-serif; font-size: 12px; line-height: 1.5; color: #9c8e8d; text-align: center;">
                    If you have any questions regarding your order, please reply directly to this email or contact us at <a href="mailto:connect@justprem.shop" style="color: #b38856; text-decoration: none;">connect@justprem.shop</a>.
                  </p>
                </td>
              </tr>
              
              <!-- Footer Background -->
              <tr>
                <td align="center" style="background-color: #f7f2eb; padding: 20px 30px; border-top: 1px solid #e2dcd5;">
                  <p style="margin: 0; font-family: sans-serif; font-size: 11px; color: #9c8e8d; text-transform: uppercase; letter-spacing: 0.05em;">
                    © ${new Date().getFullYear()} Just Prem. All Rights Reserved.
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

  // The user says their domain "justprem.shop" is verified. We'll use "orders@justprem.shop"
  const senderEmail = process.env.SMTP_FROM_EMAIL || "orders@justprem.shop";
  // The admin email to receive order copies
  const adminEmail = process.env.SMTP_ADMIN_EMAIL || "connect@justprem.shop";

  try {
    console.log("Sending email to customer:", details.email, "from:", senderEmail);
    // Send the email to the customer
    const customerResponse = await resend.emails.send({
      from: `Just Prem <${senderEmail}>`,
      to: details.email,
      subject: `Order Confirmation - Just Prem [${details.paymentId}]`,
      html: emailHtml,
    });
    console.log("Customer email response:", customerResponse);

    // Send a copy to the shop admin
    const adminResponse = await resend.emails.send({
      from: `Just Prem System <${senderEmail}>`,
      to: adminEmail,
      subject: `NEW ORDER ALERT - [${details.paymentId}]`,
      html: `
        <h2>New Harmonium Order Received!</h2>
        <p>Here are the client details:</p>
        <ul>
          <li><strong>Name:</strong> ${details.name}</li>
          <li><strong>Email:</strong> ${details.email}</li>
          <li><strong>Phone:</strong> ${details.phone}</li>
          <li><strong>Address:</strong> ${details.address}, ${details.city}, ${details.postalCode}</li>
          <li><strong>Payment Method:</strong> ${details.paymentMethod}</li>
          <li><strong>Transaction ID:</strong> ${details.paymentId}</li>
          <li><strong>Total Paid:</strong> €${details.cartTotal}</li>
        </ul>
        <hr />
        ${emailHtml}
      `,
    });
    console.log("Admin email response:", adminResponse);
    return true;
  } catch (error) {
    console.error("Error sending emails:", error);
    return false;
  }
}
