import { NextResponse } from "next/server";

// Retired legacy endpoint: arbitrary client-supplied amounts bypass the reviewed checkout.
export async function POST() {
  return NextResponse.json({ error: "This checkout endpoint is retired. Start your purchase from the current checkout page." }, { status: 410 });
}
