import { createClient } from "@supabase/supabase-js";
import { sendClassApplicationEmail } from "@/lib/classApplicationEmail";

const allowedCourses = new Set(["recorded-foundation", "bhakti-foundation", "deep-immersion"]);
function database() { const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY; return url && key ? createClient(url, key) : null; }
function databaseErrorMessage(error: { code?: string; message?: string }) {
  if (error.code === "42P01" || error.code === "PGRST205") return "The class calendar is not set up yet. Please contact JustPrem.";
  if (error.code === "42501") return "The class calendar needs its database permissions configured. Please contact JustPrem.";
  return "We could not save your application. Please try again.";
}

export async function GET() {
  const db = database();
  if (!db) return Response.json({ bookedDates: [] });
  const { data, error } = await db.from("class_bookings").select("booking_date").eq("status", "confirmed");
  if (error) return Response.json({ bookedDates: [] });
  return Response.json({ bookedDates: data.map((booking) => booking.booking_date) });
}

export async function POST(request: Request) {
  const db = database();
  if (!db) return Response.json({ error: "Class bookings are not configured yet." }, { status: 503 });
  try {
    const { courseId, courseName, name, email, bookingDate } = await request.json() as Record<string, unknown>;
    if (typeof courseId !== "string" || !allowedCourses.has(courseId) || typeof courseName !== "string" || typeof name !== "string" || typeof email !== "string" || typeof bookingDate !== "string") return Response.json({ error: "Please complete the application form." }, { status: 400 });
    const cleanName = name.trim(); const cleanEmail = email.trim().toLowerCase(); const cleanDate = bookingDate.trim();
    if (!cleanName || cleanName.length > 100 || !/^\S+@\S+\.\S+$/.test(cleanEmail) || !/^\d{4}-\d{2}-\d{2}$/.test(cleanDate) || cleanDate < new Date().toISOString().slice(0, 10)) return Response.json({ error: "Please provide a valid name, email, and future date." }, { status: 400 });
    const { error } = await db.from("class_bookings").insert({ course_id: courseId, course_name: courseName.slice(0, 120), full_name: cleanName, email: cleanEmail, booking_date: cleanDate, status: "confirmed" });
    if (error?.code === "23505") return Response.json({ error: "That date has just been booked. Please choose another date." }, { status: 409 });
    if (error) {
      console.error("Class booking database error:", error);
      return Response.json({ error: databaseErrorMessage(error) }, { status: 500 });
    }
    await sendClassApplicationEmail({ name: cleanName, email: cleanEmail, courseName: courseName.slice(0, 120), bookingDate: cleanDate });
    return Response.json({ success: true });
  } catch (error) { console.error("Class booking error:", error); return Response.json({ error: "We could not save your application. Please check your connection and try again." }, { status: 500 }); }
}
