"use client";

import { useState } from "react";

type RecordRow = { id: string; accepted_at: string; policy_version: string; policy_snapshot: unknown; country_code: string; currency: string; order_total: number; checkout_orders: { id: string; customer_email: string; payment_status: string; payment_provider: string | null; payment_reference: string | null; order_snapshot: unknown } };

export default function PolicyAcceptanceAdminPage() {
  const [token, setToken] = useState("");
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function loadRecords(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/policy-acceptances", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
      const data = await response.json() as { records?: RecordRow[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Could not load records.");
      setRecords(data.records || []);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Could not load records."); }
    finally { setLoading(false); }
  }
  return <main className="min-h-screen bg-ivory px-5 pb-20 pt-28 text-charcoal"><div className="mx-auto max-w-6xl">
    <h1 className="font-serif text-3xl">Customer Policy Acceptance Records</h1>
    <form onSubmit={loadRecords} className="my-6 flex max-w-xl gap-3"><input type="password" autoComplete="current-password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Admin access token" className="min-w-0 flex-1 border border-charcoal/20 bg-transparent px-3 py-2" required/><button className="bg-forest px-5 py-2 text-xs uppercase tracking-widest text-ivory" disabled={loading}>{loading ? "Loading…" : "View records"}</button></form>
    {error && <p role="alert" className="mb-4 text-sm text-red-800">{error}</p>}
    <div className="space-y-4">{records.map((row) => <details key={row.id} className="border border-charcoal/15 bg-white/50 p-5"><summary className="cursor-pointer"><span className="font-medium">{row.checkout_orders.customer_email}</span><span className="ml-4 text-sm text-charcoal/60">{row.checkout_orders.id}</span><span className="ml-4 text-sm">{row.currency} {Number(row.order_total).toFixed(2)} · {row.checkout_orders.payment_status}</span></summary>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2"><div>Country: {row.country_code}</div><div>Accepted: {new Date(row.accepted_at).toISOString()}</div><div>Policy version: {row.policy_version}</div><div>Payment: {row.checkout_orders.payment_provider || "Pending"} {row.checkout_orders.payment_reference || ""}</div></dl>
      <h2 className="mt-5 text-xs uppercase tracking-widest">Accepted policy and order snapshots</h2><pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap break-words bg-sandstone/20 p-4 text-xs">{JSON.stringify({ policies: row.policy_snapshot, order: row.checkout_orders.order_snapshot }, null, 2)}</pre>
    </details>)}</div>
  </div></main>;
}
