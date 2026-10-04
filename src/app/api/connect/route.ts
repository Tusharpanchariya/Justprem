import { createClient } from "@supabase/supabase-js";
import { sendConnectConfirmationEmail } from "@/lib/connectConfirmationEmail";

function database() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key) : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subscribeNews, message } = body || {};

    // Validate inputs
    const cleanFirstName = typeof firstName === "string" ? firstName.trim() : "";
    const cleanLastName = typeof lastName === "string" ? lastName.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";
    const isSubscribed = Boolean(subscribeNews);

    if (!cleanFirstName || !cleanLastName || !cleanMessage) {
      return Response.json(
        { error: "Please fill in all required fields (Name and Message)." },
        { status: 400 }
      );
    }

    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return Response.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 1. Save to Supabase (if configured)
    const db = database();
    if (db) {
      const { error: dbError } = await db.from("connect_inquiries").insert({
        first_name: cleanFirstName,
        last_name: cleanLastName,
        email: cleanEmail,
        subscribe_news: isSubscribed,
        message: cleanMessage,
      });

      if (dbError) {
        console.error("Error saving connect inquiry to Supabase:", dbError);
        // If table does not exist or schema issue, still continue to send email if possible or return informative message
      }
    } else {
      console.warn("Supabase credentials not found. Inquiry will not be saved to DB.");
    }

    // 2. Send confirmation email to user & notification to admin
    await sendConnectConfirmationEmail({
      firstName: cleanFirstName,
      lastName: cleanLastName,
      email: cleanEmail,
      message: cleanMessage,
    });

    return Response.json({
      success: true,
      message: "Thank you for connecting with us! We will connect with you soon.",
    });
  } catch (error) {
    console.error("Connect API error:", error);
    return Response.json(
      { error: "An error occurred while submitting your message. Please try again." },
      { status: 500 }
    );
  }
}
