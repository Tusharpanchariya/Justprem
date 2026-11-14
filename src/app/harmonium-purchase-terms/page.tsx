import { purchasePolicies, europeanWithdrawalPolicy, ukWithdrawalPolicy } from "@/lib/harmoniumPurchasePolicies";

export const metadata = { title: "Harmonium Purchase Terms | JustPrem", description: "Purchase, delivery, return, refund and warranty information for JustPrem harmoniums." };

export default function HarmoniumPurchaseTermsPage() {
  return <main className="min-h-screen bg-ivory px-6 pb-24 pt-32 text-charcoal"><article className="mx-auto max-w-3xl">
    <p className="text-xs uppercase tracking-[0.2em] text-saffron">JustPrem Harmoniums · VITTHAL PREM TRAVELS LLP</p>
    <h1 className="mt-4 font-serif text-4xl">Purchase Terms &amp; Policies</h1>
    <p id="terms" className="mt-5 leading-7 text-charcoal/70">These purchase terms describe how harmonium orders are prepared, delivered and supported. Mandatory consumer rights in the destination country always prevail.</p>
    <div className="mt-10 space-y-10">{[...purchasePolicies, europeanWithdrawalPolicy, ukWithdrawalPolicy].map((policy) => <section key={policy.id} id={policy.id === "returns" ? "returns" : policy.id === "handcrafted" ? "handcrafted" : policy.id === "warranty" ? "warranty" : policy.id === "shipping" ? "shipping" : policy.id} className="scroll-mt-28 border-t border-charcoal/15 pt-6">
      <h2 className="font-serif text-2xl">{policy.title}</h2><div className="mt-4 space-y-4 text-sm leading-7 text-charcoal/75">{policy.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{policy.bullets && <ul className="list-disc space-y-2 pl-5">{policy.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>
    </section>)}</div>
  </article></main>;
}
