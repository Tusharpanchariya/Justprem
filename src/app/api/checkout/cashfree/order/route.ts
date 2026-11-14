import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Cashfree is not currently available. Please use one of the options shown at checkout." }, { status: 410 });
}
