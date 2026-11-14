"use client";

import { FormEvent, useState } from "react";

export default function WithdrawFromContractPage() {
  const [form, setForm] = useState({ name: "", email: "", orderReference: "", statement: "I hereby give notice that I withdraw from my contract for the order identified above.", company: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus(""); setError("");
    try {
      const response = await fetch("/api/withdraw-from-contract", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json() as { success?: boolean; reference?: string; receivedAt?: string; acknowledgementSent?: boolean; error?: string };
      if (!response.ok || !result.success) throw new Error(result.error || "Your notice could not be submitted.");
      setStatus(`Your withdrawal statement was received at ${result.receivedAt ? new Date(result.receivedAt).toISOString() : "the date shown in your email"} (UTC). Reference: ${result.reference}.${result.acknowledgementSent ? " A receipt has been emailed to you." : " We could not email the receipt; please contact connect@justprem.shop and quote this reference."}`);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Your notice could not be submitted."); }
    finally { setBusy(false); }
  }
  const inputClass = "w-full border-b border-charcoal/20 bg-transparent px-1 py-3 text-sm outline-none focus:border-saffron";
  return <main className="min-h-screen bg-ivory px-6 pb-24 pt-32 text-charcoal"><div className="mx-auto max-w-2xl">
    <p className="text-xs uppercase tracking-[0.2em] text-saffron">JustPrem Harmoniums</p>
    <h1 className="mt-4 font-serif text-4xl">Withdraw from contract here</h1>
    <p className="mt-5 text-sm leading-7 text-charcoal/70">If you have a statutory right to withdraw, use this form to send us an unambiguous online statement. For eligible EU consumer distance purchases, the withdrawal period is generally 14 days from delivery, subject to legal exceptions. Submitting a notice does not itself confirm eligibility or remove other consumer rights.</p>
    <form onSubmit={submit} className="mt-8 space-y-6 border border-wood/15 bg-white/60 p-6 md:p-8">
      <label className="block text-xs uppercase tracking-widest text-charcoal/60">Full name<input required maxLength={160} autoComplete="name" className={inputClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })}/></label>
      <label className="block text-xs uppercase tracking-widest text-charcoal/60">Email for receipt<input required type="email" maxLength={254} autoComplete="email" className={inputClass} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })}/></label>
      <label className="block text-xs uppercase tracking-widest text-charcoal/60">Order reference<input required maxLength={100} className={inputClass} value={form.orderReference} onChange={(event) => setForm({ ...form, orderReference: event.target.value })}/></label>
      <label className="block text-xs uppercase tracking-widest text-charcoal/60">Withdrawal statement<textarea required maxLength={2000} rows={4} className={`${inputClass} resize-y`} value={form.statement} onChange={(event) => setForm({ ...form, statement: event.target.value })}/></label>
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden"><label>Company<input tabIndex={-1} autoComplete="off" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })}/></label></div>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
      {status && <p role="status" className="border border-forest/20 bg-sage/20 p-4 text-sm leading-6 text-forest">{status}</p>}
      <button disabled={busy} className="w-full bg-forest px-6 py-4 text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-forest/90 disabled:opacity-50">{busy ? "Submitting…" : "Submit withdrawal statement"}</button>
      <p className="text-xs leading-5 text-charcoal/60">A durable receipt will be sent to the email address you provide. Questions: <a className="underline" href="mailto:connect@justprem.shop">connect@justprem.shop</a>.</p>
    </form>
  </div></main>;
}
