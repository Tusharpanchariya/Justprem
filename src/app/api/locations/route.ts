import { NextRequest, NextResponse } from "next/server";

const locationsApi = "https://countriesnow.space/api/v0.1/countries";

type LocationsResponse = { error?: boolean; data?: unknown };

export async function GET(request: NextRequest) {
  const country = request.nextUrl.searchParams.get("country")?.trim();
  const state = request.nextUrl.searchParams.get("state")?.trim();
  const wantsCities = request.nextUrl.searchParams.has("cities");

  if (!country) {
    return NextResponse.json({ error: "A country is required." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const endpoint = state ? "state/cities" : wantsCities ? "cities" : "states";
    const response = await fetch(`${locationsApi}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state ? { country, state } : { country }),
      signal: controller.signal,
      next: { revalidate: 86_400 },
    });
    const result = (await response.json()) as LocationsResponse;

    if (!response.ok || result.error) {
      return NextResponse.json({ error: "Location data is unavailable." }, { status: 502 });
    }

    if (state || wantsCities) {
      return NextResponse.json({ cities: Array.isArray(result.data) ? result.data : [] });
    }

    const data = result.data as { states?: Array<{ name?: string; state_code?: string }> } | undefined;
    const regions = (data?.states ?? [])
      .filter((item): item is { name: string; state_code?: string } => Boolean(item.name))
      .map((item) => ({ name: item.name, code: item.state_code || item.name }));
    return NextResponse.json({ regions });
  } catch {
    return NextResponse.json({ error: "Location data is unavailable." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
