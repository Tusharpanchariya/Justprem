"use client";

import Link from "next/link";
import { applicablePurchasePolicies, HARMONIUM_POLICY_VERSION } from "@/lib/harmoniumPurchasePolicies";

export function PurchaseTermsAgreement({ countryCode, accepted, onAcceptedChange, showError }: { countryCode: string; accepted: boolean; onAcceptedChange: (value: boolean) => void; showError: boolean }) {
  const policies = applicablePurchasePolicies(countryCode);
  return <section className="space-y-5 border border-wood/15 bg-sandstone/10 p-6 md:p-8" aria-labelledby="purchase-terms-heading">
    <div>
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-saffron">Purchase information · {HARMONIUM_POLICY_VERSION}</p>
      <h2 id="purchase-terms-heading" className="font-serif text-2xl text-charcoal">Before You Complete Your Purchase</h2>
      <p className="mt-3 text-sm leading-6 text-charcoal/70">Every JustPrem harmonium is individually handcrafted. Please review the following important information about craftsmanship, delivery, returns, refunds and warranty before confirming your order.</p>
    </div>
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {policies.map((policy) => <details key={policy.id} className="py-3">
        <summary className="cursor-pointer list-none font-medium text-charcoal marker:hidden">{policy.title}<span className="float-right text-saffron" aria-hidden="true">+</span></summary>
        <div className="space-y-3 pt-3 text-sm leading-6 text-charcoal/75">
          {policy.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          {policy.bullets && <ul className="list-disc space-y-1 pl-5">{policy.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          {policy.id === "eu-withdrawal" && <p><Link href="/withdraw-from-contract" target="_blank" className="font-medium text-forest underline underline-offset-2">Withdraw from contract here</Link> · Online withdrawal statement form with email receipt.</p>}
          {policy.id === "support" && <p><span className="font-medium">Grievance Officer:</span> <span aria-label="To be added"> </span></p>}
        </div>
      </details>)}
    </div>
    <p className="text-xs leading-5 text-charcoal/65">Read the <Link className="underline underline-offset-2" href="/harmonium-purchase-terms" target="_blank">complete harmonium purchase terms and policy documents</Link>. Mandatory consumer rights applicable to your purchase remain unaffected.</p>
    <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-charcoal">
      <input type="checkbox" checked={accepted} onChange={(event) => onAcceptedChange(event.target.checked)} className="mt-1 h-4 w-4 accent-forest" required aria-describedby={showError ? "terms-error" : undefined} />
      <span>I have read and agree to the JustPrem Harmoniums <Link href="/harmonium-purchase-terms#terms" target="_blank" className="underline">Terms &amp; Conditions</Link>, <Link href="/harmonium-purchase-terms#shipping" target="_blank" className="underline">Shipping &amp; Delivery Policy</Link>, <Link href="/harmonium-purchase-terms#returns" target="_blank" className="underline">Return &amp; Refund Policy</Link>, <Link href="/harmonium-purchase-terms#handcrafted" target="_blank" className="underline">Handmade Product Disclaimer</Link> and <Link href="/harmonium-purchase-terms#warranty" target="_blank" className="underline">Warranty Policy</Link>. I understand the natural variations associated with handcrafted wooden harmoniums and acknowledge that mandatory consumer rights applicable to my purchase remain unaffected.</span>
    </label>
    {showError && !accepted && <p id="terms-error" className="text-sm text-red-800" role="alert">Please review and accept the applicable terms and conditions before proceeding.</p>}
  </section>;
}
